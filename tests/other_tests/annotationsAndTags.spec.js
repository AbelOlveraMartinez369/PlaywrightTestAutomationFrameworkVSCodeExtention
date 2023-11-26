import { test } from '@playwright/test'
import { fstat } from 'fs'


//ANNOTATIONS
//Skip
test.skip('Skip this test', async ({ page }) => {
})

//Fail
test('Not yet ready', async ({ page }) => {
    test.fail()
})

//Fixme
test('test to be fixed', async ({ page }) => {
})

//Slow
test('slow test', async ({ page }) => {
    test.slow()
})

//Only
test.only('only execute this test', async ({ page }) => {
})


/*
TAGS
@smoke
@sanity
@fast 
@slow */

//@fast
test('Test login page @fast', async ({ page }) => {
})

//@smoke
test('Test login page @smoke', async ({ page }) => {
})
