import os
import glob


html = ""
path = r'images/imagesCrochet/*.jpg'

for file in glob.glob(path):
    html += f"<center><img src='{file}'/ height=100%></center><br>"

with open("cheatSheetindex.html", "r") as inputfile:


    # outputfile.write('<!DOCTYPE html><html>'
    #                  '<head>'
    #                  '<title>Crochet Hall of Fame</title>'
    #                  '<meta charset="utf-8" />'
    #                  '<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />'
    #                  '<link rel="stylesheet" href="assets/css/main.css" />'
    #                  '<noscript><link rel="stylesheet" href="assets/css/noscript.css" /></noscript>'
    #                  '<link rel="icon" href="images/logo.svg" type="image/x-icon">'
    #                  '</head>'
    #                  '<body class ="is-preload">'
    #                  '<!-- Wrapper -->'
    #                  '<div id = "wrapper">'
    #                  '<!-- Header -->'
    #                  '<header id = "header">'
    #                  '<div class ="inner">'
    #                  '<!-- Logo -->'
    #                  '<a href = "index.html" class ="logo">'
    #                  '<span class ="symbol"> '
    #                  '<img src="images/logo.svg" alt="" /> '
    #                  '</span> '
    #                  '<span class ="title"> Fernanda Robles </span>'
    #                  '</a>'
    #                  '<!-- Nav -->'
    #                  '<nav>'
    #                  '<ul>'
    #                  '<li> <a href = "#menu"> Menu </a> </li>'
    #                  '</ul>'
    #                  '</nav>'
    #                  '</div>'
    #                  '</header>'
    #                  '</html>')
    #outputfile.write(html)


#os.startfile("crochetIndex.html")