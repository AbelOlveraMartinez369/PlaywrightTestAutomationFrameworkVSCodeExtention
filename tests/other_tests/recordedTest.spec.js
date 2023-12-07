import { test, expect } from '@playwright/test';
let context;
let page;

//Pasa antes de todo

test.beforeAll(async({browser})=>{
  context=await browser.newContext();
  await context.tracing.start(
    {

      //Tomar screenshoot
      snapshots:true,screenshots:true
    }
  );
  page = await context.newPage(); // Inicializa la página
})

//Pasa despues de todo
test.afterAll(async()=>{
  await context.tracing.stop(
    {
path:'testTrace.zip'
    }
  )
})


test('test', async ({ }) => {
  
  //Tomar screenshoot
  //await context.tracing.start({snapshots:true,screenshots:true});

  //Test Code
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('student');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Password123');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('link', { name: 'Log out' }).click();

  //Detener la captura de pantalla e indicamos la ruta del archivo trace
  //await context.tracing.stop({path:'testTrace.zip'});
});