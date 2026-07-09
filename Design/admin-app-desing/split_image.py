from PIL import Image
import os

img_path = "/home/mittai/Documents/Project.mine/Maspro/Design/admin-app-desing/complete-all -ui-for-admin.png"
output_dir = "/home/mittai/Documents/Project.mine/Maspro/Design/admin-app-desing/"

img = Image.open(img_path)
width, height = img.size

cols, rows = 3, 3
tile_width = width // cols
tile_height = height // rows

count = 1
for i in range(rows):
    for j in range(cols):
        left = j * tile_width
        top = i * tile_height
        right = left + tile_width
        bottom = top + tile_height
        
        box = (left, top, right, bottom)
        tile = img.crop(box)
        
        tile.save(os.path.join(output_dir, f"screen_{count}.png"))
        print(f"Saved screen_{count}.png")
        count += 1
