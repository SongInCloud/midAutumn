import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
const executablePath = process.env.BROWSER_EXECUTABLE || [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].find(candidate => fs.existsSync(candidate))
const browser = await chromium.launch({ executablePath, headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('pageerror', error => errors.push(error.message))
fs.mkdirSync('node_modules/.cache/visual-check', { recursive: true })
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:5174'
async function capture(name) {
  await page.screenshot({ path: 'node_modules/.cache/visual-check/' + name + '.jpg', type: 'jpeg', quality: 70 })
}
async function select(index) {
  await page.locator('.scene-rail button').nth(index).click()
  await page.waitForFunction(i => {
    const active = [...document.querySelectorAll('.journey-scene')].findIndex(s => s.dataset.active === 'true')
    return active === i && Number(getComputedStyle(document.querySelectorAll('.journey-scene')[i]).opacity) > .99
  }, index)
  await page.waitForTimeout(700)
}
try {
  await page.goto(base)
  await page.locator('.portal-palace img').evaluate(img => img.decode())
  await capture('desktop-home')
  await page.goto(base + '/journey')
  await page.locator('.crane-artwork img').evaluate(img => img.decode())
  await capture('desktop-prologue')
  for (const i of [1,2,3,4,5,6,0]) {
    await select(i)
    await capture('desktop-scene-' + i)
    assert.equal(await page.locator('.journey-scene:not([inert])').count(), 1)
  }
  await select(1)
  await page.getByRole('button', {name: '嫦娥奔月',exact:true}).click()
  await page.getByRole('dialog').waitFor({state:'visible'})
  assert.equal(await page.evaluate(() => document.body.style.overflow), 'hidden')
  await page.keyboard.press('Escape')
  await page.getByRole('dialog').waitFor({state:'detached'})
  assert.equal(await page.getByRole('button',{name:'嫦娥奔月',exact:true}).evaluate(el=>el===document.activeElement),true)
  await select(4)
  await page.getByRole('button',{name:'苏式月饼',exact:true}).click()
  assert.match(await page.locator('.food-caption').innerText(), /苏式/)
  await page.getByRole('button',{name:'静观：减少动效'}).click()
  assert.equal(await page.locator('.journey-page').evaluate(el=>el.classList.contains('is-calm')),true)
  await page.goto(base + '/journey?scene=landscape')
  await page.waitForFunction(()=>document.querySelectorAll('.journey-scene')[2].dataset.active==='true')
  await page.goto(base + '/atlas')
  await capture('desktop-atlas')
  await page.setViewportSize({width:390,height:844})
  await page.goto(base)
  await capture('mobile-home')
  await page.goto(base + '/journey')
  for (let i=0;i<7;i++) {
    await select(i)
    await capture('mobile-scene-' + i)
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth))
  }
  await page.goto(base + '/atlas')
  await capture('mobile-atlas')
  assert.equal(await page.locator('.atlas-node').count(),6)
  await page.setViewportSize({width:320,height:568})
  await page.goto(base + '/journey')
  for (const i of [0,2,4,6]) {
    await select(i)
    await capture('small-mobile-' + i)
  }
  await page.emulateMedia({reducedMotion:'reduce'})
  await page.goto(base + '/journey?scene=moon-palace')
  await page.getByRole('button',{name:'开启动效'}).waitFor()
  await select(5)
  assert.deepEqual(errors,[])
  console.log('Verified: 7 desktop/mobile scenes, direct link, modal focus/Escape, cake switch, motion preference, atlas; no runtime errors.')
} finally {
  await browser.close()
}
