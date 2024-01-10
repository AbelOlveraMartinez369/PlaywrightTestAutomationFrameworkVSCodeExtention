const fetch = require('node-fetch');

async function fetchImagesFromPerfecto() {
    const perfectoApiUrl = 'https://ps.app.perfectomobile.com/repository/api/v1/artifacts?artifactType=IMAGE';
    const perfectoToken = 'eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIxMWNkZTNkOS03ZDkxLTQ0ZjYtOGU1Mi1lMDFhMTYyNmM1YjgifQ.eyJpYXQiOjE3MDE3MTg2NDIsImp0aSI6ImUxODRhZGU4LWI3OTktNGRhOC1iMmMyLTBmNGI4ZWYwMWZmNCIsImlzcyI6Imh0dHBzOi8vYXV0aDYucGVyZmVjdG9tb2JpbGUuY29tL2F1dGgvcmVhbG1zL2Jhbm9ydGUtcGVyZmVjdG9tb2JpbGUtY29tIiwiYXVkIjoiaHR0cHM6Ly9hdXRoNi5wZXJmZWN0b21vYmlsZS5jb20vYXV0aC9yZWFsbXMvYmFub3J0ZS1wZXJmZWN0b21vYmlsZS1jb20iLCJzdWIiOiIzNDRlM2I4Yy00NGI0LTQ3YTktYjFmZC1lMTVhZTAxM2M1ODMiLCJ0eXAiOiJPZmZsaW5lIiwiYXpwIjoib2ZmbGluZS10b2tlbi1nZW5lcmF0b3IiLCJub25jZSI6ImFjMzg4NTI4LTkyNjktNDFmOC1hODI0LTc5MDgyMmY1ZTEwOCIsInNlc3Npb25fc3RhdGUiOiJmOGJlZGNiNS01ZjBkLTQwOGQtOTY0OS0xODEwMTY4MTIxNDkiLCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIG9mZmxpbmVfYWNjZXNzIn0.SVEf8vCMGAsIYGchsU786hGHY71c91U_Cu_YBgXLDCg'; // Reemplaza con tu token real

    try {
        const response = await fetch(perfectoApiUrl, {
            method: 'GET',
            headers: {
                'Perfecto-Authorization': perfectoToken
            }
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: Estado ${response.status}`);
        }

        const data = await response.json();
        console.log('Respuesta de la API de Perfecto:', data);
    } catch (error) {
        console.error('Error al realizar la petición:', error);
    }
}

fetchImagesFromPerfecto();
