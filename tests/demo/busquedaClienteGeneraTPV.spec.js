const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const https = require('https');
const axios = require('axios');

const httpsAgent = new https.Agent({
  rejectUnauthorized: false // ADVERTENCIA: Esto desactiva la verificación del certificado SSL
});

// Función para leer y parsear el archivo de propiedades
function readPropertiesFile(filePath) {
  console.log('Leyendo el archivo de propiedades...');
  const content = fs.readFileSync(filePath, 'utf8');
  const properties = {};
  content.split('\n').forEach(line => {
    let [key, value] = line.split('=');
    if (key && value) {
      properties[key.trim()] = value.trim();
      console.log(`${key.trim()}: ${value.trim()}`); // Imprimir cada propiedad
    }
  });
  console.log('Archivo de propiedades leído y parseado.');
  return properties;
}

// Función para leer el archivo Excel
function readExcelFile(filePath) {
  console.log('Leyendo el archivo Excel...');
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet);
  console.log('Datos del archivo Excel:', data);
  return data;
}

// Define la ruta al archivo de propiedades y carga las configuraciones
const propertiesFilePath = path.join(__dirname, '../..', 'Config.properties');
const properties = readPropertiesFile(propertiesFilePath);

// Define la ruta al archivo Excel y carga los datos
const excelFilePath = path.join(__dirname, '../..', properties.excelPath);
const excelData = readExcelFile(excelFilePath);

// Función para conectarse a Perfecto utilizando Axios
async function connectToPerfecto(securityToken) {
  // Modificación para incluir cloudName en la URL
  const cloudName = properties.cloudName; // Asegúrate de que esta propiedad exista en tu archivo Config.properties
  const perfectoUrl = `https://${cloudName}.perfectomobile.com/repository/api/v1/artifacts?artifactType=IMAGE`;

  try {
      // Aquí se utiliza el agente httpsAgent con rejectUnauthorized: false
      const response = await axios.get(perfectoUrl, {
          headers: {
              'Perfecto-Authorization': securityToken
          },
          httpsAgent: httpsAgent // Utilizando el agente personalizado
      });
      console.log('Conectado a Perfecto con éxito.');
      return response.data;
  } catch (error) {
    console.error(`Error al conectarse a Perfecto: ${error.message}`);
    if (error.response) {
      // La solicitud fue hecha y el servidor respondió con un código de estado
      // que cae fuera del rango de 2xx
      console.error('Datos:', error.response.data);
      console.error('Estado:', error.response.status);
      console.error('Encabezados:', error.response.headers);
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error('Error en la solicitud:', error.request);
    } else {
      // Algo sucedió al configurar la solicitud que desencadenó un error
      console.error('Error:', error.message);
    }
    console.error('Configuración:', error.config);
    throw error;
  }
}


test.describe('Feature: Buscar un cliente PFAE', () => {
  test('Scenario Outline: Busqueda cliente PFAE', async ({ page }) => {
    const perfectoData = await connectToPerfecto(properties.securityToken);

    console.log(`Abriendo la URL: ${properties.url} en el navegador`);
    await page.goto(properties.url);

    console.log(`Rellenando el formulario de inicio de sesión con el usuario ${properties.user}`);
    await page.fill('#username', properties.user);
    await page.fill('#password', properties.password);

    console.log('Haciendo clic en el botón de inicio de sesión');
    await page.click(".button.ok"); // Ajusta el selector según sea necesario

    // Agrega aquí los pasos adicionales de tu prueba...
    // ...

    console.log('Verificando la presencia del elemento de búsqueda de cliente en la página');
    await expect(page).toHaveText('//*[contains(text(),"Busqueda de Cliente CSHS")]');
  });
});