import asyncio
from playwright.async_api import async_playwright, expect
import os

async def main():
    async with async_playwright() as p:
        iphone_11 = p.devices['iPhone 11']
        browser = await p.chromium.launch()
        context = await browser.new_context(**iphone_11)
        page = await context.new_page()

        base_path = f"file://{os.getcwd()}"

        # 1. Verificar la página de inicio
        print("Verificando la página de inicio...")
        await page.goto(f"{base_path}/index.html")
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
        await page.wait_for_timeout(500) # Esperar a que el scroll termine
        await page.screenshot(path="jules-scratch/verification/01_index_page_mobile_full.png", full_page=True)

        # 2. Verificar la página de servicios
        print("Verificando la página de servicios...")
        await page.goto(f"{base_path}/servicios.html")
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
        await page.wait_for_timeout(500)
        await page.screenshot(path="jules-scratch/verification/02_servicios_page_mobile_full.png", full_page=True)

        # 3. Verificar la página de contacto y el menú
        print("Verificando la página de contacto...")
        await page.goto(f"{base_path}/contacto.html")
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
        await page.wait_for_timeout(500)
        await page.screenshot(path="jules-scratch/verification/03_contacto_page_mobile_full.png", full_page=True)

        # 4. Verificar la animación del menú de hamburguesa
        print("Verificando la animación del menú...")
        await page.goto(f"{base_path}/contacto.html") # Recargar la página para asegurar que el menú esté cerrado
        menu_button = page.locator("#menu-btn")

        await expect(menu_button).to_be_visible()
        await menu_button.click()

        await page.wait_for_timeout(500)
        await page.screenshot(path="jules-scratch/verification/04_mobile_menu_open.png")
        print("Capturas de pantalla generadas con éxito.")

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())