import {test, expect} from '@playwright/test'
import { loginPage } from '../../pages/loginPOM'

test('test', async ({page})=>{
    const Login=new loginPage(page)

    await Login.goToLoginPage()
    await Login.login('student','Password123')
})