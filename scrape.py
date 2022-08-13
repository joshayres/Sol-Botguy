#!/bin/python3
import urllib.request
import sys as sys

if len(sys.argv) != 2:
	print("Please specify an output file")
	exit()

json = "{\n"
charecterURLS = ["https://www.dustloop.com/wiki/index.php?title=GGST/Anji_Mito/Data",
        "https://www.dustloop.com/wiki/index.php?title=GGST/Axl_Low/Data",
        "https://www.dustloop.com/wiki/index.php?title=GGST/Baiken/Data",
        "http://www.dustloop.com/wiki/index.php?title=GGST/Bridget/Data",
        "https://www.dustloop.com/wiki/index.php?title=GGST/Chipp_Zanuff/Data",
        "https://www.dustloop.com/wiki/index.php?title=GGST/Faust/Data",
        "https://www.dustloop.com/wiki/index.php?title=GGST/Giovanna/Data",
        "https://www.dustloop.com/wiki/index.php?title=GGST/Goldlewis_Dickinson/Data",
        "https://www.dustloop.com/wiki/index.php?title=GGST/Happy_Chaos/Data",
        "https://www.dustloop.com/wiki/index.php?title=GGST/I-No/Data",
        "https://www.dustloop.com/wiki/index.php?title=GGST/Jack-O/Data",
        "https://www.dustloop.com/wiki/index.php?title=GGST/Ky_Kiske/Data",
        "https://www.dustloop.com/wiki/index.php?title=GGST/Leo_Whitefang/Data",
        "https://www.dustloop.com/wiki/index.php?title=GGST/May/Data",
        "https://www.dustloop.com/wiki/index.php?title=GGST/Millia_Rage/Data",
        "https://www.dustloop.com/wiki/index.php?title=GGST/Nagoriyuki/Data",
        "https://www.dustloop.com/wiki/index.php?title=GGST/Potemkin/Data",
        "https://www.dustloop.com/wiki/index.php?title=GGST/Ramlethal_Valentine/Data",
        "https://www.dustloop.com/wiki/index.php?title=GGST/Sol_Badguy/Data",
        "https://www.dustloop.com/wiki/index.php?title=GGST/Testament/Data",
        "https://www.dustloop.com/wiki/index.php?title=GGST/Zato-1/Data"]

charI = 1;
for url in charecterURLS:
    passed = False
    while (not passed):
        try:
            u2 = urllib.request.urlopen(url)
            passed = True
        except:
            print("Something went wrong retrying")
            

    moves = []
    sections = []
    i = 0
    current = {}
    mode = -1
    character = ""
    
    for line in u2.readlines():
        if mode == 0:
            if b"<table class=\"wikitable\"" in line:
                mode = 1
                #print(line)
        elif mode == 1:
            if b"</th></tr>" in line:
                mode = 2
            elif line.startswith(b"<th>"):
                #print(line)
                sections.append(line.decode("utf-8")[4:-1])
        elif mode == 2:
            if b"</table>" in line:
                mode = 0
                #print(current)
                moves.append(current)
                i = 0
                current = {}
                sections = []
            elif line.startswith(b"<td>"):
                current[sections[i]] = line.decode("utf-8")[4:-1]
                if sections[i] == "Input":
                    print("Scraping " + character + " " + current[sections[i]])
                i += 1
            elif b"class=\"image\"" in line:
                            pageURL = "https://www.dustloop.com" + line.decode("utf-8").split('\"')[3]
                            current["Image"] = "could not find image"
                            try:
                                u3 = urllib.request.urlopen(pageURL)
                                for line2 in u3.readlines():
                                    if b"fullImageLink" in line2:
                                        current["Image"] = "https://www.dustloop.com" + line2.decode("utf-8").split('\"')[7]
                                        break
                                if current["Image"] == "could not find image":
                                    print("Could not find image on: " + pageURL + " due to no fullImageLink found")
                            except Exception as e:
                                    print("Could not find image on: " + pageURL + " due to: " +str(e))
                                    current["Image"] = "server error"
        elif mode == -1:
            if b"<title>" in line:
                character = line.decode("utf-8").split("/")[1]
                mode = 0
                print("Scraping character: " + character + " (" + str(charI) + "/ " + str(len(charecterURLS)) + ")")
                charI += 1
    
    #print(character)
    
    json += "\t\"" + character + "\": {\n"
    
    for move in moves:
        if "Input" in move.keys() and move["Input"] != "":
            json += "\t\t\"" + move["Input"] + "\": {\n"
        elif "Name" in move.keys() and move["Name"] != "":
            json += "\t\t\"" + move["Name"] + "\": {\n"
        else:
            print("Unknown Move Name.. skipping")
            continue
    
        for key in move:
            json += "\t\t\t\"" + key + "\": \"" + move[key] + "\",\n"
        json = json[0:-2]
        json += "\n\t\t},\n"
    
    json = json[0:-2]
    json += "\n\t},\n"

json = json[0:-2]
json += "\n}"

file = open(sys.argv[1], "w")
file.write(json)
file.close()
