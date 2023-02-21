'use strict';

var obsidian = require('obsidian');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var obsidian__default = /*#__PURE__*/_interopDefaultLegacy(obsidian);

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
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var main = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });



const DEFAULT_DAILY_NOTE_FORMAT = "YYYY-MM-DD";
const DEFAULT_WEEKLY_NOTE_FORMAT = "gggg-[W]ww";
const DEFAULT_MONTHLY_NOTE_FORMAT = "YYYY-MM";
const DEFAULT_QUARTERLY_NOTE_FORMAT = "YYYY-[Q]Q";
const DEFAULT_YEARLY_NOTE_FORMAT = "YYYY";

function shouldUsePeriodicNotesSettings(periodicity) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const periodicNotes = window.app.plugins.getPlugin("periodic-notes");
    return periodicNotes && periodicNotes.settings?.[periodicity]?.enabled;
}
/**
 * Read the user settings for the `daily-notes` plugin
 * to keep behavior of creating a new note in-sync.
 */
function getDailyNoteSettings() {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { internalPlugins, plugins } = window.app;
        if (shouldUsePeriodicNotesSettings("daily")) {
            const { format, folder, template } = plugins.getPlugin("periodic-notes")?.settings?.daily || {};
            return {
                format: format || DEFAULT_DAILY_NOTE_FORMAT,
                folder: folder?.trim() || "",
                template: template?.trim() || "",
            };
        }
        const { folder, format, template } = internalPlugins.getPluginById("daily-notes")?.instance?.options || {};
        return {
            format: format || DEFAULT_DAILY_NOTE_FORMAT,
            folder: folder?.trim() || "",
            template: template?.trim() || "",
        };
    }
    catch (err) {
        console.info("No custom daily note settings found!", err);
    }
}
/**
 * Read the user settings for the `weekly-notes` plugin
 * to keep behavior of creating a new note in-sync.
 */
function getWeeklyNoteSettings() {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pluginManager = window.app.plugins;
        const calendarSettings = pluginManager.getPlugin("calendar")?.options;
        const periodicNotesSettings = pluginManager.getPlugin("periodic-notes")?.settings?.weekly;
        if (shouldUsePeriodicNotesSettings("weekly")) {
            return {
                format: periodicNotesSettings.format || DEFAULT_WEEKLY_NOTE_FORMAT,
                folder: periodicNotesSettings.folder?.trim() || "",
                template: periodicNotesSettings.template?.trim() || "",
            };
        }
        const settings = calendarSettings || {};
        return {
            format: settings.weeklyNoteFormat || DEFAULT_WEEKLY_NOTE_FORMAT,
            folder: settings.weeklyNoteFolder?.trim() || "",
            template: settings.weeklyNoteTemplate?.trim() || "",
        };
    }
    catch (err) {
        console.info("No custom weekly note settings found!", err);
    }
}
/**
 * Read the user settings for the `periodic-notes` plugin
 * to keep behavior of creating a new note in-sync.
 */
function getMonthlyNoteSettings() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pluginManager = window.app.plugins;
    try {
        const settings = (shouldUsePeriodicNotesSettings("monthly") &&
            pluginManager.getPlugin("periodic-notes")?.settings?.monthly) ||
            {};
        return {
            format: settings.format || DEFAULT_MONTHLY_NOTE_FORMAT,
            folder: settings.folder?.trim() || "",
            template: settings.template?.trim() || "",
        };
    }
    catch (err) {
        console.info("No custom monthly note settings found!", err);
    }
}
/**
 * Read the user settings for the `periodic-notes` plugin
 * to keep behavior of creating a new note in-sync.
 */
function getQuarterlyNoteSettings() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pluginManager = window.app.plugins;
    try {
        const settings = (shouldUsePeriodicNotesSettings("quarterly") &&
            pluginManager.getPlugin("periodic-notes")?.settings?.quarterly) ||
            {};
        return {
            format: settings.format || DEFAULT_QUARTERLY_NOTE_FORMAT,
            folder: settings.folder?.trim() || "",
            template: settings.template?.trim() || "",
        };
    }
    catch (err) {
        console.info("No custom quarterly note settings found!", err);
    }
}
/**
 * Read the user settings for the `periodic-notes` plugin
 * to keep behavior of creating a new note in-sync.
 */
function getYearlyNoteSettings() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pluginManager = window.app.plugins;
    try {
        const settings = (shouldUsePeriodicNotesSettings("yearly") &&
            pluginManager.getPlugin("periodic-notes")?.settings?.yearly) ||
            {};
        return {
            format: settings.format || DEFAULT_YEARLY_NOTE_FORMAT,
            folder: settings.folder?.trim() || "",
            template: settings.template?.trim() || "",
        };
    }
    catch (err) {
        console.info("No custom yearly note settings found!", err);
    }
}

// Credit: @creationix/path.js
function join(...partSegments) {
    // Split the inputs into a list of path commands.
    let parts = [];
    for (let i = 0, l = partSegments.length; i < l; i++) {
        parts = parts.concat(partSegments[i].split("/"));
    }
    // Interpret the path commands to get the new resolved path.
    const newParts = [];
    for (let i = 0, l = parts.length; i < l; i++) {
        const part = parts[i];
        // Remove leading and trailing slashes
        // Also remove "." segments
        if (!part || part === ".")
            continue;
        // Push new path segments.
        else
            newParts.push(part);
    }
    // Preserve the initial slash if there was one.
    if (parts[0] === "")
        newParts.unshift("");
    // Turn back into a single string path.
    return newParts.join("/");
}
function basename(fullPath) {
    let base = fullPath.substring(fullPath.lastIndexOf("/") + 1);
    if (base.lastIndexOf(".") != -1)
        base = base.substring(0, base.lastIndexOf("."));
    return base;
}
async function ensureFolderExists(path) {
    const dirs = path.replace(/\\/g, "/").split("/");
    dirs.pop(); // remove basename
    if (dirs.length) {
        const dir = join(...dirs);
        if (!window.app.vault.getAbstractFileByPath(dir)) {
            await window.app.vault.createFolder(dir);
        }
    }
}
async function getNotePath(directory, filename) {
    if (!filename.endsWith(".md")) {
        filename += ".md";
    }
    const path = obsidian__default["default"].normalizePath(join(directory, filename));
    await ensureFolderExists(path);
    return path;
}
async function getTemplateInfo(template) {
    const { metadataCache, vault } = window.app;
    const templatePath = obsidian__default["default"].normalizePath(template);
    if (templatePath === "/") {
        return Promise.resolve(["", null]);
    }
    try {
        const templateFile = metadataCache.getFirstLinkpathDest(templatePath, "");
        const contents = await vault.cachedRead(templateFile);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const IFoldInfo = window.app.foldManager.load(templateFile);
        return [contents, IFoldInfo];
    }
    catch (err) {
        console.error(`Failed to read the daily note template '${templatePath}'`, err);
        new obsidian__default["default"].Notice("Failed to read the daily note template");
        return ["", null];
    }
}

/**
 * dateUID is a way of weekly identifying daily/weekly/monthly notes.
 * They are prefixed with the granularity to avoid ambiguity.
 */
function getDateUID(date, granularity = "day") {
    const ts = date.clone().startOf(granularity).format();
    return `${granularity}-${ts}`;
}
function removeEscapedCharacters(format) {
    return format.replace(/\[[^\]]*\]/g, ""); // remove everything within brackets
}
/**
 * XXX: When parsing dates that contain both week numbers and months,
 * Moment choses to ignore the week numbers. For the week dateUID, we
 * want the opposite behavior. Strip the MMM from the format to patch.
 */
function isFormatAmbiguous(format, granularity) {
    if (granularity === "week") {
        const cleanFormat = removeEscapedCharacters(format);
        return (/w{1,2}/i.test(cleanFormat) &&
            (/M{1,4}/.test(cleanFormat) || /D{1,4}/.test(cleanFormat)));
    }
    return false;
}
function getDateFromFile(file, granularity) {
    return getDateFromFilename(file.basename, granularity);
}
function getDateFromPath(path, granularity) {
    return getDateFromFilename(basename(path), granularity);
}
function getDateFromFilename(filename, granularity) {
    const getSettings = {
        day: getDailyNoteSettings,
        week: getWeeklyNoteSettings,
        month: getMonthlyNoteSettings,
        quarter: getQuarterlyNoteSettings,
        year: getYearlyNoteSettings,
    };
    const format = getSettings[granularity]().format.split("/").pop();
    const noteDate = window.moment(filename, format, true);
    if (!noteDate.isValid()) {
        return null;
    }
    if (isFormatAmbiguous(format, granularity)) {
        if (granularity === "week") {
            const cleanFormat = removeEscapedCharacters(format);
            if (/w{1,2}/i.test(cleanFormat)) {
                return window.moment(filename, 
                // If format contains week, remove day & month formatting
                format.replace(/M{1,4}/g, "").replace(/D{1,4}/g, ""), false);
            }
        }
    }
    return noteDate;
}

class DailyNotesFolderMissingError extends Error {
}
/**
 * This function mimics the behavior of the daily-notes plugin
 * so it will replace {{date}}, {{title}}, and {{time}} with the
 * formatted timestamp.
 *
 * Note: it has an added bonus that it's not 'today' specific.
 */
async function createDailyNote(date) {
    const app = window.app;
    const { vault } = app;
    const moment = window.moment;
    const { template, format, folder } = getDailyNoteSettings();
    const [templateContents, IFoldInfo] = await getTemplateInfo(template);
    const filename = date.format(format);
    const normalizedPath = await getNotePath(folder, filename);
    try {
        const createdFile = await vault.create(normalizedPath, templateContents
            .replace(/{{\s*date\s*}}/gi, filename)
            .replace(/{{\s*time\s*}}/gi, moment().format("HH:mm"))
            .replace(/{{\s*title\s*}}/gi, filename)
            .replace(/{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi, (_, _timeOrDate, calc, timeDelta, unit, momentFormat) => {
            const now = moment();
            const currentDate = date.clone().set({
                hour: now.get("hour"),
                minute: now.get("minute"),
                second: now.get("second"),
            });
            if (calc) {
                currentDate.add(parseInt(timeDelta, 10), unit);
            }
            if (momentFormat) {
                return currentDate.format(momentFormat.substring(1).trim());
            }
            return currentDate.format(format);
        })
            .replace(/{{\s*yesterday\s*}}/gi, date.clone().subtract(1, "day").format(format))
            .replace(/{{\s*tomorrow\s*}}/gi, date.clone().add(1, "d").format(format)));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        app.foldManager.save(createdFile, IFoldInfo);
        return createdFile;
    }
    catch (err) {
        console.error(`Failed to create file: '${normalizedPath}'`, err);
        new obsidian__default["default"].Notice("Unable to create new file.");
    }
}
function getDailyNote(date, dailyNotes) {
    return dailyNotes[getDateUID(date, "day")] ?? null;
}
function getAllDailyNotes() {
    /**
     * Find all daily notes in the daily note folder
     */
    const { vault } = window.app;
    const { folder } = getDailyNoteSettings();
    const dailyNotesFolder = vault.getAbstractFileByPath(obsidian__default["default"].normalizePath(folder));
    if (!dailyNotesFolder) {
        throw new DailyNotesFolderMissingError("Failed to find daily notes folder");
    }
    const dailyNotes = {};
    obsidian__default["default"].Vault.recurseChildren(dailyNotesFolder, (note) => {
        if (note instanceof obsidian__default["default"].TFile) {
            const date = getDateFromFile(note, "day");
            if (date) {
                const dateString = getDateUID(date, "day");
                dailyNotes[dateString] = note;
            }
        }
    });
    return dailyNotes;
}

class WeeklyNotesFolderMissingError extends Error {
}
function getDaysOfWeek() {
    const { moment } = window;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let weekStart = moment.localeData()._week.dow;
    const daysOfWeek = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
    ];
    while (weekStart) {
        daysOfWeek.push(daysOfWeek.shift());
        weekStart--;
    }
    return daysOfWeek;
}
function getDayOfWeekNumericalValue(dayOfWeekName) {
    return getDaysOfWeek().indexOf(dayOfWeekName.toLowerCase());
}
async function createWeeklyNote(date) {
    const { vault } = window.app;
    const { template, format, folder } = getWeeklyNoteSettings();
    const [templateContents, IFoldInfo] = await getTemplateInfo(template);
    const filename = date.format(format);
    const normalizedPath = await getNotePath(folder, filename);
    try {
        const createdFile = await vault.create(normalizedPath, templateContents
            .replace(/{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi, (_, _timeOrDate, calc, timeDelta, unit, momentFormat) => {
            const now = window.moment();
            const currentDate = date.clone().set({
                hour: now.get("hour"),
                minute: now.get("minute"),
                second: now.get("second"),
            });
            if (calc) {
                currentDate.add(parseInt(timeDelta, 10), unit);
            }
            if (momentFormat) {
                return currentDate.format(momentFormat.substring(1).trim());
            }
            return currentDate.format(format);
        })
            .replace(/{{\s*title\s*}}/gi, filename)
            .replace(/{{\s*time\s*}}/gi, window.moment().format("HH:mm"))
            .replace(/{{\s*(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\s*:(.*?)}}/gi, (_, dayOfWeek, momentFormat) => {
            const day = getDayOfWeekNumericalValue(dayOfWeek);
            return date.weekday(day).format(momentFormat.trim());
        }));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.app.foldManager.save(createdFile, IFoldInfo);
        return createdFile;
    }
    catch (err) {
        console.error(`Failed to create file: '${normalizedPath}'`, err);
        new obsidian__default["default"].Notice("Unable to create new file.");
    }
}
function getWeeklyNote(date, weeklyNotes) {
    return weeklyNotes[getDateUID(date, "week")] ?? null;
}
function getAllWeeklyNotes() {
    const weeklyNotes = {};
    if (!appHasWeeklyNotesPluginLoaded()) {
        return weeklyNotes;
    }
    const { vault } = window.app;
    const { folder } = getWeeklyNoteSettings();
    const weeklyNotesFolder = vault.getAbstractFileByPath(obsidian__default["default"].normalizePath(folder));
    if (!weeklyNotesFolder) {
        throw new WeeklyNotesFolderMissingError("Failed to find weekly notes folder");
    }
    obsidian__default["default"].Vault.recurseChildren(weeklyNotesFolder, (note) => {
        if (note instanceof obsidian__default["default"].TFile) {
            const date = getDateFromFile(note, "week");
            if (date) {
                const dateString = getDateUID(date, "week");
                weeklyNotes[dateString] = note;
            }
        }
    });
    return weeklyNotes;
}

class MonthlyNotesFolderMissingError extends Error {
}
/**
 * This function mimics the behavior of the daily-notes plugin
 * so it will replace {{date}}, {{title}}, and {{time}} with the
 * formatted timestamp.
 *
 * Note: it has an added bonus that it's not 'today' specific.
 */
async function createMonthlyNote(date) {
    const { vault } = window.app;
    const { template, format, folder } = getMonthlyNoteSettings();
    const [templateContents, IFoldInfo] = await getTemplateInfo(template);
    const filename = date.format(format);
    const normalizedPath = await getNotePath(folder, filename);
    try {
        const createdFile = await vault.create(normalizedPath, templateContents
            .replace(/{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi, (_, _timeOrDate, calc, timeDelta, unit, momentFormat) => {
            const now = window.moment();
            const currentDate = date.clone().set({
                hour: now.get("hour"),
                minute: now.get("minute"),
                second: now.get("second"),
            });
            if (calc) {
                currentDate.add(parseInt(timeDelta, 10), unit);
            }
            if (momentFormat) {
                return currentDate.format(momentFormat.substring(1).trim());
            }
            return currentDate.format(format);
        })
            .replace(/{{\s*date\s*}}/gi, filename)
            .replace(/{{\s*time\s*}}/gi, window.moment().format("HH:mm"))
            .replace(/{{\s*title\s*}}/gi, filename));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.app.foldManager.save(createdFile, IFoldInfo);
        return createdFile;
    }
    catch (err) {
        console.error(`Failed to create file: '${normalizedPath}'`, err);
        new obsidian__default["default"].Notice("Unable to create new file.");
    }
}
function getMonthlyNote(date, monthlyNotes) {
    return monthlyNotes[getDateUID(date, "month")] ?? null;
}
function getAllMonthlyNotes() {
    const monthlyNotes = {};
    if (!appHasMonthlyNotesPluginLoaded()) {
        return monthlyNotes;
    }
    const { vault } = window.app;
    const { folder } = getMonthlyNoteSettings();
    const monthlyNotesFolder = vault.getAbstractFileByPath(obsidian__default["default"].normalizePath(folder));
    if (!monthlyNotesFolder) {
        throw new MonthlyNotesFolderMissingError("Failed to find monthly notes folder");
    }
    obsidian__default["default"].Vault.recurseChildren(monthlyNotesFolder, (note) => {
        if (note instanceof obsidian__default["default"].TFile) {
            const date = getDateFromFile(note, "month");
            if (date) {
                const dateString = getDateUID(date, "month");
                monthlyNotes[dateString] = note;
            }
        }
    });
    return monthlyNotes;
}

class QuarterlyNotesFolderMissingError extends Error {
}
/**
 * This function mimics the behavior of the daily-notes plugin
 * so it will replace {{date}}, {{title}}, and {{time}} with the
 * formatted timestamp.
 *
 * Note: it has an added bonus that it's not 'today' specific.
 */
async function createQuarterlyNote(date) {
    const { vault } = window.app;
    const { template, format, folder } = getQuarterlyNoteSettings();
    const [templateContents, IFoldInfo] = await getTemplateInfo(template);
    const filename = date.format(format);
    const normalizedPath = await getNotePath(folder, filename);
    try {
        const createdFile = await vault.create(normalizedPath, templateContents
            .replace(/{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi, (_, _timeOrDate, calc, timeDelta, unit, momentFormat) => {
            const now = window.moment();
            const currentDate = date.clone().set({
                hour: now.get("hour"),
                minute: now.get("minute"),
                second: now.get("second"),
            });
            if (calc) {
                currentDate.add(parseInt(timeDelta, 10), unit);
            }
            if (momentFormat) {
                return currentDate.format(momentFormat.substring(1).trim());
            }
            return currentDate.format(format);
        })
            .replace(/{{\s*date\s*}}/gi, filename)
            .replace(/{{\s*time\s*}}/gi, window.moment().format("HH:mm"))
            .replace(/{{\s*title\s*}}/gi, filename));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.app.foldManager.save(createdFile, IFoldInfo);
        return createdFile;
    }
    catch (err) {
        console.error(`Failed to create file: '${normalizedPath}'`, err);
        new obsidian__default["default"].Notice("Unable to create new file.");
    }
}
function getQuarterlyNote(date, quarterly) {
    return quarterly[getDateUID(date, "quarter")] ?? null;
}
function getAllQuarterlyNotes() {
    const quarterly = {};
    if (!appHasQuarterlyNotesPluginLoaded()) {
        return quarterly;
    }
    const { vault } = window.app;
    const { folder } = getQuarterlyNoteSettings();
    const quarterlyFolder = vault.getAbstractFileByPath(obsidian__default["default"].normalizePath(folder));
    if (!quarterlyFolder) {
        throw new QuarterlyNotesFolderMissingError("Failed to find quarterly notes folder");
    }
    obsidian__default["default"].Vault.recurseChildren(quarterlyFolder, (note) => {
        if (note instanceof obsidian__default["default"].TFile) {
            const date = getDateFromFile(note, "quarter");
            if (date) {
                const dateString = getDateUID(date, "quarter");
                quarterly[dateString] = note;
            }
        }
    });
    return quarterly;
}

class YearlyNotesFolderMissingError extends Error {
}
/**
 * This function mimics the behavior of the daily-notes plugin
 * so it will replace {{date}}, {{title}}, and {{time}} with the
 * formatted timestamp.
 *
 * Note: it has an added bonus that it's not 'today' specific.
 */
async function createYearlyNote(date) {
    const { vault } = window.app;
    const { template, format, folder } = getYearlyNoteSettings();
    const [templateContents, IFoldInfo] = await getTemplateInfo(template);
    const filename = date.format(format);
    const normalizedPath = await getNotePath(folder, filename);
    try {
        const createdFile = await vault.create(normalizedPath, templateContents
            .replace(/{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi, (_, _timeOrDate, calc, timeDelta, unit, momentFormat) => {
            const now = window.moment();
            const currentDate = date.clone().set({
                hour: now.get("hour"),
                minute: now.get("minute"),
                second: now.get("second"),
            });
            if (calc) {
                currentDate.add(parseInt(timeDelta, 10), unit);
            }
            if (momentFormat) {
                return currentDate.format(momentFormat.substring(1).trim());
            }
            return currentDate.format(format);
        })
            .replace(/{{\s*date\s*}}/gi, filename)
            .replace(/{{\s*time\s*}}/gi, window.moment().format("HH:mm"))
            .replace(/{{\s*title\s*}}/gi, filename));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.app.foldManager.save(createdFile, IFoldInfo);
        return createdFile;
    }
    catch (err) {
        console.error(`Failed to create file: '${normalizedPath}'`, err);
        new obsidian__default["default"].Notice("Unable to create new file.");
    }
}
function getYearlyNote(date, yearlyNotes) {
    return yearlyNotes[getDateUID(date, "year")] ?? null;
}
function getAllYearlyNotes() {
    const yearlyNotes = {};
    if (!appHasYearlyNotesPluginLoaded()) {
        return yearlyNotes;
    }
    const { vault } = window.app;
    const { folder } = getYearlyNoteSettings();
    const yearlyNotesFolder = vault.getAbstractFileByPath(obsidian__default["default"].normalizePath(folder));
    if (!yearlyNotesFolder) {
        throw new YearlyNotesFolderMissingError("Failed to find yearly notes folder");
    }
    obsidian__default["default"].Vault.recurseChildren(yearlyNotesFolder, (note) => {
        if (note instanceof obsidian__default["default"].TFile) {
            const date = getDateFromFile(note, "year");
            if (date) {
                const dateString = getDateUID(date, "year");
                yearlyNotes[dateString] = note;
            }
        }
    });
    return yearlyNotes;
}

function appHasDailyNotesPluginLoaded() {
    const { app } = window;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dailyNotesPlugin = app.internalPlugins.plugins["daily-notes"];
    if (dailyNotesPlugin && dailyNotesPlugin.enabled) {
        return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const periodicNotes = app.plugins.getPlugin("periodic-notes");
    return periodicNotes && periodicNotes.settings?.daily?.enabled;
}
/**
 * XXX: "Weekly Notes" live in either the Calendar plugin or the periodic-notes plugin.
 * Check both until the weekly notes feature is removed from the Calendar plugin.
 */
function appHasWeeklyNotesPluginLoaded() {
    const { app } = window;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (app.plugins.getPlugin("calendar")) {
        return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const periodicNotes = app.plugins.getPlugin("periodic-notes");
    return periodicNotes && periodicNotes.settings?.weekly?.enabled;
}
function appHasMonthlyNotesPluginLoaded() {
    const { app } = window;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const periodicNotes = app.plugins.getPlugin("periodic-notes");
    return periodicNotes && periodicNotes.settings?.monthly?.enabled;
}
function appHasQuarterlyNotesPluginLoaded() {
    const { app } = window;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const periodicNotes = app.plugins.getPlugin("periodic-notes");
    return periodicNotes && periodicNotes.settings?.quarterly?.enabled;
}
function appHasYearlyNotesPluginLoaded() {
    const { app } = window;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const periodicNotes = app.plugins.getPlugin("periodic-notes");
    return periodicNotes && periodicNotes.settings?.yearly?.enabled;
}
function getPeriodicNoteSettings(granularity) {
    const getSettings = {
        day: getDailyNoteSettings,
        week: getWeeklyNoteSettings,
        month: getMonthlyNoteSettings,
        quarter: getQuarterlyNoteSettings,
        year: getYearlyNoteSettings,
    }[granularity];
    return getSettings();
}
function createPeriodicNote(granularity, date) {
    const createFn = {
        day: createDailyNote,
        month: createMonthlyNote,
        week: createWeeklyNote,
    };
    return createFn[granularity](date);
}

exports.DEFAULT_DAILY_NOTE_FORMAT = DEFAULT_DAILY_NOTE_FORMAT;
exports.DEFAULT_MONTHLY_NOTE_FORMAT = DEFAULT_MONTHLY_NOTE_FORMAT;
exports.DEFAULT_QUARTERLY_NOTE_FORMAT = DEFAULT_QUARTERLY_NOTE_FORMAT;
exports.DEFAULT_WEEKLY_NOTE_FORMAT = DEFAULT_WEEKLY_NOTE_FORMAT;
exports.DEFAULT_YEARLY_NOTE_FORMAT = DEFAULT_YEARLY_NOTE_FORMAT;
exports.appHasDailyNotesPluginLoaded = appHasDailyNotesPluginLoaded;
exports.appHasMonthlyNotesPluginLoaded = appHasMonthlyNotesPluginLoaded;
exports.appHasQuarterlyNotesPluginLoaded = appHasQuarterlyNotesPluginLoaded;
exports.appHasWeeklyNotesPluginLoaded = appHasWeeklyNotesPluginLoaded;
exports.appHasYearlyNotesPluginLoaded = appHasYearlyNotesPluginLoaded;
exports.createDailyNote = createDailyNote;
exports.createMonthlyNote = createMonthlyNote;
exports.createPeriodicNote = createPeriodicNote;
exports.createQuarterlyNote = createQuarterlyNote;
exports.createWeeklyNote = createWeeklyNote;
exports.createYearlyNote = createYearlyNote;
exports.getAllDailyNotes = getAllDailyNotes;
exports.getAllMonthlyNotes = getAllMonthlyNotes;
exports.getAllQuarterlyNotes = getAllQuarterlyNotes;
exports.getAllWeeklyNotes = getAllWeeklyNotes;
exports.getAllYearlyNotes = getAllYearlyNotes;
exports.getDailyNote = getDailyNote;
exports.getDailyNoteSettings = getDailyNoteSettings;
exports.getDateFromFile = getDateFromFile;
exports.getDateFromPath = getDateFromPath;
exports.getDateUID = getDateUID;
exports.getMonthlyNote = getMonthlyNote;
exports.getMonthlyNoteSettings = getMonthlyNoteSettings;
exports.getPeriodicNoteSettings = getPeriodicNoteSettings;
exports.getQuarterlyNote = getQuarterlyNote;
exports.getQuarterlyNoteSettings = getQuarterlyNoteSettings;
exports.getTemplateInfo = getTemplateInfo;
exports.getWeeklyNote = getWeeklyNote;
exports.getWeeklyNoteSettings = getWeeklyNoteSettings;
exports.getYearlyNote = getYearlyNote;
exports.getYearlyNoteSettings = getYearlyNoteSettings;
});

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return stringify(rnds);
}

//! All of these methods are taken from https://www.npmjs.com/package/obsidian-daily-notes-interface.
function join() {
    var partSegments = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        partSegments[_i] = arguments[_i];
    }
    // Split the inputs into a list of path commands.
    var parts = [];
    for (var i = 0, l = partSegments.length; i < l; i++) {
        parts = parts.concat(partSegments[i].split("/"));
    }
    // Interpret the path commands to get the new resolved path.
    var newParts = [];
    for (var i = 0, l = parts.length; i < l; i++) {
        var part = parts[i];
        // Remove leading and trailing slashes
        // Also remove "." segments
        if (!part || part === ".")
            continue;
        // Push new path segments.
        else
            newParts.push(part);
    }
    // Preserve the initial slash if there was one.
    if (parts[0] === "")
        newParts.unshift("");
    // Turn back into a single string path.
    return newParts.join("/");
}
function getNotePath(directory, filename) {
    return __awaiter(this, void 0, void 0, function () {
        var path;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!filename.endsWith(".md")) {
                        filename += ".md";
                    }
                    path = obsidian.normalizePath(join(directory, filename));
                    return [4 /*yield*/, ensureFolderExists(path)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, path];
            }
        });
    });
}
function ensureFolderExists(path) {
    return __awaiter(this, void 0, void 0, function () {
        var dirs, dir;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dirs = path.replace(/\\/g, "/").split("/");
                    dirs.pop(); // remove basename
                    if (!dirs.length) return [3 /*break*/, 2];
                    dir = join.apply(void 0, dirs);
                    if (!!window.app.vault.getAbstractFileByPath(dir)) return [3 /*break*/, 2];
                    return [4 /*yield*/, window.app.vault.createFolder(dir)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
function getDailyNotePath(date) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, format, folder, filename, normalizedPath;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = main.getDailyNoteSettings(), format = _a.format, folder = _a.folder;
                    filename = date.format(format);
                    return [4 /*yield*/, getNotePath(folder, filename)];
                case 1:
                    normalizedPath = _b.sent();
                    return [2 /*return*/, normalizedPath];
            }
        });
    });
}

var DEFAULT_SETTINGS = {
    openFileOnWrite: true,
    openDailyInNewPane: false,
    openFileOnWriteInNewPane: false,
    openFileWithoutWriteInNewPane: false,
    idField: "id",
    useUID: false,
};
var AdvancedURI = /** @class */ (function (_super) {
    __extends(AdvancedURI, _super);
    function AdvancedURI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdvancedURI.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _a.sent();
                        this.addSettingTab(new SettingsTab(this.app, this));
                        this.addCommand({
                            id: "copy-uri-current-file",
                            name: "copy URI for file",
                            callback: function () { return _this.handleCopyFileURI(); }
                        });
                        this.addCommand({
                            id: "copy-uri-daily",
                            name: "copy URI for daily note",
                            callback: function () { return new EnterDataModal(_this).open(); }
                        });
                        this.addCommand({
                            id: "copy-uri-search-and-replace",
                            name: "copy URI for search and replace",
                            callback: function () {
                                var fileModal = new FileModal(_this, "Used file for search and replace");
                                fileModal.open();
                                fileModal.onChooseItem = function (filePath) {
                                    var searchModal = new SearchModal(_this);
                                    searchModal.open();
                                    searchModal.onChooseSuggestion = function (item) {
                                        new ReplaceModal(_this, item, filePath === null || filePath === void 0 ? void 0 : filePath.source).open();
                                    };
                                };
                            },
                        });
                        this.addCommand({
                            id: "copy-uri-command",
                            name: "copy URI for command",
                            callback: function () {
                                var fileModal = new FileModal(_this, "Select a file to be opened before executing the command");
                                fileModal.open();
                                fileModal.onChooseItem = function (item) {
                                    new CommandModal(_this, item === null || item === void 0 ? void 0 : item.source).open();
                                };
                            }
                        });
                        this.registerObsidianProtocolHandler("advanced-uri", function (e) { return __awaiter(_this, void 0, void 0, function () {
                            var parameters, createdDailyNote, parameter, file, index, extension, moment_1, allDailyNotes, dailyNote, _a;
                            var _this = this;
                            var _b, _c;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        parameters = e;
                                        createdDailyNote = false;
                                        for (parameter in parameters) {
                                            parameters[parameter] = decodeURIComponent(parameters[parameter]);
                                        }
                                        if (!parameters.uid) return [3 /*break*/, 1];
                                        parameters.filepath = (_b = this.getFileFromUID(parameters.uid)) === null || _b === void 0 ? void 0 : _b.path;
                                        return [3 /*break*/, 8];
                                    case 1:
                                        if (!parameters.filename) return [3 /*break*/, 2];
                                        file = this.app.metadataCache.getFirstLinkpathDest(parameters.filename, "");
                                        if (!file) {
                                            file = this.app.vault.getMarkdownFiles().find(function (file) { var _a; return (_a = obsidian.parseFrontMatterAliases(_this.app.metadataCache.getFileCache(file).frontmatter)) === null || _a === void 0 ? void 0 : _a.includes(parameters.filename); });
                                        }
                                        parameters.filepath = (_c = file === null || file === void 0 ? void 0 : file.path) !== null && _c !== void 0 ? _c : obsidian.normalizePath(parameters.filename);
                                        return [3 /*break*/, 8];
                                    case 2:
                                        if (!parameters.filepath) return [3 /*break*/, 3];
                                        parameters.filepath = obsidian.normalizePath(parameters.filepath);
                                        index = parameters.filepath.lastIndexOf(".");
                                        extension = parameters.filepath.substring(index < 0 ? parameters.filepath.length : index);
                                        if (extension === "") {
                                            parameters.filepath = parameters.filepath + ".md";
                                        }
                                        return [3 /*break*/, 8];
                                    case 3:
                                        if (!(parameters.daily === "true")) return [3 /*break*/, 8];
                                        if (!main.appHasDailyNotesPluginLoaded()) {
                                            new obsidian.Notice("Daily notes plugin is not loaded");
                                            return [2 /*return*/];
                                        }
                                        moment_1 = window.moment(Date.now());
                                        allDailyNotes = main.getAllDailyNotes();
                                        dailyNote = main.getDailyNote(moment_1, allDailyNotes);
                                        if (!!dailyNote) return [3 /*break*/, 7];
                                        if (!(parameters.exists === "true")) return [3 /*break*/, 5];
                                        _a = parameters;
                                        return [4 /*yield*/, getDailyNotePath(moment_1)];
                                    case 4:
                                        _a.filepath = _d.sent();
                                        return [3 /*break*/, 7];
                                    case 5: return [4 /*yield*/, main.createDailyNote(moment_1)];
                                    case 6:
                                        dailyNote = _d.sent();
                                        createdDailyNote = true;
                                        _d.label = 7;
                                    case 7:
                                        if (dailyNote !== undefined) {
                                            parameters.filepath = dailyNote.path;
                                        }
                                        _d.label = 8;
                                    case 8:
                                        if (parameters.workspace || parameters.saveworkspace == "true") {
                                            this.handleWorkspace(parameters);
                                        }
                                        else if (parameters.commandname || parameters.commandid) {
                                            this.handleCommand(parameters);
                                        }
                                        else if (parameters.filepath && parameters.exists === "true") {
                                            this.handleDoesFileExist(parameters);
                                        }
                                        else if (parameters.filepath && parameters.data) {
                                            this.handleWrite(parameters, createdDailyNote);
                                        }
                                        else if (parameters.filepath && parameters.heading) {
                                            this.handleOpen(parameters);
                                        }
                                        else if (parameters.filepath && parameters.block) {
                                            this.handleOpen(parameters);
                                        }
                                        else if ((parameters.search || parameters.searchregex) && parameters.replace != undefined) {
                                            this.handleSearchAndReplace(parameters);
                                        }
                                        else if (parameters.filepath) {
                                            this.handleOpen(parameters);
                                        }
                                        else if (parameters.settingid) {
                                            this.handleOpenSettings(parameters);
                                        }
                                        else if (parameters.updateplugins) {
                                            this.handleUpdatePlugins(parameters);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.registerObsidianProtocolHandler("hook-get-advanced-uri", function (e) { return __awaiter(_this, void 0, void 0, function () {
                            var parameters, parameter, activeLeaf, file, url, title, _a, _b, _c, url;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        parameters = e;
                                        for (parameter in parameters) {
                                            parameters[parameter] = decodeURIComponent(parameters[parameter]);
                                        }
                                        activeLeaf = this.app.workspace.activeLeaf;
                                        file = activeLeaf.view.file;
                                        if (!(activeLeaf && file)) return [3 /*break*/, 2];
                                        url = new URL(parameters["x-success"]);
                                        title = void 0;
                                        if (file.extension == "md") {
                                            title = file.basename;
                                        }
                                        else {
                                            title = file.name;
                                        }
                                        url.searchParams.set("title", title);
                                        _b = (_a = url.searchParams).set;
                                        _c = ["advanceduri"];
                                        return [4 /*yield*/, this.generateURI({ filepath: file.path })];
                                    case 1:
                                        _b.apply(_a, _c.concat([_d.sent()]));
                                        url.searchParams.set("urlkey", "advanceduri");
                                        window.open(url.toString());
                                        return [3 /*break*/, 3];
                                    case 2:
                                        url = new URL(parameters["x-error"]);
                                        url.searchParams.set("errorMessage", "No file opened");
                                        window.open(url.toString());
                                        _d.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); });
                        this.registerEvent(this.app.workspace.on('file-menu', function (menu, _, source) {
                            if (source !== "pane-more-options") {
                                return;
                            }
                            var view = _this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
                            if (!view) {
                                return;
                            }
                            menu.addItem(function (item) {
                                item.setTitle("Copy Advanced URI").setIcon('link')
                                    .onClick(function (_) { return _this.handleCopyFileURI(); });
                            });
                        }));
                        return [2 /*return*/];
                }
            });
        });
    };
    AdvancedURI.prototype.success = function (parameters) {
        if (parameters["x-success"])
            obsidian.request({ url: parameters["x-success"], });
    };
    AdvancedURI.prototype.failure = function (parameters) {
        if (parameters["x-error"])
            obsidian.request({ url: parameters["x-error"] });
    };
    AdvancedURI.prototype.getFileFromUID = function (uid) {
        var _this = this;
        var files = this.app.vault.getFiles();
        var idKey = this.settings.idField;
        return files.find(function (file) { var _a; return obsidian.parseFrontMatterEntry((_a = _this.app.metadataCache.getFileCache(file)) === null || _a === void 0 ? void 0 : _a.frontmatter, idKey) == uid; });
    };
    AdvancedURI.prototype.handleWorkspace = function (parameters) {
        var _a, _b;
        var workspaces = (_b = (_a = this.app.internalPlugins) === null || _a === void 0 ? void 0 : _a.plugins) === null || _b === void 0 ? void 0 : _b.workspaces;
        if (!workspaces) {
            new obsidian.Notice("Cannot find Workspaces plugin. Please file an issue.");
            this.failure(parameters);
        }
        else if (workspaces.enabled) {
            if (parameters.saveworkspace == "true") {
                var active = workspaces.instance.activeWorkspace;
                workspaces.instance.saveWorkspace(active);
                new obsidian.Notice("Saved current workspace to " + active);
            }
            if (parameters.workspace != undefined) {
                workspaces.instance.loadWorkspace(parameters.workspace);
            }
            this.success(parameters);
        }
        else {
            new obsidian.Notice("Workspaces plugin is not enabled");
            this.failure(parameters);
        }
    };
    AdvancedURI.prototype.handleCommand = function (parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var view, editor, data, lines, rawCommands, command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!parameters.filepath) return [3 /*break*/, 4];
                        if (!parameters.mode) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.app.workspace.openLinkText(parameters.filepath, "/", undefined, {
                                state: { mode: "source" }
                            })];
                    case 1:
                        _a.sent();
                        view = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
                        if (view) {
                            editor = view.editor;
                            data = editor.getValue();
                            if (parameters.mode === "append") {
                                editor.setValue(data + "\n");
                                lines = editor.lineCount();
                                editor.setCursor({ ch: 0, line: lines });
                            }
                            else if (parameters.mode === "prepend") {
                                editor.setValue("\n" + data);
                                editor.setCursor({ ch: 0, line: 0 });
                            }
                            else if (parameters.mode === "overwrite") {
                                editor.setValue("");
                            }
                        }
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.app.workspace.openLinkText(parameters.filepath, "/", this.settings.openFileWithoutWriteInNewPane, this.getViewStateFromMode(parameters))];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (parameters.commandid) {
                            this.app.commands.executeCommandById(parameters.commandid);
                        }
                        else if (parameters.commandname) {
                            rawCommands = this.app.commands.commands;
                            for (command in rawCommands) {
                                if (rawCommands[command].name === parameters.commandname) {
                                    if (rawCommands[command].callback) {
                                        rawCommands[command].callback();
                                    }
                                    else {
                                        rawCommands[command].checkCallback(false);
                                    }
                                    break;
                                }
                            }
                        }
                        this.success(parameters);
                        return [2 /*return*/];
                }
            });
        });
    };
    AdvancedURI.prototype.handleDoesFileExist = function (parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.app.vault.adapter.exists(parameters.filepath)];
                    case 1:
                        exists = _a.sent();
                        this.copyText((exists ? 1 : 0).toString());
                        this.success(parameters);
                        return [2 /*return*/];
                }
            });
        });
    };
    AdvancedURI.prototype.handleSearchAndReplace = function (parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var file, abstractFile, data, _a, pattern, flags, regex;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (parameters.filepath) {
                            abstractFile = this.app.vault.getAbstractFileByPath(parameters.filepath);
                            if (abstractFile instanceof obsidian.TFile) {
                                file = abstractFile;
                            }
                        }
                        else {
                            file = this.app.workspace.getActiveFile();
                        }
                        if (!file) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.app.vault.read(file)];
                    case 1:
                        data = _b.sent();
                        if (parameters.searchregex) {
                            try {
                                _a = parameters.searchregex.match(/(\/?)(.+)\1([a-z]*)/i), pattern = _a[2], flags = _a[3];
                                regex = new RegExp(pattern, flags);
                                data = data.replace(regex, parameters.replace);
                                this.success(parameters);
                            }
                            catch (error) {
                                new obsidian.Notice("Can't parse " + parameters.searchregex + " as RegEx");
                                this.failure(parameters);
                            }
                        }
                        else {
                            data = data.replaceAll(parameters.search, parameters.replace);
                            this.success(parameters);
                        }
                        return [4 /*yield*/, this.writeAndOpenFile(file.path, data, parameters)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        new obsidian.Notice("Cannot find file");
                        this.failure(parameters);
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AdvancedURI.prototype.handleWrite = function (parameters, createdDailyNote) {
        if (createdDailyNote === void 0) { createdDailyNote = false; }
        return __awaiter(this, void 0, void 0, function () {
            var path, file;
            return __generator(this, function (_a) {
                path = parameters.filepath;
                file = this.app.vault.getAbstractFileByPath(path);
                if (parameters.mode === "overwrite") {
                    this.writeAndOpenFile(path, parameters.data, parameters);
                    this.success(parameters);
                }
                else if (parameters.mode === "prepend") {
                    if (file instanceof obsidian.TFile) {
                        this.prepend(file, parameters);
                    }
                    else {
                        this.prepend(path, parameters);
                    }
                    this.success(parameters);
                }
                else if (parameters.mode === "append") {
                    if (file instanceof obsidian.TFile) {
                        this.append(file, parameters);
                    }
                    else {
                        this.append(path, parameters);
                    }
                    this.success(parameters);
                }
                else if (!createdDailyNote && file instanceof obsidian.TFile) {
                    new obsidian.Notice("File already exists");
                    this.failure(parameters);
                }
                else {
                    this.writeAndOpenFile(path, parameters.data, parameters);
                    this.success(parameters);
                }
                return [2 /*return*/];
            });
        });
    };
    AdvancedURI.prototype.handleOpen = function (parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var fileIsAlreadyOpened, leaf, viewState, view, cache, heading, view, cache, block;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileIsAlreadyOpened = false;
                        this.app.workspace.iterateAllLeaves(function (leaf) {
                            var _a;
                            if (((_a = leaf.view.file) === null || _a === void 0 ? void 0 : _a.path) === parameters.filepath) {
                                fileIsAlreadyOpened = true;
                                _this.app.workspace.setActiveLeaf(leaf, true, true);
                            }
                        });
                        if (!fileIsAlreadyOpened) return [3 /*break*/, 2];
                        leaf = this.app.workspace.activeLeaf;
                        if (!(parameters.viewmode != undefined)) return [3 /*break*/, 2];
                        viewState = leaf.getViewState();
                        viewState.state.mode = parameters.viewmode;
                        if (viewState.state.source != undefined)
                            viewState.state.source = parameters.viewmode == "source";
                        return [4 /*yield*/, leaf.setViewState(viewState)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(parameters.heading != undefined)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.app.workspace.openLinkText(parameters.filepath + "#" + parameters.heading, "", this.settings.openFileWithoutWriteInNewPane, this.getViewStateFromMode(parameters))];
                    case 3:
                        _a.sent();
                        view = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
                        if (!view)
                            return [2 /*return*/];
                        cache = this.app.metadataCache.getFileCache(view.file);
                        heading = cache.headings.find(function (e) { return e.heading === parameters.heading; });
                        view.editor.focus();
                        view.editor.setCursor({ line: heading.position.start.line + 1, ch: 0 });
                        return [3 /*break*/, 9];
                    case 4:
                        if (!(parameters.block != undefined)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.app.workspace.openLinkText(parameters.filepath + "#^" + parameters.block, "", this.settings.openFileWithoutWriteInNewPane, this.getViewStateFromMode(parameters))];
                    case 5:
                        _a.sent();
                        view = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
                        if (!view)
                            return [2 /*return*/];
                        cache = this.app.metadataCache.getFileCache(view.file);
                        block = cache.blocks[parameters.block];
                        view.editor.focus();
                        view.editor.setCursor({ line: block.position.start.line, ch: 0 });
                        return [3 /*break*/, 9];
                    case 6:
                        if (!!fileIsAlreadyOpened) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.app.workspace.openLinkText(parameters.filepath, "", this.settings.openFileWithoutWriteInNewPane, this.getViewStateFromMode(parameters))];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        if (parameters.line != undefined) {
                            this.setCursorInLine(parameters.line);
                        }
                        _a.label = 9;
                    case 9:
                        if (!(parameters.mode != undefined)) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.setCursor(parameters.mode)];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        this.success(parameters);
                        return [2 /*return*/];
                }
            });
        });
    };
    AdvancedURI.prototype.append = function (file, parameters) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var path, dataToWrite, line, data, lines, fileData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!parameters.heading) return [3 /*break*/, 3];
                        if (!(file instanceof obsidian.TFile)) return [3 /*break*/, 2];
                        path = file.path;
                        line = (_a = this.getEndAndBeginningOfHeading(file, parameters.heading)) === null || _a === void 0 ? void 0 : _a.lastLine;
                        if (line === undefined)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.app.vault.read(file)];
                    case 1:
                        data = _b.sent();
                        lines = data.split("\n");
                        lines.splice.apply(lines, __spreadArray([line, 0], parameters.data.split("\n")));
                        dataToWrite = lines.join("\n");
                        _b.label = 2;
                    case 2: return [3 /*break*/, 7];
                    case 3:
                        fileData = void 0;
                        if (!(file instanceof obsidian.TFile)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.app.vault.read(file)];
                    case 4:
                        fileData = _b.sent();
                        path = file.path;
                        return [3 /*break*/, 6];
                    case 5:
                        path = file;
                        fileData = "";
                        _b.label = 6;
                    case 6:
                        dataToWrite = fileData + "\n" + parameters.data;
                        _b.label = 7;
                    case 7:
                        this.writeAndOpenFile(path, dataToWrite, parameters);
                        return [2 /*return*/];
                }
            });
        });
    };
    AdvancedURI.prototype.prepend = function (file, parameters) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var path, dataToWrite, line, data, lines, fileData, cache, line, first, last;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!parameters.heading) return [3 /*break*/, 3];
                        if (!(file instanceof obsidian.TFile)) return [3 /*break*/, 2];
                        path = file.path;
                        line = (_a = this.getEndAndBeginningOfHeading(file, parameters.heading)) === null || _a === void 0 ? void 0 : _a.firstLine;
                        if (line === undefined)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.app.vault.read(file)];
                    case 1:
                        data = _b.sent();
                        lines = data.split("\n");
                        lines.splice.apply(lines, __spreadArray([line, 0], parameters.data.split("\n")));
                        dataToWrite = lines.join("\n");
                        _b.label = 2;
                    case 2: return [3 /*break*/, 6];
                    case 3:
                        if (!(file instanceof obsidian.TFile)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.app.vault.read(file)];
                    case 4:
                        fileData = _b.sent();
                        cache = this.app.metadataCache.getFileCache(file);
                        if (cache.frontmatter) {
                            line = cache.frontmatter.position.end.line;
                            first = fileData.split("\n").slice(0, line + 1).join("\n");
                            last = fileData.split("\n").slice(line + 1).join("\n");
                            dataToWrite = first + "\n" + parameters.data + "\n" + last;
                        }
                        else {
                            dataToWrite = parameters.data + "\n" + fileData;
                        }
                        path = file.path;
                        return [3 /*break*/, 6];
                    case 5:
                        path = file;
                        dataToWrite = parameters.data;
                        _b.label = 6;
                    case 6:
                        this.writeAndOpenFile(path, dataToWrite, parameters);
                        return [2 /*return*/];
                }
            });
        });
    };
    AdvancedURI.prototype.writeAndOpenFile = function (outputFileName, text, parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var fileIsAlreadyOpened_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.app.vault.adapter.write(outputFileName, text)];
                    case 1:
                        _a.sent();
                        if (!this.settings.openFileOnWrite) return [3 /*break*/, 4];
                        fileIsAlreadyOpened_1 = false;
                        this.app.workspace.iterateAllLeaves(function (leaf) {
                            var _a;
                            if (((_a = leaf.view.file) === null || _a === void 0 ? void 0 : _a.path) === outputFileName) {
                                fileIsAlreadyOpened_1 = true;
                                _this.app.workspace.setActiveLeaf(leaf, true, true);
                            }
                        });
                        if (!!fileIsAlreadyOpened_1) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.app.workspace.openLinkText(outputFileName, "", this.settings.openFileOnWriteInNewPane, this.getViewStateFromMode(parameters))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (parameters.line != undefined) {
                            this.setCursorInLine(parameters.line);
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AdvancedURI.prototype.getEndAndBeginningOfHeading = function (file, heading) {
        var _a, _b;
        var cache = this.app.metadataCache.getFileCache(file);
        var sections = cache.sections;
        var foundHeading = (_a = cache.headings) === null || _a === void 0 ? void 0 : _a.find(function (e) { return e.heading === heading; });
        if (foundHeading) {
            var foundSectionIndex = sections.findIndex(function (section) { return section.type === "heading" && section.position.start.line === foundHeading.position.start.line; });
            var restSections = sections.slice(foundSectionIndex + 1);
            var nextHeadingIndex = restSections === null || restSections === void 0 ? void 0 : restSections.findIndex(function (e) { return e.type === "heading"; });
            var lastSection = (_b = restSections[(nextHeadingIndex !== -1 ? nextHeadingIndex : restSections.length) - 1]) !== null && _b !== void 0 ? _b : sections[foundSectionIndex];
            var lastLine = lastSection.position.end.line + 1;
            return { "lastLine": lastLine, "firstLine": sections[foundSectionIndex].position.end.line + 1 };
        }
        else {
            new obsidian.Notice("Can't find heading");
        }
    };
    AdvancedURI.prototype.setCursor = function (mode) {
        return __awaiter(this, void 0, void 0, function () {
            var view, editor, viewState, lastLine, lastLineLength;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        view = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
                        if (!view) return [3 /*break*/, 4];
                        editor = view.editor;
                        viewState = view.leaf.getViewState();
                        viewState.state.mode = "source";
                        if (!(mode === "append")) return [3 /*break*/, 2];
                        lastLine = editor.lastLine();
                        lastLineLength = editor.getLine(lastLine).length;
                        return [4 /*yield*/, view.leaf.setViewState(viewState, { focus: true })];
                    case 1:
                        _a.sent();
                        editor.setCursor({ ch: lastLineLength, line: lastLine });
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(mode === "prepend")) return [3 /*break*/, 4];
                        return [4 /*yield*/, view.leaf.setViewState(viewState, { focus: true })];
                    case 3:
                        _a.sent();
                        editor.setCursor({ ch: 0, line: 0 });
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AdvancedURI.prototype.setCursorInLine = function (rawLine) {
        var view = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
        if (!view)
            return;
        var line = Math.min(rawLine - 1, view.editor.lineCount() - 1);
        view.editor.focus();
        view.editor.setCursor({ line: line, ch: view.editor.getLine(line).length });
    };
    AdvancedURI.prototype.handleCopyFileURI = function () {
        var _this = this;
        var view = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
        if (!view)
            return;
        var pos = view.editor.getCursor();
        var cache = this.app.metadataCache.getFileCache(view.file);
        if (cache.headings) {
            for (var _i = 0, _a = cache.headings; _i < _a.length; _i++) {
                var heading = _a[_i];
                if (heading.position.start.line <= pos.line && heading.position.end.line >= pos.line) {
                    this.copyURI({
                        filepath: view.file.path,
                        heading: heading.heading
                    });
                    return;
                }
            }
        }
        if (cache.blocks) {
            for (var _b = 0, _c = Object.keys(cache.blocks); _b < _c.length; _b++) {
                var blockID = _c[_b];
                var block = cache.blocks[blockID];
                if (block.position.start.line <= pos.line && block.position.end.line >= pos.line) {
                    this.copyURI({
                        filepath: view.file.path,
                        block: blockID
                    });
                    return;
                }
            }
        }
        var fileModal = new FileModal(this, "Choose a file", false);
        fileModal.open();
        fileModal.onChooseItem = function (item, _) {
            new EnterDataModal(_this, item.source).open();
        };
    };
    AdvancedURI.prototype.handleOpenSettings = function (parameters) {
        if (this.app.setting.containerEl.parentElement === null) {
            this.app.setting.open();
        }
        if (parameters.settingid == "plugin-browser") {
            this.app.setting.openTabById("community-plugins");
            this.app.setting.activeTab.containerEl.find(".mod-cta").click();
        }
        else if (parameters.settingid == "theme-browser") {
            this.app.setting.openTabById("appearance");
            this.app.setting.activeTab.containerEl.find(".mod-cta").click();
        }
        else {
            this.app.setting.openTabById(parameters.settingid);
        }
        this.success(parameters);
    };
    AdvancedURI.prototype.handleUpdatePlugins = function (parameters) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameters.settingid = "community-plugins";
                        this.handleOpenSettings(parameters);
                        this.app.setting.activeTab.containerEl.findAll(".mod-cta").last().click();
                        new obsidian.Notice("Waiting 10 seconds");
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 10 * 1000); })];
                    case 1:
                        _a.sent();
                        if (Object.keys(this.app.plugins.updates).length !== 0) {
                            this.app.setting.activeTab.containerEl.findAll(".mod-cta").last().click();
                        }
                        this.success(parameters);
                        return [2 /*return*/];
                }
            });
        });
    };
    AdvancedURI.prototype.generateURI = function (parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var uri, file, _a, parameter;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        uri = "obsidian://advanced-uri?vault=" + this.app.vault.getName();
                        file = this.app.vault.getAbstractFileByPath(parameters.filepath);
                        if (!(this.settings.useUID && file instanceof obsidian.TFile)) return [3 /*break*/, 2];
                        parameters.filepath = undefined;
                        _a = parameters;
                        return [4 /*yield*/, this.getUIDFromFile(file)];
                    case 1:
                        _a.uid = _b.sent();
                        _b.label = 2;
                    case 2:
                        for (parameter in parameters) {
                            if (parameters[parameter] != undefined) {
                                uri = uri + ("&" + parameter + "=" + encodeURIComponent(parameters[parameter]));
                            }
                        }
                        return [2 /*return*/, uri];
                }
            });
        });
    };
    AdvancedURI.prototype.copyURI = function (parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var uri;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.generateURI(parameters)];
                    case 1:
                        uri = _a.sent();
                        return [4 /*yield*/, this.copyText(encodeURI(uri))];
                    case 2:
                        _a.sent();
                        new obsidian.Notice("Advanced URI copied to your clipboard");
                        return [2 /*return*/];
                }
            });
        });
    };
    AdvancedURI.prototype.copyText = function (text) {
        return navigator.clipboard.writeText(text);
    };
    AdvancedURI.prototype.getUIDFromFile = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var fileContent, frontmatter, uid, isYamlEmpty, splitContent, newFileContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.app.vault.read(file)];
                    case 1:
                        fileContent = _a.sent();
                        frontmatter = this.app.metadataCache.getFileCache(file).frontmatter;
                        uid = obsidian.parseFrontMatterEntry(frontmatter, this.settings.idField);
                        if (uid)
                            return [2 /*return*/, uid];
                        isYamlEmpty = ((!frontmatter || frontmatter.length === 0) && !fileContent.match(/^-{3}\s*\n*\r*-{3}/));
                        uid = v4();
                        splitContent = fileContent.split("\n");
                        if (isYamlEmpty) {
                            splitContent.unshift("---");
                            splitContent.unshift(this.settings.idField + ": " + uid);
                            splitContent.unshift("---");
                        }
                        else {
                            splitContent.splice(1, 0, this.settings.idField + ": " + uid);
                        }
                        newFileContent = splitContent.join("\n");
                        return [4 /*yield*/, this.app.vault.modify(file, newFileContent)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, uid];
                }
            });
        });
    };
    AdvancedURI.prototype.getViewStateFromMode = function (parameters) {
        return parameters.viewmode ? { state: { mode: parameters.viewmode } } : undefined;
    };
    AdvancedURI.prototype.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [DEFAULT_SETTINGS];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    AdvancedURI.prototype.saveSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveData(this.settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return AdvancedURI;
}(obsidian.Plugin));
var SettingsTab = /** @class */ (function (_super) {
    __extends(SettingsTab, _super);
    function SettingsTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    SettingsTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        containerEl.createEl("h2", { text: this.plugin.manifest.name });
        new obsidian.Setting(containerEl)
            .setName("Open file on write")
            .addToggle(function (cb) { return cb.onChange(function (value) {
            _this.plugin.settings.openFileOnWrite = value;
            _this.plugin.saveSettings();
        }).setValue(_this.plugin.settings.openFileOnWrite); });
        new obsidian.Setting(containerEl)
            .setName("Open file on write in a new pane")
            .setDisabled(this.plugin.settings.openFileOnWrite)
            .addToggle(function (cb) { return cb.onChange(function (value) {
            _this.plugin.settings.openFileOnWriteInNewPane = value;
            _this.plugin.saveSettings();
        }).setValue(_this.plugin.settings.openFileOnWriteInNewPane); });
        new obsidian.Setting(containerEl)
            .setName("Open daily note in a new pane")
            .addToggle(function (cb) { return cb.onChange(function (value) {
            _this.plugin.settings.openDailyInNewPane = value;
            _this.plugin.saveSettings();
        }).setValue(_this.plugin.settings.openDailyInNewPane); });
        new obsidian.Setting(containerEl)
            .setName("Open file without write in new pane")
            .addToggle(function (cb) { return cb.onChange(function (value) {
            _this.plugin.settings.openFileWithoutWriteInNewPane = value;
            _this.plugin.saveSettings();
        }).setValue(_this.plugin.settings.openFileWithoutWriteInNewPane); });
        new obsidian.Setting(containerEl)
            .setName("Use UID instead of file paths")
            .addToggle(function (cb) { return cb.onChange(function (value) {
            _this.plugin.settings.useUID = value;
            _this.plugin.saveSettings();
        }).setValue(_this.plugin.settings.useUID); });
        new obsidian.Setting(containerEl)
            .setName("UID field in frontmatter")
            .addText(function (cb) { return cb.onChange(function (value) {
            _this.plugin.settings.idField = value;
            _this.plugin.saveSettings();
        }).setValue(_this.plugin.settings.idField); });
    };
    return SettingsTab;
}(obsidian.PluginSettingTab));
var EnterDataModal = /** @class */ (function (_super) {
    __extends(EnterDataModal, _super);
    function EnterDataModal(plugin, file) {
        var _this = _super.call(this, plugin.app) || this;
        //null if for normal write mode, its not associated with a special mode like "append" or "prepend"
        _this.modes = [null, "overwrite", "append", "prepend"];
        _this.plugin = plugin;
        _this.setPlaceholder("Type your data to be written to the file or leave it empty to just open it");
        _this.file = file;
        return _this;
    }
    EnterDataModal.prototype.getSuggestions = function (query) {
        var _this = this;
        if (query == "")
            query = null;
        var suggestions = [];
        var _loop_1 = function (mode) {
            if (!(mode === "overwrite" && !query)) {
                var display = void 0;
                if (query) {
                    if (mode) {
                        display = "Write \"" + query + "\" in " + mode + " mode";
                    }
                    else {
                        display = "Write \"" + query + "\"";
                    }
                }
                else {
                    if (mode) {
                        display = "Open in " + mode + " mode";
                    }
                    else {
                        display = "Open";
                    }
                }
                suggestions.push({
                    data: query,
                    display: display,
                    mode: mode,
                    func: function () {
                        if (_this.file) {
                            _this.plugin.copyURI({
                                filepath: _this.file,
                                data: query,
                                mode: mode
                            });
                        }
                        else {
                            _this.plugin.copyURI({
                                daily: "true",
                                data: query,
                                mode: mode
                            });
                        }
                    }
                });
            }
        };
        for (var _i = 0, _a = this.modes; _i < _a.length; _i++) {
            var mode = _a[_i];
            _loop_1(mode);
        }
        return suggestions;
    };
    EnterDataModal.prototype.renderSuggestion = function (value, el) {
        el.innerText = value.display;
    };
    EnterDataModal.prototype.onChooseSuggestion = function (item, _) {
        item.func();
    };
    return EnterDataModal;
}(obsidian.SuggestModal));
var FileModal = /** @class */ (function (_super) {
    __extends(FileModal, _super);
    function FileModal(plugin, placeHolder, allowNoFile) {
        if (allowNoFile === void 0) { allowNoFile = true; }
        var _this = _super.call(this, plugin.app) || this;
        _this.placeHolder = placeHolder;
        _this.allowNoFile = allowNoFile;
        _this.plugin = plugin;
        _this.setPlaceholder(_this.placeHolder);
        return _this;
    }
    FileModal.prototype.getItems = function () {
        var specialItems = [];
        if (this.allowNoFile) {
            specialItems.push({ display: "<Don't specify a file>", source: undefined });
        }
        var file = this.app.workspace.getActiveFile();
        if (file) {
            specialItems.push({ display: "<Current file>", source: file.path });
        }
        return __spreadArray(__spreadArray([], specialItems), this.app.vault.getFiles().map(function (e) { return { display: e.path, source: e.path }; }));
    };
    FileModal.prototype.getItemText = function (item) {
        return item.display;
    };
    FileModal.prototype.onChooseItem = function (item, evt) {
    };
    return FileModal;
}(obsidian.FuzzySuggestModal));
var CommandModal = /** @class */ (function (_super) {
    __extends(CommandModal, _super);
    function CommandModal(plugin, file) {
        var _this = _super.call(this, plugin.app) || this;
        _this.plugin = plugin;
        _this.file = file;
        return _this;
    }
    CommandModal.prototype.getItems = function () {
        var rawCommands = this.app.commands.commands;
        var commands = Object.keys(rawCommands).map(function (e) {
            return { id: rawCommands[e].id, name: rawCommands[e].name };
        });
        return commands;
    };
    CommandModal.prototype.getItemText = function (item) {
        return item.name;
    };
    CommandModal.prototype.onChooseItem = function (item, _) {
        this.plugin.copyURI({
            filepath: this.file,
            commandid: item.id
        });
    };
    return CommandModal;
}(obsidian.FuzzySuggestModal));
var SearchModal = /** @class */ (function (_super) {
    __extends(SearchModal, _super);
    function SearchModal(plugin) {
        var _this = _super.call(this, plugin.app) || this;
        _this.plugin = plugin;
        _this.setPlaceholder("Searched text. RegEx is supported");
        return _this;
    }
    SearchModal.prototype.getSuggestions = function (query) {
        if (query === "") {
            query = "...";
        }
        var regex;
        try {
            regex = new RegExp(query);
        }
        catch (error) { }
        return [
            {
                source: query,
                isRegEx: false,
                display: query
            },
            {
                source: query,
                display: regex ? "As RegEx: " + query : "Can't parse RegEx",
                isRegEx: true
            }
        ];
    };
    SearchModal.prototype.renderSuggestion = function (value, el) {
        el.innerText = value.display;
    };
    SearchModal.prototype.onChooseSuggestion = function (item, _) {
    };
    return SearchModal;
}(obsidian.SuggestModal));
var ReplaceModal = /** @class */ (function (_super) {
    __extends(ReplaceModal, _super);
    function ReplaceModal(plugin, search, filepath) {
        var _this = _super.call(this, plugin.app) || this;
        _this.search = search;
        _this.filepath = filepath;
        _this.emptyText = "Empty text (replace with nothing)";
        _this.plugin = plugin;
        _this.setPlaceholder("Replacement text");
        return _this;
    }
    ReplaceModal.prototype.getSuggestions = function (query) {
        if (query === "") {
            query = this.emptyText;
        }
        return [query];
    };
    ReplaceModal.prototype.renderSuggestion = function (value, el) {
        el.innerText = value;
    };
    ReplaceModal.prototype.onChooseSuggestion = function (item, _) {
        if (this.search.isRegEx) {
            this.plugin.copyURI({
                filepath: this.filepath,
                searchregex: this.search.source,
                replace: item == this.emptyText ? "" : item
            });
        }
        else {
            this.plugin.copyURI({
                filepath: this.filepath,
                search: this.search.source,
                replace: item == this.emptyText ? "" : item
            });
        }
    };
    return ReplaceModal;
}(obsidian.SuggestModal));

module.exports = AdvancedURI;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm5vZGVfbW9kdWxlcy9vYnNpZGlhbi1kYWlseS1ub3Rlcy1pbnRlcmZhY2UvZGlzdC9tYWluLmpzIiwibm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCJub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwibm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92YWxpZGF0ZS5qcyIsIm5vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwibm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92NC5qcyIsInNyYy9kYWlseV9ub3RlX3V0aWxzLnRzIiwic3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20pIHtcclxuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGZyb20ubGVuZ3RoLCBqID0gdG8ubGVuZ3RoOyBpIDwgaWw7IGkrKywgaisrKVxyXG4gICAgICAgIHRvW2pdID0gZnJvbVtpXTtcclxuICAgIHJldHVybiB0bztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIGdldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIHNldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG52YXIgb2JzaWRpYW4gPSByZXF1aXJlKCdvYnNpZGlhbicpO1xuXG5jb25zdCBERUZBVUxUX0RBSUxZX05PVEVfRk9STUFUID0gXCJZWVlZLU1NLUREXCI7XG5jb25zdCBERUZBVUxUX1dFRUtMWV9OT1RFX0ZPUk1BVCA9IFwiZ2dnZy1bV113d1wiO1xuY29uc3QgREVGQVVMVF9NT05USExZX05PVEVfRk9STUFUID0gXCJZWVlZLU1NXCI7XG5jb25zdCBERUZBVUxUX1FVQVJURVJMWV9OT1RFX0ZPUk1BVCA9IFwiWVlZWS1bUV1RXCI7XG5jb25zdCBERUZBVUxUX1lFQVJMWV9OT1RFX0ZPUk1BVCA9IFwiWVlZWVwiO1xuXG5mdW5jdGlvbiBzaG91bGRVc2VQZXJpb2RpY05vdGVzU2V0dGluZ3MocGVyaW9kaWNpdHkpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIGNvbnN0IHBlcmlvZGljTm90ZXMgPSB3aW5kb3cuYXBwLnBsdWdpbnMuZ2V0UGx1Z2luKFwicGVyaW9kaWMtbm90ZXNcIik7XG4gICAgcmV0dXJuIHBlcmlvZGljTm90ZXMgJiYgcGVyaW9kaWNOb3Rlcy5zZXR0aW5ncz8uW3BlcmlvZGljaXR5XT8uZW5hYmxlZDtcbn1cbi8qKlxuICogUmVhZCB0aGUgdXNlciBzZXR0aW5ncyBmb3IgdGhlIGBkYWlseS1ub3Rlc2AgcGx1Z2luXG4gKiB0byBrZWVwIGJlaGF2aW9yIG9mIGNyZWF0aW5nIGEgbmV3IG5vdGUgaW4tc3luYy5cbiAqL1xuZnVuY3Rpb24gZ2V0RGFpbHlOb3RlU2V0dGluZ3MoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgY29uc3QgeyBpbnRlcm5hbFBsdWdpbnMsIHBsdWdpbnMgfSA9IHdpbmRvdy5hcHA7XG4gICAgICAgIGlmIChzaG91bGRVc2VQZXJpb2RpY05vdGVzU2V0dGluZ3MoXCJkYWlseVwiKSkge1xuICAgICAgICAgICAgY29uc3QgeyBmb3JtYXQsIGZvbGRlciwgdGVtcGxhdGUgfSA9IHBsdWdpbnMuZ2V0UGx1Z2luKFwicGVyaW9kaWMtbm90ZXNcIik/LnNldHRpbmdzPy5kYWlseSB8fCB7fTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZm9ybWF0OiBmb3JtYXQgfHwgREVGQVVMVF9EQUlMWV9OT1RFX0ZPUk1BVCxcbiAgICAgICAgICAgICAgICBmb2xkZXI6IGZvbGRlcj8udHJpbSgpIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IHRlbXBsYXRlPy50cmltKCkgfHwgXCJcIixcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBmb2xkZXIsIGZvcm1hdCwgdGVtcGxhdGUgfSA9IGludGVybmFsUGx1Z2lucy5nZXRQbHVnaW5CeUlkKFwiZGFpbHktbm90ZXNcIik/Lmluc3RhbmNlPy5vcHRpb25zIHx8IHt9O1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZm9ybWF0OiBmb3JtYXQgfHwgREVGQVVMVF9EQUlMWV9OT1RFX0ZPUk1BVCxcbiAgICAgICAgICAgIGZvbGRlcjogZm9sZGVyPy50cmltKCkgfHwgXCJcIixcbiAgICAgICAgICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZT8udHJpbSgpIHx8IFwiXCIsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5pbmZvKFwiTm8gY3VzdG9tIGRhaWx5IG5vdGUgc2V0dGluZ3MgZm91bmQhXCIsIGVycik7XG4gICAgfVxufVxuLyoqXG4gKiBSZWFkIHRoZSB1c2VyIHNldHRpbmdzIGZvciB0aGUgYHdlZWtseS1ub3Rlc2AgcGx1Z2luXG4gKiB0byBrZWVwIGJlaGF2aW9yIG9mIGNyZWF0aW5nIGEgbmV3IG5vdGUgaW4tc3luYy5cbiAqL1xuZnVuY3Rpb24gZ2V0V2Vla2x5Tm90ZVNldHRpbmdzKCkge1xuICAgIHRyeSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIGNvbnN0IHBsdWdpbk1hbmFnZXIgPSB3aW5kb3cuYXBwLnBsdWdpbnM7XG4gICAgICAgIGNvbnN0IGNhbGVuZGFyU2V0dGluZ3MgPSBwbHVnaW5NYW5hZ2VyLmdldFBsdWdpbihcImNhbGVuZGFyXCIpPy5vcHRpb25zO1xuICAgICAgICBjb25zdCBwZXJpb2RpY05vdGVzU2V0dGluZ3MgPSBwbHVnaW5NYW5hZ2VyLmdldFBsdWdpbihcInBlcmlvZGljLW5vdGVzXCIpPy5zZXR0aW5ncz8ud2Vla2x5O1xuICAgICAgICBpZiAoc2hvdWxkVXNlUGVyaW9kaWNOb3Rlc1NldHRpbmdzKFwid2Vla2x5XCIpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGZvcm1hdDogcGVyaW9kaWNOb3Rlc1NldHRpbmdzLmZvcm1hdCB8fCBERUZBVUxUX1dFRUtMWV9OT1RFX0ZPUk1BVCxcbiAgICAgICAgICAgICAgICBmb2xkZXI6IHBlcmlvZGljTm90ZXNTZXR0aW5ncy5mb2xkZXI/LnRyaW0oKSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBwZXJpb2RpY05vdGVzU2V0dGluZ3MudGVtcGxhdGU/LnRyaW0oKSB8fCBcIlwiLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZXR0aW5ncyA9IGNhbGVuZGFyU2V0dGluZ3MgfHwge307XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmb3JtYXQ6IHNldHRpbmdzLndlZWtseU5vdGVGb3JtYXQgfHwgREVGQVVMVF9XRUVLTFlfTk9URV9GT1JNQVQsXG4gICAgICAgICAgICBmb2xkZXI6IHNldHRpbmdzLndlZWtseU5vdGVGb2xkZXI/LnRyaW0oKSB8fCBcIlwiLFxuICAgICAgICAgICAgdGVtcGxhdGU6IHNldHRpbmdzLndlZWtseU5vdGVUZW1wbGF0ZT8udHJpbSgpIHx8IFwiXCIsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5pbmZvKFwiTm8gY3VzdG9tIHdlZWtseSBub3RlIHNldHRpbmdzIGZvdW5kIVwiLCBlcnIpO1xuICAgIH1cbn1cbi8qKlxuICogUmVhZCB0aGUgdXNlciBzZXR0aW5ncyBmb3IgdGhlIGBwZXJpb2RpYy1ub3Rlc2AgcGx1Z2luXG4gKiB0byBrZWVwIGJlaGF2aW9yIG9mIGNyZWF0aW5nIGEgbmV3IG5vdGUgaW4tc3luYy5cbiAqL1xuZnVuY3Rpb24gZ2V0TW9udGhseU5vdGVTZXR0aW5ncygpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIGNvbnN0IHBsdWdpbk1hbmFnZXIgPSB3aW5kb3cuYXBwLnBsdWdpbnM7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSAoc2hvdWxkVXNlUGVyaW9kaWNOb3Rlc1NldHRpbmdzKFwibW9udGhseVwiKSAmJlxuICAgICAgICAgICAgcGx1Z2luTWFuYWdlci5nZXRQbHVnaW4oXCJwZXJpb2RpYy1ub3Rlc1wiKT8uc2V0dGluZ3M/Lm1vbnRobHkpIHx8XG4gICAgICAgICAgICB7fTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZvcm1hdDogc2V0dGluZ3MuZm9ybWF0IHx8IERFRkFVTFRfTU9OVEhMWV9OT1RFX0ZPUk1BVCxcbiAgICAgICAgICAgIGZvbGRlcjogc2V0dGluZ3MuZm9sZGVyPy50cmltKCkgfHwgXCJcIixcbiAgICAgICAgICAgIHRlbXBsYXRlOiBzZXR0aW5ncy50ZW1wbGF0ZT8udHJpbSgpIHx8IFwiXCIsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5pbmZvKFwiTm8gY3VzdG9tIG1vbnRobHkgbm90ZSBzZXR0aW5ncyBmb3VuZCFcIiwgZXJyKTtcbiAgICB9XG59XG4vKipcbiAqIFJlYWQgdGhlIHVzZXIgc2V0dGluZ3MgZm9yIHRoZSBgcGVyaW9kaWMtbm90ZXNgIHBsdWdpblxuICogdG8ga2VlcCBiZWhhdmlvciBvZiBjcmVhdGluZyBhIG5ldyBub3RlIGluLXN5bmMuXG4gKi9cbmZ1bmN0aW9uIGdldFF1YXJ0ZXJseU5vdGVTZXR0aW5ncygpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIGNvbnN0IHBsdWdpbk1hbmFnZXIgPSB3aW5kb3cuYXBwLnBsdWdpbnM7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSAoc2hvdWxkVXNlUGVyaW9kaWNOb3Rlc1NldHRpbmdzKFwicXVhcnRlcmx5XCIpICYmXG4gICAgICAgICAgICBwbHVnaW5NYW5hZ2VyLmdldFBsdWdpbihcInBlcmlvZGljLW5vdGVzXCIpPy5zZXR0aW5ncz8ucXVhcnRlcmx5KSB8fFxuICAgICAgICAgICAge307XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmb3JtYXQ6IHNldHRpbmdzLmZvcm1hdCB8fCBERUZBVUxUX1FVQVJURVJMWV9OT1RFX0ZPUk1BVCxcbiAgICAgICAgICAgIGZvbGRlcjogc2V0dGluZ3MuZm9sZGVyPy50cmltKCkgfHwgXCJcIixcbiAgICAgICAgICAgIHRlbXBsYXRlOiBzZXR0aW5ncy50ZW1wbGF0ZT8udHJpbSgpIHx8IFwiXCIsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5pbmZvKFwiTm8gY3VzdG9tIHF1YXJ0ZXJseSBub3RlIHNldHRpbmdzIGZvdW5kIVwiLCBlcnIpO1xuICAgIH1cbn1cbi8qKlxuICogUmVhZCB0aGUgdXNlciBzZXR0aW5ncyBmb3IgdGhlIGBwZXJpb2RpYy1ub3Rlc2AgcGx1Z2luXG4gKiB0byBrZWVwIGJlaGF2aW9yIG9mIGNyZWF0aW5nIGEgbmV3IG5vdGUgaW4tc3luYy5cbiAqL1xuZnVuY3Rpb24gZ2V0WWVhcmx5Tm90ZVNldHRpbmdzKCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgY29uc3QgcGx1Z2luTWFuYWdlciA9IHdpbmRvdy5hcHAucGx1Z2lucztcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBzZXR0aW5ncyA9IChzaG91bGRVc2VQZXJpb2RpY05vdGVzU2V0dGluZ3MoXCJ5ZWFybHlcIikgJiZcbiAgICAgICAgICAgIHBsdWdpbk1hbmFnZXIuZ2V0UGx1Z2luKFwicGVyaW9kaWMtbm90ZXNcIik/LnNldHRpbmdzPy55ZWFybHkpIHx8XG4gICAgICAgICAgICB7fTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZvcm1hdDogc2V0dGluZ3MuZm9ybWF0IHx8IERFRkFVTFRfWUVBUkxZX05PVEVfRk9STUFULFxuICAgICAgICAgICAgZm9sZGVyOiBzZXR0aW5ncy5mb2xkZXI/LnRyaW0oKSB8fCBcIlwiLFxuICAgICAgICAgICAgdGVtcGxhdGU6IHNldHRpbmdzLnRlbXBsYXRlPy50cmltKCkgfHwgXCJcIixcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmluZm8oXCJObyBjdXN0b20geWVhcmx5IG5vdGUgc2V0dGluZ3MgZm91bmQhXCIsIGVycik7XG4gICAgfVxufVxuXG4vLyBDcmVkaXQ6IEBjcmVhdGlvbml4L3BhdGguanNcbmZ1bmN0aW9uIGpvaW4oLi4ucGFydFNlZ21lbnRzKSB7XG4gICAgLy8gU3BsaXQgdGhlIGlucHV0cyBpbnRvIGEgbGlzdCBvZiBwYXRoIGNvbW1hbmRzLlxuICAgIGxldCBwYXJ0cyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwLCBsID0gcGFydFNlZ21lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBwYXJ0cyA9IHBhcnRzLmNvbmNhdChwYXJ0U2VnbWVudHNbaV0uc3BsaXQoXCIvXCIpKTtcbiAgICB9XG4gICAgLy8gSW50ZXJwcmV0IHRoZSBwYXRoIGNvbW1hbmRzIHRvIGdldCB0aGUgbmV3IHJlc29sdmVkIHBhdGguXG4gICAgY29uc3QgbmV3UGFydHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHBhcnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBjb25zdCBwYXJ0ID0gcGFydHNbaV07XG4gICAgICAgIC8vIFJlbW92ZSBsZWFkaW5nIGFuZCB0cmFpbGluZyBzbGFzaGVzXG4gICAgICAgIC8vIEFsc28gcmVtb3ZlIFwiLlwiIHNlZ21lbnRzXG4gICAgICAgIGlmICghcGFydCB8fCBwYXJ0ID09PSBcIi5cIilcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAvLyBQdXNoIG5ldyBwYXRoIHNlZ21lbnRzLlxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBuZXdQYXJ0cy5wdXNoKHBhcnQpO1xuICAgIH1cbiAgICAvLyBQcmVzZXJ2ZSB0aGUgaW5pdGlhbCBzbGFzaCBpZiB0aGVyZSB3YXMgb25lLlxuICAgIGlmIChwYXJ0c1swXSA9PT0gXCJcIilcbiAgICAgICAgbmV3UGFydHMudW5zaGlmdChcIlwiKTtcbiAgICAvLyBUdXJuIGJhY2sgaW50byBhIHNpbmdsZSBzdHJpbmcgcGF0aC5cbiAgICByZXR1cm4gbmV3UGFydHMuam9pbihcIi9cIik7XG59XG5mdW5jdGlvbiBiYXNlbmFtZShmdWxsUGF0aCkge1xuICAgIGxldCBiYXNlID0gZnVsbFBhdGguc3Vic3RyaW5nKGZ1bGxQYXRoLmxhc3RJbmRleE9mKFwiL1wiKSArIDEpO1xuICAgIGlmIChiYXNlLmxhc3RJbmRleE9mKFwiLlwiKSAhPSAtMSlcbiAgICAgICAgYmFzZSA9IGJhc2Uuc3Vic3RyaW5nKDAsIGJhc2UubGFzdEluZGV4T2YoXCIuXCIpKTtcbiAgICByZXR1cm4gYmFzZTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGVuc3VyZUZvbGRlckV4aXN0cyhwYXRoKSB7XG4gICAgY29uc3QgZGlycyA9IHBhdGgucmVwbGFjZSgvXFxcXC9nLCBcIi9cIikuc3BsaXQoXCIvXCIpO1xuICAgIGRpcnMucG9wKCk7IC8vIHJlbW92ZSBiYXNlbmFtZVxuICAgIGlmIChkaXJzLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBkaXIgPSBqb2luKC4uLmRpcnMpO1xuICAgICAgICBpZiAoIXdpbmRvdy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKGRpcikpIHtcbiAgICAgICAgICAgIGF3YWl0IHdpbmRvdy5hcHAudmF1bHQuY3JlYXRlRm9sZGVyKGRpcik7XG4gICAgICAgIH1cbiAgICB9XG59XG5hc3luYyBmdW5jdGlvbiBnZXROb3RlUGF0aChkaXJlY3RvcnksIGZpbGVuYW1lKSB7XG4gICAgaWYgKCFmaWxlbmFtZS5lbmRzV2l0aChcIi5tZFwiKSkge1xuICAgICAgICBmaWxlbmFtZSArPSBcIi5tZFwiO1xuICAgIH1cbiAgICBjb25zdCBwYXRoID0gb2JzaWRpYW4ubm9ybWFsaXplUGF0aChqb2luKGRpcmVjdG9yeSwgZmlsZW5hbWUpKTtcbiAgICBhd2FpdCBlbnN1cmVGb2xkZXJFeGlzdHMocGF0aCk7XG4gICAgcmV0dXJuIHBhdGg7XG59XG5hc3luYyBmdW5jdGlvbiBnZXRUZW1wbGF0ZUluZm8odGVtcGxhdGUpIHtcbiAgICBjb25zdCB7IG1ldGFkYXRhQ2FjaGUsIHZhdWx0IH0gPSB3aW5kb3cuYXBwO1xuICAgIGNvbnN0IHRlbXBsYXRlUGF0aCA9IG9ic2lkaWFuLm5vcm1hbGl6ZVBhdGgodGVtcGxhdGUpO1xuICAgIGlmICh0ZW1wbGF0ZVBhdGggPT09IFwiL1wiKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoW1wiXCIsIG51bGxdKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdGVtcGxhdGVGaWxlID0gbWV0YWRhdGFDYWNoZS5nZXRGaXJzdExpbmtwYXRoRGVzdCh0ZW1wbGF0ZVBhdGgsIFwiXCIpO1xuICAgICAgICBjb25zdCBjb250ZW50cyA9IGF3YWl0IHZhdWx0LmNhY2hlZFJlYWQodGVtcGxhdGVGaWxlKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgY29uc3QgSUZvbGRJbmZvID0gd2luZG93LmFwcC5mb2xkTWFuYWdlci5sb2FkKHRlbXBsYXRlRmlsZSk7XG4gICAgICAgIHJldHVybiBbY29udGVudHMsIElGb2xkSW5mb107XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHJlYWQgdGhlIGRhaWx5IG5vdGUgdGVtcGxhdGUgJyR7dGVtcGxhdGVQYXRofSdgLCBlcnIpO1xuICAgICAgICBuZXcgb2JzaWRpYW4uTm90aWNlKFwiRmFpbGVkIHRvIHJlYWQgdGhlIGRhaWx5IG5vdGUgdGVtcGxhdGVcIik7XG4gICAgICAgIHJldHVybiBbXCJcIiwgbnVsbF07XG4gICAgfVxufVxuXG4vKipcbiAqIGRhdGVVSUQgaXMgYSB3YXkgb2Ygd2Vla2x5IGlkZW50aWZ5aW5nIGRhaWx5L3dlZWtseS9tb250aGx5IG5vdGVzLlxuICogVGhleSBhcmUgcHJlZml4ZWQgd2l0aCB0aGUgZ3JhbnVsYXJpdHkgdG8gYXZvaWQgYW1iaWd1aXR5LlxuICovXG5mdW5jdGlvbiBnZXREYXRlVUlEKGRhdGUsIGdyYW51bGFyaXR5ID0gXCJkYXlcIikge1xuICAgIGNvbnN0IHRzID0gZGF0ZS5jbG9uZSgpLnN0YXJ0T2YoZ3JhbnVsYXJpdHkpLmZvcm1hdCgpO1xuICAgIHJldHVybiBgJHtncmFudWxhcml0eX0tJHt0c31gO1xufVxuZnVuY3Rpb24gcmVtb3ZlRXNjYXBlZENoYXJhY3RlcnMoZm9ybWF0KSB7XG4gICAgcmV0dXJuIGZvcm1hdC5yZXBsYWNlKC9cXFtbXlxcXV0qXFxdL2csIFwiXCIpOyAvLyByZW1vdmUgZXZlcnl0aGluZyB3aXRoaW4gYnJhY2tldHNcbn1cbi8qKlxuICogWFhYOiBXaGVuIHBhcnNpbmcgZGF0ZXMgdGhhdCBjb250YWluIGJvdGggd2VlayBudW1iZXJzIGFuZCBtb250aHMsXG4gKiBNb21lbnQgY2hvc2VzIHRvIGlnbm9yZSB0aGUgd2VlayBudW1iZXJzLiBGb3IgdGhlIHdlZWsgZGF0ZVVJRCwgd2VcbiAqIHdhbnQgdGhlIG9wcG9zaXRlIGJlaGF2aW9yLiBTdHJpcCB0aGUgTU1NIGZyb20gdGhlIGZvcm1hdCB0byBwYXRjaC5cbiAqL1xuZnVuY3Rpb24gaXNGb3JtYXRBbWJpZ3VvdXMoZm9ybWF0LCBncmFudWxhcml0eSkge1xuICAgIGlmIChncmFudWxhcml0eSA9PT0gXCJ3ZWVrXCIpIHtcbiAgICAgICAgY29uc3QgY2xlYW5Gb3JtYXQgPSByZW1vdmVFc2NhcGVkQ2hhcmFjdGVycyhmb3JtYXQpO1xuICAgICAgICByZXR1cm4gKC93ezEsMn0vaS50ZXN0KGNsZWFuRm9ybWF0KSAmJlxuICAgICAgICAgICAgKC9NezEsNH0vLnRlc3QoY2xlYW5Gb3JtYXQpIHx8IC9EezEsNH0vLnRlc3QoY2xlYW5Gb3JtYXQpKSk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGdldERhdGVGcm9tRmlsZShmaWxlLCBncmFudWxhcml0eSkge1xuICAgIHJldHVybiBnZXREYXRlRnJvbUZpbGVuYW1lKGZpbGUuYmFzZW5hbWUsIGdyYW51bGFyaXR5KTtcbn1cbmZ1bmN0aW9uIGdldERhdGVGcm9tUGF0aChwYXRoLCBncmFudWxhcml0eSkge1xuICAgIHJldHVybiBnZXREYXRlRnJvbUZpbGVuYW1lKGJhc2VuYW1lKHBhdGgpLCBncmFudWxhcml0eSk7XG59XG5mdW5jdGlvbiBnZXREYXRlRnJvbUZpbGVuYW1lKGZpbGVuYW1lLCBncmFudWxhcml0eSkge1xuICAgIGNvbnN0IGdldFNldHRpbmdzID0ge1xuICAgICAgICBkYXk6IGdldERhaWx5Tm90ZVNldHRpbmdzLFxuICAgICAgICB3ZWVrOiBnZXRXZWVrbHlOb3RlU2V0dGluZ3MsXG4gICAgICAgIG1vbnRoOiBnZXRNb250aGx5Tm90ZVNldHRpbmdzLFxuICAgICAgICBxdWFydGVyOiBnZXRRdWFydGVybHlOb3RlU2V0dGluZ3MsXG4gICAgICAgIHllYXI6IGdldFllYXJseU5vdGVTZXR0aW5ncyxcbiAgICB9O1xuICAgIGNvbnN0IGZvcm1hdCA9IGdldFNldHRpbmdzW2dyYW51bGFyaXR5XSgpLmZvcm1hdC5zcGxpdChcIi9cIikucG9wKCk7XG4gICAgY29uc3Qgbm90ZURhdGUgPSB3aW5kb3cubW9tZW50KGZpbGVuYW1lLCBmb3JtYXQsIHRydWUpO1xuICAgIGlmICghbm90ZURhdGUuaXNWYWxpZCgpKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAoaXNGb3JtYXRBbWJpZ3VvdXMoZm9ybWF0LCBncmFudWxhcml0eSkpIHtcbiAgICAgICAgaWYgKGdyYW51bGFyaXR5ID09PSBcIndlZWtcIikge1xuICAgICAgICAgICAgY29uc3QgY2xlYW5Gb3JtYXQgPSByZW1vdmVFc2NhcGVkQ2hhcmFjdGVycyhmb3JtYXQpO1xuICAgICAgICAgICAgaWYgKC93ezEsMn0vaS50ZXN0KGNsZWFuRm9ybWF0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cubW9tZW50KGZpbGVuYW1lLCBcbiAgICAgICAgICAgICAgICAvLyBJZiBmb3JtYXQgY29udGFpbnMgd2VlaywgcmVtb3ZlIGRheSAmIG1vbnRoIGZvcm1hdHRpbmdcbiAgICAgICAgICAgICAgICBmb3JtYXQucmVwbGFjZSgvTXsxLDR9L2csIFwiXCIpLnJlcGxhY2UoL0R7MSw0fS9nLCBcIlwiKSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub3RlRGF0ZTtcbn1cblxuY2xhc3MgRGFpbHlOb3Rlc0ZvbGRlck1pc3NpbmdFcnJvciBleHRlbmRzIEVycm9yIHtcbn1cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBtaW1pY3MgdGhlIGJlaGF2aW9yIG9mIHRoZSBkYWlseS1ub3RlcyBwbHVnaW5cbiAqIHNvIGl0IHdpbGwgcmVwbGFjZSB7e2RhdGV9fSwge3t0aXRsZX19LCBhbmQge3t0aW1lfX0gd2l0aCB0aGVcbiAqIGZvcm1hdHRlZCB0aW1lc3RhbXAuXG4gKlxuICogTm90ZTogaXQgaGFzIGFuIGFkZGVkIGJvbnVzIHRoYXQgaXQncyBub3QgJ3RvZGF5JyBzcGVjaWZpYy5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gY3JlYXRlRGFpbHlOb3RlKGRhdGUpIHtcbiAgICBjb25zdCBhcHAgPSB3aW5kb3cuYXBwO1xuICAgIGNvbnN0IHsgdmF1bHQgfSA9IGFwcDtcbiAgICBjb25zdCBtb21lbnQgPSB3aW5kb3cubW9tZW50O1xuICAgIGNvbnN0IHsgdGVtcGxhdGUsIGZvcm1hdCwgZm9sZGVyIH0gPSBnZXREYWlseU5vdGVTZXR0aW5ncygpO1xuICAgIGNvbnN0IFt0ZW1wbGF0ZUNvbnRlbnRzLCBJRm9sZEluZm9dID0gYXdhaXQgZ2V0VGVtcGxhdGVJbmZvKHRlbXBsYXRlKTtcbiAgICBjb25zdCBmaWxlbmFtZSA9IGRhdGUuZm9ybWF0KGZvcm1hdCk7XG4gICAgY29uc3Qgbm9ybWFsaXplZFBhdGggPSBhd2FpdCBnZXROb3RlUGF0aChmb2xkZXIsIGZpbGVuYW1lKTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjcmVhdGVkRmlsZSA9IGF3YWl0IHZhdWx0LmNyZWF0ZShub3JtYWxpemVkUGF0aCwgdGVtcGxhdGVDb250ZW50c1xuICAgICAgICAgICAgLnJlcGxhY2UoL3t7XFxzKmRhdGVcXHMqfX0vZ2ksIGZpbGVuYW1lKVxuICAgICAgICAgICAgLnJlcGxhY2UoL3t7XFxzKnRpbWVcXHMqfX0vZ2ksIG1vbWVudCgpLmZvcm1hdChcIkhIOm1tXCIpKVxuICAgICAgICAgICAgLnJlcGxhY2UoL3t7XFxzKnRpdGxlXFxzKn19L2dpLCBmaWxlbmFtZSlcbiAgICAgICAgICAgIC5yZXBsYWNlKC97e1xccyooZGF0ZXx0aW1lKVxccyooKFsrLV1cXGQrKShbeXFtd2Roc10pKT9cXHMqKDouKz8pP319L2dpLCAoXywgX3RpbWVPckRhdGUsIGNhbGMsIHRpbWVEZWx0YSwgdW5pdCwgbW9tZW50Rm9ybWF0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBub3cgPSBtb21lbnQoKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gZGF0ZS5jbG9uZSgpLnNldCh7XG4gICAgICAgICAgICAgICAgaG91cjogbm93LmdldChcImhvdXJcIiksXG4gICAgICAgICAgICAgICAgbWludXRlOiBub3cuZ2V0KFwibWludXRlXCIpLFxuICAgICAgICAgICAgICAgIHNlY29uZDogbm93LmdldChcInNlY29uZFwiKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGNhbGMpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50RGF0ZS5hZGQocGFyc2VJbnQodGltZURlbHRhLCAxMCksIHVuaXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1vbWVudEZvcm1hdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50RGF0ZS5mb3JtYXQobW9tZW50Rm9ybWF0LnN1YnN0cmluZygxKS50cmltKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnREYXRlLmZvcm1hdChmb3JtYXQpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLnJlcGxhY2UoL3t7XFxzKnllc3RlcmRheVxccyp9fS9naSwgZGF0ZS5jbG9uZSgpLnN1YnRyYWN0KDEsIFwiZGF5XCIpLmZvcm1hdChmb3JtYXQpKVxuICAgICAgICAgICAgLnJlcGxhY2UoL3t7XFxzKnRvbW9ycm93XFxzKn19L2dpLCBkYXRlLmNsb25lKCkuYWRkKDEsIFwiZFwiKS5mb3JtYXQoZm9ybWF0KSkpO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICBhcHAuZm9sZE1hbmFnZXIuc2F2ZShjcmVhdGVkRmlsZSwgSUZvbGRJbmZvKTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZWRGaWxlO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEZhaWxlZCB0byBjcmVhdGUgZmlsZTogJyR7bm9ybWFsaXplZFBhdGh9J2AsIGVycik7XG4gICAgICAgIG5ldyBvYnNpZGlhbi5Ob3RpY2UoXCJVbmFibGUgdG8gY3JlYXRlIG5ldyBmaWxlLlwiKTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXREYWlseU5vdGUoZGF0ZSwgZGFpbHlOb3Rlcykge1xuICAgIHJldHVybiBkYWlseU5vdGVzW2dldERhdGVVSUQoZGF0ZSwgXCJkYXlcIildID8/IG51bGw7XG59XG5mdW5jdGlvbiBnZXRBbGxEYWlseU5vdGVzKCkge1xuICAgIC8qKlxuICAgICAqIEZpbmQgYWxsIGRhaWx5IG5vdGVzIGluIHRoZSBkYWlseSBub3RlIGZvbGRlclxuICAgICAqL1xuICAgIGNvbnN0IHsgdmF1bHQgfSA9IHdpbmRvdy5hcHA7XG4gICAgY29uc3QgeyBmb2xkZXIgfSA9IGdldERhaWx5Tm90ZVNldHRpbmdzKCk7XG4gICAgY29uc3QgZGFpbHlOb3Rlc0ZvbGRlciA9IHZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChvYnNpZGlhbi5ub3JtYWxpemVQYXRoKGZvbGRlcikpO1xuICAgIGlmICghZGFpbHlOb3Rlc0ZvbGRlcikge1xuICAgICAgICB0aHJvdyBuZXcgRGFpbHlOb3Rlc0ZvbGRlck1pc3NpbmdFcnJvcihcIkZhaWxlZCB0byBmaW5kIGRhaWx5IG5vdGVzIGZvbGRlclwiKTtcbiAgICB9XG4gICAgY29uc3QgZGFpbHlOb3RlcyA9IHt9O1xuICAgIG9ic2lkaWFuLlZhdWx0LnJlY3Vyc2VDaGlsZHJlbihkYWlseU5vdGVzRm9sZGVyLCAobm90ZSkgPT4ge1xuICAgICAgICBpZiAobm90ZSBpbnN0YW5jZW9mIG9ic2lkaWFuLlRGaWxlKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlID0gZ2V0RGF0ZUZyb21GaWxlKG5vdGUsIFwiZGF5XCIpO1xuICAgICAgICAgICAgaWYgKGRhdGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlU3RyaW5nID0gZ2V0RGF0ZVVJRChkYXRlLCBcImRheVwiKTtcbiAgICAgICAgICAgICAgICBkYWlseU5vdGVzW2RhdGVTdHJpbmddID0gbm90ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBkYWlseU5vdGVzO1xufVxuXG5jbGFzcyBXZWVrbHlOb3Rlc0ZvbGRlck1pc3NpbmdFcnJvciBleHRlbmRzIEVycm9yIHtcbn1cbmZ1bmN0aW9uIGdldERheXNPZldlZWsoKSB7XG4gICAgY29uc3QgeyBtb21lbnQgfSA9IHdpbmRvdztcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIGxldCB3ZWVrU3RhcnQgPSBtb21lbnQubG9jYWxlRGF0YSgpLl93ZWVrLmRvdztcbiAgICBjb25zdCBkYXlzT2ZXZWVrID0gW1xuICAgICAgICBcInN1bmRheVwiLFxuICAgICAgICBcIm1vbmRheVwiLFxuICAgICAgICBcInR1ZXNkYXlcIixcbiAgICAgICAgXCJ3ZWRuZXNkYXlcIixcbiAgICAgICAgXCJ0aHVyc2RheVwiLFxuICAgICAgICBcImZyaWRheVwiLFxuICAgICAgICBcInNhdHVyZGF5XCIsXG4gICAgXTtcbiAgICB3aGlsZSAod2Vla1N0YXJ0KSB7XG4gICAgICAgIGRheXNPZldlZWsucHVzaChkYXlzT2ZXZWVrLnNoaWZ0KCkpO1xuICAgICAgICB3ZWVrU3RhcnQtLTtcbiAgICB9XG4gICAgcmV0dXJuIGRheXNPZldlZWs7XG59XG5mdW5jdGlvbiBnZXREYXlPZldlZWtOdW1lcmljYWxWYWx1ZShkYXlPZldlZWtOYW1lKSB7XG4gICAgcmV0dXJuIGdldERheXNPZldlZWsoKS5pbmRleE9mKGRheU9mV2Vla05hbWUudG9Mb3dlckNhc2UoKSk7XG59XG5hc3luYyBmdW5jdGlvbiBjcmVhdGVXZWVrbHlOb3RlKGRhdGUpIHtcbiAgICBjb25zdCB7IHZhdWx0IH0gPSB3aW5kb3cuYXBwO1xuICAgIGNvbnN0IHsgdGVtcGxhdGUsIGZvcm1hdCwgZm9sZGVyIH0gPSBnZXRXZWVrbHlOb3RlU2V0dGluZ3MoKTtcbiAgICBjb25zdCBbdGVtcGxhdGVDb250ZW50cywgSUZvbGRJbmZvXSA9IGF3YWl0IGdldFRlbXBsYXRlSW5mbyh0ZW1wbGF0ZSk7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBkYXRlLmZvcm1hdChmb3JtYXQpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRQYXRoID0gYXdhaXQgZ2V0Tm90ZVBhdGgoZm9sZGVyLCBmaWxlbmFtZSk7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY3JlYXRlZEZpbGUgPSBhd2FpdCB2YXVsdC5jcmVhdGUobm9ybWFsaXplZFBhdGgsIHRlbXBsYXRlQ29udGVudHNcbiAgICAgICAgICAgIC5yZXBsYWNlKC97e1xccyooZGF0ZXx0aW1lKVxccyooKFsrLV1cXGQrKShbeXFtd2Roc10pKT9cXHMqKDouKz8pP319L2dpLCAoXywgX3RpbWVPckRhdGUsIGNhbGMsIHRpbWVEZWx0YSwgdW5pdCwgbW9tZW50Rm9ybWF0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBub3cgPSB3aW5kb3cubW9tZW50KCk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50RGF0ZSA9IGRhdGUuY2xvbmUoKS5zZXQoe1xuICAgICAgICAgICAgICAgIGhvdXI6IG5vdy5nZXQoXCJob3VyXCIpLFxuICAgICAgICAgICAgICAgIG1pbnV0ZTogbm93LmdldChcIm1pbnV0ZVwiKSxcbiAgICAgICAgICAgICAgICBzZWNvbmQ6IG5vdy5nZXQoXCJzZWNvbmRcIiksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChjYWxjKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudERhdGUuYWRkKHBhcnNlSW50KHRpbWVEZWx0YSwgMTApLCB1bml0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtb21lbnRGb3JtYXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudERhdGUuZm9ybWF0KG1vbWVudEZvcm1hdC5zdWJzdHJpbmcoMSkudHJpbSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50RGF0ZS5mb3JtYXQoZm9ybWF0KTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5yZXBsYWNlKC97e1xccyp0aXRsZVxccyp9fS9naSwgZmlsZW5hbWUpXG4gICAgICAgICAgICAucmVwbGFjZSgve3tcXHMqdGltZVxccyp9fS9naSwgd2luZG93Lm1vbWVudCgpLmZvcm1hdChcIkhIOm1tXCIpKVxuICAgICAgICAgICAgLnJlcGxhY2UoL3t7XFxzKihzdW5kYXl8bW9uZGF5fHR1ZXNkYXl8d2VkbmVzZGF5fHRodXJzZGF5fGZyaWRheXxzYXR1cmRheSlcXHMqOiguKj8pfX0vZ2ksIChfLCBkYXlPZldlZWssIG1vbWVudEZvcm1hdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGF5ID0gZ2V0RGF5T2ZXZWVrTnVtZXJpY2FsVmFsdWUoZGF5T2ZXZWVrKTtcbiAgICAgICAgICAgIHJldHVybiBkYXRlLndlZWtkYXkoZGF5KS5mb3JtYXQobW9tZW50Rm9ybWF0LnRyaW0oKSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgd2luZG93LmFwcC5mb2xkTWFuYWdlci5zYXZlKGNyZWF0ZWRGaWxlLCBJRm9sZEluZm8pO1xuICAgICAgICByZXR1cm4gY3JlYXRlZEZpbGU7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIGNyZWF0ZSBmaWxlOiAnJHtub3JtYWxpemVkUGF0aH0nYCwgZXJyKTtcbiAgICAgICAgbmV3IG9ic2lkaWFuLk5vdGljZShcIlVuYWJsZSB0byBjcmVhdGUgbmV3IGZpbGUuXCIpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldFdlZWtseU5vdGUoZGF0ZSwgd2Vla2x5Tm90ZXMpIHtcbiAgICByZXR1cm4gd2Vla2x5Tm90ZXNbZ2V0RGF0ZVVJRChkYXRlLCBcIndlZWtcIildID8/IG51bGw7XG59XG5mdW5jdGlvbiBnZXRBbGxXZWVrbHlOb3RlcygpIHtcbiAgICBjb25zdCB3ZWVrbHlOb3RlcyA9IHt9O1xuICAgIGlmICghYXBwSGFzV2Vla2x5Tm90ZXNQbHVnaW5Mb2FkZWQoKSkge1xuICAgICAgICByZXR1cm4gd2Vla2x5Tm90ZXM7XG4gICAgfVxuICAgIGNvbnN0IHsgdmF1bHQgfSA9IHdpbmRvdy5hcHA7XG4gICAgY29uc3QgeyBmb2xkZXIgfSA9IGdldFdlZWtseU5vdGVTZXR0aW5ncygpO1xuICAgIGNvbnN0IHdlZWtseU5vdGVzRm9sZGVyID0gdmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKG9ic2lkaWFuLm5vcm1hbGl6ZVBhdGgoZm9sZGVyKSk7XG4gICAgaWYgKCF3ZWVrbHlOb3Rlc0ZvbGRlcikge1xuICAgICAgICB0aHJvdyBuZXcgV2Vla2x5Tm90ZXNGb2xkZXJNaXNzaW5nRXJyb3IoXCJGYWlsZWQgdG8gZmluZCB3ZWVrbHkgbm90ZXMgZm9sZGVyXCIpO1xuICAgIH1cbiAgICBvYnNpZGlhbi5WYXVsdC5yZWN1cnNlQ2hpbGRyZW4od2Vla2x5Tm90ZXNGb2xkZXIsIChub3RlKSA9PiB7XG4gICAgICAgIGlmIChub3RlIGluc3RhbmNlb2Ygb2JzaWRpYW4uVEZpbGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBnZXREYXRlRnJvbUZpbGUobm90ZSwgXCJ3ZWVrXCIpO1xuICAgICAgICAgICAgaWYgKGRhdGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlU3RyaW5nID0gZ2V0RGF0ZVVJRChkYXRlLCBcIndlZWtcIik7XG4gICAgICAgICAgICAgICAgd2Vla2x5Tm90ZXNbZGF0ZVN0cmluZ10gPSBub3RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHdlZWtseU5vdGVzO1xufVxuXG5jbGFzcyBNb250aGx5Tm90ZXNGb2xkZXJNaXNzaW5nRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG59XG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gbWltaWNzIHRoZSBiZWhhdmlvciBvZiB0aGUgZGFpbHktbm90ZXMgcGx1Z2luXG4gKiBzbyBpdCB3aWxsIHJlcGxhY2Uge3tkYXRlfX0sIHt7dGl0bGV9fSwgYW5kIHt7dGltZX19IHdpdGggdGhlXG4gKiBmb3JtYXR0ZWQgdGltZXN0YW1wLlxuICpcbiAqIE5vdGU6IGl0IGhhcyBhbiBhZGRlZCBib251cyB0aGF0IGl0J3Mgbm90ICd0b2RheScgc3BlY2lmaWMuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZU1vbnRobHlOb3RlKGRhdGUpIHtcbiAgICBjb25zdCB7IHZhdWx0IH0gPSB3aW5kb3cuYXBwO1xuICAgIGNvbnN0IHsgdGVtcGxhdGUsIGZvcm1hdCwgZm9sZGVyIH0gPSBnZXRNb250aGx5Tm90ZVNldHRpbmdzKCk7XG4gICAgY29uc3QgW3RlbXBsYXRlQ29udGVudHMsIElGb2xkSW5mb10gPSBhd2FpdCBnZXRUZW1wbGF0ZUluZm8odGVtcGxhdGUpO1xuICAgIGNvbnN0IGZpbGVuYW1lID0gZGF0ZS5mb3JtYXQoZm9ybWF0KTtcbiAgICBjb25zdCBub3JtYWxpemVkUGF0aCA9IGF3YWl0IGdldE5vdGVQYXRoKGZvbGRlciwgZmlsZW5hbWUpO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNyZWF0ZWRGaWxlID0gYXdhaXQgdmF1bHQuY3JlYXRlKG5vcm1hbGl6ZWRQYXRoLCB0ZW1wbGF0ZUNvbnRlbnRzXG4gICAgICAgICAgICAucmVwbGFjZSgve3tcXHMqKGRhdGV8dGltZSlcXHMqKChbKy1dXFxkKykoW3lxbXdkaHNdKSk/XFxzKig6Lis/KT99fS9naSwgKF8sIF90aW1lT3JEYXRlLCBjYWxjLCB0aW1lRGVsdGEsIHVuaXQsIG1vbWVudEZvcm1hdCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgbm93ID0gd2luZG93Lm1vbWVudCgpO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudERhdGUgPSBkYXRlLmNsb25lKCkuc2V0KHtcbiAgICAgICAgICAgICAgICBob3VyOiBub3cuZ2V0KFwiaG91clwiKSxcbiAgICAgICAgICAgICAgICBtaW51dGU6IG5vdy5nZXQoXCJtaW51dGVcIiksXG4gICAgICAgICAgICAgICAgc2Vjb25kOiBub3cuZ2V0KFwic2Vjb25kXCIpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoY2FsYykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnREYXRlLmFkZChwYXJzZUludCh0aW1lRGVsdGEsIDEwKSwgdW5pdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobW9tZW50Rm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnREYXRlLmZvcm1hdChtb21lbnRGb3JtYXQuc3Vic3RyaW5nKDEpLnRyaW0oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudERhdGUuZm9ybWF0KGZvcm1hdCk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAucmVwbGFjZSgve3tcXHMqZGF0ZVxccyp9fS9naSwgZmlsZW5hbWUpXG4gICAgICAgICAgICAucmVwbGFjZSgve3tcXHMqdGltZVxccyp9fS9naSwgd2luZG93Lm1vbWVudCgpLmZvcm1hdChcIkhIOm1tXCIpKVxuICAgICAgICAgICAgLnJlcGxhY2UoL3t7XFxzKnRpdGxlXFxzKn19L2dpLCBmaWxlbmFtZSkpO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICB3aW5kb3cuYXBwLmZvbGRNYW5hZ2VyLnNhdmUoY3JlYXRlZEZpbGUsIElGb2xkSW5mbyk7XG4gICAgICAgIHJldHVybiBjcmVhdGVkRmlsZTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gY3JlYXRlIGZpbGU6ICcke25vcm1hbGl6ZWRQYXRofSdgLCBlcnIpO1xuICAgICAgICBuZXcgb2JzaWRpYW4uTm90aWNlKFwiVW5hYmxlIHRvIGNyZWF0ZSBuZXcgZmlsZS5cIik7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0TW9udGhseU5vdGUoZGF0ZSwgbW9udGhseU5vdGVzKSB7XG4gICAgcmV0dXJuIG1vbnRobHlOb3Rlc1tnZXREYXRlVUlEKGRhdGUsIFwibW9udGhcIildID8/IG51bGw7XG59XG5mdW5jdGlvbiBnZXRBbGxNb250aGx5Tm90ZXMoKSB7XG4gICAgY29uc3QgbW9udGhseU5vdGVzID0ge307XG4gICAgaWYgKCFhcHBIYXNNb250aGx5Tm90ZXNQbHVnaW5Mb2FkZWQoKSkge1xuICAgICAgICByZXR1cm4gbW9udGhseU5vdGVzO1xuICAgIH1cbiAgICBjb25zdCB7IHZhdWx0IH0gPSB3aW5kb3cuYXBwO1xuICAgIGNvbnN0IHsgZm9sZGVyIH0gPSBnZXRNb250aGx5Tm90ZVNldHRpbmdzKCk7XG4gICAgY29uc3QgbW9udGhseU5vdGVzRm9sZGVyID0gdmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKG9ic2lkaWFuLm5vcm1hbGl6ZVBhdGgoZm9sZGVyKSk7XG4gICAgaWYgKCFtb250aGx5Tm90ZXNGb2xkZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1vbnRobHlOb3Rlc0ZvbGRlck1pc3NpbmdFcnJvcihcIkZhaWxlZCB0byBmaW5kIG1vbnRobHkgbm90ZXMgZm9sZGVyXCIpO1xuICAgIH1cbiAgICBvYnNpZGlhbi5WYXVsdC5yZWN1cnNlQ2hpbGRyZW4obW9udGhseU5vdGVzRm9sZGVyLCAobm90ZSkgPT4ge1xuICAgICAgICBpZiAobm90ZSBpbnN0YW5jZW9mIG9ic2lkaWFuLlRGaWxlKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlID0gZ2V0RGF0ZUZyb21GaWxlKG5vdGUsIFwibW9udGhcIik7XG4gICAgICAgICAgICBpZiAoZGF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSBnZXREYXRlVUlEKGRhdGUsIFwibW9udGhcIik7XG4gICAgICAgICAgICAgICAgbW9udGhseU5vdGVzW2RhdGVTdHJpbmddID0gbm90ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBtb250aGx5Tm90ZXM7XG59XG5cbmNsYXNzIFF1YXJ0ZXJseU5vdGVzRm9sZGVyTWlzc2luZ0Vycm9yIGV4dGVuZHMgRXJyb3Ige1xufVxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIG1pbWljcyB0aGUgYmVoYXZpb3Igb2YgdGhlIGRhaWx5LW5vdGVzIHBsdWdpblxuICogc28gaXQgd2lsbCByZXBsYWNlIHt7ZGF0ZX19LCB7e3RpdGxlfX0sIGFuZCB7e3RpbWV9fSB3aXRoIHRoZVxuICogZm9ybWF0dGVkIHRpbWVzdGFtcC5cbiAqXG4gKiBOb3RlOiBpdCBoYXMgYW4gYWRkZWQgYm9udXMgdGhhdCBpdCdzIG5vdCAndG9kYXknIHNwZWNpZmljLlxuICovXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVRdWFydGVybHlOb3RlKGRhdGUpIHtcbiAgICBjb25zdCB7IHZhdWx0IH0gPSB3aW5kb3cuYXBwO1xuICAgIGNvbnN0IHsgdGVtcGxhdGUsIGZvcm1hdCwgZm9sZGVyIH0gPSBnZXRRdWFydGVybHlOb3RlU2V0dGluZ3MoKTtcbiAgICBjb25zdCBbdGVtcGxhdGVDb250ZW50cywgSUZvbGRJbmZvXSA9IGF3YWl0IGdldFRlbXBsYXRlSW5mbyh0ZW1wbGF0ZSk7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBkYXRlLmZvcm1hdChmb3JtYXQpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRQYXRoID0gYXdhaXQgZ2V0Tm90ZVBhdGgoZm9sZGVyLCBmaWxlbmFtZSk7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY3JlYXRlZEZpbGUgPSBhd2FpdCB2YXVsdC5jcmVhdGUobm9ybWFsaXplZFBhdGgsIHRlbXBsYXRlQ29udGVudHNcbiAgICAgICAgICAgIC5yZXBsYWNlKC97e1xccyooZGF0ZXx0aW1lKVxccyooKFsrLV1cXGQrKShbeXFtd2Roc10pKT9cXHMqKDouKz8pP319L2dpLCAoXywgX3RpbWVPckRhdGUsIGNhbGMsIHRpbWVEZWx0YSwgdW5pdCwgbW9tZW50Rm9ybWF0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBub3cgPSB3aW5kb3cubW9tZW50KCk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50RGF0ZSA9IGRhdGUuY2xvbmUoKS5zZXQoe1xuICAgICAgICAgICAgICAgIGhvdXI6IG5vdy5nZXQoXCJob3VyXCIpLFxuICAgICAgICAgICAgICAgIG1pbnV0ZTogbm93LmdldChcIm1pbnV0ZVwiKSxcbiAgICAgICAgICAgICAgICBzZWNvbmQ6IG5vdy5nZXQoXCJzZWNvbmRcIiksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChjYWxjKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudERhdGUuYWRkKHBhcnNlSW50KHRpbWVEZWx0YSwgMTApLCB1bml0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtb21lbnRGb3JtYXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudERhdGUuZm9ybWF0KG1vbWVudEZvcm1hdC5zdWJzdHJpbmcoMSkudHJpbSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50RGF0ZS5mb3JtYXQoZm9ybWF0KTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5yZXBsYWNlKC97e1xccypkYXRlXFxzKn19L2dpLCBmaWxlbmFtZSlcbiAgICAgICAgICAgIC5yZXBsYWNlKC97e1xccyp0aW1lXFxzKn19L2dpLCB3aW5kb3cubW9tZW50KCkuZm9ybWF0KFwiSEg6bW1cIikpXG4gICAgICAgICAgICAucmVwbGFjZSgve3tcXHMqdGl0bGVcXHMqfX0vZ2ksIGZpbGVuYW1lKSk7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIHdpbmRvdy5hcHAuZm9sZE1hbmFnZXIuc2F2ZShjcmVhdGVkRmlsZSwgSUZvbGRJbmZvKTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZWRGaWxlO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEZhaWxlZCB0byBjcmVhdGUgZmlsZTogJyR7bm9ybWFsaXplZFBhdGh9J2AsIGVycik7XG4gICAgICAgIG5ldyBvYnNpZGlhbi5Ob3RpY2UoXCJVbmFibGUgdG8gY3JlYXRlIG5ldyBmaWxlLlwiKTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRRdWFydGVybHlOb3RlKGRhdGUsIHF1YXJ0ZXJseSkge1xuICAgIHJldHVybiBxdWFydGVybHlbZ2V0RGF0ZVVJRChkYXRlLCBcInF1YXJ0ZXJcIildID8/IG51bGw7XG59XG5mdW5jdGlvbiBnZXRBbGxRdWFydGVybHlOb3RlcygpIHtcbiAgICBjb25zdCBxdWFydGVybHkgPSB7fTtcbiAgICBpZiAoIWFwcEhhc1F1YXJ0ZXJseU5vdGVzUGx1Z2luTG9hZGVkKCkpIHtcbiAgICAgICAgcmV0dXJuIHF1YXJ0ZXJseTtcbiAgICB9XG4gICAgY29uc3QgeyB2YXVsdCB9ID0gd2luZG93LmFwcDtcbiAgICBjb25zdCB7IGZvbGRlciB9ID0gZ2V0UXVhcnRlcmx5Tm90ZVNldHRpbmdzKCk7XG4gICAgY29uc3QgcXVhcnRlcmx5Rm9sZGVyID0gdmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKG9ic2lkaWFuLm5vcm1hbGl6ZVBhdGgoZm9sZGVyKSk7XG4gICAgaWYgKCFxdWFydGVybHlGb2xkZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFF1YXJ0ZXJseU5vdGVzRm9sZGVyTWlzc2luZ0Vycm9yKFwiRmFpbGVkIHRvIGZpbmQgcXVhcnRlcmx5IG5vdGVzIGZvbGRlclwiKTtcbiAgICB9XG4gICAgb2JzaWRpYW4uVmF1bHQucmVjdXJzZUNoaWxkcmVuKHF1YXJ0ZXJseUZvbGRlciwgKG5vdGUpID0+IHtcbiAgICAgICAgaWYgKG5vdGUgaW5zdGFuY2VvZiBvYnNpZGlhbi5URmlsZSkge1xuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IGdldERhdGVGcm9tRmlsZShub3RlLCBcInF1YXJ0ZXJcIik7XG4gICAgICAgICAgICBpZiAoZGF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSBnZXREYXRlVUlEKGRhdGUsIFwicXVhcnRlclwiKTtcbiAgICAgICAgICAgICAgICBxdWFydGVybHlbZGF0ZVN0cmluZ10gPSBub3RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHF1YXJ0ZXJseTtcbn1cblxuY2xhc3MgWWVhcmx5Tm90ZXNGb2xkZXJNaXNzaW5nRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG59XG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gbWltaWNzIHRoZSBiZWhhdmlvciBvZiB0aGUgZGFpbHktbm90ZXMgcGx1Z2luXG4gKiBzbyBpdCB3aWxsIHJlcGxhY2Uge3tkYXRlfX0sIHt7dGl0bGV9fSwgYW5kIHt7dGltZX19IHdpdGggdGhlXG4gKiBmb3JtYXR0ZWQgdGltZXN0YW1wLlxuICpcbiAqIE5vdGU6IGl0IGhhcyBhbiBhZGRlZCBib251cyB0aGF0IGl0J3Mgbm90ICd0b2RheScgc3BlY2lmaWMuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVllYXJseU5vdGUoZGF0ZSkge1xuICAgIGNvbnN0IHsgdmF1bHQgfSA9IHdpbmRvdy5hcHA7XG4gICAgY29uc3QgeyB0ZW1wbGF0ZSwgZm9ybWF0LCBmb2xkZXIgfSA9IGdldFllYXJseU5vdGVTZXR0aW5ncygpO1xuICAgIGNvbnN0IFt0ZW1wbGF0ZUNvbnRlbnRzLCBJRm9sZEluZm9dID0gYXdhaXQgZ2V0VGVtcGxhdGVJbmZvKHRlbXBsYXRlKTtcbiAgICBjb25zdCBmaWxlbmFtZSA9IGRhdGUuZm9ybWF0KGZvcm1hdCk7XG4gICAgY29uc3Qgbm9ybWFsaXplZFBhdGggPSBhd2FpdCBnZXROb3RlUGF0aChmb2xkZXIsIGZpbGVuYW1lKTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjcmVhdGVkRmlsZSA9IGF3YWl0IHZhdWx0LmNyZWF0ZShub3JtYWxpemVkUGF0aCwgdGVtcGxhdGVDb250ZW50c1xuICAgICAgICAgICAgLnJlcGxhY2UoL3t7XFxzKihkYXRlfHRpbWUpXFxzKigoWystXVxcZCspKFt5cW13ZGhzXSkpP1xccyooOi4rPyk/fX0vZ2ksIChfLCBfdGltZU9yRGF0ZSwgY2FsYywgdGltZURlbHRhLCB1bml0LCBtb21lbnRGb3JtYXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5vdyA9IHdpbmRvdy5tb21lbnQoKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gZGF0ZS5jbG9uZSgpLnNldCh7XG4gICAgICAgICAgICAgICAgaG91cjogbm93LmdldChcImhvdXJcIiksXG4gICAgICAgICAgICAgICAgbWludXRlOiBub3cuZ2V0KFwibWludXRlXCIpLFxuICAgICAgICAgICAgICAgIHNlY29uZDogbm93LmdldChcInNlY29uZFwiKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGNhbGMpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50RGF0ZS5hZGQocGFyc2VJbnQodGltZURlbHRhLCAxMCksIHVuaXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1vbWVudEZvcm1hdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50RGF0ZS5mb3JtYXQobW9tZW50Rm9ybWF0LnN1YnN0cmluZygxKS50cmltKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnREYXRlLmZvcm1hdChmb3JtYXQpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLnJlcGxhY2UoL3t7XFxzKmRhdGVcXHMqfX0vZ2ksIGZpbGVuYW1lKVxuICAgICAgICAgICAgLnJlcGxhY2UoL3t7XFxzKnRpbWVcXHMqfX0vZ2ksIHdpbmRvdy5tb21lbnQoKS5mb3JtYXQoXCJISDptbVwiKSlcbiAgICAgICAgICAgIC5yZXBsYWNlKC97e1xccyp0aXRsZVxccyp9fS9naSwgZmlsZW5hbWUpKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgd2luZG93LmFwcC5mb2xkTWFuYWdlci5zYXZlKGNyZWF0ZWRGaWxlLCBJRm9sZEluZm8pO1xuICAgICAgICByZXR1cm4gY3JlYXRlZEZpbGU7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIGNyZWF0ZSBmaWxlOiAnJHtub3JtYWxpemVkUGF0aH0nYCwgZXJyKTtcbiAgICAgICAgbmV3IG9ic2lkaWFuLk5vdGljZShcIlVuYWJsZSB0byBjcmVhdGUgbmV3IGZpbGUuXCIpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldFllYXJseU5vdGUoZGF0ZSwgeWVhcmx5Tm90ZXMpIHtcbiAgICByZXR1cm4geWVhcmx5Tm90ZXNbZ2V0RGF0ZVVJRChkYXRlLCBcInllYXJcIildID8/IG51bGw7XG59XG5mdW5jdGlvbiBnZXRBbGxZZWFybHlOb3RlcygpIHtcbiAgICBjb25zdCB5ZWFybHlOb3RlcyA9IHt9O1xuICAgIGlmICghYXBwSGFzWWVhcmx5Tm90ZXNQbHVnaW5Mb2FkZWQoKSkge1xuICAgICAgICByZXR1cm4geWVhcmx5Tm90ZXM7XG4gICAgfVxuICAgIGNvbnN0IHsgdmF1bHQgfSA9IHdpbmRvdy5hcHA7XG4gICAgY29uc3QgeyBmb2xkZXIgfSA9IGdldFllYXJseU5vdGVTZXR0aW5ncygpO1xuICAgIGNvbnN0IHllYXJseU5vdGVzRm9sZGVyID0gdmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKG9ic2lkaWFuLm5vcm1hbGl6ZVBhdGgoZm9sZGVyKSk7XG4gICAgaWYgKCF5ZWFybHlOb3Rlc0ZvbGRlcikge1xuICAgICAgICB0aHJvdyBuZXcgWWVhcmx5Tm90ZXNGb2xkZXJNaXNzaW5nRXJyb3IoXCJGYWlsZWQgdG8gZmluZCB5ZWFybHkgbm90ZXMgZm9sZGVyXCIpO1xuICAgIH1cbiAgICBvYnNpZGlhbi5WYXVsdC5yZWN1cnNlQ2hpbGRyZW4oeWVhcmx5Tm90ZXNGb2xkZXIsIChub3RlKSA9PiB7XG4gICAgICAgIGlmIChub3RlIGluc3RhbmNlb2Ygb2JzaWRpYW4uVEZpbGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBnZXREYXRlRnJvbUZpbGUobm90ZSwgXCJ5ZWFyXCIpO1xuICAgICAgICAgICAgaWYgKGRhdGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlU3RyaW5nID0gZ2V0RGF0ZVVJRChkYXRlLCBcInllYXJcIik7XG4gICAgICAgICAgICAgICAgeWVhcmx5Tm90ZXNbZGF0ZVN0cmluZ10gPSBub3RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHllYXJseU5vdGVzO1xufVxuXG5mdW5jdGlvbiBhcHBIYXNEYWlseU5vdGVzUGx1Z2luTG9hZGVkKCkge1xuICAgIGNvbnN0IHsgYXBwIH0gPSB3aW5kb3c7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBjb25zdCBkYWlseU5vdGVzUGx1Z2luID0gYXBwLmludGVybmFsUGx1Z2lucy5wbHVnaW5zW1wiZGFpbHktbm90ZXNcIl07XG4gICAgaWYgKGRhaWx5Tm90ZXNQbHVnaW4gJiYgZGFpbHlOb3Rlc1BsdWdpbi5lbmFibGVkKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIGNvbnN0IHBlcmlvZGljTm90ZXMgPSBhcHAucGx1Z2lucy5nZXRQbHVnaW4oXCJwZXJpb2RpYy1ub3Rlc1wiKTtcbiAgICByZXR1cm4gcGVyaW9kaWNOb3RlcyAmJiBwZXJpb2RpY05vdGVzLnNldHRpbmdzPy5kYWlseT8uZW5hYmxlZDtcbn1cbi8qKlxuICogWFhYOiBcIldlZWtseSBOb3Rlc1wiIGxpdmUgaW4gZWl0aGVyIHRoZSBDYWxlbmRhciBwbHVnaW4gb3IgdGhlIHBlcmlvZGljLW5vdGVzIHBsdWdpbi5cbiAqIENoZWNrIGJvdGggdW50aWwgdGhlIHdlZWtseSBub3RlcyBmZWF0dXJlIGlzIHJlbW92ZWQgZnJvbSB0aGUgQ2FsZW5kYXIgcGx1Z2luLlxuICovXG5mdW5jdGlvbiBhcHBIYXNXZWVrbHlOb3Rlc1BsdWdpbkxvYWRlZCgpIHtcbiAgICBjb25zdCB7IGFwcCB9ID0gd2luZG93O1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgaWYgKGFwcC5wbHVnaW5zLmdldFBsdWdpbihcImNhbGVuZGFyXCIpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIGNvbnN0IHBlcmlvZGljTm90ZXMgPSBhcHAucGx1Z2lucy5nZXRQbHVnaW4oXCJwZXJpb2RpYy1ub3Rlc1wiKTtcbiAgICByZXR1cm4gcGVyaW9kaWNOb3RlcyAmJiBwZXJpb2RpY05vdGVzLnNldHRpbmdzPy53ZWVrbHk/LmVuYWJsZWQ7XG59XG5mdW5jdGlvbiBhcHBIYXNNb250aGx5Tm90ZXNQbHVnaW5Mb2FkZWQoKSB7XG4gICAgY29uc3QgeyBhcHAgfSA9IHdpbmRvdztcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIGNvbnN0IHBlcmlvZGljTm90ZXMgPSBhcHAucGx1Z2lucy5nZXRQbHVnaW4oXCJwZXJpb2RpYy1ub3Rlc1wiKTtcbiAgICByZXR1cm4gcGVyaW9kaWNOb3RlcyAmJiBwZXJpb2RpY05vdGVzLnNldHRpbmdzPy5tb250aGx5Py5lbmFibGVkO1xufVxuZnVuY3Rpb24gYXBwSGFzUXVhcnRlcmx5Tm90ZXNQbHVnaW5Mb2FkZWQoKSB7XG4gICAgY29uc3QgeyBhcHAgfSA9IHdpbmRvdztcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIGNvbnN0IHBlcmlvZGljTm90ZXMgPSBhcHAucGx1Z2lucy5nZXRQbHVnaW4oXCJwZXJpb2RpYy1ub3Rlc1wiKTtcbiAgICByZXR1cm4gcGVyaW9kaWNOb3RlcyAmJiBwZXJpb2RpY05vdGVzLnNldHRpbmdzPy5xdWFydGVybHk/LmVuYWJsZWQ7XG59XG5mdW5jdGlvbiBhcHBIYXNZZWFybHlOb3Rlc1BsdWdpbkxvYWRlZCgpIHtcbiAgICBjb25zdCB7IGFwcCB9ID0gd2luZG93O1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgY29uc3QgcGVyaW9kaWNOb3RlcyA9IGFwcC5wbHVnaW5zLmdldFBsdWdpbihcInBlcmlvZGljLW5vdGVzXCIpO1xuICAgIHJldHVybiBwZXJpb2RpY05vdGVzICYmIHBlcmlvZGljTm90ZXMuc2V0dGluZ3M/LnllYXJseT8uZW5hYmxlZDtcbn1cbmZ1bmN0aW9uIGdldFBlcmlvZGljTm90ZVNldHRpbmdzKGdyYW51bGFyaXR5KSB7XG4gICAgY29uc3QgZ2V0U2V0dGluZ3MgPSB7XG4gICAgICAgIGRheTogZ2V0RGFpbHlOb3RlU2V0dGluZ3MsXG4gICAgICAgIHdlZWs6IGdldFdlZWtseU5vdGVTZXR0aW5ncyxcbiAgICAgICAgbW9udGg6IGdldE1vbnRobHlOb3RlU2V0dGluZ3MsXG4gICAgICAgIHF1YXJ0ZXI6IGdldFF1YXJ0ZXJseU5vdGVTZXR0aW5ncyxcbiAgICAgICAgeWVhcjogZ2V0WWVhcmx5Tm90ZVNldHRpbmdzLFxuICAgIH1bZ3JhbnVsYXJpdHldO1xuICAgIHJldHVybiBnZXRTZXR0aW5ncygpO1xufVxuZnVuY3Rpb24gY3JlYXRlUGVyaW9kaWNOb3RlKGdyYW51bGFyaXR5LCBkYXRlKSB7XG4gICAgY29uc3QgY3JlYXRlRm4gPSB7XG4gICAgICAgIGRheTogY3JlYXRlRGFpbHlOb3RlLFxuICAgICAgICBtb250aDogY3JlYXRlTW9udGhseU5vdGUsXG4gICAgICAgIHdlZWs6IGNyZWF0ZVdlZWtseU5vdGUsXG4gICAgfTtcbiAgICByZXR1cm4gY3JlYXRlRm5bZ3JhbnVsYXJpdHldKGRhdGUpO1xufVxuXG5leHBvcnRzLkRFRkFVTFRfREFJTFlfTk9URV9GT1JNQVQgPSBERUZBVUxUX0RBSUxZX05PVEVfRk9STUFUO1xuZXhwb3J0cy5ERUZBVUxUX01PTlRITFlfTk9URV9GT1JNQVQgPSBERUZBVUxUX01PTlRITFlfTk9URV9GT1JNQVQ7XG5leHBvcnRzLkRFRkFVTFRfUVVBUlRFUkxZX05PVEVfRk9STUFUID0gREVGQVVMVF9RVUFSVEVSTFlfTk9URV9GT1JNQVQ7XG5leHBvcnRzLkRFRkFVTFRfV0VFS0xZX05PVEVfRk9STUFUID0gREVGQVVMVF9XRUVLTFlfTk9URV9GT1JNQVQ7XG5leHBvcnRzLkRFRkFVTFRfWUVBUkxZX05PVEVfRk9STUFUID0gREVGQVVMVF9ZRUFSTFlfTk9URV9GT1JNQVQ7XG5leHBvcnRzLmFwcEhhc0RhaWx5Tm90ZXNQbHVnaW5Mb2FkZWQgPSBhcHBIYXNEYWlseU5vdGVzUGx1Z2luTG9hZGVkO1xuZXhwb3J0cy5hcHBIYXNNb250aGx5Tm90ZXNQbHVnaW5Mb2FkZWQgPSBhcHBIYXNNb250aGx5Tm90ZXNQbHVnaW5Mb2FkZWQ7XG5leHBvcnRzLmFwcEhhc1F1YXJ0ZXJseU5vdGVzUGx1Z2luTG9hZGVkID0gYXBwSGFzUXVhcnRlcmx5Tm90ZXNQbHVnaW5Mb2FkZWQ7XG5leHBvcnRzLmFwcEhhc1dlZWtseU5vdGVzUGx1Z2luTG9hZGVkID0gYXBwSGFzV2Vla2x5Tm90ZXNQbHVnaW5Mb2FkZWQ7XG5leHBvcnRzLmFwcEhhc1llYXJseU5vdGVzUGx1Z2luTG9hZGVkID0gYXBwSGFzWWVhcmx5Tm90ZXNQbHVnaW5Mb2FkZWQ7XG5leHBvcnRzLmNyZWF0ZURhaWx5Tm90ZSA9IGNyZWF0ZURhaWx5Tm90ZTtcbmV4cG9ydHMuY3JlYXRlTW9udGhseU5vdGUgPSBjcmVhdGVNb250aGx5Tm90ZTtcbmV4cG9ydHMuY3JlYXRlUGVyaW9kaWNOb3RlID0gY3JlYXRlUGVyaW9kaWNOb3RlO1xuZXhwb3J0cy5jcmVhdGVRdWFydGVybHlOb3RlID0gY3JlYXRlUXVhcnRlcmx5Tm90ZTtcbmV4cG9ydHMuY3JlYXRlV2Vla2x5Tm90ZSA9IGNyZWF0ZVdlZWtseU5vdGU7XG5leHBvcnRzLmNyZWF0ZVllYXJseU5vdGUgPSBjcmVhdGVZZWFybHlOb3RlO1xuZXhwb3J0cy5nZXRBbGxEYWlseU5vdGVzID0gZ2V0QWxsRGFpbHlOb3RlcztcbmV4cG9ydHMuZ2V0QWxsTW9udGhseU5vdGVzID0gZ2V0QWxsTW9udGhseU5vdGVzO1xuZXhwb3J0cy5nZXRBbGxRdWFydGVybHlOb3RlcyA9IGdldEFsbFF1YXJ0ZXJseU5vdGVzO1xuZXhwb3J0cy5nZXRBbGxXZWVrbHlOb3RlcyA9IGdldEFsbFdlZWtseU5vdGVzO1xuZXhwb3J0cy5nZXRBbGxZZWFybHlOb3RlcyA9IGdldEFsbFllYXJseU5vdGVzO1xuZXhwb3J0cy5nZXREYWlseU5vdGUgPSBnZXREYWlseU5vdGU7XG5leHBvcnRzLmdldERhaWx5Tm90ZVNldHRpbmdzID0gZ2V0RGFpbHlOb3RlU2V0dGluZ3M7XG5leHBvcnRzLmdldERhdGVGcm9tRmlsZSA9IGdldERhdGVGcm9tRmlsZTtcbmV4cG9ydHMuZ2V0RGF0ZUZyb21QYXRoID0gZ2V0RGF0ZUZyb21QYXRoO1xuZXhwb3J0cy5nZXREYXRlVUlEID0gZ2V0RGF0ZVVJRDtcbmV4cG9ydHMuZ2V0TW9udGhseU5vdGUgPSBnZXRNb250aGx5Tm90ZTtcbmV4cG9ydHMuZ2V0TW9udGhseU5vdGVTZXR0aW5ncyA9IGdldE1vbnRobHlOb3RlU2V0dGluZ3M7XG5leHBvcnRzLmdldFBlcmlvZGljTm90ZVNldHRpbmdzID0gZ2V0UGVyaW9kaWNOb3RlU2V0dGluZ3M7XG5leHBvcnRzLmdldFF1YXJ0ZXJseU5vdGUgPSBnZXRRdWFydGVybHlOb3RlO1xuZXhwb3J0cy5nZXRRdWFydGVybHlOb3RlU2V0dGluZ3MgPSBnZXRRdWFydGVybHlOb3RlU2V0dGluZ3M7XG5leHBvcnRzLmdldFRlbXBsYXRlSW5mbyA9IGdldFRlbXBsYXRlSW5mbztcbmV4cG9ydHMuZ2V0V2Vla2x5Tm90ZSA9IGdldFdlZWtseU5vdGU7XG5leHBvcnRzLmdldFdlZWtseU5vdGVTZXR0aW5ncyA9IGdldFdlZWtseU5vdGVTZXR0aW5ncztcbmV4cG9ydHMuZ2V0WWVhcmx5Tm90ZSA9IGdldFllYXJseU5vdGU7XG5leHBvcnRzLmdldFllYXJseU5vdGVTZXR0aW5ncyA9IGdldFllYXJseU5vdGVTZXR0aW5ncztcbiIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuIEluIHRoZSBicm93c2VyIHdlIHRoZXJlZm9yZVxuLy8gcmVxdWlyZSB0aGUgY3J5cHRvIEFQSSBhbmQgZG8gbm90IHN1cHBvcnQgYnVpbHQtaW4gZmFsbGJhY2sgdG8gbG93ZXIgcXVhbGl0eSByYW5kb20gbnVtYmVyXG4vLyBnZW5lcmF0b3JzIChsaWtlIE1hdGgucmFuZG9tKCkpLlxudmFyIGdldFJhbmRvbVZhbHVlcztcbnZhciBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJuZygpIHtcbiAgLy8gbGF6eSBsb2FkIHNvIHRoYXQgZW52aXJvbm1lbnRzIHRoYXQgbmVlZCB0byBwb2x5ZmlsbCBoYXZlIGEgY2hhbmNlIHRvIGRvIHNvXG4gIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvIGltcGxlbWVudGF0aW9uLiBBbHNvLFxuICAgIC8vIGZpbmQgdGhlIGNvbXBsZXRlIGltcGxlbWVudGF0aW9uIG9mIGNyeXB0byAobXNDcnlwdG8pIG9uIElFMTEuXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKSB8fCB0eXBlb2YgbXNDcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMgPT09ICdmdW5jdGlvbicgJiYgbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQobXNDcnlwdG8pO1xuXG4gICAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY3J5cHRvLmdldFJhbmRvbVZhbHVlcygpIG5vdCBzdXBwb3J0ZWQuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQjZ2V0cmFuZG9tdmFsdWVzLW5vdC1zdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbn0iLCJleHBvcnQgZGVmYXVsdCAvXig/OlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9fDAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCkkL2k7IiwiaW1wb3J0IFJFR0VYIGZyb20gJy4vcmVnZXguanMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgUkVHRVgudGVzdCh1dWlkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5cbnZhciBieXRlVG9IZXggPSBbXTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpKTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KGFycikge1xuICB2YXIgb2Zmc2V0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAwO1xuICAvLyBOb3RlOiBCZSBjYXJlZnVsIGVkaXRpbmcgdGhpcyBjb2RlISAgSXQncyBiZWVuIHR1bmVkIGZvciBwZXJmb3JtYW5jZVxuICAvLyBhbmQgd29ya3MgaW4gd2F5cyB5b3UgbWF5IG5vdCBleHBlY3QuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQvcHVsbC80MzRcbiAgdmFyIHV1aWQgPSAoYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV0pLnRvTG93ZXJDYXNlKCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwiaW1wb3J0IHJuZyBmcm9tICcuL3JuZy5qcyc7XG5pbXBvcnQgc3RyaW5naWZ5IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuIHN0cmluZ2lmeShybmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjQ7IiwiaW1wb3J0IHsgbm9ybWFsaXplUGF0aCB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgZ2V0RGFpbHlOb3RlU2V0dGluZ3MgfSBmcm9tIFwib2JzaWRpYW4tZGFpbHktbm90ZXMtaW50ZXJmYWNlXCI7XG5cblxuLy8hIEFsbCBvZiB0aGVzZSBtZXRob2RzIGFyZSB0YWtlbiBmcm9tIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL29ic2lkaWFuLWRhaWx5LW5vdGVzLWludGVyZmFjZS5cbmZ1bmN0aW9uIGpvaW4oLi4ucGFydFNlZ21lbnRzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gICAgLy8gU3BsaXQgdGhlIGlucHV0cyBpbnRvIGEgbGlzdCBvZiBwYXRoIGNvbW1hbmRzLlxuICAgIGxldCBwYXJ0czogc3RyaW5nW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHBhcnRTZWdtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgcGFydHMgPSBwYXJ0cy5jb25jYXQocGFydFNlZ21lbnRzW2ldLnNwbGl0KFwiL1wiKSk7XG4gICAgfVxuICAgIC8vIEludGVycHJldCB0aGUgcGF0aCBjb21tYW5kcyB0byBnZXQgdGhlIG5ldyByZXNvbHZlZCBwYXRoLlxuICAgIGNvbnN0IG5ld1BhcnRzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBwYXJ0cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgY29uc3QgcGFydCA9IHBhcnRzW2ldO1xuICAgICAgICAvLyBSZW1vdmUgbGVhZGluZyBhbmQgdHJhaWxpbmcgc2xhc2hlc1xuICAgICAgICAvLyBBbHNvIHJlbW92ZSBcIi5cIiBzZWdtZW50c1xuICAgICAgICBpZiAoIXBhcnQgfHwgcGFydCA9PT0gXCIuXCIpIGNvbnRpbnVlO1xuICAgICAgICAvLyBQdXNoIG5ldyBwYXRoIHNlZ21lbnRzLlxuICAgICAgICBlbHNlIG5ld1BhcnRzLnB1c2gocGFydCk7XG4gICAgfVxuICAgIC8vIFByZXNlcnZlIHRoZSBpbml0aWFsIHNsYXNoIGlmIHRoZXJlIHdhcyBvbmUuXG4gICAgaWYgKHBhcnRzWzBdID09PSBcIlwiKSBuZXdQYXJ0cy51bnNoaWZ0KFwiXCIpO1xuICAgIC8vIFR1cm4gYmFjayBpbnRvIGEgc2luZ2xlIHN0cmluZyBwYXRoLlxuICAgIHJldHVybiBuZXdQYXJ0cy5qb2luKFwiL1wiKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0Tm90ZVBhdGgoXG4gICAgZGlyZWN0b3J5OiBzdHJpbmcsXG4gICAgZmlsZW5hbWU6IHN0cmluZ1xuKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBpZiAoIWZpbGVuYW1lLmVuZHNXaXRoKFwiLm1kXCIpKSB7XG4gICAgICAgIGZpbGVuYW1lICs9IFwiLm1kXCI7XG4gICAgfVxuICAgIGNvbnN0IHBhdGggPSBub3JtYWxpemVQYXRoKGpvaW4oZGlyZWN0b3J5LCBmaWxlbmFtZSkpO1xuXG4gICAgYXdhaXQgZW5zdXJlRm9sZGVyRXhpc3RzKHBhdGgpO1xuXG4gICAgcmV0dXJuIHBhdGg7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGVuc3VyZUZvbGRlckV4aXN0cyhwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBkaXJzID0gcGF0aC5yZXBsYWNlKC9cXFxcL2csIFwiL1wiKS5zcGxpdChcIi9cIik7XG4gICAgZGlycy5wb3AoKTsgLy8gcmVtb3ZlIGJhc2VuYW1lXG5cbiAgICBpZiAoZGlycy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgZGlyID0gam9pbiguLi5kaXJzKTtcbiAgICAgICAgaWYgKCEod2luZG93IGFzIGFueSkuYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChkaXIpKSB7XG4gICAgICAgICAgICBhd2FpdCAod2luZG93IGFzIGFueSkuYXBwLnZhdWx0LmNyZWF0ZUZvbGRlcihkaXIpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0RGFpbHlOb3RlUGF0aChkYXRlOiBhbnkpOiBQcm9taXNlPHN0cmluZz4ge1xuXG4gICAgY29uc3QgeyBmb3JtYXQsIGZvbGRlciB9ID0gZ2V0RGFpbHlOb3RlU2V0dGluZ3MoKTtcblxuICAgIGNvbnN0IGZpbGVuYW1lID0gZGF0ZS5mb3JtYXQoZm9ybWF0KTtcbiAgICBjb25zdCBub3JtYWxpemVkUGF0aCA9IGF3YWl0IGdldE5vdGVQYXRoKGZvbGRlciwgZmlsZW5hbWUpO1xuICAgIHJldHVybiBub3JtYWxpemVkUGF0aDtcbn0iLCJpbXBvcnQgeyBBcHAsIENvbW1hbmQsIEZ1enp5U3VnZ2VzdE1vZGFsLCBNYXJrZG93blZpZXcsIG5vcm1hbGl6ZVBhdGgsIE5vdGljZSwgcGFyc2VGcm9udE1hdHRlckFsaWFzZXMsIHBhcnNlRnJvbnRNYXR0ZXJFbnRyeSwgUGx1Z2luLCBQbHVnaW5TZXR0aW5nVGFiLCByZXF1ZXN0LCBTZXR0aW5nLCBTdWdnZXN0TW9kYWwsIFRGaWxlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBhcHBIYXNEYWlseU5vdGVzUGx1Z2luTG9hZGVkLCBjcmVhdGVEYWlseU5vdGUsIGdldEFsbERhaWx5Tm90ZXMsIGdldERhaWx5Tm90ZSB9IGZyb20gXCJvYnNpZGlhbi1kYWlseS1ub3Rlcy1pbnRlcmZhY2VcIjtcbmltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gJ3V1aWQnO1xuaW1wb3J0IHsgZ2V0RGFpbHlOb3RlUGF0aCB9IGZyb20gXCIuL2RhaWx5X25vdGVfdXRpbHNcIjtcblxuY29uc3QgREVGQVVMVF9TRVRUSU5HUzogQWR2YW5jZWRVUklTZXR0aW5ncyA9IHtcbiAgICBvcGVuRmlsZU9uV3JpdGU6IHRydWUsXG4gICAgb3BlbkRhaWx5SW5OZXdQYW5lOiBmYWxzZSxcbiAgICBvcGVuRmlsZU9uV3JpdGVJbk5ld1BhbmU6IGZhbHNlLFxuICAgIG9wZW5GaWxlV2l0aG91dFdyaXRlSW5OZXdQYW5lOiBmYWxzZSxcbiAgICBpZEZpZWxkOiBcImlkXCIsXG4gICAgdXNlVUlEOiBmYWxzZSxcbn07XG5cbmludGVyZmFjZSBBZHZhbmNlZFVSSVNldHRpbmdzIHtcbiAgICBvcGVuRmlsZU9uV3JpdGU6IGJvb2xlYW47XG4gICAgb3BlbkZpbGVPbldyaXRlSW5OZXdQYW5lOiBib29sZWFuO1xuICAgIG9wZW5EYWlseUluTmV3UGFuZTogYm9vbGVhbjtcbiAgICBvcGVuRmlsZVdpdGhvdXRXcml0ZUluTmV3UGFuZTogYm9vbGVhbjtcbiAgICBpZEZpZWxkOiBzdHJpbmc7XG4gICAgdXNlVUlEOiBib29sZWFuO1xufVxuXG5pbnRlcmZhY2UgUGFyYW1ldGVycyB7XG4gICAgd29ya3NwYWNlPzogc3RyaW5nO1xuICAgIGZpbGVwYXRoPzogc3RyaW5nO1xuICAgIGRhaWx5PzogXCJ0cnVlXCI7XG4gICAgZGF0YT86IHN0cmluZztcbiAgICBtb2RlPzogXCJvdmVyd3JpdGVcIiB8IFwiYXBwZW5kXCIgfCBcInByZXBlbmRcIjtcbiAgICBoZWFkaW5nPzogc3RyaW5nO1xuICAgIGJsb2NrPzogc3RyaW5nO1xuICAgIGNvbW1hbmRuYW1lPzogc3RyaW5nLFxuICAgIGNvbW1hbmRpZD86IHN0cmluZyxcbiAgICBzZWFyY2g/OiBzdHJpbmcsXG4gICAgc2VhcmNocmVnZXg/OiBzdHJpbmc7XG4gICAgcmVwbGFjZT86IHN0cmluZztcbiAgICB1aWQ/OiBzdHJpbmc7XG4gICAgZmlsZW5hbWU/OiBzdHJpbmc7XG4gICAgZXhpc3RzPzogc3RyaW5nO1xuICAgIHZpZXdtb2RlPzogXCJzb3VyY2VcIiB8IFwicHJldmlld1wiIHwgXCJsaXZlXCI7XG4gICAgc2V0dGluZ2lkPzogc3RyaW5nO1xuICAgIFwieC1zdWNjZXNzXCI/OiBzdHJpbmc7XG4gICAgXCJ4LWVycm9yXCI/OiBzdHJpbmc7XG4gICAgc2F2ZXdvcmtzcGFjZT86IFwidHJ1ZVwiO1xuICAgIHVwZGF0ZXBsdWdpbnM/OiBcInRydWVcIjtcbiAgICBsaW5lPzogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgSG9va1BhcmFtZXRlcnMge1xuICAgIFwieC1zdWNjZXNzXCI6IHN0cmluZztcbiAgICBcIngtZXJyb3JcIjogc3RyaW5nO1xuXG59XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZHZhbmNlZFVSSSBleHRlbmRzIFBsdWdpbiB7XG4gICAgc2V0dGluZ3M6IEFkdmFuY2VkVVJJU2V0dGluZ3M7XG5cbiAgICBhc3luYyBvbmxvYWQoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMubG9hZFNldHRpbmdzKCk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgU2V0dGluZ3NUYWIodGhpcy5hcHAsIHRoaXMpKTtcblxuXG4gICAgICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICAgICAgICBpZDogXCJjb3B5LXVyaS1jdXJyZW50LWZpbGVcIixcbiAgICAgICAgICAgIG5hbWU6IFwiY29weSBVUkkgZm9yIGZpbGVcIixcbiAgICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB0aGlzLmhhbmRsZUNvcHlGaWxlVVJJKClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRDb21tYW5kKHtcbiAgICAgICAgICAgIGlkOiBcImNvcHktdXJpLWRhaWx5XCIsXG4gICAgICAgICAgICBuYW1lOiBcImNvcHkgVVJJIGZvciBkYWlseSBub3RlXCIsXG4gICAgICAgICAgICBjYWxsYmFjazogKCkgPT4gbmV3IEVudGVyRGF0YU1vZGFsKHRoaXMpLm9wZW4oKVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgICAgICAgaWQ6IFwiY29weS11cmktc2VhcmNoLWFuZC1yZXBsYWNlXCIsXG4gICAgICAgICAgICBuYW1lOiBcImNvcHkgVVJJIGZvciBzZWFyY2ggYW5kIHJlcGxhY2VcIixcbiAgICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZU1vZGFsID0gbmV3IEZpbGVNb2RhbCh0aGlzLCBcIlVzZWQgZmlsZSBmb3Igc2VhcmNoIGFuZCByZXBsYWNlXCIpO1xuICAgICAgICAgICAgICAgIGZpbGVNb2RhbC5vcGVuKCk7XG4gICAgICAgICAgICAgICAgZmlsZU1vZGFsLm9uQ2hvb3NlSXRlbSA9IChmaWxlUGF0aDogRmlsZU1vZGFsRGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWFyY2hNb2RhbCA9IG5ldyBTZWFyY2hNb2RhbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoTW9kYWwub3BlbigpO1xuICAgICAgICAgICAgICAgICAgICBzZWFyY2hNb2RhbC5vbkNob29zZVN1Z2dlc3Rpb24gPSAoaXRlbTogU2VhcmNoTW9kYWxEYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUmVwbGFjZU1vZGFsKHRoaXMsIGl0ZW0sIGZpbGVQYXRoPy5zb3VyY2UpLm9wZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRDb21tYW5kKHtcbiAgICAgICAgICAgIGlkOiBcImNvcHktdXJpLWNvbW1hbmRcIixcbiAgICAgICAgICAgIG5hbWU6IFwiY29weSBVUkkgZm9yIGNvbW1hbmRcIixcbiAgICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZU1vZGFsID0gbmV3IEZpbGVNb2RhbCh0aGlzLCBcIlNlbGVjdCBhIGZpbGUgdG8gYmUgb3BlbmVkIGJlZm9yZSBleGVjdXRpbmcgdGhlIGNvbW1hbmRcIik7XG4gICAgICAgICAgICAgICAgZmlsZU1vZGFsLm9wZW4oKTtcbiAgICAgICAgICAgICAgICBmaWxlTW9kYWwub25DaG9vc2VJdGVtID0gKGl0ZW06IEZpbGVNb2RhbERhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbmV3IENvbW1hbmRNb2RhbCh0aGlzLCBpdGVtPy5zb3VyY2UpLm9wZW4oKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG4gICAgICAgIHRoaXMucmVnaXN0ZXJPYnNpZGlhblByb3RvY29sSGFuZGxlcihcImFkdmFuY2VkLXVyaVwiLCBhc3luYyAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFyYW1ldGVycyA9IGUgYXMgdW5rbm93biBhcyBQYXJhbWV0ZXJzO1xuXG4gICAgICAgICAgICAvKiogQWxsb3dzIHdyaXRpbmcgdG8gbmV3IGNyZWF0ZWQgZGFpbHkgbm90ZSB3aXRob3V0IGFueSBgUGFyYW1ldGVycy5tb2RlYCAqL1xuICAgICAgICAgICAgbGV0IGNyZWF0ZWREYWlseU5vdGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcGFyYW1ldGVyIGluIHBhcmFtZXRlcnMpIHtcbiAgICAgICAgICAgICAgICAocGFyYW1ldGVycyBhcyBhbnkpW3BhcmFtZXRlcl0gPSBkZWNvZGVVUklDb21wb25lbnQoKHBhcmFtZXRlcnMgYXMgYW55KVtwYXJhbWV0ZXJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXJhbWV0ZXJzLnVpZCkge1xuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMuZmlsZXBhdGggPSB0aGlzLmdldEZpbGVGcm9tVUlEKHBhcmFtZXRlcnMudWlkKT8ucGF0aDtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocGFyYW1ldGVycy5maWxlbmFtZSkge1xuICAgICAgICAgICAgICAgIGxldCBmaWxlID0gdGhpcy5hcHAubWV0YWRhdGFDYWNoZS5nZXRGaXJzdExpbmtwYXRoRGVzdChwYXJhbWV0ZXJzLmZpbGVuYW1lLCBcIlwiKTtcbiAgICAgICAgICAgICAgICBpZiAoIWZpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZSA9IHRoaXMuYXBwLnZhdWx0LmdldE1hcmtkb3duRmlsZXMoKS5maW5kKGZpbGUgPT4gcGFyc2VGcm9udE1hdHRlckFsaWFzZXModGhpcy5hcHAubWV0YWRhdGFDYWNoZS5nZXRGaWxlQ2FjaGUoZmlsZSkuZnJvbnRtYXR0ZXIpPy5pbmNsdWRlcyhwYXJhbWV0ZXJzLmZpbGVuYW1lKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMuZmlsZXBhdGggPSBmaWxlPy5wYXRoID8/IG5vcm1hbGl6ZVBhdGgocGFyYW1ldGVycy5maWxlbmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwYXJhbWV0ZXJzLmZpbGVwYXRoKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1ldGVycy5maWxlcGF0aCA9IG5vcm1hbGl6ZVBhdGgocGFyYW1ldGVycy5maWxlcGF0aCk7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBwYXJhbWV0ZXJzLmZpbGVwYXRoLmxhc3RJbmRleE9mKFwiLlwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBleHRlbnNpb24gPSBwYXJhbWV0ZXJzLmZpbGVwYXRoLnN1YnN0cmluZyhpbmRleCA8IDAgPyBwYXJhbWV0ZXJzLmZpbGVwYXRoLmxlbmd0aCA6IGluZGV4KTtcblxuICAgICAgICAgICAgICAgIGlmIChleHRlbnNpb24gPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVycy5maWxlcGF0aCA9IHBhcmFtZXRlcnMuZmlsZXBhdGggKyBcIi5tZFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW1ldGVycy5kYWlseSA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWFwcEhhc0RhaWx5Tm90ZXNQbHVnaW5Mb2FkZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKFwiRGFpbHkgbm90ZXMgcGx1Z2luIGlzIG5vdCBsb2FkZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgbW9tZW50ID0gKHdpbmRvdyBhcyBhbnkpLm1vbWVudChEYXRlLm5vdygpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBhbGxEYWlseU5vdGVzID0gZ2V0QWxsRGFpbHlOb3RlcygpO1xuICAgICAgICAgICAgICAgIGxldCBkYWlseU5vdGUgPSBnZXREYWlseU5vdGUobW9tZW50LCBhbGxEYWlseU5vdGVzKTtcbiAgICAgICAgICAgICAgICBpZiAoIWRhaWx5Tm90ZSkge1xuICAgICAgICAgICAgICAgICAgICAvLy8gUHJldmVudCBkYWlseSBub3RlIGZyb20gYmVpbmcgY3JlYXRlZCBvbiBleGlzdGluZyBjaGVja1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1ldGVycy5leGlzdHMgPT09IFwidHJ1ZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzLmZpbGVwYXRoID0gYXdhaXQgZ2V0RGFpbHlOb3RlUGF0aChtb21lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGFpbHlOb3RlID0gYXdhaXQgY3JlYXRlRGFpbHlOb3RlKG1vbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkRGFpbHlOb3RlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZGFpbHlOb3RlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVycy5maWxlcGF0aCA9IGRhaWx5Tm90ZS5wYXRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBhcmFtZXRlcnMud29ya3NwYWNlIHx8IHBhcmFtZXRlcnMuc2F2ZXdvcmtzcGFjZSA9PSBcInRydWVcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlV29ya3NwYWNlKHBhcmFtZXRlcnMpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtZXRlcnMuY29tbWFuZG5hbWUgfHwgcGFyYW1ldGVycy5jb21tYW5kaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNvbW1hbmQocGFyYW1ldGVycyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW1ldGVycy5maWxlcGF0aCAmJiBwYXJhbWV0ZXJzLmV4aXN0cyA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZURvZXNGaWxlRXhpc3QocGFyYW1ldGVycyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW1ldGVycy5maWxlcGF0aCAmJiBwYXJhbWV0ZXJzLmRhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVdyaXRlKHBhcmFtZXRlcnMsIGNyZWF0ZWREYWlseU5vdGUpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtZXRlcnMuZmlsZXBhdGggJiYgcGFyYW1ldGVycy5oZWFkaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVPcGVuKHBhcmFtZXRlcnMpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtZXRlcnMuZmlsZXBhdGggJiYgcGFyYW1ldGVycy5ibG9jaykge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlT3BlbihwYXJhbWV0ZXJzKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmICgocGFyYW1ldGVycy5zZWFyY2ggfHwgcGFyYW1ldGVycy5zZWFyY2hyZWdleCkgJiYgcGFyYW1ldGVycy5yZXBsYWNlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU2VhcmNoQW5kUmVwbGFjZShwYXJhbWV0ZXJzKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbWV0ZXJzLmZpbGVwYXRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVPcGVuKHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbWV0ZXJzLnNldHRpbmdpZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlT3BlblNldHRpbmdzKHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbWV0ZXJzLnVwZGF0ZXBsdWdpbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVVwZGF0ZVBsdWdpbnMocGFyYW1ldGVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyT2JzaWRpYW5Qcm90b2NvbEhhbmRsZXIoXG4gICAgICAgICAgICBcImhvb2stZ2V0LWFkdmFuY2VkLXVyaVwiLFxuICAgICAgICAgICAgYXN5bmMgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJhbWV0ZXJzID0gZSBhcyB1bmtub3duIGFzIEhvb2tQYXJhbWV0ZXJzO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcGFyYW1ldGVyIGluIHBhcmFtZXRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgKHBhcmFtZXRlcnMgYXMgYW55KVtwYXJhbWV0ZXJdID0gZGVjb2RlVVJJQ29tcG9uZW50KChwYXJhbWV0ZXJzIGFzIGFueSlbcGFyYW1ldGVyXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUxlYWYgPSB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZjtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gYWN0aXZlTGVhZi52aWV3LmZpbGU7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUxlYWYgJiYgZmlsZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHBhcmFtZXRlcnNbXCJ4LXN1Y2Nlc3NcIl0pO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGl0bGU6IHN0cmluZztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGUuZXh0ZW5zaW9uID09IFwibWRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgPSBmaWxlLmJhc2VuYW1lO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgPSBmaWxlLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoXCJ0aXRsZVwiLCB0aXRsZSk7XG4gICAgICAgICAgICAgICAgICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KFwiYWR2YW5jZWR1cmlcIiwgYXdhaXQgdGhpcy5nZW5lcmF0ZVVSSSh7IGZpbGVwYXRoOiBmaWxlLnBhdGggfSkpO1xuICAgICAgICAgICAgICAgICAgICB1cmwuc2VhcmNoUGFyYW1zLnNldChcInVybGtleVwiLCBcImFkdmFuY2VkdXJpXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHVybC50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHBhcmFtZXRlcnNbXCJ4LWVycm9yXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoXCJlcnJvck1lc3NhZ2VcIiwgXCJObyBmaWxlIG9wZW5lZFwiKTtcblxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cub3Blbih1cmwudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFxuICAgICAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLm9uKCdmaWxlLW1lbnUnLCAobWVudSwgXywgc291cmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZSAhPT0gXCJwYW5lLW1vcmUtb3B0aW9uc1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgdmlldyA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldyk7XG4gICAgICAgICAgICAgICAgaWYgKCF2aWV3KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBtZW51LmFkZEl0ZW0oKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zZXRUaXRsZShgQ29weSBBZHZhbmNlZCBVUklgKS5zZXRJY29uKCdsaW5rJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbkNsaWNrKChfKSA9PiB0aGlzLmhhbmRsZUNvcHlGaWxlVVJJKCkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIHN1Y2Nlc3MocGFyYW1ldGVyczogUGFyYW1ldGVycykge1xuICAgICAgICBpZiAocGFyYW1ldGVyc1tcIngtc3VjY2Vzc1wiXSlcbiAgICAgICAgICAgIHJlcXVlc3QoeyB1cmw6IHBhcmFtZXRlcnNbXCJ4LXN1Y2Nlc3NcIl0sIH0pO1xuICAgIH1cblxuICAgIGZhaWx1cmUocGFyYW1ldGVyczogUGFyYW1ldGVycykge1xuICAgICAgICBpZiAocGFyYW1ldGVyc1tcIngtZXJyb3JcIl0pXG4gICAgICAgICAgICByZXF1ZXN0KHsgdXJsOiBwYXJhbWV0ZXJzW1wieC1lcnJvclwiXSB9KTtcbiAgICB9XG5cbiAgICBnZXRGaWxlRnJvbVVJRCh1aWQ6IHN0cmluZyk6IFRGaWxlIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgY29uc3QgZmlsZXMgPSB0aGlzLmFwcC52YXVsdC5nZXRGaWxlcygpO1xuICAgICAgICBjb25zdCBpZEtleSA9IHRoaXMuc2V0dGluZ3MuaWRGaWVsZDtcbiAgICAgICAgcmV0dXJuIGZpbGVzLmZpbmQoZmlsZSA9PiBwYXJzZUZyb250TWF0dGVyRW50cnkodGhpcy5hcHAubWV0YWRhdGFDYWNoZS5nZXRGaWxlQ2FjaGUoZmlsZSk/LmZyb250bWF0dGVyLCBpZEtleSkgPT0gdWlkKTtcbiAgICB9XG5cbiAgICBoYW5kbGVXb3Jrc3BhY2UocGFyYW1ldGVyczogUGFyYW1ldGVycykge1xuICAgICAgICBjb25zdCB3b3Jrc3BhY2VzID0gdGhpcy5hcHAuaW50ZXJuYWxQbHVnaW5zPy5wbHVnaW5zPy53b3Jrc3BhY2VzO1xuICAgICAgICBpZiAoIXdvcmtzcGFjZXMpIHtcbiAgICAgICAgICAgIG5ldyBOb3RpY2UoXCJDYW5ub3QgZmluZCBXb3Jrc3BhY2VzIHBsdWdpbi4gUGxlYXNlIGZpbGUgYW4gaXNzdWUuXCIpO1xuICAgICAgICAgICAgdGhpcy5mYWlsdXJlKHBhcmFtZXRlcnMpO1xuICAgICAgICB9IGVsc2UgaWYgKHdvcmtzcGFjZXMuZW5hYmxlZCkge1xuICAgICAgICAgICAgaWYgKHBhcmFtZXRlcnMuc2F2ZXdvcmtzcGFjZSA9PSBcInRydWVcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IHdvcmtzcGFjZXMuaW5zdGFuY2UuYWN0aXZlV29ya3NwYWNlO1xuICAgICAgICAgICAgICAgIHdvcmtzcGFjZXMuaW5zdGFuY2Uuc2F2ZVdvcmtzcGFjZShhY3RpdmUpO1xuICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoYFNhdmVkIGN1cnJlbnQgd29ya3NwYWNlIHRvICR7YWN0aXZlfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhcmFtZXRlcnMud29ya3NwYWNlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHdvcmtzcGFjZXMuaW5zdGFuY2UubG9hZFdvcmtzcGFjZShwYXJhbWV0ZXJzLndvcmtzcGFjZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN1Y2Nlc3MocGFyYW1ldGVycyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXcgTm90aWNlKFwiV29ya3NwYWNlcyBwbHVnaW4gaXMgbm90IGVuYWJsZWRcIik7XG4gICAgICAgICAgICB0aGlzLmZhaWx1cmUocGFyYW1ldGVycyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBoYW5kbGVDb21tYW5kKHBhcmFtZXRlcnM6IFBhcmFtZXRlcnMpIHtcbiAgICAgICAgaWYgKHBhcmFtZXRlcnMuZmlsZXBhdGgpIHtcbiAgICAgICAgICAgIGlmIChwYXJhbWV0ZXJzLm1vZGUpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmFwcC53b3Jrc3BhY2Uub3BlbkxpbmtUZXh0KHBhcmFtZXRlcnMuZmlsZXBhdGgsIFwiL1wiLCB1bmRlZmluZWQsIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGU6IHsgbW9kZTogXCJzb3VyY2VcIiB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmlldyA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldyk7XG4gICAgICAgICAgICAgICAgaWYgKHZpZXcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWRpdG9yID0gdmlldy5lZGl0b3I7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBlZGl0b3IuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtZXRlcnMubW9kZSA9PT0gXCJhcHBlbmRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yLnNldFZhbHVlKGRhdGEgKyBcIlxcblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVzID0gZWRpdG9yLmxpbmVDb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yLnNldEN1cnNvcih7IGNoOiAwLCBsaW5lOiBsaW5lcyB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbWV0ZXJzLm1vZGUgPT09IFwicHJlcGVuZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlZGl0b3Iuc2V0VmFsdWUoXCJcXG5cIiArIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yLnNldEN1cnNvcih7IGNoOiAwLCBsaW5lOiAwIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtZXRlcnMubW9kZSA9PT0gXCJvdmVyd3JpdGVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yLnNldFZhbHVlKFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmFwcC53b3Jrc3BhY2Uub3BlbkxpbmtUZXh0KHBhcmFtZXRlcnMuZmlsZXBhdGgsIFwiL1wiLCB0aGlzLnNldHRpbmdzLm9wZW5GaWxlV2l0aG91dFdyaXRlSW5OZXdQYW5lLCB0aGlzLmdldFZpZXdTdGF0ZUZyb21Nb2RlKHBhcmFtZXRlcnMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocGFyYW1ldGVycy5jb21tYW5kaWQpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwLmNvbW1hbmRzLmV4ZWN1dGVDb21tYW5kQnlJZChwYXJhbWV0ZXJzLmNvbW1hbmRpZCk7XG4gICAgICAgIH0gZWxzZSBpZiAocGFyYW1ldGVycy5jb21tYW5kbmFtZSkge1xuICAgICAgICAgICAgY29uc3QgcmF3Q29tbWFuZHMgPSB0aGlzLmFwcC5jb21tYW5kcy5jb21tYW5kcztcbiAgICAgICAgICAgIGZvciAoY29uc3QgY29tbWFuZCBpbiByYXdDb21tYW5kcykge1xuICAgICAgICAgICAgICAgIGlmIChyYXdDb21tYW5kc1tjb21tYW5kXS5uYW1lID09PSBwYXJhbWV0ZXJzLmNvbW1hbmRuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyYXdDb21tYW5kc1tjb21tYW5kXS5jYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmF3Q29tbWFuZHNbY29tbWFuZF0uY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhd0NvbW1hbmRzW2NvbW1hbmRdLmNoZWNrQ2FsbGJhY2soZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN1Y2Nlc3MocGFyYW1ldGVycyk7XG4gICAgfVxuICAgIGFzeW5jIGhhbmRsZURvZXNGaWxlRXhpc3QocGFyYW1ldGVyczogUGFyYW1ldGVycykge1xuICAgICAgICBjb25zdCBleGlzdHMgPSBhd2FpdCB0aGlzLmFwcC52YXVsdC5hZGFwdGVyLmV4aXN0cyhwYXJhbWV0ZXJzLmZpbGVwYXRoKTtcblxuICAgICAgICB0aGlzLmNvcHlUZXh0KChleGlzdHMgPyAxIDogMCkudG9TdHJpbmcoKSk7XG4gICAgICAgIHRoaXMuc3VjY2VzcyhwYXJhbWV0ZXJzKTtcblxuICAgIH1cbiAgICBhc3luYyBoYW5kbGVTZWFyY2hBbmRSZXBsYWNlKHBhcmFtZXRlcnM6IFBhcmFtZXRlcnMpIHtcbiAgICAgICAgbGV0IGZpbGU6IFRGaWxlO1xuICAgICAgICBpZiAocGFyYW1ldGVycy5maWxlcGF0aCkge1xuXG4gICAgICAgICAgICBjb25zdCBhYnN0cmFjdEZpbGUgPSB0aGlzLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgocGFyYW1ldGVycy5maWxlcGF0aCk7XG4gICAgICAgICAgICBpZiAoYWJzdHJhY3RGaWxlIGluc3RhbmNlb2YgVEZpbGUpIHtcbiAgICAgICAgICAgICAgICBmaWxlID0gYWJzdHJhY3RGaWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmlsZSA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVGaWxlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmlsZSkge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCB0aGlzLmFwcC52YXVsdC5yZWFkKGZpbGUpO1xuICAgICAgICAgICAgaWYgKHBhcmFtZXRlcnMuc2VhcmNocmVnZXgpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBbLCAsIHBhdHRlcm4sIGZsYWdzXSA9IHBhcmFtZXRlcnMuc2VhcmNocmVnZXgubWF0Y2goLyhcXC8/KSguKylcXDEoW2Etel0qKS9pKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKHBhdHRlcm4sIGZsYWdzKTtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGRhdGEucmVwbGFjZShyZWdleCwgcGFyYW1ldGVycy5yZXBsYWNlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWNjZXNzKHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoYENhbid0IHBhcnNlICR7cGFyYW1ldGVycy5zZWFyY2hyZWdleH0gYXMgUmVnRXhgKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWlsdXJlKHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IGRhdGEucmVwbGFjZUFsbChwYXJhbWV0ZXJzLnNlYXJjaCwgcGFyYW1ldGVycy5yZXBsYWNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN1Y2Nlc3MocGFyYW1ldGVycyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGF3YWl0IHRoaXMud3JpdGVBbmRPcGVuRmlsZShmaWxlLnBhdGgsIGRhdGEsIHBhcmFtZXRlcnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3IE5vdGljZShcIkNhbm5vdCBmaW5kIGZpbGVcIik7XG4gICAgICAgICAgICB0aGlzLmZhaWx1cmUocGFyYW1ldGVycyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBoYW5kbGVXcml0ZShwYXJhbWV0ZXJzOiBQYXJhbWV0ZXJzLCBjcmVhdGVkRGFpbHlOb3RlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgcGF0aCA9IHBhcmFtZXRlcnMuZmlsZXBhdGg7XG4gICAgICAgIGNvbnN0IGZpbGUgPSB0aGlzLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgocGF0aCk7XG5cbiAgICAgICAgaWYgKHBhcmFtZXRlcnMubW9kZSA9PT0gXCJvdmVyd3JpdGVcIikge1xuICAgICAgICAgICAgdGhpcy53cml0ZUFuZE9wZW5GaWxlKHBhdGgsIHBhcmFtZXRlcnMuZGF0YSwgcGFyYW1ldGVycyk7XG4gICAgICAgICAgICB0aGlzLnN1Y2Nlc3MocGFyYW1ldGVycyk7XG4gICAgICAgIH0gZWxzZSBpZiAocGFyYW1ldGVycy5tb2RlID09PSBcInByZXBlbmRcIikge1xuICAgICAgICAgICAgaWYgKGZpbGUgaW5zdGFuY2VvZiBURmlsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJlcGVuZChmaWxlLCBwYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVwZW5kKHBhdGgsIHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zdWNjZXNzKHBhcmFtZXRlcnMpO1xuICAgICAgICB9IGVsc2UgaWYgKHBhcmFtZXRlcnMubW9kZSA9PT0gXCJhcHBlbmRcIikge1xuICAgICAgICAgICAgaWYgKGZpbGUgaW5zdGFuY2VvZiBURmlsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kKGZpbGUsIHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZChwYXRoLCBwYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3VjY2VzcyhwYXJhbWV0ZXJzKTtcbiAgICAgICAgfSBlbHNlIGlmICghY3JlYXRlZERhaWx5Tm90ZSAmJiBmaWxlIGluc3RhbmNlb2YgVEZpbGUpIHtcbiAgICAgICAgICAgIG5ldyBOb3RpY2UoXCJGaWxlIGFscmVhZHkgZXhpc3RzXCIpO1xuICAgICAgICAgICAgdGhpcy5mYWlsdXJlKHBhcmFtZXRlcnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy53cml0ZUFuZE9wZW5GaWxlKHBhdGgsIHBhcmFtZXRlcnMuZGF0YSwgcGFyYW1ldGVycyk7XG4gICAgICAgICAgICB0aGlzLnN1Y2Nlc3MocGFyYW1ldGVycyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBoYW5kbGVPcGVuKHBhcmFtZXRlcnM6IFBhcmFtZXRlcnMpIHtcbiAgICAgICAgbGV0IGZpbGVJc0FscmVhZHlPcGVuZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLml0ZXJhdGVBbGxMZWF2ZXMobGVhZiA9PiB7XG4gICAgICAgICAgICBpZiAobGVhZi52aWV3LmZpbGU/LnBhdGggPT09IHBhcmFtZXRlcnMuZmlsZXBhdGgpIHtcbiAgICAgICAgICAgICAgICBmaWxlSXNBbHJlYWR5T3BlbmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2Uuc2V0QWN0aXZlTGVhZihsZWFmLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChmaWxlSXNBbHJlYWR5T3BlbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBsZWFmID0gdGhpcy5hcHAud29ya3NwYWNlLmFjdGl2ZUxlYWY7XG4gICAgICAgICAgICBpZiAocGFyYW1ldGVycy52aWV3bW9kZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgdmlld1N0YXRlID0gbGVhZi5nZXRWaWV3U3RhdGUoKTtcbiAgICAgICAgICAgICAgICB2aWV3U3RhdGUuc3RhdGUubW9kZSA9IHBhcmFtZXRlcnMudmlld21vZGU7XG4gICAgICAgICAgICAgICAgaWYgKHZpZXdTdGF0ZS5zdGF0ZS5zb3VyY2UgIT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICB2aWV3U3RhdGUuc3RhdGUuc291cmNlID0gcGFyYW1ldGVycy52aWV3bW9kZSA9PSBcInNvdXJjZVwiO1xuICAgICAgICAgICAgICAgIGF3YWl0IGxlYWYuc2V0Vmlld1N0YXRlKHZpZXdTdGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmFtZXRlcnMuaGVhZGluZyAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuYXBwLndvcmtzcGFjZS5vcGVuTGlua1RleHQocGFyYW1ldGVycy5maWxlcGF0aCArIFwiI1wiICsgcGFyYW1ldGVycy5oZWFkaW5nLCBcIlwiLCB0aGlzLnNldHRpbmdzLm9wZW5GaWxlV2l0aG91dFdyaXRlSW5OZXdQYW5lLCB0aGlzLmdldFZpZXdTdGF0ZUZyb21Nb2RlKHBhcmFtZXRlcnMpKTtcbiAgICAgICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlVmlld09mVHlwZShNYXJrZG93blZpZXcpO1xuICAgICAgICAgICAgaWYgKCF2aWV3KSByZXR1cm47XG4gICAgICAgICAgICBjb25zdCBjYWNoZSA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKHZpZXcuZmlsZSk7XG4gICAgICAgICAgICBjb25zdCBoZWFkaW5nID0gY2FjaGUuaGVhZGluZ3MuZmluZCgoZSkgPT4gZS5oZWFkaW5nID09PSBwYXJhbWV0ZXJzLmhlYWRpbmcpO1xuICAgICAgICAgICAgdmlldy5lZGl0b3IuZm9jdXMoKTtcbiAgICAgICAgICAgIHZpZXcuZWRpdG9yLnNldEN1cnNvcih7IGxpbmU6IGhlYWRpbmcucG9zaXRpb24uc3RhcnQubGluZSArIDEsIGNoOiAwIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHBhcmFtZXRlcnMuYmxvY2sgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmFwcC53b3Jrc3BhY2Uub3BlbkxpbmtUZXh0KHBhcmFtZXRlcnMuZmlsZXBhdGggKyBcIiNeXCIgKyBwYXJhbWV0ZXJzLmJsb2NrLCBcIlwiLCB0aGlzLnNldHRpbmdzLm9wZW5GaWxlV2l0aG91dFdyaXRlSW5OZXdQYW5lLCB0aGlzLmdldFZpZXdTdGF0ZUZyb21Nb2RlKHBhcmFtZXRlcnMpKTtcbiAgICAgICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlVmlld09mVHlwZShNYXJrZG93blZpZXcpO1xuICAgICAgICAgICAgaWYgKCF2aWV3KSByZXR1cm47XG4gICAgICAgICAgICBjb25zdCBjYWNoZSA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKHZpZXcuZmlsZSk7XG4gICAgICAgICAgICBjb25zdCBibG9jayA9IGNhY2hlLmJsb2Nrc1twYXJhbWV0ZXJzLmJsb2NrXTtcbiAgICAgICAgICAgIHZpZXcuZWRpdG9yLmZvY3VzKCk7XG4gICAgICAgICAgICB2aWV3LmVkaXRvci5zZXRDdXJzb3IoeyBsaW5lOiBibG9jay5wb3NpdGlvbi5zdGFydC5saW5lLCBjaDogMCB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICghZmlsZUlzQWxyZWFkeU9wZW5lZClcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmFwcC53b3Jrc3BhY2Uub3BlbkxpbmtUZXh0KHBhcmFtZXRlcnMuZmlsZXBhdGgsIFwiXCIsIHRoaXMuc2V0dGluZ3Mub3BlbkZpbGVXaXRob3V0V3JpdGVJbk5ld1BhbmUsIHRoaXMuZ2V0Vmlld1N0YXRlRnJvbU1vZGUocGFyYW1ldGVycykpO1xuICAgICAgICAgICAgaWYgKHBhcmFtZXRlcnMubGluZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEN1cnNvckluTGluZShwYXJhbWV0ZXJzLmxpbmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJhbWV0ZXJzLm1vZGUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnNldEN1cnNvcihwYXJhbWV0ZXJzLm1vZGUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3VjY2VzcyhwYXJhbWV0ZXJzKTtcbiAgICB9XG5cbiAgICBhc3luYyBhcHBlbmQoZmlsZTogVEZpbGUgfCBzdHJpbmcsIHBhcmFtZXRlcnM6IFBhcmFtZXRlcnMpIHtcbiAgICAgICAgbGV0IHBhdGg6IHN0cmluZztcbiAgICAgICAgbGV0IGRhdGFUb1dyaXRlOiBzdHJpbmc7XG4gICAgICAgIGlmIChwYXJhbWV0ZXJzLmhlYWRpbmcpIHtcbiAgICAgICAgICAgIGlmIChmaWxlIGluc3RhbmNlb2YgVEZpbGUpIHtcbiAgICAgICAgICAgICAgICBwYXRoID0gZmlsZS5wYXRoO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmUgPSB0aGlzLmdldEVuZEFuZEJlZ2lubmluZ09mSGVhZGluZyhmaWxlLCBwYXJhbWV0ZXJzLmhlYWRpbmcpPy5sYXN0TGluZTtcbiAgICAgICAgICAgICAgICBpZiAobGluZSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5hcHAudmF1bHQucmVhZChmaWxlKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lcyA9IGRhdGEuc3BsaXQoXCJcXG5cIik7XG5cbiAgICAgICAgICAgICAgICBsaW5lcy5zcGxpY2UobGluZSwgMCwgLi4ucGFyYW1ldGVycy5kYXRhLnNwbGl0KFwiXFxuXCIpKTtcbiAgICAgICAgICAgICAgICBkYXRhVG9Xcml0ZSA9IGxpbmVzLmpvaW4oXCJcXG5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgZmlsZURhdGE6IHN0cmluZztcbiAgICAgICAgICAgIGlmIChmaWxlIGluc3RhbmNlb2YgVEZpbGUpIHtcbiAgICAgICAgICAgICAgICBmaWxlRGF0YSA9IGF3YWl0IHRoaXMuYXBwLnZhdWx0LnJlYWQoZmlsZSk7XG4gICAgICAgICAgICAgICAgcGF0aCA9IGZpbGUucGF0aDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGF0aCA9IGZpbGU7XG4gICAgICAgICAgICAgICAgZmlsZURhdGEgPSBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGF0YVRvV3JpdGUgPSBmaWxlRGF0YSArIFwiXFxuXCIgKyBwYXJhbWV0ZXJzLmRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53cml0ZUFuZE9wZW5GaWxlKHBhdGgsIGRhdGFUb1dyaXRlLCBwYXJhbWV0ZXJzKTtcbiAgICB9XG5cbiAgICBhc3luYyBwcmVwZW5kKGZpbGU6IFRGaWxlIHwgc3RyaW5nLCBwYXJhbWV0ZXJzOiBQYXJhbWV0ZXJzKSB7XG4gICAgICAgIGxldCBwYXRoOiBzdHJpbmc7XG4gICAgICAgIGxldCBkYXRhVG9Xcml0ZTogc3RyaW5nO1xuICAgICAgICBpZiAocGFyYW1ldGVycy5oZWFkaW5nKSB7XG4gICAgICAgICAgICBpZiAoZmlsZSBpbnN0YW5jZW9mIFRGaWxlKSB7XG4gICAgICAgICAgICAgICAgcGF0aCA9IGZpbGUucGF0aDtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lID0gdGhpcy5nZXRFbmRBbmRCZWdpbm5pbmdPZkhlYWRpbmcoZmlsZSwgcGFyYW1ldGVycy5oZWFkaW5nKT8uZmlyc3RMaW5lO1xuICAgICAgICAgICAgICAgIGlmIChsaW5lID09PSB1bmRlZmluZWQpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLmFwcC52YXVsdC5yZWFkKGZpbGUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVzID0gZGF0YS5zcGxpdChcIlxcblwiKTtcblxuICAgICAgICAgICAgICAgIGxpbmVzLnNwbGljZShsaW5lLCAwLCAuLi5wYXJhbWV0ZXJzLmRhdGEuc3BsaXQoXCJcXG5cIikpO1xuICAgICAgICAgICAgICAgIGRhdGFUb1dyaXRlID0gbGluZXMuam9pbihcIlxcblwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGZpbGUgaW5zdGFuY2VvZiBURmlsZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVEYXRhID0gYXdhaXQgdGhpcy5hcHAudmF1bHQucmVhZChmaWxlKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjYWNoZSA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKGZpbGUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNhY2hlLmZyb250bWF0dGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpbmUgPSBjYWNoZS5mcm9udG1hdHRlci5wb3NpdGlvbi5lbmQubGluZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlyc3QgPSBmaWxlRGF0YS5zcGxpdChcIlxcblwiKS5zbGljZSgwLCBsaW5lICsgMSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdCA9IGZpbGVEYXRhLnNwbGl0KFwiXFxuXCIpLnNsaWNlKGxpbmUgKyAxKS5qb2luKFwiXFxuXCIpO1xuICAgICAgICAgICAgICAgICAgICBkYXRhVG9Xcml0ZSA9IGZpcnN0ICsgXCJcXG5cIiArIHBhcmFtZXRlcnMuZGF0YSArIFwiXFxuXCIgKyBsYXN0O1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YVRvV3JpdGUgPSBwYXJhbWV0ZXJzLmRhdGEgKyBcIlxcblwiICsgZmlsZURhdGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhdGggPSBmaWxlLnBhdGg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhdGggPSBmaWxlO1xuICAgICAgICAgICAgICAgIGRhdGFUb1dyaXRlID0gcGFyYW1ldGVycy5kYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMud3JpdGVBbmRPcGVuRmlsZShwYXRoLCBkYXRhVG9Xcml0ZSwgcGFyYW1ldGVycyk7XG4gICAgfVxuXG4gICAgYXN5bmMgd3JpdGVBbmRPcGVuRmlsZShvdXRwdXRGaWxlTmFtZTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcsIHBhcmFtZXRlcnM6IFBhcmFtZXRlcnMpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5hcHAudmF1bHQuYWRhcHRlci53cml0ZShvdXRwdXRGaWxlTmFtZSwgdGV4dCk7XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLm9wZW5GaWxlT25Xcml0ZSkge1xuICAgICAgICAgICAgbGV0IGZpbGVJc0FscmVhZHlPcGVuZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5pdGVyYXRlQWxsTGVhdmVzKGxlYWYgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChsZWFmLnZpZXcuZmlsZT8ucGF0aCA9PT0gb3V0cHV0RmlsZU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZUlzQWxyZWFkeU9wZW5lZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5zZXRBY3RpdmVMZWFmKGxlYWYsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFmaWxlSXNBbHJlYWR5T3BlbmVkKVxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuYXBwLndvcmtzcGFjZS5vcGVuTGlua1RleHQob3V0cHV0RmlsZU5hbWUsIFwiXCIsIHRoaXMuc2V0dGluZ3Mub3BlbkZpbGVPbldyaXRlSW5OZXdQYW5lLCB0aGlzLmdldFZpZXdTdGF0ZUZyb21Nb2RlKHBhcmFtZXRlcnMpKTtcbiAgICAgICAgICAgIGlmIChwYXJhbWV0ZXJzLmxpbmUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRDdXJzb3JJbkxpbmUocGFyYW1ldGVycy5saW5lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEVuZEFuZEJlZ2lubmluZ09mSGVhZGluZyhmaWxlOiBURmlsZSwgaGVhZGluZzogc3RyaW5nKTogeyBcImxhc3RMaW5lXCI6IG51bWJlciwgXCJmaXJzdExpbmVcIjogbnVtYmVyOyB9IHtcbiAgICAgICAgY29uc3QgY2FjaGUgPSB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldEZpbGVDYWNoZShmaWxlKTtcbiAgICAgICAgY29uc3Qgc2VjdGlvbnMgPSBjYWNoZS5zZWN0aW9ucztcbiAgICAgICAgY29uc3QgZm91bmRIZWFkaW5nID0gY2FjaGUuaGVhZGluZ3M/LmZpbmQoZSA9PiBlLmhlYWRpbmcgPT09IGhlYWRpbmcpO1xuXG5cbiAgICAgICAgaWYgKGZvdW5kSGVhZGluZykge1xuICAgICAgICAgICAgY29uc3QgZm91bmRTZWN0aW9uSW5kZXggPSBzZWN0aW9ucy5maW5kSW5kZXgoc2VjdGlvbiA9PiBzZWN0aW9uLnR5cGUgPT09IFwiaGVhZGluZ1wiICYmIHNlY3Rpb24ucG9zaXRpb24uc3RhcnQubGluZSA9PT0gZm91bmRIZWFkaW5nLnBvc2l0aW9uLnN0YXJ0LmxpbmUpO1xuICAgICAgICAgICAgY29uc3QgcmVzdFNlY3Rpb25zID0gc2VjdGlvbnMuc2xpY2UoZm91bmRTZWN0aW9uSW5kZXggKyAxKTtcblxuICAgICAgICAgICAgY29uc3QgbmV4dEhlYWRpbmdJbmRleCA9IHJlc3RTZWN0aW9ucz8uZmluZEluZGV4KGUgPT4gZS50eXBlID09PSBcImhlYWRpbmdcIik7XG5cbiAgICAgICAgICAgIGNvbnN0IGxhc3RTZWN0aW9uID0gcmVzdFNlY3Rpb25zWyhuZXh0SGVhZGluZ0luZGV4ICE9PSAtMSA/IG5leHRIZWFkaW5nSW5kZXggOiByZXN0U2VjdGlvbnMubGVuZ3RoKSAtIDFdID8/IHNlY3Rpb25zW2ZvdW5kU2VjdGlvbkluZGV4XTtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RMaW5lID0gbGFzdFNlY3Rpb24ucG9zaXRpb24uZW5kLmxpbmUgKyAxO1xuXG4gICAgICAgICAgICByZXR1cm4geyBcImxhc3RMaW5lXCI6IGxhc3RMaW5lLCBcImZpcnN0TGluZVwiOiBzZWN0aW9uc1tmb3VuZFNlY3Rpb25JbmRleF0ucG9zaXRpb24uZW5kLmxpbmUgKyAxIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXcgTm90aWNlKFwiQ2FuJ3QgZmluZCBoZWFkaW5nXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgc2V0Q3Vyc29yKG1vZGU6IFBhcmFtZXRlcnNbXCJtb2RlXCJdKSB7XG4gICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlVmlld09mVHlwZShNYXJrZG93blZpZXcpO1xuICAgICAgICBpZiAodmlldykge1xuICAgICAgICAgICAgY29uc3QgZWRpdG9yID0gdmlldy5lZGl0b3I7XG5cbiAgICAgICAgICAgIGxldCB2aWV3U3RhdGUgPSB2aWV3LmxlYWYuZ2V0Vmlld1N0YXRlKCk7XG4gICAgICAgICAgICB2aWV3U3RhdGUuc3RhdGUubW9kZSA9IFwic291cmNlXCI7XG5cbiAgICAgICAgICAgIGlmIChtb2RlID09PSBcImFwcGVuZFwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdExpbmUgPSBlZGl0b3IubGFzdExpbmUoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0TGluZUxlbmd0aCA9IGVkaXRvci5nZXRMaW5lKGxhc3RMaW5lKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgYXdhaXQgdmlldy5sZWFmLnNldFZpZXdTdGF0ZSh2aWV3U3RhdGUsIHsgZm9jdXM6IHRydWUgfSk7XG5cbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2V0Q3Vyc29yKHsgY2g6IGxhc3RMaW5lTGVuZ3RoLCBsaW5lOiBsYXN0TGluZSB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobW9kZSA9PT0gXCJwcmVwZW5kXCIpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB2aWV3LmxlYWYuc2V0Vmlld1N0YXRlKHZpZXdTdGF0ZSwgeyBmb2N1czogdHJ1ZSB9KTtcblxuICAgICAgICAgICAgICAgIGVkaXRvci5zZXRDdXJzb3IoeyBjaDogMCwgbGluZTogMCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEN1cnNvckluTGluZShyYXdMaW5lOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgdmlldyA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldyk7XG4gICAgICAgIGlmICghdmlldykgcmV0dXJuO1xuICAgICAgICBjb25zdCBsaW5lID0gTWF0aC5taW4ocmF3TGluZSAtIDEsIHZpZXcuZWRpdG9yLmxpbmVDb3VudCgpIC0gMSk7XG4gICAgICAgIHZpZXcuZWRpdG9yLmZvY3VzKCk7XG4gICAgICAgIHZpZXcuZWRpdG9yLnNldEN1cnNvcih7IGxpbmU6IGxpbmUsIGNoOiB2aWV3LmVkaXRvci5nZXRMaW5lKGxpbmUpLmxlbmd0aCB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVDb3B5RmlsZVVSSSgpIHtcbiAgICAgICAgY29uc3QgdmlldyA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldyk7XG4gICAgICAgIGlmICghdmlldykgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IHBvcyA9IHZpZXcuZWRpdG9yLmdldEN1cnNvcigpO1xuICAgICAgICBjb25zdCBjYWNoZSA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKHZpZXcuZmlsZSk7XG4gICAgICAgIGlmIChjYWNoZS5oZWFkaW5ncykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBoZWFkaW5nIG9mIGNhY2hlLmhlYWRpbmdzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGhlYWRpbmcucG9zaXRpb24uc3RhcnQubGluZSA8PSBwb3MubGluZSAmJiBoZWFkaW5nLnBvc2l0aW9uLmVuZC5saW5lID49IHBvcy5saW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29weVVSSSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlcGF0aDogdmlldy5maWxlLnBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkaW5nOiBoZWFkaW5nLmhlYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhY2hlLmJsb2Nrcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBibG9ja0lEIG9mIE9iamVjdC5rZXlzKGNhY2hlLmJsb2NrcykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBibG9jayA9IGNhY2hlLmJsb2Nrc1tibG9ja0lEXTtcbiAgICAgICAgICAgICAgICBpZiAoYmxvY2sucG9zaXRpb24uc3RhcnQubGluZSA8PSBwb3MubGluZSAmJiBibG9jay5wb3NpdGlvbi5lbmQubGluZSA+PSBwb3MubGluZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvcHlVUkkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZXBhdGg6IHZpZXcuZmlsZS5wYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2s6IGJsb2NrSURcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmlsZU1vZGFsID0gbmV3IEZpbGVNb2RhbCh0aGlzLCBcIkNob29zZSBhIGZpbGVcIiwgZmFsc2UpO1xuICAgICAgICBmaWxlTW9kYWwub3BlbigpO1xuICAgICAgICBmaWxlTW9kYWwub25DaG9vc2VJdGVtID0gKGl0ZW0sIF8pID0+IHtcbiAgICAgICAgICAgIG5ldyBFbnRlckRhdGFNb2RhbCh0aGlzLCBpdGVtLnNvdXJjZSkub3BlbigpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZU9wZW5TZXR0aW5ncyhwYXJhbWV0ZXJzOiBQYXJhbWV0ZXJzKSB7XG4gICAgICAgIGlmICh0aGlzLmFwcC5zZXR0aW5nLmNvbnRhaW5lckVsLnBhcmVudEVsZW1lbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwLnNldHRpbmcub3BlbigpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJhbWV0ZXJzLnNldHRpbmdpZCA9PSBcInBsdWdpbi1icm93c2VyXCIpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwLnNldHRpbmcub3BlblRhYkJ5SWQoXCJjb21tdW5pdHktcGx1Z2luc1wiKTtcbiAgICAgICAgICAgIHRoaXMuYXBwLnNldHRpbmcuYWN0aXZlVGFiLmNvbnRhaW5lckVsLmZpbmQoXCIubW9kLWN0YVwiKS5jbGljaygpO1xuICAgICAgICB9IGVsc2UgaWYgKHBhcmFtZXRlcnMuc2V0dGluZ2lkID09IFwidGhlbWUtYnJvd3NlclwiKSB7XG4gICAgICAgICAgICB0aGlzLmFwcC5zZXR0aW5nLm9wZW5UYWJCeUlkKFwiYXBwZWFyYW5jZVwiKTtcbiAgICAgICAgICAgIHRoaXMuYXBwLnNldHRpbmcuYWN0aXZlVGFiLmNvbnRhaW5lckVsLmZpbmQoXCIubW9kLWN0YVwiKS5jbGljaygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hcHAuc2V0dGluZy5vcGVuVGFiQnlJZChwYXJhbWV0ZXJzLnNldHRpbmdpZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdWNjZXNzKHBhcmFtZXRlcnMpO1xuICAgIH1cblxuICAgIGFzeW5jIGhhbmRsZVVwZGF0ZVBsdWdpbnMocGFyYW1ldGVyczogUGFyYW1ldGVycykge1xuICAgICAgICBwYXJhbWV0ZXJzLnNldHRpbmdpZCA9IFwiY29tbXVuaXR5LXBsdWdpbnNcIjtcbiAgICAgICAgdGhpcy5oYW5kbGVPcGVuU2V0dGluZ3MocGFyYW1ldGVycyk7XG4gICAgICAgIHRoaXMuYXBwLnNldHRpbmcuYWN0aXZlVGFiLmNvbnRhaW5lckVsLmZpbmRBbGwoXCIubW9kLWN0YVwiKS5sYXN0KCkuY2xpY2soKTtcbiAgICAgICAgbmV3IE5vdGljZShcIldhaXRpbmcgMTAgc2Vjb25kc1wiKTtcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwICogMTAwMCkpO1xuXG4gICAgICAgIGlmIChPYmplY3Qua2V5cygodGhpcy5hcHAgYXMgYW55KS5wbHVnaW5zLnVwZGF0ZXMpLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5hcHAuc2V0dGluZy5hY3RpdmVUYWIuY29udGFpbmVyRWwuZmluZEFsbChcIi5tb2QtY3RhXCIpLmxhc3QoKS5jbGljaygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3VjY2VzcyhwYXJhbWV0ZXJzKTtcbiAgICB9XG5cbiAgICBhc3luYyBnZW5lcmF0ZVVSSShwYXJhbWV0ZXJzOiBQYXJhbWV0ZXJzKSB7XG4gICAgICAgIGxldCB1cmkgPSBgb2JzaWRpYW46Ly9hZHZhbmNlZC11cmk/dmF1bHQ9JHt0aGlzLmFwcC52YXVsdC5nZXROYW1lKCl9YDtcbiAgICAgICAgY29uc3QgZmlsZSA9IHRoaXMuYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChwYXJhbWV0ZXJzLmZpbGVwYXRoKTtcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MudXNlVUlEICYmIGZpbGUgaW5zdGFuY2VvZiBURmlsZSkge1xuICAgICAgICAgICAgcGFyYW1ldGVycy5maWxlcGF0aCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHBhcmFtZXRlcnMudWlkID0gYXdhaXQgdGhpcy5nZXRVSURGcm9tRmlsZShmaWxlKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHBhcmFtZXRlciBpbiBwYXJhbWV0ZXJzKSB7XG5cbiAgICAgICAgICAgIGlmICgocGFyYW1ldGVycyBhcyBhbnkpW3BhcmFtZXRlcl0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdXJpID0gdXJpICsgYCYke3BhcmFtZXRlcn09JHtlbmNvZGVVUklDb21wb25lbnQoKHBhcmFtZXRlcnMgYXMgYW55KVtwYXJhbWV0ZXJdKX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cmk7XG4gICAgfVxuXG4gICAgYXN5bmMgY29weVVSSShwYXJhbWV0ZXJzOiBQYXJhbWV0ZXJzKSB7XG4gICAgICAgIGNvbnN0IHVyaSA9IGF3YWl0IHRoaXMuZ2VuZXJhdGVVUkkocGFyYW1ldGVycyk7XG4gICAgICAgIGF3YWl0IHRoaXMuY29weVRleHQoZW5jb2RlVVJJKHVyaSkpO1xuXG4gICAgICAgIG5ldyBOb3RpY2UoXCJBZHZhbmNlZCBVUkkgY29waWVkIHRvIHlvdXIgY2xpcGJvYXJkXCIpO1xuICAgIH1cblxuICAgIGNvcHlUZXh0KHRleHQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQodGV4dCk7XG4gICAgfTtcblxuICAgIGFzeW5jIGdldFVJREZyb21GaWxlKGZpbGU6IFRGaWxlKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgZmlsZUNvbnRlbnQ6IHN0cmluZyA9IGF3YWl0IHRoaXMuYXBwLnZhdWx0LnJlYWQoZmlsZSk7XG4gICAgICAgIGNvbnN0IGZyb250bWF0dGVyID0gdGhpcy5hcHAubWV0YWRhdGFDYWNoZS5nZXRGaWxlQ2FjaGUoZmlsZSkuZnJvbnRtYXR0ZXI7XG4gICAgICAgIGxldCB1aWQgPSBwYXJzZUZyb250TWF0dGVyRW50cnkoZnJvbnRtYXR0ZXIsIHRoaXMuc2V0dGluZ3MuaWRGaWVsZCk7XG4gICAgICAgIGlmICh1aWQpIHJldHVybiB1aWQ7XG4gICAgICAgIGNvbnN0IGlzWWFtbEVtcHR5OiBib29sZWFuID0gKCghZnJvbnRtYXR0ZXIgfHwgZnJvbnRtYXR0ZXIubGVuZ3RoID09PSAwKSAmJiAhZmlsZUNvbnRlbnQubWF0Y2goL14tezN9XFxzKlxcbipcXHIqLXszfS8pKTtcbiAgICAgICAgdWlkID0gdXVpZHY0KCk7XG4gICAgICAgIGxldCBzcGxpdENvbnRlbnQgPSBmaWxlQ29udGVudC5zcGxpdChcIlxcblwiKTtcbiAgICAgICAgaWYgKGlzWWFtbEVtcHR5KSB7XG4gICAgICAgICAgICBzcGxpdENvbnRlbnQudW5zaGlmdChcIi0tLVwiKTtcbiAgICAgICAgICAgIHNwbGl0Q29udGVudC51bnNoaWZ0KGAke3RoaXMuc2V0dGluZ3MuaWRGaWVsZH06ICR7dWlkfWApO1xuICAgICAgICAgICAgc3BsaXRDb250ZW50LnVuc2hpZnQoXCItLS1cIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzcGxpdENvbnRlbnQuc3BsaWNlKDEsIDAsIGAke3RoaXMuc2V0dGluZ3MuaWRGaWVsZH06ICR7dWlkfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV3RmlsZUNvbnRlbnQgPSBzcGxpdENvbnRlbnQuam9pbihcIlxcblwiKTtcbiAgICAgICAgYXdhaXQgdGhpcy5hcHAudmF1bHQubW9kaWZ5KGZpbGUsIG5ld0ZpbGVDb250ZW50KTtcbiAgICAgICAgcmV0dXJuIHVpZDtcbiAgICB9O1xuXG4gICAgZ2V0Vmlld1N0YXRlRnJvbU1vZGUocGFyYW1ldGVyczogUGFyYW1ldGVycykge1xuICAgICAgICByZXR1cm4gcGFyYW1ldGVycy52aWV3bW9kZSA/IHsgc3RhdGU6IHsgbW9kZTogcGFyYW1ldGVycy52aWV3bW9kZSB9IH0gOiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGFzeW5jIGxvYWRTZXR0aW5ncygpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oREVGQVVMVF9TRVRUSU5HUywgYXdhaXQgdGhpcy5sb2FkRGF0YSgpKTtcbiAgICB9XG5cbiAgICBhc3luYyBzYXZlU2V0dGluZ3MoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XG4gICAgfVxufVxuY2xhc3MgU2V0dGluZ3NUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcbiAgICBwbHVnaW46IEFkdmFuY2VkVVJJO1xuICAgIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IEFkdmFuY2VkVVJJKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgcGx1Z2luKTtcbiAgICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gICAgfVxuXG4gICAgZGlzcGxheSgpOiB2b2lkIHtcbiAgICAgICAgbGV0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XG4gICAgICAgIGNvbnRhaW5lckVsLmVtcHR5KCk7XG4gICAgICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiB0aGlzLnBsdWdpbi5tYW5pZmVzdC5uYW1lIH0pO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJPcGVuIGZpbGUgb24gd3JpdGVcIilcbiAgICAgICAgICAgIC5hZGRUb2dnbGUoY2IgPT4gY2Iub25DaGFuZ2UodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLm9wZW5GaWxlT25Xcml0ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgfSkuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Mub3BlbkZpbGVPbldyaXRlKSk7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZShcIk9wZW4gZmlsZSBvbiB3cml0ZSBpbiBhIG5ldyBwYW5lXCIpXG4gICAgICAgICAgICAuc2V0RGlzYWJsZWQodGhpcy5wbHVnaW4uc2V0dGluZ3Mub3BlbkZpbGVPbldyaXRlKVxuICAgICAgICAgICAgLmFkZFRvZ2dsZShjYiA9PiBjYi5vbkNoYW5nZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Mub3BlbkZpbGVPbldyaXRlSW5OZXdQYW5lID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB9KS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5vcGVuRmlsZU9uV3JpdGVJbk5ld1BhbmUpKTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiT3BlbiBkYWlseSBub3RlIGluIGEgbmV3IHBhbmVcIilcbiAgICAgICAgICAgIC5hZGRUb2dnbGUoY2IgPT4gY2Iub25DaGFuZ2UodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLm9wZW5EYWlseUluTmV3UGFuZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgfSkuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Mub3BlbkRhaWx5SW5OZXdQYW5lKSk7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZShcIk9wZW4gZmlsZSB3aXRob3V0IHdyaXRlIGluIG5ldyBwYW5lXCIpXG4gICAgICAgICAgICAuYWRkVG9nZ2xlKGNiID0+IGNiLm9uQ2hhbmdlKHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5vcGVuRmlsZVdpdGhvdXRXcml0ZUluTmV3UGFuZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgfSkuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Mub3BlbkZpbGVXaXRob3V0V3JpdGVJbk5ld1BhbmUpKTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiVXNlIFVJRCBpbnN0ZWFkIG9mIGZpbGUgcGF0aHNcIilcbiAgICAgICAgICAgIC5hZGRUb2dnbGUoY2IgPT4gY2Iub25DaGFuZ2UodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnVzZVVJRCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgfSkuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MudXNlVUlEKSk7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZShcIlVJRCBmaWVsZCBpbiBmcm9udG1hdHRlclwiKVxuICAgICAgICAgICAgLmFkZFRleHQoY2IgPT4gY2Iub25DaGFuZ2UodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmlkRmllbGQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIH0pLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmlkRmllbGQpKTtcblxuICAgIH1cbn1cblxuaW50ZXJmYWNlIEVudGVyRGF0YSB7XG4gICAgbW9kZTogc3RyaW5nO1xuICAgIGRhdGE6IHN0cmluZyxcbiAgICBkaXNwbGF5OiBzdHJpbmcsXG4gICAgZnVuYzogRnVuY3Rpb24sXG59XG5cbmNsYXNzIEVudGVyRGF0YU1vZGFsIGV4dGVuZHMgU3VnZ2VzdE1vZGFsPEVudGVyRGF0YT4ge1xuICAgIHBsdWdpbjogQWR2YW5jZWRVUkk7XG4gICAgLy9udWxsIGlmIGZvciBub3JtYWwgd3JpdGUgbW9kZSwgaXRzIG5vdCBhc3NvY2lhdGVkIHdpdGggYSBzcGVjaWFsIG1vZGUgbGlrZSBcImFwcGVuZFwiIG9yIFwicHJlcGVuZFwiXG4gICAgbW9kZXMgPSBbbnVsbCwgXCJvdmVyd3JpdGVcIiwgXCJhcHBlbmRcIiwgXCJwcmVwZW5kXCJdO1xuICAgIGZpbGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKHBsdWdpbjogQWR2YW5jZWRVUkksIGZpbGU/OiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIocGx1Z2luLmFwcCk7XG4gICAgICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICAgICAgICB0aGlzLnNldFBsYWNlaG9sZGVyKFwiVHlwZSB5b3VyIGRhdGEgdG8gYmUgd3JpdHRlbiB0byB0aGUgZmlsZSBvciBsZWF2ZSBpdCBlbXB0eSB0byBqdXN0IG9wZW4gaXRcIik7XG4gICAgICAgIHRoaXMuZmlsZSA9IGZpbGU7XG4gICAgfVxuXG5cbiAgICBnZXRTdWdnZXN0aW9ucyhxdWVyeTogc3RyaW5nKTogRW50ZXJEYXRhW10ge1xuICAgICAgICBpZiAocXVlcnkgPT0gXCJcIikgcXVlcnkgPSBudWxsO1xuXG4gICAgICAgIGxldCBzdWdnZXN0aW9uczogRW50ZXJEYXRhW10gPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBtb2RlIG9mIHRoaXMubW9kZXMpIHtcbiAgICAgICAgICAgIGlmICghKG1vZGUgPT09IFwib3ZlcndyaXRlXCIgJiYgIXF1ZXJ5KSkge1xuICAgICAgICAgICAgICAgIGxldCBkaXNwbGF5OiBzdHJpbmc7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5ID0gYFdyaXRlIFwiJHtxdWVyeX1cIiBpbiAke21vZGV9IG1vZGVgO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheSA9IGBXcml0ZSBcIiR7cXVlcnl9XCJgO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXkgPSBgT3BlbiBpbiAke21vZGV9IG1vZGVgO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheSA9IGBPcGVuYDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdWdnZXN0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogcXVlcnksXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGRpc3BsYXksXG4gICAgICAgICAgICAgICAgICAgIG1vZGU6IG1vZGUsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmM6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5jb3B5VVJJKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZXBhdGg6IHRoaXMuZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogcXVlcnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU6IG1vZGUgYXMgUGFyYW1ldGVyc1tcIm1vZGVcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uY29weVVSSSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhaWx5OiBcInRydWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogcXVlcnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU6IG1vZGUgYXMgUGFyYW1ldGVyc1tcIm1vZGVcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN1Z2dlc3Rpb25zO1xuICAgIH1cblxuICAgIHJlbmRlclN1Z2dlc3Rpb24odmFsdWU6IEVudGVyRGF0YSwgZWw6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIGVsLmlubmVyVGV4dCA9IHZhbHVlLmRpc3BsYXk7XG4gICAgfTtcblxuICAgIG9uQ2hvb3NlU3VnZ2VzdGlvbihpdGVtOiBFbnRlckRhdGEsIF86IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGl0ZW0uZnVuYygpO1xuICAgIH07XG59XG5cbmludGVyZmFjZSBGaWxlTW9kYWxEYXRhIHtcbiAgICBzb3VyY2U6IHN0cmluZztcbiAgICBkaXNwbGF5OiBzdHJpbmc7XG59XG5cbmNsYXNzIEZpbGVNb2RhbCBleHRlbmRzIEZ1enp5U3VnZ2VzdE1vZGFsPEZpbGVNb2RhbERhdGE+IHtcbiAgICBwbHVnaW46IEFkdmFuY2VkVVJJO1xuICAgIGNvbnN0cnVjdG9yKHBsdWdpbjogQWR2YW5jZWRVUkksIHByaXZhdGUgcGxhY2VIb2xkZXI6IHN0cmluZywgcHJpdmF0ZSBhbGxvd05vRmlsZTogYm9vbGVhbiA9IHRydWUpIHtcbiAgICAgICAgc3VwZXIocGx1Z2luLmFwcCk7XG4gICAgICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICAgICAgICB0aGlzLnNldFBsYWNlaG9sZGVyKHRoaXMucGxhY2VIb2xkZXIpO1xuICAgIH1cblxuICAgIGdldEl0ZW1zKCk6IEZpbGVNb2RhbERhdGFbXSB7XG4gICAgICAgIGxldCBzcGVjaWFsSXRlbXM6IEZpbGVNb2RhbERhdGFbXSA9IFtdO1xuICAgICAgICBpZiAodGhpcy5hbGxvd05vRmlsZSkge1xuICAgICAgICAgICAgc3BlY2lhbEl0ZW1zLnB1c2goeyBkaXNwbGF5OiBcIjxEb24ndCBzcGVjaWZ5IGEgZmlsZT5cIiwgc291cmNlOiB1bmRlZmluZWQgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmlsZSA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVGaWxlKCk7XG4gICAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgICAgICBzcGVjaWFsSXRlbXMucHVzaCh7IGRpc3BsYXk6IFwiPEN1cnJlbnQgZmlsZT5cIiwgc291cmNlOiBmaWxlLnBhdGggfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFsuLi5zcGVjaWFsSXRlbXMsIC4uLnRoaXMuYXBwLnZhdWx0LmdldEZpbGVzKCkubWFwKGUgPT4geyByZXR1cm4geyBkaXNwbGF5OiBlLnBhdGgsIHNvdXJjZTogZS5wYXRoIH07IH0pXTtcbiAgICB9XG5cbiAgICBnZXRJdGVtVGV4dChpdGVtOiBGaWxlTW9kYWxEYXRhKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0uZGlzcGxheTtcbiAgICB9XG5cbiAgICBvbkNob29zZUl0ZW0oaXRlbTogRmlsZU1vZGFsRGF0YSwgZXZ0OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuXG4gICAgfVxufVxuXG5jbGFzcyBDb21tYW5kTW9kYWwgZXh0ZW5kcyBGdXp6eVN1Z2dlc3RNb2RhbDxDb21tYW5kPiB7XG4gICAgcGx1Z2luOiBBZHZhbmNlZFVSSTtcbiAgICBmaWxlOiBzdHJpbmc7XG4gICAgY29uc3RydWN0b3IocGx1Z2luOiBBZHZhbmNlZFVSSSwgZmlsZT86IHN0cmluZykge1xuICAgICAgICBzdXBlcihwbHVnaW4uYXBwKTtcbiAgICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gICAgICAgIHRoaXMuZmlsZSA9IGZpbGU7XG4gICAgfVxuXG4gICAgZ2V0SXRlbXMoKTogQ29tbWFuZFtdIHtcbiAgICAgICAgY29uc3QgcmF3Q29tbWFuZHMgPSB0aGlzLmFwcC5jb21tYW5kcy5jb21tYW5kcztcbiAgICAgICAgY29uc3QgY29tbWFuZHM6IENvbW1hbmRbXSA9IE9iamVjdC5rZXlzKHJhd0NvbW1hbmRzKS5tYXAoZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4geyBpZDogcmF3Q29tbWFuZHNbZV0uaWQsIG5hbWU6IHJhd0NvbW1hbmRzW2VdLm5hbWUgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb21tYW5kcztcbiAgICB9XG5cbiAgICBnZXRJdGVtVGV4dChpdGVtOiBDb21tYW5kKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0ubmFtZTtcbiAgICB9XG5cbiAgICBvbkNob29zZUl0ZW0oaXRlbTogQ29tbWFuZCwgXzogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wbHVnaW4uY29weVVSSSh7XG4gICAgICAgICAgICBmaWxlcGF0aDogdGhpcy5maWxlLFxuICAgICAgICAgICAgY29tbWFuZGlkOiBpdGVtLmlkXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuaW50ZXJmYWNlIFNlYXJjaE1vZGFsRGF0YSB7XG4gICAgc291cmNlOiBzdHJpbmc7XG4gICAgZGlzcGxheTogc3RyaW5nO1xuICAgIGlzUmVnRXg6IGJvb2xlYW47XG59XG5cbmNsYXNzIFNlYXJjaE1vZGFsIGV4dGVuZHMgU3VnZ2VzdE1vZGFsPFNlYXJjaE1vZGFsRGF0YT4ge1xuICAgIHBsdWdpbjogQWR2YW5jZWRVUkk7XG5cbiAgICBjb25zdHJ1Y3RvcihwbHVnaW46IEFkdmFuY2VkVVJJKSB7XG4gICAgICAgIHN1cGVyKHBsdWdpbi5hcHApO1xuICAgICAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgICAgICAgdGhpcy5zZXRQbGFjZWhvbGRlcihcIlNlYXJjaGVkIHRleHQuIFJlZ0V4IGlzIHN1cHBvcnRlZFwiKTtcbiAgICB9XG5cblxuICAgIGdldFN1Z2dlc3Rpb25zKHF1ZXJ5OiBzdHJpbmcpOiBTZWFyY2hNb2RhbERhdGFbXSB7XG4gICAgICAgIGlmIChxdWVyeSA9PT0gXCJcIikge1xuICAgICAgICAgICAgcXVlcnkgPSBcIi4uLlwiO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZWdleDogUmVnRXhwO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVnZXggPSBuZXcgUmVnRXhwKHF1ZXJ5KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHsgfVxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNvdXJjZTogcXVlcnksXG4gICAgICAgICAgICAgICAgaXNSZWdFeDogZmFsc2UsXG4gICAgICAgICAgICAgICAgZGlzcGxheTogcXVlcnlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc291cmNlOiBxdWVyeSxcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiByZWdleCA/IGBBcyBSZWdFeDogJHtxdWVyeX1gIDogYENhbid0IHBhcnNlIFJlZ0V4YCxcbiAgICAgICAgICAgICAgICBpc1JlZ0V4OiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgcmVuZGVyU3VnZ2VzdGlvbih2YWx1ZTogU2VhcmNoTW9kYWxEYXRhLCBlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgZWwuaW5uZXJUZXh0ID0gdmFsdWUuZGlzcGxheTtcbiAgICB9O1xuXG4gICAgb25DaG9vc2VTdWdnZXN0aW9uKGl0ZW06IFNlYXJjaE1vZGFsRGF0YSwgXzogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcblxuICAgIH07XG59XG5cbmNsYXNzIFJlcGxhY2VNb2RhbCBleHRlbmRzIFN1Z2dlc3RNb2RhbDxzdHJpbmc+IHtcbiAgICBwbHVnaW46IEFkdmFuY2VkVVJJO1xuICAgIGVtcHR5VGV4dCA9IFwiRW1wdHkgdGV4dCAocmVwbGFjZSB3aXRoIG5vdGhpbmcpXCI7XG4gICAgY29uc3RydWN0b3IocGx1Z2luOiBBZHZhbmNlZFVSSSwgcHJpdmF0ZSBzZWFyY2g6IFNlYXJjaE1vZGFsRGF0YSwgcHJpdmF0ZSBmaWxlcGF0aDogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKHBsdWdpbi5hcHApO1xuICAgICAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgICAgICAgdGhpcy5zZXRQbGFjZWhvbGRlcihcIlJlcGxhY2VtZW50IHRleHRcIik7XG4gICAgfVxuXG5cbiAgICBnZXRTdWdnZXN0aW9ucyhxdWVyeTogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgICAgICBpZiAocXVlcnkgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHF1ZXJ5ID0gdGhpcy5lbXB0eVRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtxdWVyeV07XG4gICAgfVxuXG4gICAgcmVuZGVyU3VnZ2VzdGlvbih2YWx1ZTogc3RyaW5nLCBlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgZWwuaW5uZXJUZXh0ID0gdmFsdWU7XG4gICAgfTtcblxuICAgIG9uQ2hvb3NlU3VnZ2VzdGlvbihpdGVtOiBzdHJpbmcsIF86IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnNlYXJjaC5pc1JlZ0V4KSB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5jb3B5VVJJKHtcbiAgICAgICAgICAgICAgICBmaWxlcGF0aDogdGhpcy5maWxlcGF0aCxcbiAgICAgICAgICAgICAgICBzZWFyY2hyZWdleDogdGhpcy5zZWFyY2guc291cmNlLFxuICAgICAgICAgICAgICAgIHJlcGxhY2U6IGl0ZW0gPT0gdGhpcy5lbXB0eVRleHQgPyBcIlwiIDogaXRlbVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5jb3B5VVJJKHtcbiAgICAgICAgICAgICAgICBmaWxlcGF0aDogdGhpcy5maWxlcGF0aCxcbiAgICAgICAgICAgICAgICBzZWFyY2g6IHRoaXMuc2VhcmNoLnNvdXJjZSxcbiAgICAgICAgICAgICAgICByZXBsYWNlOiBpdGVtID09IHRoaXMuZW1wdHlUZXh0ID8gXCJcIiA6IGl0ZW1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9O1xufSJdLCJuYW1lcyI6WyJvYnNpZGlhbiIsIm5vcm1hbGl6ZVBhdGgiLCJnZXREYWlseU5vdGVTZXR0aW5ncyIsInBhcnNlRnJvbnRNYXR0ZXJBbGlhc2VzIiwiYXBwSGFzRGFpbHlOb3Rlc1BsdWdpbkxvYWRlZCIsIk5vdGljZSIsImdldEFsbERhaWx5Tm90ZXMiLCJnZXREYWlseU5vdGUiLCJjcmVhdGVEYWlseU5vdGUiLCJNYXJrZG93blZpZXciLCJyZXF1ZXN0IiwicGFyc2VGcm9udE1hdHRlckVudHJ5IiwiVEZpbGUiLCJ1dWlkdjQiLCJQbHVnaW4iLCJTZXR0aW5nIiwiUGx1Z2luU2V0dGluZ1RhYiIsIlN1Z2dlc3RNb2RhbCIsIkZ1enp5U3VnZ2VzdE1vZGFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxhQUFhLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ25DLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO0FBQ3pDLFNBQVMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNwRixRQUFRLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUMxRyxJQUFJLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMvQixDQUFDLENBQUM7QUFDRjtBQUNPLFNBQVMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDaEMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEtBQUssSUFBSTtBQUM3QyxRQUFRLE1BQU0sSUFBSSxTQUFTLENBQUMsc0JBQXNCLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLCtCQUErQixDQUFDLENBQUM7QUFDbEcsSUFBSSxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLElBQUksU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQzNDLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN6RixDQUFDO0FBdUNEO0FBQ08sU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFO0FBQzdELElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0FBQ2hILElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQy9ELFFBQVEsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUNuRyxRQUFRLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUN0RyxRQUFRLFNBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRTtBQUN0SCxRQUFRLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUM5RSxLQUFLLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRDtBQUNPLFNBQVMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUU7QUFDM0MsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3JILElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sTUFBTSxLQUFLLFVBQVUsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFdBQVcsRUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDN0osSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLFVBQVUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUN0RSxJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUUsRUFBRTtBQUN0QixRQUFRLElBQUksQ0FBQyxFQUFFLE1BQU0sSUFBSSxTQUFTLENBQUMsaUNBQWlDLENBQUMsQ0FBQztBQUN0RSxRQUFRLE9BQU8sQ0FBQyxFQUFFLElBQUk7QUFDdEIsWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN6SyxZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEQsWUFBWSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDekIsZ0JBQWdCLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU07QUFDOUMsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUN4RSxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztBQUNqRSxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsU0FBUztBQUNqRSxnQkFBZ0I7QUFDaEIsb0JBQW9CLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUU7QUFDaEksb0JBQW9CLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7QUFDMUcsb0JBQW9CLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRTtBQUN6RixvQkFBb0IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFH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LEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsV0FBVyxFQUFFLENBQUM7QUFDemdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDdkIsSUFBSSxNQUFNLFNBQVMsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0FBQ25ELEdBQUc7QUFDSDtBQUNBLEVBQUUsT0FBTyxJQUFJLENBQUM7QUFDZDs7QUN4QkEsU0FBUyxFQUFFLENBQUMsT0FBTyxF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
