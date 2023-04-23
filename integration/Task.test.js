describe('addItemForm', () => {
	it('base example, visually looks correct', async () => {
		// APIs from jest-puppeteer
		await page.goto('http://localhost:9010/iframe.html?args=&id=todolist-task--task-is-not-done&viewMode=story')
		await page.waitForTimeout(3000)
		const image = await page.screenshot()

		// API from jest-image-snapshot
		expect(image).toMatchImageSnapshot()
	})
})
