#!/bin/shell

import json

def renderCells(cells,name,en_name,jsId,gameId,menu,allTypes,buyCell):
    if(en_name != ''):
        en_name = en_name + "." + cells['name_en'];
    else:
        en_name = cells['name_en']
    if cells.get('children'):
        if(cells['name_cn']):
            name = name + cells['name_en'];
        for cell in cells['children']:
            renderCells(cell,name,en_name,jsId,gameId,menu,allTypes,buyCell)
    else:
        if menu.get(name):
            menu[name].append(cells)
        else:
            menu[name] = [];
            menu[name].append(cells);
        cells['jsId'] = jsId
        cells['type'] = en_name
        cells['gameId'] = gameId
        allTypes[cells['id']] = cells

def sortOnKeys(data):
    keys = [];
    for key in data:
        keys.append(key)
    keys = sorted(keys)
    print keys
    print len(keys)
    tempDict = {}
    for i in range(len(keys)):
        tempDict[keys[i]] = data[keys[i]]
    return tempDict


def main():
    json_data = open('buyCell.json').read()
    menuSet = json.loads(json_data)
    allData = json.loads(open('buyNo.json').read())
    #print allData['gameMethods']
    allTypes = {}
    menu = {}
    for game in allData['gameMethods']['1800'] :
        renderCells(game,'','',game['id'],allData['gameId'],menu,allTypes,menuSet)
    allTypes=sortOnKeys(allTypes)
    json.dump(allTypes,open('allTypesID','w'))
    #for me in menuSet:
    #    objectM = menuSet[me]
    #    print objectM
    #    newMenu[allTypes[int(me)]['type']] = objectM
    #json.dump(newMenu,open('newMenu.json','w'))






if __name__ == '__main__':
    main()
