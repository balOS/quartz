'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const pluginName = 'Backlinks Filtering';
const DEFAULT_SETTINGS = {
    BlFilterIdSetting: ""
};
class MyPlugin extends obsidian.Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("loading plugin: " + pluginName);
            this.myBlFilterId = "";
            this.filterArr = [];
            this.origFilterArr = [];
            this.origFilterArrAll = [];
            this.selectedFiltArr = [];
            this.headingsArr = [];
            this.noticeArr = [];
            this.openModal = null;
            this.registerView("backlink-filter", (leaf) => {
                // @ts-ignore
                const newView = this.app.viewRegistry.getViewCreatorByType("backlink")(leaf);
                newView.getViewType = () => "backlink-filter";
                return newView;
            });
            this.registerEvent(this.app.workspace.on('file-open', this.onFileChange.bind(this)));
            yield this.loadSettings();
            this.addCommand({
                id: "backlinks-filter-new",
                name: "Filter Backlinks",
                // callback: () => {
                // 	console.log('Simple Callback');
                // },
                checkCallback: (checking) => {
                    let leaf = this.app.workspace.activeLeaf;
                    if (leaf) {
                        if (!checking) {
                            loadFilter(this.app, this);
                        }
                        return true;
                    }
                    return false;
                },
            });
            this.addCommand({
                id: "backlinks-filter-update",
                name: "Clear Backlinks Filter",
                // callback: () => {
                // 	console.log('Simple Callback');
                // },
                checkCallback: (checking) => {
                    let leaf = this.app.workspace.activeLeaf;
                    if (leaf) {
                        if (!checking) {
                            loadBackLinks(this.app, this);
                        }
                        return true;
                    }
                    return false;
                },
            });
            this.app.workspace.onLayoutReady(this.onLayoutReady.bind(this));
        });
    }
    onFileChange() {
        loadBackLinks(this.app, this);
    }
    onLayoutReady() {
        loadBackLinks(this.app, this);
    }
    onunload() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Unloading plugin: " + pluginName);
            if (this.noticeArr.length > 0) {
                this.noticeArr.forEach(element => {
                    element.hide();
                });
            }
            this.app.workspace
                .getLeavesOfType('backlink-filter')
                .forEach((leaf) => leaf.detach());
        });
    }
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
        });
    }
    saveSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveData(this.settings);
        });
    }
}
function loadBackLinks(thisApp, thisPlugin) {
    return __awaiter(this, void 0, void 0, function* () {
        //console.log('Reloading backlinks pane');
        if (thisPlugin.noticeArr.length > 0) {
            thisPlugin.noticeArr.forEach(element => {
                element.hide();
            });
        }
        let viewCount = thisApp.workspace.getLeavesOfType('backlink-filter').length;
        if (viewCount > 1) {
            thisApp.workspace
                .getLeavesOfType('backlink-filter')
                .forEach((leaf) => leaf.detach());
        }
        viewCount = thisApp.workspace.getLeavesOfType('backlink-filter').length;
        if (viewCount == 0) {
            let tempLeaf = thisApp.workspace.getRightLeaf(false);
            yield tempLeaf.setViewState({ type: 'backlink-filter' });
        }
        let backlinkLeafNew = thisApp.workspace.getLeavesOfType('backlink-filter')[0];
        let backlinkViewNew = backlinkLeafNew.view;
        let backlinkViewNewBL;
        // @ts-ignore
        if (backlinkViewNew.backlink) {
            // @ts-ignore
            backlinkViewNewBL = backlinkViewNew.backlink;
        }
        else {
            backlinkViewNewBL = backlinkViewNew;
        }
        // @ts-ignore
        backlinkLeafNew.tabHeaderInnerIconEl.style.color = 'var(--interactive-accent)';
        // @ts-ignore
        thisPlugin.myBlFilterId = backlinkLeafNew.id;
        thisPlugin.selectedFiltArr = [];
        thisPlugin.origFilterArr = [];
        thisPlugin.origFilterArrAll = [];
        let syncFile = thisApp.workspace.getActiveFile();
        // @ts-ignore
        yield backlinkViewNew.loadFile(syncFile);
        yield backlinkViewNewBL.recomputeBacklink(backlinkViewNewBL.file);
    });
}
class inputModal extends obsidian.SuggestModal {
    constructor(app, thisPlugin) {
        super(app);
        this.thisPlugin = thisPlugin;
        this.setPlaceholder("Enter any keyword(s) to filter by plain text search...");
    }
    onOpen() {
        let modalBg = document.getElementsByClassName('modal-bg')[0];
        modalBg.style.backgroundColor = '#00000029';
        let modalPrompt = document.getElementsByClassName('prompt')[0];
        modalPrompt.style.border = '1px solid #483699';
        let modalInput = modalPrompt.getElementsByClassName('prompt-input')[0];
        modalInput.focus();
        modalInput.select();
    }
    getSuggestions(query) {
        return [query];
    }
    renderSuggestion(value, el) {
        el.innerText = value;
    }
    onChooseSuggestion(item, _) {
        processFilterSelection(this.app, this.thisPlugin, item, 'custom');
    }
}
class ModalSelectBlFilter extends obsidian.FuzzySuggestModal {
    constructor(app, linkSuggArr, thisPlugin) {
        super(app);
        this.linkSuggArr = linkSuggArr;
        this.thisPlugin = thisPlugin;
    }
    getItems() {
        //Runs one time for every character you type in modal
        let modalBg = document.getElementsByClassName('modal-bg')[0];
        modalBg.style.backgroundColor = '#00000029';
        let modalPrompt = document.getElementsByClassName('prompt')[0];
        modalPrompt.style.border = '1px solid #483699';
        return this.linkSuggArr;
    }
    getItemText(item) {
        //Runs every character you type ~85 times, so do NOT add code in here
        return item;
    }
    onChooseItem(item, evt) {
        processFilterSelection(this.app, this.thisPlugin, item, 'fuzzy');
    }
}
function processFilterSelection(thisApp, thisPlugin, filterItem, modalType) {
    return __awaiter(this, void 0, void 0, function* () {
        //console.log(filterItem);
        let filterArray = thisPlugin.filterArr;
        let pageName = [];
        let foundSettingId = thisPlugin.myBlFilterId;
        let backlinkLeafNew = thisApp.workspace.getLeafById(foundSettingId);
        let backlinkViewNew = backlinkLeafNew.view;
        let backlinkViewNewBL;
        // @ts-ignore
        if (backlinkViewNew.backlink) {
            // @ts-ignore
            backlinkViewNewBL = backlinkViewNew.backlink;
        }
        else {
            backlinkViewNewBL = backlinkViewNew;
        }
        if (modalType == 'custom') {
            pageName = [filterItem];
            //Add to the master array any matches from the custom keyword
            let blHeadArr = thisPlugin.headingsArr;
            // @ts-ignore
            let filesRemaining = backlinkViewNewBL.backlinkDom.getFiles();
            for (let m = 0; m < filesRemaining.length; m++) {
                let eachFile = filesRemaining[m];
                let filePath = eachFile.path;
                let fileContents = (yield thisApp.vault.cachedRead(eachFile)).toLowerCase();
                let foundLoc = fileContents.indexOf(filterItem.toLowerCase());
                if (foundLoc > -1) {
                    let blHeadFilteredArr = blHeadArr.filter(eachItem => eachItem[0] == filePath);
                    if (blHeadFilteredArr.length > 0) {
                        let foundKeyword = false;
                        while (!foundKeyword && foundLoc > -1) {
                            blHeadFilteredArr.forEach(eachHead => {
                                let headStart = eachHead[2];
                                let headEnd = eachHead[3];
                                if (foundLoc >= headStart && foundLoc <= headEnd) {
                                    thisPlugin.origFilterArr.push([filePath, filterItem]);
                                    thisPlugin.origFilterArrAll.push([filePath, filterItem]);
                                    foundKeyword = true;
                                }
                            });
                            foundLoc = fileContents.indexOf(filterItem.toLowerCase(), foundLoc + 1);
                            //console.log('found loc: ' + foundLoc);
                        }
                    }
                    else {
                        let allHeaders = thisApp.metadataCache.getCache(filePath).headings;
                        if (!allHeaders) {
                            thisPlugin.origFilterArr.push([filePath, filterItem]);
                            thisPlugin.origFilterArrAll.push([filePath, filterItem]);
                        }
                    }
                }
            }
            //console.log(thisPlugin.origFilterArr);
        }
        else {
            if (filterItem == '*Custom Keyword Search*') {
                thisPlugin.openModal.close();
                thisPlugin.openModal = new inputModal(thisApp, thisPlugin);
                thisPlugin.openModal.open();
                return;
            }
            else {
                pageName = filterArray.find(eachItem => {
                    let thisVal = eachItem[0] + ' (' + eachItem[1] + '|' + eachItem[2] + ')';
                    return thisVal == filterItem;
                });
            }
        }
        //console.log(pageName[0]);
        thisPlugin.selectedFiltArr.push(pageName[0]);
        let newNotice = new obsidian.Notice(filterItem, 2000000);
        // @ts-ignore
        newNotice.noticeEl.dataset.pageName = pageName[0];
        // @ts-ignore
        newNotice.noticeEl.addClass('bl-filter');
        // @ts-ignore
        newNotice.noticeEl.onclick = (event) => __awaiter(this, void 0, void 0, function* () {
            let filterValue = event.target.dataset.pageName;
            //console.log('remove filter: ' + filterValue);
            thisPlugin.openModal.close();
            let indexFound = thisPlugin.selectedFiltArr.indexOf(filterValue);
            thisPlugin.selectedFiltArr.splice(indexFound, 1);
            let foundSettingId = thisPlugin.myBlFilterId;
            let backlinkLeafNew = thisApp.workspace.getLeafById(foundSettingId);
            let backlinkViewNew = backlinkLeafNew.view;
            let backlinkViewNewBL;
            // @ts-ignore
            if (backlinkViewNew.backlink) {
                // @ts-ignore
                backlinkViewNewBL = backlinkViewNew.backlink;
            }
            else {
                backlinkViewNewBL = backlinkViewNew;
            }
            yield backlinkViewNewBL.recomputeBacklink(backlinkViewNewBL.file);
            // @ts-ignore
            var mySleep = m => new Promise(r => setTimeout(r, m));
            //Found no other way than to check the .running every 100 ms until completed. Max 20 times (2 seconds) just in case
            for (let x = 0; x < 20; x++) {
                // @ts-ignore
                if (backlinkViewNewBL.backlinkQueue.runnable.running) {
                    yield mySleep(100);
                }
                else {
                    break;
                }
            }
            yield mySleep(50);
            let blLinksArr = thisPlugin.origFilterArrAll;
            thisPlugin.selectedFiltArr.forEach((filteredItem) => {
                let blItemsFiltArr = blLinksArr.filter(eachItem => eachItem[1] == filteredItem);
                // @ts-ignore
                if (backlinkViewNewBL.collapseAllButtonEl.classList.contains('is-active') == false) {
                    backlinkViewNewBL.collapseAllButtonEl.click();
                }
                //Loop through the backlinks and if a file doesn't match the blItemsFiltArr then remove
                // @ts-ignore
                backlinkViewNewBL.backlinkDom.resultDomLookup.forEach(eachBlItem => {
                    let foundItems = [];
                    let thisFile = eachBlItem.file;
                    foundItems = blItemsFiltArr.filter(eachItem => eachItem[0] == thisFile.path);
                    if (foundItems.length == 0) {
                        let curCount = eachBlItem.result.content.length;
                        // @ts-ignore
                        backlinkViewNewBL.backlinkDom.removeResult(eachBlItem.file);
                        // @ts-ignore
                        backlinkViewNewBL.backlinkCountEl.textContent = (backlinkViewNewBL.backlinkCountEl.textContent - curCount).toString();
                    }
                });
            });
            let linkSuggArr = [];
            let linkSuggCtrArr = [];
            blLinksArr.forEach(eachItem => {
                if (!linkSuggArr.includes(eachItem[1])) {
                    linkSuggArr.push(eachItem[1]);
                    linkSuggCtrArr.push([eachItem[1], 1]);
                }
                else {
                    let foundIndex = linkSuggCtrArr.findIndex(eachLinkItem => eachLinkItem[0] == eachItem[1]);
                    let oldValue = linkSuggCtrArr[foundIndex][1];
                    linkSuggCtrArr[foundIndex][1] = oldValue + 1;
                }
            });
            let itemsRemaining = linkSuggCtrArr.filter(eachItem => !thisPlugin.selectedFiltArr.includes(eachItem[0]));
            itemsRemaining.sort(function (a, b) { return b[1] - a[1]; });
            itemsRemaining.forEach(eachItem => {
                eachItem[0] + ' (' + eachItem[1] + ')';
            });
            thisPlugin.filterArr = linkSuggCtrArr;
        });
        thisPlugin.noticeArr.push(newNotice);
        let noticeCont = document.getElementsByClassName('notice-container');
        if (noticeCont) {
            noticeCont[0].style.top = '50px';
            noticeCont[0].style.right = 'unset';
            noticeCont[0].style.left = '30px';
        }
        let blItemsArr = thisPlugin.origFilterArr;
        let blItemsFiltArr = blItemsArr.filter(eachItem => eachItem[1] == pageName[0]);
        /*
        console.log(blItemsArr);
        console.log(blItemsFiltArr);
        */
        // @ts-ignore
        if (backlinkViewNewBL.collapseAllButtonEl.classList.contains('is-active') == false) {
            backlinkViewNewBL.collapseAllButtonEl.click();
        }
        //Loop through the backlinks and if a file doesn't match the blItemsFiltArr then remove
        // @ts-ignore
        backlinkViewNewBL.backlinkDom.resultDomLookup.forEach(eachBlItem => {
            let foundItems = [];
            let thisFile = eachBlItem.file;
            foundItems = blItemsFiltArr.filter(eachItem => eachItem[0] == thisFile.path);
            if (foundItems.length == 0) {
                let curCount = eachBlItem.result.content.length;
                // @ts-ignore
                backlinkViewNewBL.backlinkDom.removeResult(eachBlItem.file);
                // @ts-ignore
                backlinkViewNewBL.backlinkCountEl.textContent = (backlinkViewNewBL.backlinkCountEl.textContent - curCount).toString();
            }
        });
        loadFilter(thisApp, thisPlugin);
    });
}
function loadFilter(thisApp, thisPlugin) {
    return __awaiter(this, void 0, void 0, function* () {
        //console.log("loadFilter");
        let viewCount = thisApp.workspace.getLeavesOfType('backlink-filter').length;
        if (viewCount != 1) {
            yield loadBackLinks(thisApp, thisPlugin);
        }
        let foundSettingId = thisPlugin.myBlFilterId;
        let backlinkLeafNew = thisApp.workspace.getLeafById(foundSettingId);
        let backlinkViewNew = backlinkLeafNew.view;
        let backlinkViewNewBL;
        // @ts-ignore
        if (backlinkViewNew.backlink) {
            // @ts-ignore
            backlinkViewNewBL = backlinkViewNew.backlink;
        }
        else {
            backlinkViewNewBL = backlinkViewNew;
        }
        thisApp.workspace.revealLeaf(backlinkLeafNew);
        if (viewCount != 1) {
            yield loadBackLinks(thisApp, thisPlugin);
            // @ts-ignore
            var mySleep = m => new Promise(r => setTimeout(r, m));
            for (let x = 0; x < 20; x++) {
                // @ts-ignore
                if (backlinkViewNewBL.backlinkQueue.runnable.running) {
                    yield mySleep(100);
                }
                else {
                    break;
                }
            }
            yield mySleep(50);
        }
        // @ts-ignore
        if (backlinkViewNewBL.collapseAllButtonEl.classList.contains('is-active') == false) {
            backlinkViewNewBL.collapseAllButtonEl.click();
        }
        let curPageName = backlinkViewNewBL.file.basename;
        let curPagePath = backlinkViewNewBL.file.path.replace(backlinkViewNewBL.file.name, curPageName);
        //console.log(curPageName);
        let blLinksArr = [];
        let blTagsArr = [];
        let blHeadingsArr = [];
        // @ts-ignore
        backlinkViewNewBL.backlinkDom.resultDomLookup.forEach(eachItem => {
            //Looping each file with a match in backlinks
            let thisFile = eachItem.file;
            let allLinks = thisApp.metadataCache.getCache(thisFile.path).links;
            let allHeaders = thisApp.metadataCache.getCache(thisFile.path).headings;
            let allTags = thisApp.metadataCache.getCache(thisFile.path).tags;
            let firstHeader = -1;
            if (allHeaders) {
                firstHeader = allHeaders[0].position.start.offset;
            }
            let endOfFileCharOffset = thisFile.stat.size;
            let eachHeadAddedArr = [];
            // @ts-ignore
            eachItem.result.content.forEach(eachRes => {
                //Looping each backlink match location in each file (each result)
                //console.log(eachItem.file.path);
                let blPos = eachRes;
                let headLvl = 0;
                let blHeadArr = [];
                //If there are headers on your page vs just text without any headers
                if (allHeaders) {
                    //If there is any text above the first header on the page with a backlink page ref in it, add items for filtering
                    if (firstHeader > 1 && blPos[0] < firstHeader) {
                        if (!eachHeadAddedArr.includes(firstHeader)) {
                            blHeadArr.push([0, 0, firstHeader]);
                            blHeadingsArr.push([eachItem.file.path, 0, 0, firstHeader]);
                            eachHeadAddedArr.push(firstHeader);
                        }
                    }
                    if (blPos[0] >= firstHeader) {
                        //Look through all the headers to populate the "related" parent/child header sections
                        for (let h = 0; h < allHeaders.length; h++) {
                            let eachHead = allHeaders[h];
                            if (blPos[0] < eachHead.position.start.offset) {
                                let nextParent = headLvl;
                                //Now look through the headers "above" the backlink location... aka parents
                                for (let i = (h - 1); i >= 0; i--) {
                                    if (allHeaders[i].level <= nextParent) {
                                        if (i < h - 1 && allHeaders[i].level < headLvl - 1) {
                                            if (!eachHeadAddedArr.includes(allHeaders[i].position.end.offset)) {
                                                blHeadArr.push([allHeaders[i].level, allHeaders[i].position.start.offset, allHeaders[i].position.end.offset]);
                                                blHeadingsArr.push([eachItem.file.path, allHeaders[i].level, allHeaders[i].position.start.offset, allHeaders[i].position.end.offset]);
                                                eachHeadAddedArr.push(allHeaders[i].position.end.offset);
                                            }
                                        }
                                        else {
                                            if (!eachHeadAddedArr.includes(allHeaders[i + 1].position.start.offset)) {
                                                blHeadArr.push([allHeaders[i].level, allHeaders[i].position.start.offset, allHeaders[i + 1].position.start.offset]);
                                                blHeadingsArr.push([eachItem.file.path, allHeaders[i].level, allHeaders[i].position.start.offset, allHeaders[i + 1].position.start.offset]);
                                                eachHeadAddedArr.push(allHeaders[i + 1].position.start.offset);
                                            }
                                        }
                                        nextParent--;
                                    }
                                    if (nextParent <= 0) {
                                        break;
                                    }
                                }
                                //Now look through the headers "below" the backlink location... aka children
                                for (let i = h; i < allHeaders.length; i++) {
                                    if (allHeaders[i].level > headLvl) {
                                        if (allHeaders[i + 1]) {
                                            if (!eachHeadAddedArr.includes(allHeaders[i + 1].position.start.offset)) {
                                                blHeadArr.push([allHeaders[i].level, allHeaders[i].position.start.offset, allHeaders[i + 1].position.start.offset]);
                                                blHeadingsArr.push([eachItem.file.path, allHeaders[i].level, allHeaders[i].position.start.offset, allHeaders[i + 1].position.start.offset]);
                                                eachHeadAddedArr.push(allHeaders[i + 1].position.start.offset);
                                            }
                                        }
                                        else {
                                            if (!eachHeadAddedArr.includes(endOfFileCharOffset)) {
                                                blHeadArr.push([allHeaders[i].level, allHeaders[i].position.start.offset, endOfFileCharOffset]);
                                                blHeadingsArr.push([eachItem.file.path, allHeaders[i].level, allHeaders[i].position.start.offset, endOfFileCharOffset]);
                                                eachHeadAddedArr.push(endOfFileCharOffset);
                                            }
                                        }
                                    }
                                    else {
                                        break;
                                    }
                                }
                                break;
                            }
                            else {
                                //This accounts for when the backlink is found under the very last header on the page
                                headLvl = eachHead.level;
                                if (h == allHeaders.length - 1) {
                                    if (blPos[0] < endOfFileCharOffset && blPos[0] > eachHead.position.start.offset && !eachHeadAddedArr.includes(endOfFileCharOffset)) {
                                        blHeadArr.push([eachHead.level, eachHead.position.start.offset, endOfFileCharOffset]);
                                        blHeadingsArr.push([eachItem.file.path, eachHead.level, eachHead.position.start.offset, endOfFileCharOffset]);
                                        eachHeadAddedArr.push(endOfFileCharOffset);
                                        let nextParent = headLvl;
                                        //Now look through the headers "above" the backlink location... aka parents
                                        for (let i = (h - 1); i >= 0; i--) {
                                            if (allHeaders[i].level <= nextParent) {
                                                if (i < h - 1 && allHeaders[i].level < headLvl - 1) {
                                                    //h - 1 means the direct parent one level up.
                                                    //It will only grab links / tags from sub text of a header when direct parent.
                                                    //Other levels more than 1 levels above will only grab links / tags from the header itself.
                                                    if (!eachHeadAddedArr.includes(allHeaders[i].position.end.offset)) {
                                                        blHeadArr.push([allHeaders[i].level, allHeaders[i].position.start.offset, allHeaders[i].position.end.offset]);
                                                        blHeadingsArr.push([eachItem.file.path, allHeaders[i].level, allHeaders[i].position.start.offset, allHeaders[i].position.end.offset]);
                                                        eachHeadAddedArr.push(allHeaders[i].position.end.offset);
                                                    }
                                                }
                                                else {
                                                    if (!eachHeadAddedArr.includes(allHeaders[i + 1].position.start.offset)) {
                                                        blHeadArr.push([allHeaders[i].level, allHeaders[i].position.start.offset, allHeaders[i + 1].position.start.offset]);
                                                        blHeadingsArr.push([eachItem.file.path, allHeaders[i].level, allHeaders[i].position.start.offset, allHeaders[i + 1].position.start.offset]);
                                                        eachHeadAddedArr.push(allHeaders[i + 1].position.start.offset);
                                                    }
                                                }
                                                nextParent--;
                                            }
                                            if (nextParent <= 0) {
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    blHeadArr.forEach(eachHead => {
                        if (allLinks) {
                            allLinks.forEach(eachLink => {
                                if (curPageName != eachLink.link && curPagePath != eachLink.link && eachHead[1] <= eachLink.position.start.offset && eachHead[2] >= eachLink.position.end.offset) {
                                    blLinksArr.push([eachItem.file.path, eachLink.link]);
                                }
                            });
                        }
                        if (allTags) {
                            allTags.forEach(eachTag => {
                                if (eachHead[1] <= eachTag.position.start.offset && eachHead[2] >= eachTag.position.end.offset) {
                                    blTagsArr.push([eachItem.file.path, eachTag.tag]);
                                }
                            });
                        }
                    });
                }
                else {
                    //console.log('no headers in page so include all links and tags from page');
                    if (!eachHeadAddedArr.includes(-1)) {
                        if (allLinks) {
                            allLinks.forEach(eachLink => {
                                if (curPageName != eachLink.link && curPagePath != eachLink.link) {
                                    blLinksArr.push([eachItem.file.path, eachLink.link]);
                                    eachHeadAddedArr.push(-1);
                                }
                            });
                        }
                        if (allTags) {
                            allTags.forEach(eachTag => {
                                blTagsArr.push([eachItem.file.path, eachTag.tag]);
                                eachHeadAddedArr.push(-1);
                            });
                        }
                    }
                }
            });
            blLinksArr.push([eachItem.file.path, thisFile.basename]);
        });
        thisPlugin.origFilterArr = blLinksArr.concat(blTagsArr);
        if (thisPlugin.origFilterArrAll.length == 0) {
            thisPlugin.origFilterArrAll = thisPlugin.origFilterArr;
        }
        thisPlugin.headingsArr = blHeadingsArr;
        let linkSuggArr = [];
        let linkSuggCtrArr = [];
        let linkSuggPgArr = [];
        //console.log('Getting list to filter');
        blLinksArr.forEach(eachItem => {
            if (!linkSuggArr.includes(eachItem[1])) {
                linkSuggArr.push(eachItem[1]);
                linkSuggPgArr.push(eachItem[0] + eachItem[1]);
                linkSuggCtrArr.push([eachItem[1], 1, 1]);
            }
            else {
                let foundIndex = linkSuggCtrArr.findIndex(eachLinkItem => eachLinkItem[0] == eachItem[1]);
                let oldValue = linkSuggCtrArr[foundIndex][2];
                linkSuggCtrArr[foundIndex][2] = oldValue + 1;
                if (!linkSuggPgArr.includes(eachItem[0] + eachItem[1])) {
                    linkSuggPgArr.push(eachItem[0] + eachItem[1]);
                    oldValue = linkSuggCtrArr[foundIndex][1];
                    linkSuggCtrArr[foundIndex][1] = oldValue + 1;
                }
            }
        });
        let tagSuggArr = [];
        let tagSuggCtrArr = [];
        let tagSuggPgArr = [];
        blTagsArr.forEach(eachItem => {
            if (!tagSuggArr.includes(eachItem[1])) {
                tagSuggArr.push(eachItem[1]);
                tagSuggPgArr.push(eachItem[0] + eachItem[1]);
                tagSuggCtrArr.push([eachItem[1], 1, 1]);
            }
            else {
                let foundIndex = tagSuggCtrArr.findIndex(eachTagItem => eachTagItem[0] == eachItem[1]);
                let oldValue = tagSuggCtrArr[foundIndex][2];
                tagSuggCtrArr[foundIndex][2] = oldValue + 1;
                if (!tagSuggPgArr.includes(eachItem[0] + eachItem[1])) {
                    tagSuggPgArr.push(eachItem[0] + eachItem[1]);
                    oldValue = tagSuggCtrArr[foundIndex][1];
                    tagSuggCtrArr[foundIndex][1] = oldValue + 1;
                }
            }
        });
        let newLinkSuggArr = [];
        //Add filter value placeholder for Plain Text keyword search
        newLinkSuggArr.push('*Custom Keyword Search*');
        let itemsRemaining = tagSuggCtrArr.filter(eachItem => !thisPlugin.selectedFiltArr.includes(eachItem[0]));
        itemsRemaining.sort(function (a, b) { return b[2] - a[2]; });
        itemsRemaining.sort(function (a, b) { return b[1] - a[1]; });
        itemsRemaining.forEach(eachItem => {
            let itemWithCount = eachItem[0] + ' (' + eachItem[1] + '|' + eachItem[2] + ')';
            if (!newLinkSuggArr.includes(itemWithCount)) {
                newLinkSuggArr.push(itemWithCount);
            }
        });
        itemsRemaining = linkSuggCtrArr.filter(eachItem => !thisPlugin.selectedFiltArr.includes(eachItem[0]));
        itemsRemaining.sort(function (a, b) { return b[2] - a[2]; });
        itemsRemaining.sort(function (a, b) { return b[1] - a[1]; });
        itemsRemaining.forEach(eachItem => {
            let itemWithCount = eachItem[0] + ' (' + eachItem[1] + '|' + eachItem[2] + ')';
            if (!newLinkSuggArr.includes(itemWithCount)) {
                newLinkSuggArr.push(itemWithCount);
            }
        });
        thisPlugin.filterArr = linkSuggCtrArr.concat(tagSuggCtrArr);
        thisPlugin.openModal = new ModalSelectBlFilter(thisApp, newLinkSuggArr, thisPlugin);
        thisPlugin.openModal.open();
    });
}

module.exports = MyPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20pIHtcclxuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGZyb20ubGVuZ3RoLCBqID0gdG8ubGVuZ3RoOyBpIDwgaWw7IGkrKywgaisrKVxyXG4gICAgICAgIHRvW2pdID0gZnJvbVtpXTtcclxuICAgIHJldHVybiB0bztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIGdldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIHNldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5wdXRUeXBlIH0gZnJvbSBcIm5vZGU6emxpYlwiO1xyXG5pbXBvcnQgeyBBcHAsIEZ1enp5U3VnZ2VzdE1vZGFsLCBNb2RhbCwgTm90aWNlLCBQbHVnaW4sIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcsIFN1Z2dlc3RNb2RhbCwgZ2V0QWxsVGFncywgUGx1Z2luXzIsIFdvcmtzcGFjZUxlYWYsIFZpZXcsIFRGaWxlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcbmNvbnN0IHBsdWdpbk5hbWUgPSAnQmFja2xpbmtzIEZpbHRlcmluZyc7XHJcblxyXG5pbnRlcmZhY2UgTXlQbHVnaW5TZXR0aW5ncyB7XHJcbiAgICBCbEZpbHRlcklkU2V0dGluZzogc3RyaW5nO1xyXG59XHJcblxyXG5jb25zdCBERUZBVUxUX1NFVFRJTkdTOiBNeVBsdWdpblNldHRpbmdzID0ge1xyXG4gICAgQmxGaWx0ZXJJZFNldHRpbmc6IFwiXCJcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE15UGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcclxuICAgIHNldHRpbmdzOiBNeVBsdWdpblNldHRpbmdzO1xyXG4gICAgbXlCbEZpbHRlcklkOiBzdHJpbmc7XHJcbiAgICBmaWx0ZXJBcnI6IEFycmF5PGFueT47XHJcbiAgICBvcmlnRmlsdGVyQXJyOiBBcnJheTxhbnk+O1xyXG4gICAgb3JpZ0ZpbHRlckFyckFsbDogQXJyYXk8YW55PjtcclxuICAgIHNlbGVjdGVkRmlsdEFycjogQXJyYXk8YW55PjtcclxuICAgIGhlYWRpbmdzQXJyOiBBcnJheTxhbnk+O1xyXG4gICAgbm90aWNlQXJyOiBBcnJheTxhbnk+O1xyXG4gICAgb3Blbk1vZGFsOiBhbnk7XHJcblxyXG4gICAgYXN5bmMgb25sb2FkKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibG9hZGluZyBwbHVnaW46IFwiICsgcGx1Z2luTmFtZSk7XHJcblxyXG4gICAgICAgIHRoaXMubXlCbEZpbHRlcklkID0gXCJcIjtcclxuICAgICAgICB0aGlzLmZpbHRlckFyciA9IFtdO1xyXG4gICAgICAgIHRoaXMub3JpZ0ZpbHRlckFyciA9IFtdO1xyXG4gICAgICAgIHRoaXMub3JpZ0ZpbHRlckFyckFsbCA9IFtdO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRGaWx0QXJyID0gW107XHJcbiAgICAgICAgdGhpcy5oZWFkaW5nc0FyciA9IFtdO1xyXG4gICAgICAgIHRoaXMubm90aWNlQXJyID0gW107XHJcbiAgICAgICAgdGhpcy5vcGVuTW9kYWwgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLnJlZ2lzdGVyVmlldyhcImJhY2tsaW5rLWZpbHRlclwiLCAobGVhZjogV29ya3NwYWNlTGVhZikgPT4ge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1ZpZXc6IFZpZXcgPSB0aGlzLmFwcC52aWV3UmVnaXN0cnkuZ2V0Vmlld0NyZWF0b3JCeVR5cGUoXCJiYWNrbGlua1wiKShsZWFmKTtcclxuICAgICAgICAgICAgbmV3Vmlldy5nZXRWaWV3VHlwZSA9ICgpID0+IFwiYmFja2xpbmstZmlsdGVyXCI7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXdWaWV3O1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KHRoaXMuYXBwLndvcmtzcGFjZS5vbignZmlsZS1vcGVuJywgdGhpcy5vbkZpbGVDaGFuZ2UuYmluZCh0aGlzKSkpO1xyXG5cclxuICAgICAgICBhd2FpdCB0aGlzLmxvYWRTZXR0aW5ncygpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZENvbW1hbmQoe1xyXG4gICAgICAgICAgICBpZDogXCJiYWNrbGlua3MtZmlsdGVyLW5ld1wiLFxyXG4gICAgICAgICAgICBuYW1lOiBcIkZpbHRlciBCYWNrbGlua3NcIixcclxuICAgICAgICAgICAgLy8gY2FsbGJhY2s6ICgpID0+IHtcclxuICAgICAgICAgICAgLy8gXHRjb25zb2xlLmxvZygnU2ltcGxlIENhbGxiYWNrJyk7XHJcbiAgICAgICAgICAgIC8vIH0sXHJcbiAgICAgICAgICAgIGNoZWNrQ2FsbGJhY2s6IChjaGVja2luZzogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxlYWYgPSB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZjtcclxuICAgICAgICAgICAgICAgIGlmIChsZWFmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjaGVja2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkRmlsdGVyKHRoaXMuYXBwLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkQ29tbWFuZCh7XHJcbiAgICAgICAgICAgIGlkOiBcImJhY2tsaW5rcy1maWx0ZXItdXBkYXRlXCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiQ2xlYXIgQmFja2xpbmtzIEZpbHRlclwiLFxyXG4gICAgICAgICAgICAvLyBjYWxsYmFjazogKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBcdGNvbnNvbGUubG9nKCdTaW1wbGUgQ2FsbGJhY2snKTtcclxuICAgICAgICAgICAgLy8gfSxcclxuICAgICAgICAgICAgY2hlY2tDYWxsYmFjazogKGNoZWNraW5nOiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGVhZiA9IHRoaXMuYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxlYWYpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNoZWNraW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRCYWNrTGlua3ModGhpcy5hcHAsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLm9uTGF5b3V0UmVhZHkodGhpcy5vbkxheW91dFJlYWR5LmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRmlsZUNoYW5nZSgpOiB2b2lkIHtcclxuICAgICAgICBsb2FkQmFja0xpbmtzKHRoaXMuYXBwLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkxheW91dFJlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgIGxvYWRCYWNrTGlua3ModGhpcy5hcHAsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG9udW5sb2FkKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVW5sb2FkaW5nIHBsdWdpbjogXCIgKyBwbHVnaW5OYW1lKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMubm90aWNlQXJyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5ub3RpY2VBcnIuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuaGlkZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYXBwLndvcmtzcGFjZVxyXG4gICAgICAgICAgICAuZ2V0TGVhdmVzT2ZUeXBlKCdiYWNrbGluay1maWx0ZXInKVxyXG4gICAgICAgICAgICAuZm9yRWFjaCgobGVhZjogV29ya3NwYWNlTGVhZikgPT4gbGVhZi5kZXRhY2goKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgbG9hZFNldHRpbmdzKCkge1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1NFVFRJTkdTLCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHNhdmVTZXR0aW5ncygpIHtcclxuICAgICAgICBhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBsb2FkQmFja0xpbmtzKHRoaXNBcHA6IEFwcCwgdGhpc1BsdWdpbjogTXlQbHVnaW4pIHtcclxuICAgIC8vY29uc29sZS5sb2coJ1JlbG9hZGluZyBiYWNrbGlua3MgcGFuZScpO1xyXG4gICAgaWYgKHRoaXNQbHVnaW4ubm90aWNlQXJyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB0aGlzUGx1Z2luLm5vdGljZUFyci5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBlbGVtZW50LmhpZGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdmlld0NvdW50ID0gdGhpc0FwcC53b3Jrc3BhY2UuZ2V0TGVhdmVzT2ZUeXBlKCdiYWNrbGluay1maWx0ZXInKS5sZW5ndGg7XHJcblxyXG4gICAgaWYgKHZpZXdDb3VudCA+IDEpIHtcclxuICAgICAgICB0aGlzQXBwLndvcmtzcGFjZVxyXG4gICAgICAgICAgICAuZ2V0TGVhdmVzT2ZUeXBlKCdiYWNrbGluay1maWx0ZXInKVxyXG4gICAgICAgICAgICAuZm9yRWFjaCgobGVhZjogV29ya3NwYWNlTGVhZikgPT4gbGVhZi5kZXRhY2goKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmlld0NvdW50ID0gdGhpc0FwcC53b3Jrc3BhY2UuZ2V0TGVhdmVzT2ZUeXBlKCdiYWNrbGluay1maWx0ZXInKS5sZW5ndGg7XHJcblxyXG4gICAgaWYgKHZpZXdDb3VudCA9PSAwKSB7XHJcbiAgICAgICAgbGV0IHRlbXBMZWFmID0gdGhpc0FwcC53b3Jrc3BhY2UuZ2V0UmlnaHRMZWFmKGZhbHNlKTtcclxuICAgICAgICBhd2FpdCB0ZW1wTGVhZi5zZXRWaWV3U3RhdGUoeyB0eXBlOiAnYmFja2xpbmstZmlsdGVyJyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgYmFja2xpbmtMZWFmTmV3OiBXb3Jrc3BhY2VMZWFmID0gdGhpc0FwcC53b3Jrc3BhY2UuZ2V0TGVhdmVzT2ZUeXBlKCdiYWNrbGluay1maWx0ZXInKVswXTtcclxuICAgIGxldCBiYWNrbGlua1ZpZXdOZXc6IFZpZXcgPSBiYWNrbGlua0xlYWZOZXcudmlldztcclxuXHJcbiAgICBsZXQgYmFja2xpbmtWaWV3TmV3Qkw6IGFueTtcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIGlmIChiYWNrbGlua1ZpZXdOZXcuYmFja2xpbmspIHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgYmFja2xpbmtWaWV3TmV3QkwgPSBiYWNrbGlua1ZpZXdOZXcuYmFja2xpbms7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGJhY2tsaW5rVmlld05ld0JMID0gYmFja2xpbmtWaWV3TmV3O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIGJhY2tsaW5rTGVhZk5ldy50YWJIZWFkZXJJbm5lckljb25FbC5zdHlsZS5jb2xvciA9ICd2YXIoLS1pbnRlcmFjdGl2ZS1hY2NlbnQpJztcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIHRoaXNQbHVnaW4ubXlCbEZpbHRlcklkID0gYmFja2xpbmtMZWFmTmV3LmlkO1xyXG4gICAgdGhpc1BsdWdpbi5zZWxlY3RlZEZpbHRBcnIgPSBbXTtcclxuICAgIHRoaXNQbHVnaW4ub3JpZ0ZpbHRlckFyciA9IFtdO1xyXG4gICAgdGhpc1BsdWdpbi5vcmlnRmlsdGVyQXJyQWxsID0gW107XHJcblxyXG4gICAgbGV0IHN5bmNGaWxlID0gdGhpc0FwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlRmlsZSgpO1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgYXdhaXQgYmFja2xpbmtWaWV3TmV3LmxvYWRGaWxlKHN5bmNGaWxlKTtcclxuICAgIGF3YWl0IGJhY2tsaW5rVmlld05ld0JMLnJlY29tcHV0ZUJhY2tsaW5rKGJhY2tsaW5rVmlld05ld0JMLmZpbGUpO1xyXG59XHJcblxyXG5jbGFzcyBpbnB1dE1vZGFsIGV4dGVuZHMgU3VnZ2VzdE1vZGFsPHN0cmluZz4ge1xyXG4gICAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHByaXZhdGUgdGhpc1BsdWdpbjogTXlQbHVnaW4pIHtcclxuICAgICAgICBzdXBlcihhcHApO1xyXG4gICAgICAgIHRoaXMuc2V0UGxhY2Vob2xkZXIoXCJFbnRlciBhbnkga2V5d29yZChzKSB0byBmaWx0ZXIgYnkgcGxhaW4gdGV4dCBzZWFyY2guLi5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgb25PcGVuKCkge1xyXG4gICAgICAgIGxldCBtb2RhbEJnOiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtb2RhbC1iZycpWzBdO1xyXG4gICAgICAgIG1vZGFsQmcuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyMwMDAwMDAyOSc7XHJcbiAgICAgICAgbGV0IG1vZGFsUHJvbXB0OiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwcm9tcHQnKVswXTtcclxuICAgICAgICBtb2RhbFByb21wdC5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkICM0ODM2OTknO1xyXG4gICAgICAgIGxldCBtb2RhbElucHV0ID0gbW9kYWxQcm9tcHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncHJvbXB0LWlucHV0JylbMF1cclxuICAgICAgICBtb2RhbElucHV0LmZvY3VzKCk7XHJcbiAgICAgICAgbW9kYWxJbnB1dC5zZWxlY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTdWdnZXN0aW9ucyhxdWVyeTogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiBbcXVlcnldO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclN1Z2dlc3Rpb24odmFsdWU6IHN0cmluZywgZWw6IEhUTUxFbGVtZW50KTogdm9pZCB7XHJcbiAgICAgICAgZWwuaW5uZXJUZXh0ID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgb25DaG9vc2VTdWdnZXN0aW9uKGl0ZW06IHN0cmluZywgXzogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBwcm9jZXNzRmlsdGVyU2VsZWN0aW9uKHRoaXMuYXBwLCB0aGlzLnRoaXNQbHVnaW4sIGl0ZW0sICdjdXN0b20nKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTW9kYWxTZWxlY3RCbEZpbHRlciBleHRlbmRzIEZ1enp5U3VnZ2VzdE1vZGFsPHN0cmluZz4ge1xyXG4gICAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHByaXZhdGUgbGlua1N1Z2dBcnI6IEFycmF5PGFueT4sIHByaXZhdGUgdGhpc1BsdWdpbjogTXlQbHVnaW4pIHtcclxuICAgICAgICBzdXBlcihhcHApO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEl0ZW1zKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICAvL1J1bnMgb25lIHRpbWUgZm9yIGV2ZXJ5IGNoYXJhY3RlciB5b3UgdHlwZSBpbiBtb2RhbFxyXG4gICAgICAgIGxldCBtb2RhbEJnOiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtb2RhbC1iZycpWzBdO1xyXG4gICAgICAgIG1vZGFsQmcuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyMwMDAwMDAyOSc7XHJcbiAgICAgICAgbGV0IG1vZGFsUHJvbXB0OiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwcm9tcHQnKVswXTtcclxuICAgICAgICBtb2RhbFByb21wdC5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkICM0ODM2OTknO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5saW5rU3VnZ0FycjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJdGVtVGV4dChpdGVtOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIC8vUnVucyBldmVyeSBjaGFyYWN0ZXIgeW91IHR5cGUgfjg1IHRpbWVzLCBzbyBkbyBOT1QgYWRkIGNvZGUgaW4gaGVyZVxyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2hvb3NlSXRlbShpdGVtOiBzdHJpbmcsIGV2dDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBwcm9jZXNzRmlsdGVyU2VsZWN0aW9uKHRoaXMuYXBwLCB0aGlzLnRoaXNQbHVnaW4sIGl0ZW0sICdmdXp6eScpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzRmlsdGVyU2VsZWN0aW9uKHRoaXNBcHA6IEFwcCwgdGhpc1BsdWdpbjogTXlQbHVnaW4sIGZpbHRlckl0ZW06IHN0cmluZywgbW9kYWxUeXBlOiBzdHJpbmcpIHtcclxuICAgIC8vY29uc29sZS5sb2coZmlsdGVySXRlbSk7XHJcbiAgICBsZXQgZmlsdGVyQXJyYXk6IEFycmF5PGFueT4gPSB0aGlzUGx1Z2luLmZpbHRlckFycjtcclxuICAgIGxldCBwYWdlTmFtZTogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgbGV0IGZvdW5kU2V0dGluZ0lkID0gdGhpc1BsdWdpbi5teUJsRmlsdGVySWQ7XHJcbiAgICBsZXQgYmFja2xpbmtMZWFmTmV3OiBXb3Jrc3BhY2VMZWFmID0gdGhpc0FwcC53b3Jrc3BhY2UuZ2V0TGVhZkJ5SWQoZm91bmRTZXR0aW5nSWQpO1xyXG4gICAgbGV0IGJhY2tsaW5rVmlld05ldzogVmlldyA9IGJhY2tsaW5rTGVhZk5ldy52aWV3O1xyXG5cclxuICAgIGxldCBiYWNrbGlua1ZpZXdOZXdCTDogYW55O1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgaWYgKGJhY2tsaW5rVmlld05ldy5iYWNrbGluaykge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBiYWNrbGlua1ZpZXdOZXdCTCA9IGJhY2tsaW5rVmlld05ldy5iYWNrbGluaztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYmFja2xpbmtWaWV3TmV3QkwgPSBiYWNrbGlua1ZpZXdOZXc7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1vZGFsVHlwZSA9PSAnY3VzdG9tJykge1xyXG4gICAgICAgIHBhZ2VOYW1lID0gW2ZpbHRlckl0ZW1dO1xyXG4gICAgICAgIC8vQWRkIHRvIHRoZSBtYXN0ZXIgYXJyYXkgYW55IG1hdGNoZXMgZnJvbSB0aGUgY3VzdG9tIGtleXdvcmRcclxuICAgICAgICBsZXQgYmxIZWFkQXJyOiBBcnJheTxhbnk+ID0gdGhpc1BsdWdpbi5oZWFkaW5nc0FycjtcclxuXHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIGxldCBmaWxlc1JlbWFpbmluZzogQXJyYXk8VEZpbGU+ID0gYmFja2xpbmtWaWV3TmV3QkwuYmFja2xpbmtEb20uZ2V0RmlsZXMoKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgbSA9IDA7IG0gPCBmaWxlc1JlbWFpbmluZy5sZW5ndGg7IG0rKykge1xyXG4gICAgICAgICAgICBsZXQgZWFjaEZpbGU6IFRGaWxlID0gZmlsZXNSZW1haW5pbmdbbV07XHJcbiAgICAgICAgICAgIGxldCBmaWxlUGF0aDogc3RyaW5nID0gZWFjaEZpbGUucGF0aDtcclxuICAgICAgICAgICAgbGV0IGZpbGVDb250ZW50czogc3RyaW5nID0gKGF3YWl0IHRoaXNBcHAudmF1bHQuY2FjaGVkUmVhZChlYWNoRmlsZSkpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGxldCBmb3VuZExvYyA9IGZpbGVDb250ZW50cy5pbmRleE9mKGZpbHRlckl0ZW0udG9Mb3dlckNhc2UoKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZm91bmRMb2MgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJsSGVhZEZpbHRlcmVkQXJyOiBBcnJheTxhbnk+ID0gYmxIZWFkQXJyLmZpbHRlcihlYWNoSXRlbSA9PiBlYWNoSXRlbVswXSA9PSBmaWxlUGF0aCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmxIZWFkRmlsdGVyZWRBcnIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZvdW5kS2V5d29yZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKCFmb3VuZEtleXdvcmQgJiYgZm91bmRMb2MgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJsSGVhZEZpbHRlcmVkQXJyLmZvckVhY2goZWFjaEhlYWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGVhZFN0YXJ0ID0gZWFjaEhlYWRbMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoZWFkRW5kID0gZWFjaEhlYWRbM107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3VuZExvYyA+PSBoZWFkU3RhcnQgJiYgZm91bmRMb2MgPD0gaGVhZEVuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1BsdWdpbi5vcmlnRmlsdGVyQXJyLnB1c2goW2ZpbGVQYXRoLCBmaWx0ZXJJdGVtXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzUGx1Z2luLm9yaWdGaWx0ZXJBcnJBbGwucHVzaChbZmlsZVBhdGgsIGZpbHRlckl0ZW1dKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kS2V5d29yZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBmb3VuZExvYyA9IGZpbGVDb250ZW50cy5pbmRleE9mKGZpbHRlckl0ZW0udG9Mb3dlckNhc2UoKSwgZm91bmRMb2MgKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnZm91bmQgbG9jOiAnICsgZm91bmRMb2MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYWxsSGVhZGVycyA9IHRoaXNBcHAubWV0YWRhdGFDYWNoZS5nZXRDYWNoZShmaWxlUGF0aCkuaGVhZGluZ3M7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhbGxIZWFkZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNQbHVnaW4ub3JpZ0ZpbHRlckFyci5wdXNoKFtmaWxlUGF0aCwgZmlsdGVySXRlbV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzUGx1Z2luLm9yaWdGaWx0ZXJBcnJBbGwucHVzaChbZmlsZVBhdGgsIGZpbHRlckl0ZW1dKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXNQbHVnaW4ub3JpZ0ZpbHRlckFycik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChmaWx0ZXJJdGVtID09ICcqQ3VzdG9tIEtleXdvcmQgU2VhcmNoKicpIHtcclxuICAgICAgICAgICAgdGhpc1BsdWdpbi5vcGVuTW9kYWwuY2xvc2UoKTtcclxuICAgICAgICAgICAgdGhpc1BsdWdpbi5vcGVuTW9kYWwgPSBuZXcgaW5wdXRNb2RhbCh0aGlzQXBwLCB0aGlzUGx1Z2luKTtcclxuICAgICAgICAgICAgdGhpc1BsdWdpbi5vcGVuTW9kYWwub3BlbigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGFnZU5hbWUgPSBmaWx0ZXJBcnJheS5maW5kKGVhY2hJdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB0aGlzVmFsID0gZWFjaEl0ZW1bMF0gKyAnICgnICsgZWFjaEl0ZW1bMV0gKyAnfCcgKyBlYWNoSXRlbVsyXSArICcpJztcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzVmFsID09IGZpbHRlckl0ZW07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL2NvbnNvbGUubG9nKHBhZ2VOYW1lWzBdKTtcclxuXHJcbiAgICB0aGlzUGx1Z2luLnNlbGVjdGVkRmlsdEFyci5wdXNoKHBhZ2VOYW1lWzBdKTtcclxuICAgIGxldCBuZXdOb3RpY2U6IE5vdGljZSA9IG5ldyBOb3RpY2UoZmlsdGVySXRlbSwgMjAwMDAwMCk7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBuZXdOb3RpY2Uubm90aWNlRWwuZGF0YXNldC5wYWdlTmFtZSA9IHBhZ2VOYW1lWzBdO1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgbmV3Tm90aWNlLm5vdGljZUVsLmFkZENsYXNzKCdibC1maWx0ZXInKTtcclxuXHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBuZXdOb3RpY2Uubm90aWNlRWwub25jbGljayA9IGFzeW5jIChldmVudCkgPT4ge1xyXG4gICAgICAgIGxldCBmaWx0ZXJWYWx1ZTogc3RyaW5nID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQucGFnZU5hbWU7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygncmVtb3ZlIGZpbHRlcjogJyArIGZpbHRlclZhbHVlKTtcclxuXHJcbiAgICAgICAgdGhpc1BsdWdpbi5vcGVuTW9kYWwuY2xvc2UoKTtcclxuICAgICAgICBsZXQgaW5kZXhGb3VuZCA9IHRoaXNQbHVnaW4uc2VsZWN0ZWRGaWx0QXJyLmluZGV4T2YoZmlsdGVyVmFsdWUpO1xyXG4gICAgICAgIHRoaXNQbHVnaW4uc2VsZWN0ZWRGaWx0QXJyLnNwbGljZShpbmRleEZvdW5kLCAxKTtcclxuICAgICAgICBsZXQgZm91bmRTZXR0aW5nSWQgPSB0aGlzUGx1Z2luLm15QmxGaWx0ZXJJZDtcclxuICAgICAgICBsZXQgYmFja2xpbmtMZWFmTmV3OiBXb3Jrc3BhY2VMZWFmID0gdGhpc0FwcC53b3Jrc3BhY2UuZ2V0TGVhZkJ5SWQoZm91bmRTZXR0aW5nSWQpO1xyXG4gICAgICAgIGxldCBiYWNrbGlua1ZpZXdOZXc6IFZpZXcgPSBiYWNrbGlua0xlYWZOZXcudmlldztcclxuXHJcbiAgICAgICAgbGV0IGJhY2tsaW5rVmlld05ld0JMOiBhbnk7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIGlmIChiYWNrbGlua1ZpZXdOZXcuYmFja2xpbmspIHtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBiYWNrbGlua1ZpZXdOZXdCTCA9IGJhY2tsaW5rVmlld05ldy5iYWNrbGluaztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBiYWNrbGlua1ZpZXdOZXdCTCA9IGJhY2tsaW5rVmlld05ldztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGF3YWl0IGJhY2tsaW5rVmlld05ld0JMLnJlY29tcHV0ZUJhY2tsaW5rKGJhY2tsaW5rVmlld05ld0JMLmZpbGUpO1xyXG5cclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgdmFyIG15U2xlZXAgPSBtID0+IG5ldyBQcm9taXNlKHIgPT4gc2V0VGltZW91dChyLCBtKSk7XHJcbiAgICAgICAgLy9Gb3VuZCBubyBvdGhlciB3YXkgdGhhbiB0byBjaGVjayB0aGUgLnJ1bm5pbmcgZXZlcnkgMTAwIG1zIHVudGlsIGNvbXBsZXRlZC4gTWF4IDIwIHRpbWVzICgyIHNlY29uZHMpIGp1c3QgaW4gY2FzZVxyXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgMjA7IHgrKykge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGlmIChiYWNrbGlua1ZpZXdOZXdCTC5iYWNrbGlua1F1ZXVlLnJ1bm5hYmxlLnJ1bm5pbmcpIHtcclxuICAgICAgICAgICAgICAgIGF3YWl0IG15U2xlZXAoMTAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGF3YWl0IG15U2xlZXAoNTApO1xyXG5cclxuICAgICAgICBsZXQgYmxMaW5rc0FycjogQXJyYXk8YW55PiA9IHRoaXNQbHVnaW4ub3JpZ0ZpbHRlckFyckFsbDtcclxuICAgICAgICB0aGlzUGx1Z2luLnNlbGVjdGVkRmlsdEFyci5mb3JFYWNoKChmaWx0ZXJlZEl0ZW06IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYmxJdGVtc0ZpbHRBcnIgPSBibExpbmtzQXJyLmZpbHRlcihlYWNoSXRlbSA9PiBlYWNoSXRlbVsxXSA9PSBmaWx0ZXJlZEl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBpZiAoYmFja2xpbmtWaWV3TmV3QkwuY29sbGFwc2VBbGxCdXR0b25FbC5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLWFjdGl2ZScpID09IGZhbHNlKSB7IGJhY2tsaW5rVmlld05ld0JMLmNvbGxhcHNlQWxsQnV0dG9uRWwuY2xpY2soKSB9XHJcbiAgICAgICAgICAgIC8vTG9vcCB0aHJvdWdoIHRoZSBiYWNrbGlua3MgYW5kIGlmIGEgZmlsZSBkb2Vzbid0IG1hdGNoIHRoZSBibEl0ZW1zRmlsdEFyciB0aGVuIHJlbW92ZVxyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGJhY2tsaW5rVmlld05ld0JMLmJhY2tsaW5rRG9tLnJlc3VsdERvbUxvb2t1cC5mb3JFYWNoKGVhY2hCbEl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZvdW5kSXRlbXM6IEFycmF5PGFueT4gPSBbXTtcclxuICAgICAgICAgICAgICAgIGxldCB0aGlzRmlsZSA9IGVhY2hCbEl0ZW0uZmlsZTtcclxuICAgICAgICAgICAgICAgIGZvdW5kSXRlbXMgPSBibEl0ZW1zRmlsdEFyci5maWx0ZXIoZWFjaEl0ZW0gPT4gZWFjaEl0ZW1bMF0gPT0gdGhpc0ZpbGUucGF0aCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZm91bmRJdGVtcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJDb3VudCA9IGVhY2hCbEl0ZW0ucmVzdWx0LmNvbnRlbnQubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICBiYWNrbGlua1ZpZXdOZXdCTC5iYWNrbGlua0RvbS5yZW1vdmVSZXN1bHQoZWFjaEJsSXRlbS5maWxlKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2xpbmtWaWV3TmV3QkwuYmFja2xpbmtDb3VudEVsLnRleHRDb250ZW50ID0gKGJhY2tsaW5rVmlld05ld0JMLmJhY2tsaW5rQ291bnRFbC50ZXh0Q29udGVudCAtIGN1ckNvdW50KS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGxpbmtTdWdnQXJyOiBBcnJheTxhbnk+ID0gW107XHJcbiAgICAgICAgbGV0IGxpbmtTdWdnQ3RyQXJyOiBBcnJheTxhbnk+ID0gW107XHJcblxyXG4gICAgICAgIGJsTGlua3NBcnIuZm9yRWFjaChlYWNoSXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghbGlua1N1Z2dBcnIuaW5jbHVkZXMoZWFjaEl0ZW1bMV0pKSB7XHJcbiAgICAgICAgICAgICAgICBsaW5rU3VnZ0Fyci5wdXNoKGVhY2hJdGVtWzFdKTtcclxuICAgICAgICAgICAgICAgIGxpbmtTdWdnQ3RyQXJyLnB1c2goW2VhY2hJdGVtWzFdLCAxXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZm91bmRJbmRleCA9IGxpbmtTdWdnQ3RyQXJyLmZpbmRJbmRleChlYWNoTGlua0l0ZW0gPT4gZWFjaExpbmtJdGVtWzBdID09IGVhY2hJdGVtWzFdKTtcclxuICAgICAgICAgICAgICAgIGxldCBvbGRWYWx1ZSA9IGxpbmtTdWdnQ3RyQXJyW2ZvdW5kSW5kZXhdWzFdO1xyXG4gICAgICAgICAgICAgICAgbGlua1N1Z2dDdHJBcnJbZm91bmRJbmRleF1bMV0gPSBvbGRWYWx1ZSArIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IG5ld0xpbmtTdWdnQXJyOiBBcnJheTxhbnk+ID0gW107XHJcbiAgICAgICAgbGV0IGl0ZW1zUmVtYWluaW5nID0gbGlua1N1Z2dDdHJBcnIuZmlsdGVyKGVhY2hJdGVtID0+ICF0aGlzUGx1Z2luLnNlbGVjdGVkRmlsdEFyci5pbmNsdWRlcyhlYWNoSXRlbVswXSkpO1xyXG5cclxuICAgICAgICBpdGVtc1JlbWFpbmluZy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBiWzFdIC0gYVsxXSB9KTtcclxuICAgICAgICBpdGVtc1JlbWFpbmluZy5mb3JFYWNoKGVhY2hJdGVtID0+IHtcclxuICAgICAgICAgICAgbGV0IGl0ZW1XaXRoQ291bnQgPSBlYWNoSXRlbVswXSArICcgKCcgKyBlYWNoSXRlbVsxXSArICcpJztcclxuICAgICAgICAgICAgaWYgKCFuZXdMaW5rU3VnZ0Fyci5pbmNsdWRlcyhpdGVtV2l0aENvdW50KSkgeyBuZXdMaW5rU3VnZ0Fyci5wdXNoKGl0ZW1XaXRoQ291bnQpOyB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXNQbHVnaW4uZmlsdGVyQXJyID0gbGlua1N1Z2dDdHJBcnI7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpc1BsdWdpbi5ub3RpY2VBcnIucHVzaChuZXdOb3RpY2UpO1xyXG5cclxuICAgIGxldCBub3RpY2VDb250OiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdub3RpY2UtY29udGFpbmVyJyk7XHJcbiAgICBpZiAobm90aWNlQ29udCkgeyBub3RpY2VDb250WzBdLnN0eWxlLnRvcCA9ICc1MHB4Jzsgbm90aWNlQ29udFswXS5zdHlsZS5yaWdodCA9ICd1bnNldCc7IG5vdGljZUNvbnRbMF0uc3R5bGUubGVmdCA9ICczMHB4JzsgfVxyXG5cclxuICAgIGxldCBibEl0ZW1zQXJyOiBBcnJheTxhbnk+ID0gdGhpc1BsdWdpbi5vcmlnRmlsdGVyQXJyO1xyXG4gICAgbGV0IGJsSXRlbXNGaWx0QXJyID0gYmxJdGVtc0Fyci5maWx0ZXIoZWFjaEl0ZW0gPT4gZWFjaEl0ZW1bMV0gPT0gcGFnZU5hbWVbMF0pO1xyXG4gICAgLypcclxuICAgIGNvbnNvbGUubG9nKGJsSXRlbXNBcnIpO1xyXG4gICAgY29uc29sZS5sb2coYmxJdGVtc0ZpbHRBcnIpO1xyXG4gICAgKi9cclxuXHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBpZiAoYmFja2xpbmtWaWV3TmV3QkwuY29sbGFwc2VBbGxCdXR0b25FbC5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLWFjdGl2ZScpID09IGZhbHNlKSB7IGJhY2tsaW5rVmlld05ld0JMLmNvbGxhcHNlQWxsQnV0dG9uRWwuY2xpY2soKSB9XHJcblxyXG4gICAgLy9Mb29wIHRocm91Z2ggdGhlIGJhY2tsaW5rcyBhbmQgaWYgYSBmaWxlIGRvZXNuJ3QgbWF0Y2ggdGhlIGJsSXRlbXNGaWx0QXJyIHRoZW4gcmVtb3ZlXHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBiYWNrbGlua1ZpZXdOZXdCTC5iYWNrbGlua0RvbS5yZXN1bHREb21Mb29rdXAuZm9yRWFjaChlYWNoQmxJdGVtID0+IHtcclxuICAgICAgICBsZXQgZm91bmRJdGVtczogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgICAgIGxldCB0aGlzRmlsZSA9IGVhY2hCbEl0ZW0uZmlsZTtcclxuICAgICAgICBmb3VuZEl0ZW1zID0gYmxJdGVtc0ZpbHRBcnIuZmlsdGVyKGVhY2hJdGVtID0+IGVhY2hJdGVtWzBdID09IHRoaXNGaWxlLnBhdGgpO1xyXG4gICAgICAgIGlmIChmb3VuZEl0ZW1zLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJDb3VudCA9IGVhY2hCbEl0ZW0ucmVzdWx0LmNvbnRlbnQubGVuZ3RoO1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGJhY2tsaW5rVmlld05ld0JMLmJhY2tsaW5rRG9tLnJlbW92ZVJlc3VsdChlYWNoQmxJdGVtLmZpbGUpO1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGJhY2tsaW5rVmlld05ld0JMLmJhY2tsaW5rQ291bnRFbC50ZXh0Q29udGVudCA9IChiYWNrbGlua1ZpZXdOZXdCTC5iYWNrbGlua0NvdW50RWwudGV4dENvbnRlbnQgLSBjdXJDb3VudCkudG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBsb2FkRmlsdGVyKHRoaXNBcHAsIHRoaXNQbHVnaW4pO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBsb2FkRmlsdGVyKHRoaXNBcHA6IEFwcCwgdGhpc1BsdWdpbjogTXlQbHVnaW4pIHtcclxuICAgIC8vY29uc29sZS5sb2coXCJsb2FkRmlsdGVyXCIpO1xyXG4gICAgbGV0IHZpZXdDb3VudCA9IHRoaXNBcHAud29ya3NwYWNlLmdldExlYXZlc09mVHlwZSgnYmFja2xpbmstZmlsdGVyJykubGVuZ3RoO1xyXG4gICAgaWYgKHZpZXdDb3VudCAhPSAxKSB7XHJcbiAgICAgICAgYXdhaXQgbG9hZEJhY2tMaW5rcyh0aGlzQXBwLCB0aGlzUGx1Z2luKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgZm91bmRTZXR0aW5nSWQgPSB0aGlzUGx1Z2luLm15QmxGaWx0ZXJJZDtcclxuICAgIGxldCBiYWNrbGlua0xlYWZOZXc6IFdvcmtzcGFjZUxlYWYgPSB0aGlzQXBwLndvcmtzcGFjZS5nZXRMZWFmQnlJZChmb3VuZFNldHRpbmdJZCk7XHJcbiAgICBsZXQgYmFja2xpbmtWaWV3TmV3OiBWaWV3ID0gYmFja2xpbmtMZWFmTmV3LnZpZXc7XHJcblxyXG4gICAgbGV0IGJhY2tsaW5rVmlld05ld0JMOiBhbnk7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBpZiAoYmFja2xpbmtWaWV3TmV3LmJhY2tsaW5rKSB7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIGJhY2tsaW5rVmlld05ld0JMID0gYmFja2xpbmtWaWV3TmV3LmJhY2tsaW5rO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBiYWNrbGlua1ZpZXdOZXdCTCA9IGJhY2tsaW5rVmlld05ldztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzQXBwLndvcmtzcGFjZS5yZXZlYWxMZWFmKGJhY2tsaW5rTGVhZk5ldyk7XHJcblxyXG4gICAgaWYgKHZpZXdDb3VudCAhPSAxKSB7XHJcbiAgICAgICAgYXdhaXQgbG9hZEJhY2tMaW5rcyh0aGlzQXBwLCB0aGlzUGx1Z2luKTtcclxuXHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHZhciBteVNsZWVwID0gbSA9PiBuZXcgUHJvbWlzZShyID0+IHNldFRpbWVvdXQociwgbSkpO1xyXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgMjA7IHgrKykge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGlmIChiYWNrbGlua1ZpZXdOZXdCTC5iYWNrbGlua1F1ZXVlLnJ1bm5hYmxlLnJ1bm5pbmcpIHtcclxuICAgICAgICAgICAgICAgIGF3YWl0IG15U2xlZXAoMTAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGF3YWl0IG15U2xlZXAoNTApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIGlmIChiYWNrbGlua1ZpZXdOZXdCTC5jb2xsYXBzZUFsbEJ1dHRvbkVsLmNsYXNzTGlzdC5jb250YWlucygnaXMtYWN0aXZlJykgPT0gZmFsc2UpIHsgYmFja2xpbmtWaWV3TmV3QkwuY29sbGFwc2VBbGxCdXR0b25FbC5jbGljaygpIH1cclxuXHJcbiAgICBsZXQgY3VyUGFnZU5hbWUgPSBiYWNrbGlua1ZpZXdOZXdCTC5maWxlLmJhc2VuYW1lO1xyXG4gICAgbGV0IGN1clBhZ2VQYXRoID0gYmFja2xpbmtWaWV3TmV3QkwuZmlsZS5wYXRoLnJlcGxhY2UoYmFja2xpbmtWaWV3TmV3QkwuZmlsZS5uYW1lLCBjdXJQYWdlTmFtZSk7XHJcbiAgICAvL2NvbnNvbGUubG9nKGN1clBhZ2VOYW1lKTtcclxuXHJcbiAgICBsZXQgYmxMaW5rc0FycjogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgbGV0IGJsVGFnc0FycjogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgbGV0IGJsSGVhZGluZ3NBcnI6IEFycmF5PGFueT4gPSBbXTtcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIGJhY2tsaW5rVmlld05ld0JMLmJhY2tsaW5rRG9tLnJlc3VsdERvbUxvb2t1cC5mb3JFYWNoKGVhY2hJdGVtID0+IHtcclxuICAgICAgICAvL0xvb3BpbmcgZWFjaCBmaWxlIHdpdGggYSBtYXRjaCBpbiBiYWNrbGlua3NcclxuICAgICAgICBsZXQgdGhpc0ZpbGUgPSBlYWNoSXRlbS5maWxlO1xyXG4gICAgICAgICAgICBsZXQgYWxsTGlua3MgPSB0aGlzQXBwLm1ldGFkYXRhQ2FjaGUuZ2V0Q2FjaGUodGhpc0ZpbGUucGF0aCkubGlua3M7XHJcbiAgICAgICAgICAgIGxldCBhbGxIZWFkZXJzID0gdGhpc0FwcC5tZXRhZGF0YUNhY2hlLmdldENhY2hlKHRoaXNGaWxlLnBhdGgpLmhlYWRpbmdzO1xyXG4gICAgICAgICAgICBsZXQgYWxsVGFncyA9IHRoaXNBcHAubWV0YWRhdGFDYWNoZS5nZXRDYWNoZSh0aGlzRmlsZS5wYXRoKS50YWdzO1xyXG4gICAgICAgIGxldCBmaXJzdEhlYWRlcjogbnVtYmVyID0gLTE7XHJcbiAgICAgICAgaWYgKGFsbEhlYWRlcnMpIHsgZmlyc3RIZWFkZXIgPSBhbGxIZWFkZXJzWzBdLnBvc2l0aW9uLnN0YXJ0Lm9mZnNldDsgfVxyXG4gICAgICAgIGxldCBlbmRPZkZpbGVDaGFyT2Zmc2V0OiBudW1iZXIgPSB0aGlzRmlsZS5zdGF0LnNpemU7XHJcbiAgICAgICAgbGV0IGVhY2hIZWFkQWRkZWRBcnI6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgZWFjaEl0ZW0ucmVzdWx0LmNvbnRlbnQuZm9yRWFjaChlYWNoUmVzID0+IHtcclxuICAgICAgICAgICAgLy9Mb29waW5nIGVhY2ggYmFja2xpbmsgbWF0Y2ggbG9jYXRpb24gaW4gZWFjaCBmaWxlIChlYWNoIHJlc3VsdClcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhlYWNoSXRlbS5maWxlLnBhdGgpO1xyXG4gICAgICAgICAgICBsZXQgYmxQb3MgPSBlYWNoUmVzO1xyXG4gICAgICAgICAgICBsZXQgaGVhZEx2bCA9IDA7XHJcbiAgICAgICAgICAgIGxldCBibEhlYWRBcnI6IEFycmF5PGFueT4gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIC8vSWYgdGhlcmUgYXJlIGhlYWRlcnMgb24geW91ciBwYWdlIHZzIGp1c3QgdGV4dCB3aXRob3V0IGFueSBoZWFkZXJzXHJcbiAgICAgICAgICAgIGlmIChhbGxIZWFkZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAvL0lmIHRoZXJlIGlzIGFueSB0ZXh0IGFib3ZlIHRoZSBmaXJzdCBoZWFkZXIgb24gdGhlIHBhZ2Ugd2l0aCBhIGJhY2tsaW5rIHBhZ2UgcmVmIGluIGl0LCBhZGQgaXRlbXMgZm9yIGZpbHRlcmluZ1xyXG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0SGVhZGVyID4gMSAmJiBibFBvc1swXSA8IGZpcnN0SGVhZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlYWNoSGVhZEFkZGVkQXJyLmluY2x1ZGVzKGZpcnN0SGVhZGVyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBibEhlYWRBcnIucHVzaChbMCwgMCwgZmlyc3RIZWFkZXJdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmxIZWFkaW5nc0Fyci5wdXNoKFtlYWNoSXRlbS5maWxlLnBhdGgsIDAsIDAsIGZpcnN0SGVhZGVyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVhY2hIZWFkQWRkZWRBcnIucHVzaChmaXJzdEhlYWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChibFBvc1swXSA+PSBmaXJzdEhlYWRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vTG9vayB0aHJvdWdoIGFsbCB0aGUgaGVhZGVycyB0byBwb3B1bGF0ZSB0aGUgXCJyZWxhdGVkXCIgcGFyZW50L2NoaWxkIGhlYWRlciBzZWN0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGggPSAwOyBoIDwgYWxsSGVhZGVycy5sZW5ndGg7IGgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZWFjaEhlYWQgPSBhbGxIZWFkZXJzW2hdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmxQb3NbMF0gPCBlYWNoSGVhZC5wb3NpdGlvbi5zdGFydC5vZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXh0UGFyZW50ID0gaGVhZEx2bDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vTm93IGxvb2sgdGhyb3VnaCB0aGUgaGVhZGVycyBcImFib3ZlXCIgdGhlIGJhY2tsaW5rIGxvY2F0aW9uLi4uIGFrYSBwYXJlbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gKGggLSAxKTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWxsSGVhZGVyc1tpXS5sZXZlbCA8PSBuZXh0UGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpIDwgaCAtIDEgJiYgYWxsSGVhZGVyc1tpXS5sZXZlbCA8IGhlYWRMdmwgLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWVhY2hIZWFkQWRkZWRBcnIuaW5jbHVkZXMoYWxsSGVhZGVyc1tpXS5wb3NpdGlvbi5lbmQub2Zmc2V0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxIZWFkQXJyLnB1c2goW2FsbEhlYWRlcnNbaV0ubGV2ZWwsIGFsbEhlYWRlcnNbaV0ucG9zaXRpb24uc3RhcnQub2Zmc2V0LCBhbGxIZWFkZXJzW2ldLnBvc2l0aW9uLmVuZC5vZmZzZXRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsSGVhZGluZ3NBcnIucHVzaChbZWFjaEl0ZW0uZmlsZS5wYXRoLCBhbGxIZWFkZXJzW2ldLmxldmVsLCBhbGxIZWFkZXJzW2ldLnBvc2l0aW9uLnN0YXJ0Lm9mZnNldCwgYWxsSGVhZGVyc1tpXS5wb3NpdGlvbi5lbmQub2Zmc2V0XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWFjaEhlYWRBZGRlZEFyci5wdXNoKGFsbEhlYWRlcnNbaV0ucG9zaXRpb24uZW5kLm9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWVhY2hIZWFkQWRkZWRBcnIuaW5jbHVkZXMoYWxsSGVhZGVyc1tpICsgMV0ucG9zaXRpb24uc3RhcnQub2Zmc2V0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxIZWFkQXJyLnB1c2goW2FsbEhlYWRlcnNbaV0ubGV2ZWwsIGFsbEhlYWRlcnNbaV0ucG9zaXRpb24uc3RhcnQub2Zmc2V0LCBhbGxIZWFkZXJzW2kgKyAxXS5wb3NpdGlvbi5zdGFydC5vZmZzZXRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsSGVhZGluZ3NBcnIucHVzaChbZWFjaEl0ZW0uZmlsZS5wYXRoLCBhbGxIZWFkZXJzW2ldLmxldmVsLCBhbGxIZWFkZXJzW2ldLnBvc2l0aW9uLnN0YXJ0Lm9mZnNldCwgYWxsSGVhZGVyc1tpICsgMV0ucG9zaXRpb24uc3RhcnQub2Zmc2V0XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWFjaEhlYWRBZGRlZEFyci5wdXNoKGFsbEhlYWRlcnNbaSArIDFdLnBvc2l0aW9uLnN0YXJ0Lm9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFBhcmVudC0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFBhcmVudCA8PSAwKSB7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Ob3cgbG9vayB0aHJvdWdoIHRoZSBoZWFkZXJzIFwiYmVsb3dcIiB0aGUgYmFja2xpbmsgbG9jYXRpb24uLi4gYWthIGNoaWxkcmVuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gaDsgaSA8IGFsbEhlYWRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWxsSGVhZGVyc1tpXS5sZXZlbCA+IGhlYWRMdmwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFsbEhlYWRlcnNbaSArIDFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWVhY2hIZWFkQWRkZWRBcnIuaW5jbHVkZXMoYWxsSGVhZGVyc1tpICsgMV0ucG9zaXRpb24uc3RhcnQub2Zmc2V0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxIZWFkQXJyLnB1c2goW2FsbEhlYWRlcnNbaV0ubGV2ZWwsIGFsbEhlYWRlcnNbaV0ucG9zaXRpb24uc3RhcnQub2Zmc2V0LCBhbGxIZWFkZXJzW2kgKyAxXS5wb3NpdGlvbi5zdGFydC5vZmZzZXRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsSGVhZGluZ3NBcnIucHVzaChbZWFjaEl0ZW0uZmlsZS5wYXRoLCBhbGxIZWFkZXJzW2ldLmxldmVsLCBhbGxIZWFkZXJzW2ldLnBvc2l0aW9uLnN0YXJ0Lm9mZnNldCwgYWxsSGVhZGVyc1tpICsgMV0ucG9zaXRpb24uc3RhcnQub2Zmc2V0XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWFjaEhlYWRBZGRlZEFyci5wdXNoKGFsbEhlYWRlcnNbaSArIDFdLnBvc2l0aW9uLnN0YXJ0Lm9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWVhY2hIZWFkQWRkZWRBcnIuaW5jbHVkZXMoZW5kT2ZGaWxlQ2hhck9mZnNldCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibEhlYWRBcnIucHVzaChbYWxsSGVhZGVyc1tpXS5sZXZlbCwgYWxsSGVhZGVyc1tpXS5wb3NpdGlvbi5zdGFydC5vZmZzZXQsIGVuZE9mRmlsZUNoYXJPZmZzZXRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibEhlYWRpbmdzQXJyLnB1c2goW2VhY2hJdGVtLmZpbGUucGF0aCwgYWxsSGVhZGVyc1tpXS5sZXZlbCwgYWxsSGVhZGVyc1tpXS5wb3NpdGlvbi5zdGFydC5vZmZzZXQsIGVuZE9mRmlsZUNoYXJPZmZzZXRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlYWNoSGVhZEFkZGVkQXJyLnB1c2goZW5kT2ZGaWxlQ2hhck9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgeyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9UaGlzIGFjY291bnRzIGZvciB3aGVuIHRoZSBiYWNrbGluayBpcyBmb3VuZCB1bmRlciB0aGUgdmVyeSBsYXN0IGhlYWRlciBvbiB0aGUgcGFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZEx2bCA9IGVhY2hIZWFkLmxldmVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGggPT0gYWxsSGVhZGVycy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJsUG9zWzBdIDwgZW5kT2ZGaWxlQ2hhck9mZnNldCAmJiBibFBvc1swXSA+IGVhY2hIZWFkLnBvc2l0aW9uLnN0YXJ0Lm9mZnNldCAmJiAhZWFjaEhlYWRBZGRlZEFyci5pbmNsdWRlcyhlbmRPZkZpbGVDaGFyT2Zmc2V0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibEhlYWRBcnIucHVzaChbZWFjaEhlYWQubGV2ZWwsIGVhY2hIZWFkLnBvc2l0aW9uLnN0YXJ0Lm9mZnNldCwgZW5kT2ZGaWxlQ2hhck9mZnNldF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibEhlYWRpbmdzQXJyLnB1c2goW2VhY2hJdGVtLmZpbGUucGF0aCwgZWFjaEhlYWQubGV2ZWwsIGVhY2hIZWFkLnBvc2l0aW9uLnN0YXJ0Lm9mZnNldCwgZW5kT2ZGaWxlQ2hhck9mZnNldF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlYWNoSGVhZEFkZGVkQXJyLnB1c2goZW5kT2ZGaWxlQ2hhck9mZnNldCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dFBhcmVudCA9IGhlYWRMdmw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vTm93IGxvb2sgdGhyb3VnaCB0aGUgaGVhZGVycyBcImFib3ZlXCIgdGhlIGJhY2tsaW5rIGxvY2F0aW9uLi4uIGFrYSBwYXJlbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAoaCAtIDEpOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFsbEhlYWRlcnNbaV0ubGV2ZWwgPD0gbmV4dFBhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpIDwgaCAtIDEgJiYgYWxsSGVhZGVyc1tpXS5sZXZlbCA8IGhlYWRMdmwgLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaCAtIDEgbWVhbnMgdGhlIGRpcmVjdCBwYXJlbnQgb25lIGxldmVsIHVwLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0l0IHdpbGwgb25seSBncmFiIGxpbmtzIC8gdGFncyBmcm9tIHN1YiB0ZXh0IG9mIGEgaGVhZGVyIHdoZW4gZGlyZWN0IHBhcmVudC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9PdGhlciBsZXZlbHMgbW9yZSB0aGFuIDEgbGV2ZWxzIGFib3ZlIHdpbGwgb25seSBncmFiIGxpbmtzIC8gdGFncyBmcm9tIHRoZSBoZWFkZXIgaXRzZWxmLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWVhY2hIZWFkQWRkZWRBcnIuaW5jbHVkZXMoYWxsSGVhZGVyc1tpXS5wb3NpdGlvbi5lbmQub2Zmc2V0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxIZWFkQXJyLnB1c2goW2FsbEhlYWRlcnNbaV0ubGV2ZWwsIGFsbEhlYWRlcnNbaV0ucG9zaXRpb24uc3RhcnQub2Zmc2V0LCBhbGxIZWFkZXJzW2ldLnBvc2l0aW9uLmVuZC5vZmZzZXRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsSGVhZGluZ3NBcnIucHVzaChbZWFjaEl0ZW0uZmlsZS5wYXRoLCBhbGxIZWFkZXJzW2ldLmxldmVsLCBhbGxIZWFkZXJzW2ldLnBvc2l0aW9uLnN0YXJ0Lm9mZnNldCwgYWxsSGVhZGVyc1tpXS5wb3NpdGlvbi5lbmQub2Zmc2V0XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlYWNoSGVhZEFkZGVkQXJyLnB1c2goYWxsSGVhZGVyc1tpXS5wb3NpdGlvbi5lbmQub2Zmc2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZWFjaEhlYWRBZGRlZEFyci5pbmNsdWRlcyhhbGxIZWFkZXJzW2kgKyAxXS5wb3NpdGlvbi5zdGFydC5vZmZzZXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibEhlYWRBcnIucHVzaChbYWxsSGVhZGVyc1tpXS5sZXZlbCwgYWxsSGVhZGVyc1tpXS5wb3NpdGlvbi5zdGFydC5vZmZzZXQsIGFsbEhlYWRlcnNbaSArIDFdLnBvc2l0aW9uLnN0YXJ0Lm9mZnNldF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxIZWFkaW5nc0Fyci5wdXNoKFtlYWNoSXRlbS5maWxlLnBhdGgsIGFsbEhlYWRlcnNbaV0ubGV2ZWwsIGFsbEhlYWRlcnNbaV0ucG9zaXRpb24uc3RhcnQub2Zmc2V0LCBhbGxIZWFkZXJzW2kgKyAxXS5wb3NpdGlvbi5zdGFydC5vZmZzZXRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVhY2hIZWFkQWRkZWRBcnIucHVzaChhbGxIZWFkZXJzW2kgKyAxXS5wb3NpdGlvbi5zdGFydC5vZmZzZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRQYXJlbnQtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0UGFyZW50IDw9IDApIHsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJsSGVhZEFyci5mb3JFYWNoKGVhY2hIZWFkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYWxsTGlua3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxsTGlua3MuZm9yRWFjaChlYWNoTGluayA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyUGFnZU5hbWUgIT0gZWFjaExpbmsubGluayAmJiBjdXJQYWdlUGF0aCAhPSBlYWNoTGluay5saW5rICYmIGVhY2hIZWFkWzFdIDw9IGVhY2hMaW5rLnBvc2l0aW9uLnN0YXJ0Lm9mZnNldCAmJiBlYWNoSGVhZFsyXSA+PSBlYWNoTGluay5wb3NpdGlvbi5lbmQub2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxMaW5rc0Fyci5wdXNoKFtlYWNoSXRlbS5maWxlLnBhdGgsIGVhY2hMaW5rLmxpbmtdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYWxsVGFncykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGxUYWdzLmZvckVhY2goZWFjaFRhZyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWFjaEhlYWRbMV0gPD0gZWFjaFRhZy5wb3NpdGlvbi5zdGFydC5vZmZzZXQgJiYgZWFjaEhlYWRbMl0gPj0gZWFjaFRhZy5wb3NpdGlvbi5lbmQub2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxUYWdzQXJyLnB1c2goW2VhY2hJdGVtLmZpbGUucGF0aCwgZWFjaFRhZy50YWddKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdubyBoZWFkZXJzIGluIHBhZ2Ugc28gaW5jbHVkZSBhbGwgbGlua3MgYW5kIHRhZ3MgZnJvbSBwYWdlJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWVhY2hIZWFkQWRkZWRBcnIuaW5jbHVkZXMoLTEpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWxsTGlua3MpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGxMaW5rcy5mb3JFYWNoKGVhY2hMaW5rID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1clBhZ2VOYW1lICE9IGVhY2hMaW5rLmxpbmsgJiYgY3VyUGFnZVBhdGggIT0gZWFjaExpbmsubGluaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxMaW5rc0Fyci5wdXNoKFtlYWNoSXRlbS5maWxlLnBhdGgsIGVhY2hMaW5rLmxpbmtdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVhY2hIZWFkQWRkZWRBcnIucHVzaCgtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYWxsVGFncykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbFRhZ3MuZm9yRWFjaChlYWNoVGFnID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmxUYWdzQXJyLnB1c2goW2VhY2hJdGVtLmZpbGUucGF0aCwgZWFjaFRhZy50YWddKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWFjaEhlYWRBZGRlZEFyci5wdXNoKC0xKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGJsTGlua3NBcnIucHVzaChbZWFjaEl0ZW0uZmlsZS5wYXRoLCB0aGlzRmlsZS5iYXNlbmFtZV0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpc1BsdWdpbi5vcmlnRmlsdGVyQXJyID0gYmxMaW5rc0Fyci5jb25jYXQoYmxUYWdzQXJyKTtcclxuICAgIGlmICh0aGlzUGx1Z2luLm9yaWdGaWx0ZXJBcnJBbGwubGVuZ3RoID09IDApIHsgdGhpc1BsdWdpbi5vcmlnRmlsdGVyQXJyQWxsID0gdGhpc1BsdWdpbi5vcmlnRmlsdGVyQXJyOyB9XHJcbiAgICB0aGlzUGx1Z2luLmhlYWRpbmdzQXJyID0gYmxIZWFkaW5nc0FycjtcclxuXHJcbiAgICBsZXQgbGlua1N1Z2dBcnI6IEFycmF5PGFueT4gPSBbXTtcclxuICAgIGxldCBsaW5rU3VnZ0N0ckFycjogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgbGV0IGxpbmtTdWdnUGdBcnI6IEFycmF5PGFueT4gPSBbXTtcclxuICAgIC8vY29uc29sZS5sb2coJ0dldHRpbmcgbGlzdCB0byBmaWx0ZXInKTtcclxuICAgIGJsTGlua3NBcnIuZm9yRWFjaChlYWNoSXRlbSA9PiB7XHJcbiAgICAgICAgaWYgKCFsaW5rU3VnZ0Fyci5pbmNsdWRlcyhlYWNoSXRlbVsxXSkpIHtcclxuICAgICAgICAgICAgbGlua1N1Z2dBcnIucHVzaChlYWNoSXRlbVsxXSk7XHJcbiAgICAgICAgICAgIGxpbmtTdWdnUGdBcnIucHVzaChlYWNoSXRlbVswXSArIGVhY2hJdGVtWzFdKTtcclxuICAgICAgICAgICAgbGlua1N1Z2dDdHJBcnIucHVzaChbZWFjaEl0ZW1bMV0sIDEsIDFdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgZm91bmRJbmRleCA9IGxpbmtTdWdnQ3RyQXJyLmZpbmRJbmRleChlYWNoTGlua0l0ZW0gPT4gZWFjaExpbmtJdGVtWzBdID09IGVhY2hJdGVtWzFdKTtcclxuICAgICAgICAgICAgbGV0IG9sZFZhbHVlID0gbGlua1N1Z2dDdHJBcnJbZm91bmRJbmRleF1bMl07XHJcbiAgICAgICAgICAgIGxpbmtTdWdnQ3RyQXJyW2ZvdW5kSW5kZXhdWzJdID0gb2xkVmFsdWUgKyAxO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFsaW5rU3VnZ1BnQXJyLmluY2x1ZGVzKGVhY2hJdGVtWzBdICsgZWFjaEl0ZW1bMV0pKSB7XHJcbiAgICAgICAgICAgICAgICBsaW5rU3VnZ1BnQXJyLnB1c2goZWFjaEl0ZW1bMF0gKyBlYWNoSXRlbVsxXSk7XHJcbiAgICAgICAgICAgICAgICBvbGRWYWx1ZSA9IGxpbmtTdWdnQ3RyQXJyW2ZvdW5kSW5kZXhdWzFdO1xyXG4gICAgICAgICAgICBsaW5rU3VnZ0N0ckFycltmb3VuZEluZGV4XVsxXSA9IG9sZFZhbHVlICsgMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHRhZ1N1Z2dBcnI6IEFycmF5PGFueT4gPSBbXTtcclxuICAgIGxldCB0YWdTdWdnQ3RyQXJyOiBBcnJheTxhbnk+ID0gW107XHJcbiAgICBsZXQgdGFnU3VnZ1BnQXJyOiBBcnJheTxhbnk+ID0gW107XHJcbiAgICBibFRhZ3NBcnIuZm9yRWFjaChlYWNoSXRlbSA9PiB7XHJcbiAgICAgICAgaWYgKCF0YWdTdWdnQXJyLmluY2x1ZGVzKGVhY2hJdGVtWzFdKSkge1xyXG4gICAgICAgICAgICB0YWdTdWdnQXJyLnB1c2goZWFjaEl0ZW1bMV0pO1xyXG4gICAgICAgICAgICB0YWdTdWdnUGdBcnIucHVzaChlYWNoSXRlbVswXSArIGVhY2hJdGVtWzFdKTtcclxuICAgICAgICAgICAgdGFnU3VnZ0N0ckFyci5wdXNoKFtlYWNoSXRlbVsxXSwgMSwgMV0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBmb3VuZEluZGV4ID0gdGFnU3VnZ0N0ckFyci5maW5kSW5kZXgoZWFjaFRhZ0l0ZW0gPT4gZWFjaFRhZ0l0ZW1bMF0gPT0gZWFjaEl0ZW1bMV0pO1xyXG4gICAgICAgICAgICBsZXQgb2xkVmFsdWUgPSB0YWdTdWdnQ3RyQXJyW2ZvdW5kSW5kZXhdWzJdO1xyXG4gICAgICAgICAgICB0YWdTdWdnQ3RyQXJyW2ZvdW5kSW5kZXhdWzJdID0gb2xkVmFsdWUgKyAxO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0YWdTdWdnUGdBcnIuaW5jbHVkZXMoZWFjaEl0ZW1bMF0gKyBlYWNoSXRlbVsxXSkpIHtcclxuICAgICAgICAgICAgICAgIHRhZ1N1Z2dQZ0Fyci5wdXNoKGVhY2hJdGVtWzBdICsgZWFjaEl0ZW1bMV0pO1xyXG4gICAgICAgICAgICAgICAgb2xkVmFsdWUgPSB0YWdTdWdnQ3RyQXJyW2ZvdW5kSW5kZXhdWzFdO1xyXG4gICAgICAgICAgICB0YWdTdWdnQ3RyQXJyW2ZvdW5kSW5kZXhdWzFdID0gb2xkVmFsdWUgKyAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgbmV3TGlua1N1Z2dBcnI6IEFycmF5PGFueT4gPSBbXTtcclxuXHJcbiAgICAvL0FkZCBmaWx0ZXIgdmFsdWUgcGxhY2Vob2xkZXIgZm9yIFBsYWluIFRleHQga2V5d29yZCBzZWFyY2hcclxuICAgIG5ld0xpbmtTdWdnQXJyLnB1c2goJypDdXN0b20gS2V5d29yZCBTZWFyY2gqJyk7XHJcblxyXG4gICAgbGV0IGl0ZW1zUmVtYWluaW5nID0gdGFnU3VnZ0N0ckFyci5maWx0ZXIoZWFjaEl0ZW0gPT4gIXRoaXNQbHVnaW4uc2VsZWN0ZWRGaWx0QXJyLmluY2x1ZGVzKGVhY2hJdGVtWzBdKSk7XHJcblxyXG4gICAgaXRlbXNSZW1haW5pbmcuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYlsyXSAtIGFbMl0gfSk7XHJcbiAgICBpdGVtc1JlbWFpbmluZy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBiWzFdIC0gYVsxXSB9KTtcclxuICAgIGl0ZW1zUmVtYWluaW5nLmZvckVhY2goZWFjaEl0ZW0gPT4ge1xyXG4gICAgICAgIGxldCBpdGVtV2l0aENvdW50ID0gZWFjaEl0ZW1bMF0gKyAnICgnICsgZWFjaEl0ZW1bMV0gKyAnfCcgKyBlYWNoSXRlbVsyXSArICcpJztcclxuICAgICAgICBpZiAoIW5ld0xpbmtTdWdnQXJyLmluY2x1ZGVzKGl0ZW1XaXRoQ291bnQpKSB7IG5ld0xpbmtTdWdnQXJyLnB1c2goaXRlbVdpdGhDb3VudCk7IH1cclxuICAgIH0pO1xyXG5cclxuICAgIGl0ZW1zUmVtYWluaW5nID0gbGlua1N1Z2dDdHJBcnIuZmlsdGVyKGVhY2hJdGVtID0+ICF0aGlzUGx1Z2luLnNlbGVjdGVkRmlsdEFyci5pbmNsdWRlcyhlYWNoSXRlbVswXSkpO1xyXG5cclxuICAgIGl0ZW1zUmVtYWluaW5nLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGJbMl0gLSBhWzJdIH0pO1xyXG4gICAgaXRlbXNSZW1haW5pbmcuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYlsxXSAtIGFbMV0gfSk7XHJcbiAgICBpdGVtc1JlbWFpbmluZy5mb3JFYWNoKGVhY2hJdGVtID0+IHtcclxuICAgICAgICBsZXQgaXRlbVdpdGhDb3VudCA9IGVhY2hJdGVtWzBdICsgJyAoJyArIGVhY2hJdGVtWzFdICsgJ3wnICsgZWFjaEl0ZW1bMl0gKyAnKSc7XHJcbiAgICAgICAgaWYgKCFuZXdMaW5rU3VnZ0Fyci5pbmNsdWRlcyhpdGVtV2l0aENvdW50KSkgeyBuZXdMaW5rU3VnZ0Fyci5wdXNoKGl0ZW1XaXRoQ291bnQpOyB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzUGx1Z2luLmZpbHRlckFyciA9IGxpbmtTdWdnQ3RyQXJyLmNvbmNhdCh0YWdTdWdnQ3RyQXJyKTtcclxuICAgIHRoaXNQbHVnaW4ub3Blbk1vZGFsID0gbmV3IE1vZGFsU2VsZWN0QmxGaWx0ZXIodGhpc0FwcCwgbmV3TGlua1N1Z2dBcnIsIHRoaXNQbHVnaW4pO1xyXG4gICAgdGhpc1BsdWdpbi5vcGVuTW9kYWwub3BlbigpO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJQbHVnaW4iLCJTdWdnZXN0TW9kYWwiLCJGdXp6eVN1Z2dlc3RNb2RhbCIsIk5vdGljZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF1REE7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtB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LENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO3dEQUMvRCxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3REFDOUcsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7d0RBQ3RJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztxREFDNUQ7aURBQ0o7cURBQU07b0RBQ0gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7d0RBQ3JFLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3REFDcEgsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEs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
