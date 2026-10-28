import "@sanity/ui/styles.css";
import { DocumentPreviewPresence, FormField, LinearProgress, PatchEvent, PreviewCard, SanityDefaultPreview, TextWithTone, collate, createHookFromObservableFactory, definePlugin, getPreviewStateObservable, getPreviewValueWithFallback, getPublishedId, getVersionFromId, isRecord, isReference, set, setIfMissing, truncateString, unset, useClient, useCurrentUser, useDataset, useDocumentOperation, useDocumentPresence, useDocumentPreviewStore, useDocumentStore, useDocumentValues, useFormValue, useFormattedDuration, useProjectId, useRelativeTime, useSchema } from "sanity";
import { c } from "react/compiler-runtime";
import { Component, Suspense, createContext, isValidElement, memo, useCallback, useContext, useEffect, useId, useMemo, useReducer, useRef, useState, useSyncExternalStore } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { SearchIcon } from "@sanity/icons/Search";
import { Badge, Box, Button, Card, Checkbox, Dialog, Flex, Grid, Heading, Inline, Label, Radio, Select, Spinner, Stack, Tab, TabList, TabPanel, Text, TextArea, TextInput, rem, useClickOutsideEvent, useTheme_v2 } from "@sanity/ui";
import { compact, isNumber, isString, toLower, trim, uniq, words } from "lodash";
import { Code } from "@sanity/ui/code";
import { clear, preload, suspend } from "suspend-react";
import { Observable, Subject, concat, defer, from, of, throwError, timer } from "rxjs";
import { css, styled } from "styled-components";
import { CheckmarkCircleIcon } from "@sanity/icons/CheckmarkCircle";
import { ErrorOutlineIcon } from "@sanity/icons/ErrorOutline";
import { InfoOutlineIcon } from "@sanity/icons/InfoOutline";
import { RetrieveIcon } from "@sanity/icons/Retrieve";
import { RetryIcon } from "@sanity/icons/Retry";
import { uuid } from "@sanity/uuid";
import { catchError, concatMap, expand, mergeMap, switchMap, takeUntil, tap } from "rxjs/operators";
import { ChevronLeftIcon } from "@sanity/icons/ChevronLeft";
import { ChevronRightIcon } from "@sanity/icons/ChevronRight";
import { SyncIcon } from "@sanity/icons/Sync";
import { SortIcon } from "@sanity/icons/Sort";
import { Menu, MenuButton, MenuDivider, MenuItem } from "@sanity/ui/menu";
import { CalendarIcon } from "@sanity/icons/Calendar";
import { CheckmarkIcon } from "@sanity/icons/Checkmark";
import { ClockIcon } from "@sanity/icons/Clock";
import { CropIcon } from "@sanity/icons/Crop";
import { DownloadIcon } from "@sanity/icons/Download";
import { EditIcon } from "@sanity/icons/Edit";
import { RevertIcon } from "@sanity/icons/Revert";
import { RobotIcon } from "@sanity/icons/Robot";
import { TagIcon } from "@sanity/icons/Tag";
import { TrashIcon } from "@sanity/icons/Trash";
import { AddIcon } from "@sanity/icons/Add";
import { ChevronDownIcon } from "@sanity/icons/ChevronDown";
import { ChevronUpIcon } from "@sanity/icons/ChevronUp";
import { useToast } from "@sanity/ui/toast";
import { TranslateIcon } from "@sanity/icons/Translate";
import { UploadIcon } from "@sanity/icons/Upload";
import { Autocomplete } from "@sanity/ui/autocomplete";
import LanguagesList from "iso-639-1";
import { ResetIcon } from "@sanity/icons/Reset";
import { RefreshIcon } from "@sanity/icons/Refresh";
import useSWR from "swr";
import { dequal } from "dequal/lite";
import { Tooltip } from "@sanity/ui/tooltip";
import { PlayIcon } from "@sanity/icons/Play";
import { CopyIcon } from "@sanity/icons/Copy";
import MuxPlayer from "@mux/mux-player-react/lazy";
import { getDevicePixelRatio } from "use-device-pixel-ratio";
import { WarningOutlineIcon } from "@sanity/icons/WarningOutline";
import { DocumentIcon } from "@sanity/icons/Document";
import { IntentLink } from "sanity/router";
import { useObservable } from "react-rx";
import { PublishIcon } from "@sanity/icons/Publish";
import { LockIcon } from "@sanity/icons/Lock";
import scrollIntoView from "scroll-into-view-if-needed";
import { useErrorBoundary } from "use-error-boundary";
import { PlugIcon } from "@sanity/icons/Plug";
import { UpChunk } from "@mux/upchunk";
import { EllipsisHorizontalIcon } from "@sanity/icons/EllipsisHorizontal";
import { ImageIcon } from "@sanity/icons/Image";
import { Popover } from "@sanity/ui/popover";
import { isValidElementType } from "react-is";
import { DocumentVideoIcon } from "@sanity/icons/DocumentVideo";
import { WarningFilledIcon } from "@sanity/icons/WarningFilled";
const MuxApiHostContext = createContext(void 0);
function MuxApiHostProvider(t0) {
	let $ = c(3), { muxApiHost, children } = t0, t1;
	return $[0] !== children || $[1] !== muxApiHost ? (t1 = /* @__PURE__ */ jsx(MuxApiHostContext.Provider, {
		value: muxApiHost,
		children
	}), $[0] = children, $[1] = muxApiHost, $[2] = t1) : t1 = $[2], t1;
}
function useMuxApiHost() {
	return useContext(MuxApiHostContext);
}
/**
* Icon of a monitor with a play button.
* Credits: material design icons & react-icons
*/
const ToolIcon = () => {
	let $ = c(1), t0;
	return $[0] === Symbol.for("react.memo_cache_sentinel") ? (t0 = /* @__PURE__ */ jsx("svg", {
		stroke: "currentColor",
		fill: "currentColor",
		strokeWidth: "0",
		viewBox: "0 0 24 24",
		height: "1em",
		width: "1em",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ jsx("path", { d: "M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm0 14H3V5h18v12zm-5-6l-7 4V7z" })
	}), $[0] = t0) : t0 = $[0], t0;
}, LOCAL_STORAGE_HAS_SHOWN_WARNING_KEY = "mux-plugin-has-shown-drm-playback-warning", DrmPlaybackWarningContext = createContext({
	hasShownWarning: !1,
	setHasWarnedAboutDrmPlayback: () => null
}), DrmPlaybackWarningContextProvider = (t0) => {
	let $ = c(8), { config, children } = t0, warningDisabled = config?.disableDrmPlaybackWarning ?? !1, t1;
	$[0] === warningDisabled ? t1 = $[1] : (t1 = warningDisabled || window.localStorage.getItem(LOCAL_STORAGE_HAS_SHOWN_WARNING_KEY) === "true", $[0] = warningDisabled, $[1] = t1);
	let [hasWarnedAboutDrmPlayback, setHasWarnedAboutDrmPlayback] = useState(t1), t2;
	$[2] === Symbol.for("react.memo_cache_sentinel") ? (t2 = (b) => {
		window.localStorage.setItem(LOCAL_STORAGE_HAS_SHOWN_WARNING_KEY, b.toString()), setHasWarnedAboutDrmPlayback(b);
	}, $[2] = t2) : t2 = $[2];
	let setHasShownWarning = t2, t3;
	$[3] === hasWarnedAboutDrmPlayback ? t3 = $[4] : (t3 = {
		hasShownWarning: hasWarnedAboutDrmPlayback,
		setHasWarnedAboutDrmPlayback: setHasShownWarning
	}, $[3] = hasWarnedAboutDrmPlayback, $[4] = t3);
	let value = t3, t4;
	return $[5] !== children || $[6] !== value ? (t4 = /* @__PURE__ */ jsx(DrmPlaybackWarningContext.Provider, {
		value,
		children
	}), $[5] = children, $[6] = value, $[7] = t4) : t4 = $[7], t4;
}, useDrmPlaybackWarningContext = () => useContext(DrmPlaybackWarningContext), DRMWarningDialog = (t0) => {
	let $ = c(12), { onClose } = t0, { setHasWarnedAboutDrmPlayback } = useDrmPlaybackWarningContext(), t1;
	$[0] !== onClose || $[1] !== setHasWarnedAboutDrmPlayback ? (t1 = () => {
		setHasWarnedAboutDrmPlayback(!0), onClose();
	}, $[0] = onClose, $[1] = setHasWarnedAboutDrmPlayback, $[2] = t1) : t1 = $[2];
	let _onClose = t1, t2;
	$[3] === _onClose ? t2 = $[4] : (t2 = /* @__PURE__ */ jsx(Stack, {
		padding: 3,
		children: /* @__PURE__ */ jsx(Button, {
			mode: "ghost",
			tone: "primary",
			onClick: _onClose,
			text: "Ok"
		})
	}), $[3] = _onClose, $[4] = t2);
	let t3;
	$[5] === Symbol.for("react.memo_cache_sentinel") ? (t3 = [
		3,
		3,
		3
	], $[5] = t3) : t3 = $[5];
	let t4;
	$[6] === Symbol.for("react.memo_cache_sentinel") ? (t4 = /* @__PURE__ */ jsx(Card, {
		padding: t3,
		radius: 2,
		children: /* @__PURE__ */ jsx(Stack, {
			gap: 3,
			children: /* @__PURE__ */ jsx(Text, {
				size: 1,
				weight: "semibold",
				children: "DRM-protected playback will generate a license with a small associated cost. The plugin will attempt to play signed or public playback IDs instead whenever possible."
			})
		})
	}), $[6] = t4) : t4 = $[6];
	let t5;
	$[7] === Symbol.for("react.memo_cache_sentinel") ? (t5 = [
		3,
		3,
		3
	], $[7] = t5) : t5 = $[7];
	let t6;
	$[8] === Symbol.for("react.memo_cache_sentinel") ? (t6 = /* @__PURE__ */ jsxs(Stack, {
		gap: 3,
		padding: 3,
		children: [t4, /* @__PURE__ */ jsx(Card, {
			padding: t5,
			radius: 2,
			tone: "suggest",
			children: /* @__PURE__ */ jsx(Stack, {
				gap: 3,
				children: /* @__PURE__ */ jsx(Text, {
					size: 1,
					weight: "semibold",
					children: "This is a one time warning. If it persists, you can disable it from your plugin configuration."
				})
			})
		})]
	}), $[8] = t6) : t6 = $[8];
	let t7;
	return $[9] !== _onClose || $[10] !== t2 ? (t7 = /* @__PURE__ */ jsx(Dialog, {
		open: !0,
		id: "drm-playback-warn",
		onClose: _onClose,
		header: "DRM Playback Warning",
		footer: t2,
		children: t6
	}), $[9] = _onClose, $[10] = t2, $[11] = t7) : t7 = $[11], t7;
}, muxAddonClients = /* @__PURE__ */ new WeakMap();
/**
* Validates `muxApiHost` and strips trailing slashes, so it can be used as `apiHost`.
* Throws if it is not an absolute `http(s)` URL without a path, query or hash.
*/
function normalizeMuxApiHost(muxApiHost) {
	let url;
	try {
		url = new URL(muxApiHost);
	} catch {
		throw Error(`[sanity-plugin-mux-input] \`muxApiHost\` must be an absolute URL, like "http://127.0.0.1:8080". Got: "${muxApiHost}"`);
	}
	if (url.protocol !== "http:" && url.protocol !== "https:") throw Error(`[sanity-plugin-mux-input] \`muxApiHost\` must use http or https. Got: "${muxApiHost}"`);
	if (url.pathname && url.pathname !== "/" || url.search || url.hash) throw Error(`[sanity-plugin-mux-input] \`muxApiHost\` must not have a path, query or hash. The plugin adds "/v<apiVersion>/addons/mux/...". Got: "${muxApiHost}"`);
	return url.origin;
}
/**
* Creates the client for Mux addon requests from a Studio client.
*
* The host is used as-is: no project id is prepended (`useProjectHostname: false`).
* `@sanity/client` then sends the project id in a request header.
* Auth config (`token`, `withCredentials`) is copied from the Studio client.
*/
function createMuxAddonClient(client, muxApiHost) {
	return client.withConfig({
		apiHost: normalizeMuxApiHost(muxApiHost),
		useProjectHostname: !1,
		useCdn: !1
	});
}
/**
* Returns a copy of the Studio client that is linked to a Mux addon client on `muxApiHost`.
* Content Lake requests on the returned client still use the Studio API host.
*/
function withMuxApiHost(client, muxApiHost) {
	let studioClient = client.withConfig({});
	return muxAddonClients.set(studioClient, createMuxAddonClient(client, muxApiHost)), studioClient;
}
/**
* Returns the client to use for Mux addon requests.
* Without a `muxApiHost` override, this is the same client that was passed in.
*/
function getMuxAddonClient(client) {
	return muxAddonClients.get(client) ?? client;
}
const SANITY_API_VERSION = "2024-03-05";
function useClient$1() {
	let $ = c(4), t0;
	$[0] === Symbol.for("react.memo_cache_sentinel") ? (t0 = { apiVersion: SANITY_API_VERSION }, $[0] = t0) : t0 = $[0];
	let client = useClient(t0), muxApiHost = useMuxApiHost(), t1;
	return $[1] !== client || $[2] !== muxApiHost ? (t1 = muxApiHost ? withMuxApiHost(client, muxApiHost) : client, $[1] = client, $[2] = muxApiHost, $[3] = t1) : t1 = $[3], t1;
}
const SPECIAL_CHARS = /([^!@#$%^&*(),\\/?";:{}|[\]+<>\s-])+/g, STRIP_EDGE_CHARS = /(^[.]+)|([.]+$)/;
function tokenize(string) {
	return (string.match(SPECIAL_CHARS) || []).map((token) => token.replace(STRIP_EDGE_CHARS, ""));
}
function toGroqParams(terms) {
	return terms.reduce((acc, term, i) => (acc[`t${i}`] = `*${term}*`, acc), {});
}
/**
* Convert a string into an array of tokenized terms.
*
* Any (multi word) text wrapped in double quotes will be treated as "phrases", or separate tokens that
* will not have its special characters removed.
* E.g.`"the" "fantastic mr" fox fox book` =\> ["the", `"fantastic mr"`, "fox", "book"]
*
* Phrases wrapped in quotes are assigned relevance scoring differently from regular words.
*
* @internal
*/
function extractTermsFromQuery(query) {
	let quotedQueries = [], unquotedQuery = query.replace(/("[^"]*")/g, (match) => words(match).length > 1 ? (quotedQueries.push(match), "") : match), quotedTerms = quotedQueries.map((str) => trim(toLower(str))), remainingTerms = uniq(compact(tokenize(toLower(unquotedQuery))));
	return [...quotedTerms, ...remainingTerms];
}
/**
* Create GROQ constraints, given search terms and the full spec of available document types and fields.
* Essentially a large list of all possible fields (joined by logical OR) to match our search terms against.
*/
function createConstraints(terms, includeAssetId) {
	let searchPaths = includeAssetId ? ["filename", "assetId"] : ["filename"];
	return terms.map((_term, i) => searchPaths.map((joinedPath) => `${joinedPath} match $t${i}`)).filter((constraint) => constraint.length > 0).map((constraint) => `(${constraint.join(" || ")})`);
}
function createSearchFilter(query) {
	let terms = extractTermsFromQuery(query);
	return {
		filter: createConstraints(terms, query.length >= 8),
		params: { ...toGroqParams(terms) }
	};
}
const ASSET_SORT_OPTIONS = {
	createdDesc: {
		groq: "_createdAt desc",
		label: "Newest first"
	},
	createdAsc: {
		groq: "_createdAt asc",
		label: "First created (oldest)"
	},
	filenameAsc: {
		groq: "filename asc",
		label: "By filename (A-Z)"
	},
	filenameDesc: {
		groq: "filename desc",
		label: "By filename (Z-A)"
	}
}, useAssetDocuments = createHookFromObservableFactory(({ documentStore, sort, searchQuery }) => {
	let search = createSearchFilter(searchQuery), filter = ["_type == \"mux.videoAsset\"", ...search.filter].filter(Boolean).join(" && "), sortFragment = ASSET_SORT_OPTIONS[sort].groq;
	return documentStore.listenQuery(`*[${filter}] | order(${sortFragment})`, search.params, { apiVersion: SANITY_API_VERSION });
});
function useAssets() {
	let $ = c(13), documentStore = useDocumentStore(), [sort, setSort] = useState("createdDesc"), [searchQuery, setSearchQuery] = useState(""), t0;
	$[0] !== documentStore || $[1] !== searchQuery || $[2] !== sort ? (t0 = {
		documentStore,
		sort,
		searchQuery
	}, $[0] = documentStore, $[1] = searchQuery, $[2] = sort, $[3] = t0) : t0 = $[3];
	let [t1, isLoading] = useAssetDocuments(t0), t2;
	$[4] === t1 ? t2 = $[5] : (t2 = t1 === void 0 ? [] : t1, $[4] = t1, $[5] = t2);
	let assetDocuments = t2, t3;
	$[6] === assetDocuments ? t3 = $[7] : (t3 = collate(assetDocuments).map(_temp$17), $[6] = assetDocuments, $[7] = t3);
	let assets = t3, t4;
	return $[8] !== assets || $[9] !== isLoading || $[10] !== searchQuery || $[11] !== sort ? (t4 = {
		assets,
		isLoading,
		sort,
		searchQuery,
		setSort,
		setSearchQuery
	}, $[8] = assets, $[9] = isLoading, $[10] = searchQuery, $[11] = sort, $[12] = t4) : t4 = $[12], t4;
}
function _temp$17(collated) {
	return {
		...collated.draft || collated.published,
		_id: collated.id
	};
}
function useDialogState() {
	return useState(!1);
}
const PLUGIN_VERSION_QUERY = { sanityVersion: "5.2.1" };
function saveSecrets(client, token, secretKey, enableSignedUrls, signingKeyId, signingKeyPrivate, drmConfigId) {
	let doc = {
		_id: "secrets.mux",
		_type: "mux.apiKey",
		token,
		secretKey,
		enableSignedUrls,
		signingKeyId,
		signingKeyPrivate,
		drmConfigId
	};
	return doc.signingKeyId = enableSignedUrls ? signingKeyId : "", doc.signingKeyPrivate = enableSignedUrls ? signingKeyPrivate : "", client.createOrReplace(doc);
}
async function createSigningKeys(client) {
	try {
		let { dataset } = client.config();
		return await getMuxAddonClient(client).request({
			url: `/addons/mux/signing-keys/${dataset}`,
			withCredentials: !0,
			method: "POST",
			query: PLUGIN_VERSION_QUERY
		});
	} catch (error) {
		console.error("Error creating signing keys", error);
		let message = error.response?.statusCode === 401 ? "Unauthorized - Failed to create the Signing Key. Please ensure that the token has \"System\" permissions" : error.message;
		throw Error(message, { cause: error });
	}
}
function testSecrets(client) {
	let { dataset } = client.config();
	return getMuxAddonClient(client).request({
		url: `/addons/mux/secrets/${dataset}/test`,
		withCredentials: !0,
		method: "GET",
		query: PLUGIN_VERSION_QUERY
	});
}
async function haveValidSigningKeys(client, signingKeyId, signingKeyPrivate) {
	if (!(signingKeyId && signingKeyPrivate)) return !1;
	let { dataset } = client.config();
	try {
		let res = await getMuxAddonClient(client).request({
			url: `/addons/mux/signing-keys/${dataset}/${signingKeyId}`,
			withCredentials: !0,
			method: "GET",
			query: PLUGIN_VERSION_QUERY
		});
		return !!(res.data && res.data.id);
	} catch (e) {
		return console.error("Error fetching signingKeyId", signingKeyId, "assuming it is not valid", e), !1;
	}
}
function testSecretsObservable(client) {
	let { dataset } = client.config();
	return defer(() => getMuxAddonClient(client).observable.request({
		url: `/addons/mux/secrets/${dataset}/test`,
		withCredentials: !0,
		method: "GET",
		query: PLUGIN_VERSION_QUERY
	}));
}
/**
* A Robots request that didn't succeed. `muxAnswered` means the proxy forwarded Mux's own
* answer (its body has a `mux` key); the proxy's own errors never do. `status` is absent for
* network errors, where a create's outcome is unknown.
*/
var RobotsRequestError = class extends Error {
	status;
	type;
	muxAnswered;
	constructor(message, { status, type, muxAnswered = !1 }) {
		super(message), this.name = "RobotsRequestError", this.status = status, this.type = type, this.muxAnswered = muxAnswered;
	}
};
function toRobotsRequestError(error) {
	let { statusCode, response } = error ?? {}, body = response?.body && typeof response.body == "object" ? response.body : {}, mux = body.mux && typeof body.mux == "object" ? body.mux : void 0;
	return new RobotsRequestError(typeof mux?.message == "string" && mux.message || typeof body.message == "string" && body.message || (error instanceof Error ? error.message : "The Robots request failed."), {
		...typeof statusCode == "number" && { status: statusCode },
		...typeof mux?.type == "string" && { type: mux.type },
		muxAnswered: !!mux
	});
}
async function robotsRequest(client, method, segments, { query = {}, body } = {}) {
	let { dataset } = client.config();
	try {
		return await getMuxAddonClient(client).request({
			url: `/addons/mux/robots/${dataset}/${segments.map(encodeURIComponent).join("/")}`,
			withCredentials: !0,
			method,
			query: {
				...query,
				...PLUGIN_VERSION_QUERY
			},
			...body && {
				body,
				headers: { "Content-Type": "application/json" }
			}
		});
	} catch (error) {
		throw toRobotsRequestError(error);
	}
}
function pageQuery({ limit, page }) {
	return {
		...limit !== void 0 && { limit: String(limit) },
		...page !== void 0 && { page: String(page) }
	};
}
function listRobotsJobs(client, query) {
	return robotsRequest(client, "GET", ["jobs"], { query: {
		asset_id: query.assetId,
		...query.workflow && { workflow: query.workflow },
		...query.status && { status: query.status },
		...pageQuery(query)
	} });
}
function getRobotsJob(client, workflow, jobId) {
	return robotsRequest(client, "GET", [
		"jobs",
		workflow,
		jobId
	]);
}
/** Cancel takes no workflow segment, as in Mux. */
function cancelRobotsJob(client, jobId) {
	return robotsRequest(client, "POST", [
		"jobs",
		jobId,
		"cancel"
	]);
}
function listRobotsDirectives(client, query) {
	return robotsRequest(client, "GET", ["directives"], { query: pageQuery(query) });
}
function listRobotsDirectiveRuns(client, directiveId, query) {
	return robotsRequest(client, "GET", [
		"directives",
		directiveId,
		"runs"
	], { query: pageQuery(query) });
}
function getRobotsDirectiveRun(client, directiveId, runId) {
	return robotsRequest(client, "GET", [
		"directives",
		directiveId,
		"runs",
		runId
	]);
}
/**
* Starts a job, once: a create is billable and has no idempotency key, so it's never retried.
* A 2xx that names no job throws a plain `Error`, since the outcome is then unknown.
*/
async function startRobotsJob(client, workflow, parameters) {
	let response = await robotsRequest(client, "POST", ["jobs", workflow], { body: { parameters } });
	if (!response?.data?.id) throw Error("Mux answered without naming the job it started.");
	return response.data;
}
/** Starts a directive run, on the same terms as `startRobotsJob`. */
async function startRobotsDirectiveRun(client, directiveId, assetId) {
	let response = await robotsRequest(client, "POST", [
		"directives",
		directiveId,
		"runs"
	], { body: { asset_id: assetId } });
	if (!response?.data?.run_id) throw Error("Mux answered without naming the run it started.");
	return {
		...response.data,
		directive_id: directiveId
	};
}
const ROBOTS_PRICING_URL = "https://www.mux.com/docs/pricing/overview#mux-robots-pricing";
/**
* What an error says about whether this Studio can use Robots at all, or `undefined` for most
* errors, including every refusal of a single run. Mux's answers are marked by the proxy, so its
* own 401 (no secrets, no session) is never read as a missing scope.
*/
function capabilityFromError(error) {
	if (!(error instanceof RobotsRequestError)) return;
	let { status, type, muxAnswered } = error;
	if (status === 404 && !muxAnswered) return { state: "unavailable" };
	if (muxAnswered) {
		if (status === 401 || type === "insufficient_scope") return { state: "scope-missing" };
		if (status === 403 && (type === void 0 || type === "forbidden")) {
			let termsUrl = dashboardUrlIn(error.message);
			return termsUrl ? {
				state: "not-enabled",
				termsUrl
			} : { state: "not-enabled" };
		}
	}
}
/** A limit a refused run ran into. A warning, never a capability: a cheaper run may still fit. */
function advisoryFromError(error) {
	return error instanceof RobotsRequestError && error.type === "robots_units_limit_exceeded" ? "units-exhausted" : void 0;
}
/** The dashboard page Mux's terms message links, which names the exact environment. */
function dashboardUrlIn(message) {
	return /https:\/\/dashboard\.mux\.com\/[^\s"'<>]*/.exec(message)?.[0].replace(/[.,;:)]+$/, "");
}
/** Shared by every document until new secrets are saved or someone checks again. */
let capabilityCache;
function cachedRobotsCapability() {
	return capabilityCache;
}
function recordRobotsCapability(capability) {
	capabilityCache = capability;
}
function resetRobotsCapabilityCache() {
	capabilityCache = void 0;
}
const useSaveSecrets = (client, secrets) => useCallback(async ({ token, secretKey, enableSignedUrls, drmConfigId }) => {
	let { signingKeyId, signingKeyPrivate } = secrets;
	try {
		if (await saveSecrets(client, token, secretKey, enableSignedUrls, signingKeyId, signingKeyPrivate, drmConfigId), !(await testSecrets(client))?.status && token && secretKey) throw Error("Invalid secrets");
		resetRobotsCapabilityCache();
	} catch (err) {
		throw console.error("Error while trying to save secrets:", err), err;
	}
	if (enableSignedUrls && !await haveValidSigningKeys(client, signingKeyId, signingKeyPrivate)) try {
		let { data } = await createSigningKeys(client);
		signingKeyId = data.id, signingKeyPrivate = data.private_key, await saveSecrets(client, token, secretKey, enableSignedUrls, signingKeyId, signingKeyPrivate, drmConfigId ?? "");
	} catch (err) {
		throw console.log("Error while creating and saving signing key:", err?.message), err;
	}
	return {
		token,
		secretKey,
		enableSignedUrls,
		signingKeyId,
		signingKeyPrivate,
		drmConfigId
	};
}, [client, secrets]), name = "mux-input", cacheNs = "sanity-plugin-mux-input", DIALOGS_Z_INDEX = 6e4, THUMBNAIL_ASPECT_RATIO = 16 / 9, path$1 = [
	"token",
	"secretKey",
	"enableSignedUrls",
	"signingKeyId",
	"signingKeyPrivate",
	"drmConfigId"
], useSecretsDocumentValues = () => {
	let $ = c(15), { error, isLoading, value } = useDocumentValues("secrets.mux", path$1), exists = !!value, t0 = value?.token || null, t1 = value?.secretKey || null, t2 = value?.enableSignedUrls || !1, t3 = value?.signingKeyId || null, t4 = value?.signingKeyPrivate || null, t5 = value?.drmConfigId || null, t6;
	$[0] !== t0 || $[1] !== t1 || $[2] !== t2 || $[3] !== t3 || $[4] !== t4 || $[5] !== t5 ? (t6 = {
		token: t0,
		secretKey: t1,
		enableSignedUrls: t2,
		signingKeyId: t3,
		signingKeyPrivate: t4,
		drmConfigId: t5
	}, $[0] = t0, $[1] = t1, $[2] = t2, $[3] = t3, $[4] = t4, $[5] = t5, $[6] = t6) : t6 = $[6];
	let secrets = t6, t7 = !exists, t8 = !secrets?.token || !secrets?.secretKey, t9;
	$[7] !== secrets || $[8] !== t7 || $[9] !== t8 ? (t9 = {
		isInitialSetup: t7,
		needsSetup: t8,
		secrets
	}, $[7] = secrets, $[8] = t7, $[9] = t8, $[10] = t9) : t9 = $[10];
	let cache = t9, t10;
	return $[11] !== cache || $[12] !== error || $[13] !== isLoading ? (t10 = {
		error,
		isLoading,
		value: cache
	}, $[11] = cache, $[12] = error, $[13] = isLoading, $[14] = t10) : t10 = $[14], t10;
};
function init({ token, secretKey, enableSignedUrls, drmConfigId }) {
	return {
		submitting: !1,
		error: null,
		token: token ?? "",
		secretKey: secretKey ?? "",
		enableSignedUrls: enableSignedUrls ?? !1,
		drmConfigId: drmConfigId ?? ""
	};
}
function reducer(state, action) {
	switch (action?.type) {
		case "submit": return {
			...state,
			submitting: !0,
			error: null
		};
		case "error": return {
			...state,
			submitting: !1,
			error: action.payload
		};
		case "reset": return init(action.payload);
		case "change": return {
			...state,
			[action.payload.name]: action.payload.value
		};
		default: throw Error(`Unknown action type: ${action?.type}`);
	}
}
const useSecretsFormState = (secrets) => useReducer(reducer, secrets, init), _id = "secrets.mux";
function readSecrets(client) {
	let { projectId, dataset } = client.config();
	return suspend(async () => {
		let data = await client.fetch("*[_id == $_id][0]{\n        token,\n        secretKey,\n        enableSignedUrls,\n        signingKeyId,\n        signingKeyPrivate,\n        drmConfigId\n      }", { _id });
		return {
			token: data?.token || null,
			secretKey: data?.secretKey || null,
			enableSignedUrls: !!data?.enableSignedUrls || !1,
			signingKeyId: data?.signingKeyId || null,
			signingKeyPrivate: data?.signingKeyPrivate || null,
			drmConfigId: data?.drmConfigId || null
		};
	}, [
		cacheNs,
		_id,
		projectId,
		dataset
	]);
}
function MuxLogo(t0) {
	let $ = c(12), { height: t1 } = t0, height = t1 === void 0 ? 26 : t1, id = useId(), fillColor = useTheme_v2().color._dark ? "white" : "black", titleId = `${id}-title`, t2;
	$[0] === Symbol.for("react.memo_cache_sentinel") ? (t2 = { fillRule: "nonzero" }, $[0] = t2) : t2 = $[0];
	let pathStyle = t2, t3 = `${height}px`, t4;
	$[1] === t3 ? t4 = $[2] : (t4 = { height: t3 }, $[1] = t3, $[2] = t4);
	let t5, t6, t7;
	$[3] === Symbol.for("react.memo_cache_sentinel") ? (t5 = /* @__PURE__ */ jsx("path", {
		d: "M994.287,93.486c-17.121,-0 -31,-13.879 -31,-31c0,-17.121 13.879,-31 31,-31c17.121,-0 31,13.879 31,31c0,17.121 -13.879,31 -31,31m0,-93.486c-34.509,-0 -62.484,27.976 -62.484,62.486l0,187.511c0,68.943 -56.09,125.033 -125.032,125.033c-68.942,-0 -125.03,-56.09 -125.03,-125.033l0,-187.511c0,-34.51 -27.976,-62.486 -62.485,-62.486c-34.509,-0 -62.484,27.976 -62.484,62.486l0,187.511c0,137.853 112.149,250.003 249.999,250.003c137.851,-0 250.001,-112.15 250.001,-250.003l0,-187.511c0,-34.51 -27.976,-62.486 -62.485,-62.486",
		style: pathStyle
	}), t6 = /* @__PURE__ */ jsx("path", {
		d: "M1537.51,468.511c-17.121,-0 -31,-13.879 -31,-31c0,-17.121 13.879,-31 31,-31c17.121,-0 31,13.879 31,31c0,17.121 -13.879,31 -31,31m-275.883,-218.509l-143.33,143.329c-24.402,24.402 -24.402,63.966 0,88.368c24.402,24.402 63.967,24.402 88.369,-0l143.33,-143.329l143.328,143.329c24.402,24.4 63.967,24.402 88.369,-0c24.403,-24.402 24.403,-63.966 0.001,-88.368l-143.33,-143.329l0.001,-0.004l143.329,-143.329c24.402,-24.402 24.402,-63.965 0,-88.367c-24.402,-24.402 -63.967,-24.402 -88.369,-0l-143.329,143.328l-143.329,-143.328c-24.402,-24.401 -63.967,-24.402 -88.369,-0c-24.402,24.402 -24.402,63.965 0,88.367l143.329,143.329l0,0.004Z",
		style: pathStyle
	}), t7 = /* @__PURE__ */ jsx("path", {
		d: "M437.511,468.521c-17.121,-0 -31,-13.879 -31,-31c0,-17.121 13.879,-31 31,-31c17.121,-0 31,13.879 31,31c0,17.121 -13.879,31 -31,31m23.915,-463.762c-23.348,-9.672 -50.226,-4.327 -68.096,13.544l-143.331,143.329l-143.33,-143.329c-17.871,-17.871 -44.747,-23.216 -68.096,-13.544c-23.349,9.671 -38.574,32.455 -38.574,57.729l0,375.026c0,34.51 27.977,62.486 62.487,62.486c34.51,-0 62.486,-27.976 62.486,-62.486l0,-224.173l80.843,80.844c24.404,24.402 63.965,24.402 88.369,-0l80.843,-80.844l0,224.173c0,34.51 27.976,62.486 62.486,62.486c34.51,-0 62.486,-27.976 62.486,-62.486l0,-375.026c0,-25.274 -15.224,-48.058 -38.573,-57.729",
		style: pathStyle
	}), $[3] = t5, $[4] = t6, $[5] = t7) : (t5 = $[3], t6 = $[4], t7 = $[5]);
	let t8;
	$[6] === fillColor ? t8 = $[7] : (t8 = /* @__PURE__ */ jsxs("g", {
		id: "Layer-1",
		fill: fillColor,
		children: [
			t5,
			t6,
			t7
		]
	}), $[6] = fillColor, $[7] = t8);
	let t9;
	return $[8] !== t4 || $[9] !== t8 || $[10] !== titleId ? (t9 = /* @__PURE__ */ jsx("svg", {
		"aria-labelledby": titleId,
		style: t4,
		viewBox: "0 0 1600 500",
		version: "1.1",
		xmlns: "http://www.w3.org/2000/svg",
		xmlSpace: "preserve",
		children: t8
	}), $[8] = t4, $[9] = t8, $[10] = titleId, $[11] = t9) : t9 = $[11], t9;
}
const Logo = styled.span.withConfig({
	displayName: "Logo",
	componentId: "sc-gt5pfz-0"
})`display:inline-block;height:0.8em;margin-right:1em;transform:translate(0.3em,-0.2em);`, Header = () => {
	let $ = c(1), t0;
	return $[0] === Symbol.for("react.memo_cache_sentinel") ? (t0 = /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Logo, { children: /* @__PURE__ */ jsx(MuxLogo, { height: 13 }) }), "API Credentials"] }), $[0] = t0) : t0 = $[0], t0;
};
function FormField$1(props) {
	let $ = c(15), { children, title, description, inputId } = props, t0;
	$[0] === title ? t0 = $[1] : (t0 = title || /* @__PURE__ */ jsx("em", { children: "Untitled" }), $[0] = title, $[1] = t0);
	let t1;
	$[2] !== inputId || $[3] !== t0 ? (t1 = /* @__PURE__ */ jsx(Text, {
		as: "label",
		htmlFor: inputId,
		weight: "semibold",
		size: 1,
		children: t0
	}), $[2] = inputId, $[3] = t0, $[4] = t1) : t1 = $[4];
	let t2;
	$[5] === description ? t2 = $[6] : (t2 = description && /* @__PURE__ */ jsx(Text, {
		muted: !0,
		size: 1,
		children: description
	}), $[5] = description, $[6] = t2);
	let t3;
	$[7] !== t1 || $[8] !== t2 ? (t3 = /* @__PURE__ */ jsx(Flex, {
		align: "flex-end",
		children: /* @__PURE__ */ jsx(Box, {
			flex: 1,
			paddingY: 2,
			children: /* @__PURE__ */ jsxs(Stack, {
				gap: 2,
				children: [t1, t2]
			})
		})
	}), $[7] = t1, $[8] = t2, $[9] = t3) : t3 = $[9];
	let t4;
	$[10] === children ? t4 = $[11] : (t4 = /* @__PURE__ */ jsx("div", { children }), $[10] = children, $[11] = t4);
	let t5;
	return $[12] !== t3 || $[13] !== t4 ? (t5 = /* @__PURE__ */ jsxs(Stack, {
		gap: 1,
		children: [t3, t4]
	}), $[12] = t3, $[13] = t4, $[14] = t5) : t5 = $[14], t5;
}
var FormField_default = memo(FormField$1);
const fieldNames = [
	"token",
	"secretKey",
	"enableSignedUrls",
	"drmConfigId"
];
function ConfigureApiDialog(t0) {
	let $ = c(91), { secrets, setDialogState } = t0, client = useClient$1(), [state, dispatch] = useSecretsFormState(secrets), hasSecretsInitially = secrets.token && secrets.secretKey, t1;
	$[0] === setDialogState ? t1 = $[1] : (t1 = () => setDialogState(!1), $[0] = setDialogState, $[1] = t1);
	let handleClose = t1, dirty = secrets.token !== state.token || secrets.secretKey !== state.secretKey || secrets.enableSignedUrls !== state.enableSignedUrls || secrets.drmConfigId !== state.drmConfigId, id = `ConfigureApi${useId()}`, t2;
	$[2] === id ? t2 = $[3] : (t2 = fieldNames.map((field) => `${id}-${field}`), $[2] = id, $[3] = t2);
	let [tokenId, secretKeyId, enableSignedUrlsId, drmConfigIdId] = t2, firstField = useRef(null), handleSaveSecrets = useSaveSecrets(client, secrets), saving = useRef(!1), t3;
	$[4] !== client || $[5] !== dispatch || $[6] !== handleSaveSecrets || $[7] !== setDialogState || $[8] !== state ? (t3 = (event) => {
		if (event.preventDefault(), !saving.current && event.currentTarget.reportValidity()) {
			saving.current = !0, dispatch({ type: "submit" });
			let { token, secretKey, enableSignedUrls, drmConfigId } = state;
			handleSaveSecrets({
				token,
				secretKey,
				enableSignedUrls,
				drmConfigId
			}).then((savedSecrets) => {
				let { projectId, dataset } = client.config();
				clear([
					cacheNs,
					_id,
					projectId,
					dataset
				]), preload(() => Promise.resolve(savedSecrets), [
					cacheNs,
					_id,
					projectId,
					dataset
				]), setDialogState(!1);
			}).catch((err) => dispatch({
				type: "error",
				payload: err.message
			})).finally(() => {
				saving.current = !1;
			});
		}
	}, $[4] = client, $[5] = dispatch, $[6] = handleSaveSecrets, $[7] = setDialogState, $[8] = state, $[9] = t3) : t3 = $[9];
	let handleSubmit = t3, t4;
	$[10] === dispatch ? t4 = $[11] : (t4 = (event_0) => {
		dispatch({
			type: "change",
			payload: {
				name: "token",
				value: event_0.currentTarget.value
			}
		});
	}, $[10] = dispatch, $[11] = t4);
	let handleChangeToken = t4, t5;
	$[12] === dispatch ? t5 = $[13] : (t5 = (event_1) => {
		dispatch({
			type: "change",
			payload: {
				name: "secretKey",
				value: event_1.currentTarget.value
			}
		});
	}, $[12] = dispatch, $[13] = t5);
	let handleChangeSecretKey = t5, t6;
	$[14] === dispatch ? t6 = $[15] : (t6 = (event_2) => {
		dispatch({
			type: "change",
			payload: {
				name: "enableSignedUrls",
				value: event_2.currentTarget.checked
			}
		});
	}, $[14] = dispatch, $[15] = t6);
	let handleChangeEnableSignedUrls = t6, t7;
	$[16] === dispatch ? t7 = $[17] : (t7 = (event_3) => {
		dispatch({
			type: "change",
			payload: {
				name: "drmConfigId",
				value: event_3.currentTarget.value
			}
		});
	}, $[16] = dispatch, $[17] = t7);
	let handleChangeDrmConfigId = t7, t8, t9;
	$[18] === Symbol.for("react.memo_cache_sentinel") ? (t8 = () => {
		firstField.current && firstField.current.focus();
	}, t9 = [firstField], $[18] = t8, $[19] = t9) : (t8 = $[18], t9 = $[19]), useEffect(t8, t9);
	let t10;
	$[20] === Symbol.for("react.memo_cache_sentinel") ? (t10 = /* @__PURE__ */ jsx(Header, {}), $[20] = t10) : t10 = $[20];
	let t11;
	$[21] === hasSecretsInitially ? t11 = $[22] : (t11 = !hasSecretsInitially && /* @__PURE__ */ jsx(Card, {
		padding: [
			3,
			3,
			3
		],
		radius: 2,
		shadow: 1,
		tone: "primary",
		children: /* @__PURE__ */ jsxs(Stack, {
			gap: 3,
			children: [/* @__PURE__ */ jsxs(Text, {
				size: 1,
				children: [
					"To set up a new access token, go to your",
					" ",
					/* @__PURE__ */ jsx("a", {
						href: "https://dashboard.mux.com/settings/access-tokens",
						target: "_blank",
						rel: "noreferrer noopener",
						children: "account on mux.com"
					}),
					"."
				]
			}), /* @__PURE__ */ jsxs(Text, {
				size: 1,
				children: [
					"The access token needs permissions: ",
					/* @__PURE__ */ jsx("strong", { children: "Mux Video " }),
					"(Full Access) and ",
					/* @__PURE__ */ jsx("strong", { children: "Mux Data" }),
					" (Read)",
					/* @__PURE__ */ jsx("br", {}),
					"To use Signed URLs, the token must also have System permissions.",
					/* @__PURE__ */ jsx("br", {}),
					"To use Robots, the token also needs the robots:* scope.",
					/* @__PURE__ */ jsx("br", {}),
					"The credentials will be stored safely in a hidden document only available to editors."
				]
			})]
		})
	}), $[21] = hasSecretsInitially, $[22] = t11);
	let t12 = state.token ?? "", t13 = !!state.secretKey || state.enableSignedUrls, t14;
	$[23] !== handleChangeToken || $[24] !== t12 || $[25] !== t13 || $[26] !== tokenId ? (t14 = /* @__PURE__ */ jsx(TextInput, {
		id: tokenId,
		ref: firstField,
		onChange: handleChangeToken,
		type: "text",
		value: t12,
		required: t13
	}), $[23] = handleChangeToken, $[24] = t12, $[25] = t13, $[26] = tokenId, $[27] = t14) : t14 = $[27];
	let t15;
	$[28] !== t14 || $[29] !== tokenId ? (t15 = /* @__PURE__ */ jsx(FormField_default, {
		title: "Access Token",
		inputId: tokenId,
		children: t14
	}), $[28] = t14, $[29] = tokenId, $[30] = t15) : t15 = $[30];
	let t16 = state.secretKey ?? "", t17 = !!state.token || state.enableSignedUrls, t18;
	$[31] !== handleChangeSecretKey || $[32] !== secretKeyId || $[33] !== t16 || $[34] !== t17 ? (t18 = /* @__PURE__ */ jsx(TextInput, {
		id: secretKeyId,
		onChange: handleChangeSecretKey,
		type: "text",
		value: t16,
		required: t17
	}), $[31] = handleChangeSecretKey, $[32] = secretKeyId, $[33] = t16, $[34] = t17, $[35] = t18) : t18 = $[35];
	let t19;
	$[36] !== secretKeyId || $[37] !== t18 ? (t19 = /* @__PURE__ */ jsx(FormField_default, {
		title: "Secret Key",
		inputId: secretKeyId,
		children: t18
	}), $[36] = secretKeyId, $[37] = t18, $[38] = t19) : t19 = $[38];
	let t20;
	$[39] === Symbol.for("react.memo_cache_sentinel") ? (t20 = { display: "block" }, $[39] = t20) : t20 = $[39];
	let t21;
	$[40] !== enableSignedUrlsId || $[41] !== handleChangeEnableSignedUrls || $[42] !== state.enableSignedUrls ? (t21 = /* @__PURE__ */ jsx(Checkbox, {
		id: enableSignedUrlsId,
		onChange: handleChangeEnableSignedUrls,
		checked: state.enableSignedUrls,
		style: t20
	}), $[40] = enableSignedUrlsId, $[41] = handleChangeEnableSignedUrls, $[42] = state.enableSignedUrls, $[43] = t21) : t21 = $[43];
	let t22;
	$[44] === enableSignedUrlsId ? t22 = $[45] : (t22 = /* @__PURE__ */ jsx(Box, {
		flex: 1,
		paddingLeft: 3,
		children: /* @__PURE__ */ jsx(Text, { children: /* @__PURE__ */ jsx("label", {
			htmlFor: enableSignedUrlsId,
			children: "Enable Signed Urls"
		}) })
	}), $[44] = enableSignedUrlsId, $[45] = t22);
	let t23;
	$[46] !== t21 || $[47] !== t22 ? (t23 = /* @__PURE__ */ jsxs(Flex, {
		align: "center",
		children: [t21, t22]
	}), $[46] = t21, $[47] = t22, $[48] = t23) : t23 = $[48];
	let t24;
	$[49] !== secrets.signingKeyId || $[50] !== state.enableSignedUrls ? (t24 = secrets.signingKeyId && state.enableSignedUrls ? /* @__PURE__ */ jsx(Card, {
		padding: [
			3,
			3,
			3
		],
		radius: 2,
		shadow: 1,
		tone: "caution",
		children: /* @__PURE__ */ jsxs(Stack, {
			gap: 3,
			children: [
				/* @__PURE__ */ jsx(Text, {
					size: 1,
					children: "The signing key ID that Sanity will use is:"
				}),
				/* @__PURE__ */ jsx(Code, {
					size: 1,
					children: secrets.signingKeyId
				}),
				/* @__PURE__ */ jsxs(Text, {
					size: 1,
					children: [
						"This key is only used for previewing content in the Sanity UI.",
						/* @__PURE__ */ jsx("br", {}),
						"You should generate a different key to use in your application server."
					]
				})
			]
		})
	}) : null, $[49] = secrets.signingKeyId, $[50] = state.enableSignedUrls, $[51] = t24) : t24 = $[51];
	let t25;
	$[52] !== t23 || $[53] !== t24 ? (t25 = /* @__PURE__ */ jsxs(Stack, {
		gap: 4,
		children: [t23, t24]
	}), $[52] = t23, $[53] = t24, $[54] = t25) : t25 = $[54];
	let t26 = state.drmConfigId ?? "", t27;
	$[55] !== drmConfigIdId || $[56] !== handleChangeDrmConfigId || $[57] !== t26 ? (t27 = /* @__PURE__ */ jsx(TextInput, {
		id: drmConfigIdId,
		onChange: handleChangeDrmConfigId,
		type: "text",
		value: t26,
		required: !1
	}), $[55] = drmConfigIdId, $[56] = handleChangeDrmConfigId, $[57] = t26, $[58] = t27) : t27 = $[58];
	let t28;
	$[59] !== drmConfigIdId || $[60] !== t27 ? (t28 = /* @__PURE__ */ jsx(FormField_default, {
		title: "DRM Configuration ID",
		inputId: drmConfigIdId,
		children: t27
	}), $[59] = drmConfigIdId, $[60] = t27, $[61] = t28) : t28 = $[61];
	let t29;
	$[62] === Symbol.for("react.memo_cache_sentinel") ? (t29 = [
		3,
		3,
		3
	], $[62] = t29) : t29 = $[62];
	let t30;
	$[63] === Symbol.for("react.memo_cache_sentinel") ? (t30 = /* @__PURE__ */ jsxs(Text, {
		size: 1,
		children: [
			"DRM (Digital Rights Management) provides an extra layer of content security for video content streamed from Mux. For additional information check out our",
			" ",
			/* @__PURE__ */ jsx("a", {
				href: "https://www.mux.com/docs/guides/protect-videos-with-drm#play-drm-protected-videos",
				target: "_blank",
				rel: "noopener noreferrer",
				children: "DRM Guide"
			}),
			"."
		]
	}), $[63] = t30) : t30 = $[63];
	let t31;
	$[64] === Symbol.for("react.memo_cache_sentinel") ? (t31 = /* @__PURE__ */ jsx(Card, {
		padding: t29,
		radius: 2,
		shadow: 1,
		tone: "neutral",
		children: /* @__PURE__ */ jsxs(Stack, {
			gap: 3,
			children: [t30, /* @__PURE__ */ jsxs(Text, {
				size: 1,
				children: [
					/* @__PURE__ */ jsx("a", {
						href: "https://www.mux.com/support/human",
						target: "_blank",
						rel: "noopener noreferrer",
						children: "Contact us"
					}),
					" ",
					"to get started using DRM."
				]
			})]
		})
	}), $[64] = t31) : t31 = $[64];
	let t32 = !dirty, t33;
	$[65] !== state.submitting || $[66] !== t32 ? (t33 = /* @__PURE__ */ jsx(Button, {
		text: "Save",
		disabled: t32,
		loading: state.submitting,
		tone: "primary",
		mode: "default",
		type: "submit"
	}), $[65] = state.submitting, $[66] = t32, $[67] = t33) : t33 = $[67];
	let t34;
	$[68] !== handleClose || $[69] !== state.submitting ? (t34 = /* @__PURE__ */ jsx(Button, {
		disabled: state.submitting,
		text: "Cancel",
		mode: "bleed",
		onClick: handleClose
	}), $[68] = handleClose, $[69] = state.submitting, $[70] = t34) : t34 = $[70];
	let t35;
	$[71] !== t33 || $[72] !== t34 ? (t35 = /* @__PURE__ */ jsxs(Inline, {
		gap: 2,
		children: [t33, t34]
	}), $[71] = t33, $[72] = t34, $[73] = t35) : t35 = $[73];
	let t36;
	$[74] === state.error ? t36 = $[75] : (t36 = state.error && /* @__PURE__ */ jsx(Card, {
		padding: [
			3,
			3,
			3
		],
		radius: 2,
		shadow: 1,
		tone: "critical",
		children: /* @__PURE__ */ jsx(Text, { children: state.error })
	}), $[74] = state.error, $[75] = t36);
	let t37;
	$[76] !== t11 || $[77] !== t15 || $[78] !== t19 || $[79] !== t25 || $[80] !== t28 || $[81] !== t35 || $[82] !== t36 ? (t37 = /* @__PURE__ */ jsxs(Stack, {
		gap: 4,
		children: [
			t11,
			t15,
			t19,
			t25,
			t28,
			t31,
			t35,
			t36
		]
	}), $[76] = t11, $[77] = t15, $[78] = t19, $[79] = t25, $[80] = t28, $[81] = t35, $[82] = t36, $[83] = t37) : t37 = $[83];
	let t38;
	$[84] !== handleSubmit || $[85] !== t37 ? (t38 = /* @__PURE__ */ jsx(Box, {
		padding: 3,
		children: /* @__PURE__ */ jsx("form", {
			onSubmit: handleSubmit,
			noValidate: !0,
			children: t37
		})
	}), $[84] = handleSubmit, $[85] = t37, $[86] = t38) : t38 = $[86];
	let t39;
	return $[87] !== handleClose || $[88] !== id || $[89] !== t38 ? (t39 = /* @__PURE__ */ jsx(Dialog, {
		animate: !0,
		id,
		onClose: handleClose,
		onClickOutside: handleClose,
		header: t10,
		zOffset: DIALOGS_Z_INDEX,
		position: "fixed",
		width: 1,
		children: t38
	}), $[87] = handleClose, $[88] = id, $[89] = t38, $[90] = t39) : t39 = $[90], t39;
}
function ConfigureApi() {
	let $ = c(7), [dialogOpen, setDialogOpen] = useDialogState(), secretDocumentValues = useSecretsDocumentValues(), t0;
	$[0] === setDialogOpen ? t0 = $[1] : (t0 = () => setDialogOpen("secrets"), $[0] = setDialogOpen, $[1] = t0);
	let openDialog = t0;
	if (dialogOpen === "secrets") {
		let t1;
		return $[2] !== secretDocumentValues.value.secrets || $[3] !== setDialogOpen ? (t1 = /* @__PURE__ */ jsx(ConfigureApiDialog, {
			secrets: secretDocumentValues.value.secrets,
			setDialogState: setDialogOpen
		}), $[2] = secretDocumentValues.value.secrets, $[3] = setDialogOpen, $[4] = t1) : t1 = $[4], t1;
	}
	let t1;
	return $[5] === openDialog ? t1 = $[6] : (t1 = /* @__PURE__ */ jsx(Button, {
		mode: "bleed",
		text: "Configure plugin",
		onClick: openDialog
	}), $[5] = openDialog, $[6] = t1), t1;
}
/**
* Generates a placeholder title for a Mux asset when no title is available.
* This format is used when importing assets that don't have a title in Mux.
*
* @param assetId - The Mux asset ID
* @returns A placeholder title in the format "Asset #[truncated-id]"
*/
function generateAssetPlaceholder(assetId) {
	return `Asset #${truncateString(assetId, 15)}`;
}
/**
* Checks if a filename is empty or has the placeholder format.
* This is used to determine if a video title should be updated during metadata sync.
*
* @param filename - The current filename/title of the video
* @param assetId - The Mux asset ID to check against
* @returns true if the filename is empty or matches the placeholder format
*/
function isEmptyOrPlaceholderTitle(filename, assetId) {
	return !filename || filename.trim() === "" || filename === generateAssetPlaceholder(assetId);
}
function parseMuxDate(date) {
	return /* @__PURE__ */ new Date(Number(date) * 1e3);
}
function deleteAssetOnMux(client, assetId) {
	let { dataset } = client.config();
	return getMuxAddonClient(client).request({
		url: `/addons/mux/assets/${dataset}/${assetId}`,
		withCredentials: !0,
		method: "DELETE",
		query: PLUGIN_VERSION_QUERY
	});
}
async function deleteAsset({ client, asset, deleteOnMux }) {
	if (!asset?._id) return !0;
	try {
		await client.delete(asset._id);
	} catch {
		return "failed-sanity";
	}
	if (deleteOnMux && asset?.assetId) try {
		await deleteAssetOnMux(client, asset.assetId);
	} catch {
		return "failed-mux";
	}
	return !0;
}
function getAsset(client, assetId) {
	let { dataset } = client.config();
	return getMuxAddonClient(client).request({
		url: `/addons/mux/assets/${dataset}/data/${assetId}`,
		withCredentials: !0,
		method: "GET",
		query: PLUGIN_VERSION_QUERY
	});
}
function listAssets(client, options) {
	let { dataset } = client.config(), query = {};
	return options.limit && (query.limit = options.limit.toString()), options.cursor && (query.cursor = options.cursor), getMuxAddonClient(client).request({
		url: `/addons/mux/assets/${dataset}/data/list`,
		withCredentials: !0,
		method: "GET",
		query: {
			...query,
			...PLUGIN_VERSION_QUERY
		}
	});
}
/**
* Adds a new text track to an existing asset using a VTT file URL
*/
function addTextTrackFromUrl(client, assetId, vttUrl, options) {
	let { dataset } = client.config();
	return getMuxAddonClient(client).request({
		url: `/addons/mux/assets/${dataset}/${assetId}/tracks`,
		withCredentials: !0,
		method: "POST",
		body: {
			url: vttUrl,
			type: "text",
			language_code: options.language_code,
			name: options.name,
			text_type: options.text_type || "subtitles"
		},
		headers: { "Content-Type": "application/json" },
		query: PLUGIN_VERSION_QUERY
	});
}
/**
* Adds a new alternative audio track to an existing asset using an audio file URL.
* Mux accepts most common audio formats (M4A, WAV, MP3) and requires the asset to be `ready`.
*/
function addAudioTrackFromUrl(client, assetId, audioUrl, options) {
	let { dataset } = client.config();
	return getMuxAddonClient(client).request({
		url: `/addons/mux/assets/${dataset}/${assetId}/tracks`,
		withCredentials: !0,
		method: "POST",
		body: {
			url: audioUrl,
			type: "audio",
			language_code: options.language_code,
			...options.name ? { name: options.name } : {}
		},
		headers: { "Content-Type": "application/json" },
		query: PLUGIN_VERSION_QUERY
	});
}
/**
* Generates subtitles automatically for an audio track
*/
function generateSubtitles(client, assetId, audioTrackId, options) {
	let { dataset } = client.config();
	return getMuxAddonClient(client).request({
		url: `/addons/mux/assets/${dataset}/${assetId}/tracks/${audioTrackId}/generate-subtitles`,
		withCredentials: !0,
		method: "POST",
		body: { generated_subtitles: [{
			language_code: options.language_code,
			name: options.name
		}] },
		headers: { "Content-Type": "application/json" },
		query: PLUGIN_VERSION_QUERY
	});
}
/**
* Deletes a track (text or audio) from an asset
*/
function deleteAssetTrack(client, assetId, trackId) {
	let { dataset } = client.config();
	return getMuxAddonClient(client).request({
		url: `/addons/mux/assets/${dataset}/${assetId}/tracks/${trackId}`,
		withCredentials: !0,
		method: "DELETE",
		query: PLUGIN_VERSION_QUERY
	});
}
/**
* Updates master access (the "mezzanine" file in Mux's docs) on a Mux asset, via the addon proxy.
* @see {@link https://docs.mux.com/api-reference/video/assets/update-asset-master-access}
*/
function updateMasterAccess(client, assetId, masterAccess) {
	let { dataset } = client.config();
	return getMuxAddonClient(client).request({
		url: `/addons/mux/assets/${dataset}/${assetId}/master-access`,
		withCredentials: !0,
		method: "PUT",
		body: { master_access: masterAccess },
		headers: { "Content-Type": "application/json" },
		query: PLUGIN_VERSION_QUERY
	});
}
/**
* Creates a playback ID, e.g. after Robots `moderate` deleted them all. The proxy answers like
* the Robots routes, so failures are `RobotsRequestError`s; a 404 without `mux` means the proxy
* doesn't have the route yet.
*/
async function createPlaybackId(client, assetId, policy, drmConfigurationId) {
	let { dataset } = client.config();
	try {
		return await getMuxAddonClient(client).request({
			url: `/addons/mux/assets/${dataset}/${assetId}/playback-ids`,
			withCredentials: !0,
			method: "POST",
			body: policy === "drm" ? {
				policy,
				drm_configuration_id: drmConfigurationId
			} : { policy },
			headers: { "Content-Type": "application/json" },
			query: PLUGIN_VERSION_QUERY
		});
	} catch (error) {
		throw toRobotsRequestError(error);
	}
}
/**
* Deletes a text track from an asset
*/
function deleteTextTrack(client, assetId, trackId) {
	return deleteAssetTrack(client, assetId, trackId);
}
/**
* Deletes an alternative audio track from an asset.
* The primary audio track can't be deleted.
*/
function deleteAudioTrack(client, assetId, trackId) {
	return deleteAssetTrack(client, assetId, trackId);
}
/**
* @docs {@link https://docs.mux.com/api-reference#video/operation/list-assets}
*/
async function fetchMuxAssetsPage(client, cursor) {
	try {
		let response = await listAssets(client, {
			limit: 100,
			cursor
		});
		return {
			cursor,
			data: response.data,
			next_cursor: response.next_cursor || null
		};
	} catch {
		return {
			cursor,
			error: { _tag: "FetchError" }
		};
	}
}
function accumulateIntermediateState(currentState, pageResult) {
	let currentData = "data" in currentState && currentState.data || [], { validAssets, skippedInThisPage } = ("data" in pageResult && pageResult.data || []).reduce((acc, asset) => {
		let hasPlaybackIds = asset.playback_ids && asset.playback_ids.length > 0, isDuplicate = currentData.some((a) => a.id === asset.id);
		return hasPlaybackIds || (acc.skippedInThisPage = !0), hasPlaybackIds && !isDuplicate && acc.validAssets.push(asset), acc;
	}, {
		validAssets: [],
		skippedInThisPage: !1
	});
	return {
		...currentState,
		data: [...currentData, ...validAssets],
		error: "error" in pageResult ? pageResult.error : void 0,
		cursor: "next_cursor" in pageResult ? pageResult.next_cursor : pageResult.cursor,
		loading: !0,
		hasSkippedAssetsWithoutPlayback: currentState.hasSkippedAssetsWithoutPlayback || skippedInThisPage
	};
}
function hasMorePages(pageResult) {
	return typeof pageResult == "object" && "next_cursor" in pageResult && pageResult.next_cursor !== null;
}
/**
* Fetches all assets from a Mux environment. Rules:
* - One page at a time
* - Uses cursor-based pagination
*   - We've finished fetching when `next_cursor` is null
* - Rate limiting to one request per 2 seconds
* - Update state while still fetching to give feedback to users
*/
function useMuxAssets(t0) {
	let $ = c(7), { client, enabled } = t0, t1;
	$[0] === Symbol.for("react.memo_cache_sentinel") ? (t1 = {
		loading: !0,
		cursor: null
	}, $[0] = t1) : t1 = $[0];
	let [state, setState] = useState(t1), t2;
	$[1] !== client || $[2] !== enabled || $[3] !== state ? (t2 = () => {
		if (!enabled) return;
		let subscription = defer(() => fetchMuxAssetsPage(client, "data" in state && state.data && state.data.length > 0 && !state.error ? state.cursor : null)).pipe(expand((pageResult) => hasMorePages(pageResult) ? timer(2e3).pipe(concatMap(() => defer(() => fetchMuxAssetsPage(client, "next_cursor" in pageResult ? pageResult.next_cursor : null)))) : of()), tap((pageResult_0) => setState((prevState) => accumulateIntermediateState(prevState, pageResult_0)))).subscribe({ complete: () => {
			setState(_temp$16);
		} });
		return () => subscription.unsubscribe();
	}, $[1] = client, $[2] = enabled, $[3] = state, $[4] = t2) : t2 = $[4];
	let t3;
	return $[5] === enabled ? t3 = $[6] : (t3 = [enabled], $[5] = enabled, $[6] = t3), useEffect(t2, t3), state;
}
function _temp$16(prev) {
	return {
		...prev,
		loading: !1
	};
}
function useImportMuxAssets() {
	let $ = c(26), documentStore = useDocumentStore(), client = useClient$1(), [assetsInSanity, assetsInSanityLoading] = useAssetsInSanity(documentStore), hasSecrets = !!useSecretsDocumentValues().value.secrets?.secretKey, [importError, setImportError] = useState(), [importState, setImportState] = useState("closed"), dialogOpen = importState !== "closed", t0 = hasSecrets && dialogOpen, t1;
	$[0] !== client || $[1] !== t0 ? (t1 = {
		client,
		enabled: t0
	}, $[0] = client, $[1] = t0, $[2] = t1) : t1 = $[2];
	let muxAssets = useMuxAssets(t1), t2;
	$[3] !== assetsInSanity || $[4] !== muxAssets.data ? (t2 = assetsInSanity && muxAssets.data ? muxAssets.data.filter((a) => !assetExistsInSanity(a, assetsInSanity)) : void 0, $[3] = assetsInSanity, $[4] = muxAssets.data, $[5] = t2) : t2 = $[5];
	let missingAssets = t2, t3;
	$[6] === Symbol.for("react.memo_cache_sentinel") ? (t3 = [], $[6] = t3) : t3 = $[6];
	let [selectedAssets, setSelectedAssets] = useState(t3), t4;
	$[7] === importState ? t4 = $[8] : (t4 = () => {
		importState !== "importing" && setImportState("closed");
	}, $[7] = importState, $[8] = t4);
	let closeDialog = t4, t5;
	$[9] === importState ? t5 = $[10] : (t5 = () => {
		importState === "closed" && setImportState("idle");
	}, $[9] = importState, $[10] = t5);
	let openDialog = t5, t6;
	$[11] !== client || $[12] !== selectedAssets ? (t6 = async function importAssets() {
		setImportState("importing");
		let documents = selectedAssets.flatMap(_temp$15), tx = client.transaction();
		documents.forEach((doc) => tx.create(doc));
		try {
			await tx.commit({ returnDocuments: !1 }), setSelectedAssets([]), setImportState("done");
		} catch (t7) {
			let error = t7;
			setImportState("error"), setImportError(error);
		}
	}, $[11] = client, $[12] = selectedAssets, $[13] = t6) : t6 = $[13];
	let importAssets = t6, t7;
	return $[14] !== assetsInSanityLoading || $[15] !== closeDialog || $[16] !== dialogOpen || $[17] !== hasSecrets || $[18] !== importAssets || $[19] !== importError || $[20] !== importState || $[21] !== missingAssets || $[22] !== muxAssets || $[23] !== openDialog || $[24] !== selectedAssets ? (t7 = {
		assetsInSanityLoading,
		closeDialog,
		dialogOpen,
		importState,
		importError,
		hasSecrets,
		importAssets,
		missingAssets,
		muxAssets,
		openDialog,
		selectedAssets,
		setSelectedAssets
	}, $[14] = assetsInSanityLoading, $[15] = closeDialog, $[16] = dialogOpen, $[17] = hasSecrets, $[18] = importAssets, $[19] = importError, $[20] = importState, $[21] = missingAssets, $[22] = muxAssets, $[23] = openDialog, $[24] = selectedAssets, $[25] = t7) : t7 = $[25], t7;
}
function _temp$15(asset) {
	return muxAssetToSanityDocument(asset) || [];
}
function muxAssetToSanityDocument(asset) {
	let playbackId = (asset.playback_ids || []).find((p) => p.id)?.id;
	if (playbackId) return {
		_id: uuid(),
		_type: "mux.videoAsset",
		_updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		_createdAt: parseMuxDate(asset.created_at).toISOString(),
		assetId: asset.id,
		playbackId,
		filename: asset.meta?.title ?? generateAssetPlaceholder(asset.id),
		status: asset.status,
		data: asset
	};
}
const useAssetsInSanity = createHookFromObservableFactory((documentStore) => documentStore.listenQuery("*[_type == \"mux.videoAsset\"] {\n      \"uploadId\": coalesce(uploadId, data.upload_id),\n      \"assetId\": coalesce(assetId, data.id),\n    }", {}, { apiVersion: SANITY_API_VERSION }));
function assetExistsInSanity(asset, existingAssets) {
	return asset.status === "ready" && existingAssets.some((existing) => existing.assetId === asset.id || existing.uploadId === asset.upload_id);
}
function useInView(ref, t0) {
	let $ = c(6), t1;
	$[0] === t0 ? t1 = $[1] : (t1 = t0 === void 0 ? {} : t0, $[0] = t0, $[1] = t1);
	let options = t1, [inView, setInView] = useState(!1), t2, t3;
	return $[2] !== options || $[3] !== ref ? (t2 = () => {
		if (!ref.current) return;
		let observer = new IntersectionObserver((t4, obs) => {
			let [entry] = t4, nowInView = entry.isIntersecting && obs.thresholds.some((threshold) => entry.intersectionRatio >= threshold);
			setInView(nowInView), options?.onChange?.(nowInView);
		}, options), toObserve = ref.current;
		return observer.observe(toObserve), () => {
			toObserve && observer.unobserve(toObserve);
		};
	}, t3 = [options, ref], $[2] = options, $[3] = ref, $[4] = t2, $[5] = t3) : (t2 = $[4], t3 = $[5]), useEffect(t2, t3), inView;
}
function getPlaybackId(asset, priority = [
	"drm",
	"signed",
	"public"
]) {
	try {
		if (!asset) throw TypeError("Tried to get playback Id with no asset");
		let playbackIds = asset.data?.playback_ids;
		if (playbackIds && playbackIds.length > 0) {
			for (let policy of priority) {
				let match = playbackIds.find((entry) => entry.policy === policy);
				if (match) return match.id;
			}
			return playbackIds[0].id;
		}
		throw TypeError("Missing playbackId");
	} catch (e) {
		throw console.error("Asset is missing a playbackId", { asset }, e), e;
	}
}
function getPlaybackPolicy(asset) {
	return asset.data?.playback_ids?.find((playbackId) => getPlaybackId(asset, [
		"drm",
		"signed",
		"public"
	]) === playbackId.id) ?? {
		id: "",
		policy: "public"
	};
}
/**
* Frontends query the document's top-level `playbackId`, so a deleted id (Robots `moderate`
* deletes them all) would keep failing after playback is restored.
*/
function playbackIdToKeep(current, playbackIds) {
	let ids = (playbackIds ?? []).map((entry) => entry.id);
	return current && ids.includes(current) ? current : ids[0];
}
function getPlaybackPolicyById(asset, playbackId) {
	return asset.data?.playback_ids?.find((entry) => playbackId === entry.id);
}
function hasPlaybackPolicy(data, policy) {
	return data.advanced_playback_policies && data.advanced_playback_policies.find((p) => p.policy === policy) || data.playback_policy?.find((p) => p === policy);
}
/**
* Uses suspend. Call this with {@link tryWithSuspend} or rethrow the Promise
*/
function generateJwt(client, playbackId, aud, payload) {
	let { signingKeyId, signingKeyPrivate } = readSecrets(client);
	if (!signingKeyId) throw TypeError("Missing `signingKeyId`.\n Check your plugin's configuration");
	if (!signingKeyPrivate) throw TypeError("Missing `signingKeyPrivate`.\n Check your plugin's configuration");
	let { default: sign } = suspend(() => import("jsonwebtoken-esm/sign"), ["jsonwebtoken-esm/sign"]);
	return sign(payload ? JSON.parse(JSON.stringify(payload, (_, v) => v ?? void 0)) : {}, atob(signingKeyPrivate), {
		algorithm: "RS256",
		keyid: signingKeyId,
		audience: aud,
		subject: playbackId,
		noTimestamp: !0,
		expiresIn: "12h"
	});
}
/**
* May throw a Promise. Call this with {@link tryWithSuspend} or rethrow the Promise
*/
function createUrlParamsObject(client, asset, params, audience) {
	let playbackId = getPlaybackId(asset), searchParams = new URLSearchParams(JSON.parse(JSON.stringify(params, (_, v) => v ?? void 0))), playbackPolicy = getPlaybackPolicyById(asset, playbackId)?.policy;
	if (playbackPolicy === "signed" || playbackPolicy === "drm") {
		let token = generateJwt(client, playbackId, audience, params);
		searchParams = new URLSearchParams({ token });
	}
	return {
		playbackId,
		searchParams
	};
}
function getAnimatedPosterSrc({ asset, client, height, width, start = asset.thumbTime ? Math.max(0, asset.thumbTime - 2.5) : 0, end = start + 5, fps = 15 }) {
	let { playbackId, searchParams } = createUrlParamsObject(client, asset, {
		height,
		width,
		start,
		end,
		fps
	}, "g");
	return `https://image.mux.com/${playbackId}/animated.gif?${searchParams}`;
}
function getPosterSrc({ asset, client, fit_mode, height, time = asset.thumbTime ?? void 0, width }) {
	let params = {
		fit_mode,
		height,
		width
	};
	time !== void 0 && (params.time = time);
	let { playbackId, searchParams } = createUrlParamsObject(client, asset, params, "t");
	return `https://image.mux.com/${playbackId}/thumbnail.png?${searchParams}`;
}
/**
* When running `suspend()` from react-suspend a function may throw a Promise
* causing unexpected behavior when catching.
* @param block Your block of code that uses suspend
* @param onError (optional) How to handle a regular Error
* @returns Whatever is returned by the block if it succeeds, otherwise whatever is resolved by onError if defined
* @throws rethrows the caught Promise to comply with Suspense logic
*/
function tryWithSuspend(block, onError) {
	try {
		return block();
	} catch (errorOrPromise) {
		if (errorOrPromise instanceof Promise) throw errorOrPromise;
		return onError ? onError(errorOrPromise) : void 0;
	}
}
const Image$1 = styled.img.withConfig({
	displayName: "Image",
	componentId: "sc-yzrck7-0"
})`transition:opacity 0.175s ease-out 0s;display:block;width:100%;height:100%;object-fit:contain;object-position:center center;`, STATUS_TO_TONE = {
	loading: "transparent",
	error: "critical",
	loaded: "default"
};
function VideoThumbnail({ asset, width, staticImage = !1 }) {
	let posterWidth = width || 250, client = useClient$1(), ref = useRef(null), inView = useInView(ref), [status, setStatus] = useState("loading"), [error, setError] = useState(null), thumbnailSrc = useMemo(() => tryWithSuspend(() => {
		let thumbnail;
		return thumbnail = staticImage ? getPosterSrc({
			asset,
			client,
			width: posterWidth
		}) : getAnimatedPosterSrc({
			asset,
			client,
			width: posterWidth
		}), thumbnail;
	}, (err) => {
		handleError(err.message);
	}), [
		asset,
		client,
		posterWidth,
		staticImage
	]);
	function handleLoad() {
		setStatus("loaded");
	}
	function handleError(err) {
		setStatus("error"), setError(err || "Failed loading thumbnail");
	}
	return /* @__PURE__ */ jsx(Suspense, {
		fallback: /* @__PURE__ */ jsx("span", { children: "Preparing thumbnail" }),
		children: /* @__PURE__ */ jsx(Card, {
			style: {
				aspectRatio: THUMBNAIL_ASPECT_RATIO,
				position: "relative",
				maxWidth: width ? `${width}px` : void 0,
				width: "100%",
				flex: 1
			},
			border: !0,
			radius: 2,
			ref,
			tone: STATUS_TO_TONE[status],
			children: inView ? /* @__PURE__ */ jsxs(Fragment, { children: [
				status === "loading" && /* @__PURE__ */ jsx(Box, {
					style: {
						position: "absolute",
						left: "50%",
						top: "50%",
						transform: "translate(-50%, -50%)"
					},
					children: /* @__PURE__ */ jsx(Spinner, {})
				}),
				status === "error" && /* @__PURE__ */ jsxs(Stack, {
					gap: 4,
					style: {
						position: "absolute",
						width: "100%",
						left: 0,
						top: "50%",
						transform: "translateY(-50%)",
						justifyItems: "center"
					},
					children: [/* @__PURE__ */ jsx(Text, {
						size: 4,
						muted: !0,
						children: /* @__PURE__ */ jsx(ErrorOutlineIcon, { style: { fontSize: "1.75em" } })
					}), /* @__PURE__ */ jsx(Text, {
						muted: !0,
						align: "center",
						children: error
					})]
				}),
				/* @__PURE__ */ jsx(Image$1, {
					src: thumbnailSrc ?? void 0,
					alt: `Preview for ${staticImage ? "image" : "video"} ${asset.filename || asset.assetId}`,
					onLoad: handleLoad,
					onError: () => handleError(),
					style: { opacity: +(status === "loaded") }
				})
			] }) : null
		})
	});
}
const MissingAssetCheckbox = styled(Checkbox).withConfig({
	displayName: "MissingAssetCheckbox",
	componentId: "sc-xpfg39-0"
})`position:static !important;input::after{content:'';position:absolute;inset:0;display:block;cursor:pointer;z-index:1000;}`;
function MissingAsset(t0) {
	let $ = c(36), { asset, selectAsset, selected } = t0, duration = useFormattedDuration(asset.duration * 1e3), t1 = asset.id, t2 = selected ? "positive" : void 0, t3;
	$[0] === Symbol.for("react.memo_cache_sentinel") ? (t3 = { position: "relative" }, $[0] = t3) : t3 = $[0];
	let t4;
	$[1] === selectAsset ? t4 = $[2] : (t4 = (e) => {
		selectAsset(e.currentTarget.checked);
	}, $[1] = selectAsset, $[2] = t4);
	let t5 = selected ? `Import video ${asset.id}` : `Skip import of video ${asset.id}`, t6;
	$[3] !== selected || $[4] !== t4 || $[5] !== t5 ? (t6 = /* @__PURE__ */ jsx(MissingAssetCheckbox, {
		checked: selected,
		onChange: t4,
		"aria-label": t5
	}), $[3] = selected, $[4] = t4, $[5] = t5, $[6] = t6) : t6 = $[6];
	let t7;
	$[7] === asset.playback_ids ? t7 = $[8] : (t7 = asset.playback_ids.find(_temp$14)?.id, $[7] = asset.playback_ids, $[8] = t7);
	let t8;
	$[9] !== asset || $[10] !== t7 ? (t8 = /* @__PURE__ */ jsx(VideoThumbnail, {
		asset: {
			assetId: asset.id,
			data: asset,
			filename: asset.id,
			playbackId: t7
		},
		width: 150
	}), $[9] = asset, $[10] = t7, $[11] = t8) : t8 = $[11];
	let t9;
	$[12] === asset.id ? t9 = $[13] : (t9 = truncateString(asset.id, 15), $[12] = asset.id, $[13] = t9);
	let t10;
	$[14] === t9 ? t10 = $[15] : (t10 = /* @__PURE__ */ jsx(Code, {
		size: 2,
		children: t9
	}), $[14] = t9, $[15] = t10);
	let t11;
	$[16] === duration.formatted ? t11 = $[17] : (t11 = /* @__PURE__ */ jsxs(Text, {
		muted: !0,
		size: 2,
		children: [
			"(",
			duration.formatted,
			")"
		]
	}), $[16] = duration.formatted, $[17] = t11);
	let t12;
	$[18] !== t10 || $[19] !== t11 ? (t12 = /* @__PURE__ */ jsxs(Flex, {
		align: "center",
		gap: 1,
		children: [
			t10,
			" ",
			t11
		]
	}), $[18] = t10, $[19] = t11, $[20] = t12) : t12 = $[20];
	let t13 = Number(asset.created_at) * 1e3, t14;
	$[21] === t13 ? t14 = $[22] : (t14 = new Date(t13).toLocaleDateString("en", {
		year: "numeric",
		day: "2-digit",
		month: "2-digit"
	}), $[21] = t13, $[22] = t14);
	let t15;
	$[23] === t14 ? t15 = $[24] : (t15 = /* @__PURE__ */ jsxs(Text, {
		size: 1,
		children: [
			"Uploaded at",
			" ",
			t14
		]
	}), $[23] = t14, $[24] = t15);
	let t16;
	$[25] !== t12 || $[26] !== t15 ? (t16 = /* @__PURE__ */ jsxs(Stack, {
		gap: 2,
		children: [t12, t15]
	}), $[25] = t12, $[26] = t15, $[27] = t16) : t16 = $[27];
	let t17;
	$[28] !== t16 || $[29] !== t6 || $[30] !== t8 ? (t17 = /* @__PURE__ */ jsxs(Flex, {
		align: "center",
		gap: 2,
		children: [
			t6,
			t8,
			t16
		]
	}), $[28] = t16, $[29] = t6, $[30] = t8, $[31] = t17) : t17 = $[31];
	let t18;
	return $[32] !== asset.id || $[33] !== t17 || $[34] !== t2 ? (t18 = /* @__PURE__ */ jsx(Card, {
		tone: t2,
		border: !0,
		paddingX: 2,
		paddingY: 3,
		style: t3,
		radius: 1,
		children: t17
	}, t1), $[32] = asset.id, $[33] = t17, $[34] = t2, $[35] = t18) : t18 = $[35], t18;
}
function _temp$14(p) {
	return p.id;
}
function ImportVideosDialog(props) {
	let $ = c(43), { importState } = props, canTriggerImport = (importState === "idle" || importState === "error") && props.selectedAssets.length > 0, isImporting = importState === "importing", noAssetsToImport = props.missingAssets?.length === 0 && !props.muxAssets.loading && !props.assetsInSanityLoading, t0;
	$[0] !== canTriggerImport || $[1] !== importState || $[2] !== isImporting || $[3] !== noAssetsToImport || $[4] !== props.closeDialog || $[5] !== props.importAssets || $[6] !== props.missingAssets || $[7] !== props.selectedAssets ? (t0 = importState !== "done" && !noAssetsToImport && /* @__PURE__ */ jsx(Card, {
		padding: 3,
		children: /* @__PURE__ */ jsxs(Flex, {
			justify: "space-between",
			align: "center",
			children: [/* @__PURE__ */ jsx(Button, {
				fontSize: 2,
				padding: 3,
				mode: "ghost",
				text: "Cancel",
				tone: "critical",
				onClick: props.closeDialog,
				disabled: isImporting
			}), props.missingAssets && /* @__PURE__ */ jsx(Button, {
				icon: RetrieveIcon,
				fontSize: 2,
				padding: 3,
				mode: "ghost",
				text: props.selectedAssets?.length > 0 ? `Import ${props.selectedAssets.length} video(s)` : "No video(s) selected",
				tone: "positive",
				onClick: props.importAssets,
				iconRight: isImporting && Spinner,
				disabled: !canTriggerImport
			})]
		})
	}), $[0] = canTriggerImport, $[1] = importState, $[2] = isImporting, $[3] = noAssetsToImport, $[4] = props.closeDialog, $[5] = props.importAssets, $[6] = props.missingAssets, $[7] = props.selectedAssets, $[8] = t0) : t0 = $[8];
	let t1;
	$[9] === props.muxAssets.hasSkippedAssetsWithoutPlayback ? t1 = $[10] : (t1 = props.muxAssets.hasSkippedAssetsWithoutPlayback && /* @__PURE__ */ jsx(Card, {
		tone: "caution",
		marginBottom: 5,
		padding: 3,
		border: !0,
		children: /* @__PURE__ */ jsxs(Flex, {
			align: "center",
			gap: 2,
			children: [/* @__PURE__ */ jsx(InfoOutlineIcon, { fontSize: 36 }), /* @__PURE__ */ jsxs(Stack, {
				gap: 2,
				children: [/* @__PURE__ */ jsx(Text, {
					size: 2,
					weight: "semibold",
					children: "Some videos were skipped"
				}), /* @__PURE__ */ jsx(Text, {
					size: 1,
					children: "Videos without playback IDs cannot be imported and have been excluded from the list."
				})]
			})]
		})
	}), $[9] = props.muxAssets.hasSkippedAssetsWithoutPlayback, $[10] = t1);
	let t2;
	$[11] !== props.assetsInSanityLoading || $[12] !== props.missingAssets || $[13] !== props.muxAssets.loading ? (t2 = (props.muxAssets.loading || props.assetsInSanityLoading) && /* @__PURE__ */ jsx(Card, {
		tone: "primary",
		marginBottom: 5,
		padding: 3,
		border: !0,
		children: /* @__PURE__ */ jsxs(Flex, {
			align: "center",
			gap: 4,
			children: [/* @__PURE__ */ jsx(Spinner, {
				muted: !0,
				size: 4
			}), /* @__PURE__ */ jsxs(Stack, {
				gap: 2,
				children: [/* @__PURE__ */ jsx(Text, {
					size: 2,
					weight: "semibold",
					children: "Loading assets from Mux"
				}), /* @__PURE__ */ jsxs(Text, {
					size: 1,
					children: ["This may take a while.", props.missingAssets && props.missingAssets.length > 0 && ` There are at least ${props.missingAssets.length} video${props.missingAssets.length > 1 ? "s" : ""} currently not in Sanity...`]
				})]
			})]
		})
	}), $[11] = props.assetsInSanityLoading, $[12] = props.missingAssets, $[13] = props.muxAssets.loading, $[14] = t2) : t2 = $[14];
	let t3;
	$[15] !== props.missingAssets || $[16] !== props.muxAssets.error ? (t3 = props.muxAssets.error && /* @__PURE__ */ jsx(Card, {
		tone: "critical",
		marginBottom: 5,
		padding: 3,
		border: !0,
		children: /* @__PURE__ */ jsxs(Flex, {
			align: "center",
			gap: 2,
			children: [/* @__PURE__ */ jsx(ErrorOutlineIcon, { fontSize: 36 }), /* @__PURE__ */ jsxs(Stack, {
				gap: 2,
				children: [/* @__PURE__ */ jsx(Text, {
					size: 2,
					weight: "semibold",
					children: "There was an error getting all data from Mux"
				}), /* @__PURE__ */ jsx(Text, {
					size: 1,
					children: props.missingAssets ? `But we've found ${props.missingAssets.length} video${props.missingAssets.length > 1 ? "s" : ""} not in Sanity, which you can start importing now.` : "Please try again or contact a developer for help."
				})]
			})]
		})
	}), $[15] = props.missingAssets, $[16] = props.muxAssets.error, $[17] = t3) : t3 = $[17];
	let t4;
	$[18] !== importState || $[19] !== props.selectedAssets ? (t4 = importState === "importing" && /* @__PURE__ */ jsx(Card, {
		tone: "primary",
		marginBottom: 5,
		padding: 3,
		border: !0,
		children: /* @__PURE__ */ jsxs(Flex, {
			align: "center",
			gap: 4,
			children: [/* @__PURE__ */ jsx(Spinner, {
				muted: !0,
				size: 4
			}), /* @__PURE__ */ jsx(Stack, {
				gap: 2,
				children: /* @__PURE__ */ jsxs(Text, {
					size: 2,
					weight: "semibold",
					children: [
						"Importing ",
						props.selectedAssets.length,
						" video",
						props.selectedAssets.length > 1 && "s",
						" from Mux"
					]
				})
			})]
		})
	}), $[18] = importState, $[19] = props.selectedAssets, $[20] = t4) : t4 = $[20];
	let t5;
	$[21] !== importState || $[22] !== props.importAssets || $[23] !== props.importError ? (t5 = importState === "error" && /* @__PURE__ */ jsx(Card, {
		tone: "critical",
		marginBottom: 5,
		padding: 3,
		border: !0,
		children: /* @__PURE__ */ jsxs(Flex, {
			align: "center",
			gap: 2,
			children: [/* @__PURE__ */ jsx(ErrorOutlineIcon, { fontSize: 36 }), /* @__PURE__ */ jsxs(Stack, {
				gap: 2,
				children: [
					/* @__PURE__ */ jsx(Text, {
						size: 2,
						weight: "semibold",
						children: "There was an error importing videos"
					}),
					/* @__PURE__ */ jsx(Text, {
						size: 1,
						children: props.importError ? `Error: ${props.importError}` : "Please try again or contact a developer for help."
					}),
					/* @__PURE__ */ jsx(Box, {
						marginTop: 1,
						children: /* @__PURE__ */ jsx(Button, {
							icon: RetryIcon,
							text: "Retry",
							tone: "primary",
							onClick: props.importAssets
						})
					})
				]
			})]
		})
	}), $[21] = importState, $[22] = props.importAssets, $[23] = props.importError, $[24] = t5) : t5 = $[24];
	let t6;
	$[25] !== importState || $[26] !== noAssetsToImport ? (t6 = (noAssetsToImport || importState === "done") && /* @__PURE__ */ jsxs(Stack, {
		paddingY: 5,
		marginBottom: 4,
		gap: 3,
		style: { textAlign: "center" },
		children: [
			/* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(CheckmarkCircleIcon, { fontSize: 48 }) }),
			/* @__PURE__ */ jsx(Heading, {
				size: 2,
				children: importState === "done" ? "Videos imported successfully" : "There are no Mux videos to import"
			}),
			/* @__PURE__ */ jsx(Text, {
				size: 2,
				children: importState === "done" ? "You can now use them in your Sanity content." : "They're all in Sanity and ready to be used in your content."
			})
		]
	}), $[25] = importState, $[26] = noAssetsToImport, $[27] = t6) : t6 = $[27];
	let t7;
	$[28] !== importState || $[29] !== props ? (t7 = props.missingAssets && props.missingAssets.length > 0 && (importState === "idle" || importState === "error") && /* @__PURE__ */ jsxs(Stack, {
		gap: 4,
		children: [
			/* @__PURE__ */ jsxs(Heading, {
				size: 1,
				children: [
					"There are ",
					props.missingAssets.length,
					props.muxAssets.loading && "+",
					" Mux video",
					props.missingAssets.length > 1 && "s",
					" ",
					"not in Sanity"
				]
			}),
			!props.muxAssets.loading && /* @__PURE__ */ jsxs(Flex, {
				align: "center",
				paddingX: 2,
				children: [/* @__PURE__ */ jsx(Checkbox, {
					id: "import-all",
					style: { display: "block" },
					onClick: (e) => {
						e.currentTarget.checked ? props.missingAssets && props.setSelectedAssets(props.missingAssets) : props.setSelectedAssets([]);
					},
					checked: props.selectedAssets.length === props.missingAssets.length
				}), /* @__PURE__ */ jsx(Box, {
					flex: 1,
					paddingLeft: 3,
					as: "label",
					htmlFor: "import-all",
					children: /* @__PURE__ */ jsx(Text, { children: "Import all" })
				})]
			}),
			props.missingAssets.map((asset) => /* @__PURE__ */ jsx(MissingAsset, {
				asset,
				selectAsset: (selected) => {
					selected ? props.setSelectedAssets([...props.selectedAssets, asset]) : props.setSelectedAssets(props.selectedAssets.filter((a) => a.id !== asset.id));
				},
				selected: props.selectedAssets.some((a_0) => a_0.id === asset.id)
			}, asset.id))
		]
	}), $[28] = importState, $[29] = props, $[30] = t7) : t7 = $[30];
	let t8;
	$[31] !== t1 || $[32] !== t2 || $[33] !== t3 || $[34] !== t4 || $[35] !== t5 || $[36] !== t6 || $[37] !== t7 ? (t8 = /* @__PURE__ */ jsxs(Box, {
		padding: 3,
		children: [
			t1,
			t2,
			t3,
			t4,
			t5,
			t6,
			t7
		]
	}), $[31] = t1, $[32] = t2, $[33] = t3, $[34] = t4, $[35] = t5, $[36] = t6, $[37] = t7, $[38] = t8) : t8 = $[38];
	let t9;
	return $[39] !== props.closeDialog || $[40] !== t0 || $[41] !== t8 ? (t9 = /* @__PURE__ */ jsx(Dialog, {
		animate: !0,
		header: "Import videos from Mux",
		zOffset: DIALOGS_Z_INDEX,
		id: "video-details-dialog",
		onClose: props.closeDialog,
		onClickOutside: props.closeDialog,
		width: 1,
		position: "fixed",
		footer: t0,
		children: t8
	}), $[39] = props.closeDialog, $[40] = t0, $[41] = t8, $[42] = t9) : t9 = $[42], t9;
}
function ImportVideosFromMux() {
	let $ = c(4), importAssets = useImportMuxAssets();
	if (!importAssets.hasSecrets) return;
	if (importAssets.dialogOpen) {
		let t0;
		return $[0] === importAssets ? t0 = $[1] : (t0 = /* @__PURE__ */ jsx(ImportVideosDialog, { ...importAssets }), $[0] = importAssets, $[1] = t0), t0;
	}
	let t0;
	return $[2] === importAssets.openDialog ? t0 = $[3] : (t0 = /* @__PURE__ */ jsx(Button, {
		mode: "bleed",
		text: "Import from Mux",
		onClick: importAssets.openDialog
	}), $[2] = importAssets.openDialog, $[3] = t0), t0;
}
const PageSelector = (props) => {
	let $ = c(26), page = props.page, setPage = props.setPage, t0, t1;
	$[0] !== page || $[1] !== props.total || $[2] !== setPage ? (t0 = () => {
		let clamped = Math.min(props.total - 1, Math.max(0, page));
		page !== clamped && setPage(clamped);
	}, t1 = [
		page,
		props.total,
		setPage
	], $[0] = page, $[1] = props.total, $[2] = setPage, $[3] = t0, $[4] = t1) : (t0 = $[3], t1 = $[4]), useEffect(t0, t1);
	let t2;
	$[5] === Symbol.for("react.memo_cache_sentinel") ? (t2 = { cursor: "pointer" }, $[5] = t2) : t2 = $[5];
	let t3 = page <= 0, t4;
	$[6] !== props.total || $[7] !== setPage ? (t4 = () => {
		setPage((p) => Math.min(props.total - 1, Math.max(0, p - 1)));
	}, $[6] = props.total, $[7] = setPage, $[8] = t4) : t4 = $[8];
	let t5;
	$[9] !== t3 || $[10] !== t4 ? (t5 = /* @__PURE__ */ jsx(Button, {
		icon: ChevronLeftIcon,
		mode: "bleed",
		padding: 3,
		style: t2,
		disabled: t3,
		onClick: t4
	}), $[9] = t3, $[10] = t4, $[11] = t5) : t5 = $[11];
	let t6 = page + 1, t7;
	$[12] !== props.total || $[13] !== t6 ? (t7 = /* @__PURE__ */ jsxs(Label, {
		muted: !0,
		children: [
			"Page ",
			t6,
			"/",
			props.total
		]
	}), $[12] = props.total, $[13] = t6, $[14] = t7) : t7 = $[14];
	let t8;
	$[15] === Symbol.for("react.memo_cache_sentinel") ? (t8 = { cursor: "pointer" }, $[15] = t8) : t8 = $[15];
	let t9 = page >= props.total - 1, t10;
	$[16] !== props.total || $[17] !== setPage ? (t10 = () => {
		setPage((p_0) => Math.min(props.total - 1, Math.max(0, p_0 + 1)));
	}, $[16] = props.total, $[17] = setPage, $[18] = t10) : t10 = $[18];
	let t11;
	$[19] !== t10 || $[20] !== t9 ? (t11 = /* @__PURE__ */ jsx(Button, {
		icon: ChevronRightIcon,
		mode: "bleed",
		padding: 3,
		style: t8,
		disabled: t9,
		onClick: t10
	}), $[19] = t10, $[20] = t9, $[21] = t11) : t11 = $[21];
	let t12;
	return $[22] !== t11 || $[23] !== t5 || $[24] !== t7 ? (t12 = /* @__PURE__ */ jsxs(Fragment, { children: [
		t5,
		t7,
		t11
	] }), $[22] = t11, $[23] = t5, $[24] = t7, $[25] = t12) : t12 = $[25], t12;
};
/**
* Adds a `_key` to array items in MuxAsset data (Sanity requires `_key` on array
* items). Keys are derived from each item's stable Mux `id`, so repeated calls
* are idempotent and don't churn the document — important because the asset is
* persisted on every poll while it prepares.
*/
function addKeysToMuxData(data) {
	return {
		...data,
		tracks: data.tracks?.map((track, index) => ({
			...track,
			_key: track.id || `track-${index}`
		})),
		playback_ids: data.playback_ids?.map((playbackId, index) => ({
			...playbackId,
			_key: playbackId.id || `playback-${index}`
		})),
		static_renditions: data.static_renditions ? {
			...data.static_renditions,
			files: data.static_renditions.files?.map((file, index) => ({
				...file,
				_key: file.id || `rendition-${index}`
			}))
		} : void 0
	};
}
function useResyncMuxMetadata() {
	let $ = c(32), documentStore = useDocumentStore(), client = useClient$1(), [sanityAssets, sanityAssetsLoading] = useSanityAssets(documentStore), hasSecrets = !!useSecretsDocumentValues().value.secrets?.secretKey, [resyncError, setResyncError] = useState(), [resyncState, setResyncState] = useState("closed"), dialogOpen = resyncState !== "closed", t0 = hasSecrets && dialogOpen, t1;
	$[0] !== client || $[1] !== t0 ? (t1 = {
		client,
		enabled: t0
	}, $[0] = client, $[1] = t0, $[2] = t1) : t1 = $[2];
	let muxAssets = useMuxAssets(t1), t2;
	$[3] !== muxAssets.data || $[4] !== sanityAssets ? (t2 = sanityAssets && muxAssets.data ? sanityAssets.map((sanityDoc) => {
		let muxAsset = muxAssets.data?.find((m) => m.id === sanityDoc.assetId || m.id === sanityDoc.data?.id);
		return {
			sanityDoc,
			muxAsset,
			muxTitle: muxAsset?.meta?.title,
			currentTitle: sanityDoc.filename
		};
	}) : void 0, $[3] = muxAssets.data, $[4] = sanityAssets, $[5] = t2) : t2 = $[5];
	let matchedAssets = t2, t3;
	$[6] === resyncState ? t3 = $[7] : (t3 = () => {
		resyncState !== "syncing" && setResyncState("closed");
	}, $[6] = resyncState, $[7] = t3);
	let closeDialog = t3, t4;
	$[8] === resyncState ? t4 = $[9] : (t4 = () => {
		resyncState === "closed" && setResyncState("idle");
	}, $[8] = resyncState, $[9] = t4);
	let openDialog = t4, t5;
	$[10] !== client || $[11] !== matchedAssets ? (t5 = async function syncAllVideos() {
		if (matchedAssets) {
			setResyncState("syncing");
			try {
				let tx = client.transaction();
				matchedAssets.forEach((matched) => {
					let newTitle = matched.muxTitle || "";
					tx.patch(matched.sanityDoc._id, { set: { filename: newTitle } });
				}), await tx.commit({ returnDocuments: !1 }), setResyncState("done");
			} catch (t6) {
				let error = t6;
				setResyncState("error"), setResyncError(error);
			}
		}
	}, $[10] = client, $[11] = matchedAssets, $[12] = t5) : t5 = $[12];
	let syncAllVideos = t5, t6;
	$[13] !== client || $[14] !== matchedAssets ? (t6 = async function syncOnlyEmpty() {
		if (matchedAssets) {
			setResyncState("syncing");
			try {
				let tx_0 = client.transaction();
				matchedAssets.forEach((matched_0) => {
					matched_0.muxAsset && matched_0.muxTitle && isEmptyOrPlaceholderTitle(matched_0.currentTitle, matched_0.muxAsset.id) && tx_0.patch(matched_0.sanityDoc._id, { set: { filename: matched_0.muxTitle } });
				}), await tx_0.commit({ returnDocuments: !1 }), setResyncState("done");
			} catch (t7) {
				let error_0 = t7;
				setResyncState("error"), setResyncError(error_0);
			}
		}
	}, $[13] = client, $[14] = matchedAssets, $[15] = t6) : t6 = $[15];
	let syncOnlyEmpty = t6, t7;
	$[16] !== client || $[17] !== matchedAssets ? (t7 = async function syncFullData() {
		if (matchedAssets) {
			setResyncState("syncing");
			try {
				let tx_1 = client.transaction();
				matchedAssets.forEach((matched_1) => {
					if (!matched_1.muxAsset) return;
					let dataWithKeys = addKeysToMuxData(matched_1.muxAsset);
					tx_1.patch(matched_1.sanityDoc._id, { set: {
						filename: matched_1.muxTitle || matched_1.currentTitle || "",
						status: matched_1.muxAsset.status,
						data: dataWithKeys
					} });
				}), await tx_1.commit({ returnDocuments: !1 }), setResyncState("done");
			} catch (t8) {
				let error_1 = t8;
				setResyncState("error"), setResyncError(error_1);
			}
		}
	}, $[16] = client, $[17] = matchedAssets, $[18] = t7) : t7 = $[18];
	let syncFullData = t7, t8;
	return $[19] !== closeDialog || $[20] !== dialogOpen || $[21] !== hasSecrets || $[22] !== matchedAssets || $[23] !== muxAssets || $[24] !== openDialog || $[25] !== resyncError || $[26] !== resyncState || $[27] !== sanityAssetsLoading || $[28] !== syncAllVideos || $[29] !== syncFullData || $[30] !== syncOnlyEmpty ? (t8 = {
		sanityAssetsLoading,
		closeDialog,
		dialogOpen,
		resyncState,
		resyncError,
		hasSecrets,
		syncAllVideos,
		syncOnlyEmpty,
		syncFullData,
		matchedAssets,
		muxAssets,
		openDialog
	}, $[19] = closeDialog, $[20] = dialogOpen, $[21] = hasSecrets, $[22] = matchedAssets, $[23] = muxAssets, $[24] = openDialog, $[25] = resyncError, $[26] = resyncState, $[27] = sanityAssetsLoading, $[28] = syncAllVideos, $[29] = syncFullData, $[30] = syncOnlyEmpty, $[31] = t8) : t8 = $[31], t8;
}
const useSanityAssets = createHookFromObservableFactory((documentStore) => documentStore.listenQuery("*[_type == \"mux.videoAsset\"]", {}, { apiVersion: SANITY_API_VERSION }));
function OptionCard(t0) {
	let $ = c(25), { id, selected, onSelect, title, count, description, disabled } = t0, t1 = selected ? "primary" : "default", t2 = disabled ? "not-allowed" : "pointer", t3 = disabled ? .5 : 1, t4;
	$[0] !== t2 || $[1] !== t3 ? (t4 = {
		cursor: t2,
		opacity: t3
	}, $[0] = t2, $[1] = t3, $[2] = t4) : t4 = $[2];
	let t5;
	$[3] !== id || $[4] !== onSelect ? (t5 = () => onSelect(id), $[3] = id, $[4] = onSelect, $[5] = t5) : t5 = $[5];
	let t6;
	$[6] !== disabled || $[7] !== selected || $[8] !== t5 ? (t6 = /* @__PURE__ */ jsx(Box, {
		paddingTop: 1,
		children: /* @__PURE__ */ jsx(Radio, {
			checked: selected,
			onChange: t5,
			disabled,
			name: "sync-option"
		})
	}), $[6] = disabled, $[7] = selected, $[8] = t5, $[9] = t6) : t6 = $[9];
	let t7;
	$[10] !== count || $[11] !== title ? (t7 = /* @__PURE__ */ jsx(Flex, {
		align: "center",
		gap: 2,
		children: /* @__PURE__ */ jsxs(Text, {
			size: 2,
			weight: "semibold",
			children: [
				title,
				" (",
				count,
				")"
			]
		})
	}), $[10] = count, $[11] = title, $[12] = t7) : t7 = $[12];
	let t8;
	$[13] === description ? t8 = $[14] : (t8 = /* @__PURE__ */ jsx(Text, {
		size: 1,
		muted: !0,
		children: description
	}), $[13] = description, $[14] = t8);
	let t9;
	$[15] !== t7 || $[16] !== t8 ? (t9 = /* @__PURE__ */ jsxs(Stack, {
		gap: 2,
		flex: 1,
		children: [t7, t8]
	}), $[15] = t7, $[16] = t8, $[17] = t9) : t9 = $[17];
	let t10;
	$[18] !== t6 || $[19] !== t9 ? (t10 = /* @__PURE__ */ jsxs(Flex, {
		gap: 3,
		align: "flex-start",
		children: [t6, t9]
	}), $[18] = t6, $[19] = t9, $[20] = t10) : t10 = $[20];
	let t11;
	return $[21] !== t1 || $[22] !== t10 || $[23] !== t4 ? (t11 = /* @__PURE__ */ jsx(Card, {
		as: "label",
		padding: 3,
		radius: 2,
		border: !0,
		tone: t1,
		style: t4,
		children: t10
	}), $[21] = t1, $[22] = t10, $[23] = t4, $[24] = t11) : t11 = $[24], t11;
}
function ResyncMetadataDialog(props) {
	let $ = c(45), { resyncState } = props, t0;
	$[0] === props.matchedAssets ? t0 = $[1] : (t0 = props.matchedAssets?.filter(_temp$13).length || 0, $[0] = props.matchedAssets, $[1] = t0);
	let videosToUpdate = t0, t1;
	$[2] === props.matchedAssets ? t1 = $[3] : (t1 = props.matchedAssets?.filter(_temp2$10).length || 0, $[2] = props.matchedAssets, $[3] = t1);
	let videosWithEmptyOrPlaceholder = t1, hasEmptyTitles = videosWithEmptyOrPlaceholder > 0, [selectedOption, setSelectedOption] = useState(hasEmptyTitles ? "fillEmpty" : "syncTitles"), canTriggerResync = resyncState === "idle" || resyncState === "error", isResyncing = resyncState === "syncing", isDone = resyncState === "done", isLoading = props.muxAssets.loading || props.sanityAssetsLoading, t2;
	$[4] !== props || $[5] !== selectedOption ? (t2 = () => {
		bb54: switch (selectedOption) {
			case "fillEmpty":
				props.syncOnlyEmpty();
				break bb54;
			case "syncTitles":
				props.syncAllVideos();
				break bb54;
			case "fullResync":
				props.syncFullData();
				break bb54;
		}
	}, $[4] = props, $[5] = selectedOption, $[6] = t2) : t2 = $[6];
	let handleSync = t2, t3;
	$[7] !== canTriggerResync || $[8] !== handleSync || $[9] !== isDone || $[10] !== isLoading || $[11] !== isResyncing || $[12] !== props.closeDialog ? (t3 = !isDone && /* @__PURE__ */ jsx(Card, {
		padding: 3,
		children: /* @__PURE__ */ jsxs(Flex, {
			justify: "flex-end",
			gap: 2,
			children: [/* @__PURE__ */ jsx(Button, {
				fontSize: 2,
				padding: 3,
				mode: "ghost",
				text: "Cancel",
				onClick: props.closeDialog,
				disabled: isResyncing
			}), /* @__PURE__ */ jsx(Button, {
				icon: SyncIcon,
				fontSize: 2,
				padding: 3,
				text: "Run sync",
				tone: "primary",
				onClick: handleSync,
				iconRight: isResyncing && Spinner,
				disabled: !canTriggerResync || isLoading
			})]
		})
	}), $[7] = canTriggerResync, $[8] = handleSync, $[9] = isDone, $[10] = isLoading, $[11] = isResyncing, $[12] = props.closeDialog, $[13] = t3) : t3 = $[13];
	let t4;
	$[14] === isLoading ? t4 = $[15] : (t4 = isLoading && /* @__PURE__ */ jsx(Card, {
		tone: "primary",
		marginBottom: 4,
		padding: 3,
		border: !0,
		radius: 2,
		children: /* @__PURE__ */ jsxs(Flex, {
			align: "center",
			gap: 4,
			children: [/* @__PURE__ */ jsx(Spinner, {
				muted: !0,
				size: 4
			}), /* @__PURE__ */ jsxs(Stack, {
				gap: 2,
				children: [/* @__PURE__ */ jsx(Text, {
					size: 2,
					weight: "semibold",
					children: "Loading assets from Mux"
				}), /* @__PURE__ */ jsx(Text, {
					size: 1,
					muted: !0,
					children: "This may take a while."
				})]
			})]
		})
	}), $[14] = isLoading, $[15] = t4);
	let t5;
	$[16] === props.muxAssets.error ? t5 = $[17] : (t5 = props.muxAssets.error && /* @__PURE__ */ jsx(Card, {
		tone: "critical",
		marginBottom: 4,
		padding: 3,
		border: !0,
		radius: 2,
		children: /* @__PURE__ */ jsxs(Flex, {
			align: "center",
			gap: 2,
			children: [/* @__PURE__ */ jsx(ErrorOutlineIcon, { fontSize: 36 }), /* @__PURE__ */ jsxs(Stack, {
				gap: 2,
				children: [/* @__PURE__ */ jsx(Text, {
					size: 2,
					weight: "semibold",
					children: "There was an error getting data from Mux"
				}), /* @__PURE__ */ jsx(Text, {
					size: 1,
					children: "Please try again or contact a developer for help."
				})]
			})]
		})
	}), $[16] = props.muxAssets.error, $[17] = t5);
	let t6;
	$[18] === resyncState ? t6 = $[19] : (t6 = resyncState === "syncing" && /* @__PURE__ */ jsx(Card, {
		tone: "primary",
		marginBottom: 4,
		padding: 3,
		border: !0,
		radius: 2,
		children: /* @__PURE__ */ jsxs(Flex, {
			align: "center",
			gap: 4,
			children: [/* @__PURE__ */ jsx(Spinner, {
				muted: !0,
				size: 4
			}), /* @__PURE__ */ jsxs(Stack, {
				gap: 2,
				children: [/* @__PURE__ */ jsx(Text, {
					size: 2,
					weight: "semibold",
					children: "Syncing metadata"
				}), /* @__PURE__ */ jsx(Text, {
					size: 1,
					muted: !0,
					children: "Updating videos from Mux..."
				})]
			})]
		})
	}), $[18] = resyncState, $[19] = t6);
	let t7;
	$[20] !== props.resyncError || $[21] !== resyncState ? (t7 = resyncState === "error" && /* @__PURE__ */ jsx(Card, {
		tone: "critical",
		marginBottom: 4,
		padding: 3,
		border: !0,
		radius: 2,
		children: /* @__PURE__ */ jsxs(Flex, {
			align: "center",
			gap: 2,
			children: [/* @__PURE__ */ jsx(ErrorOutlineIcon, { fontSize: 36 }), /* @__PURE__ */ jsxs(Stack, {
				gap: 2,
				children: [/* @__PURE__ */ jsx(Text, {
					size: 2,
					weight: "semibold",
					children: "There was an error syncing metadata"
				}), /* @__PURE__ */ jsx(Text, {
					size: 1,
					children: props.resyncError ? `Error: ${props.resyncError}` : "Please try again or contact a developer for help."
				})]
			})]
		})
	}), $[20] = props.resyncError, $[21] = resyncState, $[22] = t7) : t7 = $[22];
	let t8;
	$[23] === resyncState ? t8 = $[24] : (t8 = resyncState === "done" && /* @__PURE__ */ jsxs(Stack, {
		paddingY: 5,
		gap: 3,
		style: { textAlign: "center" },
		children: [
			/* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(CheckmarkCircleIcon, { fontSize: 48 }) }),
			/* @__PURE__ */ jsx(Heading, {
				size: 2,
				children: "Sync completed"
			}),
			/* @__PURE__ */ jsx(Text, {
				size: 2,
				muted: !0,
				children: "Videos have been updated from Mux."
			})
		]
	}), $[23] = resyncState, $[24] = t8);
	let t9;
	$[25] !== hasEmptyTitles || $[26] !== isDone || $[27] !== isLoading || $[28] !== isResyncing || $[29] !== props.muxAssets.error || $[30] !== selectedOption || $[31] !== videosToUpdate || $[32] !== videosWithEmptyOrPlaceholder ? (t9 = !isDone && !isLoading && !props.muxAssets.error && /* @__PURE__ */ jsxs(Stack, {
		gap: 4,
		children: [/* @__PURE__ */ jsxs(Text, {
			size: 1,
			muted: !0,
			children: [
				"Found ",
				videosToUpdate,
				" video",
				videosToUpdate === 1 ? "" : "s",
				" linked to Mux."
			]
		}), /* @__PURE__ */ jsxs(Stack, {
			gap: 3,
			children: [
				hasEmptyTitles && /* @__PURE__ */ jsx(OptionCard, {
					id: "fillEmpty",
					selected: selectedOption === "fillEmpty",
					onSelect: setSelectedOption,
					title: "Fill missing titles only",
					count: videosWithEmptyOrPlaceholder,
					description: "Updates only videos without a title or with placeholder titles (e.g., 'Asset #123') using the title from Mux.",
					disabled: isResyncing
				}),
				/* @__PURE__ */ jsx(OptionCard, {
					id: "syncTitles",
					selected: selectedOption === "syncTitles",
					onSelect: setSelectedOption,
					title: "Sync all titles",
					count: videosToUpdate,
					description: "Replaces the title in Sanity with the title from Mux for all videos.",
					disabled: isResyncing
				}),
				/* @__PURE__ */ jsx(OptionCard, {
					id: "fullResync",
					selected: selectedOption === "fullResync",
					onSelect: setSelectedOption,
					title: "Full resync",
					count: videosToUpdate,
					description: "Updates all fields from Mux including status, duration, tracks, captions, and renditions.",
					disabled: isResyncing
				})
			]
		})]
	}), $[25] = hasEmptyTitles, $[26] = isDone, $[27] = isLoading, $[28] = isResyncing, $[29] = props.muxAssets.error, $[30] = selectedOption, $[31] = videosToUpdate, $[32] = videosWithEmptyOrPlaceholder, $[33] = t9) : t9 = $[33];
	let t10;
	$[34] !== t4 || $[35] !== t5 || $[36] !== t6 || $[37] !== t7 || $[38] !== t8 || $[39] !== t9 ? (t10 = /* @__PURE__ */ jsxs(Box, {
		padding: 4,
		children: [
			t4,
			t5,
			t6,
			t7,
			t8,
			t9
		]
	}), $[34] = t4, $[35] = t5, $[36] = t6, $[37] = t7, $[38] = t8, $[39] = t9, $[40] = t10) : t10 = $[40];
	let t11;
	return $[41] !== props.closeDialog || $[42] !== t10 || $[43] !== t3 ? (t11 = /* @__PURE__ */ jsx(Dialog, {
		animate: !0,
		header: "Sync with Mux",
		zOffset: DIALOGS_Z_INDEX,
		id: "resync-metadata-dialog",
		onClose: props.closeDialog,
		onClickOutside: props.closeDialog,
		width: 1,
		position: "fixed",
		footer: t3,
		children: t10
	}), $[41] = props.closeDialog, $[42] = t10, $[43] = t3, $[44] = t11) : t11 = $[44], t11;
}
function _temp2$10(m_0) {
	return m_0.muxAsset && m_0.muxTitle && isEmptyOrPlaceholderTitle(m_0.currentTitle, m_0.muxAsset.id);
}
function _temp$13(m) {
	return m.muxAsset;
}
function ResyncMetadata() {
	let $ = c(4), resyncMetadata = useResyncMuxMetadata();
	if (!resyncMetadata.hasSecrets) return;
	if (resyncMetadata.dialogOpen) {
		let t0;
		return $[0] === resyncMetadata ? t0 = $[1] : (t0 = /* @__PURE__ */ jsx(ResyncMetadataDialog, { ...resyncMetadata }), $[0] = resyncMetadata, $[1] = t0), t0;
	}
	let t0;
	return $[2] === resyncMetadata.openDialog ? t0 = $[3] : (t0 = /* @__PURE__ */ jsx(Button, {
		mode: "bleed",
		text: "Sync with Mux",
		onClick: resyncMetadata.openDialog
	}), $[2] = resyncMetadata.openDialog, $[3] = t0), t0;
}
const CONTEXT_MENU_POPOVER_PROPS = {
	constrainSize: !0,
	placement: "bottom",
	portal: !0,
	width: 0
};
/**
* @sanity/ui components adapted from:
* https://github.com/sanity-io/sanity/blob/next/packages/sanity/src/desk/components/pane/PaneContextMenuButton.tsx#L19
*/
function SelectSortOptions(props) {
	let $ = c(7), id = useId(), t0;
	$[0] === Symbol.for("react.memo_cache_sentinel") ? (t0 = /* @__PURE__ */ jsx(Button, {
		text: "Sort",
		icon: SortIcon,
		mode: "bleed",
		padding: 3,
		style: { cursor: "pointer" }
	}), $[0] = t0) : t0 = $[0];
	let t1;
	$[1] === Symbol.for("react.memo_cache_sentinel") ? (t1 = Object.entries(ASSET_SORT_OPTIONS), $[1] = t1) : t1 = $[1];
	let t2;
	$[2] === props ? t2 = $[3] : (t2 = /* @__PURE__ */ jsx(Menu, { children: t1.map((t3) => {
		let [type, t4] = t3, { label } = t4;
		return /* @__PURE__ */ jsx(MenuItem, {
			"data-as": "button",
			onClick: () => props.setSort(type),
			padding: 3,
			tone: "default",
			text: label,
			pressed: type === props.sort
		}, type);
	}) }), $[2] = props, $[3] = t2);
	let t3;
	return $[4] !== id || $[5] !== t2 ? (t3 = /* @__PURE__ */ jsx(MenuButton, {
		button: t0,
		id,
		menu: t2,
		popover: CONTEXT_MENU_POPOVER_PROPS
	}), $[4] = id, $[5] = t2, $[6] = t3) : t3 = $[6], t3;
}
const SpinnerBox = () => {
	let $ = c(1), t0;
	return $[0] === Symbol.for("react.memo_cache_sentinel") ? (t0 = /* @__PURE__ */ jsx(Box, {
		style: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			minHeight: "150px"
		},
		children: /* @__PURE__ */ jsx(Spinner, {})
	}), $[0] = t0) : t0 = $[0], t0;
};
/**
* A caption or subtitle track. A chapters track is a text track too, and must never be listed
* or counted as captions. Text tracks stored without a `text_type` still count, as they always
* have.
*/
function isCaptionTrack(track) {
	return track?.type === "text" && track.text_type !== "chapters";
}
/** The chapters track Mux keeps next to the captions, e.g. from Robots' generate-chapters. */
function isChaptersTrack(track) {
	return track?.type === "text" && track.text_type === "chapters";
}
/** Whether the asset has a caption track a Robots workflow can read. */
function hasUsableCaptionTrack(tracks) {
	return (tracks ?? []).some((track) => isCaptionTrack(track) && (track.status === "ready" || track.status === "preparing"));
}
/** Text and audio tracks reach the player through its manifest, which lists only ready ones. */
function isManifestTrack(track) {
	return track?.type === "text" || track?.type === "audio";
}
/**
* Changes when a text or audio track becomes ready or goes away, so a player can reload the
* manifest that lists them. A track without a status (the primary audio) counts as ready.
*/
function readyTracksKey(tracks) {
	return (tracks ?? []).filter((track) => isManifestTrack(track) && (track.status ?? "ready") === "ready").map((track) => track?.id).join(",");
}
/** Whether Mux is still preparing a text or audio track, so the asset is worth reading again. */
function hasPreparingTracks(tracks) {
	return (tracks ?? []).some((track) => isManifestTrack(track) && track.status === "preparing");
}
function useResyncAsset(options) {
	let $ = c(10), client = useClient$1(), toast = useToast(), [resyncState, setResyncState] = useState("idle"), [resyncError, setResyncError] = useState(null), showToast = options?.showToast ?? !1, t0;
	$[0] !== client || $[1] !== options || $[2] !== showToast || $[3] !== toast ? (t0 = async (asset) => {
		if (!asset.assetId) showToast && toast.push({
			title: "Cannot resync",
			description: "Asset has no Mux ID",
			status: "error"
		}), options?.onError?.(/* @__PURE__ */ Error("Asset has no Mux ID"));
		else if (!asset._id) showToast && toast.push({
			title: "Cannot resync",
			description: "Asset has no document ID",
			status: "error"
		}), options?.onError?.(/* @__PURE__ */ Error("Asset has no document ID"));
		else {
			setResyncState("syncing"), setResyncError(null);
			try {
				let muxData = (await getAsset(client, asset.assetId)).data, dataWithKeys = addKeysToMuxData(muxData), playbackId = playbackIdToKeep(asset.playbackId, muxData.playback_ids), patch = client.patch(asset._id).set({
					status: muxData.status,
					data: dataWithKeys,
					...muxData.meta?.title && { filename: muxData.meta.title },
					...playbackId && { playbackId }
				});
				return await (playbackId ? patch : patch.unset(["playbackId"])).commit({ returnDocuments: !1 }), setResyncState("success"), showToast && toast.push({
					title: "Asset synced",
					description: "Data has been updated from Mux",
					status: "success"
				}), options?.onSuccess?.(muxData), muxData;
			} catch (t1) {
				let error = t1;
				setResyncState("error"), setResyncError(error), console.error("Failed to refresh asset data:", error), showToast && toast.push({
					title: "Sync failed",
					description: "Could not sync asset from Mux",
					status: "error"
				}), options?.onError?.(error);
				return;
			}
		}
	}, $[0] = client, $[1] = options, $[2] = showToast, $[3] = toast, $[4] = t0) : t0 = $[4];
	let resyncAsset = t0, t1 = resyncState === "syncing", t2;
	return $[5] !== resyncAsset || $[6] !== resyncError || $[7] !== resyncState || $[8] !== t1 ? (t2 = {
		resyncState,
		resyncError,
		resyncAsset,
		isResyncing: t1
	}, $[5] = resyncAsset, $[6] = resyncError, $[7] = resyncState, $[8] = t1, $[9] = t2) : t2 = $[9], t2;
}
/**
* Alternative audio tracks are every audio track that wasn't ingested from the asset's main input.
* Mux flags the ingested one with `primary: true`.
*/
function isAlternativeAudioTrack(track) {
	return track.primary !== !0;
}
function getAudioTracks(tracks) {
	return (tracks || []).filter((track) => track.type === "audio");
}
/**
* The primary audio track has no `status` — treat it, and any track Mux doesn't
* report a status for, as ready.
*/
function getAudioTrackStatus(track) {
	return track.status || "ready";
}
/**
* Polls Mux API to find and track the status of a newly added alternative audio track.
* The track may be in "preparing" state initially, then become "ready" or "errored".
*
* @param options - Configuration options for polling
* @returns Promise resolving to the poll result
*/
async function pollAudioTrackStatus(options) {
	let { client, assetId, trackName, trackLanguageCode, knownTrackIds = [], maxAttempts = 10, onTrackFound, onTrackErrored, onTrackReady } = options, trimmedName = trackName.trim(), trimmedLanguageCode = trackLanguageCode.trim(), newTrack, attempts = 0, trackFound = !1, findTrack = (audioTracks) => {
		let candidates = audioTracks.filter((track) => isAlternativeAudioTrack(track) && !knownTrackIds.includes(track.id)), foundTrack = candidates.find((track) => track.name === trimmedName && track.language_code === trimmedLanguageCode);
		return foundTrack ||= candidates.find((track) => track.language_code === trimmedLanguageCode), !foundTrack && candidates.length > 0 && (foundTrack = candidates[candidates.length - 1]), foundTrack;
	};
	for (; attempts < maxAttempts;) {
		try {
			attempts > 0 && await new Promise((resolve) => setTimeout(resolve, 1e3));
			let foundTrack = findTrack(getAudioTracks((await getAsset(client, assetId)).data.tracks));
			if (!foundTrack) {
				attempts++;
				continue;
			}
			trackFound = !0, newTrack = foundTrack, onTrackFound && onTrackFound(foundTrack);
			let status = getAudioTrackStatus(foundTrack);
			if (status === "ready") {
				onTrackReady && onTrackReady(foundTrack);
				break;
			}
			if (status === "errored") return onTrackErrored && onTrackErrored(foundTrack), {
				track: foundTrack,
				found: !0,
				status: "errored"
			};
		} catch (error) {
			console.error("Failed to fetch updated asset:", error);
		}
		attempts++;
	}
	return !newTrack || !trackFound ? {
		track: void 0,
		found: !1,
		status: "not-found"
	} : getAudioTrackStatus(newTrack) === "preparing" ? {
		track: newTrack,
		found: !0,
		status: "preparing"
	} : {
		track: newTrack,
		found: !0,
		status: "ready"
	};
}
function extractErrorMessage(error, defaultMessage = "Failed to process request") {
	let message = "";
	if (error && typeof error == "object") {
		let err = error;
		message = err.response?.body?.message || err.message || "";
	} else typeof error == "string" && (message = error);
	if (!message) return defaultMessage;
	let match = message.match(/\(([^)]+)\)/);
	if (match && match[1]) return match[1];
	if (message.includes("responded with")) {
		let parts = message.split("(");
		if (parts.length > 1) return parts[parts.length - 1].replace(")", "").trim();
	}
	return message;
}
/**
* Polls Mux API to find and track the status of a newly added text track.
* The track may be in "preparing" state initially, then become "ready" or "errored".
*
* @param options - Configuration options for polling
* @returns Promise resolving to the poll result
*/
async function pollTrackStatus(options) {
	let { client, assetId, trackName, trackLanguageCode, maxAttempts = 10, onTrackFound, onTrackErrored, onTrackReady } = options, trimmedName = trackName.trim(), trimmedLanguageCode = trackLanguageCode.trim(), newTrack, attempts = 0, trackFound = !1, findTrack = (textTracks) => {
		let foundTrack = textTracks.find((track) => track.name === trimmedName && track.language_code === trimmedLanguageCode);
		return foundTrack ||= textTracks.find((track) => track.language_code === trimmedLanguageCode), !foundTrack && textTracks.length > 0 && (foundTrack = textTracks[textTracks.length - 1]), foundTrack;
	};
	for (; attempts < maxAttempts;) {
		try {
			attempts > 0 && await new Promise((resolve) => setTimeout(resolve, 1e3));
			let foundTrack = findTrack((await getAsset(client, assetId)).data.tracks?.filter(isCaptionTrack) || []);
			if (!foundTrack) {
				attempts++;
				continue;
			}
			if (trackFound = !0, newTrack = foundTrack, onTrackFound && onTrackFound(foundTrack), foundTrack.status === "ready") {
				onTrackReady && onTrackReady(foundTrack);
				break;
			}
			if (foundTrack.status === "errored") return onTrackErrored && onTrackErrored(foundTrack), {
				track: foundTrack,
				found: !0,
				status: "errored"
			};
		} catch (error) {
			console.error("Failed to fetch updated asset:", error);
		}
		attempts++;
	}
	return !newTrack || !trackFound ? {
		track: void 0,
		found: !1,
		status: "not-found"
	} : newTrack.status === "preparing" ? {
		track: newTrack,
		found: !0,
		status: "preparing"
	} : {
		track: newTrack,
		found: !0,
		status: "ready"
	};
}
/**
* May throw a Promise. Call this with {@link tryWithSuspend} or rethrow the Promise
*/
async function downloadVttFile(client, asset, track) {
	if (!track.id) throw Error("Track ID is missing");
	if (track.status !== "ready") throw Error(`Track is not ready yet. Status: ${track.status}`);
	if (!asset.assetId) throw Error("Asset ID is required");
	let playbackId = getPlaybackId(asset);
	if (!playbackId) throw Error("Playback ID is required");
	let playbackPolicy = getPlaybackPolicy(asset)?.policy, downloadUrl = `https://stream.mux.com/${playbackId}/text/${track.id}.vtt`;
	if (playbackPolicy === "signed" || playbackPolicy === "drm") {
		let token = generateJwt(client, playbackId, "v");
		downloadUrl += `?token=${token}`;
	}
	let response = await fetch(downloadUrl);
	if (!response.ok) throw Error(`Failed to download file: ${response.statusText}`);
	let blob = await response.blob(), blobUrl = URL.createObjectURL(blob), link = document.createElement("a");
	link.href = blobUrl, link.download = `${asset.filename || "captions"}-${track.language_code || "en"}.vtt`, document.body.appendChild(link), link.click(), document.body.removeChild(link), URL.revokeObjectURL(blobUrl);
}
const LANGUAGE_OPTIONS$3 = LanguagesList.getAllCodes().map((code) => ({
	value: code,
	label: LanguagesList.getNativeName(code)
})), AUDIO_FILE_ACCEPT = ".m4a,.mp3,.wav,.aac,.flac,.ogg,audio/*";
function AddAudioTrackDialog({ asset, knownTrackIds = [], onAdd, onClose }) {
	let client = useClient$1(), toast = useToast(), dialogId = `AddAudioTrackDialog${useId()}`, [audioUrl, setAudioUrl] = useState(""), [languageCode, setLanguageCode] = useState(""), [selectedLanguage, setSelectedLanguage] = useState(null), [name, setName] = useState(""), [isSubmitting, setIsSubmitting] = useState(!1), [selectedFile, setSelectedFile] = useState(null), fileInputRef = useRef(null), uploadAudioFile = async (file) => (await client.assets.upload("file", file, { filename: file.name })).url, handleAddTrackFromUrl = async () => {
		if (!asset.assetId) throw Error("Asset ID is required");
		let trimmedName = name.trim(), trimmedLanguageCode = languageCode.trim(), audioUrlToUse = audioUrl.trim();
		if (selectedFile) try {
			audioUrlToUse = await uploadAudioFile(selectedFile);
		} catch (uploadError) {
			throw toast.push({
				title: "Failed to upload audio file",
				status: "error",
				description: "Could not upload the audio file to Sanity. Please try again."
			}), setIsSubmitting(!1), uploadError;
		}
		await addAudioTrackFromUrl(client, asset.assetId, audioUrlToUse, {
			language_code: trimmedLanguageCode,
			name: trimmedName
		});
		let result = await pollAudioTrackStatus({
			client,
			assetId: asset.assetId,
			trackName: trimmedName,
			trackLanguageCode: trimmedLanguageCode,
			knownTrackIds,
			onTrackErrored: (track) => {
				let errorMessage = track.error?.messages?.[0] || track.error?.type || "The track failed to download from the provided URL";
				toast.push({
					title: "Audio track failed",
					status: "error",
					description: errorMessage
				}), onAdd(track), onClose();
			}
		});
		!result.found || !result.track ? (toast.push({
			title: "Audio track may have been added",
			status: "warning",
			description: "The track was created but its status could not be determined. It may still be processing. Please refresh the page to see if it appears."
		}), onClose()) : result.status !== "errored" && (result.status === "preparing" ? (toast.push({
			title: "Audio track is processing",
			status: "info",
			description: "The track was created and is being processed. It will appear in the list shortly."
		}), onAdd(result.track), onClose()) : (toast.push({
			title: "Audio track added",
			status: "success",
			description: "Audio track added successfully"
		}), onAdd(result.track), onClose()));
	}, handleSubmit = async () => {
		if (!selectedFile && !audioUrl.trim()) toast.push({
			title: "Audio file or URL required",
			status: "error",
			description: "Please select an audio file or enter an audio file URL"
		});
		else {
			if (audioUrl.trim() && !selectedFile) try {
				new URL(audioUrl.trim());
			} catch {
				toast.push({
					title: "Invalid URL",
					status: "error",
					description: "Please enter a valid URL (e.g., https://example.com/audio.m4a)"
				});
				return;
			}
			if (!name.trim()) toast.push({
				title: "Track name required",
				status: "error",
				description: "Please enter a name for this audio track"
			});
			else if (!languageCode.trim()) toast.push({
				title: "Language code required",
				status: "error",
				description: "Please enter a language code (e.g., en, es, fr)"
			});
			else {
				setIsSubmitting(!0);
				try {
					await handleAddTrackFromUrl();
				} catch (error) {
					toast.push({
						title: "Failed to add audio track",
						status: "error",
						description: extractErrorMessage(error, "Failed to add audio track")
					});
				} finally {
					setIsSubmitting(!1);
				}
			}
		}
	};
	return /* @__PURE__ */ jsx(Dialog, {
		id: dialogId,
		header: "Add Audio Track",
		onClose,
		width: 1,
		onClickOutside: onClose,
		children: /* @__PURE__ */ jsxs(Stack, {
			padding: 4,
			gap: 4,
			children: [
				/* @__PURE__ */ jsxs(Stack, {
					gap: 2,
					children: [
						/* @__PURE__ */ jsxs(Card, {
							padding: 3,
							marginBottom: 2,
							tone: "transparent",
							border: !0,
							radius: 2,
							children: [/* @__PURE__ */ jsxs(Flex, {
								align: "center",
								justify: "space-between",
								children: [/* @__PURE__ */ jsx(Text, {
									size: 1,
									muted: !0,
									children: selectedFile ? `Selected: ${selectedFile.name}` : "No file selected"
								}), /* @__PURE__ */ jsx(Button, {
									icon: UploadIcon,
									text: "Select File",
									mode: "ghost",
									tone: "primary",
									fontSize: 1,
									padding: 2,
									onClick: () => fileInputRef.current?.click(),
									disabled: isSubmitting
								})]
							}), /* @__PURE__ */ jsx("input", {
								ref: fileInputRef,
								type: "file",
								accept: AUDIO_FILE_ACCEPT,
								style: { display: "none" },
								onChange: (e) => {
									e.target.files && e.target.files.length > 0 && !isSubmitting && (setSelectedFile(e.target.files[0] ?? null), setAudioUrl(""));
								}
							})]
						}),
						/* @__PURE__ */ jsx(Text, {
							size: 1,
							muted: !0,
							style: { textAlign: "center" },
							children: "Or enter the audio file URL"
						}),
						/* @__PURE__ */ jsxs(Stack, {
							gap: 2,
							children: [
								/* @__PURE__ */ jsx(Label, {
									as: "label",
									htmlFor: "audio-url",
									children: "Audio File URL"
								}),
								/* @__PURE__ */ jsx(TextInput, {
									id: "audio-url",
									placeholder: "https://example.com/audio.m4a",
									value: audioUrl,
									onChange: (e) => {
										setAudioUrl(e.currentTarget.value), setSelectedFile(null);
									},
									disabled: isSubmitting
								}),
								/* @__PURE__ */ jsx(Text, {
									size: 1,
									muted: !0,
									children: "M4A, MP3 and WAV files are supported"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ jsxs(Stack, {
					gap: 2,
					children: [/* @__PURE__ */ jsx(Label, {
						as: "label",
						htmlFor: "audio-name",
						children: "Track name"
					}), /* @__PURE__ */ jsx(Autocomplete, {
						id: "audio-name",
						value: selectedLanguage?.value || "",
						onChange: (newValue) => {
							let selected = LANGUAGE_OPTIONS$3.find((opt) => opt.value === newValue);
							selected && (setSelectedLanguage(selected), setLanguageCode(selected.value), setName(selected.label));
						},
						options: LANGUAGE_OPTIONS$3,
						icon: TranslateIcon,
						placeholder: "Select language",
						filterOption: (query, option) => option.label.toLowerCase().indexOf(query.toLowerCase()) > -1 || option.value.toLowerCase().indexOf(query.toLowerCase()) > -1,
						openButton: !0,
						renderValue: (value) => LANGUAGE_OPTIONS$3.find((l) => l.value === value)?.label || value,
						renderOption: (option) => /* @__PURE__ */ jsx(Card, {
							"data-as": "button",
							padding: 3,
							radius: 2,
							tone: "inherit",
							children: /* @__PURE__ */ jsxs(Text, {
								size: 2,
								textOverflow: "ellipsis",
								children: [
									option.label,
									" (",
									option.value,
									")"
								]
							})
						}),
						disabled: isSubmitting
					})]
				}),
				/* @__PURE__ */ jsxs(Stack, {
					gap: 2,
					children: [/* @__PURE__ */ jsx(Label, {
						as: "label",
						htmlFor: "audio-language",
						children: "Language Code"
					}), /* @__PURE__ */ jsx(TextInput, {
						id: "audio-language",
						placeholder: "en-US",
						value: languageCode,
						onChange: (e) => {
							setLanguageCode(e.currentTarget.value), selectedLanguage && selectedLanguage.value !== e.currentTarget.value && (setSelectedLanguage(null), name && name !== selectedLanguage.label || setName(""));
						},
						disabled: isSubmitting
					})]
				}),
				/* @__PURE__ */ jsxs(Flex, {
					gap: 2,
					justify: "flex-end",
					marginTop: 2,
					children: [/* @__PURE__ */ jsx(Button, {
						text: "Cancel",
						mode: "ghost",
						onClick: onClose,
						disabled: isSubmitting
					}), /* @__PURE__ */ jsx(Button, {
						text: "Add Audio Track",
						tone: "primary",
						icon: isSubmitting ? /* @__PURE__ */ jsx(Spinner, { style: {
							verticalAlign: "middle",
							display: "inline-block",
							marginBottom: "-3px",
							width: "1em",
							height: "1em",
							marginRight: "-6px"
						} }) : /* @__PURE__ */ jsx(UploadIcon, {}),
						onClick: handleSubmit,
						disabled: isSubmitting
					})]
				})
			]
		})
	});
}
const LANGUAGE_OPTIONS$2 = LanguagesList.getAllCodes().map((code) => ({
	value: code,
	label: LanguagesList.getNativeName(code)
}));
function EditAudioTrackDialog({ asset, track, knownTrackIds = [], onUpdate, onClose }) {
	let client = useClient$1(), toast = useToast(), dialogId = `EditAudioTrackDialog${useId()}`, [audioUrl, setAudioUrl] = useState(""), [languageCode, setLanguageCode] = useState(track.language_code || ""), [selectedLanguage, setSelectedLanguage] = useState(() => {
		let baseCode = track.language_code?.split("-")[0], found = LANGUAGE_OPTIONS$2.find((opt) => opt.value === track.language_code || opt.value === baseCode);
		if (found) return found;
		if (track.name) {
			let foundByName = LANGUAGE_OPTIONS$2.find((opt) => opt.label === track.name);
			if (foundByName) return foundByName;
		}
		return null;
	}), [name, setName] = useState(track.name || ""), [isSubmitting, setIsSubmitting] = useState(!1), [selectedFile, setSelectedFile] = useState(null), fileInputRef = useRef(null);
	useEffect(() => {
		setLanguageCode(track.language_code || ""), setName(track.name || ""), setAudioUrl("");
		let baseCode = track.language_code?.split("-")[0], foundByCode = LANGUAGE_OPTIONS$2.find((opt) => opt.value === track.language_code || opt.value === baseCode), foundByName = track.name ? LANGUAGE_OPTIONS$2.find((opt) => opt.label === track.name) : null;
		setSelectedLanguage(foundByCode || foundByName || null);
	}, [
		track,
		asset,
		client
	]);
	let uploadAudioFile = async (file) => (await client.assets.upload("file", file, { filename: file.name })).url, refreshAssetData = async () => {
		if (asset._id && asset.assetId) try {
			let latestAssetData = await getAsset(client, asset.assetId);
			await client.patch(asset._id).set({
				data: latestAssetData.data,
				status: latestAssetData.data.status
			}).commit();
		} catch (refreshError) {
			console.error("Failed to refresh asset data:", refreshError);
		}
	}, handleUpdateTrackWithNewUrl = async () => {
		if (!asset.assetId) throw Error("Asset ID is required");
		let trimmedName = name.trim(), trimmedLanguageCode = languageCode.trim(), oldTrackId = track.id;
		try {
			await deleteAudioTrack(client, asset.assetId, oldTrackId);
		} catch (deleteError) {
			throw toast.push({
				title: "Failed to delete old track",
				status: "error",
				description: "Could not delete the old track. Please try again or delete it manually."
			}), setIsSubmitting(!1), deleteError;
		}
		let audioUrlToUse = audioUrl.trim();
		if (selectedFile) try {
			audioUrlToUse = await uploadAudioFile(selectedFile);
		} catch (uploadError) {
			throw toast.push({
				title: "Failed to upload audio file",
				status: "error",
				description: "Could not upload the audio file to Sanity. Please try again."
			}), setIsSubmitting(!1), uploadError;
		}
		try {
			await addAudioTrackFromUrl(client, asset.assetId, audioUrlToUse, {
				language_code: trimmedLanguageCode,
				name: trimmedName
			});
		} catch (error) {
			throw toast.push({
				title: "Failed to update audio track",
				status: "error",
				description: extractErrorMessage(error, "Failed to update audio track")
			}), setIsSubmitting(!1), error;
		}
		let result = await pollAudioTrackStatus({
			client,
			assetId: asset.assetId,
			trackName: trimmedName,
			trackLanguageCode: trimmedLanguageCode,
			knownTrackIds: knownTrackIds.filter((id) => id !== oldTrackId),
			onTrackErrored: async (erroredTrack) => {
				let errorMessage = erroredTrack.error?.messages?.[0] || erroredTrack.error?.type || "The track failed to download from the provided URL";
				toast.push({
					title: "Audio track failed",
					status: "error",
					description: errorMessage
				}), await refreshAssetData(), onUpdate(erroredTrack, oldTrackId), setIsSubmitting(!1);
			}
		});
		!result.found || !result.track ? (toast.push({
			title: "Audio track may have been updated",
			status: "warning",
			description: "The track was updated but its status could not be determined. It may still be processing. Please refresh the page to see if it appears."
		}), setIsSubmitting(!1)) : result.status !== "errored" && (await refreshAssetData(), result.status === "preparing" ? toast.push({
			title: "Audio track is processing",
			status: "info",
			description: "The track was updated and is being processed. It will appear in the list shortly."
		}) : toast.push({
			title: "Audio track updated",
			status: "success",
			description: "Audio track updated successfully"
		}), onUpdate(result.track, oldTrackId), setIsSubmitting(!1));
	}, handleSubmit = async () => {
		if (!name.trim()) toast.push({
			title: "Track name required",
			status: "error",
			description: "Please enter a name for this audio track"
		});
		else if (!languageCode.trim()) toast.push({
			title: "Language code required",
			status: "error",
			description: "Please enter a language code (e.g., en, es, fr)"
		});
		else {
			setIsSubmitting(!0);
			try {
				if (!asset.assetId) throw Error("Asset ID is required");
				if (!selectedFile && !audioUrl.trim()) {
					toast.push({
						title: "No changes",
						status: "info",
						description: "Please provide a new audio file or URL using the \"Replace\" button or URL field to update the track."
					}), setIsSubmitting(!1);
					return;
				}
				if (!selectedFile && audioUrl.trim()) try {
					new URL(audioUrl.trim());
				} catch {
					toast.push({
						title: "Invalid URL",
						status: "error",
						description: "Please enter a valid URL (e.g., https://example.com/audio.m4a)"
					}), setIsSubmitting(!1);
					return;
				}
				await handleUpdateTrackWithNewUrl(), onClose();
			} catch (error) {
				toast.push({
					title: "Failed to update audio track",
					status: "error",
					description: error instanceof Error ? error.message : "Please try again"
				});
			} finally {
				setIsSubmitting(!1);
			}
		}
	};
	return /* @__PURE__ */ jsx(Dialog, {
		id: dialogId,
		header: "Edit Audio Track",
		onClose,
		width: 1,
		onClickOutside: onClose,
		children: /* @__PURE__ */ jsxs(Stack, {
			padding: 4,
			gap: 4,
			children: [
				/* @__PURE__ */ jsxs(Stack, {
					gap: 2,
					children: [/* @__PURE__ */ jsxs(Card, {
						padding: 3,
						marginBottom: 2,
						tone: "transparent",
						border: !0,
						radius: 2,
						children: [
							/* @__PURE__ */ jsxs(Flex, {
								align: "center",
								justify: "space-between",
								children: [/* @__PURE__ */ jsx(Text, { children: track.name || track.language_code || "Untitled audio track" }), /* @__PURE__ */ jsx(Button, {
									icon: UploadIcon,
									text: "Replace",
									mode: "ghost",
									tone: "primary",
									fontSize: 1,
									padding: 2,
									onClick: () => fileInputRef.current?.click(),
									disabled: isSubmitting
								})]
							}),
							/* @__PURE__ */ jsx("input", {
								ref: fileInputRef,
								type: "file",
								accept: AUDIO_FILE_ACCEPT,
								style: { display: "none" },
								onChange: (e) => {
									e.target.files && e.target.files.length > 0 && !isSubmitting && (setSelectedFile(e.target.files[0] ?? null), setAudioUrl(""));
								}
							}),
							selectedFile && /* @__PURE__ */ jsxs(Text, {
								size: 1,
								muted: !0,
								style: { marginTop: 8 },
								children: ["Selected: ", selectedFile.name]
							})
						]
					}), /* @__PURE__ */ jsxs(Stack, {
						gap: 2,
						children: [
							/* @__PURE__ */ jsx(Label, {
								as: "label",
								htmlFor: "audio-url",
								children: "Audio File URL"
							}),
							/* @__PURE__ */ jsx(TextInput, {
								id: "audio-url",
								placeholder: "https://example.com/audio.m4a",
								value: audioUrl,
								onChange: (e) => {
									setAudioUrl(e.currentTarget.value), setSelectedFile(null);
								},
								disabled: isSubmitting
							}),
							/* @__PURE__ */ jsx(Text, {
								size: 1,
								muted: !0,
								children: "Mux can't change an existing track, so the track is replaced with a new audio file"
							})
						]
					})]
				}),
				/* @__PURE__ */ jsxs(Stack, {
					gap: 2,
					children: [/* @__PURE__ */ jsx(Label, {
						as: "label",
						htmlFor: "audio-name",
						children: "Track name"
					}), /* @__PURE__ */ jsx(Autocomplete, {
						id: "audio-name",
						value: selectedLanguage?.value || "",
						onChange: (newValue) => {
							let selected = LANGUAGE_OPTIONS$2.find((opt) => opt.value === newValue);
							selected && (setSelectedLanguage(selected), setLanguageCode(selected.value), setName(selected.label));
						},
						options: LANGUAGE_OPTIONS$2,
						icon: TranslateIcon,
						placeholder: "Select language",
						filterOption: (query, option) => option.label.toLowerCase().indexOf(query.toLowerCase()) > -1 || option.value.toLowerCase().indexOf(query.toLowerCase()) > -1,
						openButton: !0,
						renderValue: (value) => LANGUAGE_OPTIONS$2.find((l) => l.value === value)?.label || value,
						renderOption: (option) => /* @__PURE__ */ jsx(Card, {
							"data-as": "button",
							padding: 3,
							radius: 2,
							tone: "inherit",
							children: /* @__PURE__ */ jsxs(Text, {
								size: 2,
								textOverflow: "ellipsis",
								children: [
									option.label,
									" (",
									option.value,
									")"
								]
							})
						}),
						disabled: isSubmitting
					})]
				}),
				/* @__PURE__ */ jsxs(Stack, {
					gap: 2,
					children: [/* @__PURE__ */ jsx(Label, {
						as: "label",
						htmlFor: "audio-language",
						children: "Language Code"
					}), /* @__PURE__ */ jsx(TextInput, {
						id: "audio-language",
						placeholder: "en-US",
						value: languageCode,
						onChange: (e) => {
							setLanguageCode(e.currentTarget.value), selectedLanguage && selectedLanguage.value !== e.currentTarget.value && (setSelectedLanguage(null), name && name !== selectedLanguage.label || setName(""));
						},
						disabled: isSubmitting
					})]
				}),
				/* @__PURE__ */ jsxs(Flex, {
					gap: 2,
					justify: "flex-end",
					marginTop: 2,
					children: [/* @__PURE__ */ jsx(Button, {
						text: "Cancel",
						mode: "ghost",
						onClick: onClose,
						disabled: isSubmitting
					}), /* @__PURE__ */ jsx(Button, {
						text: "Update Audio Track",
						tone: "primary",
						icon: isSubmitting ? /* @__PURE__ */ jsx(Spinner, { style: {
							verticalAlign: "middle",
							display: "inline-block",
							marginBottom: "-3px",
							width: "1em",
							height: "1em",
							marginRight: "-6px"
						} }) : UploadIcon,
						onClick: handleSubmit,
						disabled: isSubmitting
					})]
				})
			]
		})
	});
}
function withoutTrackIds(tracks, trackIds) {
	return tracks.filter((track) => !trackIds.includes(track.id));
}
function TrackCard$1(t0) {
	let $ = c(44), { track, iconOnly, deletingTrackId, trackToEdit, setTrackToEdit, setTrackToDelete } = t0, t1;
	$[0] === track ? t1 = $[1] : (t1 = getAudioTrackStatus(track), $[0] = track, $[1] = t1);
	let status = t1, t2;
	$[2] === track ? t2 = $[3] : (t2 = isAlternativeAudioTrack(track), $[2] = track, $[3] = t2);
	let isPrimary = !t2, t3;
	$[4] !== deletingTrackId || $[5] !== track.id || $[6] !== trackToEdit?.id ? (t3 = (action) => action === "edit" ? deletingTrackId === track.id || trackToEdit?.id === track.id : deletingTrackId !== null || trackToEdit?.id === track.id, $[4] = deletingTrackId, $[5] = track.id, $[6] = trackToEdit?.id, $[7] = t3) : t3 = $[7];
	let isDisabled = t3, t4;
	$[8] !== deletingTrackId || $[9] !== iconOnly || $[10] !== isDisabled || $[11] !== isPrimary || $[12] !== setTrackToDelete || $[13] !== setTrackToEdit || $[14] !== status || $[15] !== track ? (t4 = () => status === "preparing" ? /* @__PURE__ */ jsxs(Flex, {
		align: "center",
		gap: 2,
		children: [/* @__PURE__ */ jsx(Spinner, {
			muted: !0,
			style: {
				width: "0.75em",
				height: "0.75em",
				verticalAlign: "middle",
				display: "inline-block",
				marginBottom: "-2px"
			}
		}), /* @__PURE__ */ jsx(Text, {
			size: 1,
			muted: !0,
			children: "Processing..."
		})]
	}) : isPrimary ? null : /* @__PURE__ */ jsxs(Flex, {
		gap: 2,
		children: [/* @__PURE__ */ jsx(Button, {
			icon: /* @__PURE__ */ jsx(EditIcon, {}),
			text: iconOnly ? void 0 : "Edit",
			mode: "ghost",
			tone: "primary",
			fontSize: 1,
			padding: 2,
			disabled: isDisabled("edit"),
			onClick: () => setTrackToEdit(track),
			title: "Edit"
		}), /* @__PURE__ */ jsx(Button, {
			icon: deletingTrackId === track.id ? /* @__PURE__ */ jsx(Spinner, { style: {
				verticalAlign: "middle",
				display: "inline-block",
				marginTop: "-2px",
				width: "0.5em",
				height: "0.5em"
			} }) : /* @__PURE__ */ jsx(TrashIcon, {}),
			text: iconOnly ? void 0 : "Delete",
			mode: "ghost",
			tone: "critical",
			fontSize: 1,
			padding: 2,
			disabled: isDisabled("delete"),
			onClick: () => setTrackToDelete(track),
			title: "Delete"
		})]
	}), $[8] = deletingTrackId, $[9] = iconOnly, $[10] = isDisabled, $[11] = isPrimary, $[12] = setTrackToDelete, $[13] = setTrackToEdit, $[14] = status, $[15] = track, $[16] = t4) : t4 = $[16];
	let renderActionButtons = t4, t5 = status === "errored" ? "caution" : "transparent", t6 = track.name || (isPrimary ? "Default" : "Untitled"), t7;
	$[17] === t6 ? t7 = $[18] : (t7 = /* @__PURE__ */ jsx(Text, {
		weight: "semibold",
		children: t6
	}), $[17] = t6, $[18] = t7);
	let t8 = isPrimary ? "Primary" : "Alternative", t9;
	$[19] === t8 ? t9 = $[20] : (t9 = /* @__PURE__ */ jsxs(Text, {
		size: 1,
		muted: !0,
		children: [
			"(",
			t8,
			")"
		]
	}), $[19] = t8, $[20] = t9);
	let t10;
	$[21] === status ? t10 = $[22] : (t10 = status === "errored" && /* @__PURE__ */ jsx(ErrorOutlineIcon, {
		style: { color: "var(--card-critical-color)" },
		"aria-label": "Error",
		fontSize: 20
	}), $[21] = status, $[22] = t10);
	let t11;
	$[23] !== t10 || $[24] !== t7 || $[25] !== t9 ? (t11 = /* @__PURE__ */ jsxs(Flex, {
		align: "center",
		gap: 2,
		children: [
			t7,
			t9,
			t10
		]
	}), $[23] = t10, $[24] = t7, $[25] = t9, $[26] = t11) : t11 = $[26];
	let t12;
	$[27] === track.language_code ? t12 = $[28] : (t12 = track.language_code && /* @__PURE__ */ jsxs(Text, {
		size: 1,
		muted: !0,
		children: ["Language: ", track.language_code]
	}), $[27] = track.language_code, $[28] = t12);
	let t13;
	$[29] !== status || $[30] !== track.error ? (t13 = status === "errored" && track.error && /* @__PURE__ */ jsx(Text, {
		size: 1,
		style: { color: "var(--card-critical-color)" },
		children: track.error.messages?.[0] || track.error.type || "Failed to process track"
	}), $[29] = status, $[30] = track.error, $[31] = t13) : t13 = $[31];
	let t14;
	$[32] !== t11 || $[33] !== t12 || $[34] !== t13 ? (t14 = /* @__PURE__ */ jsxs(Stack, {
		gap: 2,
		flex: 1,
		children: [
			t11,
			t12,
			t13
		]
	}), $[32] = t11, $[33] = t12, $[34] = t13, $[35] = t14) : t14 = $[35];
	let t15;
	$[36] === renderActionButtons ? t15 = $[37] : (t15 = renderActionButtons(), $[36] = renderActionButtons, $[37] = t15);
	let t16;
	$[38] !== t14 || $[39] !== t15 ? (t16 = /* @__PURE__ */ jsxs(Flex, {
		align: "center",
		justify: "space-between",
		gap: 3,
		children: [t14, t15]
	}), $[38] = t14, $[39] = t15, $[40] = t16) : t16 = $[40];
	let t17;
	return $[41] !== t16 || $[42] !== t5 ? (t17 = /* @__PURE__ */ jsx(Card, {
		padding: 3,
		radius: 2,
		tone: t5,
		border: !0,
		children: t16
	}), $[41] = t16, $[42] = t5, $[43] = t17) : t17 = $[43], t17;
}
function AudioTracksManager({ asset, iconOnly = !1, tracks: propTracks, collapseTracks = !1 }) {
	let client = useClient$1(), toast = useToast(), dialogId = `DeleteAudioTrackDialog${useId()}`, { resyncAsset } = useResyncAsset(), [deletingTrackId, setDeletingTrackId] = useState(null), [addedTracks, setAddedTracks] = useState([]), [trackActivityOrder, setTrackActivityOrder] = useState(/* @__PURE__ */ new Map()), [trackToDelete, setTrackToDelete] = useState(null), [trackToEdit, setTrackToEdit] = useState(null), [showAddDialog, setShowAddDialog] = useState(!1), [isExpanded, setIsExpanded] = useState(!1), activeTracks = (propTracks || getAudioTracks(asset.data?.tracks)).filter((track) => !!track.id), allTracks = [...activeTracks, ...addedTracks.filter((addedTrack) => addedTrack.id && !activeTracks.some((realTrack) => realTrack.id === addedTrack.id))], knownTrackIds = allTracks.map((track) => track.id), hasPreparingTracks = allTracks.some((track) => getAudioTrackStatus(track) === "preparing");
	useEffect(() => {
		if (!hasPreparingTracks || !asset.assetId || !asset._id) return;
		let interval = setInterval(async () => {
			try {
				let muxData = await resyncAsset(asset);
				if (!muxData) return;
				let fetchedTrackIds = getAudioTracks(muxData.tracks).map((track) => track.id);
				setAddedTracks((prev) => withoutTrackIds(prev, fetchedTrackIds));
			} catch (error) {
				console.error("Failed to refresh asset data:", error);
			}
		}, 3e3);
		return () => clearInterval(interval);
	}, [
		hasPreparingTracks,
		asset,
		resyncAsset
	]);
	let visibleTracks = [...allTracks].sort((a, b) => {
		let orderA = trackActivityOrder.get(a.id) || 0, orderB = trackActivityOrder.get(b.id) || 0;
		if (orderA > 0 && orderB > 0) return orderB - orderA;
		if (orderA > 0) return -1;
		if (orderB > 0) return 1;
		let aIsPreparing = getAudioTrackStatus(a) === "preparing", bIsPreparing = getAudioTrackStatus(b) === "preparing";
		return aIsPreparing && !bIsPreparing ? -1 : !aIsPreparing && bIsPreparing ? 1 : 0;
	}), confirmDelete = async () => {
		if (!trackToDelete || !trackToDelete.id) return;
		let track = trackToDelete;
		setTrackToDelete(null), setDeletingTrackId(track.id);
		try {
			if (!asset.assetId) throw Error("Asset ID is required");
			await deleteAudioTrack(client, asset.assetId, track.id), await resyncAsset(asset), toast.push({
				title: "Successfully deleted audio track",
				status: "success"
			}), setAddedTracks((prev) => prev.filter((t) => t.id !== track.id)), setTrackActivityOrder((prev) => {
				let newMap = new Map(prev);
				return newMap.delete(track.id), newMap;
			});
		} catch (error) {
			toast.push({
				title: "Failed to delete audio track",
				status: "error",
				description: error instanceof Error ? error.message : "Please try again"
			});
		} finally {
			setDeletingTrackId(null);
		}
	}, handleAddTrack = async (track) => {
		setAddedTracks((prev) => [...prev, track]), setTrackActivityOrder((prev) => {
			let newMap = new Map(prev);
			return newMap.set(track.id, prev.size + 1), newMap;
		}), setShowAddDialog(!1), await resyncAsset(asset);
	}, handleUpdateTrack = async (updatedTrack, oldTrackId) => {
		oldTrackId && (setAddedTracks((prev) => prev.filter((t) => t.id !== oldTrackId)), setTrackActivityOrder((prev) => {
			let newMap = new Map(prev);
			return newMap.delete(oldTrackId), newMap;
		})), addedTracks.some((t) => t.id === updatedTrack.id) ? setAddedTracks((prev) => prev.map((t) => t.id === updatedTrack.id ? updatedTrack : t)) : setAddedTracks((prev) => [...prev, updatedTrack]), setTrackActivityOrder((prev) => {
			let newMap = new Map(prev);
			return newMap.set(updatedTrack.id, prev.size + 1), newMap;
		}), setTrackToEdit(null), await resyncAsset(asset);
	};
	if (visibleTracks.length === 0 && !showAddDialog) return /* @__PURE__ */ jsxs(Stack, {
		gap: 3,
		children: [
			/* @__PURE__ */ jsx(Flex, {
				justify: "flex-end",
				children: /* @__PURE__ */ jsx(Button, {
					icon: AddIcon,
					text: "Add Audio Track",
					tone: "primary",
					onClick: () => setShowAddDialog(!0)
				})
			}),
			/* @__PURE__ */ jsx(Card, {
				padding: 4,
				radius: 2,
				tone: "transparent",
				border: !0,
				children: /* @__PURE__ */ jsx(Text, {
					size: 1,
					muted: !0,
					children: "No audio tracks available. Add an alternative audio track to offer this video in another language."
				})
			}),
			showAddDialog && /* @__PURE__ */ jsx(AddAudioTrackDialog, {
				asset,
				knownTrackIds,
				onAdd: handleAddTrack,
				onClose: () => setShowAddDialog(!1)
			})
		]
	});
	let displayedTracks = collapseTracks && !isExpanded ? visibleTracks.slice(0, 4) : visibleTracks, hasMoreTracks = collapseTracks && visibleTracks.length > 4;
	return /* @__PURE__ */ jsxs(Stack, {
		gap: 3,
		children: [
			/* @__PURE__ */ jsx(Flex, {
				justify: "flex-end",
				children: /* @__PURE__ */ jsx(Button, {
					icon: AddIcon,
					text: "Add Audio Track",
					tone: "primary",
					onClick: () => setShowAddDialog(!0)
				})
			}),
			displayedTracks.map((track) => /* @__PURE__ */ jsx(TrackCard$1, {
				track,
				iconOnly,
				deletingTrackId,
				trackToEdit,
				setTrackToEdit,
				setTrackToDelete
			}, track.id)),
			hasMoreTracks && /* @__PURE__ */ jsx(Flex, {
				justify: "center",
				children: /* @__PURE__ */ jsx(Button, {
					icon: isExpanded ? ChevronUpIcon : ChevronDownIcon,
					text: isExpanded ? "Show less" : `Show ${visibleTracks.length - 4} more`,
					mode: "ghost",
					tone: "primary",
					onClick: () => setIsExpanded(!isExpanded)
				})
			}),
			trackToDelete && /* @__PURE__ */ jsx(Dialog, {
				animate: !0,
				id: dialogId,
				header: "Delete track",
				onClose: () => setTrackToDelete(null),
				onClickOutside: () => setTrackToDelete(null),
				width: 1,
				children: /* @__PURE__ */ jsx(Card, {
					padding: 3,
					style: {
						minHeight: "150px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center"
					},
					children: /* @__PURE__ */ jsxs(Stack, {
						gap: 3,
						children: [
							/* @__PURE__ */ jsxs(Heading, {
								size: 2,
								children: [
									"Are you sure you want to delete \"",
									trackToDelete.name || trackToDelete.language_code || "Untitled",
									"\"?"
								]
							}),
							/* @__PURE__ */ jsx(Text, {
								size: 2,
								children: "This action is irreversible"
							}),
							/* @__PURE__ */ jsx(Stack, {
								gap: 4,
								marginY: 4,
								children: /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Button, {
									icon: deletingTrackId === trackToDelete.id ? /* @__PURE__ */ jsx(Spinner, { style: {
										verticalAlign: "middle",
										display: "inline-block",
										marginTop: "-2px",
										width: "0.5em",
										height: "0.5em"
									} }) : /* @__PURE__ */ jsx(TrashIcon, {}),
									fontSize: 2,
									padding: 3,
									text: "Delete track",
									tone: "critical",
									onClick: confirmDelete,
									disabled: deletingTrackId !== null
								}) })
							})
						]
					})
				})
			}),
			showAddDialog && /* @__PURE__ */ jsx(AddAudioTrackDialog, {
				asset,
				knownTrackIds,
				onAdd: handleAddTrack,
				onClose: () => setShowAddDialog(!1)
			}),
			trackToEdit && /* @__PURE__ */ jsx(EditAudioTrackDialog, {
				asset,
				track: trackToEdit,
				knownTrackIds,
				onUpdate: handleUpdateTrack,
				onClose: () => setTrackToEdit(null)
			})
		]
	});
}
/**
* This function enables master access on a remote mux asset.
* @param client Sanity client (uses addon credentials).
* @param assetId The target mux asset ID.
* @return Return true on success.
*/
async function enableMasterAccess(client, assetId) {
	try {
		return (await testSecrets(client))?.status ? (await updateMasterAccess(client, assetId, "temporary"), !0) : !1;
	} catch {
		return !1;
	}
}
/**
* This function checks if master access is enabled and available on a remote mux asset.
* @param client Sanity client (uses addon credentials).
* @param assetId The target mux asset ID.
* @return Return the master access link if available.
*/
async function pollMasterAccess(client, assetId) {
	try {
		let res = await getAsset(client, assetId), status = res.data?.master?.status ?? "errored", url = res.data?.master?.url ?? "";
		return status === "ready" ? url : "";
	} catch {
		return "";
	}
}
/**
* This function waits for master access to be enabled and available on a remote mux asset.
* @param client Sanity client (uses addon credentials).
* @param assetId The target mux asset ID.
* @param timeout The timeout in seconds before dropping.
* @param interval The interval in seconds between tries.
* @return Return the master access link if available.
*/
async function waitForMasterAccess(client, assetId, timeout = 30, interval = 2) {
	let limit = Date.now() + timeout * 1e3;
	for (; Date.now() < limit;) {
		let url = await pollMasterAccess(client, assetId);
		if (url) return url;
		await new Promise((resolve) => setTimeout(resolve, interval * 1e3));
	}
	return "";
}
const DialogStateContext = createContext({
	dialogState: !1,
	setDialogState: () => null
}), DialogStateProvider = (t0) => {
	let $ = c(6), { dialogState, setDialogState, children } = t0, t1;
	$[0] !== dialogState || $[1] !== setDialogState ? (t1 = {
		dialogState,
		setDialogState
	}, $[0] = dialogState, $[1] = setDialogState, $[2] = t1) : t1 = $[2];
	let value = t1, t2;
	return $[3] !== children || $[4] !== value ? (t2 = /* @__PURE__ */ jsx(DialogStateContext.Provider, {
		value,
		children
	}), $[3] = children, $[4] = value, $[5] = t2) : t2 = $[5], t2;
}, useDialogStateContext = () => useContext(DialogStateContext), mimeExtGraph = [
	["audio/x-aiff", "aif"],
	["audio/x-aiff", "aiff"],
	["audio/basic", "au"],
	["audio/basic", "snd"],
	["audio/x-mpegurl", "m3u"],
	["audio/midi", "midi"],
	["audio/midi", "mid"],
	["audio/m4a", "mp3"],
	["audio/mpeg", "mp3"],
	["audio/x-pn-realaudio", "ra"],
	["audio/x-pn-realaudio", "ram"],
	["audio/x-wav", "wav"],
	["audio/x-ms-wma", "wma"],
	["video/3gpp", "3gp"],
	["video/x-ms-wmv", "wmv"],
	["video/x-ms-wmx", "wmx"],
	["video/mp4", "mp4"],
	["video/mp4", "m4v"],
	["video/mp4", "mp4v"],
	["video/mpeg", "mpeg"],
	["video/mpeg", "mpg"],
	["video/quicktime", "mov"],
	["video/quicktime", "qt"],
	["video/x-mng", "mng"],
	["video/x-msvideo", "avi"],
	["video/x-flv", "flv"],
	["video/x-ms-asf", "asf"],
	["video/x-ms-asf", "asx"],
	["application/x-subrip", "srt"],
	["text/vtt", "vtt"],
	["text/x-ssa", "ssa"],
	["text/x-ass", "ass"],
	["application/x-sami", "sami"],
	["application/x-sami", "smi"],
	["text/x-microdvd", "sub"],
	["text/x-microdvd", "vobsub"],
	["text/x-mpl2", "mpl2"]
];
function mimeToExt(mime) {
	let formattedMime = mime.trim().toLowerCase();
	for (let [_mime, _ext] of mimeExtGraph) if (_mime === formattedMime) return _ext;
}
/**
* This function triggers a browser download for a remote file.
* @param url The target remote file URL.
* @param name The name of the downloaded file.
*/
async function downloadFile(url, name = "untitled", extension = "") {
	if (typeof window > "u") throw Error("downloadFile() can only be called in a browser environment.");
	let response = await fetch(url, { mode: "cors" });
	if (!response.ok) throw Error(`downloadFile() failed to fetch file: ${response.status} ${response.statusText}`);
	let mime = response.headers.get("Content-Type") ?? "", fileExt = extension.trim() || mimeToExt(mime) || "";
	fileExt &&= `.${fileExt}`;
	let fileName = name.trim() || "untitled";
	fileExt.length && !fileName.endsWith(fileExt) && (fileName += fileExt);
	let blob = await response.blob(), objectUrl = URL.createObjectURL(blob);
	try {
		let anchor = document.createElement("a");
		anchor.download = fileName, anchor.href = objectUrl, document.body.appendChild(anchor), anchor.click(), document.body.removeChild(anchor);
	} finally {
		URL.revokeObjectURL(objectUrl);
	}
}
function DownloadAssetDialog(t0) {
	let $ = c(41), { asset, onClose, absolute } = t0, client = useClient$1(), [status, setStatus] = useState("idle"), { setDialogState } = useDialogStateContext(), dialogId = `DownloadAssetDialog${useId()}`, t1;
	$[0] !== asset.assetId || $[1] !== client ? (t1 = async () => {
		let assetId = asset.assetId ?? "";
		setStatus("preparing"), enableMasterAccess(client, assetId).then(() => {
			waitForMasterAccess(client, assetId, 120, 5).then((link) => {
				setStatus(link.length > 0 ? "success" : "error");
			});
		});
	}, $[0] = asset.assetId, $[1] = client, $[2] = t1) : t1 = $[2];
	let prepareDownload = t1, closing, handleDownload;
	$[3] !== asset.assetId || $[4] !== asset.filename || $[5] !== client || $[6] !== onClose || $[7] !== setDialogState ? (handleDownload = async () => {
		let assetId_0 = asset.assetId ?? "", assetName = asset.filename ?? "untitled";
		getAsset(client, assetId_0).then((res) => {
			closing(), downloadFile(res.data?.master?.url ?? "", assetName);
		});
	}, closing = () => {
		onClose && onClose(), setDialogState(!1);
	}, $[3] = asset.assetId, $[4] = asset.filename, $[5] = client, $[6] = onClose, $[7] = setDialogState, $[8] = closing, $[9] = handleDownload) : (closing = $[8], handleDownload = $[9]);
	let t2 = status === "success" ? DownloadIcon : ResetIcon, t3 = status === "success" ? "Download" : "Retry", t4 = status === "success" ? "positive" : "critical", t5 = status === "success" ? handleDownload : prepareDownload, t6;
	$[10] !== t2 || $[11] !== t3 || $[12] !== t4 || $[13] !== t5 ? (t6 = {
		icon: t2,
		text: t3,
		tone: t4,
		onClick: t5
	}, $[10] = t2, $[11] = t3, $[12] = t4, $[13] = t5, $[14] = t6) : t6 = $[14];
	let behavior = t6, t7;
	$[15] !== prepareDownload || $[16] !== status ? (t7 = () => {
		status === "idle" && prepareDownload();
	}, $[15] = prepareDownload, $[16] = status, $[17] = t7) : t7 = $[17], useEffect(t7);
	let t8 = absolute ? "fixed" : void 0, t9 = status === "preparing", t10 = status === "preparing", t11;
	$[18] !== behavior.icon || $[19] !== behavior.onClick || $[20] !== behavior.text || $[21] !== behavior.tone || $[22] !== t10 || $[23] !== t9 ? (t11 = /* @__PURE__ */ jsx(Stack, {
		padding: 3,
		children: /* @__PURE__ */ jsx(Button, {
			icon: behavior.icon,
			disabled: t9,
			mode: "ghost",
			tone: behavior.tone,
			loading: t10,
			onClick: behavior.onClick,
			text: behavior.text
		}, "download")
	}), $[18] = behavior.icon, $[19] = behavior.onClick, $[20] = behavior.text, $[21] = behavior.tone, $[22] = t10, $[23] = t9, $[24] = t11) : t11 = $[24];
	let t12 = status !== "preparing", t13;
	$[25] === t12 ? t13 = $[26] : (t13 = /* @__PURE__ */ jsx(Text, {
		hidden: t12,
		align: "center",
		children: "Your download file is being prepared…"
	}), $[25] = t12, $[26] = t13);
	let t14 = status !== "success", t15;
	$[27] === t14 ? t15 = $[28] : (t15 = /* @__PURE__ */ jsx(Text, {
		hidden: t14,
		align: "center",
		children: "Your download file is ready."
	}), $[27] = t14, $[28] = t15);
	let t16 = status !== "error", t17;
	$[29] === t16 ? t17 = $[30] : (t17 = /* @__PURE__ */ jsx(Text, {
		hidden: t16,
		align: "center",
		children: "Something went wrong during preparation :/"
	}), $[29] = t16, $[30] = t17);
	let t18;
	$[31] !== t13 || $[32] !== t15 || $[33] !== t17 ? (t18 = /* @__PURE__ */ jsxs(Stack, {
		paddingX: 5,
		paddingY: 3,
		children: [
			t13,
			t15,
			t17
		]
	}), $[31] = t13, $[32] = t15, $[33] = t17, $[34] = t18) : t18 = $[34];
	let t19;
	return $[35] !== closing || $[36] !== dialogId || $[37] !== t11 || $[38] !== t18 || $[39] !== t8 ? (t19 = /* @__PURE__ */ jsx(Dialog, {
		id: dialogId,
		header: "Download asset (source)",
		onClose: closing,
		position: t8,
		zOffset: DIALOGS_Z_INDEX,
		footer: t11,
		children: t18
	}), $[35] = closing, $[36] = dialogId, $[37] = t11, $[38] = t18, $[39] = t8, $[40] = t19) : t19 = $[40], t19;
}
const IconInfo = (props) => {
	let $ = c(12), Icon = props.icon, t0 = (props.size || 1) + 1, t1;
	$[0] === Icon ? t1 = $[1] : (t1 = /* @__PURE__ */ jsx(Icon, {}), $[0] = Icon, $[1] = t1);
	let t2;
	$[2] !== t0 || $[3] !== t1 ? (t2 = /* @__PURE__ */ jsx(Text, {
		size: t0,
		muted: !0,
		children: t1
	}), $[2] = t0, $[3] = t1, $[4] = t2) : t2 = $[4];
	let t3 = props.size || 1, t4;
	$[5] !== props.muted || $[6] !== props.text || $[7] !== t3 ? (t4 = /* @__PURE__ */ jsx(Text, {
		size: t3,
		muted: props.muted,
		children: props.text
	}), $[5] = props.muted, $[6] = props.text, $[7] = t3, $[8] = t4) : t4 = $[8];
	let t5;
	return $[9] !== t2 || $[10] !== t4 ? (t5 = /* @__PURE__ */ jsxs(Flex, {
		gap: 2,
		align: "center",
		padding: 1,
		children: [t2, t4]
	}), $[9] = t2, $[10] = t4, $[11] = t5) : t5 = $[11], t5;
};
function ResolutionIcon(props) {
	let $ = c(3), t0;
	$[0] === Symbol.for("react.memo_cache_sentinel") ? (t0 = /* @__PURE__ */ jsx("path", {
		fill: "currentColor",
		d: "M20 9V6h-3V4h5v5h-2ZM2 9V4h5v2H4v3H2Zm15 11v-2h3v-3h2v5h-5ZM2 20v-5h2v3h3v2H2Zm4-4V8h12v8H6Zm2-2h8v-4H8v4Zm0 0v-4v4Z"
	}), $[0] = t0) : t0 = $[0];
	let t1;
	return $[1] === props ? t1 = $[2] : (t1 = /* @__PURE__ */ jsx("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "1em",
		height: "1em",
		viewBox: "0 0 24 24",
		...props,
		children: t0
	}), $[1] = props, $[2] = t1), t1;
}
function StopWatchIcon(props) {
	let $ = c(5), t0, t1, t2;
	$[0] === Symbol.for("react.memo_cache_sentinel") ? (t0 = /* @__PURE__ */ jsx("path", {
		d: "M232 306.667h48V176h-48v130.667z",
		fill: "currentColor"
	}), t1 = /* @__PURE__ */ jsx("path", {
		d: "M407.67 170.271l30.786-30.786-33.942-33.941-30.785 30.786C341.217 111.057 300.369 96 256 96 149.961 96 64 181.961 64 288s85.961 192 192 192 192-85.961 192-192c0-44.369-15.057-85.217-40.33-117.729zm-45.604 223.795C333.734 422.398 296.066 438 256 438s-77.735-15.602-106.066-43.934C121.602 365.735 106 328.066 106 288s15.602-77.735 43.934-106.066C178.265 153.602 215.934 138 256 138s77.734 15.602 106.066 43.934C390.398 210.265 406 247.934 406 288s-15.602 77.735-43.934 106.066z",
		fill: "currentColor"
	}), t2 = /* @__PURE__ */ jsx("path", {
		d: "M192 32h128v48H192z",
		fill: "currentColor"
	}), $[0] = t0, $[1] = t1, $[2] = t2) : (t0 = $[0], t1 = $[1], t2 = $[2]);
	let t3;
	return $[3] === props ? t3 = $[4] : (t3 = /* @__PURE__ */ jsxs("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "1em",
		height: "1em",
		viewBox: "0 0 512 512",
		...props,
		children: [
			t0,
			t1,
			t2
		]
	}), $[3] = props, $[4] = t3), t3;
}
/** Derives the mezzanine status from the persisted asset data alone (no polling or local state). */
function getMezzanineStatus(asset) {
	let master = asset.data?.master;
	return master?.status === "preparing" ? "preparing" : master?.status === "ready" && master.url ? "ready" : master?.status === "errored" ? "errored" : "disabled";
}
/**
* Encapsulates the mezzanine (Mux "master access") lifecycle for an asset:
* enabling it through the Mux addon proxy, persisting the result on the Sanity
* document, polling until it's ready, and downloading by redirecting to the
* fresh, short-lived Mux URL.
*
* The full Mux asset `data` (including the `master` object) is stored on the
* Sanity document via `client.patch`, so the status survives reloads and is
* already present for assets imported from Mux.
*/
function useMezzanine(asset) {
	let client = useClient$1(), toast = useToast(), master = asset.data?.master, [busy, setBusy] = useState(!1), [expired, setExpired] = useState(!1), [prevAssetId, setPrevAssetId] = useState(asset.assetId);
	prevAssetId !== asset.assetId && (setPrevAssetId(asset.assetId), setExpired(!1));
	let resolution = useMemo(() => asset.data?.max_resolution_tier || asset.data?.max_stored_resolution || void 0, [asset.data?.max_resolution_tier, asset.data?.max_stored_resolution]), status = getMezzanineStatus(asset), persist = useCallback(async (data) => {
		asset._id && await client.patch(asset._id).set({
			status: data.status,
			data: addKeysToMuxData(data)
		}).commit({ returnDocuments: !1 });
	}, [asset._id, client]), refresh = useCallback(async () => {
		if (!asset.assetId || !asset._id) return;
		let { data } = await getAsset(client, asset.assetId);
		return await persist(data), data;
	}, [
		asset.assetId,
		asset._id,
		client,
		persist
	]);
	return useEffect(() => {
		if (master?.status !== "preparing" || !asset.assetId || !asset._id) return;
		let cancelled = !1, running = !1, interval = setInterval(async () => {
			if (!running) {
				running = !0;
				try {
					let data = await refresh();
					if (cancelled) return;
					data && data.master?.status === "preparing" || clearInterval(interval);
				} catch (error) {
					console.error("Failed to poll mezzanine status:", error);
				} finally {
					running = !1;
				}
			}
		}, 3e3);
		return () => {
			cancelled = !0, clearInterval(interval);
		};
	}, [
		master?.status,
		asset.assetId,
		asset._id,
		refresh
	]), {
		status,
		busy,
		expired,
		resolution,
		enable: useCallback(async () => {
			if (asset.assetId && asset._id) {
				setBusy(!0), setExpired(!1);
				try {
					let { data } = await updateMasterAccess(client, asset.assetId, "temporary");
					await persist(data);
				} catch (error) {
					toast.push({
						status: "error",
						title: "Could not enable the mezzanine file",
						description: error instanceof Error ? error.message : "Please try again"
					});
				} finally {
					setBusy(!1);
				}
			}
		}, [
			asset.assetId,
			asset._id,
			client,
			persist,
			toast
		]),
		download: useCallback(async () => {
			if (asset.assetId) {
				setBusy(!0);
				try {
					let data = await refresh(), url = data?.master?.status === "ready" ? data.master.url : void 0;
					url ? (setExpired(!1), triggerMezzanineDownload(url)) : setExpired(!0);
				} catch (error) {
					toast.push({
						status: "error",
						title: "Could not download the mezzanine file",
						description: error instanceof Error ? error.message : "Please try again"
					});
				} finally {
					setBusy(!1);
				}
			}
		}, [
			asset.assetId,
			refresh,
			toast
		])
	};
}
/**
* Redirects the browser to the Mux mezzanine URL to start the download. The URL
* already serves the file with its default name (`mezzanine.mp4`).
* @see {@link https://www.mux.com/docs/guides/download-for-offline-editing}
*/
function triggerMezzanineDownload(masterUrl) {
	if (typeof window > "u") return;
	let anchor = document.createElement("a");
	anchor.href = masterUrl, anchor.target = "_blank", anchor.rel = "noopener noreferrer", document.body.appendChild(anchor), anchor.click(), document.body.removeChild(anchor);
}
/** Explains what the mezzanine file is and how it differs from the streamable MP4 renditions. */
function MezzanineExplanation() {
	let $ = c(1), t0;
	return $[0] === Symbol.for("react.memo_cache_sentinel") ? (t0 = /* @__PURE__ */ jsxs(Stack, {
		gap: 3,
		children: [/* @__PURE__ */ jsx(Text, {
			size: 1,
			muted: !0,
			children: "When you enable the mezzanine file, Mux creates a copy equivalent in quality to your original video — ideal for offline editing or archiving. Unlike the streamable MP4 (static) renditions, it is not meant for streaming."
		}), /* @__PURE__ */ jsx(Text, {
			size: 1,
			muted: !0,
			children: "The file is prepared in the background and may take a few minutes depending on the asset's duration and resolution. Enabling is free and the download stays available for 24 hours."
		})]
	}), $[0] = t0) : t0 = $[0], t0;
}
/**
* "Mezzanine" panel, modeled after Mux's dashboard card: enable the
* master-access copy, watch it prepare, then download it.
*/
function Mezzanine(t0) {
	let $ = c(35), { asset, withExplanation: t1 } = t0, withExplanation = t1 === void 0 || t1, { status, busy, expired, resolution, enable, download } = useMezzanine(asset), assetReady = asset.status === "ready" || asset.data?.status === "ready", isReady = status === "ready" && !expired, isPreparing = status === "preparing", showExplanation = !isReady && !isPreparing, t2;
	$[0] === Symbol.for("react.memo_cache_sentinel") ? (t2 = /* @__PURE__ */ jsx(Label, {
		muted: !0,
		size: 1,
		children: "Mezzanine"
	}), $[0] = t2) : t2 = $[0];
	let t3;
	$[1] === Symbol.for("react.memo_cache_sentinel") ? (t3 = /* @__PURE__ */ jsxs(Flex, {
		align: "center",
		justify: "space-between",
		gap: 3,
		children: [t2, /* @__PURE__ */ jsx(Text, {
			size: 1,
			children: /* @__PURE__ */ jsx("a", {
				href: "https://www.mux.com/docs/guides/download-for-offline-editing#enable-master-access",
				target: "_blank",
				rel: "noopener noreferrer",
				children: "Learn more"
			})
		})]
	}), $[1] = t3) : t3 = $[1];
	let t4 = !isReady, t5;
	$[2] === t4 ? t5 = $[3] : (t5 = /* @__PURE__ */ jsx(Text, {
		size: 1,
		muted: t4,
		children: "mezzanine.mp4"
	}), $[2] = t4, $[3] = t5);
	let t6;
	$[4] === resolution ? t6 = $[5] : (t6 = resolution && /* @__PURE__ */ jsx(Text, {
		size: 1,
		muted: !0,
		children: resolution
	}), $[4] = resolution, $[5] = t6);
	let t7;
	$[6] !== t5 || $[7] !== t6 ? (t7 = /* @__PURE__ */ jsxs(Stack, {
		gap: 2,
		children: [t5, t6]
	}), $[6] = t5, $[7] = t6, $[8] = t7) : t7 = $[8];
	let t8;
	$[9] !== showExplanation || $[10] !== withExplanation ? (t8 = withExplanation && showExplanation && /* @__PURE__ */ jsx(MezzanineExplanation, {}), $[9] = showExplanation, $[10] = withExplanation, $[11] = t8) : t8 = $[11];
	let t9;
	$[12] !== expired || $[13] !== showExplanation || $[14] !== status ? (t9 = showExplanation && (expired || status === "errored") && /* @__PURE__ */ jsxs(Stack, {
		gap: 2,
		children: [expired && /* @__PURE__ */ jsx(Text, {
			size: 1,
			muted: !0,
			children: "The previous mezzanine file expired. Enable it again to download."
		}), status === "errored" && /* @__PURE__ */ jsx(Text, {
			size: 1,
			style: { color: "var(--card-critical-color)" },
			children: "Mux could not prepare the mezzanine file. Please try again."
		})]
	}), $[12] = expired, $[13] = showExplanation, $[14] = status, $[15] = t9) : t9 = $[15];
	let t10;
	$[16] === isPreparing ? t10 = $[17] : (t10 = isPreparing && /* @__PURE__ */ jsx(Text, {
		size: 1,
		muted: !0,
		children: "Preparing the mezzanine file… this can take a few minutes. You can close this and come back later."
	}), $[16] = isPreparing, $[17] = t10);
	let t11;
	$[18] === isReady ? t11 = $[19] : (t11 = isReady && /* @__PURE__ */ jsx(Text, {
		size: 1,
		muted: !0,
		children: "Ready to download. The link stays available for about 24 hours."
	}), $[18] = isReady, $[19] = t11);
	let t12;
	$[20] !== assetReady || $[21] !== busy || $[22] !== download || $[23] !== enable || $[24] !== isPreparing || $[25] !== isReady || $[26] !== status ? (t12 = /* @__PURE__ */ jsx(Flex, {
		justify: "flex-end",
		gap: 2,
		children: isPreparing ? /* @__PURE__ */ jsxs(Flex, {
			align: "center",
			gap: 2,
			children: [/* @__PURE__ */ jsx(Spinner, {
				muted: !0,
				size: 1
			}), /* @__PURE__ */ jsx(Text, {
				size: 1,
				muted: !0,
				children: "Preparing…"
			})]
		}) : isReady ? /* @__PURE__ */ jsx(Button, {
			icon: DownloadIcon,
			text: "Download",
			tone: "positive",
			fontSize: 1,
			padding: 3,
			loading: busy,
			disabled: busy,
			onClick: () => void download()
		}) : /* @__PURE__ */ jsx(Button, {
			text: status === "errored" ? "Try again" : "Enable",
			tone: "primary",
			fontSize: 1,
			padding: 3,
			loading: busy,
			disabled: busy || !assetReady,
			onClick: () => void enable()
		})
	}), $[20] = assetReady, $[21] = busy, $[22] = download, $[23] = enable, $[24] = isPreparing, $[25] = isReady, $[26] = status, $[27] = t12) : t12 = $[27];
	let t13;
	return $[28] !== t10 || $[29] !== t11 || $[30] !== t12 || $[31] !== t7 || $[32] !== t8 || $[33] !== t9 ? (t13 = /* @__PURE__ */ jsx(Card, {
		padding: 3,
		radius: 2,
		tone: "transparent",
		border: !0,
		children: /* @__PURE__ */ jsxs(Stack, {
			gap: 4,
			children: [
				t3,
				t7,
				t8,
				t9,
				t10,
				t11,
				t12
			]
		})
	}), $[28] = t10, $[29] = t11, $[30] = t12, $[31] = t7, $[32] = t8, $[33] = t9, $[34] = t13) : t13 = $[34], t13;
}
var RobotsErrorBoundary = class extends Component {
	state = {};
	static getDerivedStateFromError(error) {
		return { error };
	}
	componentDidCatch(error, info) {
		console.error("[sanity-plugin-mux-input] The Robots panel failed to render", error, info);
	}
	render() {
		return this.state.error ? /* @__PURE__ */ jsx(Card, {
			padding: 3,
			radius: 2,
			tone: "critical",
			border: !0,
			children: /* @__PURE__ */ jsxs(Stack, {
				gap: 3,
				children: [/* @__PURE__ */ jsx(Text, {
					size: 1,
					weight: "semibold",
					children: "The Robots panel could not load"
				}), /* @__PURE__ */ jsx(Text, {
					size: 1,
					children: "Everything else on this video still works. Reloading usually clears this; if it doesn’t, the details are in the browser console."
				})]
			})
		}) : this.props.children;
	}
};
/** Who can run Robots when `allowedRolesForRobots` isn't set. */
const DEFAULT_ALLOWED_ROLES_FOR_ROBOTS = ["administrator"];
/**
* Whether this user sees the controls that start or cancel Robots runs. An empty list opens it
* to every role. A UI guardrail, not a permission: the proxy accepts any project member.
*/
function canRunRobots(user, allowedRoles) {
	if (!user) return !1;
	let roles = allowedRoles ?? DEFAULT_ALLOWED_ROLES_FOR_ROBOTS;
	return roles.length === 0 || user.roles.some((role) => roles.includes(role.name));
}
/** Shown in place of the run controls to someone who can't run Robots. */
function robotsRunnersOnlyNote(allowedRoles) {
	let roles = allowedRoles ?? DEFAULT_ALLOWED_ROLES_FOR_ROBOTS;
	return `${roles.length === 1 && roles[0] === "administrator" ? "Only administrators can run Robots in this Studio. Ask an administrator to run one for you." : `Only these roles can run Robots in this Studio: ${roles.join(", ")}.`} A developer can let more roles run Robots with the plugin’s allowedRolesForRobots option.`;
}
/** Whether the current user sees the controls that start or cancel Robots runs. */
function useCanRunRobots(config) {
	let $ = c(3), user = useCurrentUser(), t0;
	return $[0] !== config.allowedRolesForRobots || $[1] !== user ? (t0 = canRunRobots(user, config.allowedRolesForRobots), $[0] = config.allowedRolesForRobots, $[1] = user, $[2] = t0) : t0 = $[2], t0;
}
/**
* The account's directives, for pickers and names. Ids are the truth and names a convenience:
* every caller renders the id when the listing fails or a directive is gone.
*/
function useRobotsDirectives(enabled) {
	let $ = c(16), client = useClient$1(), projectId = useProjectId(), dataset = useDataset(), t0;
	$[0] === client ? t0 = $[1] : (t0 = async () => (await listRobotsDirectives(client, { limit: 100 })).data ?? [], $[0] = client, $[1] = t0);
	let t1;
	$[2] === Symbol.for("react.memo_cache_sentinel") ? (t1 = {
		revalidateOnFocus: !1,
		shouldRetryOnError: !1
	}, $[2] = t1) : t1 = $[2];
	let { data, error, mutate } = useSWR(enabled ? `/${projectId}/addons/mux/robots/${dataset}/directives` : null, t0, t1), t2;
	$[3] === Symbol.for("react.memo_cache_sentinel") ? (t2 = { status: "pending" }, $[3] = t2) : t2 = $[3];
	let listing = t2;
	if (data) {
		let t3 = data.length < 100, t4;
		$[4] !== data || $[5] !== t3 ? (t4 = {
			status: "loaded",
			directives: data,
			isComplete: t3
		}, $[4] = data, $[5] = t3, $[6] = t4) : t4 = $[6], listing = t4;
	} else if (error) {
		let t3;
		$[7] === error ? t3 = $[8] : (t3 = capabilityFromError(error), $[7] = error, $[8] = t3);
		let t4;
		$[9] === t3 ? t4 = $[10] : (t4 = {
			status: "failed",
			capability: t3
		}, $[9] = t3, $[10] = t4), listing = t4;
	}
	let t3;
	$[11] === mutate ? t3 = $[12] : (t3 = () => void mutate(), $[11] = mutate, $[12] = t3);
	let t4;
	return $[13] !== listing || $[14] !== t3 ? (t4 = {
		listing,
		reload: t3
	}, $[13] = listing, $[14] = t3, $[15] = t4) : t4 = $[15], t4;
}
/** id → display name, falling back to the id for anything the listing doesn't cover. */
function directiveNamesById(listing, fallbackIds = []) {
	let names = Object.fromEntries(fallbackIds.map((id) => [id, id]));
	if (listing.status === "loaded") for (let directive of listing.directives) names[directive.id] = directive.name || directive.id;
	return names;
}
/** Configured ids a complete listing doesn't have. A failed or full listing is no evidence. */
function missingDirectiveIds(listing, ids) {
	if (listing.status !== "loaded" || !listing.isComplete) return [];
	let listed = new Set(listing.directives.map((directive) => directive.id));
	return ids.filter((id) => !listed.has(id));
}
const LANGUAGE_HELP = "BCP 47 language code, e.g. en, es, ja.", CAPTIONS_TO_READ_LABEL = "Captions to read", NO_PREFERENCE_LABEL = "No preference", SCOPE_SECTION = {
	id: "scope",
	title: "Part of the video",
	description: "Seconds from the start of the video. Leave both empty to use all of it; timestamps in the result are still measured from the start."
}, SCOPE_FIELDS = [{
	kind: "number",
	name: "output_steering.scope.start_time",
	label: "Start time (seconds)",
	min: 0,
	step: 1,
	section: SCOPE_SECTION
}, {
	kind: "number",
	name: "output_steering.scope.end_time",
	label: "End time (seconds)",
	min: 0,
	step: 1,
	section: SCOPE_SECTION
}], TAGS_SECTION = {
	id: "tags",
	title: "Tags"
}, HIGHLIGHT_LENGTH_SECTION = {
	id: "highlight-length",
	title: "Highlight length",
	description: "Set both bounds, or neither."
}, UPLOAD_TO_MUX = {
	kind: "boolean",
	name: "upload_to_mux",
	label: "Attach the result to the Mux asset",
	helpText: "Leave on to get a real track on the asset. Off returns a temporary download URL only.",
	defaultValue: !0
};
function audienceField(placeholder) {
	return {
		kind: "text",
		name: "output_steering.audience",
		label: "Audience",
		maxLength: 160,
		...placeholder && { placeholder }
	};
}
function brandTermsField(helpText) {
	return {
		kind: "stringList",
		name: "output_steering.brand_terms",
		label: "Brand terms",
		helpText: `${helpText} Up to 10 terms, each at most 40 characters.`,
		maxItems: 10,
		maxItemLength: 40
	};
}
/** `topic_taxonomy` has the same caps as `tag_taxonomy`, except the 2000-character total. */
const TOPIC_TAXONOMY = {
	kind: "taxonomy",
	name: "output_steering.topic_taxonomy",
	label: "Topic taxonomy",
	helpText: "A controlled vocabulary to steer the topics this workflow names. Up to 50 values. Leave it empty to let the model choose its own.",
	taxonomyLimits: {
		maxValues: 50,
		maxNameLength: 100,
		maxLabelLength: 100,
		maxDescriptionLength: 300,
		maxAliases: 10,
		maxAliasLength: 100
	}
};
function replaceExistingTracksField(track) {
	let noun = track === "audio" ? "audio track" : "caption track", warning = (whenValue, which) => ({
		whenValue,
		title: "This run deletes existing tracks",
		body: `Any ${which}${noun} on this video in the same language, or with the same name, is deleted before the new one is added. Players lose that track until the job finishes.`
	}), options = [{
		value: "fail",
		label: "Stop and don’t run"
	}, {
		value: "replace_all",
		label: "Replace every matching track"
	}], confirmWarnings = [warning("replace_all", "")];
	return track === "caption" && (options.push({
		value: "replace_generated",
		label: "Replace only auto-generated tracks"
	}), confirmWarnings.push(warning("replace_generated", "auto-generated "))), {
		kind: "select",
		name: "replace_existing_tracks",
		label: `If ${track === "audio" ? "an audio" : "a"} track in this language already exists`,
		helpText: "Tracks match by language, ignoring region, or by name, ignoring case." + (track === "audio" ? " The primary audio track is never deleted." : ""),
		options,
		defaultValue: "fail",
		showWhen: {
			field: "upload_to_mux",
			equals: !0
		},
		confirmWarnings
	};
}
const ROBOTS_CATALOG = [
	{
		key: "generate-premium-captions",
		label: "Generate premium captions",
		category: "Accessibility",
		description: "High-accuracy captions from the video's audio, optionally with speaker labels.",
		producesTrack: !0,
		params: [
			{
				kind: "language",
				name: "language_code",
				label: "Spoken language",
				helpText: `Leave empty to auto-detect. ${LANGUAGE_HELP}`
			},
			{
				kind: "text",
				name: "track_name",
				label: "Track name",
				helpText: "Leave empty and Mux names the track after its language — \"English (Generated)\" for English audio."
			},
			{
				kind: "boolean",
				name: "include_speakers",
				label: "Label speakers",
				defaultValue: !1
			},
			{
				kind: "boolean",
				name: "include_words",
				label: "Include word-level timings",
				helpText: "Billed at a higher unit rate. The words file (temporary_words_url) expires 7 days after the job.",
				defaultValue: !1
			},
			{
				kind: "stringList",
				name: "phrases",
				label: "Phrase hints",
				helpText: "Names, jargon or product terms to spell correctly. Up to 100 phrases, each at most 5 words and 49 characters.",
				maxItems: 100,
				maxItemLength: 49
			},
			UPLOAD_TO_MUX,
			replaceExistingTracksField("caption")
		]
	},
	{
		key: "edit-captions",
		label: "Edit captions",
		category: "Accessibility",
		description: "Apply find/replace rules and profanity filtering to an existing caption track.",
		producesTrack: !0,
		params: [
			{
				kind: "track",
				name: "track_id",
				label: "Caption track to edit",
				isRequired: !0
			},
			{
				kind: "replacements",
				name: "replacements",
				label: "Replacements",
				helpText: "Static find/replace rules applied to the cue text."
			},
			{
				kind: "boolean",
				name: "censor_profanity",
				label: "Censor profanity",
				helpText: "Off leaves the words as they are. Replacements still apply either way.",
				defaultValue: !1,
				formOnly: !0
			},
			{
				kind: "select",
				name: "auto_censor_profanity.mode",
				label: "How to censor",
				helpText: "Blank out writes bracketed underscores, remove drops the text, mask writes question marks.",
				options: [
					{
						value: "blank",
						label: "Blank out"
					},
					{
						value: "remove",
						label: "Remove"
					},
					{
						value: "mask",
						label: "Mask"
					}
				],
				defaultValue: "blank",
				showWhen: {
					field: "censor_profanity",
					equals: !0
				}
			},
			{
				kind: "stringList",
				name: "auto_censor_profanity.always_censor",
				label: "Always censor",
				helpText: "Words or phrases censored whatever the model decides. One per line; spaces are fine.",
				showWhen: {
					field: "censor_profanity",
					equals: !0
				}
			},
			{
				kind: "stringList",
				name: "auto_censor_profanity.never_censor",
				label: "Never censor",
				helpText: "Words or phrases left alone. One per line; spaces are fine.",
				showWhen: {
					field: "censor_profanity",
					equals: !0
				}
			},
			{
				kind: "speakerReplacements",
				name: "speaker_replacements",
				label: "Speaker labels",
				helpText: "Renames the bracketed speaker labels at the start of cues. Write the labels without the brackets. The spoken text is not changed."
			},
			{
				kind: "text",
				name: "track_name_suffix",
				label: "Suffix for the new track name",
				helpText: "Added to the original track’s name. Leave empty for Mux’s default, \"edited\"."
			},
			UPLOAD_TO_MUX,
			{
				kind: "boolean",
				name: "delete_original_track",
				label: "Delete the original track",
				helpText: "The edited track replaces it rather than sitting alongside it.",
				defaultValue: !0,
				showWhen: {
					field: "upload_to_mux",
					equals: !0
				}
			}
		]
	},
	{
		key: "translate-captions",
		label: "Translate captions",
		category: "Accessibility",
		description: "Translate an existing caption track into another language.",
		producesTrack: !0,
		params: [
			{
				kind: "track",
				name: "track_id",
				label: "Source caption track",
				isRequired: !0
			},
			{
				kind: "language",
				name: "to_language_code",
				label: "Target language",
				helpText: LANGUAGE_HELP,
				isRequired: !0
			},
			{
				kind: "stringList",
				name: "never_translate",
				label: "Never translate",
				helpText: "Terms kept verbatim — brand names, product names, proper nouns. One per line, up to 100 terms of at most 100 characters. Cannot contain < or >.",
				maxItems: 100,
				maxItemLength: 100
			},
			UPLOAD_TO_MUX,
			replaceExistingTracksField("caption")
		]
	},
	{
		key: "translate-audio",
		label: "Translate audio (dub)",
		category: "Accessibility",
		description: "Translate the video's spoken audio into another language as a new audio track.",
		producesTrack: !0,
		planRestricted: !0,
		notes: ["The run is rejected if the video has no audio track, or already has an audio track in the target language, unless you choose to replace it.", "Dubbing may not be enabled on every account."],
		params: [
			{
				kind: "language",
				name: "to_language_code",
				label: "Target language",
				helpText: LANGUAGE_HELP,
				isRequired: !0
			},
			UPLOAD_TO_MUX,
			replaceExistingTracksField("audio")
		]
	},
	{
		key: "summarize",
		label: "Summarize",
		category: "Insights",
		description: "Generate a title, description and tags for the video.",
		params: [
			{
				kind: "select",
				name: "tone",
				label: "Tone",
				options: [
					{
						value: "",
						label: NO_PREFERENCE_LABEL
					},
					{
						value: "neutral",
						label: "Neutral"
					},
					{
						value: "playful",
						label: "Playful"
					},
					{
						value: "professional",
						label: "Professional"
					}
				],
				defaultValue: ""
			},
			{
				kind: "number",
				name: "title_length",
				label: "Max title length (words)",
				min: 1,
				step: 1,
				integer: !0
			},
			{
				kind: "number",
				name: "description_length",
				label: "Max description length (words)",
				min: 1,
				step: 1,
				integer: !0
			},
			{
				kind: "language",
				name: "language_code",
				label: CAPTIONS_TO_READ_LABEL,
				helpText: "Summarize reads one of this video’s caption tracks. Choose the language of the one to use, or leave empty and Mux picks. The summary’s own language is Output language."
			},
			{
				kind: "language",
				name: "output_language_code",
				label: "Output language",
				helpText: `Leave empty to write in the captions’ language. ${LANGUAGE_HELP}`
			},
			audienceField("Product marketers"),
			brandTermsField("Terminology to prefer in the generated copy."),
			{
				kind: "number",
				name: "tag_count",
				label: "Number of tags",
				helpText: "Defaults to 10.",
				min: 1,
				step: 1,
				integer: !0,
				section: TAGS_SECTION
			},
			{
				kind: "taxonomy",
				name: "output_steering.tag_taxonomy",
				label: "Tag taxonomy",
				helpText: "A controlled vocabulary for the generated tags. Up to 50 values, and 2000 characters across the whole taxonomy. Leave it empty to let the model choose its own tags.",
				section: TAGS_SECTION,
				taxonomyLimits: {
					maxValues: 50,
					maxNameLength: 100,
					maxLabelLength: 100,
					maxDescriptionLength: 300,
					maxAliases: 10,
					maxAliasLength: 100,
					maxSerializedLength: 2e3
				}
			},
			{
				kind: "select",
				name: "output_steering.summary_style",
				label: "Summary style",
				options: [
					{
						value: "",
						label: NO_PREFERENCE_LABEL
					},
					{
						value: "concise",
						label: "Concise"
					},
					{
						value: "detailed",
						label: "Detailed"
					},
					{
						value: "editorial",
						label: "Editorial"
					}
				],
				defaultValue: ""
			},
			...SCOPE_FIELDS,
			{
				kind: "boolean",
				name: "update_asset_meta",
				label: "Set the asset's title to the generated one",
				helpText: "Writes meta.title on the Mux asset. The title in the Studio only changes when you resync the video.",
				defaultValue: !1
			}
		]
	},
	{
		key: "ask-questions",
		label: "Ask questions",
		category: "Insights",
		description: "Ask questions about the video and get structured answers.",
		params: [
			{
				kind: "questions",
				name: "questions",
				label: "Questions",
				helpText: "Up to 50 questions, at most 600 characters each. Pick how each one is answered: from a list of options (empty means yes / no, and each option can be up to 150 characters), or in the model’s own words.",
				isRequired: !0,
				maxItems: 50
			},
			{
				kind: "number",
				name: "max_free_form_answer_length",
				label: "Maximum length of a written answer",
				helpText: "Characters, 1–1000. Defaults to 500. Ignored unless a question above is set to “In its own words”.",
				min: 1,
				max: 1e3,
				step: 1,
				integer: !0
			},
			{
				kind: "language",
				name: "language_code",
				label: CAPTIONS_TO_READ_LABEL,
				helpText: "The answers come from one of this video’s caption tracks. Choose the language of the one to use, or leave empty and Mux picks."
			},
			...SCOPE_FIELDS
		]
	},
	{
		key: "find-key-moments",
		label: "Find key moments",
		category: "Insights",
		description: "Identify the most compelling moments, scored and titled.",
		params: [
			{
				kind: "boolean",
				name: "use_shots",
				label: "Use visual evidence (Mux Shots)",
				helpText: "Off, the video needs a caption track: selection reads the transcript. On, selection reads the picture instead and no captions are needed — at the cost of generating or reusing Mux Shots, billed separately from Robots units. Not supported on audio-only videos, which always read the transcript.",
				defaultValue: !1
			},
			{
				kind: "number",
				name: "max_moments",
				label: "Maximum moments",
				helpText: "1–25. Defaults to 10, or 25 for videos over an hour.",
				min: 1,
				max: 25,
				step: 1,
				integer: !0
			},
			{
				kind: "number",
				name: "target_duration_ms.min",
				label: "Minimum highlight length (ms)",
				min: 0,
				step: 1e3,
				integer: !0,
				section: HIGHLIGHT_LENGTH_SECTION
			},
			{
				kind: "number",
				name: "target_duration_ms.max",
				label: "Maximum highlight length (ms)",
				min: 0,
				step: 1e3,
				integer: !0,
				section: HIGHLIGHT_LENGTH_SECTION
			},
			{
				kind: "select",
				name: "output_steering.selection_strategy",
				label: "What to look for",
				options: [
					{
						value: "",
						label: NO_PREFERENCE_LABEL
					},
					{
						value: "standalone_hooks",
						label: "Standalone hooks"
					},
					{
						value: "educational_takeaways",
						label: "Educational takeaways"
					},
					{
						value: "story_beats",
						label: "Story beats"
					},
					{
						value: "product_moments",
						label: "Product moments"
					},
					{
						value: "speaker_highlights",
						label: "Speaker highlights"
					}
				]
			},
			{
				kind: "select",
				name: "output_steering.title_style",
				label: "Title style",
				options: [
					{
						value: "",
						label: NO_PREFERENCE_LABEL
					},
					{
						value: "descriptive",
						label: "Descriptive"
					},
					{
						value: "punchy",
						label: "Punchy"
					},
					{
						value: "educational",
						label: "Educational"
					},
					{
						value: "social",
						label: "Social"
					}
				]
			},
			{
				kind: "enumList",
				name: "output_steering.rubric_priorities",
				label: "Tie-breakers",
				helpText: "Used to choose between moments the strategy above rates equally. Best effort.",
				maxItems: 4,
				options: [
					{
						value: "clarity_in_isolation",
						label: "Clarity in isolation"
					},
					{
						value: "emotional_intensity",
						label: "Emotional intensity"
					},
					{
						value: "novelty",
						label: "Novelty"
					},
					{
						value: "soundbite_quality",
						label: "Soundbite quality"
					}
				]
			},
			audienceField(),
			brandTermsField("Terminology to prefer in the generated titles. One per line."),
			TOPIC_TAXONOMY,
			...SCOPE_FIELDS
		]
	},
	{
		key: "find-best-thumbnails",
		label: "Find best thumbnails",
		category: "Insights",
		description: "Sample and rank frames to pick the strongest thumbnail.",
		requiresVideoTrack: !0,
		params: [
			{
				kind: "number",
				name: "max_thumbnails",
				label: "Maximum candidates",
				helpText: "1–5. Defaults to 1.",
				min: 1,
				max: 5,
				step: 1,
				integer: !0
			},
			{
				kind: "boolean",
				name: "update_asset_thumbnail",
				label: "Set the asset's thumbnail to the winner",
				helpText: "Writes thumbnail_time on the Mux asset, and the Studio uses it as this video’s thumbnail when the job finishes. Caches may take a while to catch up.",
				defaultValue: !1
			},
			{
				kind: "select",
				name: "output_steering.selection_strategy",
				label: "What makes a good frame here",
				options: [
					{
						value: "",
						label: NO_PREFERENCE_LABEL
					},
					{
						value: "face_or_action",
						label: "Face or action"
					},
					{
						value: "clean_composition",
						label: "Clean composition"
					},
					{
						value: "high_contrast",
						label: "High contrast"
					},
					{
						value: "brand_safe",
						label: "Brand safe"
					},
					{
						value: "campaign_thumbnail",
						label: "Campaign thumbnail"
					}
				]
			},
			{
				kind: "enumList",
				name: "output_steering.scoring_priorities",
				label: "Scoring priorities",
				helpText: "What to weigh when two frames score alike. Best effort.",
				options: [
					{
						value: "focus",
						label: "Focus"
					},
					{
						value: "face_or_action",
						label: "Face or action"
					},
					{
						value: "composition",
						label: "Composition"
					},
					{
						value: "contrast_color",
						label: "Contrast and colour"
					},
					{
						value: "brand_fit",
						label: "Brand fit"
					}
				]
			},
			{
				kind: "text",
				name: "output_steering.looking_for",
				label: "Looking for",
				placeholder: "The presenter holding the product",
				maxLength: 160
			},
			audienceField(),
			{
				kind: "text",
				name: "output_steering.campaign_style",
				label: "Campaign style",
				maxLength: 160
			},
			...SCOPE_FIELDS
		]
	},
	{
		key: "generate-engagement-insights",
		label: "Generate engagement insights",
		category: "Insights",
		description: "Turn accumulated viewing data into per-moment engagement insights.",
		requiresViewData: !0,
		notes: ["Needs Mux Data views on this asset. With no views recorded there is nothing to analyze."],
		params: []
	},
	{
		key: "generate-chapters",
		label: "Generate chapters",
		category: "Structure",
		description: "Create timestamped chapters from the video content.",
		params: [
			{
				kind: "language",
				name: "language_code",
				label: CAPTIONS_TO_READ_LABEL,
				helpText: "Chapters are made from one of this video’s caption tracks. Choose the language of the one to use, or leave empty and Mux prefers English when there is an English track. The chapter titles’ language is Output language."
			},
			{
				kind: "language",
				name: "output_language_code",
				label: "Output language",
				helpText: `Leave empty to write in the captions’ language. ${LANGUAGE_HELP}`
			},
			{
				kind: "select",
				name: "output_steering.chapter_style",
				label: "Chapter style",
				options: [
					{
						value: "",
						label: NO_PREFERENCE_LABEL
					},
					{
						value: "descriptive",
						label: "Descriptive"
					},
					{
						value: "punchy",
						label: "Punchy"
					},
					{
						value: "educational",
						label: "Educational"
					},
					{
						value: "seo",
						label: "SEO"
					},
					{
						value: "platform_neutral",
						label: "Platform neutral"
					}
				],
				defaultValue: ""
			},
			{
				kind: "select",
				name: "output_steering.chapter_granularity",
				label: "Granularity",
				options: [
					{
						value: "",
						label: NO_PREFERENCE_LABEL
					},
					{
						value: "coarse",
						label: "Coarse"
					},
					{
						value: "balanced",
						label: "Balanced"
					},
					{
						value: "fine",
						label: "Fine"
					}
				],
				defaultValue: ""
			},
			audienceField(),
			brandTermsField("Terminology to prefer in the chapter titles."),
			{
				kind: "boolean",
				name: "update_asset_chapters",
				label: "Add the chapters to the Mux video",
				helpText: "Writes them as the video’s chapters track when the job finishes. Replaces any chapters track the video already has, including one added by hand.",
				defaultValue: !0,
				omitWhenFalse: !0
			}
		]
	},
	{
		key: "find-scenes",
		label: "Find scenes",
		category: "Structure",
		description: "Segment the video into ordered, timestamped scenes.",
		requiresVideoTrack: !0,
		params: [
			{
				kind: "language",
				name: "language_code",
				label: CAPTIONS_TO_READ_LABEL,
				helpText: "Scenes are found from this video’s caption track in that language, if it has one. Leave empty to use the first caption track that is ready."
			},
			{
				kind: "number",
				name: "min_scenes",
				label: "Minimum scenes (hint)",
				min: 1,
				step: 1,
				integer: !0
			},
			{
				kind: "select",
				name: "output_steering.segmentation_strategy",
				label: "How to split the video",
				options: [
					{
						value: "",
						label: NO_PREFERENCE_LABEL
					},
					{
						value: "editorial_beats",
						label: "Editorial beats"
					},
					{
						value: "topic_changes",
						label: "Topic changes"
					},
					{
						value: "visual_transitions",
						label: "Visual transitions"
					},
					{
						value: "action_progression",
						label: "Action progression"
					},
					{
						value: "instructional_steps",
						label: "Instructional steps"
					}
				]
			},
			{
				kind: "select",
				name: "output_steering.title_style",
				label: "Title style",
				options: [
					{
						value: "",
						label: NO_PREFERENCE_LABEL
					},
					{
						value: "descriptive",
						label: "Descriptive"
					},
					{
						value: "editorial",
						label: "Editorial"
					},
					{
						value: "search_optimized",
						label: "Search optimized"
					},
					{
						value: "accessibility",
						label: "Accessibility"
					}
				]
			},
			{
				kind: "select",
				name: "output_steering.narration_detail",
				label: "Narration detail",
				options: [
					{
						value: "",
						label: NO_PREFERENCE_LABEL
					},
					{
						value: "concise",
						label: "Concise"
					},
					{
						value: "balanced",
						label: "Balanced"
					},
					{
						value: "detailed",
						label: "Detailed"
					}
				]
			},
			audienceField(),
			brandTermsField("Terminology to prefer in the scene titles. One per line."),
			TOPIC_TAXONOMY,
			...SCOPE_FIELDS,
			{
				kind: "number",
				name: "min_scene_duration_ms",
				label: "Minimum scene length (ms)",
				helpText: "At least 1000. Defaults to 15000.",
				min: 1e3,
				step: 1e3,
				integer: !0
			}
		]
	},
	{
		key: "moderate",
		label: "Moderate",
		category: "Trust & Safety",
		description: "Score sampled frames for sexual and violent content.",
		params: [
			{
				kind: "language",
				name: "language_code",
				label: CAPTIONS_TO_READ_LABEL,
				helpText: "Only for an audio-only video, which is moderated from its captions. Choose the language of the caption track to use, or leave empty for the first one that is ready.",
				showWhen: {
					context: "isAudioOnly",
					notEquals: !1
				}
			},
			{
				kind: "number",
				name: "thresholds.sexual",
				label: "Sexual content threshold",
				helpText: "0–1. Defaults to 0.7.",
				min: 0,
				max: 1,
				step: .05
			},
			{
				kind: "number",
				name: "thresholds.violence",
				label: "Violence threshold",
				helpText: "0–1. Defaults to 0.8.",
				min: 0,
				max: 1,
				step: .05
			},
			{
				kind: "number",
				name: "sampling_interval",
				label: "Seconds between samples",
				helpText: "At least 5. Defaults to one sample every 10 seconds. Denser sampling costs more.",
				min: 5,
				step: 1,
				integer: !0
			},
			{
				kind: "number",
				name: "max_samples",
				label: "Maximum samples",
				min: 1,
				step: 1,
				integer: !0
			},
			...SCOPE_FIELDS,
			{
				kind: "select",
				name: "on_flagged.action",
				label: "If the video is flagged",
				helpText: "Deleting the playback IDs makes the video unplayable everywhere it is embedded, the moment the job finishes. The asset itself is kept, and the video’s player can create a new playback ID.",
				options: [{
					value: "",
					label: "Do nothing — just record the scores"
				}, {
					value: "delete_playback_ids",
					label: "Delete every playback ID"
				}],
				defaultValue: "",
				confirmWarnings: [{
					whenValue: "delete_playback_ids",
					title: "This run can make the video unplayable",
					body: "If the content scores over a threshold, Mux deletes every playback ID on this asset. Playback stops everywhere the video is embedded, not just in Sanity, and anything that needs a playback ID breaks with it, including other workflows in a directive run on this asset. The asset, its captions and the Robots history on this document are kept, and the video’s player can create a new playback ID."
				}]
			}
		]
	}
], ROBOTS_CATALOG_BY_KEY = Object.fromEntries(ROBOTS_CATALOG.map((definition) => [definition.key, definition])), ROBOTS_CATEGORIES = [
	"Accessibility",
	"Insights",
	"Structure",
	"Trust & Safety"
];
function workflowLabel(workflow) {
	return ROBOTS_CATALOG_BY_KEY[workflow]?.label ?? workflow;
}
/** What the run form opens on. It runs on any asset. */
const DEFAULT_ROBOTS_WORKFLOW = "summarize";
/** Why this asset can't run a workflow, as the picker's suffix, or `undefined` when it can. */
function workflowUnavailableReason(definition, context = {}) {
	return definition.requiresVideoTrack && context.isAudioOnly === !0 ? "not available for audio-only" : void 0;
}
function availableWorkflow(preferred, context = {}) {
	return workflowUnavailableReason(ROBOTS_CATALOG_BY_KEY[preferred], context) ? DEFAULT_ROBOTS_WORKFLOW : preferred;
}
/**
* Expands dotted-path values into the nested `parameters` object. Empty strings, empty arrays,
* `null` and `undefined` are dropped: an untouched optional field must not become a 400.
*/
function buildRobotsParameters(assetId, values) {
	let parameters = { asset_id: assetId };
	for (let [path, value] of Object.entries(values)) {
		if (value == null || value === "" || Array.isArray(value) && value.length === 0) continue;
		let segments = path.split("."), last = segments.pop(), target = parameters;
		for (let segment of segments) {
			let next = target[segment];
			typeof next == "object" && next || (target[segment] = {}), target = target[segment];
		}
		target[last] = value;
	}
	return parameters;
}
const QUESTION_ANSWER_MODES = [{
	value: "options",
	label: "From a list"
}, {
	value: "free_form",
	label: "In its own words"
}], emptyQuestionRow = () => ({
	question: "",
	answerOptions: "",
	answerMode: "options"
}), emptyTaxonomyRow = () => ({
	label: "",
	description: "",
	aliases: ""
});
function asTaxonomyValue(value) {
	let partial = value ?? {};
	return {
		name: typeof partial.name == "string" ? partial.name : "",
		allowOther: typeof partial.allowOther != "boolean" || partial.allowOther,
		values: Array.isArray(partial.values) ? partial.values : []
	};
}
function splitCommaList(text) {
	return (text ?? "").split(",").map((entry) => entry.trim()).filter(Boolean);
}
function defaultParamValues(fields) {
	let values = {};
	for (let field of fields) field.kind === "questions" ? values[field.name] = [emptyQuestionRow()] : field.defaultValue !== void 0 && (values[field.name] = field.defaultValue);
	return values;
}
/** Whether a field is shown. A hidden field is also never sent. */
function isFieldVisible(field, values, context = {}) {
	let condition = field.showWhen;
	return condition ? "context" in condition ? context[condition.context] !== condition.notEquals : values[condition.field] === condition.equals : !0;
}
/** Consecutive fields that share a section become one group. */
function groupFieldsBySection(fields) {
	let groups = [];
	for (let field of fields) {
		let last = groups.at(-1);
		field.section && last?.section?.id === field.section.id ? last.fields.push(field) : groups.push({
			...field.section && { section: field.section },
			fields: [field]
		});
	}
	return groups;
}
function questionsToApi(value) {
	let questions = (Array.isArray(value) ? value : []).filter((row) => row.question.trim() !== "").map((row) => {
		let question = row.question.trim();
		if (row.answerMode === "free_form") return {
			question,
			free_form_reply: !0
		};
		let options = splitCommaList(row.answerOptions);
		return options.length > 0 ? {
			question,
			answer_options: options
		} : { question };
	});
	return questions.length > 0 ? questions : void 0;
}
function replacementsToApi(value) {
	let replacements = (Array.isArray(value) ? value : []).filter((row) => row.find.trim() !== "").map((row) => ({
		find: row.find,
		replace: row.replace,
		...row.caseSensitive && { case_sensitive: !0 }
	}));
	return replacements.length > 0 ? replacements : void 0;
}
/** Both sides are required by the API, so a row missing either is dropped. */
function speakerReplacementsToApi(value) {
	let replacements = (Array.isArray(value) ? value : []).map((row) => ({
		find: row.find.trim(),
		replace: row.replace.trim()
	})).filter((row) => row.find !== "" && row.replace !== "");
	return replacements.length > 0 ? replacements : void 0;
}
function taxonomyToApi(value) {
	let taxonomy = asTaxonomyValue(value), values = taxonomy.values.filter((row) => (row.label ?? "").trim() !== "").map((row) => {
		let aliases = splitCommaList(row.aliases), description = (row.description ?? "").trim();
		return {
			label: row.label.trim(),
			...description !== "" && { description },
			...aliases.length > 0 && { aliases }
		};
	});
	if (values.length === 0) return;
	let name = taxonomy.name.trim();
	return {
		...name !== "" && { name },
		values,
		allow_other: taxonomy.allowOther
	};
}
/** One form value as the Robots API expects it, or `undefined` to leave it out. */
function toApiParamValue(field, value) {
	switch (field.kind) {
		case "questions": return questionsToApi(value);
		case "replacements": return replacementsToApi(value);
		case "speakerReplacements": return speakerReplacementsToApi(value);
		case "taxonomy": return taxonomyToApi(value);
		case "boolean": return field.omitWhenFalse && value !== !0 ? void 0 : value;
		default: return typeof value == "string" ? value.trim() === "" ? void 0 : value.trim() : value === null ? void 0 : value;
	}
}
function paramsFromFormValues(definition, assetId, values, context = {}) {
	let apiValues = {};
	for (let field of definition.params) {
		if (field.formOnly || !isFieldVisible(field, values, context)) continue;
		let apiValue = toApiParamValue(field, values[field.name]);
		apiValue !== void 0 && (apiValues[field.name] = apiValue);
	}
	return buildRobotsParameters(assetId, apiValues);
}
function confirmWarnings(definition, values, context = {}) {
	return definition.params.flatMap((field) => {
		if (!field.confirmWarnings || !isFieldVisible(field, values, context)) return [];
		let value = values[field.name] ?? field.defaultValue;
		return field.confirmWarnings.filter((warning) => warning.whenValue === value);
	});
}
function taxonomyErrors(field, formValue, apiValue) {
	if (apiValue === void 0) return asTaxonomyValue(formValue).name.trim() === "" ? [] : [`${field.label}: add at least one value, or clear the taxonomy name.`];
	let limits = field.taxonomyLimits;
	if (!limits) return [];
	let sent = apiValue, errors = [], exceeds = (length, max) => max !== void 0 && (length ?? 0) > max;
	exceeds(sent.values.length, limits.maxValues) && errors.push(`${field.label}: at most ${limits.maxValues} values.`), exceeds(sent.name?.length, limits.maxNameLength) && errors.push(`${field.label}: the taxonomy name is at most ${limits.maxNameLength} characters.`);
	let longLabel = sent.values.find((row) => exceeds(row.label.length, limits.maxLabelLength));
	longLabel && errors.push(`${field.label}: a value is at most ${limits.maxLabelLength} characters — "${longLabel.label.slice(0, 40)}…".`);
	let longDescription = sent.values.find((row) => exceeds(row.description?.length, limits.maxDescriptionLength));
	longDescription && errors.push(`${field.label}: the description of "${longDescription.label}" is at most ${limits.maxDescriptionLength} characters.`);
	let manyAliases = sent.values.find((row) => exceeds(row.aliases?.length, limits.maxAliases));
	manyAliases && errors.push(`${field.label}: "${manyAliases.label}" has more than ${limits.maxAliases} aliases.`);
	let longAlias = sent.values.flatMap((row) => row.aliases ?? []).find((alias) => exceeds(alias.length, limits.maxAliasLength));
	return longAlias && errors.push(`${field.label}: an alias is at most ${limits.maxAliasLength} characters — "${longAlias.slice(0, 40)}…".`), exceeds(JSON.stringify(apiValue).length, limits.maxSerializedLength) && errors.push(`${field.label}: the whole taxonomy is at most ${limits.maxSerializedLength} characters. Shorten the descriptions, or use fewer values.`), errors;
}
function fieldErrors(field, apiValue) {
	if (field.kind === "number" && typeof apiValue == "number") {
		if (Number.isNaN(apiValue)) return [`${field.label} must be a number.`];
		if (field.integer && !Number.isInteger(apiValue)) return [`${field.label} must be a whole number.`];
		if (field.min !== void 0 && apiValue < field.min) return [`${field.label} must be at least ${field.min}.`];
		if (field.max !== void 0 && apiValue > field.max) return [`${field.label} must be at most ${field.max}.`];
	}
	if (field.kind === "text" && typeof apiValue == "string" && field.maxLength !== void 0 && apiValue.length > field.maxLength) return [`${field.label} can be at most ${field.maxLength} characters.`];
	if (Array.isArray(apiValue) && field.maxItems !== void 0 && apiValue.length > field.maxItems) return [`${field.label}: at most ${field.maxItems} entries.`];
	if (field.kind === "stringList" && Array.isArray(apiValue) && field.maxItemLength !== void 0) {
		let max = field.maxItemLength, tooLong = apiValue.find((item) => typeof item == "string" && item.length > max);
		if (tooLong !== void 0) return [`${field.label}: each entry is at most ${max} characters — "${String(tooLong)}".`];
	}
	return [];
}
function numberValue(definition, values, name) {
	let field = definition.params.find((candidate) => candidate.name === name), value = field ? toApiParamValue(field, values[name]) : void 0;
	return typeof value == "number" && Number.isFinite(value) ? value : void 0;
}
/** Keyed on the parameters, so a workflow that gains a scope gains the rule. */
function scopeErrors(definition, values, context) {
	let start = numberValue(definition, values, "output_steering.scope.start_time"), end = numberValue(definition, values, "output_steering.scope.end_time"), errors = [];
	return start !== void 0 && end !== void 0 && start >= end && errors.push("The start time must be before the end time."), start !== void 0 && context.duration !== void 0 && start >= context.duration && errors.push(`The start time is past the end of the video, which is ${Number(context.duration.toFixed(1))} seconds long.`), errors;
}
function workflowErrors(definition, values, context) {
	let errors = [], valueOf = (kind) => {
		let field = definition.params.find((candidate) => candidate.kind === kind);
		return field ? toApiParamValue(field, values[field.name]) : void 0;
	}, stringsOf = (name) => (Array.isArray(values[name]) ? values[name] : []).filter((entry) => typeof entry == "string");
	switch (definition.key) {
		case "find-key-moments": {
			let useShots = values.use_shots === !0;
			context.isAudioOnly === !0 && useShots && errors.push("\"Use visual evidence (Mux Shots)\" is not supported on audio-only videos. Turn it off."), context.hasCaptions !== !1 || useShots && context.isAudioOnly !== !0 || errors.push(context.isAudioOnly === !0 ? "This audio-only video has no caption track, and audio-only videos always read the transcript. Generate captions first." : "This video has no caption track. Turn on \"Use visual evidence (Mux Shots)\", or generate captions first.");
			let min = numberValue(definition, values, "target_duration_ms.min"), max = numberValue(definition, values, "target_duration_ms.max");
			min === void 0 == (max === void 0) ? min !== void 0 && max !== void 0 && min > max && errors.push("The minimum highlight length cannot exceed the maximum.") : errors.push("Set both highlight length bounds, or neither.");
			break;
		}
		case "generate-chapters":
			context.hasCaptions === !1 && errors.push("This video has no caption track. Chapters are generated from the transcript, so generate captions first.");
			break;
		case "edit-captions":
			!valueOf("replacements") && !valueOf("speakerReplacements") && values.censor_profanity !== !0 && errors.push("Add a replacement rule or a speaker label, or turn on \"Censor profanity\".");
			break;
		case "ask-questions": {
			let rows = Array.isArray(values.questions) ? values.questions : [];
			rows.some((row) => row.question.trim().length > 600) && errors.push("A question can be at most 600 characters."), rows.filter((row) => row.answerMode !== "free_form").flatMap((row) => splitCommaList(row.answerOptions)).find((option) => option.length > 150) && errors.push("An answer option can be at most 150 characters.");
			break;
		}
		case "generate-premium-captions": {
			let phrases = stringsOf("phrases"), tooManyWords = phrases.find((phrase) => phrase.split(/\s+/).length > 5);
			tooManyWords && errors.push(`Phrase hints can be at most 5 words: "${tooManyWords}".`);
			let illegal = phrases.find((phrase) => /[<>{}[\]]/.test(phrase));
			illegal && errors.push(`Phrase hints cannot contain < > { } [ ]: "${illegal}".`);
			break;
		}
		case "translate-captions": {
			let illegal = stringsOf("never_translate").find((term) => /[<>]/.test(term));
			illegal && errors.push(`Never translate cannot contain < or >: "${illegal}".`);
			break;
		}
	}
	return errors;
}
/** Client-side validation, so problems show before a job is billed rather than as a 400. */
function validateParams(definition, values, context = {}) {
	let errors = [];
	for (let field of definition.params) {
		if (!isFieldVisible(field, values, context)) continue;
		let apiValue = toApiParamValue(field, values[field.name]);
		field.isRequired && apiValue === void 0 ? errors.push(`${field.label} is required.`) : field.kind === "taxonomy" ? errors.push(...taxonomyErrors(field, values[field.name], apiValue)) : apiValue !== void 0 && errors.push(...fieldErrors(field, apiValue));
	}
	return errors.push(...scopeErrors(definition, values, context)), errors.push(...workflowErrors(definition, values, context)), errors;
}
/**
* Turns a merge result into one keyed write on `mux.videoAsset`. Only Robots fields and
* `thumbTime` are ever touched; `data` and `filename` belong to the asset refresh and editors.
*/
const KEYED_ARRAYS = [
	"robotsJobs",
	"robotsDirectiveRuns",
	"robotsPendingCreates"
];
/**
* The keyed patches that turn `current` into `next`. One patch holds only one insert, so each
* array with new items gets its own.
*/
function robotsPatchOperations(current, next) {
	let set = {}, unset = [], inserts = [];
	for (let field of KEYED_ARRAYS) {
		let before = current[field] ?? [], after = next[field] ?? [];
		if (before === after) continue;
		let beforeByKey = new Map(before.map((item) => [item._key, item])), afterKeys = new Set(after.map((item) => item._key)), path = (key) => `${field}[_key=="${key}"]`, added = after.filter((item) => !beforeByKey.has(item._key));
		for (let item of after) {
			let previous = beforeByKey.get(item._key);
			previous && !dequal(previous, item) && (set[path(item._key)] = item);
		}
		for (let item of before) afterKeys.has(item._key) || unset.push(path(item._key));
		added.length > 0 && inserts.push({
			setIfMissing: { [field]: [] },
			insert: {
				after: `${field}[-1]`,
				items: added
			}
		});
	}
	next.robotsOutputs && !dequal(current.robotsOutputs, next.robotsOutputs) && (set.robotsOutputs = next.robotsOutputs), next.thumbTime !== void 0 && next.thumbTime !== current.thumbTime && (set.thumbTime = next.thumbTime);
	let main = {
		...Object.keys(set).length > 0 && { set },
		...unset.length > 0 && { unset }
	};
	return Object.keys(main).length > 0 ? [main, ...inserts] : inserts;
}
function robotsMutations(documentId, revision, operations) {
	return operations.map((ops, index) => ({ patch: {
		id: documentId,
		...index === 0 && { ifRevisionID: revision },
		...ops
	} }));
}
function isRevisionConflict(error) {
	return error?.statusCode === 409;
}
/**
* Fetches the latest document, applies `mutate` to it and writes the difference, retrying on a
* revision conflict. Skips the write when `mutate` changes nothing or the document now holds
* another asset. Resolves to whether it wrote.
*/
async function writeRobotsFields(client, documentId, assetId, mutate) {
	for (let attempt = 1;; attempt++) {
		let document = await client.getDocument(documentId);
		if (!document || document.assetId !== assetId) return !1;
		let operations = robotsPatchOperations(document, mutate(document));
		if (operations.length === 0) return !1;
		try {
			return await client.mutate(robotsMutations(documentId, document._rev, operations), { returnDocuments: !1 }), !0;
		} catch (error) {
			if (attempt >= 3 || !isRevisionConflict(error)) throw error;
		}
	}
}
const TERMINAL_JOB_STATUSES = /* @__PURE__ */ new Set([
	"completed",
	"errored",
	"cancelled"
]);
function isTerminalStatus(status) {
	return !!status && TERMINAL_JOB_STATUSES.has(status);
}
const TERMINAL_RUN_STATUSES = /* @__PURE__ */ new Set([
	"completed",
	"partial",
	"errored"
]);
function isTerminalRunStatus(status) {
	return !!status && TERMINAL_RUN_STATUSES.has(status);
}
/** Pulls a readable message out of the loosely documented `errors`. */
function robotsJobErrorMessage(job) {
	let { errors } = job;
	if (!errors) return;
	if (typeof errors == "string") return errors;
	let first = Array.isArray(errors) ? errors[0] : errors;
	if (typeof first == "string") return first;
	if (!first || typeof first != "object") return;
	let { messages, message } = first;
	return Array.isArray(messages) && typeof messages[0] == "string" ? messages[0] : typeof message == "string" ? message : void 0;
}
/** A job or run unfinished for longer than this stops keeping the poll alive. */
const SAFE_KEY = /^[A-Za-z0-9_-]+$/;
/** Drops `undefined` keys, so a thinner read never erases what a richer one stored. */
function compact$1(value) {
	return Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== void 0));
}
function toJobRecord(job) {
	if (job.id && job.status && SAFE_KEY.test(job.id)) return compact$1({
		_key: job.id,
		_type: "mux.robotsJob",
		id: job.id,
		workflow: job.workflow,
		status: job.status,
		created_at: job.created_at,
		updated_at: job.updated_at,
		units_consumed: job.units_consumed,
		error: robotsJobErrorMessage(job)
	});
}
/** Every job read for the asset, whoever started it. Mux wins where the two disagree. */
function mergeJobRecords(existing, jobs) {
	let next = [...existing ?? []], indexByKey = new Map(next.map((record, index) => [record._key, index])), changed = !1;
	for (let job of jobs) {
		let record = toJobRecord(job);
		if (!record) continue;
		let index = indexByKey.get(record._key);
		if (index === void 0) {
			indexByKey.set(record._key, next.length), next.push(record), changed = !0;
			continue;
		}
		let merged = {
			...next[index],
			...record
		};
		dequal(next[index], merged) || (next[index] = merged, changed = !0);
	}
	return changed ? next : existing;
}
function extractSummarizeOutput(job) {
	let outputs = job.outputs ?? {}, tags = Array.isArray(outputs.tags) ? outputs.tags.filter((tag) => typeof tag == "string") : [], output = compact$1({
		jobId: job.id,
		completedAt: job.updated_at,
		title: typeof outputs.title == "string" ? outputs.title : void 0,
		description: typeof outputs.description == "string" ? outputs.description : void 0,
		tags: tags.length > 0 ? tags : void 0
	});
	return output.title || output.description || output.tags ? output : void 0;
}
function extractModerateOutput(job) {
	let outputs = job.outputs ?? {}, maxScores = outputs.max_scores ?? {}, scores = compact$1({
		sexual: typeof maxScores.sexual == "number" ? maxScores.sexual : void 0,
		violence: typeof maxScores.violence == "number" ? maxScores.violence : void 0
	}), output = compact$1({
		jobId: job.id,
		completedAt: job.updated_at,
		exceedsThreshold: typeof outputs.exceeds_threshold == "boolean" ? outputs.exceeds_threshold : void 0,
		maxScores: Object.keys(scores).length > 0 ? scores : void 0
	});
	return output.exceedsThreshold !== void 0 || output.maxScores ? output : void 0;
}
/** A job's own `parameters.asset_id` (detail only) decides whose output it is. */
function ranOnAsset(job, assetId) {
	return !!assetId && job.parameters?.asset_id === assetId;
}
/** Oldest when missing or not a number, since stored values are user-editable. */
function completionTime(output) {
	return typeof output.completedAt == "number" ? output.completedAt : 0;
}
/** A strict order, so every session settles on the same output. Ties go to the greater id. */
function isNewerOutput(current, candidate) {
	if (!current) return !0;
	if (current.jobId === candidate.jobId) return !dequal(current, candidate);
	let currentAt = completionTime(current), candidateAt = completionTime(candidate);
	return candidateAt > currentAt || candidateAt === currentAt && candidate.jobId > current.jobId;
}
function newestOutput(current, candidates) {
	let newest = current;
	for (let candidate of candidates) candidate && isNewerOutput(newest, candidate) && (newest = candidate);
	return newest;
}
function mergeRobotsOutputs(existing, jobs, assetId) {
	let completed = jobs.filter((job) => job.status === "completed" && ranOnAsset(job, assetId)), summarize = newestOutput(existing?.summarize, completed.filter((job) => job.workflow === "summarize").map(extractSummarizeOutput)), moderate = newestOutput(existing?.moderate, completed.filter((job) => job.workflow === "moderate").map(extractModerateOutput));
	return summarize === existing?.summarize && moderate === existing?.moderate ? existing : compact$1({
		_type: "mux.robotsOutputs",
		summarize,
		moderate
	});
}
/** Records every job read for the asset and folds in the newest outputs. */
function applyRobotsJobs(state, jobs, assetId) {
	if (state.assetId !== assetId) return state;
	let robotsJobs = mergeJobRecords(state.robotsJobs, jobs), robotsOutputs = mergeRobotsOutputs(state.robotsOutputs, jobs, assetId);
	return robotsJobs === state.robotsJobs && robotsOutputs === state.robotsOutputs ? state : {
		...state,
		robotsJobs,
		robotsOutputs
	};
}
function toDirectiveRunRecord(run) {
	if (!run.run_id || !run.directive_id || !SAFE_KEY.test(run.run_id)) return;
	let jobIds = (run.node_states ?? []).flatMap((node) => node.job_id ? [node.job_id] : []);
	return compact$1({
		_key: run.run_id,
		_type: "mux.robotsDirectiveRun",
		runId: run.run_id,
		directiveId: run.directive_id,
		status: run.status,
		startedAt: run.started_at,
		completedAt: run.completed_at ?? void 0,
		jobIds: jobIds.length > 0 ? jobIds : void 0
	});
}
/**
* Only runs started from the Studio are recorded: `append` adds one, polling only updates
* what's already there. `jobIds` is unioned, never replaced.
*/
function mergeDirectiveRunRecords(existing, runs, { append = !1 } = {}) {
	let next = [...existing ?? []], indexByKey = new Map(next.map((record, index) => [record._key, index])), changed = !1;
	for (let run of runs) {
		let record = toDirectiveRunRecord(run);
		if (!record) continue;
		let index = indexByKey.get(record._key);
		if (index === void 0) {
			if (!append) continue;
			indexByKey.set(record._key, next.length), next.push(record), changed = !0;
			continue;
		}
		let current = next[index], jobIds = [.../* @__PURE__ */ new Set([...current.jobIds ?? [], ...record.jobIds ?? []])], merged = {
			...current,
			...record,
			...jobIds.length > 0 && { jobIds }
		};
		dequal(current, merged) || (next[index] = merged, changed = !0);
	}
	return changed ? next : existing;
}
function applyDirectiveRuns(state, runs, assetId, options) {
	if (state.assetId !== assetId) return state;
	let robotsDirectiveRuns = mergeDirectiveRunRecords(state.robotsDirectiveRuns, runs, options);
	return robotsDirectiveRuns === state.robotsDirectiveRuns ? state : {
		...state,
		robotsDirectiveRuns
	};
}
/**
* Terminal jobs whose detail (outputs, units, parameters) hasn't been read, newest first,
* within the newest `window`. Past it, the Units cell offers a Load action.
*/
function jobsAwaitingDetail(jobs, attempted, { window = 20 } = {}) {
	return jobs.toSorted((a, b) => (b.created_at ?? 0) - (a.created_at ?? 0)).slice(0, window).filter((job) => isTerminalStatus(job.status) && !attempted.has(job.id));
}
function jobsNeedingDetail(jobs, attempted, { limit = 5, window = 20 } = {}) {
	return jobsAwaitingDetail(jobs, attempted, { window }).slice(0, limit);
}
/**
* The directives whose runs are listed for this asset: configured, recorded, pending or on
* screen. Never the whole account, which would cost a request per directive in it.
*/
function polledDirectiveIds(configuredIds, state, runs) {
	let recorded = (state?.robotsDirectiveRuns ?? []).map((run) => run.directiveId), pending = pendingCreatesOf(state).flatMap((entry) => entry.kind === "directive-run" && entry.directiveId ? [entry.directiveId] : []), live = runs.flatMap((run) => run.directive_id ? [run.directive_id] : []);
	return [.../* @__PURE__ */ new Set([
		...configuredIds,
		...recorded,
		...pending,
		...live
	])].filter(Boolean).toSorted();
}
/** The directive runs that dispatched these jobs, once each (detail only). */
function directiveRunRefsFromJobs(jobs) {
	let byRunId = /* @__PURE__ */ new Map();
	for (let job of jobs) {
		let { id: directiveId, run_id: runId } = job.directive ?? {};
		directiveId && runId && !byRunId.has(runId) && byRunId.set(runId, {
			directiveId,
			runId
		});
	}
	return [...byRunId.values()];
}
function isRecent(seconds, now) {
	return !seconds || now - seconds * 1e3 < 216e5;
}
/** Jobs still worth polling: unfinished, and not so old Mux has lost track of them. */
function activeJobs(jobs, now = Date.now()) {
	return jobs.filter((job) => !isTerminalStatus(job.status) && isRecent(job.created_at, now));
}
/** Directive runs that may still dispatch work, which carries the loop between workflows. */
function activeDirectiveRuns(runs, now = Date.now()) {
	return runs.filter((run) => !isTerminalRunStatus(run.status) && isRecent(run.started_at, now));
}
/**
* Whether the document itself says Robots work is in flight: an unfinished job or run, or a
* pending create. Read from the stored fields, so it costs no request.
*/
function hasUnfinishedRobotsWork(state, now = Date.now()) {
	return activeJobs(state.robotsJobs ?? [], now).length > 0 || (state.robotsDirectiveRuns ?? []).some((run) => !isTerminalRunStatus(run.status) && isRecent(run.startedAt, now)) || pendingCreatesOf(state).some((pending) => isRecent(pending.requestedAt, now));
}
/** 64 random bits: unique within the few creates one document has pending. */
function randomRequestId() {
	let bytes = crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(8));
	return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}
function newPendingCreate(fields, nowMs) {
	let requestId = randomRequestId();
	return {
		_key: requestId,
		_type: "mux.robotsPendingCreate",
		requestId,
		...fields,
		requestedAt: Math.floor(nowMs / 1e3)
	};
}
function newPendingJobCreate(workflow, nowMs = Date.now()) {
	return newPendingCreate({
		kind: "job",
		workflow
	}, nowMs);
}
function newPendingDirectiveRunCreate(directiveId, nowMs = Date.now()) {
	return newPendingCreate({
		kind: "directive-run",
		directiveId
	}, nowMs);
}
/** Stored values are user-editable, so anything unreadable is skipped, never thrown on. */
function isPendingCreate(entry) {
	if (!entry || typeof entry != "object") return !1;
	let { _key, requestId, kind, requestedAt, workflow, directiveId } = entry;
	return typeof requestId != "string" || _key !== requestId || !SAFE_KEY.test(requestId) || typeof requestedAt != "number" || !Number.isFinite(requestedAt) ? !1 : kind === "job" ? typeof workflow == "string" && workflow !== "" : kind === "directive-run" && typeof directiveId == "string" && directiveId !== "";
}
function pendingCreatesOf(state) {
	return (state?.robotsPendingCreates ?? []).filter(isPendingCreate);
}
function addPendingCreate(state, pending, assetId) {
	return state.assetId !== assetId || pendingCreatesOf(state).some((entry) => entry.requestId === pending.requestId) ? state : {
		...state,
		robotsPendingCreates: [...state.robotsPendingCreates ?? [], pending]
	};
}
/** Unreadable entries are kept, so a write never drops what this version can't parse. */
function removePendingCreates(state, predicate) {
	let stored = state.robotsPendingCreates ?? [], kept = stored.filter((entry) => !(isPendingCreate(entry) && predicate(entry)));
	return kept.length === stored.length ? state : {
		...state,
		robotsPendingCreates: kept
	};
}
/** A 202 named the job: its record replaces the placeholder, in one write. */
function resolvePendingJobCreate(state, requestId, job, assetId) {
	return state.assetId === assetId ? applyRobotsJobs(removePendingCreates(state, (entry) => entry.requestId === requestId), [job], assetId) : state;
}
/** A 202 named the run: its record replaces the placeholder, in one write. */
function resolvePendingDirectiveRunCreate(state, requestId, run, assetId) {
	return state.assetId === assetId ? applyDirectiveRuns(removePendingCreates(state, (entry) => entry.requestId === requestId), [run], assetId, { append: !0 }) : state;
}
function closestTo(requestedAt, candidates) {
	return candidates.toSorted((a, b) => Math.abs(a.at - requestedAt) - Math.abs(b.at - requestedAt) || a.at - b.at || a.id.localeCompare(b.id))[0];
}
function inMatchWindow(at, requestedAt) {
	return at >= requestedAt - 15 && at <= requestedAt + 120;
}
/**
* Which job or run resolves which placeholder, as `requestId` → id. A create this tab holds a
* response for (`links`) resolves to it; the rest, oldest first, take the closest unused match
* inside the window that the document hasn't already recorded.
*/
function matchPendingCreates(pendings, jobs, runs, state, links = /* @__PURE__ */ new Map()) {
	let matched = /* @__PURE__ */ new Map(), used = /* @__PURE__ */ new Set();
	for (let pending of pendings) {
		let linked = links.get(pending.requestId);
		linked && (matched.set(pending.requestId, linked), used.add(linked));
	}
	let recordedJobIds = new Set((state?.robotsJobs ?? []).map((record) => record.id)), recordedRunIds = new Set((state?.robotsDirectiveRuns ?? []).map((record) => record.runId)), unlinked = pendings.filter((pending) => !matched.has(pending.requestId)).toSorted((a, b) => a.requestedAt - b.requestedAt);
	for (let pending of unlinked) {
		let candidates = pending.kind === "job" ? jobs.flatMap((job) => job.workflow === pending.workflow && !recordedJobIds.has(job.id) && typeof job.created_at == "number" ? [{
			id: job.id,
			at: job.created_at
		}] : []) : runs.flatMap((run) => run.run_id && run.directive_id === pending.directiveId && state?.assetId && run.subject_id === state.assetId && !recordedRunIds.has(run.run_id) && typeof run.started_at == "number" ? [{
			id: run.run_id,
			at: run.started_at
		}] : []), match = closestTo(pending.requestedAt, candidates.filter((candidate) => !used.has(candidate.id) && inMatchWindow(candidate.at, pending.requestedAt)));
		match && (matched.set(pending.requestId, match.id), used.add(match.id));
	}
	return matched;
}
/**
* Removes every placeholder these reads resolve and records the runs that resolve one. The
* jobs are recorded by `applyRobotsJobs`, applied after this in the same write.
*/
function resolvePendingCreatesFromReads(state, jobs, runs, assetId, links) {
	if (state.assetId !== assetId) return state;
	let pendings = pendingCreatesOf(state);
	if (pendings.length === 0) return state;
	let matched = matchPendingCreates(pendings, jobs, runs, state, links);
	if (matched.size === 0) return state;
	let resolvedRunIds = new Set(pendings.filter((pending) => pending.kind === "directive-run" && matched.has(pending.requestId)).map((pending) => matched.get(pending.requestId)));
	return applyDirectiveRuns(removePendingCreates(state, (pending) => matched.has(pending.requestId)), runs.filter((run) => resolvedRunIds.has(run.run_id)), assetId, { append: !0 });
}
/**
* One pending row per request, so a row and the job or run it becomes are never both on screen
* and never both missing. The rows, the Run buttons and the note all read this.
*/
function pendingCreateRows({ stored, local, settled, links, jobs, runs, state, nowS }) {
	let localPhase = (requestId) => local?.pending.requestId === requestId ? local.phase : void 0, unsaved = local?.phase === "saving" && !stored.some((p) => p.requestId === local.pending.requestId) ? [local.pending] : [], unsettled = [...stored, ...unsaved].filter((pending) => !settled.has(pending.requestId)), matched = matchPendingCreates(unsettled.filter((pending) => localPhase(pending.requestId) !== "saving"), jobs, runs, state, links), shownIds = /* @__PURE__ */ new Set([...jobs.map((job) => job.id), ...runs.map((run) => run.run_id)]);
	return unsettled.filter((pending) => {
		let resolvedTo = matched.get(pending.requestId);
		return !resolvedTo || !shownIds.has(resolvedTo);
	}).map((pending) => {
		let phase = localPhase(pending.requestId);
		return phase ? {
			pending,
			phase: phase === "unconfirmed" ? "unconfirmed" : "starting"
		} : {
			pending,
			phase: nowS - pending.requestedAt < 45 ? "starting" : "unconfirmed"
		};
	});
}
/** When another tab's placeholder crosses the grace period, so its row can be relabelled. */
function nextPendingRelabelAt(pendings, nowS) {
	let crossings = pendings.map((pending) => pending.requestedAt + 45).filter((at) => at > nowS);
	return crossings.length > 0 ? Math.min(...crossings) : void 0;
}
function tableRows(pendingRows, items, idOf, timeOf) {
	let rows = [...pendingRows.map((pending) => ({
		key: `create:${pending.pending.requestId}`,
		pending
	})), ...items.map((item) => ({
		key: idOf(item),
		item
	}))], at = (row) => row.pending ? row.pending.pending.requestedAt : timeOf(row.item);
	return rows.toSorted((a, b) => {
		let atA = at(a), atB = at(b);
		return atA === void 0 == (atB === void 0) ? atA !== void 0 && atB !== void 0 && atA !== atB ? atB - atA : !!a.pending == !!b.pending ? a.key.localeCompare(b.key) : a.pending ? -1 : 1 : atA === void 0 ? 1 : -1;
	});
}
function jobTableRows(pendingRows, jobs) {
	return tableRows(pendingRows, jobs, (job) => job.id, (job) => job.created_at);
}
function runTableRows(pendingRows, runs) {
	return tableRows(pendingRows, runs, (run) => run.run_id, (run) => run.started_at);
}
/** The live list, plus recorded jobs Mux no longer lists: it deletes them after 30 days. */
function jobsWithHistory(jobs, records) {
	let listed = new Set(jobs.map((job) => job.id)), history = (records ?? []).filter((record) => !listed.has(record.id)).map((record) => compact$1({
		id: record.id,
		workflow: record.workflow,
		status: record.status,
		created_at: record.created_at,
		updated_at: record.updated_at,
		units_consumed: record.units_consumed,
		errors: record.error ? [{ message: record.error }] : void 0
	}));
	return [...jobs, ...history];
}
/** Every state names itself, so "unknown" never looks like "empty". */
function unitsCell(job, detail) {
	return job.status === "errored" || job.status === "cancelled" ? {
		label: "Not charged",
		isLoadable: !1
	} : typeof job.units_consumed == "number" ? {
		label: String(job.units_consumed),
		isLoadable: !1
	} : isTerminalStatus(job.status) ? detail === "unreadable" ? {
		label: "Unavailable",
		isLoadable: !1
	} : detail === "loaded" ? {
		label: "Not reported",
		isLoadable: !1
	} : {
		label: "Not loaded",
		isLoadable: !0
	} : {
		label: "Not counted yet",
		isLoadable: !1
	};
}
/** Recent jobs only: an old one must not overwrite a thumbnail someone picked since. */
function thumbnailJobsToApply(state, jobs, now = Date.now()) {
	let unapplied = new Set((state.robotsJobs ?? []).filter((record) => !record.thumbnailApplied).map((record) => record.id));
	return jobs.filter((job) => job.workflow === "find-best-thumbnails" && job.status === "completed" && job.parameters?.update_asset_thumbnail === !0 && unapplied.has(job.id) && isRecent(job.updated_at ?? job.created_at, now));
}
/** Copies the asset's `thumbnail_time` into `thumbTime` and marks the jobs, in one write. */
function applyThumbnail(state, jobIds, assetId) {
	let thumbnailTime = state.data?.thumbnail_time;
	return state.assetId !== assetId || typeof thumbnailTime != "number" || jobIds.length === 0 ? state : {
		...state,
		thumbTime: thumbnailTime,
		robotsJobs: (state.robotsJobs ?? []).map((record) => jobIds.includes(record.id) ? {
			...record,
			thumbnailApplied: !0
		} : record)
	};
}
/**
* One Robots poll loop per asset per browser tab, shared by every input and panel showing that
* asset. It polls only while something subscribes and something is in flight, so a Studio that
* never opens Robots sends nothing.
*/
const POLL_INTERVAL_MS = 6e3, LOG_PREFIX = "[sanity-plugin-mux-input]", EMPTY_SET = /* @__PURE__ */ new Set(), EMPTY_ROBOTS_SNAPSHOT = {
	hasLoadedOnce: !1,
	isRefreshing: !1,
	jobs: [],
	detailedJobIds: EMPTY_SET,
	failedDetailIds: EMPTY_SET,
	loadingDetailIds: EMPTY_SET,
	pendingDetailIds: EMPTY_SET,
	cancellingJobIds: EMPTY_SET,
	directiveRuns: [],
	areDirectiveRunsPending: !1,
	settledRequestIds: EMPTY_SET,
	links: /* @__PURE__ */ new Map()
}, isRefusal = (error) => error instanceof RobotsRequestError && error.status !== void 0 && error.status >= 400 && error.status < 500, byNewestStart = (a, b) => (b.started_at ?? 0) - (a.started_at ?? 0);
/** Whether the document already stores these asset fields, compared as the JSON it's saved as. */
function holdsAssetFields(document, fields) {
	return document?.status === fields.status && dequal(document.data, JSON.parse(JSON.stringify(fields.data)));
}
var RobotsSyncStore = class {
	client;
	documentId;
	assetId;
	snapshot;
	listeners = /* @__PURE__ */ new Set();
	subscribers = /* @__PURE__ */ new Map();
	document;
	pollTimer;
	trackTimer;
	/** Someone came back after nobody watched: read afresh once their inputs arrive. */
	needsFreshRead = !1;
	isFetching = !1;
	isRefreshQueued = !1;
	liveJobs = [];
	/** Jobs created in this tab that the list hasn't caught up with yet. */
	locallyCreated = /* @__PURE__ */ new Map();
	details = /* @__PURE__ */ new Map();
	failedDetails = /* @__PURE__ */ new Set();
	/** Jobs the list calls finished but whose detail didn't yet, with the reads so far. */
	trailingDetails = /* @__PURE__ */ new Map();
	detailTimer;
	isDetailPassRunning = !1;
	/** Jobs whose completion already refreshed the asset this session. */
	resyncedJobIds = /* @__PURE__ */ new Set();
	resyncingJobIds = /* @__PURE__ */ new Set();
	links = /* @__PURE__ */ new Map();
	seenRequestIds = /* @__PURE__ */ new Set();
	/** Recorded running jobs the list didn't show, already looked for once. */
	lookedUpJobIds = /* @__PURE__ */ new Set();
	jobRecheckTicks = 0;
	runRecheckTicks = 0;
	startingJob;
	startingRun;
	listedRuns = [];
	namedRuns = [];
	isLoadingRuns = !1;
	runsInFlightKey;
	isRunsQueued = !1;
	runsSettledKey;
	isPersisting = !1;
	isPersistQueued = !1;
	hasLoggedWriteFailure = !1;
	constructor(client, documentId, assetId) {
		this.client = client, this.documentId = documentId, this.assetId = assetId;
		let capability = cachedRobotsCapability();
		this.snapshot = {
			...EMPTY_ROBOTS_SNAPSHOT,
			...capability && { capability },
			links: this.links
		};
	}
	subscribe = (listener) => (this.listeners.add(listener), () => this.listeners.delete(listener));
	getSnapshot = () => this.snapshot;
	register() {
		let token = Symbol("robots-subscriber"), isFirst = this.subscribers.size === 0;
		return this.subscribers.set(token, {
			document: this.document,
			defaultDirectiveIds: []
		}), isFirst && this.snapshot.hasLoadedOnce && (this.needsFreshRead = !0), {
			update: ({ client, ...inputs }) => {
				this.client = client, this.subscribers.set(token, inputs), this.setDocument(inputs.document);
			},
			unregister: () => {
				this.subscribers.delete(token), !(this.subscribers.size > 0) && this.stopPolling();
			}
		};
	}
	set(changes) {
		this.snapshot = {
			...this.snapshot,
			...changes
		};
		for (let listener of this.listeners) listener();
	}
	enrichedJobs() {
		return this.liveJobs.map((job) => {
			let detail = this.details.get(job.id);
			return detail ? {
				...job,
				...detail
			} : job;
		});
	}
	directiveRuns() {
		let listedIds = new Set(this.listedRuns.map((run) => run.run_id));
		return [...this.listedRuns, ...this.namedRuns.filter((run) => !listedIds.has(run.run_id))].toSorted(byNewestStart);
	}
	directiveIdKey() {
		return polledDirectiveIds([...this.subscribers.values()].flatMap((inputs) => inputs.defaultDirectiveIds), this.document, this.listedRuns).join(",");
	}
	namedRunKey() {
		return directiveRunRefsFromJobs(this.enrichedJobs()).map((ref) => `${ref.directiveId}/${ref.runId}`).toSorted().join(",");
	}
	publishReads() {
		let jobs = this.enrichedJobs(), attempted = /* @__PURE__ */ new Set([...this.details.keys(), ...this.failedDetails]), runKey = `${this.directiveIdKey()}|${this.namedRunKey()}`;
		this.set({
			jobs,
			detailedJobIds: new Set(this.details.keys()),
			failedDetailIds: new Set(this.failedDetails),
			pendingDetailIds: new Set(jobsAwaitingDetail(this.liveJobs, attempted).map((job) => job.id)),
			directiveRuns: this.directiveRuns(),
			areDirectiveRunsPending: runKey !== "|" && this.runsSettledKey !== runKey
		});
	}
	setDocument(document) {
		this.document = document;
		for (let pending of pendingCreatesOf(document)) this.seenRequestIds.has(pending.requestId) || (this.seenRequestIds.add(pending.requestId), pending.kind === "job" ? this.jobRecheckTicks = 0 : this.runRecheckTicks = 0);
		if (!this.snapshot.hasLoadedOnce) {
			this.startIfNeeded();
			return;
		}
		if (this.needsFreshRead) {
			this.needsFreshRead = !1, this.readEverything();
			return;
		}
		if (this.pollTimer || this.isFetching) return;
		let listed = new Set(this.liveJobs.map((job) => job.id)), unknown = activeJobs(document?.robotsJobs ?? []).filter((record) => !listed.has(record.id) && !this.lookedUpJobIds.has(record.id));
		if (unknown.length > 0) {
			for (let record of unknown) this.lookedUpJobIds.add(record.id);
			this.refresh();
		} else this.scheduleTick();
	}
	/** The first read, once anything subscribes. A known-unavailable session reads nothing. */
	startIfNeeded() {
		if (this.subscribers.size === 0 || this.isFetching || this.snapshot.hasLoadedOnce) return;
		let cached = cachedRobotsCapability();
		cached && cached.state !== "enabled" ? this.set({
			capability: cached,
			hasLoadedOnce: !0
		}) : this.readEverything();
	}
	readEverything() {
		this.refresh(), this.loadDirectiveRuns();
	}
	stopPolling() {
		this.pollTimer && clearTimeout(this.pollTimer), this.pollTimer = void 0;
	}
	scheduleTick() {
		if (this.stopPolling(), this.subscribers.size === 0 || this.snapshot.capability?.state !== "enabled" || !this.snapshot.hasLoadedOnce) return;
		let pendings = pendingCreatesOf(this.document), hasJobCreates = pendings.some((pending) => pending.kind === "job"), hasRunCreates = pendings.some((pending) => pending.kind === "directive-run"), isRecheckingJobs = hasJobCreates && this.jobRecheckTicks < 10, isRecheckingRuns = hasRunCreates && this.runRecheckTicks < 10, hasActiveRuns = activeDirectiveRuns(this.directiveRuns()).length > 0;
		(activeJobs(this.enrichedJobs()).length > 0 || hasActiveRuns || isRecheckingJobs || isRecheckingRuns) && (this.pollTimer = setTimeout(() => {
			this.pollTimer = void 0, hasJobCreates && (this.jobRecheckTicks += 1), hasRunCreates && (this.runRecheckTicks += 1), this.refresh(), (hasActiveRuns || isRecheckingRuns) && this.loadDirectiveRuns();
		}, POLL_INTERVAL_MS));
	}
	/** Refresh button: the list, the runs, now. */
	refreshNow() {
		this.set({ isRefreshing: !0 }), this.readEverything();
	}
	async refresh() {
		if (this.isFetching) {
			this.isRefreshQueued = !0;
			return;
		}
		this.isFetching = !0;
		let fetched;
		try {
			fetched = (await listRobotsJobs(this.client, {
				assetId: this.assetId,
				limit: 100
			})).data ?? [];
			let listed = new Set(fetched.map((job) => job.id));
			for (let id of this.locallyCreated.keys()) listed.has(id) && this.locallyCreated.delete(id);
			this.liveJobs = [...this.locallyCreated.values(), ...fetched], recordRobotsCapability({ state: "enabled" }), this.set({
				capability: this.snapshot.capability?.state === "enabled" ? this.snapshot.capability : { state: "enabled" },
				loadError: void 0
			});
		} catch (error) {
			let unavailable = capabilityFromError(error);
			unavailable ? (recordRobotsCapability(unavailable), this.set({ capability: unavailable })) : this.set({ loadError: error instanceof Error ? error.message : "Could not load the Robots jobs for this video." });
		} finally {
			this.isFetching = !1, this.set({
				hasLoadedOnce: !0,
				isRefreshing: !1
			});
		}
		fetched && (this.publishReads(), this.resyncFinishedJobs(fetched), this.loadDetails(), this.persist()), this.isRefreshQueued ? (this.isRefreshQueued = !1, this.refresh()) : this.scheduleTick();
	}
	/**
	* A completed job may have changed the Mux asset (tracks, title, thumbnail, playback IDs), so
	* the asset is refreshed the way `useMuxPolling` does: status and data only, never filename.
	*/
	async resyncFinishedJobs(jobs) {
		let finished = jobs.filter((job) => job.status === "completed" && !this.resyncedJobIds.has(job.id) && !this.resyncingJobIds.has(job.id));
		if (finished.length !== 0) {
			for (let job of finished) this.resyncingJobIds.add(job.id);
			try {
				let isTrackPreparing = await this.refreshAsset();
				for (let job of finished) this.resyncedJobIds.add(job.id);
				this.persist(), isTrackPreparing && this.awaitTracks(20);
			} catch (error) {
				console.error(`${LOG_PREFIX} Could not refresh the asset after a Robots job`, error);
			} finally {
				for (let job of finished) this.resyncingJobIds.delete(job.id);
			}
		}
	}
	/** Writes the asset as Mux has it now. Resolves to whether a track is still preparing. */
	async refreshAsset() {
		let { data } = await getAsset(this.client, this.assetId), fields = {
			status: data.status,
			data: addKeysToMuxData(data)
		};
		return holdsAssetFields(this.document, fields) || await this.client.patch(this.documentId).set(fields).commit({ returnDocuments: !1 }), hasPreparingTracks(data.tracks);
	}
	/**
	* A caption or audio track a job added can still be preparing, and players only get it once
	* the document says it's ready, so the asset is read again a few times. It outlives the last
	* subscriber: the input stops subscribing once the job's record says completed.
	*/
	awaitTracks(remaining) {
		this.trackTimer && clearTimeout(this.trackTimer), this.trackTimer = void 0, !(remaining <= 0) && (this.trackTimer = setTimeout(() => {
			this.trackTimer = void 0, this.refreshAsset().then((isTrackPreparing) => {
				isTrackPreparing && this.awaitTracks(remaining - 1);
			}).catch((error) => {
				console.error(`${LOG_PREFIX} Could not refresh the asset after a Robots job`, error);
			});
		}, POLL_INTERVAL_MS));
	}
	/**
	* The detail pass: a few of the newest terminal jobs at a time, each read once. It follows a
	* read even with nobody subscribed, as after an upload, so outputs still reach the document.
	*/
	async loadDetails() {
		if (this.isDetailPassRunning) return;
		let attempted = /* @__PURE__ */ new Set([
			...this.details.keys(),
			...this.failedDetails,
			...this.trailingDetails.keys()
		]), batch = jobsNeedingDetail(this.liveJobs, attempted);
		if (batch.length === 0) return;
		this.isDetailPassRunning = !0;
		let results = await Promise.all(batch.map((job) => this.readDetail(job)));
		this.isDetailPassRunning = !1, this.retryTrailingDetails(), results.every((result) => !result) ? this.publishReads() : (this.publishReads(), this.persist(), this.loadDirectiveRuns(), this.loadDetails());
	}
	/**
	* Re-reads the trailing details on a timer of their own, since nothing else may poll once the
	* list says every job is done. Bounded, so it outlives the last subscriber like `awaitTracks`.
	*/
	retryTrailingDetails() {
		this.detailTimer || this.trailingDetails.size === 0 || (this.detailTimer = setTimeout(() => {
			this.detailTimer = void 0;
			let jobs = [...this.trailingDetails.values()].map((entry) => entry.job);
			Promise.all(jobs.map((job) => this.readDetail(job))).then((results) => {
				this.publishReads(), results.some(Boolean) && (this.persist(), this.loadDirectiveRuns()), this.retryTrailingDetails();
			});
		}, POLL_INTERVAL_MS));
	}
	async readDetail(job) {
		try {
			let detail = (await getRobotsJob(this.client, job.workflow, job.id)).data, reads = (this.trailingDetails.get(job.id)?.reads ?? 0) + 1;
			if (detail && !isTerminalStatus(detail.status) && reads < 10) return this.trailingDetails.set(job.id, {
				job,
				reads
			}), !1;
			if (this.trailingDetails.delete(job.id), detail && isTerminalStatus(detail.status)) return this.details.set(job.id, detail), !0;
		} catch (error) {
			this.trailingDetails.delete(job.id), console.error(`${LOG_PREFIX} Could not load Robots job ${job.id}`, error);
		}
		return this.failedDetails.add(job.id), !1;
	}
	/** One row's detail, on a click past the background window. */
	async loadJobDetail(job) {
		if (this.details.has(job.id) || this.failedDetails.has(job.id) || this.snapshot.loadingDetailIds.has(job.id)) return;
		this.set({ loadingDetailIds: /* @__PURE__ */ new Set([...this.snapshot.loadingDetailIds, job.id]) });
		let loaded = await this.readDetail(job), loadingDetailIds = new Set(this.snapshot.loadingDetailIds);
		loadingDetailIds.delete(job.id), this.set({ loadingDetailIds }), this.publishReads(), loaded && this.persist();
	}
	/** Keeps what the output dialog fetched, once the job is final: an earlier read would pin
	* the status it had then. */
	rememberJobDetail = (job) => {
		isTerminalStatus(job.status) && !this.details.has(job.id) && (this.details.set(job.id, job), this.trailingDetails.delete(job.id), this.publishReads(), this.persist());
	};
	/**
	* The runs on this asset. The runs endpoint can't filter by asset, so only directives the
	* asset is tied to are listed and narrowed by `subject_id`; runs of any other directive are
	* read by id from the jobs that name them.
	*/
	async loadDirectiveRuns() {
		let directiveKey = this.directiveIdKey(), namedKey = this.namedRunKey(), passKey = `${directiveKey}|${namedKey}`;
		if (passKey === "|") this.publishReads();
		else if (this.isLoadingRuns) passKey !== this.runsInFlightKey && (this.isRunsQueued = !0);
		else {
			this.isLoadingRuns = !0, this.runsInFlightKey = passKey;
			try {
				let directiveIds = directiveKey ? directiveKey.split(",") : [], listed = await Promise.all(directiveIds.map((id) => this.listRunsOf(id)));
				this.listedRuns = listed.flatMap((runs, index) => runs ?? this.listedRuns.filter((run) => run.directive_id === directiveIds[index])).toSorted(byNewestStart);
				let listedIds = new Set(this.listedRuns.map((run) => run.run_id)), settledIds = new Set(this.namedRuns.filter((run) => activeDirectiveRuns([run]).length === 0).map((run) => run.run_id)), refs = namedKey ? namedKey.split(",").map((key) => {
					let [directiveId = "", runId = ""] = key.split("/");
					return {
						directiveId,
						runId
					};
				}) : [], fresh = (await Promise.all(refs.filter((ref) => !listedIds.has(ref.runId) && !settledIds.has(ref.runId)).map((ref) => this.readNamedRun(ref.directiveId, ref.runId)))).filter((run) => !!run), freshIds = new Set(fresh.map((run) => run.run_id));
				this.namedRuns = [...fresh, ...this.namedRuns.filter((run) => !freshIds.has(run.run_id))];
			} finally {
				this.isLoadingRuns = !1, this.runsInFlightKey = void 0, this.runsSettledKey = passKey;
			}
			this.publishReads(), this.persist(), this.isRunsQueued ? (this.isRunsQueued = !1, this.loadDirectiveRuns()) : !this.pollTimer && !this.isFetching && this.scheduleTick();
		}
	}
	async listRunsOf(directiveId) {
		try {
			let runs = ((await listRobotsDirectiveRuns(this.client, directiveId, { limit: 25 })).data ?? []).filter((run) => run.subject_id === this.assetId).map((run) => ({
				...run,
				directive_id: directiveId
			}));
			return await Promise.all(runs.map(async (run) => run.node_states ? run : await this.readNamedRun(directiveId, run.run_id) ?? run));
		} catch (error) {
			console.error(`${LOG_PREFIX} Could not list the runs of directive ${directiveId}`, error);
			return;
		}
	}
	async readNamedRun(directiveId, runId) {
		try {
			let run = (await getRobotsDirectiveRun(this.client, directiveId, runId)).data;
			return run?.run_id && run.subject_id === this.assetId ? {
				...run,
				directive_id: directiveId
			} : void 0;
		} catch (error) {
			console.error(`${LOG_PREFIX} Could not load directive run ${runId}`, error);
			return;
		}
	}
	/** What the reads say, merged onto the latest document at write time. */
	mergeReads = (current) => {
		let jobs = this.enrichedJobs(), runs = this.directiveRuns(), withJobs = applyRobotsJobs(applyDirectiveRuns(resolvePendingCreatesFromReads(current, jobs, runs, this.assetId, this.links), runs, this.assetId), jobs, this.assetId);
		return applyThumbnail(withJobs, thumbnailJobsToApply(withJobs, jobs.filter((job) => this.resyncedJobIds.has(job.id))).map((job) => job.id), this.assetId);
	};
	/** One write at a time; a write asked for meanwhile runs once more with the newest reads. */
	persist() {
		(this.liveJobs.length !== 0 || this.listedRuns.length !== 0 || this.namedRuns.length !== 0) && (this.isPersisting ? this.isPersistQueued = !0 : (this.isPersisting = !0, writeRobotsFields(this.client, this.documentId, this.assetId, this.mergeReads).catch((error) => {
			this.hasLoggedWriteFailure || (this.hasLoggedWriteFailure = !0, console.warn(`${LOG_PREFIX} Could not record Robots state on the video document`, error));
		}).finally(() => {
			this.isPersisting = !1, this.isPersistQueued && (this.isPersistQueued = !1, this.persist());
		})));
	}
	setLocal(kind, local) {
		this.set(kind === "job" ? { localJobCreate: local } : { localRunCreate: local });
	}
	setLocalPhase(pending, phase) {
		this.setLocal(pending.kind, {
			pending,
			phase
		});
	}
	dropLocal(pending) {
		(pending.kind === "job" ? this.snapshot.localJobCreate : this.snapshot.localRunCreate)?.pending.requestId === pending.requestId && this.setLocal(pending.kind, void 0);
	}
	/** Hides these rows and gives Run back at once, while their removal is written. */
	settle(pendings) {
		this.set({ settledRequestIds: /* @__PURE__ */ new Set([...this.snapshot.settledRequestIds, ...pendings.map((pending) => pending.requestId)]) }), pendings.forEach((pending) => this.dropLocal(pending));
	}
	removePlaceholders(requestIds) {
		writeRobotsFields(this.client, this.documentId, this.assetId, (current) => removePendingCreates(current, (entry) => requestIds.includes(entry.requestId))).catch((error) => {
			console.error(`${LOG_PREFIX} Could not remove a settled Robots placeholder`, error);
		});
	}
	/** No placeholder, no spend: nothing is sent unless it was saved. */
	async savePlaceholder(pending, notify) {
		let saved = !1;
		try {
			saved = await writeRobotsFields(this.client, this.documentId, this.assetId, (current) => addPendingCreate(current, pending, this.assetId));
		} catch (error) {
			console.error(`${LOG_PREFIX} Could not record a Robots run before starting it`, error);
		}
		return saved ? (this.setLocalPhase(pending, "sending"), !0) : (this.dropLocal(pending), notify({
			status: "error",
			title: "Could not record this run on the video, so it was not started."
		}), !1);
	}
	/** Mux or the proxy said no: nothing started, so the placeholder has nothing left to guard. */
	settleRefusal(pending, error, alreadyRunning, notify) {
		if (this.settle([pending]), this.removePlaceholders([pending.requestId]), error.status === 409) {
			notify({
				status: "warning",
				title: alreadyRunning
			}), this.readEverything();
			return;
		}
		notify({
			status: "error",
			title: "Mux refused this run",
			description: error.message
		});
		let advisory = advisoryFromError(error);
		advisory ? this.set({ advisory }) : capabilityFromError(error) && this.refresh();
	}
	/** Unknown outcome: it may be running and billing. The placeholder stays and the loop looks. */
	markUnconfirmed(pending, what, notify) {
		this.setLocalPhase(pending, "unconfirmed"), pending.kind === "job" ? this.jobRecheckTicks = 0 : this.runRecheckTicks = 0, notify({
			status: "warning",
			title: `Mux hasn’t answered about ${what} yet`,
			description: "The Robots panel keeps checking."
		}), this.readEverything();
	}
	/** The created job or run replaces its placeholder. A failure is logged, never a failed run. */
	recordCreated(mutate) {
		return writeRobotsFields(this.client, this.documentId, this.assetId, mutate).catch((error) => {
			console.error(`${LOG_PREFIX} Started a Robots run but could not record it`, error);
		});
	}
	/** Starts a workflow, once. The dialog has already closed; the job table shows the rest. */
	async startJob(workflow, parameters, notify) {
		if (this.startingJob) return;
		let pending = newPendingJobCreate(workflow);
		this.startingJob = pending.requestId, this.setLocalPhase(pending, "saving");
		try {
			if (!await this.savePlaceholder(pending, notify)) return;
			let job;
			try {
				job = await startRobotsJob(this.client, workflow, parameters);
			} catch (error) {
				isRefusal(error) ? this.settleRefusal(pending, error, "This workflow is already running on this video with the same settings.", notify) : this.markUnconfirmed(pending, `the ${workflowLabel(workflow)} run`, notify);
				return;
			}
			this.links.set(pending.requestId, job.id), this.locallyCreated.set(job.id, job), this.liveJobs = [job, ...this.liveJobs.filter((existing) => existing.id !== job.id)], this.publishReads(), this.dropLocal(pending), await this.recordCreated((current) => resolvePendingJobCreate(current, pending.requestId, job, this.assetId)), this.set({ advisory: void 0 }), notify({
				status: "success",
				title: `Started ${workflowLabel(workflow)}`,
				description: "This can take a few minutes."
			});
		} finally {
			this.startingJob === pending.requestId && (this.startingJob = void 0), this.scheduleTick();
		}
	}
	/** Starts a directive run on the same terms: it dispatches several billable workflows. */
	async startDirectiveRun(directiveId, notify) {
		if (this.startingRun) return;
		let pending = newPendingDirectiveRunCreate(directiveId);
		this.startingRun = pending.requestId, this.setLocalPhase(pending, "saving");
		try {
			if (!await this.savePlaceholder(pending, notify)) return;
			let run;
			try {
				run = await startRobotsDirectiveRun(this.client, directiveId, this.assetId);
			} catch (error) {
				isRefusal(error) ? this.settleRefusal(pending, error, "This directive is already running on this video.", notify) : this.markUnconfirmed(pending, "this directive run", notify);
				return;
			}
			this.links.set(pending.requestId, run.run_id), this.listedRuns = [run, ...this.listedRuns.filter((existing) => existing.run_id !== run.run_id)], this.publishReads(), this.dropLocal(pending), await this.recordCreated((current) => resolvePendingDirectiveRunCreate(current, pending.requestId, run, this.assetId)), this.set({ advisory: void 0 }), notify({
				status: "success",
				title: "Directive run started"
			}), this.refresh();
		} finally {
			this.startingRun === pending.requestId && (this.startingRun = void 0), this.scheduleTick();
		}
	}
	async cancelJob(job, notify) {
		this.set({ cancellingJobIds: /* @__PURE__ */ new Set([...this.snapshot.cancellingJobIds, job.id]) });
		try {
			await cancelRobotsJob(this.client, job.id);
		} catch (error) {
			error instanceof RobotsRequestError && error.status === 409 || notify({
				status: "error",
				title: "Could not cancel this job",
				...error instanceof Error && { description: error.message }
			});
		} finally {
			let cancellingJobIds = new Set(this.snapshot.cancellingJobIds);
			cancellingJobIds.delete(job.id), this.set({ cancellingJobIds });
		}
		await this.refresh();
	}
	/** "Nothing is running": clears exactly the placeholders the note names. */
	clearUnconfirmed(pendings) {
		this.settle(pendings), this.removePlaceholders(pendings.map((pending) => pending.requestId));
	}
};
const stores = /* @__PURE__ */ new Map();
/** The store for one asset document, kept for the browser session. */
function getRobotsSyncStore(client, documentId, assetId) {
	let { projectId, dataset } = client.config(), key = `${projectId}:${dataset}:${documentId}:${assetId}`, store = stores.get(key);
	return store || (store = new RobotsSyncStore(client, documentId, assetId), stores.set(key, store)), store;
}
const NO_DIRECTIVES$2 = [], subscribeToNothing = () => () => {}, getEmptySnapshot = () => EMPTY_ROBOTS_SNAPSHOT;
/**
* Subscribes to the asset's shared Robots loop while `enabled` (see `RobotsSyncStore`), and
* keeps it fed with the document as this component sees it.
*/
function useRobotsSync(asset, t0) {
	let $ = c(17), { enabled, defaultDirectiveIds: t1 } = t0, defaultDirectiveIds = t1 === void 0 ? NO_DIRECTIVES$2 : t1, client = useClient$1(), documentId = asset?._id, assetId = asset?.assetId, t2;
	$[0] !== assetId || $[1] !== client || $[2] !== documentId || $[3] !== enabled ? (t2 = enabled && documentId && assetId ? getRobotsSyncStore(client, documentId, assetId) : void 0, $[0] = assetId, $[1] = client, $[2] = documentId, $[3] = enabled, $[4] = t2) : t2 = $[4];
	let store = t2, snapshot = useSyncExternalStore(store?.subscribe ?? subscribeToNothing, store?.getSnapshot ?? getEmptySnapshot), subscription = useRef(void 0), t3, t4;
	$[5] === store ? (t3 = $[6], t4 = $[7]) : (t3 = () => {
		if (!store) return;
		let registered = store.register();
		return subscription.current = registered, () => {
			registered.unregister(), subscription.current = void 0;
		};
	}, t4 = [store], $[5] = store, $[6] = t3, $[7] = t4), useEffect(t3, t4);
	let t5, t6;
	$[8] !== asset || $[9] !== client || $[10] !== defaultDirectiveIds || $[11] !== store ? (t5 = () => {
		store && subscription.current?.update({
			client,
			document: asset ?? void 0,
			defaultDirectiveIds
		});
	}, t6 = [
		store,
		client,
		asset,
		defaultDirectiveIds
	], $[8] = asset, $[9] = client, $[10] = defaultDirectiveIds, $[11] = store, $[12] = t5, $[13] = t6) : (t5 = $[12], t6 = $[13]), useEffect(t5, t6);
	let t7;
	return $[14] !== snapshot || $[15] !== store ? (t7 = {
		store,
		snapshot
	}, $[14] = snapshot, $[15] = store, $[16] = t7) : t7 = $[16], t7;
}
/** The summary's outputs that have a value, in the order the dialog lists them. */
function summaryOutputRows(summary) {
	let rows = [];
	return summary?.title?.trim() && rows.push({
		key: "title",
		label: "Title",
		kind: "text",
		value: summary.title
	}), summary?.description?.trim() && rows.push({
		key: "description",
		label: "Description",
		kind: "text",
		value: summary.description
	}), summary?.tags?.length && rows.push({
		key: "tags",
		label: "Tags",
		kind: "list",
		value: summary.tags
	}), rows;
}
/** Built-in string types that hold something other than free text. */
const NOT_FREE_TEXT = /* @__PURE__ */ new Set([
	"url",
	"email",
	"date",
	"datetime",
	"slug"
]);
function typeNames(type) {
	let names = [];
	for (let current = type; current; current = current.type) names.push(current.name);
	return names;
}
/** Free text: a string or text field without a fixed list of values. */
function isFreeText(type) {
	let names = typeNames(type);
	return (names.includes("string") || names.includes("text")) && !names.some((name) => NOT_FREE_TEXT.has(name)) && !type?.options?.list;
}
/**
* The document's own fields a summary can be written to: free text for the title and the
* description, a list of free text for the tags. Read-only and hidden fields aren't offered.
*/
function summaryTargetFields(documentType) {
	return (documentType?.fields ?? []).flatMap((field) => {
		let { type } = field;
		if (type.readOnly === !0 || type.hidden === !0) return [];
		let title = type.title ?? field.name;
		return isFreeText(type) ? [{
			name: field.name,
			title,
			kind: "text"
		}] : type.jsonType === "array" && type.of.length > 0 && type.of.every(isFreeText) && !type.options?.list ? [{
			name: field.name,
			title,
			kind: "list"
		}] : [];
	});
}
function isEmptyValue(value) {
	return value == null ? !0 : typeof value == "string" ? value.trim() === "" : Array.isArray(value) && value.length === 0;
}
/** A field named like the output and still empty. One with content is left for the editor. */
function defaultSummaryTargets(rows, fields, document) {
	let targets = {};
	for (let row of rows) {
		let field = fields.find((entry) => entry.name === row.key && entry.kind === row.kind);
		field && isEmptyValue(document[field.name]) && (targets[row.key] = field.name);
	}
	return targets;
}
/** Points `key` at `fieldName`, taking it from any other output so no field is written twice. */
function pickSummaryTarget(targets, key, fieldName) {
	let next = {};
	for (let [otherKey, otherField] of Object.entries(targets)) otherKey !== key && otherField !== fieldName && (next[otherKey] = otherField);
	return fieldName && (next[key] = fieldName), next;
}
/** The values to set on the document, by field name. */
function summaryFieldValues(rows, targets) {
	let values = {};
	for (let row of rows) {
		let fieldName = targets[row.key];
		fieldName && (values[fieldName] = row.value);
	}
	return values;
}
function formatSeconds(seconds) {
	if (typeof seconds != "number" || Number.isNaN(seconds)) return "";
	let hrs = ~~(seconds / 3600), mins = ~~(seconds % 3600 / 60), secs = ~~seconds % 60, ret = "";
	return hrs > 0 && (ret += "" + hrs + ":" + (mins < 10 ? "0" : "")), ret += "" + mins + ":" + (secs < 10 ? "0" : ""), ret += "" + secs, ret;
}
function formatSecondsToHHMMSS(seconds) {
	return `${Math.floor(seconds / 3600).toString().padStart(2, "0")}:${Math.floor(seconds % 3600 / 60).toString().padStart(2, "0")}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
}
function isValidTimeFormat(time) {
	return /^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/.test(time) || time === "";
}
function getSecondsFromTimeFormat(time) {
	let [hh = 0, mm = 0, ss = 0] = time.split(":").map(Number);
	return hh * 3600 + mm * 60 + ss;
}
/** Robots timestamps are Unix seconds. */
function formatTimestamp(seconds) {
	return seconds ? (/* @__PURE__ */ new Date(seconds * 1e3)).toLocaleString() : "—";
}
function formatTimeOfDay(seconds) {
	return (/* @__PURE__ */ new Date(seconds * 1e3)).toLocaleTimeString();
}
function formatOffset(seconds) {
	return typeof seconds == "number" ? formatSeconds(seconds) : "—";
}
function formatOffsetMs(ms) {
	return typeof ms == "number" ? formatSeconds(ms / 1e3) : "—";
}
/** A model's 0–1 score, at the two decimals Mux reports. */
function formatScore(score) {
	return typeof score == "number" ? score.toFixed(2) : "—";
}
function formatText(value) {
	return value == null || value === "" ? "—" : String(value);
}
function asRows(value) {
	return Array.isArray(value) ? value.filter((row) => !!row && typeof row == "object") : [];
}
function asStrings(value) {
	return Array.isArray(value) ? value.filter((entry) => typeof entry == "string") : [];
}
/** What a directive run's step says beside its status. */
function nodeStateDetail(node) {
	return node.reason ? node.reason : node.source_workflows?.length ? `Waiting on ${node.source_workflows.map(workflowLabel).join(", ")}` : node.status === "waiting_for_resources" ? "Waiting for a resource, such as captions" : node.status === "dispatched" ? "Dispatched" : "—";
}
/** How many steps a run has, before Mux has listed any. */
function stepCountLabel(count) {
	return count === 0 ? "No steps yet" : count === 1 ? "1 step" : `${count} steps`;
}
/** A run status that needs words beside its badge. */
function runStatusNote(status) {
	if (status === "partial") return "Some workflows finished and others failed.";
	if (status === "waiting") return "Waiting for something this video doesn’t have yet, such as a caption track. The run goes on once it’s there.";
}
/**
* A button that says why it's disabled. A disabled button gets no hover events, so the tooltip
* sits on a wrapper and the button lets the pointer through to it.
*/
function RobotsReasonButton(t0) {
	let $ = c(19), disabledReason, props, style;
	if ($[0] === t0 ? (disabledReason = $[1], props = $[2], style = $[3]) : ({disabledReason, style, ...props} = t0, $[0] = t0, $[1] = disabledReason, $[2] = props, $[3] = style), !disabledReason) {
		let t1;
		return $[4] !== props || $[5] !== style ? (t1 = /* @__PURE__ */ jsx(Button, {
			...props,
			style
		}), $[4] = props, $[5] = style, $[6] = t1) : t1 = $[6], t1;
	}
	let t1;
	$[7] === Symbol.for("react.memo_cache_sentinel") ? (t1 = { maxWidth: "20rem" }, $[7] = t1) : t1 = $[7];
	let t2;
	$[8] === disabledReason ? t2 = $[9] : (t2 = /* @__PURE__ */ jsx(Box, {
		padding: 2,
		style: t1,
		children: /* @__PURE__ */ jsx(Text, {
			size: 1,
			children: disabledReason
		})
	}), $[8] = disabledReason, $[9] = t2);
	let t3;
	$[10] === Symbol.for("react.memo_cache_sentinel") ? (t3 = { display: "inline-flex" }, $[10] = t3) : t3 = $[10];
	let t4;
	$[11] === style ? t4 = $[12] : (t4 = {
		...style,
		pointerEvents: "none"
	}, $[11] = style, $[12] = t4);
	let t5;
	$[13] !== props || $[14] !== t4 ? (t5 = /* @__PURE__ */ jsx("span", {
		style: t3,
		children: /* @__PURE__ */ jsx(Button, {
			...props,
			disabled: !0,
			style: t4
		})
	}), $[13] = props, $[14] = t4, $[15] = t5) : t5 = $[15];
	let t6;
	return $[16] !== t2 || $[17] !== t5 ? (t6 = /* @__PURE__ */ jsx(Tooltip, {
		animate: !0,
		portal: !0,
		content: t2,
		children: t5
	}), $[16] = t2, $[17] = t5, $[18] = t6) : t6 = $[18], t6;
}
const COLUMNS = { gridTemplateColumns: "6rem minmax(9rem, 1fr) minmax(0, 1fr) minmax(0, 1fr)" };
function formatValue(value) {
	return Array.isArray(value) ? value.join(", ") : typeof value == "string" ? value : JSON.stringify(value);
}
function CurrentValue(t0) {
	let $ = c(14), { row, targets, target } = t0, fieldName = targets[row.key];
	if (fieldName) {
		let value = target.document[fieldName], t1;
		return $[0] === value ? t1 = $[1] : (t1 = isEmptyValue(value) ? /* @__PURE__ */ jsx(Text, {
			size: 1,
			muted: !0,
			children: "Empty"
		}) : /* @__PURE__ */ jsx(Text, {
			size: 1,
			children: formatValue(value)
		}), $[0] = value, $[1] = t1), t1;
	}
	let t1;
	if ($[2] !== row.key || $[3] !== row.kind || $[4] !== target.fields) {
		let t2;
		$[6] !== row.key || $[7] !== row.kind ? (t2 = (field) => field.name === row.key && field.kind === row.kind, $[6] = row.key, $[7] = row.kind, $[8] = t2) : t2 = $[8], t1 = target.fields.find(t2), $[2] = row.key, $[3] = row.kind, $[4] = target.fields, $[5] = t1;
	} else t1 = $[5];
	let namesake = t1, t2;
	$[9] !== namesake || $[10] !== target.document ? (t2 = namesake && !isEmptyValue(target.document[namesake.name]) ? `${namesake.title} already has content. Pick it to replace it.` : "—", $[9] = namesake, $[10] = target.document, $[11] = t2) : t2 = $[11];
	let t3;
	return $[12] === t2 ? t3 = $[13] : (t3 = /* @__PURE__ */ jsx(Text, {
		size: 1,
		muted: !0,
		children: t2
	}), $[12] = t2, $[13] = t3), t3;
}
/** Copies the stored summary into fields of the document this video is in, after a preview. */
function RobotsApplySummaryDialog(t0) {
	let $ = c(51), { summary, target, onClose } = t0, id = useId(), toast = useToast(), t1;
	$[0] === summary ? t1 = $[1] : (t1 = summaryOutputRows(summary), $[0] = summary, $[1] = t1);
	let rows = t1, t2;
	$[2] !== rows || $[3] !== target.document || $[4] !== target.fields ? (t2 = () => defaultSummaryTargets(rows, target.fields, target.document), $[2] = rows, $[3] = target.document, $[4] = target.fields, $[5] = t2) : t2 = $[5];
	let [targets, setTargets] = useState(t2), t3;
	$[6] !== rows || $[7] !== targets ? (t3 = summaryFieldValues(rows, targets), $[6] = rows, $[7] = targets, $[8] = t3) : t3 = $[8];
	let values = t3, t4;
	$[9] === values ? t4 = $[10] : (t4 = Object.keys(values), $[9] = values, $[10] = t4);
	let count = t4.length, t5;
	$[11] !== count || $[12] !== onClose || $[13] !== target || $[14] !== toast || $[15] !== values ? (t5 = () => {
		target.apply(values), toast.push({
			status: "success",
			title: count === 1 ? "Applied 1 field" : `Applied ${count} fields`,
			...target.isDraft && { description: "Publish the document to make it live." }
		}), onClose();
	}, $[11] = count, $[12] = onClose, $[13] = target, $[14] = toast, $[15] = values, $[16] = t5) : t5 = $[16];
	let apply = t5, t6 = `robots-apply-summary${id}`, t7;
	$[17] === onClose ? t7 = $[18] : (t7 = /* @__PURE__ */ jsx(Button, {
		text: "Cancel",
		mode: "bleed",
		onClick: onClose
	}), $[17] = onClose, $[18] = t7);
	let t8 = count > 0 ? `Apply ${count}` : "Apply", t9 = target.disabledReason ?? (count === 0 ? "Pick a field for at least one output." : void 0), t10;
	$[19] !== apply || $[20] !== t8 || $[21] !== t9 ? (t10 = /* @__PURE__ */ jsx(RobotsReasonButton, {
		text: t8,
		tone: "positive",
		disabledReason: t9,
		onClick: apply
	}), $[19] = apply, $[20] = t8, $[21] = t9, $[22] = t10) : t10 = $[22];
	let t11;
	$[23] !== t10 || $[24] !== t7 ? (t11 = /* @__PURE__ */ jsxs(Flex, {
		justify: "flex-end",
		gap: 2,
		padding: 3,
		children: [t7, t10]
	}), $[23] = t10, $[24] = t7, $[25] = t11) : t11 = $[25];
	let t12 = target.isDraft ? ", and the change stays a draft until you publish." : ".", t13;
	$[26] === t12 ? t13 = $[27] : (t13 = /* @__PURE__ */ jsxs(Text, {
		size: 1,
		children: ["Pick a field for each output, or leave it on Do not apply. Nothing is sent to Mux: these are this document’s own fields", t12]
	}), $[26] = t12, $[27] = t13);
	let t14;
	$[28] === Symbol.for("react.memo_cache_sentinel") ? (t14 = [
		"Output",
		"Field",
		"Current value",
		"New value"
	].map(_temp$12), $[28] = t14) : t14 = $[28];
	let t15;
	if ($[29] !== id || $[30] !== rows || $[31] !== target || $[32] !== targets) {
		let t16;
		$[34] !== id || $[35] !== target || $[36] !== targets ? (t16 = (row) => {
			let selectId = `robots-apply-${row.key}${id}`, fields = target.fields.filter((field) => field.kind === row.kind);
			return [
				/* @__PURE__ */ jsx(Text, {
					size: 1,
					as: "label",
					htmlFor: selectId,
					children: row.label
				}, `${row.key}-label`),
				/* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsxs(Select, {
					id: selectId,
					fontSize: 1,
					value: targets[row.key] ?? "",
					onChange: (event) => setTargets(pickSummaryTarget(targets, row.key, event.currentTarget.value || void 0)),
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: "Do not apply"
					}), fields.map(_temp2$9)]
				}) }, `${row.key}-field`),
				/* @__PURE__ */ jsx(CurrentValue, {
					row,
					targets,
					target
				}, `${row.key}-current`),
				/* @__PURE__ */ jsx(Text, {
					size: 1,
					children: formatValue(row.value)
				}, `${row.key}-new`)
			];
		}, $[34] = id, $[35] = target, $[36] = targets, $[37] = t16) : t16 = $[37], t15 = rows.map(t16), $[29] = id, $[30] = rows, $[31] = target, $[32] = targets, $[33] = t15;
	} else t15 = $[33];
	let t16;
	$[38] === t15 ? t16 = $[39] : (t16 = /* @__PURE__ */ jsx(Card, {
		radius: 2,
		border: !0,
		children: /* @__PURE__ */ jsxs(Grid, {
			gap: 3,
			padding: 3,
			style: COLUMNS,
			children: [t14, t15]
		})
	}), $[38] = t15, $[39] = t16);
	let t17;
	$[40] === target.fields.length ? t17 = $[41] : (t17 = target.fields.length === 0 && /* @__PURE__ */ jsx(Text, {
		size: 1,
		muted: !0,
		children: "This document has no text or tag fields the summary can go in."
	}), $[40] = target.fields.length, $[41] = t17);
	let t18;
	$[42] !== t13 || $[43] !== t16 || $[44] !== t17 ? (t18 = /* @__PURE__ */ jsxs(Stack, {
		gap: 4,
		padding: 4,
		children: [
			t13,
			t16,
			t17
		]
	}), $[42] = t13, $[43] = t16, $[44] = t17, $[45] = t18) : t18 = $[45];
	let t19;
	return $[46] !== onClose || $[47] !== t11 || $[48] !== t18 || $[49] !== t6 ? (t19 = /* @__PURE__ */ jsx(Dialog, {
		id: t6,
		header: "Apply summary to this document",
		onClose,
		zOffset: DIALOGS_Z_INDEX,
		width: 2,
		footer: t11,
		children: t18
	}), $[46] = onClose, $[47] = t11, $[48] = t18, $[49] = t6, $[50] = t19) : t19 = $[50], t19;
}
function _temp2$9(field_0) {
	return /* @__PURE__ */ jsx("option", {
		value: field_0.name,
		children: field_0.title
	}, field_0.name);
}
function _temp$12(heading) {
	return /* @__PURE__ */ jsx(Text, {
		size: 1,
		weight: "medium",
		muted: !0,
		children: heading
	}, heading);
}
const COPY = {
	"scope-missing": {
		tone: "caution",
		title: "This Mux token can’t use Robots",
		body: () => /* @__PURE__ */ jsxs(Fragment, { children: [
			"The ",
			/* @__PURE__ */ jsx("code", { children: "robots:*" }),
			" scope can’t be added to an existing token, so this needs a new access token. Create one with the ",
			/* @__PURE__ */ jsx("code", { children: "robots:*" }),
			" scope in",
			" ",
			/* @__PURE__ */ jsx("a", {
				href: "https://dashboard.mux.com/settings/access-tokens",
				target: "_blank",
				rel: "noopener noreferrer",
				children: "your Mux dashboard"
			}),
			" ",
			"and paste it into the plugin’s Configure API dialog."
		] })
	},
	"not-enabled": {
		tone: "primary",
		title: "Robots isn’t enabled for this Mux account",
		body: (termsUrl) => /* @__PURE__ */ jsxs(Fragment, { children: [
			"Robots runs AI workflows (captions, dubs, summaries, chapters, moderation) on your Mux videos, and Mux turns it on once its terms are accepted.",
			" ",
			/* @__PURE__ */ jsx("a", {
				href: termsUrl,
				target: "_blank",
				rel: "noopener noreferrer",
				children: "Accept the Robots terms in your Mux dashboard"
			}),
			"."
		] })
	},
	unavailable: {
		tone: "transparent",
		title: "Robots isn’t available in this Studio yet",
		body: () => /* @__PURE__ */ jsx(Fragment, { children: "It will appear once Sanity’s Mux service is updated." })
	},
	"units-exhausted": {
		tone: "caution",
		title: "Not enough Mux AI units left this month",
		body: () => /* @__PURE__ */ jsxs(Fragment, { children: [
			"Mux refused the last run. Every Mux account gets 100,000 Mux AI units a month at no cost, and this one doesn’t have enough left for it. A cheaper workflow may still fit. Units reset next month, or sooner on a paid plan.",
			" ",
			/* @__PURE__ */ jsx("a", {
				href: ROBOTS_PRICING_URL,
				target: "_blank",
				rel: "noopener noreferrer",
				children: "See Robots pricing"
			}),
			"."
		] })
	}
};
/** Why Robots can't run here (in place of the panel), or a limit it hit (above it). */
function RobotsCapabilityCard(t0) {
	let $ = c(17), { state, termsUrl, onCheckAgain, isChecking } = t0, copy = COPY[state], t1 = copy.tone, t2;
	$[0] === copy.title ? t2 = $[1] : (t2 = /* @__PURE__ */ jsx(Text, {
		size: 1,
		weight: "semibold",
		children: copy.title
	}), $[0] = copy.title, $[1] = t2);
	let t3;
	$[2] !== copy || $[3] !== termsUrl ? (t3 = copy.body(termsUrl ?? "https://dashboard.mux.com"), $[2] = copy, $[3] = termsUrl, $[4] = t3) : t3 = $[4];
	let t4;
	$[5] === t3 ? t4 = $[6] : (t4 = /* @__PURE__ */ jsx(Text, {
		size: 1,
		children: t3
	}), $[5] = t3, $[6] = t4);
	let t5;
	$[7] !== isChecking || $[8] !== onCheckAgain ? (t5 = onCheckAgain && /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Button, {
		text: "Check again",
		mode: "ghost",
		fontSize: 1,
		padding: 2,
		loading: isChecking,
		onClick: onCheckAgain
	}) }), $[7] = isChecking, $[8] = onCheckAgain, $[9] = t5) : t5 = $[9];
	let t6;
	$[10] !== t2 || $[11] !== t4 || $[12] !== t5 ? (t6 = /* @__PURE__ */ jsxs(Stack, {
		gap: 3,
		children: [
			t2,
			t4,
			t5
		]
	}), $[10] = t2, $[11] = t4, $[12] = t5, $[13] = t6) : t6 = $[13];
	let t7;
	return $[14] !== copy.tone || $[15] !== t6 ? (t7 = /* @__PURE__ */ jsx(Card, {
		padding: 3,
		radius: 2,
		tone: t1,
		border: !0,
		children: t6
	}), $[14] = copy.tone, $[15] = t6, $[16] = t7) : t7 = $[16], t7;
}
function RobotsNote(t0) {
	let $ = c(8), { tone: t1, children, action } = t0, tone = t1 === void 0 ? "transparent" : t1, t2;
	$[0] === children ? t2 = $[1] : (t2 = /* @__PURE__ */ jsx(Text, {
		size: 1,
		children
	}), $[0] = children, $[1] = t2);
	let t3;
	$[2] !== action || $[3] !== t2 ? (t3 = /* @__PURE__ */ jsxs(Stack, {
		gap: 3,
		children: [t2, action]
	}), $[2] = action, $[3] = t2, $[4] = t3) : t3 = $[4];
	let t4;
	return $[5] !== t3 || $[6] !== tone ? (t4 = /* @__PURE__ */ jsx(Card, {
		padding: 3,
		radius: 2,
		tone,
		border: !0,
		children: t3
	}), $[5] = t3, $[6] = tone, $[7] = t4) : t4 = $[7], t4;
}
/** One table for all four kinds, so equivalent states share a tone. */
const TONES = {
	job: {
		pending: "default",
		processing: "primary",
		completed: "positive",
		errored: "critical",
		cancelled: "default"
	},
	run: {
		pending: "default",
		dispatching: "primary",
		running: "primary",
		waiting: "default",
		completed: "positive",
		partial: "caution",
		errored: "critical"
	},
	node: {
		dispatched: "primary",
		failed: "critical",
		waiting_for_resources: "default",
		waiting_for_source_workflow: "default"
	},
	create: {
		starting: "primary",
		unconfirmed: "caution"
	}
}, CREATE_LABELS = {
	starting: "Starting…",
	unconfirmed: "Not confirmed"
};
function RobotsStatusBadge(t0) {
	let $ = c(6), { kind, status } = t0, value = status ?? (kind === "run" ? "pending" : "unknown"), t1;
	$[0] !== kind || $[1] !== value ? (t1 = kind === "create" ? CREATE_LABELS[value] ?? value : value.replaceAll("_", " "), $[0] = kind, $[1] = value, $[2] = t1) : t1 = $[2];
	let label = t1, t2 = TONES[kind][value] ?? "default", t3;
	return $[3] !== label || $[4] !== t2 ? (t3 = /* @__PURE__ */ jsx(Badge, {
		tone: t2,
		fontSize: 1,
		padding: 2,
		children: label
	}), $[3] = label, $[4] = t2, $[5] = t3) : t3 = $[5], t3;
}
function NodeStates(t0) {
	let $ = c(9), { nodeStates, jobsById, onViewJob } = t0, t1;
	if ($[0] !== jobsById || $[1] !== nodeStates || $[2] !== onViewJob) {
		let t2;
		$[4] !== jobsById || $[5] !== onViewJob ? (t2 = (node, index) => {
			let job = node.job_id ? jobsById.get(node.job_id) : void 0;
			return /* @__PURE__ */ jsxs(Flex, {
				align: "center",
				gap: 3,
				wrap: "wrap",
				children: [/* @__PURE__ */ jsx(Box, {
					flex: 1,
					style: { minWidth: "8rem" },
					children: /* @__PURE__ */ jsx(Text, {
						size: 1,
						children: node.workflow_name ? workflowLabel(node.workflow_name) : node.reference_id ?? `Step ${index + 1}`
					})
				}), job ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(RobotsStatusBadge, {
					kind: "job",
					status: job.status
				}), /* @__PURE__ */ jsx(Button, {
					text: "View job",
					mode: "bleed",
					fontSize: 1,
					padding: 2,
					onClick: () => onViewJob(job.id)
				})] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(RobotsStatusBadge, {
					kind: "node",
					status: node.status
				}), /* @__PURE__ */ jsx(Text, {
					size: 1,
					muted: !0,
					children: nodeStateDetail(node)
				})] })]
			}, node.job_id ?? node.reference_id ?? index);
		}, $[4] = jobsById, $[5] = onViewJob, $[6] = t2) : t2 = $[6], t1 = nodeStates.map(t2), $[0] = jobsById, $[1] = nodeStates, $[2] = onViewJob, $[3] = t1;
	} else t1 = $[3];
	let t2;
	return $[7] === t1 ? t2 = $[8] : (t2 = /* @__PURE__ */ jsx(Stack, {
		gap: 2,
		children: t1
	}), $[7] = t1, $[8] = t2), t2;
}
function RunRow(t0) {
	let $ = c(40), { run, name, jobsById, onViewJob } = t0, [isExpanded, setIsExpanded] = useState(!1), t1;
	$[0] === run.node_states ? t1 = $[1] : (t1 = run.node_states ?? [], $[0] = run.node_states, $[1] = t1);
	let nodeStates = t1, t2;
	$[2] === Symbol.for("react.memo_cache_sentinel") ? (t2 = { minWidth: "10rem" }, $[2] = t2) : t2 = $[2];
	let t3;
	$[3] === Symbol.for("react.memo_cache_sentinel") ? (t3 = { wordBreak: "break-word" }, $[3] = t3) : t3 = $[3];
	let t4;
	$[4] === name ? t4 = $[5] : (t4 = /* @__PURE__ */ jsx(Text, {
		size: 1,
		weight: "semibold",
		style: t3,
		children: name
	}), $[4] = name, $[5] = t4);
	let t5;
	$[6] === run.started_at ? t5 = $[7] : (t5 = formatTimestamp(run.started_at), $[6] = run.started_at, $[7] = t5);
	let t6;
	$[8] === nodeStates.length ? t6 = $[9] : (t6 = stepCountLabel(nodeStates.length), $[8] = nodeStates.length, $[9] = t6);
	let t7;
	$[10] !== t5 || $[11] !== t6 ? (t7 = /* @__PURE__ */ jsxs(Text, {
		size: 1,
		muted: !0,
		children: [
			t5,
			" · ",
			t6
		]
	}), $[10] = t5, $[11] = t6, $[12] = t7) : t7 = $[12];
	let t8;
	$[13] !== t4 || $[14] !== t7 ? (t8 = /* @__PURE__ */ jsxs(Stack, {
		gap: 2,
		flex: 1,
		style: t2,
		children: [t4, t7]
	}), $[13] = t4, $[14] = t7, $[15] = t8) : t8 = $[15];
	let t9;
	$[16] === run.status ? t9 = $[17] : (t9 = /* @__PURE__ */ jsx(RobotsStatusBadge, {
		kind: "run",
		status: run.status
	}), $[16] = run.status, $[17] = t9);
	let t10 = isExpanded ? ChevronUpIcon : ChevronDownIcon, t11 = isExpanded ? "Hide steps" : "Show steps", t12 = nodeStates.length === 0, t13;
	$[18] === isExpanded ? t13 = $[19] : (t13 = () => setIsExpanded(!isExpanded), $[18] = isExpanded, $[19] = t13);
	let t14;
	$[20] !== t10 || $[21] !== t11 || $[22] !== t12 || $[23] !== t13 ? (t14 = /* @__PURE__ */ jsx(Button, {
		icon: t10,
		mode: "bleed",
		padding: 2,
		"aria-label": t11,
		disabled: t12,
		onClick: t13
	}), $[20] = t10, $[21] = t11, $[22] = t12, $[23] = t13, $[24] = t14) : t14 = $[24];
	let t15;
	$[25] !== t14 || $[26] !== t8 || $[27] !== t9 ? (t15 = /* @__PURE__ */ jsxs(Flex, {
		align: "center",
		gap: 3,
		wrap: "wrap",
		children: [
			t8,
			t9,
			t14
		]
	}), $[25] = t14, $[26] = t8, $[27] = t9, $[28] = t15) : t15 = $[28];
	let t16;
	$[29] === run.status ? t16 = $[30] : (t16 = runStatusNote(run.status) && /* @__PURE__ */ jsx(Text, {
		size: 1,
		muted: !0,
		children: runStatusNote(run.status)
	}), $[29] = run.status, $[30] = t16);
	let t17;
	$[31] !== isExpanded || $[32] !== jobsById || $[33] !== nodeStates || $[34] !== onViewJob ? (t17 = isExpanded && /* @__PURE__ */ jsx(NodeStates, {
		nodeStates,
		jobsById,
		onViewJob
	}), $[31] = isExpanded, $[32] = jobsById, $[33] = nodeStates, $[34] = onViewJob, $[35] = t17) : t17 = $[35];
	let t18;
	return $[36] !== t15 || $[37] !== t16 || $[38] !== t17 ? (t18 = /* @__PURE__ */ jsx(Card, {
		padding: 3,
		radius: 2,
		border: !0,
		children: /* @__PURE__ */ jsxs(Stack, {
			gap: 3,
			children: [
				t15,
				t16,
				t17
			]
		})
	}), $[36] = t15, $[37] = t16, $[38] = t17, $[39] = t18) : t18 = $[39], t18;
}
function RobotsDirectiveRunTable(t0) {
	let $ = c(24), { runs, pendingRows, directiveNames, pointsToNote, isLoading, jobsById, onViewJob } = t0, T0, t1, t2, t3;
	if ($[0] !== directiveNames || $[1] !== isLoading || $[2] !== jobsById || $[3] !== onViewJob || $[4] !== pendingRows || $[5] !== pointsToNote || $[6] !== runs) {
		t3 = Symbol.for("react.early_return_sentinel");
		bb0: {
			let rows = runTableRows(pendingRows, runs), t4;
			$[11] === directiveNames ? t4 = $[12] : (t4 = (directiveId) => directiveNames[directiveId ?? ""] ?? directiveId ?? "—", $[11] = directiveNames, $[12] = t4);
			let nameOf = t4;
			if (rows.length === 0) {
				let t5 = isLoading ? "Loading directive runs…" : "No directive runs for this video yet.", t6;
				$[13] === t5 ? t6 = $[14] : (t6 = /* @__PURE__ */ jsx(RobotsNote, { children: t5 }), $[13] = t5, $[14] = t6), t3 = t6;
				break bb0;
			}
			T0 = Stack, t1 = 2;
			let t5;
			$[15] !== jobsById || $[16] !== nameOf || $[17] !== onViewJob || $[18] !== pointsToNote ? (t5 = (row) => row.pending ? /* @__PURE__ */ jsx(Card, {
				padding: 3,
				radius: 2,
				border: !0,
				tone: "transparent",
				children: /* @__PURE__ */ jsxs(Flex, {
					align: "center",
					gap: 3,
					wrap: "wrap",
					children: [
						/* @__PURE__ */ jsxs(Stack, {
							gap: 2,
							flex: 1,
							style: { minWidth: "10rem" },
							children: [/* @__PURE__ */ jsx(Text, {
								size: 1,
								weight: "semibold",
								style: { wordBreak: "break-word" },
								children: nameOf(row.pending.pending.directiveId)
							}), /* @__PURE__ */ jsxs(Text, {
								size: 1,
								muted: !0,
								children: ["Requested ", formatTimestamp(row.pending.pending.requestedAt)]
							})]
						}),
						/* @__PURE__ */ jsx(RobotsStatusBadge, {
							kind: "create",
							status: row.pending.phase
						}),
						/* @__PURE__ */ jsx(Text, {
							size: 1,
							muted: !0,
							children: row.pending.phase === "unconfirmed" && pointsToNote ? "See the note above" : "Waiting for Mux"
						})
					]
				})
			}, row.key) : /* @__PURE__ */ jsx(RunRow, {
				run: row.item,
				name: nameOf(row.item.directive_id),
				jobsById,
				onViewJob
			}, row.key), $[15] = jobsById, $[16] = nameOf, $[17] = onViewJob, $[18] = pointsToNote, $[19] = t5) : t5 = $[19], t2 = rows.map(t5);
		}
		$[0] = directiveNames, $[1] = isLoading, $[2] = jobsById, $[3] = onViewJob, $[4] = pendingRows, $[5] = pointsToNote, $[6] = runs, $[7] = T0, $[8] = t1, $[9] = t2, $[10] = t3;
	} else T0 = $[7], t1 = $[8], t2 = $[9], t3 = $[10];
	if (t3 !== Symbol.for("react.early_return_sentinel")) return t3;
	let t4;
	return $[20] !== T0 || $[21] !== t1 || $[22] !== t2 ? (t4 = /* @__PURE__ */ jsx(T0, {
		gap: t1,
		children: t2
	}), $[20] = T0, $[21] = t1, $[22] = t2, $[23] = t4) : t4 = $[23], t4;
}
const NO_NAMES = {};
function unconfirmedText(rows, directiveNames) {
	let [only] = rows, isDirective = only?.pending.kind === "directive-run", refusal = isDirective ? "Mux refuses another run of that directive on this video while one is going." : "Mux refuses an identical run while one is going.";
	return !only || rows.length > 1 ? `Mux hasn’t confirmed ${rows.length} ${isDirective ? "directive runs" : "runs"} on this video. They may already be running and billing, so nothing was retried. ${refusal}` : `Mux hasn’t confirmed ${isDirective ? `the run of ${directiveNames[only.pending.directiveId ?? ""] ?? only.pending.directiveId}` : `the ${workflowLabel(only.pending.workflow ?? "")} run`}, requested at ${formatTimeOfDay(only.pending.requestedAt)}. It may already be running and billing, so nothing was retried. ${refusal}`;
}
/** The note the Not confirmed rows point to. Its button clears exactly those rows. */
function RobotsUnconfirmedNote(t0) {
	let $ = c(8), { rows, directiveNames: t1, onClear } = t0, directiveNames = t1 === void 0 ? NO_NAMES : t1;
	if (rows.length === 0) return null;
	let t2;
	$[0] === onClear ? t2 = $[1] : (t2 = /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Button, {
		text: "Nothing is running — let me try again",
		mode: "ghost",
		fontSize: 1,
		padding: 2,
		onClick: onClear
	}) }), $[0] = onClear, $[1] = t2);
	let t3;
	$[2] !== directiveNames || $[3] !== rows ? (t3 = unconfirmedText(rows, directiveNames), $[2] = directiveNames, $[3] = rows, $[4] = t3) : t3 = $[4];
	let t4;
	return $[5] !== t2 || $[6] !== t3 ? (t4 = /* @__PURE__ */ jsx(RobotsNote, {
		tone: "caution",
		action: t2,
		children: t3
	}), $[5] = t2, $[6] = t3, $[7] = t4) : t4 = $[7], t4;
}
function directivePrompt(listing, available) {
	return listing.status === "pending" ? "Loading directives…" : available.length > 0 ? "Select a directive" : listing.status === "loaded" ? "No directives in this Mux account" : "Could not list directives";
}
function RobotsDirectivesSection(t0) {
	let $ = c(31), { canRun, listing, configuredIds, directiveNames, runs, pendingRows, unconfirmedRows, isLoading, runDisabledReason, jobsById, onRun, onClearUnconfirmed, onViewJob } = t0, id = useId(), [selectedId, setSelectedId] = useState(""), t1;
	$[0] !== configuredIds || $[1] !== listing.directives || $[2] !== listing.status ? (t1 = listing.status === "loaded" ? listing.directives : listing.status === "failed" ? configuredIds.map(_temp$11) : [], $[0] = configuredIds, $[1] = listing.directives, $[2] = listing.status, $[3] = t1) : t1 = $[3];
	let available = t1, t2;
	$[4] !== available || $[5] !== selectedId ? (t2 = available.some((directive) => directive.id === selectedId) ? selectedId : "", $[4] = available, $[5] = selectedId, $[6] = t2) : t2 = $[6];
	let chosenId = t2, t3;
	$[7] === Symbol.for("react.memo_cache_sentinel") ? (t3 = /* @__PURE__ */ jsx(Text, {
		size: 1,
		weight: "semibold",
		children: "Directives"
	}), $[7] = t3) : t3 = $[7];
	let t4;
	$[8] === Symbol.for("react.memo_cache_sentinel") ? (t4 = /* @__PURE__ */ jsxs(Stack, {
		gap: 2,
		children: [t3, /* @__PURE__ */ jsxs(Text, {
			size: 1,
			muted: !0,
			children: [
				"A directive runs several workflows in order.",
				" ",
				/* @__PURE__ */ jsx("a", {
					href: "https://www.mux.com/docs/guides/robots-directives",
					target: "_blank",
					rel: "noopener noreferrer",
					children: "Author them in Mux"
				}),
				"."
			]
		})]
	}), $[8] = t4) : t4 = $[8];
	let t5;
	$[9] !== available || $[10] !== canRun || $[11] !== chosenId || $[12] !== directiveNames || $[13] !== id || $[14] !== listing || $[15] !== onClearUnconfirmed || $[16] !== onRun || $[17] !== runDisabledReason || $[18] !== unconfirmedRows ? (t5 = canRun && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Flex, {
		gap: 2,
		align: "center",
		wrap: "wrap",
		children: [/* @__PURE__ */ jsx(Box, {
			flex: 1,
			style: { minWidth: "12rem" },
			children: /* @__PURE__ */ jsxs(Select, {
				id: `robots-directive${id}`,
				"aria-label": "Directive",
				value: chosenId,
				disabled: available.length === 0,
				onChange: (event) => setSelectedId(event.currentTarget.value),
				children: [/* @__PURE__ */ jsx("option", {
					value: "",
					children: directivePrompt(listing, available)
				}), available.map(_temp2$8)]
			})
		}), /* @__PURE__ */ jsx(RobotsReasonButton, {
			icon: PlayIcon,
			text: "Run directive",
			mode: "ghost",
			disabledReason: runDisabledReason ?? (chosenId ? void 0 : "Pick a directive first."),
			onClick: () => onRun(chosenId)
		})]
	}), /* @__PURE__ */ jsx(RobotsUnconfirmedNote, {
		rows: unconfirmedRows,
		directiveNames,
		onClear: onClearUnconfirmed
	})] }), $[9] = available, $[10] = canRun, $[11] = chosenId, $[12] = directiveNames, $[13] = id, $[14] = listing, $[15] = onClearUnconfirmed, $[16] = onRun, $[17] = runDisabledReason, $[18] = unconfirmedRows, $[19] = t5) : t5 = $[19];
	let t6;
	$[20] !== canRun || $[21] !== directiveNames || $[22] !== isLoading || $[23] !== jobsById || $[24] !== onViewJob || $[25] !== pendingRows || $[26] !== runs ? (t6 = /* @__PURE__ */ jsx(RobotsDirectiveRunTable, {
		runs,
		pendingRows,
		directiveNames,
		pointsToNote: canRun,
		isLoading,
		jobsById,
		onViewJob
	}), $[20] = canRun, $[21] = directiveNames, $[22] = isLoading, $[23] = jobsById, $[24] = onViewJob, $[25] = pendingRows, $[26] = runs, $[27] = t6) : t6 = $[27];
	let t7;
	return $[28] !== t5 || $[29] !== t6 ? (t7 = /* @__PURE__ */ jsxs(Stack, {
		gap: 3,
		children: [
			t4,
			t5,
			t6
		]
	}), $[28] = t5, $[29] = t6, $[30] = t7) : t7 = $[30], t7;
}
function _temp2$8(directive_0) {
	return /* @__PURE__ */ jsx("option", {
		value: directive_0.id,
		children: directive_0.name || directive_0.id
	}, directive_0.id);
}
function _temp$11(directiveId) {
	return { id: directiveId };
}
function detailStateOf(job, detailedJobIds, failedDetailIds) {
	return detailedJobIds.has(job.id) ? "loaded" : failedDetailIds.has(job.id) ? "unreadable" : "unread";
}
function JobRow(t0) {
	let $ = c(41), job, props, t1, units;
	$[0] === t0 ? (job = $[1], props = $[2], t1 = $[3], units = $[4]) : ({job, ...props} = t0, units = unitsCell(job, detailStateOf(job, props.detailedJobIds, props.failedDetailIds)), t1 = props.loadingDetailIds.has(job.id) || units.isLoadable && props.pendingDetailIds.has(job.id), $[0] = t0, $[1] = job, $[2] = props, $[3] = t1, $[4] = units);
	let isLoadingUnits = t1, isRunning = job.status === "pending" || job.status === "processing", t2;
	$[5] !== job || $[6] !== props ? (t2 = /* @__PURE__ */ jsx(Button, {
		text: "View output",
		mode: "ghost",
		fontSize: 1,
		padding: 2,
		onClick: () => props.onViewOutput(job)
	}), $[5] = job, $[6] = props, $[7] = t2) : t2 = $[7];
	let action = t2;
	if (isRunning) {
		let t3;
		$[8] !== job || $[9] !== props ? (t3 = props.onCancel ? /* @__PURE__ */ jsx(Button, {
			text: "Cancel",
			mode: "ghost",
			tone: "critical",
			fontSize: 1,
			padding: 2,
			loading: props.cancellingJobIds.has(job.id),
			onClick: () => props.onCancel?.(job)
		}) : /* @__PURE__ */ jsx(Text, {
			size: 1,
			muted: !0,
			children: "Output appears when it finishes"
		}), $[8] = job, $[9] = props, $[10] = t3) : t3 = $[10], action = t3;
	} else if (job.status === "cancelled") {
		let t3;
		$[11] === Symbol.for("react.memo_cache_sentinel") ? (t3 = /* @__PURE__ */ jsx(Text, {
			size: 1,
			muted: !0,
			children: "Cancelled before it produced output"
		}), $[11] = t3) : t3 = $[11], action = t3;
	}
	let t3;
	$[12] === Symbol.for("react.memo_cache_sentinel") ? (t3 = { minWidth: "10rem" }, $[12] = t3) : t3 = $[12];
	let t4;
	$[13] === job.workflow ? t4 = $[14] : (t4 = workflowLabel(job.workflow), $[13] = job.workflow, $[14] = t4);
	let t5;
	$[15] === t4 ? t5 = $[16] : (t5 = /* @__PURE__ */ jsx(Text, {
		size: 1,
		weight: "semibold",
		children: t4
	}), $[15] = t4, $[16] = t5);
	let t6;
	$[17] === job.created_at ? t6 = $[18] : (t6 = formatTimestamp(job.created_at), $[17] = job.created_at, $[18] = t6);
	let t7;
	$[19] === t6 ? t7 = $[20] : (t7 = /* @__PURE__ */ jsxs(Text, {
		size: 1,
		muted: !0,
		children: [t6, " · Mux AI units:"]
	}), $[19] = t6, $[20] = t7);
	let t8;
	$[21] !== isLoadingUnits || $[22] !== job || $[23] !== props || $[24] !== units.isLoadable || $[25] !== units.label ? (t8 = units.isLoadable ? /* @__PURE__ */ jsx(Button, {
		text: isLoadingUnits ? "Loading…" : units.label,
		mode: "bleed",
		tone: "primary",
		fontSize: 1,
		padding: 1,
		disabled: isLoadingUnits,
		onClick: () => props.onLoadDetail(job)
	}) : /* @__PURE__ */ jsx(Text, {
		size: 1,
		muted: !0,
		children: units.label
	}), $[21] = isLoadingUnits, $[22] = job, $[23] = props, $[24] = units.isLoadable, $[25] = units.label, $[26] = t8) : t8 = $[26];
	let t9;
	$[27] !== t7 || $[28] !== t8 ? (t9 = /* @__PURE__ */ jsxs(Flex, {
		align: "center",
		gap: 1,
		wrap: "wrap",
		children: [t7, t8]
	}), $[27] = t7, $[28] = t8, $[29] = t9) : t9 = $[29];
	let t10;
	$[30] !== t5 || $[31] !== t9 ? (t10 = /* @__PURE__ */ jsxs(Stack, {
		gap: 2,
		flex: 1,
		style: t3,
		children: [t5, t9]
	}), $[30] = t5, $[31] = t9, $[32] = t10) : t10 = $[32];
	let t11;
	$[33] === job.status ? t11 = $[34] : (t11 = /* @__PURE__ */ jsx(RobotsStatusBadge, {
		kind: "job",
		status: job.status
	}), $[33] = job.status, $[34] = t11);
	let t12;
	$[35] === action ? t12 = $[36] : (t12 = /* @__PURE__ */ jsx(Box, { children: action }), $[35] = action, $[36] = t12);
	let t13;
	return $[37] !== t10 || $[38] !== t11 || $[39] !== t12 ? (t13 = /* @__PURE__ */ jsx(Card, {
		padding: 3,
		radius: 2,
		border: !0,
		children: /* @__PURE__ */ jsxs(Flex, {
			align: "center",
			gap: 3,
			wrap: "wrap",
			children: [
				t10,
				t11,
				t12
			]
		})
	}), $[37] = t10, $[38] = t11, $[39] = t12, $[40] = t13) : t13 = $[40], t13;
}
function PendingRow(t0) {
	let $ = c(20), { row, pointsToNote } = t0, t1;
	$[0] === Symbol.for("react.memo_cache_sentinel") ? (t1 = { minWidth: "10rem" }, $[0] = t1) : t1 = $[0];
	let t2 = row.pending.workflow ?? "", t3;
	$[1] === t2 ? t3 = $[2] : (t3 = workflowLabel(t2), $[1] = t2, $[2] = t3);
	let t4;
	$[3] === t3 ? t4 = $[4] : (t4 = /* @__PURE__ */ jsx(Text, {
		size: 1,
		weight: "semibold",
		children: t3
	}), $[3] = t3, $[4] = t4);
	let t5;
	$[5] === row.pending.requestedAt ? t5 = $[6] : (t5 = formatTimestamp(row.pending.requestedAt), $[5] = row.pending.requestedAt, $[6] = t5);
	let t6;
	$[7] === t5 ? t6 = $[8] : (t6 = /* @__PURE__ */ jsxs(Text, {
		size: 1,
		muted: !0,
		children: ["Requested ", t5]
	}), $[7] = t5, $[8] = t6);
	let t7;
	$[9] !== t4 || $[10] !== t6 ? (t7 = /* @__PURE__ */ jsxs(Stack, {
		gap: 2,
		flex: 1,
		style: t1,
		children: [t4, t6]
	}), $[9] = t4, $[10] = t6, $[11] = t7) : t7 = $[11];
	let t8;
	$[12] === row.phase ? t8 = $[13] : (t8 = /* @__PURE__ */ jsx(RobotsStatusBadge, {
		kind: "create",
		status: row.phase
	}), $[12] = row.phase, $[13] = t8);
	let t9 = row.phase === "unconfirmed" && pointsToNote ? "See the note above" : "Waiting for Mux", t10;
	$[14] === t9 ? t10 = $[15] : (t10 = /* @__PURE__ */ jsx(Text, {
		size: 1,
		muted: !0,
		children: t9
	}), $[14] = t9, $[15] = t10);
	let t11;
	return $[16] !== t10 || $[17] !== t7 || $[18] !== t8 ? (t11 = /* @__PURE__ */ jsx(Card, {
		padding: 3,
		radius: 2,
		border: !0,
		tone: "transparent",
		children: /* @__PURE__ */ jsxs(Flex, {
			align: "center",
			gap: 3,
			wrap: "wrap",
			children: [
				t7,
				t8,
				t10
			]
		})
	}), $[16] = t10, $[17] = t7, $[18] = t8, $[19] = t11) : t11 = $[19], t11;
}
/** The jobs on this video, newest first, with the creates still waiting for Mux. */
function RobotsJobTable(props) {
	let $ = c(11);
	if (props.isLoading) {
		let t0;
		return $[0] === Symbol.for("react.memo_cache_sentinel") ? (t0 = /* @__PURE__ */ jsxs(Flex, {
			align: "center",
			gap: 2,
			padding: 3,
			children: [/* @__PURE__ */ jsx(Spinner, { muted: !0 }), /* @__PURE__ */ jsx(Text, {
				size: 1,
				muted: !0,
				children: "Loading Robots jobs…"
			})]
		}), $[0] = t0) : t0 = $[0], t0;
	}
	let T0, t0, t1, t2;
	if ($[1] !== props) {
		t2 = Symbol.for("react.early_return_sentinel");
		bb0: {
			let rows = jobTableRows(props.pendingRows, props.jobs);
			if (rows.length === 0) {
				let t3;
				$[6] === Symbol.for("react.memo_cache_sentinel") ? (t3 = /* @__PURE__ */ jsx(RobotsNote, { children: "No Robots jobs have run on this video yet." }), $[6] = t3) : t3 = $[6], t2 = t3;
				break bb0;
			}
			T0 = Stack, t0 = 2, t1 = rows.map((row) => row.pending ? /* @__PURE__ */ jsx(PendingRow, {
				row: row.pending,
				pointsToNote: props.pointsToNote
			}, row.key) : /* @__PURE__ */ jsx(JobRow, {
				job: row.item,
				...props
			}, row.key));
		}
		$[1] = props, $[2] = T0, $[3] = t0, $[4] = t1, $[5] = t2;
	} else T0 = $[2], t0 = $[3], t1 = $[4], t2 = $[5];
	if (t2 !== Symbol.for("react.early_return_sentinel")) return t2;
	let t3;
	return $[7] !== T0 || $[8] !== t0 || $[9] !== t1 ? (t3 = /* @__PURE__ */ jsx(T0, {
		gap: t0,
		children: t1
	}), $[7] = T0, $[8] = t0, $[9] = t1, $[10] = t3) : t3 = $[10], t3;
}
/** Copies `value`. With `text` it's a labelled button, without it an icon that names itself. */
function RobotsCopyButton(t0) {
	let $ = c(11), { value, label, text } = t0, t1;
	$[0] === value ? t1 = $[1] : (t1 = () => void navigator.clipboard?.writeText(value), $[0] = value, $[1] = t1);
	let t2;
	$[2] !== label || $[3] !== t1 || $[4] !== text ? (t2 = /* @__PURE__ */ jsx(Button, {
		icon: CopyIcon,
		text,
		"aria-label": label,
		mode: "bleed",
		fontSize: 1,
		padding: 2,
		onClick: t1
	}), $[2] = label, $[3] = t1, $[4] = text, $[5] = t2) : t2 = $[5];
	let button = t2;
	if (text) return button;
	let t3;
	$[6] === label ? t3 = $[7] : (t3 = /* @__PURE__ */ jsx(Box, {
		padding: 2,
		children: /* @__PURE__ */ jsx(Text, {
			size: 1,
			children: label
		})
	}), $[6] = label, $[7] = t3);
	let t4;
	return $[8] !== button || $[9] !== t3 ? (t4 = /* @__PURE__ */ jsx(Tooltip, {
		animate: !0,
		portal: !0,
		content: t3,
		children: button
	}), $[8] = button, $[9] = t3, $[10] = t4) : t4 = $[10], t4;
}
function prettyJson(value) {
	try {
		let text = JSON.stringify(value, null, 2);
		return typeof text == "string" && text.trim() !== "" ? text : void 0;
	} catch {
		return;
	}
}
function RobotsJsonBlock(t0) {
	let $ = c(12), { value, what } = t0, t1;
	$[0] === value ? t1 = $[1] : (t1 = prettyJson(value), $[0] = value, $[1] = t1);
	let text = t1;
	if (!text) {
		let t2;
		return $[2] === what ? t2 = $[3] : (t2 = /* @__PURE__ */ jsxs(RobotsNote, {
			tone: "caution",
			children: [
				"There’s nothing to show as JSON: ",
				what,
				" came back empty or couldn’t be read."
			]
		}), $[2] = what, $[3] = t2), t2;
	}
	let t2;
	$[4] === text ? t2 = $[5] : (t2 = /* @__PURE__ */ jsx(Flex, {
		justify: "flex-end",
		children: /* @__PURE__ */ jsx(RobotsCopyButton, {
			value: text,
			label: "Copy the JSON",
			text: "Copy"
		})
	}), $[4] = text, $[5] = t2);
	let t3;
	$[6] === Symbol.for("react.memo_cache_sentinel") ? (t3 = { maxHeight: "50vh" }, $[6] = t3) : t3 = $[6];
	let t4;
	$[7] === text ? t4 = $[8] : (t4 = /* @__PURE__ */ jsx(Card, {
		padding: 3,
		radius: 2,
		tone: "transparent",
		border: !0,
		overflow: "auto",
		style: t3,
		children: /* @__PURE__ */ jsx(Code, {
			language: "json",
			size: 1,
			children: text
		})
	}), $[7] = text, $[8] = t4);
	let t5;
	return $[9] !== t2 || $[10] !== t4 ? (t5 = /* @__PURE__ */ jsxs(Stack, {
		gap: 2,
		children: [t2, t4]
	}), $[9] = t2, $[10] = t4, $[11] = t5) : t5 = $[11], t5;
}
function Labelled(t0) {
	let $ = c(5), { label, children } = t0, t1;
	$[0] === label ? t1 = $[1] : (t1 = /* @__PURE__ */ jsx(Text, {
		size: 1,
		weight: "semibold",
		children: label
	}), $[0] = label, $[1] = t1);
	let t2;
	return $[2] !== children || $[3] !== t1 ? (t2 = /* @__PURE__ */ jsxs(Stack, {
		gap: 2,
		children: [t1, children]
	}), $[2] = children, $[3] = t1, $[4] = t2) : t2 = $[4], t2;
}
function RowCard(t0) {
	let $ = c(8), { title, meta, children } = t0, t1;
	$[0] === title ? t1 = $[1] : (t1 = /* @__PURE__ */ jsx(Text, {
		size: 1,
		weight: "semibold",
		children: title
	}), $[0] = title, $[1] = t1);
	let t2;
	$[2] === meta ? t2 = $[3] : (t2 = meta && /* @__PURE__ */ jsx(Text, {
		size: 1,
		muted: !0,
		children: meta
	}), $[2] = meta, $[3] = t2);
	let t3;
	return $[4] !== children || $[5] !== t1 || $[6] !== t2 ? (t3 = /* @__PURE__ */ jsx(Card, {
		padding: 3,
		radius: 2,
		border: !0,
		children: /* @__PURE__ */ jsxs(Stack, {
			gap: 3,
			children: [
				t1,
				t2,
				children
			]
		})
	}), $[4] = children, $[5] = t1, $[6] = t2, $[7] = t3) : t3 = $[7], t3;
}
function Tags(t0) {
	let $ = c(7), { tags, tone: t1 } = t0, tone = t1 === void 0 ? "default" : t1, t2;
	if ($[0] !== tags || $[1] !== tone) {
		let t3;
		$[3] === tone ? t3 = $[4] : (t3 = (tag) => /* @__PURE__ */ jsx(Badge, {
			tone,
			fontSize: 1,
			padding: 2,
			children: tag
		}, tag), $[3] = tone, $[4] = t3), t2 = tags.map(t3), $[0] = tags, $[1] = tone, $[2] = t2;
	} else t2 = $[2];
	let t3;
	return $[5] === t2 ? t3 = $[6] : (t3 = /* @__PURE__ */ jsx(Flex, {
		gap: 1,
		wrap: "wrap",
		children: t2
	}), $[5] = t2, $[6] = t3), t3;
}
const SUMMARIZE = {
	hasContent: (outputs) => typeof outputs.title == "string" || typeof outputs.description == "string" || asStrings(outputs.tags).length > 0,
	render: (outputs) => /* @__PURE__ */ jsxs(Stack, {
		gap: 4,
		children: [
			typeof outputs.title == "string" && /* @__PURE__ */ jsx(Labelled, {
				label: "Title",
				children: /* @__PURE__ */ jsx(Text, {
					size: 1,
					children: outputs.title
				})
			}),
			typeof outputs.description == "string" && /* @__PURE__ */ jsx(Labelled, {
				label: "Description",
				children: /* @__PURE__ */ jsx(Text, {
					size: 1,
					children: outputs.description
				})
			}),
			asStrings(outputs.tags).length > 0 && /* @__PURE__ */ jsx(Labelled, {
				label: "Tags",
				children: /* @__PURE__ */ jsx(Tags, { tags: asStrings(outputs.tags) })
			})
		]
	})
}, MODERATE = {
	hasContent: (outputs) => typeof outputs.exceeds_threshold == "boolean" || Object.keys(outputs.max_scores ?? {}).length > 0,
	render: (outputs) => /* @__PURE__ */ jsxs(Stack, {
		gap: 3,
		children: [/* @__PURE__ */ jsx(Flex, { children: /* @__PURE__ */ jsx(Badge, {
			tone: outputs.exceeds_threshold ? "critical" : "positive",
			fontSize: 1,
			padding: 2,
			children: outputs.exceeds_threshold ? "Exceeds a threshold" : "Within thresholds"
		}) }), Object.entries(outputs.max_scores ?? {}).map(([category, score]) => /* @__PURE__ */ jsxs(Text, {
			size: 1,
			children: [
				"Highest ",
				category,
				" score: ",
				formatScore(score)
			]
		}, category))]
	})
}, ASK_QUESTIONS = {
	hasContent: (outputs) => asRows(outputs.answers).length > 0,
	render: (outputs) => /* @__PURE__ */ jsx(Stack, {
		gap: 2,
		children: asRows(outputs.answers).map((answer, index) => /* @__PURE__ */ jsxs(RowCard, {
			title: formatText(answer.question),
			meta: `Confidence ${formatScore(answer.confidence)}`,
			children: [answer.skipped ? /* @__PURE__ */ jsx(Flex, { children: /* @__PURE__ */ jsx(Badge, {
				fontSize: 1,
				padding: 2,
				children: "Skipped"
			}) }) : /* @__PURE__ */ jsx(Text, {
				size: 1,
				children: formatText(answer.answer)
			}), typeof answer.reasoning == "string" && /* @__PURE__ */ jsx(Text, {
				size: 1,
				muted: !0,
				children: answer.reasoning
			})]
		}, index))
	})
};
/** `asset_update` is present only when the job ran with `update_asset_chapters`. */
function ChaptersAssetUpdateNote(t0) {
	let $ = c(3), { assetUpdate } = t0, status = assetUpdate?.status;
	if (status === "created") {
		let t1;
		return $[0] === Symbol.for("react.memo_cache_sentinel") ? (t1 = /* @__PURE__ */ jsx(RobotsNote, {
			tone: "positive",
			children: "The chapters were added to the Mux video as its chapters track."
		}), $[0] = t1) : t1 = $[0], t1;
	}
	if (status === "failed") {
		let t1;
		return $[1] === Symbol.for("react.memo_cache_sentinel") ? (t1 = /* @__PURE__ */ jsx(RobotsNote, {
			tone: "caution",
			children: "Mux couldn’t add these chapters to the video. They’re still listed below."
		}), $[1] = t1) : t1 = $[1], t1;
	}
	let t1;
	return $[2] === Symbol.for("react.memo_cache_sentinel") ? (t1 = /* @__PURE__ */ jsx(RobotsNote, { children: "These chapters weren’t added to the Mux video; they’re listed below." }), $[2] = t1) : t1 = $[2], t1;
}
const GENERATE_CHAPTERS = {
	hasContent: (outputs) => asRows(outputs.chapters).length > 0,
	render: (outputs) => /* @__PURE__ */ jsxs(Stack, {
		gap: 3,
		children: [/* @__PURE__ */ jsx(ChaptersAssetUpdateNote, { assetUpdate: outputs.asset_update }), /* @__PURE__ */ jsx(Stack, {
			gap: 2,
			children: asRows(outputs.chapters).map((chapter, index) => /* @__PURE__ */ jsxs(Text, {
				size: 1,
				children: [
					formatOffset(chapter.start_time),
					" — ",
					formatText(chapter.title)
				]
			}, index))
		})]
	})
};
/** A moment's narratives: which one has content depends on transcript vs visual evidence. */
function Narratives(t0) {
	let $ = c(6), { moment } = t0, quotable = moment.quotable_segment?.text, t1;
	$[0] !== moment.audible_narrative || $[1] !== moment.visual_narrative || $[2] !== quotable ? (t1 = [
		["Heard", moment.audible_narrative],
		["Seen", moment.visual_narrative],
		["Quote", quotable]
	].filter(_temp$10), $[0] = moment.audible_narrative, $[1] = moment.visual_narrative, $[2] = quotable, $[3] = t1) : t1 = $[3];
	let parts = t1;
	if (parts.length === 0) return null;
	let t2;
	return $[4] === parts ? t2 = $[5] : (t2 = /* @__PURE__ */ jsx(Stack, {
		gap: 2,
		children: parts.map(_temp2$7)
	}), $[4] = parts, $[5] = t2), t2;
}
function _temp2$7(t0) {
	let [label, text] = t0;
	return /* @__PURE__ */ jsxs(Text, {
		size: 1,
		children: [
			/* @__PURE__ */ jsxs("strong", { children: [label, ":"] }),
			" ",
			text
		]
	}, label);
}
function _temp$10(part) {
	return typeof part[1] == "string" && part[1].trim() !== "";
}
const FIND_KEY_MOMENTS = {
	hasContent: (outputs) => asRows(outputs.moments).length > 0,
	render: (outputs) => /* @__PURE__ */ jsx(Stack, {
		gap: 2,
		children: asRows(outputs.moments).map((moment, index) => {
			let concepts = [...asStrings(moment.notable_audible_concepts), ...asRows(moment.notable_visual_concepts).map((concept) => String(concept.concept ?? ""))].filter(Boolean);
			return /* @__PURE__ */ jsxs(RowCard, {
				title: formatText(moment.title),
				meta: `${formatOffsetMs(moment.start_ms)} – ${formatOffsetMs(moment.end_ms)} · score ${formatScore(moment.overall_score)}`,
				children: [/* @__PURE__ */ jsx(Narratives, { moment }), concepts.length > 0 && /* @__PURE__ */ jsx(Tags, {
					tags: [...new Set(concepts)],
					tone: "primary"
				})]
			}, index);
		})
	})
}, FIND_SCENES = {
	hasContent: (outputs) => asRows(outputs.scenes).length > 0,
	render: (outputs) => /* @__PURE__ */ jsx(Stack, {
		gap: 2,
		children: asRows(outputs.scenes).map((scene, index) => /* @__PURE__ */ jsx(RowCard, {
			title: formatText(scene.title),
			meta: `${formatOffsetMs(scene.start_ms)} – ${formatOffsetMs(scene.end_ms)}`,
			children: /* @__PURE__ */ jsx(Text, {
				size: 1,
				children: String(scene.blended_narrative ?? scene.audible_narrative ?? scene.visual_narrative ?? "—")
			})
		}, index))
	})
}, FIND_BEST_THUMBNAILS = {
	hasContent: (outputs) => asRows(outputs.best_thumbnails).length > 0,
	render: (outputs) => /* @__PURE__ */ jsx(Stack, {
		gap: 2,
		children: asRows(outputs.best_thumbnails).map((thumbnail, index) => /* @__PURE__ */ jsx(RowCard, {
			title: `At ${formatOffsetMs(thumbnail.timestamp_ms)}`,
			meta: `Score ${formatScore(thumbnail.overall)}`,
			children: typeof thumbnail.description == "string" && /* @__PURE__ */ jsx(Text, {
				size: 1,
				children: thumbnail.description
			})
		}, index))
	})
}, ENGAGEMENT_INSIGHTS = {
	hasContent: (outputs) => {
		let overall = outputs.overall_insight ?? {};
		return typeof overall.summary == "string" || asStrings(overall.trends).length > 0 || asRows(outputs.moment_insights).length > 0;
	},
	render: (outputs) => {
		let overall = outputs.overall_insight ?? {}, moments = asRows(outputs.moment_insights);
		return /* @__PURE__ */ jsxs(Stack, {
			gap: 4,
			children: [
				typeof overall.summary == "string" && /* @__PURE__ */ jsx(Text, {
					size: 1,
					children: overall.summary
				}),
				asStrings(overall.trends).map((trend) => /* @__PURE__ */ jsxs(Text, {
					size: 1,
					children: ["• ", trend]
				}, trend)),
				moments.length > 0 && /* @__PURE__ */ jsx(Labelled, {
					label: "Moments",
					children: /* @__PURE__ */ jsx(RobotsJsonBlock, {
						value: moments,
						what: "these moment insights"
					})
				})
			]
		});
	}
}, TRACK_PRODUCING = {
	hasContent: () => !0,
	render: (outputs) => /* @__PURE__ */ jsxs(Stack, {
		gap: 3,
		children: [/* @__PURE__ */ jsx(RobotsNote, {
			tone: "positive",
			children: "The generated track is on the Mux video. The Studio picks it up when the job finishes; resync the video if it hasn’t shown up yet."
		}), /* @__PURE__ */ jsx(RobotsJsonBlock, {
			value: outputs,
			what: "this output"
		})]
	})
}, OUTPUT_VIEWS = {
	summarize: SUMMARIZE,
	moderate: MODERATE,
	"ask-questions": ASK_QUESTIONS,
	"generate-chapters": GENERATE_CHAPTERS,
	"find-key-moments": FIND_KEY_MOMENTS,
	"find-scenes": FIND_SCENES,
	"find-best-thumbnails": FIND_BEST_THUMBNAILS,
	"generate-engagement-insights": ENGAGEMENT_INSIGHTS,
	"generate-premium-captions": TRACK_PRODUCING,
	"edit-captions": TRACK_PRODUCING,
	"translate-captions": TRACK_PRODUCING,
	"translate-audio": TRACK_PRODUCING
};
function OutputBody(t0) {
	let $ = c(14), { job } = t0;
	if (job.status === "errored") {
		let t1;
		$[0] === job ? t1 = $[1] : (t1 = robotsJobErrorMessage(job) ?? "This job failed without a message.", $[0] = job, $[1] = t1);
		let t2;
		return $[2] === t1 ? t2 = $[3] : (t2 = /* @__PURE__ */ jsx(RobotsNote, {
			tone: "critical",
			children: t1
		}), $[2] = t1, $[3] = t2), t2;
	}
	if (job.status === "cancelled") {
		let t1;
		return $[4] === Symbol.for("react.memo_cache_sentinel") ? (t1 = /* @__PURE__ */ jsx(RobotsNote, { children: "This job was cancelled." }), $[4] = t1) : t1 = $[4], t1;
	}
	if (job.status !== "completed") {
		let t1;
		return $[5] === job.status ? t1 = $[6] : (t1 = /* @__PURE__ */ jsxs(RobotsNote, { children: [
			"This job is still ",
			job.status,
			"."
		] }), $[5] = job.status, $[6] = t1), t1;
	}
	let outputs = job.outputs;
	if (!outputs || Object.keys(outputs).length === 0) {
		let t1;
		return $[7] === Symbol.for("react.memo_cache_sentinel") ? (t1 = /* @__PURE__ */ jsx(RobotsNote, { children: "Mux reports this job as completed but returned no output for it." }), $[7] = t1) : t1 = $[7], t1;
	}
	let view = OUTPUT_VIEWS[job.workflow];
	if (view?.hasContent(outputs)) {
		let t1;
		return $[8] !== outputs || $[9] !== view ? (t1 = view.render(outputs), $[8] = outputs, $[9] = view, $[10] = t1) : t1 = $[10], t1;
	}
	let t1;
	$[11] === Symbol.for("react.memo_cache_sentinel") ? (t1 = /* @__PURE__ */ jsx(RobotsNote, {
		tone: "caution",
		children: "This job completed, but its output isn’t in a shape this view can draw. The raw result follows."
	}), $[11] = t1) : t1 = $[11];
	let t2;
	return $[12] === outputs ? t2 = $[13] : (t2 = /* @__PURE__ */ jsxs(Stack, {
		gap: 3,
		children: [t1, /* @__PURE__ */ jsx(RobotsJsonBlock, {
			value: outputs,
			what: "this output"
		})]
	}), $[12] = outputs, $[13] = t2), t2;
}
function Fact(t0) {
	let $ = c(8), { label, children } = t0, t1;
	$[0] === label ? t1 = $[1] : (t1 = /* @__PURE__ */ jsx(Text, {
		size: 1,
		muted: !0,
		children: label
	}), $[0] = label, $[1] = t1);
	let t2;
	$[2] === Symbol.for("react.memo_cache_sentinel") ? (t2 = { minWidth: 0 }, $[2] = t2) : t2 = $[2];
	let t3;
	$[3] === children ? t3 = $[4] : (t3 = /* @__PURE__ */ jsx(Box, {
		style: t2,
		children
	}), $[3] = children, $[4] = t3);
	let t4;
	return $[5] !== t1 || $[6] !== t3 ? (t4 = /* @__PURE__ */ jsxs(Fragment, { children: [t1, t3] }), $[5] = t1, $[6] = t3, $[7] = t4) : t4 = $[7], t4;
}
function readError(error) {
	return error instanceof RobotsRequestError && error.status === 404 && error.muxAnswered ? "Mux keeps jobs for 30 days, and this one is gone. The video document still records its status and units." : error instanceof Error ? error.message : "Could not load this job from Mux.";
}
/** A job's output, read from Mux: the document stores only summarize and moderate outputs. */
function RobotsOutputDialog(t0) {
	let $ = c(52), { job, detailState, onLoaded, onClose } = t0, client = useClient$1(), dataset = useDataset(), id = useId(), [tab, setTab] = useState("result"), isHeldInFull = !!job.outputs || job.errors !== void 0, t1;
	$[0] !== client || $[1] !== job.id || $[2] !== job.workflow ? (t1 = async () => (await getRobotsJob(client, job.workflow, job.id)).data, $[0] = client, $[1] = job.id, $[2] = job.workflow, $[3] = t1) : t1 = $[3];
	let t2;
	$[4] === Symbol.for("react.memo_cache_sentinel") ? (t2 = {
		revalidateOnFocus: !1,
		shouldRetryOnError: !1
	}, $[4] = t2) : t2 = $[4];
	let { data: fetched, error } = useSWR(isHeldInFull ? null : `robots-job/${dataset}/${job.id}`, t1, t2), t3, t4;
	$[5] !== fetched || $[6] !== onLoaded ? (t3 = () => {
		fetched && onLoaded(fetched);
	}, t4 = [fetched, onLoaded], $[5] = fetched, $[6] = onLoaded, $[7] = t3, $[8] = t4) : (t3 = $[7], t4 = $[8]), useEffect(t3, t4);
	let shown = fetched ?? job, isLoading = !isHeldInFull && !fetched && !error, detail = fetched ? "loaded" : error ? "unreadable" : detailState, t5 = `robots-output${id}`, t6;
	$[9] === shown.workflow ? t6 = $[10] : (t6 = workflowLabel(shown.workflow), $[9] = shown.workflow, $[10] = t6);
	let t7;
	$[11] === Symbol.for("react.memo_cache_sentinel") ? (t7 = {
		gridTemplateColumns: "max-content minmax(0, 1fr)",
		alignItems: "center"
	}, $[11] = t7) : t7 = $[11];
	let t8;
	$[12] === shown.status ? t8 = $[13] : (t8 = /* @__PURE__ */ jsx(Fact, {
		label: "Status",
		children: /* @__PURE__ */ jsx(Flex, { children: /* @__PURE__ */ jsx(RobotsStatusBadge, {
			kind: "job",
			status: shown.status
		}) })
	}), $[12] = shown.status, $[13] = t8);
	let t9;
	$[14] !== detail || $[15] !== isLoading || $[16] !== shown ? (t9 = isLoading ? "Loading…" : unitsCell(shown, detail).label, $[14] = detail, $[15] = isLoading, $[16] = shown, $[17] = t9) : t9 = $[17];
	let t10;
	$[18] === t9 ? t10 = $[19] : (t10 = /* @__PURE__ */ jsx(Fact, {
		label: "Mux AI units",
		children: /* @__PURE__ */ jsx(Text, {
			size: 1,
			children: t9
		})
	}), $[18] = t9, $[19] = t10);
	let t11;
	$[20] === shown.created_at ? t11 = $[21] : (t11 = formatTimestamp(shown.created_at), $[20] = shown.created_at, $[21] = t11);
	let t12;
	$[22] === t11 ? t12 = $[23] : (t12 = /* @__PURE__ */ jsx(Fact, {
		label: "Started",
		children: /* @__PURE__ */ jsx(Text, {
			size: 1,
			children: t11
		})
	}), $[22] = t11, $[23] = t12);
	let t13;
	$[24] === Symbol.for("react.memo_cache_sentinel") ? (t13 = { minWidth: 0 }, $[24] = t13) : t13 = $[24];
	let t14;
	$[25] === shown.id ? t14 = $[26] : (t14 = /* @__PURE__ */ jsx(Fact, {
		label: "Job ID",
		children: /* @__PURE__ */ jsxs(Flex, {
			align: "center",
			gap: 2,
			children: [/* @__PURE__ */ jsx(Box, {
				flex: 1,
				style: t13,
				children: /* @__PURE__ */ jsx(Text, {
					size: 1,
					textOverflow: "ellipsis",
					title: shown.id,
					children: shown.id
				})
			}), /* @__PURE__ */ jsx(RobotsCopyButton, {
				value: shown.id,
				label: "Copy job ID"
			})]
		})
	}), $[25] = shown.id, $[26] = t14);
	let t15;
	$[27] !== t10 || $[28] !== t12 || $[29] !== t14 || $[30] !== t8 ? (t15 = /* @__PURE__ */ jsxs(Grid, {
		gap: 3,
		style: t7,
		children: [
			t8,
			t10,
			t12,
			t14
		]
	}), $[27] = t10, $[28] = t12, $[29] = t14, $[30] = t8, $[31] = t15) : t15 = $[31];
	let t16;
	$[32] === isLoading ? t16 = $[33] : (t16 = isLoading && /* @__PURE__ */ jsxs(Flex, {
		align: "center",
		gap: 2,
		children: [/* @__PURE__ */ jsx(Spinner, { muted: !0 }), /* @__PURE__ */ jsx(Text, {
			size: 1,
			muted: !0,
			children: "Loading the result from Mux…"
		})]
	}), $[32] = isLoading, $[33] = t16);
	let t17;
	$[34] === error ? t17 = $[35] : (t17 = error && /* @__PURE__ */ jsx(RobotsNote, {
		tone: "caution",
		children: readError(error)
	}), $[34] = error, $[35] = t17);
	let t18;
	$[36] !== error || $[37] !== id || $[38] !== isLoading || $[39] !== shown || $[40] !== tab ? (t18 = !isLoading && !error && /* @__PURE__ */ jsxs(Stack, {
		gap: 3,
		children: [
			/* @__PURE__ */ jsxs(TabList, {
				gap: 2,
				children: [/* @__PURE__ */ jsx(Tab, {
					id: `robots-output-result${id}`,
					"aria-controls": `robots-output-result-panel${id}`,
					label: "Result",
					selected: tab === "result",
					onClick: () => setTab("result")
				}), /* @__PURE__ */ jsx(Tab, {
					id: `robots-output-raw${id}`,
					"aria-controls": `robots-output-raw-panel${id}`,
					label: "Raw JSON",
					selected: tab === "raw",
					onClick: () => setTab("raw")
				})]
			}),
			/* @__PURE__ */ jsx(TabPanel, {
				id: `robots-output-result-panel${id}`,
				"aria-labelledby": `robots-output-result${id}`,
				hidden: tab !== "result",
				children: /* @__PURE__ */ jsx(OutputBody, { job: shown })
			}),
			/* @__PURE__ */ jsx(TabPanel, {
				id: `robots-output-raw-panel${id}`,
				"aria-labelledby": `robots-output-raw${id}`,
				hidden: tab !== "raw",
				children: /* @__PURE__ */ jsx(RobotsJsonBlock, {
					value: shown,
					what: "this job"
				})
			})
		]
	}), $[36] = error, $[37] = id, $[38] = isLoading, $[39] = shown, $[40] = tab, $[41] = t18) : t18 = $[41];
	let t19;
	$[42] !== t15 || $[43] !== t16 || $[44] !== t17 || $[45] !== t18 ? (t19 = /* @__PURE__ */ jsxs(Stack, {
		gap: 4,
		padding: 4,
		children: [
			t15,
			t16,
			t17,
			t18
		]
	}), $[42] = t15, $[43] = t16, $[44] = t17, $[45] = t18, $[46] = t19) : t19 = $[46];
	let t20;
	return $[47] !== onClose || $[48] !== t19 || $[49] !== t5 || $[50] !== t6 ? (t20 = /* @__PURE__ */ jsx(Dialog, {
		id: t5,
		header: t6,
		onClose,
		onClickOutside: onClose,
		zOffset: DIALOGS_Z_INDEX,
		width: 2,
		children: t19
	}), $[47] = onClose, $[48] = t19, $[49] = t5, $[50] = t6, $[51] = t20) : t20 = $[51], t20;
}
/**
* The languages Robots is verified with, offered as suggestions for every language field.
* Other BCP 47 tags still run, best effort.
* @see {@link https://www.mux.com/docs/guides/robots-supported-languages}
*/
const ROBOTS_VERIFIED_LANGUAGES = [
	{
		code: "af",
		label: "Afrikaans"
	},
	{
		code: "ar",
		label: "Arabic"
	},
	{
		code: "hy",
		label: "Armenian"
	},
	{
		code: "as",
		label: "Assamese"
	},
	{
		code: "ast",
		label: "Asturian"
	},
	{
		code: "az",
		label: "Azerbaijani"
	},
	{
		code: "be",
		label: "Belarusian"
	},
	{
		code: "bn",
		label: "Bengali"
	},
	{
		code: "bs",
		label: "Bosnian"
	},
	{
		code: "bg",
		label: "Bulgarian"
	},
	{
		code: "my",
		label: "Burmese"
	},
	{
		code: "yue",
		label: "Cantonese"
	},
	{
		code: "ca",
		label: "Catalan"
	},
	{
		code: "ceb",
		label: "Cebuano"
	},
	{
		code: "ny",
		label: "Chichewa"
	},
	{
		code: "zh",
		label: "Mandarin Chinese"
	},
	{
		code: "hr",
		label: "Croatian"
	},
	{
		code: "cs",
		label: "Czech"
	},
	{
		code: "da",
		label: "Danish"
	},
	{
		code: "nl",
		label: "Dutch"
	},
	{
		code: "en",
		label: "English"
	},
	{
		code: "et",
		label: "Estonian"
	},
	{
		code: "fil",
		label: "Filipino"
	},
	{
		code: "fi",
		label: "Finnish"
	},
	{
		code: "fr",
		label: "French"
	},
	{
		code: "gl",
		label: "Galician"
	},
	{
		code: "ka",
		label: "Georgian"
	},
	{
		code: "de",
		label: "German"
	},
	{
		code: "el",
		label: "Greek"
	},
	{
		code: "gu",
		label: "Gujarati"
	},
	{
		code: "ha",
		label: "Hausa"
	},
	{
		code: "he",
		label: "Hebrew"
	},
	{
		code: "hi",
		label: "Hindi"
	},
	{
		code: "hu",
		label: "Hungarian"
	},
	{
		code: "is",
		label: "Icelandic"
	},
	{
		code: "id",
		label: "Indonesian"
	},
	{
		code: "ga",
		label: "Irish"
	},
	{
		code: "it",
		label: "Italian"
	},
	{
		code: "ja",
		label: "Japanese"
	},
	{
		code: "jv",
		label: "Javanese"
	},
	{
		code: "kn",
		label: "Kannada"
	},
	{
		code: "kk",
		label: "Kazakh"
	},
	{
		code: "ko",
		label: "Korean"
	},
	{
		code: "ky",
		label: "Kyrgyz"
	},
	{
		code: "lv",
		label: "Latvian"
	},
	{
		code: "ln",
		label: "Lingala"
	},
	{
		code: "lt",
		label: "Lithuanian"
	},
	{
		code: "lb",
		label: "Luxembourgish"
	},
	{
		code: "mk",
		label: "Macedonian"
	},
	{
		code: "ms",
		label: "Malay"
	},
	{
		code: "ml",
		label: "Malayalam"
	},
	{
		code: "mt",
		label: "Maltese"
	},
	{
		code: "mi",
		label: "Māori"
	},
	{
		code: "mr",
		label: "Marathi"
	},
	{
		code: "mn",
		label: "Mongolian"
	},
	{
		code: "ne",
		label: "Nepali"
	},
	{
		code: "no",
		label: "Norwegian"
	},
	{
		code: "oc",
		label: "Occitan"
	},
	{
		code: "or",
		label: "Odia"
	},
	{
		code: "ps",
		label: "Pashto"
	},
	{
		code: "fa",
		label: "Persian"
	},
	{
		code: "pl",
		label: "Polish"
	},
	{
		code: "pt",
		label: "Portuguese"
	},
	{
		code: "pa",
		label: "Punjabi"
	},
	{
		code: "ro",
		label: "Romanian"
	},
	{
		code: "ru",
		label: "Russian"
	},
	{
		code: "sr",
		label: "Serbian"
	},
	{
		code: "sd",
		label: "Sindhi"
	},
	{
		code: "sk",
		label: "Slovak"
	},
	{
		code: "sl",
		label: "Slovenian"
	},
	{
		code: "so",
		label: "Somali"
	},
	{
		code: "es",
		label: "Spanish"
	},
	{
		code: "sw",
		label: "Swahili"
	},
	{
		code: "sv",
		label: "Swedish"
	},
	{
		code: "tl",
		label: "Tagalog"
	},
	{
		code: "tg",
		label: "Tajik"
	},
	{
		code: "ta",
		label: "Tamil"
	},
	{
		code: "te",
		label: "Telugu"
	},
	{
		code: "th",
		label: "Thai"
	},
	{
		code: "tr",
		label: "Turkish"
	},
	{
		code: "uk",
		label: "Ukrainian"
	},
	{
		code: "ur",
		label: "Urdu"
	},
	{
		code: "uz",
		label: "Uzbek"
	},
	{
		code: "vi",
		label: "Vietnamese"
	},
	{
		code: "cy",
		label: "Welsh"
	},
	{
		code: "yo",
		label: "Yoruba"
	}
];
function RemoveButton(t0) {
	let $ = c(3), { label, onClick } = t0, t1;
	return $[0] !== label || $[1] !== onClick ? (t1 = /* @__PURE__ */ jsx(Button, {
		icon: TrashIcon,
		mode: "bleed",
		tone: "critical",
		padding: 2,
		"aria-label": label,
		onClick
	}), $[0] = label, $[1] = onClick, $[2] = t1) : t1 = $[2], t1;
}
function AddButton(t0) {
	let $ = c(3), { text, onClick } = t0, t1;
	return $[0] !== onClick || $[1] !== text ? (t1 = /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Button, {
		icon: AddIcon,
		text,
		mode: "ghost",
		fontSize: 1,
		padding: 2,
		onClick
	}) }), $[0] = onClick, $[1] = text, $[2] = t1) : t1 = $[2], t1;
}
function LabelledCheckbox(t0) {
	let $ = c(12), { id, checked, label, onChange } = t0, t1;
	$[0] === onChange ? t1 = $[1] : (t1 = (event) => onChange(event.currentTarget.checked), $[0] = onChange, $[1] = t1);
	let t2;
	$[2] !== checked || $[3] !== id || $[4] !== t1 ? (t2 = /* @__PURE__ */ jsx(Checkbox, {
		id,
		checked,
		onChange: t1
	}), $[2] = checked, $[3] = id, $[4] = t1, $[5] = t2) : t2 = $[5];
	let t3;
	$[6] !== id || $[7] !== label ? (t3 = /* @__PURE__ */ jsx(Text, {
		size: 1,
		as: "label",
		htmlFor: id,
		children: label
	}), $[6] = id, $[7] = label, $[8] = t3) : t3 = $[8];
	let t4;
	return $[9] !== t2 || $[10] !== t3 ? (t4 = /* @__PURE__ */ jsxs(Flex, {
		align: "center",
		gap: 2,
		children: [t2, t3]
	}), $[9] = t2, $[10] = t3, $[11] = t4) : t4 = $[11], t4;
}
/** Interior spaces are kept: they're legal in every list this is used for. */
function splitLines(text) {
	return text.split("\n").map((line) => line.trim()).filter(Boolean);
}
/**
* Keeps the raw text being typed and sends only the normalised list, so trimming never eats a
* trailing space or a new line mid-edit. The form remounts per workflow, so no re-seeding.
*/
function StringListInput(t0) {
	let $ = c(17), { field, value, onChange, inputId } = t0, t1;
	$[0] === value ? t1 = $[1] : (t1 = Array.isArray(value) ? value : [], $[0] = value, $[1] = t1);
	let items = t1, t2;
	$[2] === items ? t2 = $[3] : (t2 = () => items.join("\n"), $[2] = items, $[3] = t2);
	let [draft, setDraft] = useState(t2), t3;
	$[4] !== field.name || $[5] !== onChange ? (t3 = (event) => {
		setDraft(event.currentTarget.value), onChange(field.name, splitLines(event.currentTarget.value));
	}, $[4] = field.name, $[5] = onChange, $[6] = t3) : t3 = $[6];
	let t4;
	$[7] !== draft || $[8] !== inputId || $[9] !== t3 ? (t4 = /* @__PURE__ */ jsx(TextArea, {
		id: inputId,
		rows: 2,
		placeholder: "One per line",
		value: draft,
		onChange: t3
	}), $[7] = draft, $[8] = inputId, $[9] = t3, $[10] = t4) : t4 = $[10];
	let t5;
	$[11] !== field.maxItems || $[12] !== items.length ? (t5 = field.maxItems !== void 0 && /* @__PURE__ */ jsxs(Text, {
		size: 1,
		muted: !0,
		children: [
			items.length,
			" of ",
			field.maxItems,
			" used."
		]
	}), $[11] = field.maxItems, $[12] = items.length, $[13] = t5) : t5 = $[13];
	let t6;
	return $[14] !== t4 || $[15] !== t5 ? (t6 = /* @__PURE__ */ jsxs(Stack, {
		gap: 2,
		children: [t4, t5]
	}), $[14] = t4, $[15] = t5, $[16] = t6) : t6 = $[16], t6;
}
function RowLabel(t0) {
	let $ = c(3), { htmlFor, children } = t0, t1;
	return $[0] !== children || $[1] !== htmlFor ? (t1 = /* @__PURE__ */ jsx(Text, {
		size: 1,
		weight: "medium",
		as: "label",
		htmlFor,
		children
	}), $[0] = children, $[1] = htmlFor, $[2] = t1) : t1 = $[2], t1;
}
function QuestionsInput(t0) {
	let $ = c(19), { field, value, onChange, inputId } = t0, t1;
	$[0] === value ? t1 = $[1] : (t1 = Array.isArray(value) ? value : [emptyQuestionRow()], $[0] = value, $[1] = t1);
	let rows = t1, t2;
	$[2] !== field.name || $[3] !== onChange ? (t2 = (next) => onChange(field.name, next), $[2] = field.name, $[3] = onChange, $[4] = t2) : t2 = $[4];
	let update = t2, t3;
	$[5] !== rows || $[6] !== update ? (t3 = (index, changes) => update(rows.map((row, i) => i === index ? {
		...row,
		...changes
	} : row)), $[5] = rows, $[6] = update, $[7] = t3) : t3 = $[7];
	let patch = t3, t4;
	$[8] !== inputId || $[9] !== patch || $[10] !== rows || $[11] !== update ? (t4 = rows.map((row_0, index_0) => {
		let number = index_0 + 1, modeId = `${inputId}-answer-mode-${index_0}`, optionsId = `${inputId}-answer-options-${index_0}`, isFreeForm = row_0.answerMode === "free_form";
		return /* @__PURE__ */ jsx(Card, {
			padding: 3,
			radius: 2,
			border: !0,
			children: /* @__PURE__ */ jsxs(Stack, {
				gap: 3,
				children: [
					/* @__PURE__ */ jsxs(Flex, {
						gap: 2,
						align: "center",
						children: [/* @__PURE__ */ jsx(Box, {
							flex: 1,
							children: /* @__PURE__ */ jsx(TextInput, {
								"aria-label": `Question ${number}`,
								placeholder: "Is there a person on screen?",
								value: row_0.question,
								onChange: (event) => patch(index_0, { question: event.currentTarget.value })
							})
						}), /* @__PURE__ */ jsx(RemoveButton, {
							label: `Remove question ${number}`,
							onClick: () => update(rows.filter((_, i_0) => i_0 !== index_0))
						})]
					}),
					/* @__PURE__ */ jsxs(Stack, {
						gap: 2,
						children: [/* @__PURE__ */ jsx(RowLabel, {
							htmlFor: modeId,
							children: "Answer"
						}), /* @__PURE__ */ jsx(Select, {
							id: modeId,
							value: row_0.answerMode ?? "options",
							onChange: (event_0) => patch(index_0, { answerMode: event_0.currentTarget.value }),
							children: QUESTION_ANSWER_MODES.map(_temp$9)
						})]
					}),
					isFreeForm ? /* @__PURE__ */ jsx(Text, {
						size: 1,
						muted: !0,
						children: "Mux answers in its own words. Treat the answer as generated text."
					}) : /* @__PURE__ */ jsxs(Stack, {
						gap: 2,
						children: [
							/* @__PURE__ */ jsx(RowLabel, {
								htmlFor: optionsId,
								children: "Answer options"
							}),
							/* @__PURE__ */ jsx(TextInput, {
								id: optionsId,
								placeholder: "yes, no",
								value: row_0.answerOptions,
								onChange: (event_1) => patch(index_0, { answerOptions: event_1.currentTarget.value })
							}),
							/* @__PURE__ */ jsx(Text, {
								size: 1,
								muted: !0,
								children: "Comma separated. Leave empty for yes or no."
							})
						]
					})
				]
			})
		}, index_0);
	}), $[8] = inputId, $[9] = patch, $[10] = rows, $[11] = update, $[12] = t4) : t4 = $[12];
	let t5;
	$[13] !== rows || $[14] !== update ? (t5 = /* @__PURE__ */ jsx(AddButton, {
		text: "Add question",
		onClick: () => update([...rows, emptyQuestionRow()])
	}), $[13] = rows, $[14] = update, $[15] = t5) : t5 = $[15];
	let t6;
	return $[16] !== t4 || $[17] !== t5 ? (t6 = /* @__PURE__ */ jsxs(Stack, {
		gap: 2,
		children: [t4, t5]
	}), $[16] = t4, $[17] = t5, $[18] = t6) : t6 = $[18], t6;
}
function _temp$9(mode) {
	return /* @__PURE__ */ jsx("option", {
		value: mode.value,
		children: mode.label
	}, mode.value);
}
function ReplacementsInput(t0) {
	let $ = c(19), { field, value, onChange } = t0, t1;
	$[0] === value ? t1 = $[1] : (t1 = Array.isArray(value) ? value : [], $[0] = value, $[1] = t1);
	let rows = t1, t2;
	$[2] !== field.name || $[3] !== onChange ? (t2 = (next) => onChange(field.name, next), $[2] = field.name, $[3] = onChange, $[4] = t2) : t2 = $[4];
	let update = t2, t3;
	$[5] !== rows || $[6] !== update ? (t3 = (index, changes) => update(rows.map((row, i) => i === index ? {
		...row,
		...changes
	} : row)), $[5] = rows, $[6] = update, $[7] = t3) : t3 = $[7];
	let patch = t3, t4;
	$[8] !== field.name || $[9] !== patch || $[10] !== rows || $[11] !== update ? (t4 = rows.map((row_0, index_0) => /* @__PURE__ */ jsxs(Flex, {
		gap: 2,
		align: "center",
		wrap: "wrap",
		children: [
			/* @__PURE__ */ jsx(Box, {
				flex: 1,
				children: /* @__PURE__ */ jsx(TextInput, {
					"aria-label": `Find text ${index_0 + 1}`,
					placeholder: "Find",
					value: row_0.find,
					onChange: (event) => patch(index_0, { find: event.currentTarget.value })
				})
			}),
			/* @__PURE__ */ jsx(Box, {
				flex: 1,
				children: /* @__PURE__ */ jsx(TextInput, {
					"aria-label": `Replacement text ${index_0 + 1}`,
					placeholder: "Replace with",
					value: row_0.replace,
					onChange: (event_0) => patch(index_0, { replace: event_0.currentTarget.value })
				})
			}),
			/* @__PURE__ */ jsx(LabelledCheckbox, {
				id: `${field.name}-case-${index_0}`,
				label: "Case sensitive",
				checked: row_0.caseSensitive,
				onChange: (caseSensitive) => patch(index_0, { caseSensitive })
			}),
			/* @__PURE__ */ jsx(RemoveButton, {
				label: `Remove replacement ${index_0 + 1}`,
				onClick: () => update(rows.filter((_, i_0) => i_0 !== index_0))
			})
		]
	}, index_0)), $[8] = field.name, $[9] = patch, $[10] = rows, $[11] = update, $[12] = t4) : t4 = $[12];
	let t5;
	$[13] !== rows || $[14] !== update ? (t5 = /* @__PURE__ */ jsx(AddButton, {
		text: "Add replacement",
		onClick: () => update([...rows, {
			find: "",
			replace: "",
			caseSensitive: !1
		}])
	}), $[13] = rows, $[14] = update, $[15] = t5) : t5 = $[15];
	let t6;
	return $[16] !== t4 || $[17] !== t5 ? (t6 = /* @__PURE__ */ jsxs(Stack, {
		gap: 2,
		children: [t4, t5]
	}), $[16] = t4, $[17] = t5, $[18] = t6) : t6 = $[18], t6;
}
function SpeakerReplacementsInput(t0) {
	let $ = c(18), { field, value, onChange } = t0, t1;
	$[0] === value ? t1 = $[1] : (t1 = Array.isArray(value) ? value : [], $[0] = value, $[1] = t1);
	let rows = t1, t2;
	$[2] !== field.name || $[3] !== onChange ? (t2 = (next) => onChange(field.name, next), $[2] = field.name, $[3] = onChange, $[4] = t2) : t2 = $[4];
	let update = t2, t3;
	$[5] !== rows || $[6] !== update ? (t3 = (index, changes) => update(rows.map((row, i) => i === index ? {
		...row,
		...changes
	} : row)), $[5] = rows, $[6] = update, $[7] = t3) : t3 = $[7];
	let patch = t3, t4;
	$[8] !== patch || $[9] !== rows || $[10] !== update ? (t4 = rows.map((row_0, index_0) => /* @__PURE__ */ jsxs(Flex, {
		gap: 2,
		align: "center",
		children: [
			/* @__PURE__ */ jsx(Box, {
				flex: 1,
				children: /* @__PURE__ */ jsx(TextInput, {
					"aria-label": `Current speaker label ${index_0 + 1}`,
					placeholder: "Speaker 1",
					value: row_0.find,
					onChange: (event) => patch(index_0, { find: event.currentTarget.value })
				})
			}),
			/* @__PURE__ */ jsx(Box, {
				flex: 1,
				children: /* @__PURE__ */ jsx(TextInput, {
					"aria-label": `New speaker label ${index_0 + 1}`,
					placeholder: "New label",
					value: row_0.replace,
					onChange: (event_0) => patch(index_0, { replace: event_0.currentTarget.value })
				})
			}),
			/* @__PURE__ */ jsx(RemoveButton, {
				label: `Remove speaker label ${index_0 + 1}`,
				onClick: () => update(rows.filter((_, i_0) => i_0 !== index_0))
			})
		]
	}, index_0)), $[8] = patch, $[9] = rows, $[10] = update, $[11] = t4) : t4 = $[11];
	let t5;
	$[12] !== rows || $[13] !== update ? (t5 = /* @__PURE__ */ jsx(AddButton, {
		text: "Add speaker label",
		onClick: () => update([...rows, {
			find: "",
			replace: ""
		}])
	}), $[12] = rows, $[13] = update, $[14] = t5) : t5 = $[14];
	let t6;
	return $[15] !== t4 || $[16] !== t5 ? (t6 = /* @__PURE__ */ jsxs(Stack, {
		gap: 2,
		children: [t4, t5]
	}), $[15] = t4, $[16] = t5, $[17] = t6) : t6 = $[17], t6;
}
function TaxonomyInput(t0) {
	let $ = c(26), { field, value, onChange, inputId } = t0, T0, patch, t1, t2, t3, taxonomy;
	if ($[0] !== field.name || $[1] !== inputId || $[2] !== onChange || $[3] !== value) {
		taxonomy = asTaxonomyValue(value), patch = (changes) => onChange(field.name, {
			...taxonomy,
			...changes
		});
		let patchRow = (index, changes_0) => patch({ values: taxonomy.values.map((row, i) => i === index ? {
			...row,
			...changes_0
		} : row) });
		T0 = Stack, t1 = 2, t2 = /* @__PURE__ */ jsx(TextInput, {
			id: inputId,
			"aria-label": "Taxonomy name",
			placeholder: "Taxonomy name, e.g. Content pillars",
			value: taxonomy.name,
			onChange: (event) => patch({ name: event.currentTarget.value })
		}), t3 = taxonomy.values.map((row_0, index_0) => /* @__PURE__ */ jsxs(Flex, {
			gap: 2,
			align: "center",
			wrap: "wrap",
			children: [
				/* @__PURE__ */ jsx(Box, {
					flex: 1,
					children: /* @__PURE__ */ jsx(TextInput, {
						"aria-label": `Taxonomy value ${index_0 + 1}`,
						placeholder: "Value",
						value: row_0.label,
						onChange: (event_0) => patchRow(index_0, { label: event_0.currentTarget.value })
					})
				}),
				/* @__PURE__ */ jsx(Box, {
					flex: 2,
					children: /* @__PURE__ */ jsx(TextInput, {
						"aria-label": `When value ${index_0 + 1} applies`,
						placeholder: "When it applies",
						value: row_0.description,
						onChange: (event_1) => patchRow(index_0, { description: event_1.currentTarget.value })
					})
				}),
				/* @__PURE__ */ jsx(Box, {
					flex: 1,
					children: /* @__PURE__ */ jsx(TextInput, {
						"aria-label": `Aliases for value ${index_0 + 1}`,
						placeholder: "Aliases, comma separated",
						value: row_0.aliases,
						onChange: (event_2) => patchRow(index_0, { aliases: event_2.currentTarget.value })
					})
				}),
				/* @__PURE__ */ jsx(RemoveButton, {
					label: `Remove taxonomy value ${index_0 + 1}`,
					onClick: () => patch({ values: taxonomy.values.filter((_, i_0) => i_0 !== index_0) })
				})
			]
		}, index_0)), $[0] = field.name, $[1] = inputId, $[2] = onChange, $[3] = value, $[4] = T0, $[5] = patch, $[6] = t1, $[7] = t2, $[8] = t3, $[9] = taxonomy;
	} else T0 = $[4], patch = $[5], t1 = $[6], t2 = $[7], t3 = $[8], taxonomy = $[9];
	let t4;
	$[10] !== patch || $[11] !== taxonomy.values ? (t4 = /* @__PURE__ */ jsx(AddButton, {
		text: "Add value",
		onClick: () => patch({ values: [...taxonomy.values, emptyTaxonomyRow()] })
	}), $[10] = patch, $[11] = taxonomy.values, $[12] = t4) : t4 = $[12];
	let t5 = `${inputId}-allow-other`, t6;
	$[13] === patch ? t6 = $[14] : (t6 = (allowOther) => patch({ allowOther }), $[13] = patch, $[14] = t6);
	let t7;
	$[15] !== t5 || $[16] !== t6 || $[17] !== taxonomy.allowOther ? (t7 = /* @__PURE__ */ jsx(LabelledCheckbox, {
		id: t5,
		label: "Allow values outside this list",
		checked: taxonomy.allowOther,
		onChange: t6
	}), $[15] = t5, $[16] = t6, $[17] = taxonomy.allowOther, $[18] = t7) : t7 = $[18];
	let t8;
	return $[19] !== T0 || $[20] !== t1 || $[21] !== t2 || $[22] !== t3 || $[23] !== t4 || $[24] !== t7 ? (t8 = /* @__PURE__ */ jsxs(T0, {
		gap: t1,
		children: [
			t2,
			t3,
			t4,
			t7
		]
	}), $[19] = T0, $[20] = t1, $[21] = t2, $[22] = t3, $[23] = t4, $[24] = t7, $[25] = t8) : t8 = $[25], t8;
}
function EnumListInput(t0) {
	let $ = c(17), { field, value, onChange, inputId } = t0, t1;
	$[0] === value ? t1 = $[1] : (t1 = Array.isArray(value) ? value : [], $[0] = value, $[1] = t1);
	let selected = t1, t2;
	$[2] === field.options ? t2 = $[3] : (t2 = field.options ?? [], $[2] = field.options, $[3] = t2);
	let t3;
	if ($[4] !== field.name || $[5] !== inputId || $[6] !== onChange || $[7] !== selected || $[8] !== t2) {
		let t4;
		$[10] !== field.name || $[11] !== inputId || $[12] !== onChange || $[13] !== selected ? (t4 = (option) => /* @__PURE__ */ jsx(LabelledCheckbox, {
			id: `${inputId}-${option.value}`,
			label: option.label,
			checked: selected.includes(option.value),
			onChange: (checked) => onChange(field.name, checked ? [...selected, option.value] : selected.filter((entry) => entry !== option.value))
		}, option.value), $[10] = field.name, $[11] = inputId, $[12] = onChange, $[13] = selected, $[14] = t4) : t4 = $[14], t3 = t2.map(t4), $[4] = field.name, $[5] = inputId, $[6] = onChange, $[7] = selected, $[8] = t2, $[9] = t3;
	} else t3 = $[9];
	let t4;
	return $[15] === t3 ? t4 = $[16] : (t4 = /* @__PURE__ */ jsx(Stack, {
		gap: 2,
		children: t3
	}), $[15] = t3, $[16] = t4), t4;
}
function Control(t0) {
	let $ = c(75), { field, value, onChange, inputId, captionTracks, languageListId } = t0;
	switch (field.kind) {
		case "select": {
			let t1 = value ?? field.defaultValue ?? "", t2;
			$[0] !== field.name || $[1] !== onChange ? (t2 = (event_3) => onChange(field.name, event_3.currentTarget.value), $[0] = field.name, $[1] = onChange, $[2] = t2) : t2 = $[2];
			let t3;
			$[3] === field.options ? t3 = $[4] : (t3 = field.options ?? [], $[3] = field.options, $[4] = t3);
			let t4;
			$[5] === t3 ? t4 = $[6] : (t4 = t3.map(_temp2$6), $[5] = t3, $[6] = t4);
			let t5;
			return $[7] !== inputId || $[8] !== t1 || $[9] !== t2 || $[10] !== t4 ? (t5 = /* @__PURE__ */ jsx(Select, {
				id: inputId,
				value: t1,
				onChange: t2,
				children: t4
			}), $[7] = inputId, $[8] = t1, $[9] = t2, $[10] = t4, $[11] = t5) : t5 = $[11], t5;
		}
		case "number": {
			let t1 = value === void 0 ? "" : String(value), t2;
			$[12] !== field.name || $[13] !== onChange ? (t2 = (event_2) => onChange(field.name, event_2.currentTarget.value === "" ? void 0 : Number(event_2.currentTarget.value)), $[12] = field.name, $[13] = onChange, $[14] = t2) : t2 = $[14];
			let t3;
			return $[15] !== field.max || $[16] !== field.min || $[17] !== field.step || $[18] !== inputId || $[19] !== t1 || $[20] !== t2 ? (t3 = /* @__PURE__ */ jsx(TextInput, {
				id: inputId,
				type: "number",
				min: field.min,
				max: field.max,
				step: field.step,
				value: t1,
				onChange: t2
			}), $[15] = field.max, $[16] = field.min, $[17] = field.step, $[18] = inputId, $[19] = t1, $[20] = t2, $[21] = t3) : t3 = $[21], t3;
		}
		case "language": {
			let t1 = field.placeholder ?? "en", t2 = value ?? "", t3;
			$[22] !== field.name || $[23] !== onChange ? (t3 = (event_1) => onChange(field.name, event_1.currentTarget.value.trim()), $[22] = field.name, $[23] = onChange, $[24] = t3) : t3 = $[24];
			let t4;
			return $[25] !== inputId || $[26] !== languageListId || $[27] !== t1 || $[28] !== t2 || $[29] !== t3 ? (t4 = /* @__PURE__ */ jsx(TextInput, {
				id: inputId,
				list: languageListId,
				placeholder: t1,
				value: t2,
				onChange: t3
			}), $[25] = inputId, $[26] = languageListId, $[27] = t1, $[28] = t2, $[29] = t3, $[30] = t4) : t4 = $[30], t4;
		}
		case "track": {
			let t1;
			return $[31] !== captionTracks || $[32] !== field.name || $[33] !== inputId || $[34] !== onChange || $[35] !== value ? (t1 = captionTracks.length === 0 ? /* @__PURE__ */ jsx(Text, {
				size: 1,
				muted: !0,
				children: "This video has no caption track to use."
			}) : /* @__PURE__ */ jsxs(Select, {
				id: inputId,
				value: value ?? "",
				onChange: (event_0) => onChange(field.name, event_0.currentTarget.value),
				children: [/* @__PURE__ */ jsx("option", {
					value: "",
					children: "Select a track"
				}), captionTracks.map(_temp3$3)]
			}), $[31] = captionTracks, $[32] = field.name, $[33] = inputId, $[34] = onChange, $[35] = value, $[36] = t1) : t1 = $[36], t1;
		}
		case "stringList": {
			let t1;
			return $[37] !== field || $[38] !== inputId || $[39] !== onChange || $[40] !== value ? (t1 = /* @__PURE__ */ jsx(StringListInput, {
				field,
				value,
				onChange,
				inputId
			}), $[37] = field, $[38] = inputId, $[39] = onChange, $[40] = value, $[41] = t1) : t1 = $[41], t1;
		}
		case "enumList": {
			let t1;
			return $[42] !== field || $[43] !== inputId || $[44] !== onChange || $[45] !== value ? (t1 = /* @__PURE__ */ jsx(EnumListInput, {
				field,
				value,
				onChange,
				inputId
			}), $[42] = field, $[43] = inputId, $[44] = onChange, $[45] = value, $[46] = t1) : t1 = $[46], t1;
		}
		case "questions": {
			let t1;
			return $[47] !== field || $[48] !== inputId || $[49] !== onChange || $[50] !== value ? (t1 = /* @__PURE__ */ jsx(QuestionsInput, {
				field,
				value,
				onChange,
				inputId
			}), $[47] = field, $[48] = inputId, $[49] = onChange, $[50] = value, $[51] = t1) : t1 = $[51], t1;
		}
		case "replacements": {
			let t1;
			return $[52] !== field || $[53] !== inputId || $[54] !== onChange || $[55] !== value ? (t1 = /* @__PURE__ */ jsx(ReplacementsInput, {
				field,
				value,
				onChange,
				inputId
			}), $[52] = field, $[53] = inputId, $[54] = onChange, $[55] = value, $[56] = t1) : t1 = $[56], t1;
		}
		case "speakerReplacements": {
			let t1;
			return $[57] !== field || $[58] !== inputId || $[59] !== onChange || $[60] !== value ? (t1 = /* @__PURE__ */ jsx(SpeakerReplacementsInput, {
				field,
				value,
				onChange,
				inputId
			}), $[57] = field, $[58] = inputId, $[59] = onChange, $[60] = value, $[61] = t1) : t1 = $[61], t1;
		}
		case "taxonomy": {
			let t1;
			return $[62] !== field || $[63] !== inputId || $[64] !== onChange || $[65] !== value ? (t1 = /* @__PURE__ */ jsx(TaxonomyInput, {
				field,
				value,
				onChange,
				inputId
			}), $[62] = field, $[63] = inputId, $[64] = onChange, $[65] = value, $[66] = t1) : t1 = $[66], t1;
		}
		default: {
			let t1 = value ?? "", t2;
			$[67] !== field.name || $[68] !== onChange ? (t2 = (event) => onChange(field.name, event.currentTarget.value), $[67] = field.name, $[68] = onChange, $[69] = t2) : t2 = $[69];
			let t3;
			return $[70] !== field.placeholder || $[71] !== inputId || $[72] !== t1 || $[73] !== t2 ? (t3 = /* @__PURE__ */ jsx(TextInput, {
				id: inputId,
				placeholder: field.placeholder,
				value: t1,
				onChange: t2
			}), $[70] = field.placeholder, $[71] = inputId, $[72] = t1, $[73] = t2, $[74] = t3) : t3 = $[74], t3;
		}
	}
}
function _temp3$3(track) {
	return /* @__PURE__ */ jsx("option", {
		value: track.id,
		children: [track.name, track.language_code].filter(Boolean).join(" · ") || track.id
	}, track.id);
}
function _temp2$6(option) {
	return /* @__PURE__ */ jsx("option", {
		value: option.value,
		children: option.label
	}, option.value);
}
function RobotsParamFields(t0) {
	let $ = c(23), { fields, values, onChange, captionTracks, context } = t0, id = useId(), languageListId = `robots-languages${id}`;
	if (fields.length === 0) {
		let t1;
		return $[0] === Symbol.for("react.memo_cache_sentinel") ? (t1 = /* @__PURE__ */ jsx(Text, {
			size: 1,
			muted: !0,
			children: "This workflow takes no options."
		}), $[0] = t1) : t1 = $[0], t1;
	}
	let t1;
	$[1] !== captionTracks || $[2] !== id || $[3] !== languageListId || $[4] !== onChange || $[5] !== values ? (t1 = (field) => {
		let inputId = `${id}-${field.name}`, value = values[field.name];
		return field.kind === "boolean" ? /* @__PURE__ */ jsxs(Stack, {
			gap: 2,
			children: [/* @__PURE__ */ jsx(LabelledCheckbox, {
				id: inputId,
				label: field.label,
				checked: value === void 0 ? !!field.defaultValue : value === !0,
				onChange: (checked) => onChange(field.name, checked)
			}), field.helpText && /* @__PURE__ */ jsx(Box, {
				paddingLeft: 4,
				children: /* @__PURE__ */ jsx(Text, {
					size: 1,
					muted: !0,
					children: field.helpText
				})
			})]
		}, field.name) : /* @__PURE__ */ jsx(FormField_default, {
			inputId,
			title: field.isRequired ? `${field.label} *` : field.label,
			description: field.helpText,
			children: /* @__PURE__ */ jsx(Control, {
				field,
				value,
				onChange,
				inputId,
				captionTracks,
				languageListId
			})
		}, field.name);
	}, $[1] = captionTracks, $[2] = id, $[3] = languageListId, $[4] = onChange, $[5] = values, $[6] = t1) : t1 = $[6];
	let renderField = t1, t2;
	$[7] !== fields || $[8] !== languageListId ? (t2 = fields.some(_temp4$2) && /* @__PURE__ */ jsx("datalist", {
		id: languageListId,
		children: ROBOTS_VERIFIED_LANGUAGES.map(_temp5$1)
	}), $[7] = fields, $[8] = languageListId, $[9] = t2) : t2 = $[9];
	let t3;
	if ($[10] !== context || $[11] !== fields || $[12] !== renderField || $[13] !== values) {
		let t4;
		$[15] !== context || $[16] !== values ? (t4 = (field_1) => isFieldVisible(field_1, values, context), $[15] = context, $[16] = values, $[17] = t4) : t4 = $[17];
		let t5;
		$[18] === renderField ? t5 = $[19] : (t5 = (group) => group.section ? /* @__PURE__ */ jsx(Card, {
			padding: 3,
			radius: 2,
			border: !0,
			tone: "transparent",
			children: /* @__PURE__ */ jsxs(Stack, {
				gap: 4,
				children: [/* @__PURE__ */ jsxs(Stack, {
					gap: 2,
					children: [/* @__PURE__ */ jsx(Text, {
						size: 1,
						weight: "semibold",
						children: group.section.title
					}), group.section.description && /* @__PURE__ */ jsx(Text, {
						size: 1,
						muted: !0,
						children: group.section.description
					})]
				}), group.fields.map(renderField)]
			})
		}, group.section.id) : group.fields.map(renderField), $[18] = renderField, $[19] = t5), t3 = groupFieldsBySection(fields.filter(t4)).map(t5), $[10] = context, $[11] = fields, $[12] = renderField, $[13] = values, $[14] = t3;
	} else t3 = $[14];
	let t4;
	return $[20] !== t2 || $[21] !== t3 ? (t4 = /* @__PURE__ */ jsxs(Stack, {
		gap: 4,
		children: [t2, t3]
	}), $[20] = t2, $[21] = t3, $[22] = t4) : t4 = $[22], t4;
}
function _temp5$1(language) {
	return /* @__PURE__ */ jsx("option", {
		value: language.code,
		children: language.label
	}, language.code);
}
function _temp4$2(field_0) {
	return field_0.kind === "language";
}
/** Nothing runs until a confirm step names the workflow, the spend and any destructive choice. */
function RobotsRunDialog(t0) {
	let $ = c(50), { assetId, captionTracks, context, runDisabledReason, onRun, onClose } = t0, id = useId(), [selectedWorkflow, setSelectedWorkflow] = useState(DEFAULT_ROBOTS_WORKFLOW), t1;
	$[0] === Symbol.for("react.memo_cache_sentinel") ? (t1 = {}, $[0] = t1) : t1 = $[0];
	let [valuesByWorkflow, setValuesByWorkflow] = useState(t1), [confirmedWorkflow, setConfirmedWorkflow] = useState(), workflow = availableWorkflow(selectedWorkflow, context), isConfirming = confirmedWorkflow === workflow, definition = ROBOTS_CATALOG_BY_KEY[workflow], t2;
	$[1] !== definition.params || $[2] !== valuesByWorkflow || $[3] !== workflow ? (t2 = valuesByWorkflow[workflow] ?? defaultParamValues(definition.params), $[1] = definition.params, $[2] = valuesByWorkflow, $[3] = workflow, $[4] = t2) : t2 = $[4];
	let values = t2, T0, T1, t10, t3, t4, t5, t6, t7, t8, t9;
	if ($[5] !== assetId || $[6] !== captionTracks || $[7] !== context || $[8] !== definition || $[9] !== id || $[10] !== isConfirming || $[11] !== onClose || $[12] !== onRun || $[13] !== runDisabledReason || $[14] !== values || $[15] !== workflow) {
		let errors = validateParams(definition, values, context), warnings = confirmWarnings(definition, values, context), t11;
		$[26] !== values || $[27] !== workflow ? (t11 = (name, value) => setValuesByWorkflow((previous) => ({
			...previous,
			[workflow]: {
				...values,
				[name]: value
			}
		})), $[26] = values, $[27] = workflow, $[28] = t11) : t11 = $[28];
		let handleChange = t11, t12;
		$[29] !== assetId || $[30] !== context || $[31] !== definition || $[32] !== onClose || $[33] !== onRun || $[34] !== values || $[35] !== workflow ? (t12 = () => {
			onRun(workflow, paramsFromFormValues(definition, assetId, values, context)), onClose();
		}, $[29] = assetId, $[30] = context, $[31] = definition, $[32] = onClose, $[33] = onRun, $[34] = values, $[35] = workflow, $[36] = t12) : t12 = $[36];
		let handleConfirm = t12, footer = isConfirming ? /* @__PURE__ */ jsxs(Flex, {
			justify: "flex-end",
			gap: 2,
			padding: 3,
			children: [/* @__PURE__ */ jsx(Button, {
				text: "Back",
				mode: "bleed",
				onClick: () => setConfirmedWorkflow(void 0)
			}), /* @__PURE__ */ jsx(Button, {
				text: `Run ${definition.label}`,
				tone: "positive",
				disabled: !!runDisabledReason,
				onClick: handleConfirm
			})]
		}) : /* @__PURE__ */ jsxs(Flex, {
			justify: "flex-end",
			gap: 2,
			padding: 3,
			children: [/* @__PURE__ */ jsx(Button, {
				text: "Cancel",
				mode: "bleed",
				onClick: onClose
			}), /* @__PURE__ */ jsx(RobotsReasonButton, {
				text: "Continue",
				tone: "primary",
				disabledReason: runDisabledReason ?? errors[0],
				onClick: () => {
					errors.length === 0 && setConfirmedWorkflow(workflow);
				}
			})]
		});
		T1 = Dialog, t5 = `robots-run${id}`, t6 = isConfirming ? "Confirm this run" : "Run a Robots workflow", t7 = onClose, t8 = DIALOGS_Z_INDEX, t9 = 1, t10 = footer, T0 = Box, t3 = 4, t4 = isConfirming ? /* @__PURE__ */ jsxs(Stack, {
			gap: 3,
			children: [
				/* @__PURE__ */ jsxs(Text, {
					size: 1,
					children: [
						"This will run ",
						/* @__PURE__ */ jsx("strong", { children: definition.label }),
						" on this video and consume Mux AI units from your account. Robots is billed per AI unit. The first 100,000 units each month are free.",
						" ",
						/* @__PURE__ */ jsx("a", {
							href: ROBOTS_PRICING_URL,
							target: "_blank",
							rel: "noopener noreferrer",
							children: "See pricing"
						}),
						"."
					]
				}),
				definition.producesTrack && /* @__PURE__ */ jsx(RobotsNote, { children: "The result is attached to the Mux video, so it works in your players straight away. The Studio picks it up when the job finishes." }),
				(definition.notes ?? []).map(_temp$8),
				warnings.map(_temp2$5)
			]
		}) : /* @__PURE__ */ jsxs(Stack, {
			gap: 4,
			children: [
				/* @__PURE__ */ jsx(FormField_default, {
					inputId: `robots-workflow${id}`,
					title: "Workflow",
					description: definition.description,
					children: /* @__PURE__ */ jsx(Select, {
						id: `robots-workflow${id}`,
						value: workflow,
						onChange: (event) => setSelectedWorkflow(event.currentTarget.value),
						children: ROBOTS_CATEGORIES.map((category) => /* @__PURE__ */ jsx("optgroup", {
							label: category,
							children: ROBOTS_CATALOG.filter((candidate) => candidate.category === category).map((candidate_0) => {
								let unavailable = workflowUnavailableReason(candidate_0, context);
								return /* @__PURE__ */ jsx("option", {
									value: candidate_0.key,
									disabled: !!unavailable,
									children: unavailable ? `${candidate_0.label} (${unavailable})` : candidate_0.label
								}, candidate_0.key);
							})
						}, category))
					})
				}),
				(definition.producesTrack || definition.planRestricted || definition.requiresViewData) && /* @__PURE__ */ jsxs(Flex, {
					gap: 1,
					wrap: "wrap",
					children: [
						definition.producesTrack && /* @__PURE__ */ jsx(Badge, {
							tone: "primary",
							fontSize: 1,
							padding: 2,
							children: "Adds a track"
						}),
						definition.planRestricted && /* @__PURE__ */ jsx(Badge, {
							tone: "caution",
							fontSize: 1,
							padding: 2,
							children: "Plan dependent"
						}),
						definition.requiresViewData && /* @__PURE__ */ jsx(Badge, {
							fontSize: 1,
							padding: 2,
							children: "Needs Mux Data views"
						})
					]
				}),
				(definition.notes ?? []).map(_temp3$2),
				/* @__PURE__ */ jsx(RobotsParamFields, {
					fields: definition.params,
					values,
					onChange: handleChange,
					captionTracks,
					context
				}, workflow),
				errors.length > 0 && /* @__PURE__ */ jsx(Card, {
					padding: 3,
					radius: 2,
					tone: "critical",
					border: !0,
					children: /* @__PURE__ */ jsxs(Stack, {
						gap: 2,
						children: [/* @__PURE__ */ jsx(Text, {
							size: 1,
							weight: "semibold",
							children: "Fix these before running"
						}), errors.map(_temp4$1)]
					})
				})
			]
		}), $[5] = assetId, $[6] = captionTracks, $[7] = context, $[8] = definition, $[9] = id, $[10] = isConfirming, $[11] = onClose, $[12] = onRun, $[13] = runDisabledReason, $[14] = values, $[15] = workflow, $[16] = T0, $[17] = T1, $[18] = t10, $[19] = t3, $[20] = t4, $[21] = t5, $[22] = t6, $[23] = t7, $[24] = t8, $[25] = t9;
	} else T0 = $[16], T1 = $[17], t10 = $[18], t3 = $[19], t4 = $[20], t5 = $[21], t6 = $[22], t7 = $[23], t8 = $[24], t9 = $[25];
	let t11;
	$[37] !== T0 || $[38] !== t3 || $[39] !== t4 ? (t11 = /* @__PURE__ */ jsx(T0, {
		padding: t3,
		children: t4
	}), $[37] = T0, $[38] = t3, $[39] = t4, $[40] = t11) : t11 = $[40];
	let t12;
	return $[41] !== T1 || $[42] !== t10 || $[43] !== t11 || $[44] !== t5 || $[45] !== t6 || $[46] !== t7 || $[47] !== t8 || $[48] !== t9 ? (t12 = /* @__PURE__ */ jsx(T1, {
		id: t5,
		header: t6,
		onClose: t7,
		zOffset: t8,
		width: t9,
		footer: t10,
		children: t11
	}), $[41] = T1, $[42] = t10, $[43] = t11, $[44] = t5, $[45] = t6, $[46] = t7, $[47] = t8, $[48] = t9, $[49] = t12) : t12 = $[49], t12;
}
function _temp4$1(error) {
	return /* @__PURE__ */ jsx(Text, {
		size: 1,
		children: error
	}, error);
}
function _temp3$2(note_0) {
	return /* @__PURE__ */ jsx(RobotsNote, { children: note_0 }, note_0);
}
function _temp2$5(warning) {
	return /* @__PURE__ */ jsx(Card, {
		padding: 3,
		radius: 2,
		tone: "critical",
		border: !0,
		children: /* @__PURE__ */ jsxs(Stack, {
			gap: 3,
			children: [/* @__PURE__ */ jsx(Text, {
				size: 1,
				weight: "semibold",
				children: warning.title
			}), /* @__PURE__ */ jsx(Text, {
				size: 1,
				children: warning.body
			})]
		})
	}, warning.title);
}
function _temp$8(note) {
	return /* @__PURE__ */ jsx(RobotsNote, {
		tone: "caution",
		children: note
	}, note);
}
const NO_DIRECTIVES$1 = [];
/** The current time in seconds, updated only when a pending create's row is due to relabel. */
function useRelabelClock(pendings) {
	let $ = c(3), [nowS, setNowS] = useState(_temp$7), wakeAt = nextPendingRelabelAt(pendings, nowS), t0, t1;
	return $[0] === wakeAt ? (t0 = $[1], t1 = $[2]) : (t0 = () => {
		if (wakeAt === void 0) return;
		let timer = setTimeout(() => setNowS(Math.floor(Date.now() / 1e3)), Math.max(0, wakeAt * 1e3 - Date.now()) + 50);
		return () => clearTimeout(timer);
	}, t1 = [wakeAt], $[0] = wakeAt, $[1] = t0, $[2] = t1), useEffect(t0, t1), nowS;
}
function _temp$7() {
	return Math.floor(Date.now() / 1e3);
}
/** Why Run is blocked: while its table shows a pending row. */
function pendingReason(rows, where) {
	if (rows.length !== 0) return rows.some((row) => row.phase === "unconfirmed") ? `Mux hasn’t confirmed the last run. See the note above the ${where}.` : "A run is starting on this video.";
}
function RobotsPanelForAsset(t0) {
	let $ = c(151), { asset, assetId, config, readOnly, summaryTarget } = t0, toast = useToast(), canRun = useCanRunRobots(config) && !readOnly, defaultDirectiveIds = config.defaultDirectiveIds ?? NO_DIRECTIVES$1, t1;
	$[0] === defaultDirectiveIds ? t1 = $[1] : (t1 = {
		enabled: !0,
		defaultDirectiveIds
	}, $[0] = defaultDirectiveIds, $[1] = t1);
	let { store, snapshot } = useRobotsSync(asset, t1), isEnabled = snapshot.capability?.state === "enabled", { listing, reload: reloadDirectives } = useRobotsDirectives(isEnabled), [isRunDialogOpen, setIsRunDialogOpen] = useState(!1), [isApplySummaryOpen, setIsApplySummaryOpen] = useState(!1), [viewedJobId, setViewedJobId] = useState(), t2;
	$[2] === asset ? t2 = $[3] : (t2 = pendingCreatesOf(asset), $[2] = asset, $[3] = t2);
	let pendings = t2, nowS = useRelabelClock(pendings);
	if (!store) return null;
	let { capability } = snapshot;
	if (capability && capability.state !== "enabled") {
		let t3;
		$[4] === store ? t3 = $[5] : (t3 = () => store.refreshNow(), $[4] = store, $[5] = t3);
		let t4;
		return $[6] !== capability.state || $[7] !== capability.termsUrl || $[8] !== snapshot.isRefreshing || $[9] !== t3 ? (t4 = /* @__PURE__ */ jsx(RobotsCapabilityCard, {
			state: capability.state,
			termsUrl: capability.termsUrl,
			onCheckAgain: t3,
			isChecking: snapshot.isRefreshing
		}), $[6] = capability.state, $[7] = capability.termsUrl, $[8] = snapshot.isRefreshing, $[9] = t3, $[10] = t4) : t4 = $[10], t4;
	}
	if (!snapshot.hasLoadedOnce && !isEnabled) {
		let t3;
		return $[11] === Symbol.for("react.memo_cache_sentinel") ? (t3 = /* @__PURE__ */ jsxs(Flex, {
			align: "center",
			gap: 2,
			padding: 3,
			children: [/* @__PURE__ */ jsx(Spinner, { muted: !0 }), /* @__PURE__ */ jsx(Text, {
				size: 1,
				muted: !0,
				children: "Loading Robots…"
			})]
		}), $[11] = t3) : t3 = $[11], t3;
	}
	let t3;
	$[12] === toast ? t3 = $[13] : (t3 = (message) => toast.push(message), $[12] = toast, $[13] = t3);
	let notify = t3, jobRows, runDisabledReason, runRows, t4, unconfirmedJobRows, unconfirmedRunRows;
	if ($[14] !== asset || $[15] !== nowS || $[16] !== pendings || $[17] !== snapshot.directiveRuns || $[18] !== snapshot.jobs || $[19] !== snapshot.links || $[20] !== snapshot.localJobCreate || $[21] !== snapshot.localRunCreate || $[22] !== snapshot.settledRequestIds) {
		let rowsInput = {
			settled: snapshot.settledRequestIds,
			links: snapshot.links,
			state: asset,
			nowS
		};
		jobRows = pendingCreateRows({
			...rowsInput,
			stored: pendings.filter(_temp2$4),
			local: snapshot.localJobCreate,
			jobs: snapshot.jobs,
			runs: []
		}), runRows = pendingCreateRows({
			...rowsInput,
			stored: pendings.filter(_temp3$1),
			local: snapshot.localRunCreate,
			jobs: [],
			runs: snapshot.directiveRuns
		}), unconfirmedJobRows = jobRows.filter(_temp4), unconfirmedRunRows = runRows.filter(_temp5), runDisabledReason = pendingReason(jobRows, "jobs"), t4 = pendingReason(runRows, "directive runs") ?? pendingReason(jobRows, "jobs"), $[14] = asset, $[15] = nowS, $[16] = pendings, $[17] = snapshot.directiveRuns, $[18] = snapshot.jobs, $[19] = snapshot.links, $[20] = snapshot.localJobCreate, $[21] = snapshot.localRunCreate, $[22] = snapshot.settledRequestIds, $[23] = jobRows, $[24] = runDisabledReason, $[25] = runRows, $[26] = t4, $[27] = unconfirmedJobRows, $[28] = unconfirmedRunRows;
	} else jobRows = $[23], runDisabledReason = $[24], runRows = $[25], t4 = $[26], unconfirmedJobRows = $[27], unconfirmedRunRows = $[28];
	let directiveRunDisabledReason = t4, tracks = asset.data?.tracks, t5;
	$[29] === tracks ? t5 = $[30] : (t5 = tracks && {
		hasCaptions: hasUsableCaptionTrack(tracks),
		isAudioOnly: !tracks.some(_temp6)
	}, $[29] = tracks, $[30] = t5);
	let t6;
	$[31] === asset.data ? t6 = $[32] : (t6 = !asset.data?.is_live && typeof asset.data?.duration == "number" && { duration: asset.data.duration }, $[31] = asset.data, $[32] = t6);
	let t7;
	$[33] !== t5 || $[34] !== t6 ? (t7 = {
		...t5,
		...t6
	}, $[33] = t5, $[34] = t6, $[35] = t7) : t7 = $[35];
	let context = t7, t8;
	$[36] === tracks ? t8 = $[37] : (t8 = tracks ?? [], $[36] = tracks, $[37] = t8);
	let t9;
	$[38] === t8 ? t9 = $[39] : (t9 = t8.filter(_temp7), $[38] = t8, $[39] = t9);
	let captionTracks = t9, t10;
	if ($[40] !== asset.robotsJobs || $[41] !== asset.robotsOutputs?.summarize || $[42] !== assetId || $[43] !== canRun || $[44] !== captionTracks || $[45] !== config.allowedRolesForRobots || $[46] !== context || $[47] !== defaultDirectiveIds || $[48] !== directiveRunDisabledReason || $[49] !== isApplySummaryOpen || $[50] !== isRunDialogOpen || $[51] !== jobRows || $[52] !== listing || $[53] !== notify || $[54] !== reloadDirectives || $[55] !== runDisabledReason || $[56] !== runRows || $[57] !== snapshot.advisory || $[58] !== snapshot.areDirectiveRunsPending || $[59] !== snapshot.cancellingJobIds || $[60] !== snapshot.detailedJobIds || $[61] !== snapshot.directiveRuns || $[62] !== snapshot.failedDetailIds || $[63] !== snapshot.hasLoadedOnce || $[64] !== snapshot.isRefreshing || $[65] !== snapshot.jobs || $[66] !== snapshot.loadError || $[67] !== snapshot.loadingDetailIds || $[68] !== snapshot.pendingDetailIds || $[69] !== store || $[70] !== summaryTarget || $[71] !== unconfirmedJobRows || $[72] !== unconfirmedRunRows || $[73] !== viewedJobId) {
		let shownJobs = jobsWithHistory(snapshot.jobs, asset.robotsJobs), t11;
		$[75] === viewedJobId ? t11 = $[76] : (t11 = (job) => job.id === viewedJobId, $[75] = viewedJobId, $[76] = t11);
		let viewedJob = shownJobs.find(t11), t12;
		$[77] !== defaultDirectiveIds || $[78] !== listing ? (t12 = directiveNamesById(listing, defaultDirectiveIds), $[77] = defaultDirectiveIds, $[78] = listing, $[79] = t12) : t12 = $[79];
		let directiveNames = t12, summary = asset.robotsOutputs?.summarize, t13;
		$[80] !== canRun || $[81] !== runDisabledReason ? (t13 = canRun && /* @__PURE__ */ jsx(RobotsReasonButton, {
			icon: RobotIcon,
			text: "Run a workflow",
			tone: "primary",
			disabledReason: runDisabledReason,
			onClick: () => setIsRunDialogOpen(!0)
		}), $[80] = canRun, $[81] = runDisabledReason, $[82] = t13) : t13 = $[82];
		let t14;
		$[83] !== summary || $[84] !== summaryTarget ? (t14 = summaryTarget && /* @__PURE__ */ jsx(RobotsReasonButton, {
			text: "Apply summary",
			mode: "ghost",
			disabledReason: summary ? void 0 : "Run a Summarize workflow to apply its title, description and tags to this document’s own fields.",
			onClick: () => setIsApplySummaryOpen(!0)
		}), $[83] = summary, $[84] = summaryTarget, $[85] = t14) : t14 = $[85];
		let t15;
		$[86] !== t13 || $[87] !== t14 ? (t15 = /* @__PURE__ */ jsxs(Flex, {
			gap: 2,
			wrap: "wrap",
			children: [t13, t14]
		}), $[86] = t13, $[87] = t14, $[88] = t15) : t15 = $[88];
		let t16;
		$[89] !== reloadDirectives || $[90] !== store ? (t16 = () => {
			store.refreshNow(), reloadDirectives();
		}, $[89] = reloadDirectives, $[90] = store, $[91] = t16) : t16 = $[91];
		let t17;
		$[92] !== snapshot.isRefreshing || $[93] !== t16 ? (t17 = /* @__PURE__ */ jsx(Button, {
			icon: RefreshIcon,
			text: "Refresh",
			mode: "bleed",
			loading: snapshot.isRefreshing,
			onClick: t16
		}), $[92] = snapshot.isRefreshing, $[93] = t16, $[94] = t17) : t17 = $[94];
		let t18;
		$[95] !== t15 || $[96] !== t17 ? (t18 = /* @__PURE__ */ jsxs(Flex, {
			justify: "space-between",
			align: "center",
			gap: 2,
			wrap: "wrap",
			children: [t15, t17]
		}), $[95] = t15, $[96] = t17, $[97] = t18) : t18 = $[97];
		let t19;
		$[98] !== canRun || $[99] !== config.allowedRolesForRobots ? (t19 = !canRun && /* @__PURE__ */ jsx(RobotsNote, { children: robotsRunnersOnlyNote(config.allowedRolesForRobots) }), $[98] = canRun, $[99] = config.allowedRolesForRobots, $[100] = t19) : t19 = $[100];
		let t20;
		$[101] !== canRun || $[102] !== store || $[103] !== unconfirmedJobRows ? (t20 = canRun && /* @__PURE__ */ jsx(RobotsUnconfirmedNote, {
			rows: unconfirmedJobRows,
			onClear: () => store.clearUnconfirmed(unconfirmedJobRows.map(_temp8))
		}), $[101] = canRun, $[102] = store, $[103] = unconfirmedJobRows, $[104] = t20) : t20 = $[104];
		let t21;
		$[105] === snapshot.loadError ? t21 = $[106] : (t21 = snapshot.loadError && /* @__PURE__ */ jsx(RobotsNote, {
			tone: "critical",
			children: snapshot.loadError
		}), $[105] = snapshot.loadError, $[106] = t21);
		let t22;
		$[107] === snapshot.advisory ? t22 = $[108] : (t22 = snapshot.advisory && /* @__PURE__ */ jsx(RobotsCapabilityCard, { state: snapshot.advisory }), $[107] = snapshot.advisory, $[108] = t22);
		let t23;
		$[109] === Symbol.for("react.memo_cache_sentinel") ? (t23 = /* @__PURE__ */ jsx(Text, {
			size: 1,
			weight: "semibold",
			children: "Jobs"
		}), $[109] = t23) : t23 = $[109];
		let t24;
		$[110] !== canRun || $[111] !== notify || $[112] !== store ? (t24 = canRun ? (job_0) => void store.cancelJob(job_0, notify) : void 0, $[110] = canRun, $[111] = notify, $[112] = store, $[113] = t24) : t24 = $[113];
		let t25;
		$[114] === Symbol.for("react.memo_cache_sentinel") ? (t25 = (job_1) => setViewedJobId(job_1.id), $[114] = t25) : t25 = $[114];
		let t26;
		$[115] === store ? t26 = $[116] : (t26 = (job_2) => void store.loadJobDetail(job_2), $[115] = store, $[116] = t26);
		let t27;
		$[117] === shownJobs ? t27 = $[118] : (t27 = new Map(shownJobs.map(_temp9)), $[117] = shownJobs, $[118] = t27);
		let t28;
		$[119] !== notify || $[120] !== store ? (t28 = (directiveId) => void store.startDirectiveRun(directiveId, notify), $[119] = notify, $[120] = store, $[121] = t28) : t28 = $[121];
		let t29;
		$[122] !== store || $[123] !== unconfirmedRunRows ? (t29 = () => store.clearUnconfirmed(unconfirmedRunRows.map(_temp10)), $[122] = store, $[123] = unconfirmedRunRows, $[124] = t29) : t29 = $[124];
		let t30;
		$[125] !== canRun || $[126] !== defaultDirectiveIds || $[127] !== directiveNames || $[128] !== directiveRunDisabledReason || $[129] !== listing || $[130] !== runRows || $[131] !== snapshot.areDirectiveRunsPending || $[132] !== snapshot.directiveRuns || $[133] !== t27 || $[134] !== t28 || $[135] !== t29 || $[136] !== unconfirmedRunRows ? (t30 = /* @__PURE__ */ jsx(RobotsDirectivesSection, {
			canRun,
			listing,
			configuredIds: defaultDirectiveIds,
			directiveNames,
			runs: snapshot.directiveRuns,
			pendingRows: runRows,
			unconfirmedRows: unconfirmedRunRows,
			isLoading: snapshot.areDirectiveRunsPending,
			runDisabledReason: directiveRunDisabledReason,
			jobsById: t27,
			onRun: t28,
			onClearUnconfirmed: t29,
			onViewJob: setViewedJobId
		}), $[125] = canRun, $[126] = defaultDirectiveIds, $[127] = directiveNames, $[128] = directiveRunDisabledReason, $[129] = listing, $[130] = runRows, $[131] = snapshot.areDirectiveRunsPending, $[132] = snapshot.directiveRuns, $[133] = t27, $[134] = t28, $[135] = t29, $[136] = unconfirmedRunRows, $[137] = t30) : t30 = $[137];
		let t31;
		$[138] !== assetId || $[139] !== canRun || $[140] !== captionTracks || $[141] !== context || $[142] !== isRunDialogOpen || $[143] !== notify || $[144] !== runDisabledReason || $[145] !== store ? (t31 = canRun && isRunDialogOpen && /* @__PURE__ */ jsx(RobotsRunDialog, {
			assetId,
			captionTracks,
			context,
			runDisabledReason,
			onRun: (workflow, parameters) => void store.startJob(workflow, parameters, notify),
			onClose: () => setIsRunDialogOpen(!1)
		}), $[138] = assetId, $[139] = canRun, $[140] = captionTracks, $[141] = context, $[142] = isRunDialogOpen, $[143] = notify, $[144] = runDisabledReason, $[145] = store, $[146] = t31) : t31 = $[146];
		let t32;
		$[147] !== isApplySummaryOpen || $[148] !== summary || $[149] !== summaryTarget ? (t32 = summaryTarget && summary && isApplySummaryOpen && /* @__PURE__ */ jsx(RobotsApplySummaryDialog, {
			summary,
			target: summaryTarget,
			onClose: () => setIsApplySummaryOpen(!1)
		}), $[147] = isApplySummaryOpen, $[148] = summary, $[149] = summaryTarget, $[150] = t32) : t32 = $[150], t10 = /* @__PURE__ */ jsxs(Stack, {
			gap: 4,
			children: [
				t18,
				t19,
				t20,
				t21,
				t22,
				/* @__PURE__ */ jsxs(Stack, {
					gap: 3,
					children: [t23, /* @__PURE__ */ jsx(RobotsJobTable, {
						jobs: shownJobs,
						pendingRows: jobRows,
						detailedJobIds: snapshot.detailedJobIds,
						failedDetailIds: snapshot.failedDetailIds,
						loadingDetailIds: snapshot.loadingDetailIds,
						pendingDetailIds: snapshot.pendingDetailIds,
						cancellingJobIds: snapshot.cancellingJobIds,
						onCancel: t24,
						onViewOutput: t25,
						onLoadDetail: t26,
						pointsToNote: canRun,
						isLoading: !snapshot.hasLoadedOnce && shownJobs.length === 0
					})]
				}),
				t30,
				t31,
				t32,
				viewedJob && /* @__PURE__ */ jsx(RobotsOutputDialog, {
					job: viewedJob,
					detailState: detailStateOf(viewedJob, snapshot.detailedJobIds, snapshot.failedDetailIds),
					onLoaded: store.rememberJobDetail,
					onClose: () => setViewedJobId(void 0)
				})
			]
		}), $[40] = asset.robotsJobs, $[41] = asset.robotsOutputs?.summarize, $[42] = assetId, $[43] = canRun, $[44] = captionTracks, $[45] = config.allowedRolesForRobots, $[46] = context, $[47] = defaultDirectiveIds, $[48] = directiveRunDisabledReason, $[49] = isApplySummaryOpen, $[50] = isRunDialogOpen, $[51] = jobRows, $[52] = listing, $[53] = notify, $[54] = reloadDirectives, $[55] = runDisabledReason, $[56] = runRows, $[57] = snapshot.advisory, $[58] = snapshot.areDirectiveRunsPending, $[59] = snapshot.cancellingJobIds, $[60] = snapshot.detailedJobIds, $[61] = snapshot.directiveRuns, $[62] = snapshot.failedDetailIds, $[63] = snapshot.hasLoadedOnce, $[64] = snapshot.isRefreshing, $[65] = snapshot.jobs, $[66] = snapshot.loadError, $[67] = snapshot.loadingDetailIds, $[68] = snapshot.pendingDetailIds, $[69] = store, $[70] = summaryTarget, $[71] = unconfirmedJobRows, $[72] = unconfirmedRunRows, $[73] = viewedJobId, $[74] = t10;
	} else t10 = $[74];
	return t10;
}
function _temp10(row_2) {
	return row_2.pending;
}
function _temp9(job_3) {
	return [job_3.id, job_3];
}
function _temp8(row_1) {
	return row_1.pending;
}
function _temp7(track_0) {
	return isCaptionTrack(track_0) && track_0.status === "ready" && !!track_0.id;
}
function _temp6(track) {
	return track?.type === "video";
}
function _temp5(row_0) {
	return row_0.phase === "unconfirmed";
}
function _temp4(row) {
	return row.phase === "unconfirmed";
}
function _temp3$1(pending_0) {
	return pending_0.kind === "directive-run";
}
function _temp2$4(pending) {
	return pending.kind === "job";
}
/** Keyed by document and asset, so no state from one video carries over to another. */
function RobotsPanel(props) {
	let $ = c(5), { assetId, _id: documentId } = props.asset;
	if (!assetId) {
		let t0;
		return $[0] === Symbol.for("react.memo_cache_sentinel") ? (t0 = /* @__PURE__ */ jsx(RobotsNote, { children: "Add a video before running Robots workflows." }), $[0] = t0) : t0 = $[0], t0;
	}
	let t0 = `${documentId}:${assetId}`, t1;
	return $[1] !== assetId || $[2] !== props || $[3] !== t0 ? (t1 = /* @__PURE__ */ jsx(RobotsPanelForAsset, {
		...props,
		assetId
	}, t0), $[1] = assetId, $[2] = props, $[3] = t0, $[4] = t1) : t1 = $[4], t1;
}
const SUPPORTED_MUX_LANGUAGES = [
	{
		label: "English",
		code: "en",
		state: "Stable"
	},
	{
		label: "Spanish",
		code: "es",
		state: "Stable"
	},
	{
		label: "Italian",
		code: "it",
		state: "Stable"
	},
	{
		label: "Portuguese",
		code: "pt",
		state: "Stable"
	},
	{
		label: "German",
		code: "de",
		state: "Stable"
	},
	{
		label: "French",
		code: "fr",
		state: "Stable"
	},
	{
		label: "Polish",
		code: "pl",
		state: "Beta"
	},
	{
		label: "Russian",
		code: "ru",
		state: "Beta"
	},
	{
		label: "Dutch",
		code: "nl",
		state: "Beta"
	},
	{
		label: "Catalan",
		code: "ca",
		state: "Beta"
	},
	{
		label: "Turkish",
		code: "tr",
		state: "Beta"
	},
	{
		label: "Swedish",
		code: "sv",
		state: "Beta"
	},
	{
		label: "Ukrainian",
		code: "uk",
		state: "Beta"
	},
	{
		label: "Norwegian",
		code: "no",
		state: "Beta"
	},
	{
		label: "Finnish",
		code: "fi",
		state: "Beta"
	},
	{
		label: "Slovak",
		code: "sk",
		state: "Beta"
	},
	{
		label: "Greek",
		code: "el",
		state: "Beta"
	},
	{
		label: "Czech",
		code: "cs",
		state: "Beta"
	},
	{
		label: "Croatian",
		code: "hr",
		state: "Beta"
	},
	{
		label: "Danish",
		code: "da",
		state: "Beta"
	},
	{
		label: "Romanian",
		code: "ro",
		state: "Beta"
	},
	{
		label: "Bulgarian",
		code: "bg",
		state: "Beta"
	}
];
SUPPORTED_MUX_LANGUAGES.map((l) => l.code);
function isCustomTextTrack(track) {
	return track.type !== "autogenerated";
}
function isAutogeneratedTrack(track) {
	return track.type === "autogenerated";
}
const LANGUAGE_OPTIONS$1 = LanguagesList.getAllCodes().map((code) => ({
	value: code,
	label: LanguagesList.getNativeName(code)
})), MUX_LANGUAGE_OPTIONS = SUPPORTED_MUX_LANGUAGES.map((lang) => ({
	value: lang.code,
	label: lang.label
}));
function AddCaptionDialog({ asset, onAdd, onClose }) {
	let client = useClient$1(), toast = useToast(), dialogId = `AddCaptionDialog${useId()}`, [isAutogenerated, setIsAutogenerated] = useState(!1), [vttUrl, setVttUrl] = useState(""), [languageCode, setLanguageCode] = useState(""), [selectedLanguage, setSelectedLanguage] = useState(null), [name, setName] = useState(""), [isSubmitting, setIsSubmitting] = useState(!1), [selectedFile, setSelectedFile] = useState(null), fileInputRef = useRef(null), uploadVttFile = async (file) => (await client.assets.upload("file", file, { filename: file.name })).url, refreshAssetData = async () => {
		if (asset._id && asset.assetId) try {
			let latestAssetData = await getAsset(client, asset.assetId), dataWithKeys = addKeysToMuxData(latestAssetData.data);
			await client.patch(asset._id).set({
				data: dataWithKeys,
				status: latestAssetData.data.status
			}).commit({ returnDocuments: !1 });
		} catch (refreshError) {
			console.error("Failed to refresh asset data:", refreshError);
		}
	}, handleAddTrackFromUrl = async () => {
		if (!asset.assetId) throw Error("Asset ID is required");
		let trimmedName = name.trim(), trimmedLanguageCode = languageCode.trim(), vttUrlToUse = vttUrl.trim();
		if (selectedFile) try {
			vttUrlToUse = await uploadVttFile(selectedFile);
		} catch (uploadError) {
			throw toast.push({
				title: "Failed to upload caption file",
				status: "error",
				description: "Could not upload the caption file to Sanity. Please try again."
			}), setIsSubmitting(!1), uploadError;
		}
		await addTextTrackFromUrl(client, asset.assetId, vttUrlToUse, {
			language_code: trimmedLanguageCode,
			name: trimmedName,
			text_type: "subtitles"
		});
		let result = await pollTrackStatus({
			client,
			assetId: asset.assetId,
			trackName: trimmedName,
			trackLanguageCode: trimmedLanguageCode,
			onTrackErrored: async (track) => {
				let errorMessage = track.error?.messages?.[0] || track.error?.type || "The track failed to download from the provided URL";
				toast.push({
					title: "Caption track failed",
					status: "error",
					description: errorMessage
				}), await refreshAssetData(), onAdd(track), onClose();
			}
		});
		!result.found || !result.track ? (toast.push({
			title: "Caption track may have been added",
			status: "warning",
			description: "The track was created but its status could not be determined. It may still be processing. Please refresh the page to see if it appears."
		}), onClose()) : result.status !== "errored" && (result.status === "preparing" ? (toast.push({
			title: "Caption track is processing",
			status: "info",
			description: "The track was created and is being processed. It will appear in the list shortly."
		}), await refreshAssetData(), onAdd(result.track), onClose()) : (await refreshAssetData(), toast.push({
			title: "Caption track added",
			status: "success",
			description: "Caption track added successfully"
		}), onAdd(result.track), onClose()));
	}, handleGenerateSubtitles = async () => {
		if (!asset.assetId) throw Error("Asset ID is required");
		let audioTracks = getAudioTracks((await getAsset(client, asset.assetId)).data.tracks), audioTrack = audioTracks.find((track) => !isAlternativeAudioTrack(track)) || audioTracks[0];
		if (!audioTrack || !audioTrack.id) throw toast.push({
			title: "No audio track found",
			status: "error",
			description: "The asset does not have an audio track. Auto-generated subtitles require an audio track."
		}), Error("No audio track found");
		await generateSubtitles(client, asset.assetId, audioTrack.id, {
			language_code: languageCode.trim(),
			name: name.trim()
		});
		let mockTrack = {
			type: "text",
			id: `generating-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
			text_type: "subtitles",
			text_source: "generated_live",
			language_code: languageCode.trim(),
			name: name.trim(),
			status: "preparing"
		};
		toast.push({
			title: "Generating subtitles",
			status: "success",
			description: "This may take a few minutes"
		}), onAdd(mockTrack), onClose();
	}, handleSubmit = async () => {
		if (!isAutogenerated) {
			if (!selectedFile && !vttUrl.trim()) {
				toast.push({
					title: "Caption file or URL required",
					status: "error",
					description: "Please select a VTT or SRT file or enter a caption file URL"
				});
				return;
			}
			if (vttUrl.trim() && !selectedFile) try {
				new URL(vttUrl.trim());
			} catch {
				toast.push({
					title: "Invalid URL",
					status: "error",
					description: "Please enter a valid URL (e.g., https://example.com/subtitles.vtt or subtitles.srt)"
				});
				return;
			}
		}
		if (!name.trim()) toast.push({
			title: "Audio name required",
			status: "error",
			description: "Please enter an audio name for this caption track"
		});
		else if (!languageCode.trim()) toast.push({
			title: "Language code required",
			status: "error",
			description: "Please enter a language code (e.g., en, es, fr)"
		});
		else {
			setIsSubmitting(!0);
			try {
				isAutogenerated ? await handleGenerateSubtitles() : await handleAddTrackFromUrl();
			} catch (error) {
				toast.push({
					title: "Failed to add caption track",
					status: "error",
					description: extractErrorMessage(error, "Failed to add caption track")
				});
			} finally {
				setIsSubmitting(!1);
			}
		}
	};
	return /* @__PURE__ */ jsx(Dialog, {
		id: dialogId,
		header: "Add Caption Track",
		onClose,
		width: 1,
		onClickOutside: onClose,
		children: /* @__PURE__ */ jsxs(Stack, {
			padding: 4,
			gap: 4,
			children: [
				/* @__PURE__ */ jsxs(Stack, {
					gap: 2,
					children: [/* @__PURE__ */ jsxs(Flex, {
						align: "center",
						marginBottom: 3,
						children: [/* @__PURE__ */ jsx(Checkbox, {
							id: "autogenerated-checkbox",
							style: { display: "block" },
							checked: isAutogenerated,
							onChange: (e) => {
								setIsAutogenerated(e.currentTarget.checked), e.currentTarget.checked && setVttUrl("");
							},
							disabled: isSubmitting
						}), /* @__PURE__ */ jsx(Flex, {
							flex: 1,
							paddingLeft: 2,
							children: /* @__PURE__ */ jsx(Text, { children: /* @__PURE__ */ jsx("label", {
								htmlFor: "autogenerated-checkbox",
								children: "Generate captions"
							}) })
						})]
					}), !isAutogenerated && /* @__PURE__ */ jsxs(Stack, {
						gap: 2,
						children: [
							/* @__PURE__ */ jsxs(Card, {
								padding: 3,
								marginBottom: 2,
								tone: "transparent",
								border: !0,
								radius: 2,
								children: [/* @__PURE__ */ jsxs(Flex, {
									align: "center",
									justify: "space-between",
									children: [/* @__PURE__ */ jsx(Text, {
										size: 1,
										muted: !0,
										children: selectedFile ? `Selected: ${selectedFile.name}` : "No file selected"
									}), /* @__PURE__ */ jsx(Button, {
										icon: UploadIcon,
										text: "Select File",
										mode: "ghost",
										tone: "primary",
										fontSize: 1,
										padding: 2,
										onClick: () => fileInputRef.current?.click(),
										disabled: isSubmitting
									})]
								}), /* @__PURE__ */ jsx("input", {
									ref: fileInputRef,
									type: "file",
									accept: ".vtt,text/vtt,.srt,application/x-subrip",
									style: { display: "none" },
									onChange: (e) => {
										e.target.files && e.target.files.length > 0 && !isSubmitting && (setSelectedFile(e.target.files[0]), setVttUrl(""));
									}
								})]
							}),
							/* @__PURE__ */ jsx(Text, {
								size: 1,
								muted: !0,
								style: { textAlign: "center" },
								children: "Or enter the caption file URL"
							}),
							/* @__PURE__ */ jsxs(Stack, {
								gap: 2,
								children: [/* @__PURE__ */ jsx(Label, {
									as: "label",
									htmlFor: "vtt-url",
									children: "Caption File URL (.vtt or .srt)"
								}), /* @__PURE__ */ jsx(TextInput, {
									id: "vtt-url",
									placeholder: "https://example.com/subtitles.vtt",
									value: vttUrl,
									onChange: (e) => {
										setVttUrl(e.currentTarget.value), setSelectedFile(null);
									},
									disabled: isSubmitting
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ jsxs(Stack, {
					gap: 2,
					children: [/* @__PURE__ */ jsx(Label, {
						as: "label",
						htmlFor: "caption-name",
						children: "Audio name"
					}), /* @__PURE__ */ jsx(Autocomplete, {
						id: "caption-name",
						value: selectedLanguage?.value || "",
						onChange: (newValue) => {
							let selected = (isAutogenerated ? MUX_LANGUAGE_OPTIONS : LANGUAGE_OPTIONS$1).find((opt) => opt.value === newValue);
							selected && (setSelectedLanguage(selected), setLanguageCode(selected.value), setName(selected.label));
						},
						options: isAutogenerated ? MUX_LANGUAGE_OPTIONS : LANGUAGE_OPTIONS$1,
						icon: TranslateIcon,
						placeholder: "Select language",
						filterOption: (query, option) => option.label.toLowerCase().indexOf(query.toLowerCase()) > -1 || option.value.toLowerCase().indexOf(query.toLowerCase()) > -1,
						openButton: !0,
						renderValue: (value) => (isAutogenerated ? MUX_LANGUAGE_OPTIONS : LANGUAGE_OPTIONS$1).find((l) => l.value === value)?.label || value,
						renderOption: (option) => /* @__PURE__ */ jsx(Card, {
							"data-as": "button",
							padding: 3,
							radius: 2,
							tone: "inherit",
							children: /* @__PURE__ */ jsxs(Text, {
								size: 2,
								textOverflow: "ellipsis",
								children: [
									option.label,
									" (",
									option.value,
									")"
								]
							})
						}),
						disabled: isSubmitting
					})]
				}),
				/* @__PURE__ */ jsxs(Stack, {
					gap: 2,
					children: [/* @__PURE__ */ jsx(Label, {
						as: "label",
						htmlFor: "caption-language",
						children: "Language Code"
					}), /* @__PURE__ */ jsx(TextInput, {
						id: "caption-language",
						placeholder: "en-US",
						value: languageCode,
						onChange: (e) => {
							setLanguageCode(e.currentTarget.value), selectedLanguage && selectedLanguage.value !== e.currentTarget.value && (setSelectedLanguage(null), name && name !== selectedLanguage.label || setName(""));
						},
						disabled: isSubmitting
					})]
				}),
				/* @__PURE__ */ jsxs(Flex, {
					gap: 2,
					justify: "flex-end",
					marginTop: 2,
					children: [/* @__PURE__ */ jsx(Button, {
						text: "Cancel",
						mode: "ghost",
						onClick: onClose,
						disabled: isSubmitting
					}), /* @__PURE__ */ jsx(Button, {
						text: "Add Caption Track",
						tone: "primary",
						icon: isSubmitting ? /* @__PURE__ */ jsx(Spinner, { style: {
							verticalAlign: "middle",
							display: "inline-block",
							marginBottom: "-3px",
							width: "1em",
							height: "1em",
							marginRight: "-6px"
						} }) : /* @__PURE__ */ jsx(UploadIcon, {}),
						onClick: handleSubmit,
						disabled: isSubmitting
					})]
				})
			]
		})
	});
}
const LANGUAGE_OPTIONS = LanguagesList.getAllCodes().map((code) => ({
	value: code,
	label: LanguagesList.getNativeName(code)
}));
function EditCaptionDialog({ asset, track, onUpdate, onClose }) {
	let client = useClient$1(), toast = useToast(), dialogId = `EditCaptionDialog${useId()}`, isAutogenerated = track.text_source === "generated_live" || track.text_source === "generated_live_final" || track.text_source === "generated_vod", [vttUrl, setVttUrl] = useState(""), [languageCode, setLanguageCode] = useState(track.language_code || ""), [selectedLanguage, setSelectedLanguage] = useState(() => {
		let baseCode = track.language_code?.split("-")[0], found = LANGUAGE_OPTIONS.find((opt) => opt.value === track.language_code || opt.value === baseCode);
		if (found) return found;
		if (track.name) {
			let foundByName = LANGUAGE_OPTIONS.find((opt) => opt.label === track.name);
			if (foundByName) return foundByName;
		}
		return null;
	}), [name, setName] = useState(track.name || ""), [isSubmitting, setIsSubmitting] = useState(!1), [downloading, setDownloading] = useState(!1), [selectedFile, setSelectedFile] = useState(null), fileInputRef = useRef(null);
	useEffect(() => {
		setLanguageCode(track.language_code || ""), setName(track.name || ""), setVttUrl("");
		let baseCode = track.language_code?.split("-")[0], foundByCode = LANGUAGE_OPTIONS.find((opt) => opt.value === track.language_code || opt.value === baseCode), foundByName = track.name ? LANGUAGE_OPTIONS.find((opt) => opt.label === track.name) : null;
		setSelectedLanguage(foundByCode || foundByName || null);
	}, [
		track,
		asset,
		client
	]);
	let handleDownloadCurrentFile = async () => {
		setDownloading(!0);
		try {
			await downloadVttFile(client, asset, track);
		} catch (error) {
			let errorMessage = "Please try again", title = "Failed to download VTT file";
			error instanceof Error ? (errorMessage = error.message, error.message.includes("Track") && (title = "Cannot download")) : (error === "Track ID is missing" || error === "Track is not ready yet") && (errorMessage = error, title = "Cannot download"), toast.push({
				title,
				status: "error",
				description: errorMessage
			});
		} finally {
			setDownloading(!1);
		}
	}, getCurrentFileName = () => track.id && asset.filename ? `${asset.filename}-${track.language_code || "en"}.vtt` : `captions-${track.language_code || "en"}.vtt`, uploadVttFile = async (file) => (await client.assets.upload("file", file, { filename: file.name })).url, refreshAssetData = async () => {
		if (asset._id && asset.assetId) try {
			let latestAssetData = await getAsset(client, asset.assetId), dataWithKeys = addKeysToMuxData(latestAssetData.data);
			await client.patch(asset._id).set({
				data: dataWithKeys,
				status: latestAssetData.data.status
			}).commit({ returnDocuments: !1 });
		} catch (refreshError) {
			console.error("Failed to refresh asset data:", refreshError);
		}
	}, handleUpdateTrackWithNewUrl = async () => {
		if (!asset.assetId) throw Error("Asset ID is required");
		let trimmedName = name.trim(), trimmedLanguageCode = languageCode.trim(), oldTrackId = track.id;
		try {
			await deleteTextTrack(client, asset.assetId, oldTrackId);
		} catch (deleteError) {
			throw toast.push({
				title: "Failed to delete old track",
				status: "error",
				description: "Could not delete the old track. Please try again or delete it manually."
			}), setIsSubmitting(!1), deleteError;
		}
		let vttUrlToUse = vttUrl.trim();
		if (selectedFile) try {
			vttUrlToUse = await uploadVttFile(selectedFile);
		} catch (uploadError) {
			throw toast.push({
				title: "Failed to upload VTT file",
				status: "error",
				description: "Could not upload the VTT file to Sanity. Please try again."
			}), setIsSubmitting(!1), uploadError;
		}
		try {
			await addTextTrackFromUrl(client, asset.assetId, vttUrlToUse, {
				language_code: trimmedLanguageCode,
				name: trimmedName,
				text_type: "subtitles"
			});
		} catch (error) {
			throw toast.push({
				title: "Failed to update caption track",
				status: "error",
				description: extractErrorMessage(error, "Failed to update caption track")
			}), setIsSubmitting(!1), error;
		}
		let result = await pollTrackStatus({
			client,
			assetId: asset.assetId,
			trackName: trimmedName,
			trackLanguageCode: trimmedLanguageCode,
			onTrackErrored: async (erroredTrack) => {
				let errorMessage = erroredTrack.error?.messages?.[0] || erroredTrack.error?.type || "The track failed to download from the provided URL";
				toast.push({
					title: "Caption track failed",
					status: "error",
					description: errorMessage
				}), await refreshAssetData(), onUpdate(erroredTrack, oldTrackId), setIsSubmitting(!1);
			}
		});
		!result.found || !result.track ? (toast.push({
			title: "Caption track may have been updated",
			status: "warning",
			description: "The track was updated but its status could not be determined. It may still be processing. Please refresh the page to see if it appears."
		}), setIsSubmitting(!1)) : result.status !== "errored" && (await refreshAssetData(), result.status === "preparing" ? toast.push({
			title: "Caption track is processing",
			status: "info",
			description: "The track was updated and is being processed. It will appear in the list shortly."
		}) : toast.push({
			title: "Caption track updated",
			status: "success",
			description: "Caption track updated successfully"
		}), onUpdate(result.track, oldTrackId), setIsSubmitting(!1));
	}, handleSubmit = async () => {
		if (!name.trim()) toast.push({
			title: "Audio name required",
			status: "error",
			description: "Please enter an audio name for this caption track"
		});
		else if (!languageCode.trim()) toast.push({
			title: "Language code required",
			status: "error",
			description: "Please enter a language code (e.g., en, es, fr)"
		});
		else {
			setIsSubmitting(!0);
			try {
				if (!asset.assetId) throw Error("Asset ID is required");
				let originalVttUrl = (() => {
					if (isAutogenerated || !track.id) return "";
					let playbackId = getPlaybackId(asset);
					if (!playbackId) return "";
					let url = `https://stream.mux.com/${playbackId}/text/${track.id}.vtt`;
					if (getPlaybackPolicy(asset)?.policy === "signed") {
						let token = generateJwt(client, playbackId, "v");
						url += `?token=${token}`;
					}
					return url;
				})(), urlChanged = selectedFile !== null || vttUrl.trim() && vttUrl.trim() !== originalVttUrl;
				if (!urlChanged) {
					toast.push({
						title: "No changes",
						status: "info",
						description: "Please provide a new VTT file or URL using the \"Replace\" button or URL field to update the track."
					}), setIsSubmitting(!1);
					return;
				}
				if (urlChanged) {
					if (!selectedFile && vttUrl.trim()) try {
						new URL(vttUrl.trim());
					} catch {
						toast.push({
							title: "Invalid URL",
							status: "error",
							description: "Please enter a valid URL (e.g., https://example.com/subtitles.vtt)"
						}), setIsSubmitting(!1);
						return;
					}
					if (!selectedFile && !vttUrl.trim()) {
						toast.push({
							title: "VTT file or URL required",
							status: "error",
							description: "Please select a VTT file or enter a VTT file URL"
						}), setIsSubmitting(!1);
						return;
					}
					await handleUpdateTrackWithNewUrl();
				}
				onClose();
			} catch (error) {
				toast.push({
					title: "Failed to update caption track",
					status: "error",
					description: error instanceof Error ? error.message : "Please try again"
				});
			} finally {
				setIsSubmitting(!1);
			}
		}
	};
	return /* @__PURE__ */ jsx(Dialog, {
		id: dialogId,
		header: "Edit Caption Track",
		onClose,
		width: 1,
		onClickOutside: onClose,
		children: /* @__PURE__ */ jsxs(Stack, {
			padding: 4,
			gap: 4,
			children: [
				/* @__PURE__ */ jsxs(Stack, {
					gap: 2,
					children: [/* @__PURE__ */ jsxs(Card, {
						padding: 3,
						marginBottom: 2,
						tone: "transparent",
						border: !0,
						radius: 2,
						children: [
							/* @__PURE__ */ jsxs(Flex, {
								align: "center",
								justify: "space-between",
								children: [/* @__PURE__ */ jsx(Text, { children: getCurrentFileName() }), /* @__PURE__ */ jsxs(Flex, {
									gap: 2,
									children: [track.status !== "errored" && /* @__PURE__ */ jsx(Button, {
										icon: downloading ? /* @__PURE__ */ jsx(Spinner, { style: {
											verticalAlign: "middle",
											display: "inline-block",
											marginTop: "-2px",
											width: "0.5em",
											height: "0.5em"
										} }) : /* @__PURE__ */ jsx(DownloadIcon, {}),
										text: "Download",
										mode: "ghost",
										tone: "primary",
										fontSize: 1,
										padding: 2,
										onClick: handleDownloadCurrentFile,
										disabled: downloading || isSubmitting
									}), /* @__PURE__ */ jsx(Button, {
										icon: UploadIcon,
										text: "Replace",
										mode: "ghost",
										tone: "primary",
										fontSize: 1,
										padding: 2,
										onClick: () => fileInputRef.current?.click(),
										disabled: isSubmitting
									})]
								})]
							}),
							/* @__PURE__ */ jsx("input", {
								ref: fileInputRef,
								type: "file",
								accept: ".vtt,text/vtt",
								style: { display: "none" },
								onChange: (e) => {
									e.target.files && e.target.files.length > 0 && !isSubmitting && (setSelectedFile(e.target.files[0]), setVttUrl(""));
								}
							}),
							selectedFile && /* @__PURE__ */ jsxs(Text, {
								size: 1,
								muted: !0,
								style: { marginTop: 8 },
								children: ["Selected: ", selectedFile.name]
							})
						]
					}), /* @__PURE__ */ jsxs(Stack, {
						gap: 2,
						children: [
							/* @__PURE__ */ jsx(Label, {
								as: "label",
								htmlFor: "vtt-url",
								children: "VTT File URL"
							}),
							/* @__PURE__ */ jsx(TextInput, {
								id: "vtt-url",
								placeholder: "https://example.com/subtitles.vtt",
								value: vttUrl,
								onChange: (e) => {
									setVttUrl(e.currentTarget.value), setSelectedFile(null);
								},
								disabled: isSubmitting
							}),
							/* @__PURE__ */ jsx(Text, {
								size: 1,
								muted: !0,
								children: "Add a URL to replace the existing VTT file with a new one"
							})
						]
					})]
				}),
				/* @__PURE__ */ jsxs(Stack, {
					gap: 2,
					children: [/* @__PURE__ */ jsx(Label, {
						as: "label",
						htmlFor: "caption-name",
						children: "Audio name"
					}), /* @__PURE__ */ jsx(Autocomplete, {
						id: "caption-name",
						value: selectedLanguage?.value || "",
						onChange: (newValue) => {
							let selected = LANGUAGE_OPTIONS.find((opt) => opt.value === newValue);
							selected && (setSelectedLanguage(selected), setLanguageCode(selected.value), setName(selected.label));
						},
						options: LANGUAGE_OPTIONS,
						icon: TranslateIcon,
						placeholder: "Select language",
						filterOption: (query, option) => option.label.toLowerCase().indexOf(query.toLowerCase()) > -1 || option.value.toLowerCase().indexOf(query.toLowerCase()) > -1,
						openButton: !0,
						renderValue: (value) => LANGUAGE_OPTIONS.find((l) => l.value === value)?.label || value,
						renderOption: (option) => /* @__PURE__ */ jsx(Card, {
							"data-as": "button",
							padding: 3,
							radius: 2,
							tone: "inherit",
							children: /* @__PURE__ */ jsxs(Text, {
								size: 2,
								textOverflow: "ellipsis",
								children: [
									option.label,
									" (",
									option.value,
									")"
								]
							})
						}),
						disabled: isSubmitting
					})]
				}),
				/* @__PURE__ */ jsxs(Stack, {
					gap: 2,
					children: [/* @__PURE__ */ jsx(Label, {
						as: "label",
						htmlFor: "caption-language",
						children: "Language Code"
					}), /* @__PURE__ */ jsx(TextInput, {
						id: "caption-language",
						placeholder: "en-US",
						value: languageCode,
						onChange: (e) => {
							setLanguageCode(e.currentTarget.value), selectedLanguage && selectedLanguage.value !== e.currentTarget.value && (setSelectedLanguage(null), name && name !== selectedLanguage.label || setName(""));
						},
						disabled: isSubmitting
					})]
				}),
				/* @__PURE__ */ jsxs(Flex, {
					gap: 2,
					justify: "flex-end",
					marginTop: 2,
					children: [/* @__PURE__ */ jsx(Button, {
						text: "Cancel",
						mode: "ghost",
						onClick: onClose,
						disabled: isSubmitting
					}), /* @__PURE__ */ jsx(Button, {
						text: "Update Caption Track",
						tone: "primary",
						icon: isSubmitting ? /* @__PURE__ */ jsx(Spinner, { style: {
							verticalAlign: "middle",
							display: "inline-block",
							marginBottom: "-3px",
							width: "1em",
							height: "1em",
							marginRight: "-6px"
						} }) : UploadIcon,
						onClick: handleSubmit,
						disabled: isSubmitting
					})]
				})
			]
		})
	});
}
function TrackCard(t0) {
	let $ = c(44), { track, iconOnly, downloadingTrackId, deletingTrackId, trackToEdit, getTrackSourceLabel, handleDownload, setTrackToEdit, setTrackToDelete } = t0, t1;
	$[0] !== deletingTrackId || $[1] !== downloadingTrackId || $[2] !== track.id || $[3] !== trackToEdit?.id ? (t1 = (action) => action === "download" ? downloadingTrackId !== null || deletingTrackId === track.id || trackToEdit?.id === track.id : action === "edit" ? downloadingTrackId === track.id || deletingTrackId === track.id || trackToEdit?.id === track.id : downloadingTrackId === track.id || deletingTrackId !== null || trackToEdit?.id === track.id, $[0] = deletingTrackId, $[1] = downloadingTrackId, $[2] = track.id, $[3] = trackToEdit?.id, $[4] = t1) : t1 = $[4];
	let isDisabled = t1, t2;
	$[5] !== deletingTrackId || $[6] !== downloadingTrackId || $[7] !== handleDownload || $[8] !== iconOnly || $[9] !== isDisabled || $[10] !== setTrackToDelete || $[11] !== setTrackToEdit || $[12] !== track ? (t2 = () => track.status === "preparing" ? /* @__PURE__ */ jsxs(Flex, {
		align: "center",
		gap: 2,
		children: [/* @__PURE__ */ jsx(Spinner, {
			muted: !0,
			style: {
				width: "0.75em",
				height: "0.75em",
				verticalAlign: "middle",
				display: "inline-block",
				marginBottom: "-2px"
			}
		}), /* @__PURE__ */ jsx(Text, {
			size: 1,
			muted: !0,
			children: "Processing..."
		})]
	}) : /* @__PURE__ */ jsxs(Flex, {
		gap: 2,
		children: [
			track.status !== "errored" && /* @__PURE__ */ jsx(Button, {
				icon: downloadingTrackId === track.id ? /* @__PURE__ */ jsx(Spinner, { style: {
					verticalAlign: "middle",
					display: "inline-block",
					marginTop: "-2px",
					width: "0.5em",
					height: "0.5em"
				} }) : /* @__PURE__ */ jsx(DownloadIcon, {}),
				text: iconOnly ? void 0 : "Download",
				mode: "ghost",
				tone: "primary",
				fontSize: 1,
				padding: 2,
				onClick: () => handleDownload(track),
				disabled: isDisabled("download"),
				title: "Download"
			}),
			/* @__PURE__ */ jsx(Button, {
				icon: /* @__PURE__ */ jsx(EditIcon, {}),
				text: iconOnly ? void 0 : "Edit",
				mode: "ghost",
				tone: "primary",
				fontSize: 1,
				padding: 2,
				disabled: isDisabled("edit"),
				onClick: () => setTrackToEdit(track),
				title: "Edit"
			}),
			/* @__PURE__ */ jsx(Button, {
				icon: deletingTrackId === track.id ? /* @__PURE__ */ jsx(Spinner, { style: {
					verticalAlign: "middle",
					display: "inline-block",
					marginTop: "-2px",
					width: "0.5em",
					height: "0.5em"
				} }) : /* @__PURE__ */ jsx(TrashIcon, {}),
				text: iconOnly ? void 0 : "Delete",
				mode: "ghost",
				tone: "critical",
				fontSize: 1,
				padding: 2,
				disabled: isDisabled("delete"),
				onClick: () => setTrackToDelete(track),
				title: "Delete"
			})
		]
	}), $[5] = deletingTrackId, $[6] = downloadingTrackId, $[7] = handleDownload, $[8] = iconOnly, $[9] = isDisabled, $[10] = setTrackToDelete, $[11] = setTrackToEdit, $[12] = track, $[13] = t2) : t2 = $[13];
	let renderActionButtons = t2, t3 = track.status === "errored" ? "caution" : "transparent", t4 = track.name || "Untitled", t5;
	$[14] === t4 ? t5 = $[15] : (t5 = /* @__PURE__ */ jsx(Text, {
		weight: "semibold",
		children: t4
	}), $[14] = t4, $[15] = t5);
	let t6;
	$[16] !== getTrackSourceLabel || $[17] !== track ? (t6 = getTrackSourceLabel(track), $[16] = getTrackSourceLabel, $[17] = track, $[18] = t6) : t6 = $[18];
	let t7;
	$[19] === t6 ? t7 = $[20] : (t7 = /* @__PURE__ */ jsxs(Text, {
		size: 1,
		muted: !0,
		children: [
			"(",
			t6,
			")"
		]
	}), $[19] = t6, $[20] = t7);
	let t8;
	$[21] === track.status ? t8 = $[22] : (t8 = track.status === "errored" && /* @__PURE__ */ jsx(ErrorOutlineIcon, {
		style: { color: "var(--card-critical-color)" },
		"aria-label": "Error",
		fontSize: 20
	}), $[21] = track.status, $[22] = t8);
	let t9;
	$[23] !== t5 || $[24] !== t7 || $[25] !== t8 ? (t9 = /* @__PURE__ */ jsxs(Flex, {
		align: "center",
		gap: 2,
		children: [
			t5,
			t7,
			t8
		]
	}), $[23] = t5, $[24] = t7, $[25] = t8, $[26] = t9) : t9 = $[26];
	let t10;
	$[27] === track.language_code ? t10 = $[28] : (t10 = track.language_code && /* @__PURE__ */ jsxs(Text, {
		size: 1,
		muted: !0,
		children: ["Language: ", track.language_code]
	}), $[27] = track.language_code, $[28] = t10);
	let t11;
	$[29] !== track.error || $[30] !== track.status ? (t11 = track.status === "errored" && track.error && /* @__PURE__ */ jsx(Text, {
		size: 1,
		style: { color: "var(--card-critical-color)" },
		children: track.error.messages?.[0] || track.error.type || "Failed to process track"
	}), $[29] = track.error, $[30] = track.status, $[31] = t11) : t11 = $[31];
	let t12;
	$[32] !== t10 || $[33] !== t11 || $[34] !== t9 ? (t12 = /* @__PURE__ */ jsxs(Stack, {
		gap: 2,
		flex: 1,
		children: [
			t9,
			t10,
			t11
		]
	}), $[32] = t10, $[33] = t11, $[34] = t9, $[35] = t12) : t12 = $[35];
	let t13;
	$[36] === renderActionButtons ? t13 = $[37] : (t13 = renderActionButtons(), $[36] = renderActionButtons, $[37] = t13);
	let t14;
	$[38] !== t12 || $[39] !== t13 ? (t14 = /* @__PURE__ */ jsxs(Flex, {
		align: "center",
		justify: "space-between",
		gap: 3,
		children: [t12, t13]
	}), $[38] = t12, $[39] = t13, $[40] = t14) : t14 = $[40];
	let t15;
	return $[41] !== t14 || $[42] !== t3 ? (t15 = /* @__PURE__ */ jsx(Card, {
		padding: 3,
		radius: 2,
		tone: t3,
		border: !0,
		children: t14
	}), $[41] = t14, $[42] = t3, $[43] = t15) : t15 = $[43], t15;
}
function ChaptersTrackCard(t0) {
	let $ = c(18), { track, isDeleting, onDelete } = t0, t1;
	$[0] === Symbol.for("react.memo_cache_sentinel") ? (t1 = /* @__PURE__ */ jsx(Text, {
		weight: "semibold",
		children: "Chapters"
	}), $[0] = t1) : t1 = $[0];
	let t2 = track.language_code && `Language: ${track.language_code}`, t3;
	$[1] !== t2 || $[2] !== track.name ? (t3 = [track.name, t2].filter(Boolean), $[1] = t2, $[2] = track.name, $[3] = t3) : t3 = $[3];
	let t4 = t3.join(" · "), t5;
	$[4] === t4 ? t5 = $[5] : (t5 = /* @__PURE__ */ jsxs(Stack, {
		gap: 2,
		flex: 1,
		children: [t1, /* @__PURE__ */ jsx(Text, {
			size: 1,
			muted: !0,
			children: t4
		})]
	}), $[4] = t4, $[5] = t5);
	let t6;
	$[6] === isDeleting ? t6 = $[7] : (t6 = isDeleting ? /* @__PURE__ */ jsx(Spinner, { style: {
		width: "0.5em",
		height: "0.5em"
	} }) : /* @__PURE__ */ jsx(TrashIcon, {}), $[6] = isDeleting, $[7] = t6);
	let t7;
	$[8] !== onDelete || $[9] !== track ? (t7 = () => onDelete(track), $[8] = onDelete, $[9] = track, $[10] = t7) : t7 = $[10];
	let t8;
	$[11] !== isDeleting || $[12] !== t6 || $[13] !== t7 ? (t8 = /* @__PURE__ */ jsx(Button, {
		icon: t6,
		mode: "ghost",
		tone: "critical",
		fontSize: 1,
		padding: 2,
		disabled: isDeleting,
		onClick: t7,
		title: "Delete"
	}), $[11] = isDeleting, $[12] = t6, $[13] = t7, $[14] = t8) : t8 = $[14];
	let t9;
	return $[15] !== t5 || $[16] !== t8 ? (t9 = /* @__PURE__ */ jsx(Card, {
		padding: 3,
		radius: 2,
		tone: "transparent",
		border: !0,
		children: /* @__PURE__ */ jsxs(Flex, {
			align: "center",
			justify: "space-between",
			gap: 3,
			children: [t5, t8]
		})
	}), $[15] = t5, $[16] = t8, $[17] = t9) : t9 = $[17], t9;
}
function TextTracksManager({ asset, iconOnly = !1, tracks: propTracks, collapseTracks = !1 }) {
	let client = useClient$1(), toast = useToast(), dialogId = `DeleteCaptionDialog${useId()}`, { resyncAsset } = useResyncAsset(), [downloadingTrackId, setDownloadingTrackId] = useState(null), [deletingTrackId, setDeletingTrackId] = useState(null), [addedTracks, setAddedTracks] = useState([]), [updatedTracks, setUpdatedTracks] = useState(/* @__PURE__ */ new Map()), [trackActivityOrder, setTrackActivityOrder] = useState(/* @__PURE__ */ new Map()), [autogeneratedTrackIds, setAutogeneratedTrackIds] = useState(/* @__PURE__ */ new Set()), [trackToDelete, setTrackToDelete] = useState(null), [trackToEdit, setTrackToEdit] = useState(null), [showAddDialog, setShowAddDialog] = useState(!1), [isExpanded, setIsExpanded] = useState(!1), realTracks = propTracks || asset.data?.tracks?.filter(isCaptionTrack) || [], chaptersTracks = asset.data?.tracks?.filter(isChaptersTrack).filter((track) => !!track.id) || [], activeTracks = realTracks.filter((track) => track.id && (track.status === "ready" || track.status === "preparing" || track.status === "errored")), allTracks = useMemo(() => {
		let tracksWithUpdates = activeTracks.map((track) => updatedTracks.get(track.id) || track), isMockTrackReplaced = (mockTrack, realTracksList) => !mockTrack.id || !mockTrack.id.startsWith("generating-") ? !1 : realTracksList.some((realTrack) => {
			let nameMatches = realTrack.name === mockTrack.name, languageMatches = realTrack.language_code === mockTrack.language_code;
			return !nameMatches || !languageMatches ? !1 : realTrack.status === "ready" ? realTrack.text_source === "generated_live" || realTrack.text_source === "generated_live_final" || realTrack.text_source === "generated_vod" : realTrack.status === "preparing";
		}), isTrackAlreadyInRealTracks = (addedTrack, realTracksList) => addedTrack.id ? addedTrack.id.startsWith("generating-") ? isMockTrackReplaced(addedTrack, realTracksList) : realTracksList.some((realTrack) => realTrack.id === addedTrack.id) : !1, tracksToKeep = addedTracks.filter((addedTrack) => addedTrack.id && addedTrack.id.startsWith("generating-") ? !isMockTrackReplaced(addedTrack, tracksWithUpdates) : !isTrackAlreadyInRealTracks(addedTrack, tracksWithUpdates));
		return [...tracksWithUpdates, ...tracksToKeep];
	}, [
		activeTracks,
		addedTracks,
		updatedTracks
	]);
	useEffect(() => {
		let newAutogeneratedIds = /* @__PURE__ */ new Set();
		activeTracks.forEach((track) => {
			track.id && (track.text_source === "generated_live" || track.text_source === "generated_live_final" || track.text_source === "generated_vod") && newAutogeneratedIds.add(track.id);
		}), addedTracks.forEach((mockTrack) => {
			if (mockTrack.id && mockTrack.id.startsWith("generating-")) {
				let realTrack = activeTracks.find((rt) => {
					let nameMatches = rt.name === mockTrack.name, languageMatches = rt.language_code === mockTrack.language_code;
					return nameMatches && languageMatches;
				});
				realTrack?.id && newAutogeneratedIds.add(realTrack.id);
			}
		}), setAutogeneratedTrackIds((prev) => {
			let hasNew = !1, updated = new Set(prev);
			return newAutogeneratedIds.forEach((id) => {
				prev.has(id) || (updated.add(id), hasNew = !0);
			}), hasNew ? updated : prev;
		});
	}, [activeTracks, addedTracks]), useEffect(() => {
		if (allTracks.filter((track) => track.status === "preparing").length === 0 || !asset.assetId || !asset._id) return;
		let interval = setInterval(async () => {
			try {
				let muxData = await resyncAsset(asset);
				if (!muxData) return;
				let fetchedTracks = muxData.tracks?.filter(isCaptionTrack) || [], isMockTrackReplaced = (mockTrack, fetchedTracksList) => !mockTrack.id || !mockTrack.id.startsWith("generating-") ? !1 : fetchedTracksList.some((realTrack) => {
					let nameMatches = realTrack.name === mockTrack.name, languageMatches = realTrack.language_code === mockTrack.language_code;
					return !nameMatches || !languageMatches ? !1 : realTrack.status === "ready" ? realTrack.text_source === "generated_live" || realTrack.text_source === "generated_live_final" || realTrack.text_source === "generated_vod" : realTrack.status === "preparing";
				}), newAutogeneratedIds = /* @__PURE__ */ new Set();
				fetchedTracks.forEach((track) => {
					track.id && (track.text_source === "generated_live" || track.text_source === "generated_live_final" || track.text_source === "generated_vod") && newAutogeneratedIds.add(track.id);
				});
				let findMatchingRealTrack = (mockTrack, tracksList) => tracksList.find((rt) => {
					let nameMatches = rt.name === mockTrack.name, languageMatches = rt.language_code === mockTrack.language_code;
					return nameMatches && languageMatches;
				});
				setAddedTracks((prev) => prev.filter((mockTrack) => {
					if (mockTrack.id && mockTrack.id.startsWith("generating-")) {
						let replaced = isMockTrackReplaced(mockTrack, fetchedTracks);
						if (replaced) {
							let realTrack = findMatchingRealTrack(mockTrack, fetchedTracks);
							realTrack?.id && (newAutogeneratedIds.add(realTrack.id), setTrackActivityOrder((prevOrder) => {
								let mockOrder = prevOrder.get(mockTrack.id);
								if (mockOrder) {
									let newMap = new Map(prevOrder);
									return newMap.set(realTrack.id, mockOrder), newMap;
								}
								return prevOrder;
							}));
						}
						return !replaced;
					}
					return !0;
				})), newAutogeneratedIds.size > 0 && setAutogeneratedTrackIds((prevIds) => {
					let updated = new Set(prevIds);
					return newAutogeneratedIds.forEach((id) => updated.add(id)), updated;
				});
			} catch (error) {
				console.error("Failed to refresh asset data:", error);
			}
		}, 3e3);
		return () => clearInterval(interval);
	}, [
		allTracks,
		asset,
		resyncAsset
	]);
	let visibleTracks = allTracks.filter((track) => track.status === "ready" || track.status === "preparing" || track.status === "errored").sort((a, b) => {
		let orderA = trackActivityOrder.get(a.id) || 0, orderB = trackActivityOrder.get(b.id) || 0;
		if (orderA > 0 && orderB > 0) return orderB - orderA;
		if (orderA > 0) return -1;
		if (orderB > 0) return 1;
		let aIsPreparing = a.status === "preparing", bIsPreparing = b.status === "preparing";
		if (aIsPreparing && !bIsPreparing) return -1;
		if (!aIsPreparing && bIsPreparing) return 1;
		let aIsAutogenerated = a.id && a.id.startsWith("generating-") || a.id && autogeneratedTrackIds.has(a.id), bIsAutogenerated = b.id && b.id.startsWith("generating-") || b.id && autogeneratedTrackIds.has(b.id);
		return aIsAutogenerated && !bIsAutogenerated ? -1 : !aIsAutogenerated && bIsAutogenerated ? 1 : 0;
	}), handleDownload = async (track) => {
		if (track.id) {
			setDownloadingTrackId(track.id);
			try {
				await downloadVttFile(client, asset, track);
			} catch (error) {
				toast.push({
					title: "Failed to download VTT file",
					status: "error",
					description: error instanceof Error ? error.message : "Please try again"
				});
			} finally {
				setDownloadingTrackId(null);
			}
		}
	}, confirmDelete = async () => {
		if (!trackToDelete || !trackToDelete.id) return;
		let track = trackToDelete;
		setTrackToDelete(null), setDeletingTrackId(track.id);
		try {
			if (!asset.assetId) throw Error("Asset ID is required");
			await deleteTextTrack(client, asset.assetId, track.id), await resyncAsset(asset), toast.push({
				title: `Successfully deleted ${isChaptersTrack(track) ? "chapters" : "caption"} track`,
				status: "success"
			}), setAddedTracks((prev) => prev.filter((t) => t.id !== track.id)), setUpdatedTracks((prev) => {
				let newMap = new Map(prev);
				return newMap.delete(track.id), newMap;
			}), setTrackActivityOrder((prev) => {
				let newMap = new Map(prev);
				return newMap.delete(track.id), newMap;
			}), setAutogeneratedTrackIds((prev) => {
				let updated = new Set(prev);
				return updated.delete(track.id), updated;
			});
		} catch (error) {
			toast.push({
				title: `Failed to delete ${isChaptersTrack(track) ? "chapters" : "caption"} track`,
				status: "error",
				description: error instanceof Error ? error.message : "Please try again"
			});
		} finally {
			setDeletingTrackId(null);
		}
	}, handleAddTrack = (track) => {
		setAddedTracks((prev) => [...prev, track]), setTrackActivityOrder((prev) => {
			let newMap = new Map(prev);
			return newMap.set(track.id, prev.size + 1), newMap;
		}), setShowAddDialog(!1);
	}, handleUpdateTrack = async (updatedTrack, oldTrackId) => {
		oldTrackId && (setAddedTracks((prev) => prev.filter((t) => t.id !== oldTrackId)), setUpdatedTracks((prev) => {
			let newMap = new Map(prev);
			return newMap.delete(oldTrackId), newMap;
		}), setTrackActivityOrder((prev) => {
			let newMap = new Map(prev);
			return newMap.delete(oldTrackId), newMap;
		}), setAutogeneratedTrackIds((prev) => {
			let updated = new Set(prev);
			return updated.delete(oldTrackId), updated;
		})), addedTracks.some((t) => t.id === updatedTrack.id) ? setAddedTracks((prev) => prev.map((t) => t.id === updatedTrack.id ? updatedTrack : t)) : setUpdatedTracks((prev) => {
			let newMap = new Map(prev);
			return newMap.set(updatedTrack.id, updatedTrack), newMap;
		}), setTrackActivityOrder((prev) => {
			let newMap = new Map(prev);
			return newMap.set(updatedTrack.id, prev.size + 1), newMap;
		}), setTrackToEdit(null), await resyncAsset(asset);
	}, getTrackSourceLabel = (track) => track.id && track.id.startsWith("generating-") || track.id && autogeneratedTrackIds.has(track.id) || track.text_source === "generated_live_final" || track.text_source === "generated_live" || track.text_source === "generated_vod" ? "Auto-generated" : track.text_source === "uploaded" ? "Uploaded" : "Custom", deleteDialog = trackToDelete && /* @__PURE__ */ jsx(Dialog, {
		animate: !0,
		id: dialogId,
		header: "Delete track",
		onClose: () => setTrackToDelete(null),
		onClickOutside: () => setTrackToDelete(null),
		width: 1,
		children: /* @__PURE__ */ jsx(Card, {
			padding: 3,
			style: {
				minHeight: "150px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center"
			},
			children: /* @__PURE__ */ jsxs(Stack, {
				gap: 3,
				children: [
					/* @__PURE__ */ jsxs(Heading, {
						size: 2,
						children: [
							"Are you sure you want to delete \"",
							trackToDelete.name || trackToDelete.language_code || "Untitled",
							"\"?"
						]
					}),
					/* @__PURE__ */ jsx(Text, {
						size: 2,
						children: "This action is irreversible"
					}),
					/* @__PURE__ */ jsx(Stack, {
						gap: 4,
						marginY: 4,
						children: /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Button, {
							icon: deletingTrackId === trackToDelete.id ? /* @__PURE__ */ jsx(Spinner, { style: {
								verticalAlign: "middle",
								display: "inline-block",
								marginTop: "-2px",
								width: "0.5em",
								height: "0.5em"
							} }) : /* @__PURE__ */ jsx(TrashIcon, {}),
							fontSize: 2,
							padding: 3,
							text: "Delete track",
							tone: "critical",
							onClick: confirmDelete,
							disabled: deletingTrackId !== null
						}) })
					})
				]
			})
		})
	}), chaptersList = chaptersTracks.map((track) => /* @__PURE__ */ jsx(ChaptersTrackCard, {
		track,
		isDeleting: deletingTrackId === track.id,
		onDelete: setTrackToDelete
	}, track.id));
	if (visibleTracks.length === 0 && !showAddDialog) return /* @__PURE__ */ jsxs(Stack, {
		gap: 3,
		children: [
			/* @__PURE__ */ jsx(Flex, {
				justify: "flex-end",
				children: /* @__PURE__ */ jsx(Button, {
					icon: AddIcon,
					text: "Add Caption",
					tone: "primary",
					onClick: () => setShowAddDialog(!0)
				})
			}),
			/* @__PURE__ */ jsx(Card, {
				padding: 4,
				radius: 2,
				tone: "transparent",
				border: !0,
				children: /* @__PURE__ */ jsx(Text, {
					size: 1,
					muted: !0,
					children: "No captions available. Add captions when uploading a video or add them manually."
				})
			}),
			chaptersList,
			deleteDialog,
			showAddDialog && /* @__PURE__ */ jsx(AddCaptionDialog, {
				asset,
				onAdd: handleAddTrack,
				onClose: () => setShowAddDialog(!1)
			})
		]
	});
	let displayedTracks = collapseTracks && !isExpanded ? visibleTracks.slice(0, 4) : visibleTracks, hasMoreTracks = collapseTracks && visibleTracks.length > 4;
	return /* @__PURE__ */ jsxs(Stack, {
		gap: 3,
		children: [
			/* @__PURE__ */ jsx(Flex, {
				justify: "flex-end",
				children: /* @__PURE__ */ jsx(Button, {
					icon: AddIcon,
					text: "Add Caption",
					tone: "primary",
					onClick: () => setShowAddDialog(!0)
				})
			}),
			displayedTracks.map((track) => /* @__PURE__ */ jsx(TrackCard, {
				track,
				iconOnly,
				downloadingTrackId,
				deletingTrackId,
				trackToEdit,
				getTrackSourceLabel,
				handleDownload,
				setTrackToEdit,
				setTrackToDelete
			}, track.id)),
			chaptersList,
			hasMoreTracks && /* @__PURE__ */ jsx(Flex, {
				justify: "center",
				children: /* @__PURE__ */ jsx(Button, {
					icon: isExpanded ? ChevronUpIcon : ChevronDownIcon,
					text: isExpanded ? "Show less" : `Show ${visibleTracks.length - 4} more`,
					mode: "ghost",
					tone: "primary",
					onClick: () => setIsExpanded(!isExpanded)
				})
			}),
			deleteDialog,
			showAddDialog && /* @__PURE__ */ jsx(AddCaptionDialog, {
				asset,
				onAdd: handleAddTrack,
				onClose: () => setShowAddDialog(!1)
			}),
			trackToEdit && /* @__PURE__ */ jsx(EditCaptionDialog, {
				asset,
				track: trackToEdit,
				onUpdate: handleUpdateTrack,
				onClose: () => setTrackToEdit(null)
			})
		]
	});
}
/**
* May throw a Promise. Call this with {@link tryWithSuspend} or rethrow the Promise
*/
function getVideoSrc({ client, muxPlaybackId }) {
	let searchParams = new URLSearchParams();
	if (muxPlaybackId.policy === "signed" || muxPlaybackId.policy === "drm") {
		let token = generateJwt(client, muxPlaybackId.id, "v");
		searchParams.set("token", token);
	}
	return `https://stream.mux.com/${muxPlaybackId.id}.m3u8?${searchParams}`;
}
function AudioTracksDialog(t0) {
	let $ = c(8), { asset } = t0, { setDialogState } = useDialogStateContext(), dialogId = `AudioTracksDialog${useId()}`, t1;
	$[0] === setDialogState ? t1 = $[1] : (t1 = () => setDialogState(!1), $[0] = setDialogState, $[1] = t1);
	let t2;
	$[2] === asset ? t2 = $[3] : (t2 = /* @__PURE__ */ jsx(Stack, {
		padding: 4,
		children: /* @__PURE__ */ jsx(AudioTracksManager, { asset })
	}), $[2] = asset, $[3] = t2);
	let t3;
	return $[4] !== dialogId || $[5] !== t1 || $[6] !== t2 ? (t3 = /* @__PURE__ */ jsx(Dialog, {
		id: dialogId,
		header: "Edit Audio Tracks",
		onClose: t1,
		width: 1,
		children: t2
	}), $[4] = dialogId, $[5] = t1, $[6] = t2, $[7] = t3) : t3 = $[7], t3;
}
function CaptionsDialog(t0) {
	let $ = c(8), { asset } = t0, { setDialogState } = useDialogStateContext(), dialogId = `CaptionsDialog${useId()}`, t1;
	$[0] === setDialogState ? t1 = $[1] : (t1 = () => setDialogState(!1), $[0] = setDialogState, $[1] = t1);
	let t2;
	$[2] === asset ? t2 = $[3] : (t2 = /* @__PURE__ */ jsx(Stack, {
		padding: 4,
		children: /* @__PURE__ */ jsx(TextTracksManager, { asset })
	}), $[2] = asset, $[3] = t2);
	let t3;
	return $[4] !== dialogId || $[5] !== t1 || $[6] !== t2 ? (t3 = /* @__PURE__ */ jsx(Dialog, {
		id: dialogId,
		header: "Edit Captions",
		onClose: t1,
		width: 1,
		children: t2
	}), $[4] = dialogId, $[5] = t1, $[6] = t2, $[7] = t3) : t3 = $[7], t3;
}
function EditThumbnailDialog(t0) {
	let $ = c(38), { asset, currentTime: t1 } = t0, currentTime = t1 === void 0 ? 0 : t1, client = useClient$1(), { setDialogState } = useDialogStateContext(), dialogId = `EditThumbnailDialog${useId()}`, t2;
	$[0] === currentTime ? t2 = $[1] : (t2 = () => formatSecondsToHHMMSS(currentTime), $[0] = currentTime, $[1] = t2);
	let [timeFormatted, setTimeFormatted] = useState(t2), [nextTime, setNextTime] = useState(currentTime), [inputError, setInputError] = useState(""), t3;
	$[2] !== asset || $[3] !== nextTime ? (t3 = {
		...asset,
		thumbTime: nextTime
	}, $[2] = asset, $[3] = nextTime, $[4] = t3) : t3 = $[4];
	let assetWithNewThumbnail = t3, [saving, setSaving] = useState(!1), [saveThumbnailError, setSaveThumbnailError] = useState(null), t4;
	$[5] !== asset._id || $[6] !== client || $[7] !== nextTime || $[8] !== setDialogState ? (t4 = () => {
		setSaving(!0), client.patch(asset._id).set({ thumbTime: nextTime }).commit({ returnDocuments: !1 }).then(() => setDialogState(!1)).catch(setSaveThumbnailError).finally(() => setSaving(!1));
	}, $[5] = asset._id, $[6] = client, $[7] = nextTime, $[8] = setDialogState, $[9] = t4) : t4 = $[9];
	let handleSave = t4, t5;
	$[10] === Symbol.for("react.memo_cache_sentinel") ? (t5 = getDevicePixelRatio({ maxDpr: 2 }), $[10] = t5) : t5 = $[10];
	let width = 300 * t5;
	if (saveThumbnailError) throw saveThumbnailError;
	let t6;
	$[11] === Symbol.for("react.memo_cache_sentinel") ? (t6 = (event) => {
		let value = event.currentTarget.value;
		if (setTimeFormatted(value), isValidTimeFormat(value)) {
			setInputError("");
			let totalSeconds = getSecondsFromTimeFormat(value);
			setNextTime(totalSeconds);
		} else setInputError("Invalid time format");
	}, $[11] = t6) : t6 = $[11];
	let handleInputChange = t6, t7;
	$[12] === setDialogState ? t7 = $[13] : (t7 = () => setDialogState(!1), $[12] = setDialogState, $[13] = t7);
	let t8 = inputError !== "", t9;
	$[14] !== handleSave || $[15] !== saving || $[16] !== t8 ? (t9 = /* @__PURE__ */ jsx(Stack, {
		padding: 3,
		children: /* @__PURE__ */ jsx(Button, {
			disabled: t8,
			mode: "ghost",
			tone: "primary",
			loading: saving,
			onClick: handleSave,
			text: "Set new thumbnail"
		}, "thumbnail")
	}), $[14] = handleSave, $[15] = saving, $[16] = t8, $[17] = t9) : t9 = $[17];
	let t10;
	$[18] === Symbol.for("react.memo_cache_sentinel") ? (t10 = /* @__PURE__ */ jsx(Text, {
		size: 1,
		weight: "semibold",
		children: "Current:"
	}), $[18] = t10) : t10 = $[18];
	let t11;
	$[19] === asset ? t11 = $[20] : (t11 = /* @__PURE__ */ jsxs(Stack, {
		gap: 2,
		children: [t10, /* @__PURE__ */ jsx(VideoThumbnail, {
			asset,
			width,
			staticImage: !0
		})]
	}), $[19] = asset, $[20] = t11);
	let t12;
	$[21] === Symbol.for("react.memo_cache_sentinel") ? (t12 = /* @__PURE__ */ jsx(Text, {
		size: 1,
		weight: "semibold",
		children: "New:"
	}), $[21] = t12) : t12 = $[21];
	let t13;
	$[22] === assetWithNewThumbnail ? t13 = $[23] : (t13 = /* @__PURE__ */ jsxs(Stack, {
		gap: 2,
		children: [t12, /* @__PURE__ */ jsx(VideoThumbnail, {
			asset: assetWithNewThumbnail,
			width,
			staticImage: !0
		})]
	}), $[22] = assetWithNewThumbnail, $[23] = t13);
	let t14;
	$[24] === Symbol.for("react.memo_cache_sentinel") ? (t14 = /* @__PURE__ */ jsx(Stack, {
		gap: 2,
		children: /* @__PURE__ */ jsx(Flex, {
			align: "center",
			justify: "center",
			children: /* @__PURE__ */ jsx(Text, {
				size: 5,
				weight: "semibold",
				children: "Or"
			})
		})
	}), $[24] = t14) : t14 = $[24];
	let t15;
	$[25] === Symbol.for("react.memo_cache_sentinel") ? (t15 = /* @__PURE__ */ jsx(Text, {
		size: 1,
		weight: "semibold",
		children: "Selected time for thumbnail (hh:mm:ss):"
	}), $[25] = t15) : t15 = $[25];
	let t16;
	$[26] !== inputError || $[27] !== timeFormatted ? (t16 = /* @__PURE__ */ jsxs(Stack, {
		gap: 2,
		children: [t15, /* @__PURE__ */ jsx(TextInput, {
			size: 1,
			value: timeFormatted,
			placeholder: "hh:mm:ss",
			onChange: handleInputChange,
			customValidity: inputError
		})]
	}), $[26] = inputError, $[27] = timeFormatted, $[28] = t16) : t16 = $[28];
	let t17;
	$[29] !== t11 || $[30] !== t13 || $[31] !== t16 ? (t17 = /* @__PURE__ */ jsxs(Stack, {
		gap: 3,
		padding: 3,
		children: [
			t11,
			t13,
			t14,
			t16
		]
	}), $[29] = t11, $[30] = t13, $[31] = t16, $[32] = t17) : t17 = $[32];
	let t18;
	return $[33] !== dialogId || $[34] !== t17 || $[35] !== t7 || $[36] !== t9 ? (t18 = /* @__PURE__ */ jsx(Dialog, {
		id: dialogId,
		header: "Edit thumbnail",
		onClose: t7,
		footer: t9,
		children: t17
	}), $[33] = dialogId, $[34] = t17, $[35] = t7, $[36] = t9, $[37] = t18) : t18 = $[37], t18;
}
function AudioIcon(props) {
	let $ = c(3), t0;
	$[0] === Symbol.for("react.memo_cache_sentinel") ? (t0 = /* @__PURE__ */ jsx("path", {
		fill: "currentColor",
		style: { opacity: "0.65" },
		d: "M10.75 19q.95 0 1.6-.65t.65-1.6V13h3v-2h-4v3.875q-.275-.2-.587-.288t-.663-.087q-.95 0-1.6.65t-.65 1.6t.65 1.6t1.6.65M6 22q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h8l6 6v12q0 .825-.587 1.413T18 22zm7-13V4H6v16h12V9zM6 4v5zv16z"
	}), $[0] = t0) : t0 = $[0];
	let t1;
	return $[1] === props ? t1 = $[2] : (t1 = /* @__PURE__ */ jsx("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "1em",
		height: "1em",
		viewBox: "0 0 24 24",
		...props,
		children: t0
	}), $[1] = props, $[2] = t1), t1;
}
/**
* Player actions menu entry point: the explanation in the dialog body (until the
* file is enabled) with the {@link Mezzanine} card below for the action/status.
*/
function MezzanineDialog(t0) {
	let $ = c(16), { asset, onClose } = t0, { setDialogState } = useDialogStateContext(), dialogId = `MezzanineDialog${useId()}`, t1;
	$[0] !== onClose || $[1] !== setDialogState ? (t1 = () => {
		onClose?.(), setDialogState(!1);
	}, $[0] = onClose, $[1] = setDialogState, $[2] = t1) : t1 = $[2];
	let closing = t1, t2;
	$[3] === asset ? t2 = $[4] : (t2 = getMezzanineStatus(asset), $[3] = asset, $[4] = t2);
	let status = t2, showExplanation = status !== "preparing" && status !== "ready", t3;
	$[5] === showExplanation ? t3 = $[6] : (t3 = showExplanation && /* @__PURE__ */ jsx(MezzanineExplanation, {}), $[5] = showExplanation, $[6] = t3);
	let t4;
	$[7] === asset ? t4 = $[8] : (t4 = /* @__PURE__ */ jsx(Mezzanine, {
		asset,
		withExplanation: !1
	}), $[7] = asset, $[8] = t4);
	let t5;
	$[9] !== t3 || $[10] !== t4 ? (t5 = /* @__PURE__ */ jsx(Box, {
		padding: 4,
		children: /* @__PURE__ */ jsxs(Stack, {
			gap: 4,
			children: [t3, t4]
		})
	}), $[9] = t3, $[10] = t4, $[11] = t5) : t5 = $[11];
	let t6;
	return $[12] !== closing || $[13] !== dialogId || $[14] !== t5 ? (t6 = /* @__PURE__ */ jsx(Dialog, {
		id: dialogId,
		header: "Mezzanine file",
		onClose: closing,
		zOffset: DIALOGS_Z_INDEX,
		width: 1,
		children: t5
	}), $[12] = closing, $[13] = dialogId, $[14] = t5, $[15] = t6) : t6 = $[15], t6;
}
/**
* The policies a new playback ID can get with these secrets, the default first: signed when
* signing keys are set up, since a public ID would expose a video meant to be protected.
*/
function playbackPoliciesFor(secrets) {
	return [
		...secrets.enableSignedUrls ? ["signed"] : [],
		"public",
		...secrets.drmConfigId ? ["drm"] : []
	];
}
const POLICY_LABELS = {
	public: "Public",
	signed: "Signed",
	drm: "DRM"
};
function DashboardFallback() {
	let $ = c(1), t0;
	return $[0] === Symbol.for("react.memo_cache_sentinel") ? (t0 = /* @__PURE__ */ jsxs(Text, {
		size: 1,
		muted: !0,
		children: [
			"Add a playback ID to this asset in the",
			" ",
			/* @__PURE__ */ jsx("a", {
				href: "https://dashboard.mux.com",
				target: "_blank",
				rel: "noopener noreferrer",
				children: "Mux dashboard"
			}),
			", then resync the video."
		]
	}), $[0] = t0) : t0 = $[0], t0;
}
/** Outside the component: React Compiler doesn't compile `try`/`finally`. */
async function createAndResync(run) {
	try {
		return { toast: await run() ? {
			status: "success",
			title: "Playback ID created"
		} : {
			status: "warning",
			title: "Playback ID created",
			description: "Resync the video to play it here."
		} };
	} catch (error) {
		return {
			isRouteMissing: error instanceof RobotsRequestError && error.status === 404 && !error.muxAnswered,
			toast: {
				status: "error",
				title: "Could not create a playback ID",
				...error instanceof Error && { description: error.message }
			}
		};
	}
}
/** Shown in place of the player. Robots `moderate` can delete every playback ID. */
function NoPlaybackIdNotice(t0) {
	let $ = c(14), { asset, readOnly } = t0, client = useClient$1(), toast = useToast(), { secrets } = useSecretsDocumentValues().value, { resyncAsset } = useResyncAsset(), policies = playbackPoliciesFor(secrets), [chosenPolicy, setChosenPolicy] = useState(), policy = chosenPolicy && policies.includes(chosenPolicy) ? chosenPolicy : policies[0], [isCreating, setIsCreating] = useState(!1), [isRouteMissing, setIsRouteMissing] = useState(!1), create = async () => {
		let { assetId } = asset;
		if (!assetId) return;
		setIsCreating(!0);
		let outcome = await createAndResync(() => createPlaybackId(client, assetId, policy, secrets.drmConfigId ?? void 0).then(() => resyncAsset(asset)));
		setIsCreating(!1), outcome.isRouteMissing && setIsRouteMissing(!0), toast.push(outcome.toast);
	}, T0 = Flex, t4;
	$[0] === Symbol.for("react.memo_cache_sentinel") ? (t4 = {
		position: "absolute",
		inset: 0,
		overflow: "auto"
	}, $[0] = t4) : t4 = $[0];
	let T1 = Stack, t6;
	$[1] === Symbol.for("react.memo_cache_sentinel") ? (t6 = { maxWidth: "30rem" }, $[1] = t6) : t6 = $[1];
	let t7, t8;
	$[2] === Symbol.for("react.memo_cache_sentinel") ? (t7 = /* @__PURE__ */ jsxs(Text, {
		size: 1,
		weight: "semibold",
		children: [/* @__PURE__ */ jsx(WarningOutlineIcon, { style: { marginRight: "0.25em" } }), "This video has no playback ID"]
	}), t8 = /* @__PURE__ */ jsx(Text, {
		size: 1,
		muted: !0,
		children: "It can’t play here or wherever it’s embedded. Robots Moderate deletes playback IDs when it flags content, and they can also be removed in Mux."
	}), $[2] = t7, $[3] = t8) : (t7 = $[2], t8 = $[3]);
	let t9 = readOnly || isRouteMissing ? /* @__PURE__ */ jsx(DashboardFallback, {}) : /* @__PURE__ */ jsxs(Flex, {
		gap: 2,
		align: "center",
		wrap: "wrap",
		children: [/* @__PURE__ */ jsx(Box, {
			flex: 1,
			children: /* @__PURE__ */ jsx(Select, {
				"aria-label": "Policy of the new playback ID",
				fontSize: 1,
				padding: 2,
				value: policy,
				disabled: isCreating,
				onChange: (event) => setChosenPolicy(event.currentTarget.value),
				children: policies.map(_temp$6)
			})
		}), /* @__PURE__ */ jsx(Button, {
			text: "Create playback ID",
			tone: "primary",
			fontSize: 1,
			padding: 2,
			loading: isCreating,
			disabled: !asset.assetId,
			onClick: () => void create()
		})]
	}), t10;
	$[4] !== T1 || $[5] !== t6 || $[6] !== t7 || $[7] !== t8 || $[8] !== t9 ? (t10 = /* @__PURE__ */ jsxs(T1, {
		gap: 3,
		style: t6,
		children: [
			t7,
			t8,
			t9
		]
	}), $[4] = T1, $[5] = t6, $[6] = t7, $[7] = t8, $[8] = t9, $[9] = t10) : t10 = $[9];
	let t11;
	return $[10] !== T0 || $[11] !== t10 || $[12] !== t4 ? (t11 = /* @__PURE__ */ jsx(T0, {
		align: "center",
		justify: "center",
		padding: 4,
		style: t4,
		children: t10
	}), $[10] = T0, $[11] = t10, $[12] = t4, $[13] = t11) : t11 = $[13], t11;
}
function _temp$6(option) {
	return /* @__PURE__ */ jsx("option", {
		value: option,
		children: POLICY_LABELS[option]
	}, option);
}
const PlayButton = styled.button.withConfig({
	displayName: "PlayButton",
	componentId: "sc-tgoccf-0"
})`display:block;padding:0;margin:0;border:none;border-radius:0.1875rem;position:relative;cursor:pointer;&::after{content:'';background:var(--card-fg-color);opacity:0;display:block;position:absolute;inset:0;z-index:10;transition:0.15s ease-out;border-radius:inherit;}> div[data-play]{z-index:11;opacity:0;transition:0.15s 0.05s ease-out;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);color:var(--card-fg-color);background:var(--card-bg-color);width:auto;height:30%;aspect-ratio:1;border-radius:100%;display:flex;justify-content:center;align-items:center;box-sizing:border-box;> svg{display:block;width:70%;height:auto;transform:translateX(5%);}}&:hover,&:focus{&::after{opacity:0.3;}> div[data-play]{opacity:1;}}`;
function VideoPlayer({ asset, thumbnailWidth = 250, children, hlsConfig, deferPlayer = !1, readOnly, ...props }) {
	let client = useClient$1(), { dialogState } = useDialogStateContext(), isAudio = assetIsAudio(asset), muxPlayer = useRef(null), playerContainerRef = useRef(null), [error, setError] = useState(), [playerRequested, setPlayerRequested] = useState(!1), showPlayer = !deferPlayer || playerRequested, hasPlaybackIds = !!asset.data?.playback_ids?.length, playbackId = hasPlaybackIds ? getPlaybackId(asset, [
		"public",
		"signed",
		"drm"
	]) : void 0, policy = playbackId ? getPlaybackPolicyById(asset, playbackId)?.policy : void 0, src = useMemo(() => {
		if (playbackId && policy) return tryWithSuspend(() => getVideoSrc({
			muxPlaybackId: {
				id: playbackId,
				policy
			},
			client
		}), (e) => {
			setError(e);
		});
	}, [
		playbackId,
		policy,
		client
	]), poster = useMemo(() => {
		if (hasPlaybackIds) return tryWithSuspend(() => getPosterSrc({
			asset,
			client,
			width: thumbnailWidth
		}), (e) => {
			setError(e);
		});
	}, [
		asset,
		client,
		thumbnailWidth,
		hasPlaybackIds
	]), signedToken = useMemo(() => {
		try {
			return new URL(src).searchParams.get("token");
		} catch {
			return;
		}
	}, [src]), drmToken = useMemo(() => {
		if (playbackId && policy === "drm") return tryWithSuspend(() => generateJwt(client, playbackId, "d"), (e) => {
			setError(e);
		});
	}, [
		client,
		policy,
		playbackId
	]), tokens = useMemo(() => {
		try {
			let partialTokens = {
				playback: void 0,
				thumbnail: void 0,
				storyboard: void 0,
				drm: void 0
			};
			return signedToken && (partialTokens.playback = signedToken, partialTokens.thumbnail = signedToken, partialTokens.storyboard = signedToken), drmToken && (partialTokens.drm = drmToken), { ...partialTokens };
		} catch {
			return;
		}
	}, [signedToken, drmToken]), [width, height] = (asset?.data?.aspect_ratio ?? "16:9").split(":").map(Number), targetAspectRatio = props.forceAspectRatio || (Number.isNaN(width) ? 16 / 9 : width / height), aspectRatio = Math.max(1.25, targetAspectRatio);
	return isAudio && (aspectRatio = props.forceAspectRatio ? props.forceAspectRatio * 1.2 : 5), /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs(Card, {
			ref: playerContainerRef,
			tone: "transparent",
			style: {
				aspectRatio,
				position: "relative",
				...isAudio && {
					display: "flex",
					alignItems: "flex-end"
				}
			},
			children: [
				src && poster && /* @__PURE__ */ jsxs(Fragment, { children: [isAudio && /* @__PURE__ */ jsx(AudioIcon, { style: {
					padding: "0.5em",
					width: "2.2em",
					height: "2.2em",
					position: "absolute",
					top: 0,
					left: 0,
					zIndex: 1
				} }), showPlayer ? /* @__PURE__ */ jsxs(Suspense, {
					fallback: null,
					children: [/* @__PURE__ */ jsx(MuxPlayer, {
						poster: isAudio ? void 0 : poster,
						ref: muxPlayer,
						...props,
						autoPlay: deferPlayer || props.autoPlay,
						playsInline: !0,
						playbackId,
						tokens,
						preload: "metadata",
						crossOrigin: "anonymous",
						metadata: {
							player_name: "Sanity Admin Dashboard",
							player_version: "5.2.1",
							page_type: "Preview Player"
						},
						audio: isAudio,
						_hlsConfig: hlsConfig,
						style: {
							...!isAudio && { height: "100%" },
							width: "100%",
							display: "block",
							objectFit: "contain",
							...isAudio && { alignSelf: "end" }
						}
					}, readyTracksKey(asset.data?.tracks)), children]
				}) : /* @__PURE__ */ jsxs(PlayButton, {
					type: "button",
					"aria-label": isAudio ? "Play audio" : "Play video",
					onClick: () => setPlayerRequested(!0),
					style: {
						position: "absolute",
						inset: 0,
						width: "100%",
						height: "100%",
						zIndex: 0
					},
					children: [!isAudio && /* @__PURE__ */ jsx("img", {
						src: poster,
						alt: "",
						style: {
							width: "100%",
							height: "100%",
							display: "block",
							objectFit: "contain"
						}
					}), /* @__PURE__ */ jsx("div", {
						"data-play": !0,
						style: { opacity: 1 },
						children: /* @__PURE__ */ jsx(PlayIcon, {})
					})]
				})] }),
				!hasPlaybackIds && /* @__PURE__ */ jsx(NoPlaybackIdNotice, {
					asset,
					readOnly
				}),
				error ? /* @__PURE__ */ jsx("div", {
					style: {
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)"
					},
					children: /* @__PURE__ */ jsxs(Text, {
						muted: !0,
						children: [/* @__PURE__ */ jsx(ErrorOutlineIcon, { style: { marginRight: "0.15em" } }), typeof error == "object" && "message" in error && typeof error.message == "string" ? error.message : "Error loading video"]
					})
				}) : null,
				children
			]
		}),
		dialogState === "edit-thumbnail" && /* @__PURE__ */ jsx(EditThumbnailDialog, {
			asset,
			currentTime: muxPlayer?.current?.currentTime
		}),
		dialogState === "edit-captions" && /* @__PURE__ */ jsx(CaptionsDialog, { asset }),
		dialogState === "mezzanine" && /* @__PURE__ */ jsx(MezzanineDialog, { asset }),
		dialogState === "edit-audio-tracks" && /* @__PURE__ */ jsx(AudioTracksDialog, { asset }),
		dialogState === "download-asset" && /* @__PURE__ */ jsx(DownloadAssetDialog, { asset })
	] });
}
function assetIsAudio(asset) {
	return asset.data?.max_stored_resolution === "Audio only";
}
const getUnknownTypeFallback = (id, typeName) => ({
	title: /* @__PURE__ */ jsxs("em", { children: ["No schema found for type ", /* @__PURE__ */ jsx("code", { children: typeName })] }),
	subtitle: /* @__PURE__ */ jsxs("em", { children: ["Document: ", /* @__PURE__ */ jsx("code", { children: id })] }),
	media: () => /* @__PURE__ */ jsx(WarningOutlineIcon, {})
});
function MissingSchemaType(props) {
	let $ = c(6), { layout, value } = props, t0;
	$[0] !== value._id || $[1] !== value._type ? (t0 = getUnknownTypeFallback(value._id, value._type), $[0] = value._id, $[1] = value._type, $[2] = t0) : t0 = $[2];
	let t1;
	return $[3] !== layout || $[4] !== t0 ? (t1 = /* @__PURE__ */ jsx(SanityDefaultPreview, {
		...t0,
		layout
	}), $[3] = layout, $[4] = t0, $[5] = t1) : t1 = $[5], t1;
}
function TimeAgo(t0) {
	let $ = c(3), { time } = t0, t1;
	$[0] === Symbol.for("react.memo_cache_sentinel") ? (t1 = { useTemporalPhrase: !0 }, $[0] = t1) : t1 = $[0];
	let timeAgo = useRelativeTime(time, t1), t2;
	return $[1] === timeAgo ? t2 = $[2] : (t2 = /* @__PURE__ */ jsx("span", {
		title: timeAgo,
		children: timeAgo
	}), $[1] = timeAgo, $[2] = t2), t2;
}
function DraftStatus(props) {
	let $ = c(10), { document } = props, updatedAt = document && "_updatedAt" in document && document._updatedAt, t0;
	$[0] !== document || $[1] !== updatedAt ? (t0 = /* @__PURE__ */ jsx(Box, {
		padding: 2,
		children: /* @__PURE__ */ jsx(Text, {
			size: 1,
			children: document ? /* @__PURE__ */ jsxs(Fragment, { children: ["Edited ", updatedAt && /* @__PURE__ */ jsx(TimeAgo, { time: updatedAt })] }) : /* @__PURE__ */ jsx(Fragment, { children: "No unpublished edits" })
		})
	}), $[0] = document, $[1] = updatedAt, $[2] = t0) : t0 = $[2];
	let t1 = !document, t2 = !document, t3;
	$[3] === Symbol.for("react.memo_cache_sentinel") ? (t3 = /* @__PURE__ */ jsx(EditIcon, {}), $[3] = t3) : t3 = $[3];
	let t4;
	$[4] !== t1 || $[5] !== t2 ? (t4 = /* @__PURE__ */ jsx(TextWithTone, {
		tone: "caution",
		dimmed: t1,
		muted: t2,
		size: 1,
		children: t3
	}), $[4] = t1, $[5] = t2, $[6] = t4) : t4 = $[6];
	let t5;
	return $[7] !== t0 || $[8] !== t4 ? (t5 = /* @__PURE__ */ jsx(Tooltip, {
		animate: !0,
		portal: !0,
		content: t0,
		children: t4
	}), $[7] = t0, $[8] = t4, $[9] = t5) : t5 = $[9], t5;
}
function PublishedStatus(props) {
	let $ = c(10), { document } = props, updatedAt = document && "_updatedAt" in document && document._updatedAt, t0;
	$[0] !== document || $[1] !== updatedAt ? (t0 = /* @__PURE__ */ jsx(Box, {
		padding: 2,
		children: /* @__PURE__ */ jsx(Text, {
			size: 1,
			children: document ? /* @__PURE__ */ jsxs(Fragment, { children: ["Published ", updatedAt && /* @__PURE__ */ jsx(TimeAgo, { time: updatedAt })] }) : /* @__PURE__ */ jsx(Fragment, { children: "Not published" })
		})
	}), $[0] = document, $[1] = updatedAt, $[2] = t0) : t0 = $[2];
	let t1 = !document, t2 = !document, t3;
	$[3] === Symbol.for("react.memo_cache_sentinel") ? (t3 = /* @__PURE__ */ jsx(PublishIcon, {}), $[3] = t3) : t3 = $[3];
	let t4;
	$[4] !== t1 || $[5] !== t2 ? (t4 = /* @__PURE__ */ jsx(TextWithTone, {
		tone: "positive",
		dimmed: t1,
		muted: t2,
		size: 1,
		children: t3
	}), $[4] = t1, $[5] = t2, $[6] = t4) : t4 = $[6];
	let t5;
	return $[7] !== t0 || $[8] !== t4 ? (t5 = /* @__PURE__ */ jsx(Tooltip, {
		animate: !0,
		portal: !0,
		content: t0,
		children: t4
	}), $[7] = t0, $[8] = t4, $[9] = t5) : t5 = $[9], t5;
}
const INITIAL_PREVIEW_STATE = {
	snapshot: null,
	isLoading: !0,
	original: null
};
function PaneItemPreview(props) {
	let $ = c(19), { icon, layout, presence, schemaType, value } = props, title = isRecord(value.title) && isValidElement(value.title) || isString(value.title) || isNumber(value.title) ? value.title : null, t0;
	$[0] !== props.documentPreviewStore || $[1] !== schemaType || $[2] !== value._id ? (t0 = getPreviewStateObservable(props.documentPreviewStore, schemaType, value._id), $[0] = props.documentPreviewStore, $[1] = schemaType, $[2] = value._id, $[3] = t0) : t0 = $[3];
	let { snapshot, original, isLoading } = useObservable(t0, INITIAL_PREVIEW_STATE), t1;
	$[4] !== isLoading || $[5] !== original || $[6] !== presence || $[7] !== snapshot ? (t1 = isLoading ? null : /* @__PURE__ */ jsxs(Inline, {
		gap: 4,
		children: [
			presence && presence.length > 0 && /* @__PURE__ */ jsx(DocumentPreviewPresence, { presence }),
			/* @__PURE__ */ jsx(PublishedStatus, { document: original }),
			/* @__PURE__ */ jsx(DraftStatus, { document: snapshot })
		]
	}), $[4] = isLoading, $[5] = original, $[6] = presence, $[7] = snapshot, $[8] = t1) : t1 = $[8];
	let status = t1, t2;
	$[9] !== original || $[10] !== snapshot || $[11] !== title ? (t2 = getPreviewValueWithFallback({
		snapshot,
		original,
		fallback: { title }
	}), $[9] = original, $[10] = snapshot, $[11] = title, $[12] = t2) : t2 = $[12];
	let t3 = t2, t4;
	return $[13] !== icon || $[14] !== isLoading || $[15] !== layout || $[16] !== status || $[17] !== t3 ? (t4 = /* @__PURE__ */ jsx(SanityDefaultPreview, {
		...t3,
		isPlaceholder: isLoading,
		icon,
		layout,
		status
	}), $[13] = icon, $[14] = isLoading, $[15] = layout, $[16] = status, $[17] = t3, $[18] = t4) : t4 = $[18], t4;
}
/**
* Return `false` if we explicitly disable the icon.
* Otherwise return the passed icon or the schema type icon as a backup.
*/
function getIconWithFallback(icon, schemaType, defaultIcon) {
	return icon === !1 ? !1 : icon || schemaType && schemaType.icon || defaultIcon || !1;
}
function DocumentPreview(props) {
	let $ = c(15), { schemaType, documentPair } = props, doc = documentPair?.draft || documentPair?.published, id = documentPair.id || "", documentPreviewStore = useDocumentPreviewStore(), schema = useSchema(), documentPresence = useDocumentPresence(id), hasSchemaType = !!(schemaType && schemaType.name && schema.get(schemaType.name)), t0;
	bb0: {
		if (!doc) {
			t0 = null;
			break bb0;
		}
		if (!schemaType || !hasSchemaType) {
			let t1;
			$[0] === doc ? t1 = $[1] : (t1 = /* @__PURE__ */ jsx(MissingSchemaType, { value: doc }), $[0] = doc, $[1] = t1), t0 = t1;
			break bb0;
		}
		let t1;
		$[2] === schemaType ? t1 = $[3] : (t1 = getIconWithFallback(void 0, schemaType, DocumentIcon), $[2] = schemaType, $[3] = t1);
		let t2;
		$[4] !== doc || $[5] !== documentPresence || $[6] !== documentPreviewStore || $[7] !== schemaType || $[8] !== t1 ? (t2 = /* @__PURE__ */ jsx(PaneItemPreview, {
			documentPreviewStore,
			icon: t1,
			schemaType,
			layout: "default",
			value: doc,
			presence: documentPresence
		}), $[4] = doc, $[5] = documentPresence, $[6] = documentPreviewStore, $[7] = schemaType, $[8] = t1, $[9] = t2) : t2 = $[9], t0 = t2;
	}
	let children = t0, t1;
	$[10] === props.documentPair.id ? t1 = $[11] : (t1 = { id: props.documentPair.id }, $[10] = props.documentPair.id, $[11] = t1);
	let t2;
	return $[12] !== children || $[13] !== t1 ? (t2 = /* @__PURE__ */ jsx(PreviewCard, {
		__unstable_focusRing: !0,
		as: IntentLink,
		intent: "edit",
		params: t1,
		"data-as": "a",
		"data-ui": "PaneItem",
		padding: 2,
		radius: 2,
		tone: "inherit",
		children
	}), $[12] = children, $[13] = t1, $[14] = t2) : t2 = $[14], t2;
}
const Container = styled(Box).withConfig({
	displayName: "Container",
	componentId: "sc-sa7ue7-0"
})`*{color:${(props) => props.theme.sanity.color.base.fg};}a{text-decoration:none;}h2{font-size:${(props) => props.theme.sanity.fonts.text.sizes[1]};}`, VideoReferences = (props) => {
	let $ = c(11), schema = useSchema();
	if (!props.isLoaded) {
		let t0;
		return $[0] === Symbol.for("react.memo_cache_sentinel") ? (t0 = /* @__PURE__ */ jsx(SpinnerBox, {}), $[0] = t0) : t0 = $[0], t0;
	}
	if (!props.references?.length) {
		let t0;
		return $[1] === Symbol.for("react.memo_cache_sentinel") ? (t0 = /* @__PURE__ */ jsx(Card, {
			border: !0,
			radius: 3,
			padding: 3,
			children: /* @__PURE__ */ jsx(Text, {
				size: 2,
				children: "No documents are using this video"
			})
		}), $[1] = t0) : t0 = $[1], t0;
	}
	let T0, t0;
	if ($[2] !== props.references || $[3] !== schema) {
		let t1;
		$[6] === props.references ? t1 = $[7] : (t1 = props.references || [], $[6] = props.references, $[7] = t1);
		let documentPairs = collate(t1);
		T0 = Container, t0 = documentPairs?.map((documentPair) => {
			let schemaType = schema.get(documentPair.type);
			return /* @__PURE__ */ jsx(Card, {
				marginBottom: 2,
				padding: 2,
				radius: 2,
				shadow: 1,
				style: { overflow: "hidden" },
				children: /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(DocumentPreview, {
					documentPair,
					schemaType
				}) })
			}, documentPair.id);
		}), $[2] = props.references, $[3] = schema, $[4] = T0, $[5] = t0;
	} else T0 = $[4], t0 = $[5];
	let t1;
	return $[8] !== T0 || $[9] !== t0 ? (t1 = /* @__PURE__ */ jsx(T0, { children: t0 }), $[8] = T0, $[9] = t0, $[10] = t1) : t1 = $[10], t1;
};
function DeleteDialog(t0) {
	let $ = c(39), { asset, references, referencesLoading, cancelDelete, succeededDeleting } = t0, client = useClient$1(), [state, setState] = useState("checkingReferences"), [deleteOnMux, setDeleteOnMux] = useState(!0), toast = useToast(), t1;
	$[0] !== references?.length || $[1] !== referencesLoading || $[2] !== state ? (t1 = () => {
		state !== "checkingReferences" || referencesLoading || setState(references?.length ? "cantDelete" : "confirm");
	}, $[0] = references?.length, $[1] = referencesLoading, $[2] = state, $[3] = t1) : t1 = $[3];
	let t2;
	$[4] !== references || $[5] !== referencesLoading || $[6] !== state ? (t2 = [
		state,
		references,
		referencesLoading
	], $[4] = references, $[5] = referencesLoading, $[6] = state, $[7] = t2) : t2 = $[7], useEffect(t1, t2);
	let t3;
	$[8] !== asset || $[9] !== client || $[10] !== deleteOnMux || $[11] !== state || $[12] !== succeededDeleting || $[13] !== toast ? (t3 = async function confirmDelete() {
		if (state !== "confirm") return;
		setState("processing_deletion");
		let worked = await deleteAsset({
			client,
			asset,
			deleteOnMux
		});
		worked === !0 ? (toast.push({
			title: "Successfully deleted video",
			status: "success"
		}), succeededDeleting()) : worked === "failed-mux" ? (toast.push({
			title: "Deleted video in Sanity",
			description: "But it wasn't deleted in Mux",
			status: "warning"
		}), succeededDeleting()) : (toast.push({
			title: "Failed deleting video",
			status: "error"
		}), setState("error_deleting"));
	}, $[8] = asset, $[9] = client, $[10] = deleteOnMux, $[11] = state, $[12] = succeededDeleting, $[13] = toast, $[14] = t3) : t3 = $[14];
	let confirmDelete = t3, t4;
	$[15] === Symbol.for("react.memo_cache_sentinel") ? (t4 = {
		minHeight: "150px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	}, $[15] = t4) : t4 = $[15];
	let t5;
	$[16] === state ? t5 = $[17] : (t5 = state === "checkingReferences" && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Heading, {
		size: 2,
		children: "Checking if video can be deleted"
	}), /* @__PURE__ */ jsx(SpinnerBox, {})] }), $[16] = state, $[17] = t5);
	let t6;
	$[18] !== references || $[19] !== referencesLoading || $[20] !== state ? (t6 = state === "cantDelete" && /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Heading, {
			size: 2,
			children: "Video can't be deleted"
		}),
		/* @__PURE__ */ jsxs(Text, {
			size: 2,
			style: { marginBottom: "2rem" },
			children: [
				"There are ",
				references?.length,
				" document",
				references && references.length > 0 && "s",
				" ",
				"pointing to this video. Remove their references to this file or delete them before proceeding."
			]
		}),
		/* @__PURE__ */ jsx(VideoReferences, {
			references,
			isLoaded: !referencesLoading
		})
	] }), $[18] = references, $[19] = referencesLoading, $[20] = state, $[21] = t6) : t6 = $[21];
	let t7;
	$[22] !== confirmDelete || $[23] !== deleteOnMux || $[24] !== state ? (t7 = state === "confirm" && /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Heading, {
			size: 2,
			children: "Are you sure you want to delete this video?"
		}),
		/* @__PURE__ */ jsx(Text, {
			size: 2,
			children: "This action is irreversible"
		}),
		/* @__PURE__ */ jsxs(Stack, {
			gap: 4,
			marginY: 4,
			children: [
				/* @__PURE__ */ jsxs(Flex, {
					align: "center",
					as: "label",
					children: [/* @__PURE__ */ jsx(Checkbox, {
						checked: deleteOnMux,
						onChange: () => setDeleteOnMux(_temp$5)
					}), /* @__PURE__ */ jsx(Text, {
						style: { margin: "0 10px" },
						children: "Delete asset on Mux"
					})]
				}),
				/* @__PURE__ */ jsxs(Flex, {
					align: "center",
					as: "label",
					children: [/* @__PURE__ */ jsx(Checkbox, {
						disabled: !0,
						checked: !0
					}), /* @__PURE__ */ jsx(Text, {
						style: { margin: "0 10px" },
						children: "Delete video from dataset"
					})]
				}),
				/* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Button, {
					icon: TrashIcon,
					fontSize: 2,
					padding: 3,
					text: "Delete video",
					tone: "critical",
					onClick: confirmDelete,
					disabled: [
						"processing_deletion",
						"checkingReferences",
						"cantDelete"
					].some((s) => s === state)
				}) })
			]
		})
	] }), $[22] = confirmDelete, $[23] = deleteOnMux, $[24] = state, $[25] = t7) : t7 = $[25];
	let t8;
	$[26] === state ? t8 = $[27] : (t8 = state === "processing_deletion" && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Heading, {
		size: 2,
		children: "Deleting video..."
	}), /* @__PURE__ */ jsx(SpinnerBox, {})] }), $[26] = state, $[27] = t8);
	let t9;
	$[28] === state ? t9 = $[29] : (t9 = state === "error_deleting" && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Heading, {
		size: 2,
		children: "Something went wrong!"
	}), /* @__PURE__ */ jsx(Text, {
		size: 2,
		children: "Try deleting the video again by clicking the button below"
	})] }), $[28] = state, $[29] = t9);
	let t10;
	$[30] !== t5 || $[31] !== t6 || $[32] !== t7 || $[33] !== t8 || $[34] !== t9 ? (t10 = /* @__PURE__ */ jsx(Card, {
		padding: 3,
		style: t4,
		children: /* @__PURE__ */ jsxs(Stack, {
			gap: 3,
			children: [
				t5,
				t6,
				t7,
				t8,
				t9
			]
		})
	}), $[30] = t5, $[31] = t6, $[32] = t7, $[33] = t8, $[34] = t9, $[35] = t10) : t10 = $[35];
	let t11;
	return $[36] !== cancelDelete || $[37] !== t10 ? (t11 = /* @__PURE__ */ jsx(Dialog, {
		animate: !0,
		header: "Delete video",
		zOffset: DIALOGS_Z_INDEX,
		id: "deleting-video-details-dialog",
		onClose: cancelDelete,
		onClickOutside: cancelDelete,
		width: 1,
		position: "fixed",
		children: t10
	}), $[36] = cancelDelete, $[37] = t10, $[38] = t11) : t11 = $[38], t11;
}
function _temp$5(prev) {
	return !prev;
}
const useDocReferences = createHookFromObservableFactory(({ documentStore, id }) => documentStore.listenQuery("*[references($id)]{_id, _type, _rev, _updatedAt, _createdAt}", { id }, { apiVersion: SANITY_API_VERSION }));
function getVideoMetadata(doc) {
	let id = doc.assetId || doc._id || "", date = doc.data?.created_at ? /* @__PURE__ */ new Date(Number(doc.data.created_at) * 1e3) : new Date(doc._createdAt || doc._updatedAt || Date.now());
	return {
		title: doc.filename || id.slice(0, 12),
		id,
		playbackId: doc.playbackId,
		createdAt: date,
		duration: doc.data?.duration ? formatSeconds(doc.data?.duration) : void 0,
		playback_ids: doc.data?.playback_ids,
		aspect_ratio: doc.data?.aspect_ratio,
		max_stored_resolution: doc.data?.max_stored_resolution,
		max_stored_frame_rate: doc.data?.max_stored_frame_rate,
		text_tracks: doc.data?.tracks?.filter(isCaptionTrack) || [],
		audio_tracks: doc.data?.tracks?.filter((track) => track.type === "audio") || []
	};
}
function useVideoDetails(props) {
	let $ = c(36), documentStore = useDocumentStore(), toast = useToast(), client = useClient$1(), t0;
	$[0] !== documentStore || $[1] !== props.asset._id ? (t0 = {
		documentStore,
		id: props.asset._id
	}, $[0] = documentStore, $[1] = props.asset._id, $[2] = t0) : t0 = $[2];
	let [references, referencesLoading] = useDocReferences(t0), [draftFilename, setFilename] = useState(), filename = draftFilename ?? props.asset.filename, modified = draftFilename !== void 0 && draftFilename !== props.asset.filename, t1;
	$[3] !== filename || $[4] !== props.asset ? (t1 = getVideoMetadata({
		...props.asset,
		filename
	}), $[3] = filename, $[4] = props.asset, $[5] = t1) : t1 = $[5];
	let displayInfo = t1, [state, setState] = useState("idle"), t2;
	$[6] === Symbol.for("react.memo_cache_sentinel") ? (t2 = { showToast: !0 }, $[6] = t2) : t2 = $[6];
	let { resyncAsset, isResyncing } = useResyncAsset(t2), t3;
	$[7] !== props.asset || $[8] !== resyncAsset || $[9] !== state ? (t3 = async function handleResync() {
		state === "idle" && (setState("resyncing"), await resyncAsset(props.asset), setState("idle"));
	}, $[7] = props.asset, $[8] = resyncAsset, $[9] = state, $[10] = t3) : t3 = $[10];
	let handleResync = t3, t4;
	$[11] !== modified || $[12] !== props || $[13] !== state ? (t4 = function handleClose() {
		state === "idle" && (modified ? setState("closing") : props.closeDialog());
	}, $[11] = modified, $[12] = props, $[13] = state, $[14] = t4) : t4 = $[14];
	let handleClose = t4, t5;
	$[15] !== props || $[16] !== state ? (t5 = function confirmClose(shouldClose) {
		state === "closing" && (shouldClose && props.closeDialog(), setState("idle"));
	}, $[15] = props, $[16] = state, $[17] = t5) : t5 = $[17];
	let confirmClose = t5, t6;
	$[18] !== client || $[19] !== filename || $[20] !== props || $[21] !== state || $[22] !== toast ? (t6 = async function saveChanges() {
		if (state === "idle") {
			setState("saving");
			try {
				await client.patch(props.asset._id).set({ filename }).commit(), setFilename(void 0), toast.push({
					title: "Video title updated",
					description: `New title: ${filename}`,
					status: "success"
				}), props.closeDialog();
			} catch (t7) {
				let error = t7;
				toast.push({
					title: "Failed updating file name",
					status: "error",
					description: typeof error == "string" ? error : "Please try again"
				}), setFilename(void 0);
			}
			setState("idle");
		}
	}, $[18] = client, $[19] = filename, $[20] = props, $[21] = state, $[22] = toast, $[23] = t6) : t6 = $[23];
	let saveChanges = t6, t7;
	return $[24] !== confirmClose || $[25] !== displayInfo || $[26] !== filename || $[27] !== handleClose || $[28] !== handleResync || $[29] !== isResyncing || $[30] !== modified || $[31] !== references || $[32] !== referencesLoading || $[33] !== saveChanges || $[34] !== state ? (t7 = {
		references,
		referencesLoading,
		modified,
		filename,
		setFilename,
		displayInfo,
		state,
		setState,
		handleClose,
		confirmClose,
		saveChanges,
		handleResync,
		isResyncing
	}, $[24] = confirmClose, $[25] = displayInfo, $[26] = filename, $[27] = handleClose, $[28] = handleResync, $[29] = isResyncing, $[30] = modified, $[31] = references, $[32] = referencesLoading, $[33] = saveChanges, $[34] = state, $[35] = t7) : t7 = $[35], t7;
}
const AssetInput = (props) => {
	let $ = c(10), t0;
	$[0] !== props.disabled || $[1] !== props.label || $[2] !== props.onInput || $[3] !== props.placeholder || $[4] !== props.value ? (t0 = /* @__PURE__ */ jsx(TextInput, {
		id: props.label,
		value: props.value,
		placeholder: props.placeholder,
		onInput: props.onInput,
		disabled: props.disabled
	}), $[0] = props.disabled, $[1] = props.label, $[2] = props.onInput, $[3] = props.placeholder, $[4] = props.value, $[5] = t0) : t0 = $[5];
	let t1;
	return $[6] !== props.description || $[7] !== props.label || $[8] !== t0 ? (t1 = /* @__PURE__ */ jsx(FormField_default, {
		title: props.label,
		description: props.description,
		inputId: props.label,
		children: t0
	}), $[6] = props.description, $[7] = props.label, $[8] = t0, $[9] = t1) : t1 = $[9], t1;
}, VideoDetails = (props) => {
	let $ = c(140), [tab, setTab] = useState("details"), { displayInfo, filename, modified, references, referencesLoading, setFilename, state, setState, handleClose, confirmClose, saveChanges, handleResync, isResyncing } = useVideoDetails(props), isSaving = state === "saving", [containerHeight, setContainerHeight] = useState(null), contentsRef = useRef(null), t0, t1;
	$[0] === Symbol.for("react.memo_cache_sentinel") ? (t0 = () => {
		contentsRef.current && "getBoundingClientRect" in contentsRef.current && setContainerHeight(contentsRef.current.getBoundingClientRect().height);
	}, t1 = [], $[0] = t0, $[1] = t1) : (t0 = $[0], t1 = $[1]), useEffect(t0, t1);
	let t2 = displayInfo.title, t3;
	$[2] === setState ? t3 = $[3] : (t3 = () => setState("deleting"), $[2] = setState, $[3] = t3);
	let t4 = isSaving || isResyncing, t5;
	$[4] !== t3 || $[5] !== t4 ? (t5 = /* @__PURE__ */ jsx(Button, {
		icon: TrashIcon,
		fontSize: 2,
		padding: 3,
		mode: "bleed",
		text: "Delete",
		tone: "critical",
		onClick: t3,
		disabled: t4
	}), $[4] = t3, $[5] = t4, $[6] = t5) : t5 = $[6];
	let t6 = isSaving || isResyncing, t7 = isResyncing && Spinner, t8;
	$[7] !== handleResync || $[8] !== t6 || $[9] !== t7 ? (t8 = /* @__PURE__ */ jsx(Button, {
		icon: SyncIcon,
		fontSize: 2,
		padding: 3,
		mode: "bleed",
		text: "Resync",
		tone: "primary",
		onClick: handleResync,
		disabled: t6,
		iconRight: t7
	}), $[7] = handleResync, $[8] = t6, $[9] = t7, $[10] = t8) : t8 = $[10];
	let t9;
	$[11] !== t5 || $[12] !== t8 ? (t9 = /* @__PURE__ */ jsxs(Flex, {
		gap: 2,
		children: [t5, t8]
	}), $[11] = t5, $[12] = t8, $[13] = t9) : t9 = $[13];
	let t10;
	$[14] === setState ? t10 = $[15] : (t10 = () => setState("downloading"), $[14] = setState, $[15] = t10);
	let t11;
	$[16] !== isSaving || $[17] !== t10 ? (t11 = /* @__PURE__ */ jsx(Button, {
		icon: DownloadIcon,
		fontSize: 2,
		padding: 3,
		mode: "bleed",
		text: "Download",
		tone: "default",
		onClick: t10,
		disabled: isSaving
	}), $[16] = isSaving, $[17] = t10, $[18] = t11) : t11 = $[18];
	let t12;
	$[19] !== isResyncing || $[20] !== isSaving || $[21] !== modified || $[22] !== saveChanges ? (t12 = modified && /* @__PURE__ */ jsx(Button, {
		icon: CheckmarkIcon,
		fontSize: 2,
		padding: 3,
		mode: "ghost",
		text: "Save and close",
		tone: "positive",
		onClick: saveChanges,
		iconRight: isSaving && Spinner,
		disabled: isSaving || isResyncing
	}), $[19] = isResyncing, $[20] = isSaving, $[21] = modified, $[22] = saveChanges, $[23] = t12) : t12 = $[23];
	let t13;
	$[24] !== t11 || $[25] !== t12 ? (t13 = /* @__PURE__ */ jsxs(Flex, {
		gap: 2,
		children: [t11, t12]
	}), $[24] = t11, $[25] = t12, $[26] = t13) : t13 = $[26];
	let t14;
	$[27] !== t13 || $[28] !== t9 ? (t14 = /* @__PURE__ */ jsx(Card, {
		padding: 3,
		children: /* @__PURE__ */ jsxs(Flex, {
			justify: "space-between",
			align: "center",
			children: [t9, t13]
		})
	}), $[27] = t13, $[28] = t9, $[29] = t14) : t14 = $[29];
	let t15;
	$[30] !== props || $[31] !== references || $[32] !== referencesLoading || $[33] !== setState || $[34] !== state ? (t15 = state === "deleting" && /* @__PURE__ */ jsx(DeleteDialog, {
		asset: props.asset,
		cancelDelete: () => setState("idle"),
		referencesLoading,
		references,
		succeededDeleting: () => {
			props.closeDialog();
		}
	}), $[30] = props, $[31] = references, $[32] = referencesLoading, $[33] = setState, $[34] = state, $[35] = t15) : t15 = $[35];
	let t16;
	$[36] !== props.asset || $[37] !== setState || $[38] !== state ? (t16 = state === "downloading" && /* @__PURE__ */ jsx(DownloadAssetDialog, {
		asset: props.asset,
		onClose: () => setState("idle"),
		absolute: !0
	}), $[36] = props.asset, $[37] = setState, $[38] = state, $[39] = t16) : t16 = $[39];
	let t17;
	$[40] !== confirmClose || $[41] !== modified || $[42] !== state ? (t17 = state === "closing" && /* @__PURE__ */ jsx(Dialog, {
		animate: !0,
		header: "You have unsaved changes",
		zOffset: 6e4,
		id: "closing-video-details-dialog",
		onClose: () => confirmClose(!1),
		onClickOutside: () => confirmClose(!1),
		width: 1,
		position: "fixed",
		footer: /* @__PURE__ */ jsx(Card, {
			padding: 3,
			children: /* @__PURE__ */ jsxs(Flex, {
				justify: "space-between",
				align: "center",
				children: [/* @__PURE__ */ jsx(Button, {
					icon: ErrorOutlineIcon,
					fontSize: 2,
					padding: 3,
					text: "Discard changes",
					tone: "critical",
					onClick: () => confirmClose(!0)
				}), modified && /* @__PURE__ */ jsx(Button, {
					icon: RevertIcon,
					fontSize: 2,
					padding: 3,
					mode: "ghost",
					text: "Keep editing",
					tone: "primary",
					onClick: () => confirmClose(!1)
				})]
			})
		}),
		children: /* @__PURE__ */ jsx(Card, {
			padding: 5,
			children: /* @__PURE__ */ jsxs(Stack, {
				style: { textAlign: "center" },
				gap: 3,
				children: [/* @__PURE__ */ jsx(Heading, {
					size: 2,
					children: "Unsaved changes will be lost"
				}), /* @__PURE__ */ jsx(Text, {
					size: 2,
					children: "Are you sure you want to discard them?"
				})]
			})
		})
	}), $[40] = confirmClose, $[41] = modified, $[42] = state, $[43] = t17) : t17 = $[43];
	let t18;
	$[44] === Symbol.for("react.memo_cache_sentinel") ? (t18 = { containerType: "inline-size" }, $[44] = t18) : t18 = $[44];
	let t19;
	$[45] === Symbol.for("react.memo_cache_sentinel") ? (t19 = [
		"column",
		"column",
		"row"
	], $[45] = t19) : t19 = $[45];
	let t20;
	$[46] === containerHeight ? t20 = $[47] : (t20 = typeof containerHeight == "number" ? { minHeight: containerHeight } : void 0, $[46] = containerHeight, $[47] = t20);
	let t21 = props.asset.autoPlay || !1, t22;
	$[48] !== props.asset || $[49] !== t21 ? (t22 = /* @__PURE__ */ jsx(VideoPlayer, {
		asset: props.asset,
		autoPlay: t21
	}), $[48] = props.asset, $[49] = t21, $[50] = t22) : t22 = $[50];
	let t23;
	$[51] !== displayInfo.audio_tracks || $[52] !== displayInfo.text_tracks || $[53] !== props.asset || $[54] !== tab ? (t23 = tab !== "references" && /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(TextTracksManager, {
			asset: props.asset,
			iconOnly: !0,
			collapseTracks: !0,
			tracks: displayInfo?.text_tracks || props.asset.data?.tracks?.filter(isCaptionTrack) || []
		}),
		/* @__PURE__ */ jsx(AudioTracksManager, {
			asset: props.asset,
			iconOnly: !0,
			collapseTracks: !0,
			tracks: displayInfo?.audio_tracks || props.asset.data?.tracks?.filter(_temp$4) || []
		}),
		/* @__PURE__ */ jsx(Mezzanine, { asset: props.asset })
	] }), $[51] = displayInfo.audio_tracks, $[52] = displayInfo.text_tracks, $[53] = props.asset, $[54] = tab, $[55] = t23) : t23 = $[55];
	let t24;
	$[56] !== t22 || $[57] !== t23 ? (t24 = /* @__PURE__ */ jsxs(Stack, {
		gap: 4,
		flex: 1,
		sizing: "border",
		children: [t22, t23]
	}), $[56] = t22, $[57] = t23, $[58] = t24) : t24 = $[58];
	let t25;
	$[59] === Symbol.for("react.memo_cache_sentinel") ? (t25 = () => setTab("details"), $[59] = t25) : t25 = $[59];
	let t26 = tab === "details", t27;
	$[60] === t26 ? t27 = $[61] : (t27 = /* @__PURE__ */ jsx(Tab, {
		"aria-controls": "details-panel",
		icon: EditIcon,
		id: "details-tab",
		label: "Details",
		onClick: t25,
		selected: t26
	}), $[60] = t26, $[61] = t27);
	let t28;
	$[62] === Symbol.for("react.memo_cache_sentinel") ? (t28 = () => setTab("robots"), $[62] = t28) : t28 = $[62];
	let t29 = tab === "robots", t30;
	$[63] === t29 ? t30 = $[64] : (t30 = /* @__PURE__ */ jsx(Tab, {
		"aria-controls": "robots-panel",
		icon: RobotIcon,
		id: "robots-tab",
		label: "Robots",
		onClick: t28,
		selected: t29
	}), $[63] = t29, $[64] = t30);
	let t31 = `Used by ${references ? `(${references.length})` : ""}`, t32;
	$[65] === Symbol.for("react.memo_cache_sentinel") ? (t32 = () => setTab("references"), $[65] = t32) : t32 = $[65];
	let t33 = tab === "references", t34;
	$[66] !== t31 || $[67] !== t33 ? (t34 = /* @__PURE__ */ jsx(Tab, {
		"aria-controls": "references-panel",
		icon: SearchIcon,
		id: "references-tab",
		label: t31,
		onClick: t32,
		selected: t33
	}), $[66] = t31, $[67] = t33, $[68] = t34) : t34 = $[68];
	let t35;
	$[69] !== t27 || $[70] !== t30 || $[71] !== t34 ? (t35 = /* @__PURE__ */ jsxs(TabList, {
		gap: 2,
		children: [
			t27,
			t30,
			t34
		]
	}), $[69] = t27, $[70] = t30, $[71] = t34, $[72] = t35) : t35 = $[72];
	let t36 = tab !== "details", t37;
	$[73] === Symbol.for("react.memo_cache_sentinel") ? (t37 = { wordBreak: "break-word" }, $[73] = t37) : t37 = $[73];
	let t38 = filename || "", t39;
	$[74] === setFilename ? t39 = $[75] : (t39 = (e) => setFilename(e.currentTarget.value), $[74] = setFilename, $[75] = t39);
	let t40 = state !== "idle", t41;
	$[76] !== t38 || $[77] !== t39 || $[78] !== t40 ? (t41 = /* @__PURE__ */ jsx(AssetInput, {
		label: "Video title or file name",
		description: "Not visible to users. Useful for finding videos later.",
		value: t38,
		onInput: t39,
		disabled: t40
	}), $[76] = t38, $[77] = t39, $[78] = t40, $[79] = t41) : t41 = $[79];
	let t42;
	$[80] === displayInfo.duration ? t42 = $[81] : (t42 = displayInfo?.duration && /* @__PURE__ */ jsx(IconInfo, {
		text: `Duration: ${displayInfo.duration}`,
		icon: ClockIcon,
		size: 2
	}), $[80] = displayInfo.duration, $[81] = t42);
	let t43;
	$[82] === displayInfo.max_stored_resolution ? t43 = $[83] : (t43 = displayInfo?.max_stored_resolution && /* @__PURE__ */ jsx(IconInfo, {
		text: `Max Resolution: ${displayInfo.max_stored_resolution}`,
		icon: ResolutionIcon,
		size: 2
	}), $[82] = displayInfo.max_stored_resolution, $[83] = t43);
	let t44;
	$[84] === displayInfo.max_stored_frame_rate ? t44 = $[85] : (t44 = displayInfo?.max_stored_frame_rate && /* @__PURE__ */ jsx(IconInfo, {
		text: `Frame rate: ${displayInfo.max_stored_frame_rate}`,
		icon: StopWatchIcon,
		size: 2
	}), $[84] = displayInfo.max_stored_frame_rate, $[85] = t44);
	let t45;
	$[86] === displayInfo.aspect_ratio ? t45 = $[87] : (t45 = displayInfo?.aspect_ratio && /* @__PURE__ */ jsx(IconInfo, {
		text: `Aspect Ratio: ${displayInfo.aspect_ratio}`,
		icon: CropIcon,
		size: 2
	}), $[86] = displayInfo.aspect_ratio, $[87] = t45);
	let t46;
	$[88] === displayInfo.createdAt ? t46 = $[89] : (t46 = displayInfo.createdAt.toLocaleDateString("en", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hour12: !0
	}), $[88] = displayInfo.createdAt, $[89] = t46);
	let t47 = `Uploaded on: ${t46}`, t48;
	$[90] === t47 ? t48 = $[91] : (t48 = /* @__PURE__ */ jsx(IconInfo, {
		text: t47,
		icon: CalendarIcon,
		size: 2
	}), $[90] = t47, $[91] = t48);
	let t49 = `Mux ID: \n${displayInfo.id}`, t50;
	$[92] === t49 ? t50 = $[93] : (t50 = /* @__PURE__ */ jsx(IconInfo, {
		text: t49,
		icon: TagIcon,
		size: 2
	}), $[92] = t49, $[93] = t50);
	let t51;
	$[94] === displayInfo.playback_ids ? t51 = $[95] : (t51 = /* @__PURE__ */ jsx(PlaybackIds, { playback_ids: displayInfo.playback_ids }), $[94] = displayInfo.playback_ids, $[95] = t51);
	let t52;
	$[96] !== t42 || $[97] !== t43 || $[98] !== t44 || $[99] !== t45 || $[100] !== t48 || $[101] !== t50 || $[102] !== t51 ? (t52 = /* @__PURE__ */ jsxs(Stack, {
		gap: 3,
		children: [
			t42,
			t43,
			t44,
			t45,
			t48,
			t50,
			t51
		]
	}), $[96] = t42, $[97] = t43, $[98] = t44, $[99] = t45, $[100] = t48, $[101] = t50, $[102] = t51, $[103] = t52) : t52 = $[103];
	let t53;
	$[104] !== t41 || $[105] !== t52 ? (t53 = /* @__PURE__ */ jsxs(Stack, {
		gap: 4,
		children: [t41, t52]
	}), $[104] = t41, $[105] = t52, $[106] = t53) : t53 = $[106];
	let t54;
	$[107] !== t36 || $[108] !== t53 ? (t54 = /* @__PURE__ */ jsx(TabPanel, {
		"aria-labelledby": "details-tab",
		id: "details-panel",
		hidden: t36,
		style: t37,
		children: t53
	}), $[107] = t36, $[108] = t53, $[109] = t54) : t54 = $[109];
	let t55 = tab !== "references", t56 = !referencesLoading, t57;
	$[110] !== references || $[111] !== t56 ? (t57 = /* @__PURE__ */ jsx(VideoReferences, {
		references,
		isLoaded: t56
	}), $[110] = references, $[111] = t56, $[112] = t57) : t57 = $[112];
	let t58;
	$[113] !== t55 || $[114] !== t57 ? (t58 = /* @__PURE__ */ jsx(TabPanel, {
		"aria-labelledby": "references-tab",
		id: "references-panel",
		hidden: t55,
		children: t57
	}), $[113] = t55, $[114] = t57, $[115] = t58) : t58 = $[115];
	let t59 = tab !== "robots", t60;
	$[116] !== props.asset || $[117] !== props.config || $[118] !== tab ? (t60 = tab === "robots" && /* @__PURE__ */ jsx(RobotsErrorBoundary, { children: /* @__PURE__ */ jsx(RobotsPanel, {
		asset: props.asset,
		config: props.config
	}) }), $[116] = props.asset, $[117] = props.config, $[118] = tab, $[119] = t60) : t60 = $[119];
	let t61;
	$[120] !== t59 || $[121] !== t60 ? (t61 = /* @__PURE__ */ jsx(TabPanel, {
		"aria-labelledby": "robots-tab",
		id: "robots-panel",
		hidden: t59,
		children: t60
	}), $[120] = t59, $[121] = t60, $[122] = t61) : t61 = $[122];
	let t62;
	$[123] !== t35 || $[124] !== t54 || $[125] !== t58 || $[126] !== t61 ? (t62 = /* @__PURE__ */ jsxs(Stack, {
		gap: 4,
		flex: 1,
		sizing: "border",
		children: [
			t35,
			t54,
			t58,
			t61
		]
	}), $[123] = t35, $[124] = t54, $[125] = t58, $[126] = t61, $[127] = t62) : t62 = $[127];
	let t63;
	$[128] !== t20 || $[129] !== t24 || $[130] !== t62 ? (t63 = /* @__PURE__ */ jsx(Card, {
		padding: 4,
		sizing: "border",
		style: t18,
		children: /* @__PURE__ */ jsxs(Flex, {
			sizing: "border",
			gap: 4,
			direction: t19,
			align: "flex-start",
			ref: contentsRef,
			style: t20,
			children: [t24, t62]
		})
	}), $[128] = t20, $[129] = t24, $[130] = t62, $[131] = t63) : t63 = $[131];
	let t64;
	return $[132] !== displayInfo.title || $[133] !== handleClose || $[134] !== t14 || $[135] !== t15 || $[136] !== t16 || $[137] !== t17 || $[138] !== t63 ? (t64 = /* @__PURE__ */ jsxs(Dialog, {
		animate: !0,
		header: t2,
		zOffset: DIALOGS_Z_INDEX,
		id: "video-details-dialog",
		onClose: handleClose,
		onClickOutside: handleClose,
		width: 2,
		position: "fixed",
		footer: t14,
		children: [
			t15,
			t16,
			t17,
			t63
		]
	}), $[132] = displayInfo.title, $[133] = handleClose, $[134] = t14, $[135] = t15, $[136] = t16, $[137] = t17, $[138] = t63, $[139] = t64) : t64 = $[139], t64;
}, PlaybackIds = (t0) => {
	let $ = c(3), { playback_ids } = t0;
	if (playback_ids) {
		let t1;
		return $[0] === playback_ids ? t1 = $[1] : (t1 = playback_ids.map(_temp2$3), $[0] = playback_ids, $[1] = t1), t1;
	}
	let t1;
	return $[2] === Symbol.for("react.memo_cache_sentinel") ? (t1 = /* @__PURE__ */ jsx(IconInfo, {
		text: "No Playback ID",
		icon: TagIcon,
		size: 2
	}), $[2] = t1) : t1 = $[2], t1;
}, policyToText = (policy) => {
	switch (policy) {
		case "drm": return "DRM";
		case "signed": return "Signed";
		case "public": return "Public";
		default: return policy;
	}
};
function _temp$4(track) {
	return track.type === "audio";
}
function _temp2$3(entry) {
	return /* @__PURE__ */ jsx(IconInfo, {
		text: `Playback ID [${policyToText(entry.policy)}]: ${entry.id}`,
		icon: TagIcon,
		size: 2
	}, entry.id);
}
const VideoMetadata = (props) => {
	let $ = c(20);
	if (!props.asset) return null;
	let T0, T1, t0, t1, t2, t3, t4, t5;
	if ($[0] !== props.asset) {
		let displayInfo = getVideoMetadata(props.asset);
		T1 = Stack, t4 = 2, t5 = displayInfo.title && /* @__PURE__ */ jsx(Text, {
			size: 1,
			weight: "semibold",
			style: { wordWrap: "break-word" },
			children: displayInfo.title
		}), T0 = Inline, t0 = 3, t1 = displayInfo?.duration && /* @__PURE__ */ jsx(IconInfo, {
			text: displayInfo.duration,
			icon: ClockIcon,
			size: 1,
			muted: !0
		}), t2 = /* @__PURE__ */ jsx(IconInfo, {
			text: displayInfo.createdAt.toISOString().split("T")[0],
			icon: CalendarIcon,
			size: 1,
			muted: !0
		}), t3 = displayInfo.title != displayInfo.id.slice(0, 12) && /* @__PURE__ */ jsx(IconInfo, {
			text: displayInfo.id.slice(0, 12),
			icon: TagIcon,
			size: 1,
			muted: !0
		}), $[0] = props.asset, $[1] = T0, $[2] = T1, $[3] = t0, $[4] = t1, $[5] = t2, $[6] = t3, $[7] = t4, $[8] = t5;
	} else T0 = $[1], T1 = $[2], t0 = $[3], t1 = $[4], t2 = $[5], t3 = $[6], t4 = $[7], t5 = $[8];
	let t6;
	$[9] !== T0 || $[10] !== t0 || $[11] !== t1 || $[12] !== t2 || $[13] !== t3 ? (t6 = /* @__PURE__ */ jsxs(T0, {
		gap: t0,
		children: [
			t1,
			t2,
			t3
		]
	}), $[9] = T0, $[10] = t0, $[11] = t1, $[12] = t2, $[13] = t3, $[14] = t6) : t6 = $[14];
	let t7;
	return $[15] !== T1 || $[16] !== t4 || $[17] !== t5 || $[18] !== t6 ? (t7 = /* @__PURE__ */ jsxs(T1, {
		gap: t4,
		children: [t5, t6]
	}), $[15] = T1, $[16] = t4, $[17] = t5, $[18] = t6, $[19] = t7) : t7 = $[19], t7;
};
function VideoInBrowser(t0) {
	let $ = c(44), { onSelect, onEdit, asset } = t0, [renderVideo, setRenderVideo] = useState(!1), t1;
	$[0] !== asset || $[1] !== onSelect ? (t1 = () => onSelect?.(asset), $[0] = asset, $[1] = onSelect, $[2] = t1) : t1 = $[2];
	let select = t1, t2;
	$[3] !== asset || $[4] !== onEdit ? (t2 = () => onEdit?.(asset), $[3] = asset, $[4] = onEdit, $[5] = t2) : t2 = $[5];
	let edit = t2, { hasShownWarning } = useDrmPlaybackWarningContext();
	if (!asset) return null;
	let t3;
	$[6] === asset ? t3 = $[7] : (t3 = getPlaybackPolicy(asset), $[6] = asset, $[7] = t3);
	let playbackPolicy = t3, t4;
	$[8] !== hasShownWarning || $[9] !== playbackPolicy?.policy ? (t4 = () => {
		playbackPolicy?.policy === "drm" && !hasShownWarning ? setRenderVideo("pre-render-warn") : setRenderVideo("render-video");
	}, $[8] = hasShownWarning, $[9] = playbackPolicy?.policy, $[10] = t4) : t4 = $[10];
	let onClickPlay = t4, t5;
	$[11] === Symbol.for("react.memo_cache_sentinel") ? (t5 = { position: "relative" }, $[11] = t5) : t5 = $[11];
	let t6;
	$[12] === playbackPolicy?.policy ? t6 = $[13] : (t6 = playbackPolicy?.policy === "signed" && /* @__PURE__ */ jsx(Tooltip, {
		animate: !0,
		content: /* @__PURE__ */ jsx(Card, {
			padding: 2,
			radius: 2,
			children: /* @__PURE__ */ jsx(IconInfo, {
				icon: LockIcon,
				text: "Signed playback policy",
				size: 2
			})
		}),
		placement: "right",
		fallbackPlacements: ["top", "bottom"],
		portal: !0,
		children: /* @__PURE__ */ jsx(Card, {
			tone: "caution",
			style: {
				borderRadius: "100%",
				position: "absolute",
				left: "1em",
				top: "1em",
				zIndex: 11
			},
			padding: 2,
			border: !0,
			children: /* @__PURE__ */ jsx(Text, {
				muted: !0,
				size: 1,
				children: /* @__PURE__ */ jsx(LockIcon, {})
			})
		})
	}), $[12] = playbackPolicy?.policy, $[13] = t6);
	let t7;
	$[14] === playbackPolicy?.policy ? t7 = $[15] : (t7 = playbackPolicy?.policy === "drm" && /* @__PURE__ */ jsx(Tooltip, {
		animate: !0,
		content: /* @__PURE__ */ jsx(Card, {
			padding: 2,
			radius: 2,
			children: /* @__PURE__ */ jsx(IconInfo, {
				icon: LockIcon,
				text: "DRM playback policy",
				size: 2
			})
		}),
		placement: "right",
		fallbackPlacements: ["top", "bottom"],
		portal: !0,
		children: /* @__PURE__ */ jsx(Card, {
			tone: "caution",
			style: {
				borderRadius: "0.25rem",
				position: "absolute",
				left: "1em",
				top: "1em",
				zIndex: 11
			},
			padding: 2,
			border: !0,
			children: /* @__PURE__ */ jsx(Text, {
				muted: !0,
				size: 1,
				weight: "semibold",
				style: { color: "var(--card-icon-color)" },
				children: "DRM"
			})
		})
	}), $[14] = playbackPolicy?.policy, $[15] = t7);
	let t8;
	$[16] === Symbol.for("react.memo_cache_sentinel") ? (t8 = { gridTemplateRows: "min-content min-content 1fr" }, $[16] = t8) : t8 = $[16];
	let t9;
	$[17] === renderVideo ? t9 = $[18] : (t9 = renderVideo === "pre-render-warn" && /* @__PURE__ */ jsx(DRMWarningDialog, { onClose: () => {
		setRenderVideo("render-video");
	} }), $[17] = renderVideo, $[18] = t9);
	let t10;
	$[19] !== asset || $[20] !== onClickPlay || $[21] !== renderVideo ? (t10 = renderVideo === "render-video" ? /* @__PURE__ */ jsx(VideoPlayer, {
		asset,
		autoPlay: !0,
		forceAspectRatio: THUMBNAIL_ASPECT_RATIO
	}) : /* @__PURE__ */ jsxs(PlayButton, {
		onClick: onClickPlay,
		children: [/* @__PURE__ */ jsx("div", {
			"data-play": !0,
			children: /* @__PURE__ */ jsx(PlayIcon, {})
		}), assetIsAudio(asset) ? /* @__PURE__ */ jsx("div", {
			style: {
				aspectRatio: THUMBNAIL_ASPECT_RATIO,
				display: "flex",
				alignItems: "center",
				justifyContent: "center"
			},
			children: /* @__PURE__ */ jsx(AudioIcon, {
				width: "3em",
				height: "3em"
			})
		}) : /* @__PURE__ */ jsx(VideoThumbnail, { asset })]
	}), $[19] = asset, $[20] = onClickPlay, $[21] = renderVideo, $[22] = t10) : t10 = $[22];
	let t11;
	$[23] === asset ? t11 = $[24] : (t11 = /* @__PURE__ */ jsx(VideoMetadata, { asset }), $[23] = asset, $[24] = t11);
	let t12;
	$[25] === Symbol.for("react.memo_cache_sentinel") ? (t12 = {
		display: "flex",
		width: "100%",
		alignItems: "flex-end",
		justifyContent: "flex-start",
		gap: ".35rem"
	}, $[25] = t12) : t12 = $[25];
	let t13;
	$[26] !== onSelect || $[27] !== select ? (t13 = onSelect && /* @__PURE__ */ jsx(Button, {
		icon: CheckmarkIcon,
		fontSize: 2,
		padding: 2,
		mode: "ghost",
		text: "Select",
		style: { flex: 1 },
		tone: "positive",
		onClick: select
	}), $[26] = onSelect, $[27] = select, $[28] = t13) : t13 = $[28];
	let t14;
	$[29] === Symbol.for("react.memo_cache_sentinel") ? (t14 = { flex: 1 }, $[29] = t14) : t14 = $[29];
	let t15;
	$[30] === edit ? t15 = $[31] : (t15 = /* @__PURE__ */ jsx(Button, {
		icon: EditIcon,
		fontSize: 2,
		padding: 2,
		mode: "ghost",
		text: "Details",
		style: t14,
		onClick: edit
	}), $[30] = edit, $[31] = t15);
	let t16;
	$[32] !== t13 || $[33] !== t15 ? (t16 = /* @__PURE__ */ jsxs("div", {
		style: t12,
		children: [t13, t15]
	}), $[32] = t13, $[33] = t15, $[34] = t16) : t16 = $[34];
	let t17;
	$[35] !== t10 || $[36] !== t11 || $[37] !== t16 || $[38] !== t9 ? (t17 = /* @__PURE__ */ jsxs(Stack, {
		gap: 3,
		height: "fill",
		style: t8,
		children: [
			t9,
			t10,
			t11,
			t16
		]
	}), $[35] = t10, $[36] = t11, $[37] = t16, $[38] = t9, $[39] = t17) : t17 = $[39];
	let t18;
	return $[40] !== t17 || $[41] !== t6 || $[42] !== t7 ? (t18 = /* @__PURE__ */ jsxs(Card, {
		border: !0,
		padding: 2,
		sizing: "border",
		radius: 2,
		style: t5,
		children: [
			t6,
			t7,
			t17
		]
	}), $[40] = t17, $[41] = t6, $[42] = t7, $[43] = t18) : t18 = $[43], t18;
}
function VideosBrowser(t0) {
	let $ = c(58), { onSelect, config } = t0, { assets, isLoading, searchQuery, setSearchQuery, setSort, sort } = useAssets(), [page, setPage] = useState(0), pageTotal = Math.floor(assets.length / 20) + 1, [editedAsset, setEditedAsset] = useState(null), t1;
	$[0] !== assets || $[1] !== editedAsset ? (t1 = assets.find((a) => a._id === editedAsset?._id) || editedAsset, $[0] = assets, $[1] = editedAsset, $[2] = t1) : t1 = $[2];
	let freshEditedAsset = t1, pageStart = page * 20, pageEnd = pageStart + 20, placement = onSelect ? "input" : "tool", t2;
	$[3] === Symbol.for("react.memo_cache_sentinel") ? (t2 = { minHeight: "50vh" }, $[3] = t2) : t2 = $[3];
	let t3;
	$[4] === setSearchQuery ? t3 = $[5] : (t3 = (e) => setSearchQuery(e.currentTarget.value), $[4] = setSearchQuery, $[5] = t3);
	let t4;
	$[6] !== searchQuery || $[7] !== t3 ? (t4 = /* @__PURE__ */ jsx(TextInput, {
		value: searchQuery,
		icon: SearchIcon,
		onInput: t3,
		placeholder: "Search videos"
	}), $[6] = searchQuery, $[7] = t3, $[8] = t4) : t4 = $[8];
	let t5;
	$[9] !== setSort || $[10] !== sort ? (t5 = /* @__PURE__ */ jsx(SelectSortOptions, {
		setSort,
		sort
	}), $[9] = setSort, $[10] = sort, $[11] = t5) : t5 = $[11];
	let t6;
	$[12] !== page || $[13] !== pageTotal ? (t6 = /* @__PURE__ */ jsx(PageSelector, {
		page,
		setPage,
		total: pageTotal
	}), $[12] = page, $[13] = pageTotal, $[14] = t6) : t6 = $[14];
	let t7;
	$[15] !== t4 || $[16] !== t5 || $[17] !== t6 ? (t7 = /* @__PURE__ */ jsxs(Flex, {
		align: "center",
		gap: 3,
		children: [
			t4,
			t5,
			t6
		]
	}), $[15] = t4, $[16] = t5, $[17] = t6, $[18] = t7) : t7 = $[18];
	let t8;
	$[19] === placement ? t8 = $[20] : (t8 = placement === "tool" && /* @__PURE__ */ jsxs(Inline, {
		gap: 2,
		children: [
			/* @__PURE__ */ jsx(ImportVideosFromMux, {}),
			/* @__PURE__ */ jsx(ResyncMetadata, {}),
			/* @__PURE__ */ jsx(ConfigureApi, {})
		]
	}), $[19] = placement, $[20] = t8);
	let t9;
	$[21] !== t7 || $[22] !== t8 ? (t9 = /* @__PURE__ */ jsxs(Flex, {
		justify: "space-between",
		align: "center",
		children: [t7, t8]
	}), $[21] = t7, $[22] = t8, $[23] = t9) : t9 = $[23];
	let t10;
	$[24] !== assets.length || $[25] !== searchQuery ? (t10 = assets?.length > 0 && /* @__PURE__ */ jsxs(Label, {
		muted: !0,
		children: [
			assets.length,
			" video",
			assets.length > 1 ? "s" : null,
			" ",
			searchQuery ? `matching "${searchQuery}"` : "found"
		]
	}), $[24] = assets.length, $[25] = searchQuery, $[26] = t10) : t10 = $[26];
	let t11;
	$[27] === Symbol.for("react.memo_cache_sentinel") ? (t11 = { gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }, $[27] = t11) : t11 = $[27];
	let t12;
	if ($[28] !== assets || $[29] !== onSelect || $[30] !== pageEnd || $[31] !== pageStart) {
		let t13;
		$[33] === onSelect ? t13 = $[34] : (t13 = (asset) => /* @__PURE__ */ jsx(VideoInBrowser, {
			asset,
			onEdit: setEditedAsset,
			onSelect
		}, asset._id), $[33] = onSelect, $[34] = t13), t12 = assets.slice(pageStart, pageEnd).map(t13), $[28] = assets, $[29] = onSelect, $[30] = pageEnd, $[31] = pageStart, $[32] = t12;
	} else t12 = $[32];
	let t13;
	$[35] === t12 ? t13 = $[36] : (t13 = /* @__PURE__ */ jsx(Grid, {
		gap: 2,
		style: t11,
		children: t12
	}), $[35] = t12, $[36] = t13);
	let t14;
	$[37] !== t10 || $[38] !== t13 ? (t14 = /* @__PURE__ */ jsxs(Stack, {
		gap: 3,
		children: [t10, t13]
	}), $[37] = t10, $[38] = t13, $[39] = t14) : t14 = $[39];
	let t15;
	$[40] === isLoading ? t15 = $[41] : (t15 = isLoading && /* @__PURE__ */ jsx(SpinnerBox, {}), $[40] = isLoading, $[41] = t15);
	let t16;
	$[42] !== assets.length || $[43] !== isLoading || $[44] !== searchQuery ? (t16 = !isLoading && assets.length === 0 && /* @__PURE__ */ jsx(Card, {
		marginY: 4,
		paddingX: 4,
		paddingY: 6,
		border: !0,
		radius: 2,
		tone: "transparent",
		children: /* @__PURE__ */ jsx(Text, {
			align: "center",
			muted: !0,
			size: 3,
			children: searchQuery ? `No videos found for "${searchQuery}"` : "No videos in this dataset"
		})
	}), $[42] = assets.length, $[43] = isLoading, $[44] = searchQuery, $[45] = t16) : t16 = $[45];
	let t17;
	$[46] !== t14 || $[47] !== t15 || $[48] !== t16 || $[49] !== t9 ? (t17 = /* @__PURE__ */ jsxs(Stack, {
		padding: 4,
		gap: 4,
		style: t2,
		children: [
			t9,
			t14,
			t15,
			t16
		]
	}), $[46] = t14, $[47] = t15, $[48] = t16, $[49] = t9, $[50] = t17) : t17 = $[50];
	let t18;
	$[51] !== config || $[52] !== freshEditedAsset ? (t18 = freshEditedAsset && /* @__PURE__ */ jsx(VideoDetails, {
		closeDialog: () => setEditedAsset(null),
		asset: freshEditedAsset,
		config
	}), $[51] = config, $[52] = freshEditedAsset, $[53] = t18) : t18 = $[53];
	let t19;
	return $[54] !== config || $[55] !== t17 || $[56] !== t18 ? (t19 = /* @__PURE__ */ jsxs(DrmPlaybackWarningContextProvider, {
		config,
		children: [t17, t18]
	}), $[54] = config, $[55] = t17, $[56] = t18, $[57] = t19) : t19 = $[57], t19;
}
const StudioTool = (config) => {
	let $ = c(5), t0;
	$[0] === config ? t0 = $[1] : (t0 = /* @__PURE__ */ jsx(VideosBrowser, { config }), $[0] = config, $[1] = t0);
	let t1;
	return $[2] !== config.muxApiHost || $[3] !== t0 ? (t1 = /* @__PURE__ */ jsx(MuxApiHostProvider, {
		muxApiHost: config.muxApiHost,
		children: t0
	}), $[2] = config.muxApiHost, $[3] = t0, $[4] = t1) : t1 = $[4], t1;
}, DEFAULT_TOOL_CONFIG = {
	icon: ToolIcon,
	title: "Videos"
};
function createStudioTool(config) {
	let toolConfig = typeof config.tool == "object" ? config.tool : DEFAULT_TOOL_CONFIG;
	return {
		name: "mux",
		icon: toolConfig.icon || DEFAULT_TOOL_CONFIG.icon,
		title: toolConfig.title || DEFAULT_TOOL_CONFIG.title,
		component: (props) => /* @__PURE__ */ jsx(StudioTool, {
			...config,
			...props
		})
	};
}
const useAccessControl = (config) => {
	let $ = c(5), user = useCurrentUser(), t0;
	$[0] !== config || $[1] !== user?.roles ? (t0 = !config?.allowedRolesForConfiguration?.length || user?.roles?.some((role) => config.allowedRolesForConfiguration.includes(role.name)), $[0] = config, $[1] = user?.roles, $[2] = t0) : t0 = $[2];
	let hasConfigAccess = t0, t1;
	return $[3] === hasConfigAccess ? t1 = $[4] : (t1 = { hasConfigAccess }, $[3] = hasConfigAccess, $[4] = t1), t1;
}, path = [
	"assetId",
	"data",
	"playbackId",
	"status",
	"thumbTime",
	"filename",
	"robotsJobs",
	"robotsDirectiveRuns",
	"robotsPendingCreates",
	"robotsOutputs"
], useAssetDocumentValues = (asset) => useDocumentValues(isReference(asset) ? asset._ref : "", path), useMuxPolling = (asset) => {
	let $ = c(5), client = useClient$1(), projectId = useProjectId(), dataset = useDataset();
	asset?.data?.static_renditions?.status, asset?.data?.static_renditions?.files;
	let t0;
	bb0: {
		if (asset?.data?.static_renditions?.status && asset?.data?.static_renditions?.status !== "disabled") {
			t0 = !1;
			break bb0;
		}
		let files = asset?.data?.static_renditions?.files;
		if (!files || files.length === 0) {
			t0 = !1;
			break bb0;
		}
		t0 = files.some(_temp$3);
	}
	let isPreparingStaticRenditions = t0;
	asset?.assetId, asset?.status;
	let shouldFetch = !!asset?.assetId && (asset?.status === "preparing" || isPreparingStaticRenditions), errorLoggedRef = useRef(!1), t1;
	$[0] !== asset || $[1] !== client || $[2] !== dataset ? (t1 = async () => {
		try {
			let { data } = await getMuxAddonClient(client).request({
				url: `/addons/mux/assets/${dataset}/data/${asset.assetId}`,
				withCredentials: !0,
				method: "GET",
				query: PLUGIN_VERSION_QUERY
			});
			if (!asset?._id || !data) return;
			await client.patch(asset._id).set({
				status: data.status,
				data: addKeysToMuxData(data)
			}).commit({ returnDocuments: !1 }), errorLoggedRef.current = !1;
		} catch (t2) {
			let error = t2;
			errorLoggedRef.current || (errorLoggedRef.current = !0, console.error("[sanity-plugin-mux-input] Mux polling failed", {
				assetId: asset?.assetId,
				documentId: asset?._id,
				error
			}));
		}
	}, $[0] = asset, $[1] = client, $[2] = dataset, $[3] = t1) : t1 = $[3];
	let t2;
	return $[4] === Symbol.for("react.memo_cache_sentinel") ? (t2 = {
		refreshInterval: 2e3,
		refreshWhenHidden: !0,
		dedupingInterval: 1e3
	}, $[4] = t2) : t2 = $[4], useSWR(shouldFetch ? `/${projectId}/addons/mux/assets/${dataset}/data/${asset?.assetId}` : null, t1, t2);
};
function _temp$3(file) {
	return file.status === "preparing";
}
/** A minute: Mux can take a while to list the run once the asset is ready. */
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
/**
* After an upload that attached directives, looks for their work once the asset is ready, and
* says so: Mux dispatches the run server-side, with nothing else to observe it. Once per upload.
*/
function useRobotsUploadCheck(asset) {
	let $ = c(7), client = useClient$1(), toast = useToast(), [upload, setUpload] = useState(), checkedDocumentId = useRef(void 0), readyAssetId = upload && asset?._id === upload.documentId && asset.status === "ready" ? asset.assetId : void 0, t0, t1;
	$[0] !== client || $[1] !== readyAssetId || $[2] !== toast || $[3] !== upload ? (t0 = () => {
		if (!upload || !readyAssetId || checkedDocumentId.current === upload.documentId) return;
		let cancelled = !1, check = async () => {
			let hasFound = !1;
			for (let attempt = 0; attempt < 12; attempt++) {
				if (attempt > 0 && await wait(5e3), cancelled) return;
				try {
					let [jobs, ...runLists] = await Promise.all([listRobotsJobs(client, {
						assetId: readyAssetId,
						limit: 1
					}), ...upload.directiveIds.map((id) => listRobotsDirectiveRuns(client, id, { limit: 25 }))]), hasRun = runLists.some((runs) => (runs.data ?? []).some((run) => run.subject_id === readyAssetId));
					if (cancelled) return;
					let hasJob = (jobs.data ?? []).length > 0;
					if ((hasJob || hasRun) && !hasFound && (hasFound = !0, toast.push({
						status: "success",
						title: "Robots is working on this video",
						description: "Open Robots from the video’s menu to follow along."
					})), hasJob) break;
				} catch (t2) {
					let error = t2, unavailable = capabilityFromError(error);
					if (unavailable) {
						!cancelled && unavailable.state !== "unavailable" && toast.push({
							status: "warning",
							title: "The video uploaded, but Robots couldn’t run its directives",
							description: unavailable.state === "scope-missing" ? "This Mux token can’t use Robots." : "Robots isn’t enabled for this Mux account."
						});
						return;
					}
					console.error("[sanity-plugin-mux-input] Could not check Robots on the new video", error);
				}
			}
			hasFound && !cancelled && getRobotsSyncStore(client, upload.documentId, readyAssetId).refreshNow();
		};
		return check().then(() => {
			cancelled || (checkedDocumentId.current = upload.documentId);
		}), () => {
			cancelled = !0;
		};
	}, t1 = [
		client,
		toast,
		upload,
		readyAssetId
	], $[0] = client, $[1] = readyAssetId, $[2] = toast, $[3] = upload, $[4] = t0, $[5] = t1) : (t0 = $[4], t1 = $[5]), useEffect(t0, t1);
	let t2;
	return $[6] === Symbol.for("react.memo_cache_sentinel") ? (t2 = (documentId, directiveIds) => {
		directiveIds.length > 0 && setUpload({
			documentId,
			directiveIds
		});
	}, $[6] = t2) : t2 = $[6], t2;
}
function ErrorBoundaryCard(props) {
	let $ = c(18), { children, schemaType } = props, { push: pushToast } = useToast(), errorRef = useRef(null), t0;
	$[0] !== pushToast || $[1] !== schemaType ? (t0 = { onDidCatch: (err, errorInfo) => {
		console.group(err.toString()), console.groupCollapsed("console.error"), console.error(err), console.groupEnd(), err.stack && (console.groupCollapsed("error.stack"), console.log(err.stack), console.groupEnd()), errorInfo?.componentStack && (console.groupCollapsed("errorInfo.componentStack"), console.log(errorInfo.componentStack), console.groupEnd()), console.groupEnd(), pushToast({
			status: "error",
			title: "Plugin crashed",
			description: /* @__PURE__ */ jsx(Flex, {
				align: "center",
				children: /* @__PURE__ */ jsxs(Inline, {
					gap: 1,
					children: ["An error happened while rendering", /* @__PURE__ */ jsx(Button, {
						padding: 1,
						fontSize: 1,
						style: { transform: "translateY(1px)" },
						mode: "ghost",
						text: schemaType.title,
						onClick: () => {
							errorRef.current && scrollIntoView(errorRef.current, {
								behavior: "smooth",
								scrollMode: "if-needed",
								block: "center"
							});
						}
					})]
				})
			})
		});
	} }, $[0] = pushToast, $[1] = schemaType, $[2] = t0) : t0 = $[2];
	let { ErrorBoundary, didCatch, error, reset } = useErrorBoundary(t0), t1;
	$[3] === reset ? t1 = $[4] : (t1 = () => {
		clear([name]), reset();
	}, $[3] = reset, $[4] = t1);
	let handleRetry = t1;
	if (didCatch) {
		let t2;
		$[5] === Symbol.for("react.memo_cache_sentinel") ? (t2 = [
			2,
			3,
			4,
			4
		], $[5] = t2) : t2 = $[5];
		let t3;
		$[6] === Symbol.for("react.memo_cache_sentinel") ? (t3 = [
			2,
			3,
			4,
			4
		], $[6] = t3) : t3 = $[6];
		let t4;
		$[7] === Symbol.for("react.memo_cache_sentinel") ? (t4 = /* @__PURE__ */ jsxs(Heading, {
			as: "h1",
			children: [
				"The ",
				/* @__PURE__ */ jsx("code", { children: name }),
				" plugin crashed"
			]
		}), $[7] = t4) : t4 = $[7];
		let t5;
		$[8] === error ? t5 = $[9] : (t5 = error?.message && /* @__PURE__ */ jsx(Card, {
			padding: 3,
			tone: "critical",
			shadow: 1,
			radius: 2,
			children: /* @__PURE__ */ jsx(Text, { children: error.message })
		}), $[8] = error, $[9] = t5);
		let t6;
		$[10] === handleRetry ? t6 = $[11] : (t6 = /* @__PURE__ */ jsx(Inline, { children: /* @__PURE__ */ jsx(Button, {
			onClick: handleRetry,
			text: "Retry"
		}) }), $[10] = handleRetry, $[11] = t6);
		let t7;
		return $[12] !== t5 || $[13] !== t6 ? (t7 = /* @__PURE__ */ jsx(Card, {
			ref: errorRef,
			paddingX: t2,
			height: "fill",
			shadow: 1,
			overflow: "auto",
			children: /* @__PURE__ */ jsx(Flex, {
				justify: "flex-start",
				align: "center",
				height: "fill",
				children: /* @__PURE__ */ jsxs(Grid, {
					gridTemplateColumns: 1,
					gap: t3,
					children: [
						t4,
						t5,
						t6
					]
				})
			})
		}), $[12] = t5, $[13] = t6, $[14] = t7) : t7 = $[14], t7;
	}
	let t2;
	return $[15] !== ErrorBoundary || $[16] !== children ? (t2 = /* @__PURE__ */ jsx(ErrorBoundary, { children }), $[15] = ErrorBoundary, $[16] = children, $[17] = t2) : t2 = $[17], t2;
}
var ErrorBoundaryCard_default = memo(ErrorBoundaryCard);
const InputFallback = () => {
	let $ = c(4), t0;
	$[0] === Symbol.for("react.memo_cache_sentinel") ? (t0 = { padding: 1 }, $[0] = t0) : t0 = $[0];
	let t1;
	$[1] === Symbol.for("react.memo_cache_sentinel") ? (t1 = {
		aspectRatio: "16/9",
		width: "100%",
		borderRadius: "1px"
	}, $[1] = t1) : t1 = $[1];
	let t2;
	$[2] === Symbol.for("react.memo_cache_sentinel") ? (t2 = /* @__PURE__ */ jsx(Spinner, { muted: !0 }), $[2] = t2) : t2 = $[2];
	let t3;
	return $[3] === Symbol.for("react.memo_cache_sentinel") ? (t3 = /* @__PURE__ */ jsx("div", {
		style: t0,
		children: /* @__PURE__ */ jsx(Card, {
			shadow: 1,
			sizing: "border",
			style: t1,
			children: /* @__PURE__ */ jsxs(Flex, {
				align: "center",
				direction: "column",
				height: "fill",
				justify: "center",
				children: [t2, /* @__PURE__ */ jsx(Box, {
					marginTop: 3,
					children: /* @__PURE__ */ jsx(Text, {
						align: "center",
						muted: !0,
						size: 1,
						children: "Loading…"
					})
				})]
			})
		})
	}), $[3] = t3) : t3 = $[3], t3;
};
function Onboard(props) {
	let $ = c(11), { setDialogState } = props, t0;
	$[0] === setDialogState ? t0 = $[1] : (t0 = () => setDialogState("secrets"), $[0] = setDialogState, $[1] = t0);
	let handleOpen = t0, { hasConfigAccess } = useAccessControl(props.config), t1;
	$[2] === Symbol.for("react.memo_cache_sentinel") ? (t1 = { padding: 2 }, $[2] = t1) : t1 = $[2];
	let t2, t3;
	$[3] === Symbol.for("react.memo_cache_sentinel") ? (t2 = {
		aspectRatio: "16/9",
		width: "100%",
		boxShadow: "var(--card-bg-color) 0 0 0 2px"
	}, t3 = [
		2,
		3,
		4,
		4
	], $[3] = t2, $[4] = t3) : (t2 = $[3], t3 = $[4]);
	let t4;
	$[5] === Symbol.for("react.memo_cache_sentinel") ? (t4 = [
		2,
		3,
		4,
		4
	], $[5] = t4) : t4 = $[5];
	let t5;
	$[6] === Symbol.for("react.memo_cache_sentinel") ? (t5 = /* @__PURE__ */ jsx(Inline, {
		paddingY: 1,
		children: /* @__PURE__ */ jsx("div", {
			style: { height: "32px" },
			children: /* @__PURE__ */ jsx(MuxLogo, {})
		})
	}), $[6] = t5) : t5 = $[6];
	let t6;
	$[7] === Symbol.for("react.memo_cache_sentinel") ? (t6 = /* @__PURE__ */ jsx(Inline, {
		paddingY: 1,
		children: /* @__PURE__ */ jsx(Heading, {
			size: [
				0,
				1,
				2,
				2
			],
			children: "Upload and preview videos directly from your studio."
		})
	}), $[7] = t6) : t6 = $[7];
	let t7;
	return $[8] !== handleOpen || $[9] !== hasConfigAccess ? (t7 = /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", {
		style: t1,
		children: /* @__PURE__ */ jsx(Card, {
			display: "flex",
			sizing: "border",
			style: t2,
			paddingX: t3,
			radius: 1,
			tone: "transparent",
			children: /* @__PURE__ */ jsx(Flex, {
				justify: "flex-start",
				align: "center",
				children: /* @__PURE__ */ jsxs(Grid, {
					gridTemplateColumns: 1,
					gap: t4,
					children: [
						t5,
						t6,
						/* @__PURE__ */ jsx(Inline, {
							paddingY: 1,
							children: hasConfigAccess ? /* @__PURE__ */ jsx(Button, {
								mode: "ghost",
								icon: PlugIcon,
								text: "Configure API",
								onClick: handleOpen
							}) : /* @__PURE__ */ jsx(Card, {
								padding: [
									3,
									3,
									3
								],
								radius: 2,
								shadow: 1,
								tone: "critical",
								children: /* @__PURE__ */ jsx(Text, { children: "You do not have access to configure the Mux API. Please contact your administrator." })
							})
						})
					]
				})
			})
		})
	}) }), $[8] = handleOpen, $[9] = hasConfigAccess, $[10] = t7) : t7 = $[10], t7;
}
function createUpChunkObservable(uuid, uploadUrl, source) {
	return new Observable((subscriber) => {
		let upchunk = UpChunk.createUpload({
			endpoint: uploadUrl,
			file: source,
			dynamicChunkSize: !0
		}), successHandler = () => {
			subscriber.next({
				type: "success",
				id: uuid
			}), subscriber.complete();
		}, errorHandler = (data) => subscriber.error(Error(data.detail.message)), progressHandler = (data) => subscriber.next({
			type: "progress",
			percent: data.detail
		}), offlineHandler = () => {
			upchunk.pause(), subscriber.next({
				type: "pause",
				id: uuid
			});
		}, onlineHandler = () => {
			upchunk.resume(), subscriber.next({
				type: "resume",
				id: uuid
			});
		};
		return upchunk.on("success", successHandler), upchunk.on("error", errorHandler), upchunk.on("progress", progressHandler), upchunk.on("offline", offlineHandler), upchunk.on("online", onlineHandler), () => upchunk.abort();
	});
}
/**
* Format Google Drive share links as Google Drive export links.
* Supported formats:
*  - https://drive.google.com/uc?id=<ID>...
*  - https://drive.google.com/open?id=<ID>...
*  - https://drive.google.com/file/d/<ID>...
*  - https://drive.google.com/folder/<ID>...
*
* @param url Google Drive share link to format.
* @returns Google Drive export link (URL passthrough if not share link).
*/
function formatDriveShareLink(url) {
	let formatExportLink = (id) => `https://drive.usercontent.google.com/download?export=download&authuser=0&confirm=t&at=0&id=${id}`;
	try {
		let trimmed = url.trim(), parsed = new URL(trimmed);
		if (parsed.hostname !== "drive.google.com") throw Error("URL is not from Google Drive.");
		let id = parsed.searchParams.get("id") || "";
		if (id.length) return formatExportLink(id);
		let path = parsed.pathname.split("/") || [];
		if (path.includes("file") && path.includes("d")) {
			let index = path.findIndex((value) => value === "d") + 1;
			return formatExportLink(path.at(index) || "");
		}
		if (path.includes("folders")) {
			let index = path.findIndex((value) => value === "folders") + 1;
			return formatExportLink(path.at(index) || "");
		}
		throw Error("URL was not recognized.");
	} catch {
		return url;
	}
}
/**
* Rounds the numeric part of a px string to the nearest integer.
* Returns undefined if the value is not a valid px string or not a finite number.
* Avoids sending 0px (and JS -0); snaps to ±1 instead.
*/
function roundPxString(value) {
	if (typeof value != "string") return;
	let trimmed = value.trim();
	if (!trimmed.endsWith("px")) return;
	let n = Number(trimmed.slice(0, -2));
	if (!Number.isFinite(n)) return;
	let rounded = Math.round(n);
	return rounded === 0 && (rounded = n < 0 ? -1 : 1), `${rounded}px`;
}
function sanitizeOverlaySettingsInPlace(settings) {
	let inputs = settings.input;
	if (inputs) for (let input of inputs) {
		let overlay = input.overlay_settings;
		if (!overlay) continue;
		let hm = roundPxString(overlay.horizontal_margin), vm = roundPxString(overlay.vertical_margin), w = roundPxString(overlay.width);
		hm && (overlay.horizontal_margin = hm), vm && (overlay.vertical_margin = vm), w && (overlay.width = w);
	}
}
function sanitizePxStringsInJson(json) {
	return json.replace(/"(-?\d+(?:\.\d+)?)px"/g, (_match, num) => {
		let n = Number(num);
		if (!Number.isFinite(n)) return _match;
		let rounded = Math.round(n);
		return rounded === 0 && (rounded = n < 0 ? -1 : 1), `"${rounded}px"`;
	});
}
function cancelUpload(client, uuid) {
	return getMuxAddonClient(client).observable.request({
		url: `/addons/mux/uploads/${client.config().dataset}/${uuid}`,
		withCredentials: !0,
		method: "DELETE",
		query: PLUGIN_VERSION_QUERY
	});
}
function uploadUrl({ url, settings, client, assetName }) {
	return testUrl(url).pipe(switchMap((validUrl) => concat(of({
		type: "url",
		url: validUrl
	}), testSecretsObservable(client).pipe(switchMap((json) => {
		if (!json || !json.status) return throwError(() => /* @__PURE__ */ Error("Invalid credentials"));
		let uuid$1 = uuid(), muxBody = settings;
		muxBody.input ||= [{ type: "video" }], muxBody.input[0].url = validUrl, sanitizeOverlaySettingsInPlace(muxBody);
		let query = { muxBody: sanitizePxStringsInJson(JSON.stringify(muxBody)) }, filename = assetName || validUrl.split("/").slice(-1)[0];
		filename && (query.filename = filename);
		let dataset = client.config().dataset;
		return defer(() => getMuxAddonClient(client).observable.request({
			url: `/addons/mux/assets/${dataset}`,
			withCredentials: !0,
			method: "POST",
			headers: {
				"MUX-Proxy-UUID": uuid$1,
				"Content-Type": "application/json"
			},
			query: {
				...query,
				...PLUGIN_VERSION_QUERY
			}
		})).pipe(mergeMap((result) => {
			let asset = result && result.results && result.results[0] && result.results[0].document || null;
			return asset ? of({
				type: "success",
				id: uuid$1,
				asset
			}) : throwError(() => /* @__PURE__ */ Error("No asset document returned"));
		}));
	})))));
}
function uploadFile({ settings, client, file, watermark, assetName }) {
	return testFile(file).pipe(switchMap((fileOptions) => concat(of({
		type: "file",
		file: fileOptions
	}), testSecretsObservable(client).pipe(switchMap((json) => {
		if (!json || !json.status) return throwError(() => /* @__PURE__ */ Error("Invalid credentials"));
		let uuid$2 = uuid(), body = settings;
		return sanitizeOverlaySettingsInPlace(body), concat(of({
			type: "uuid",
			uuid: uuid$2
		}), defer(() => getMuxAddonClient(client).observable.request({
			url: `/addons/mux/uploads/${client.config().dataset}`,
			withCredentials: !0,
			method: "POST",
			headers: {
				"MUX-Proxy-UUID": uuid$2,
				"Content-Type": "application/json"
			},
			body,
			query: PLUGIN_VERSION_QUERY
		})).pipe(mergeMap((result) => createUpChunkObservable(uuid$2, result.upload.url, file).pipe(mergeMap((event) => event.type === "success" ? from(updateAssetDocumentFromUpload(client, uuid$2, watermark, assetName)).pipe(mergeMap((doc) => of({
			...event,
			asset: doc
		}))) : of(event)), catchError((err) => cancelUpload(client, uuid$2).pipe(mergeMap(() => throwError(() => err))))))));
	})))));
}
function getUpload(client, assetId) {
	let { dataset } = client.config();
	return getMuxAddonClient(client).request({
		url: `/addons/mux/uploads/${dataset}/${assetId}`,
		withCredentials: !0,
		method: "GET",
		query: PLUGIN_VERSION_QUERY
	});
}
function pollUpload(client, uuid) {
	let pollInterval, tries = 0, assetId, upload;
	return new Promise((resolve, reject) => {
		pollInterval = setInterval(async () => {
			try {
				upload = await getUpload(client, uuid);
			} catch (err) {
				reject(err);
				return;
			}
			assetId = upload && upload.data && upload.data.asset_id, assetId && (clearInterval(pollInterval), resolve(upload)), tries > 10 && (clearInterval(pollInterval), reject(/* @__PURE__ */ Error("Upload did not finish"))), tries++;
		}, 2e3);
	});
}
async function updateAssetDocumentFromUpload(client, uuid, _watermark, assetName) {
	let upload, asset;
	try {
		upload = await pollUpload(client, uuid);
	} catch (err) {
		return Promise.reject(err);
	}
	try {
		asset = await getAsset(client, upload.data.asset_id);
	} catch (err) {
		return Promise.reject(err);
	}
	let fields = {
		status: asset.data.status,
		data: asset.data,
		assetId: asset.data.id,
		playbackId: asset.data.playback_ids[0]?.id,
		uploadId: upload.data.id,
		filename: assetName || void 0
	};
	return await uploadedAssetTransaction(client, uuid, fields).commit({ returnDocuments: !1 }), {
		_id: uuid,
		_type: "mux.videoAsset",
		...fields
	};
}
/**
* Writes what a finished upload produced onto its asset document. A patch, not a replace, so
* fields written since the upload was created (`filename`, Robots data) are kept.
*/
function uploadedAssetTransaction(client, uuid, fields) {
	return client.transaction().createIfNotExists({
		_id: uuid,
		_type: "mux.videoAsset"
	}).patch(uuid, (patch) => patch.set(fields));
}
function testFile(file) {
	if (typeof window < "u" && file instanceof window.File) {
		let fileOptions = optionsFromFile({}, file);
		return of(fileOptions);
	}
	return throwError(() => /* @__PURE__ */ Error("Invalid file"));
}
function testUrl(url) {
	let error = /* @__PURE__ */ Error("Invalid URL");
	if (typeof url != "string") return throwError(() => error);
	let formattedUrl = url.trim();
	formattedUrl = formatDriveShareLink(formattedUrl);
	let parsed;
	try {
		parsed = new URL(formattedUrl);
	} catch {
		return throwError(() => error);
	}
	return parsed && !parsed.protocol.match(/http:|https:/) ? throwError(() => error) : of(formattedUrl);
}
function optionsFromFile(opts, file) {
	if (typeof window < "u" && file instanceof window.File) return {
		name: opts.preserveFilename === !1 ? void 0 : file.name,
		type: file.type
	};
}
function isValidUrl(url) {
	try {
		let parsed = new URL(url);
		return parsed && !!parsed.protocol.match(/http:|https:/);
	} catch {
		return !1;
	}
}
/**
* We consider a server error one with status code 5XX.
* Used mainly to handle unknown Proxy issues.
*/
function isServerError(error) {
	return "statusCode" in error && typeof error.statusCode == "number" && 500 <= error.statusCode && error.statusCode <= 600;
}
/**
* Utilities for extracting files from dataTransfer in a predictable cross-browser fashion.
* Also recursively extracts files from a directory
* Inspired by https://github.com/component/normalized-upload
*/
function extractDroppedFiles(dataTransfer) {
	let files = Array.from(dataTransfer.files || []), items = Array.from(dataTransfer.items || []);
	return files && files.length > 0 ? Promise.resolve(files) : normalizeItems(items).then((arr) => arr.flat());
}
function normalizeItems(items) {
	return Promise.all(items.map((item) => {
		if (item.kind === "file" && item.webkitGetAsEntry) {
			let entry;
			try {
				entry = item.webkitGetAsEntry();
			} catch {
				return [item.getAsFile()];
			}
			return entry ? entry.isDirectory ? walk(entry) : [item.getAsFile()] : [];
		}
		if (item.kind === "file") {
			let file = item.getAsFile();
			return Promise.resolve(file ? [file] : []);
		}
		return new Promise((resolve) => item.getAsString(resolve)).then((str) => str ? [new File([str], "unknown.txt", { type: item.type })] : []);
	}));
}
function isFile(entry) {
	return entry.isFile;
}
function isDirectory(entry) {
	return entry.isDirectory;
}
function walk(entry) {
	if (isFile(entry)) return new Promise((resolve) => entry.file(resolve)).then((file) => [file]);
	if (isDirectory(entry)) {
		let dir = entry.createReader();
		return new Promise((resolve) => dir.readEntries(resolve)).then((entries) => entries.filter((entr) => !entr.name.startsWith("."))).then((entries) => Promise.all(entries.map(walk)).then((arr) => arr.flat()));
	}
	return Promise.resolve([]);
}
/**
* Watch when a Mux asset enters a 'ready' state on Sanity
* and update the metadata field in the provided Sanity document.
* 
* @param assetId Sanity ID of the Mux asset to be watched.
* @param props Props of the Sanity document to be edited on update.
*/
const watchAssetForMetadata = (assetId, props) => {
	let subscription = props.client.listen("*[_id == $id]", { id: assetId }, { includeResult: !0 }).subscribe((event) => {
		if (event.type !== "mutation") return;
		let asset = event.result, data = asset?.data, status = asset?.status;
		data && status === "ready" && (props.onChange(PatchEvent.from([set({
			_type: "metadata",
			...data
		}, ["data"])])), subscription.unsubscribe());
	});
};
function SelectAssets(t0) {
	let $ = c(8), { asset: selectedAsset, onChange, setDialogState, config } = t0, t1;
	$[0] !== config.inlineAssetMetadata || $[1] !== onChange || $[2] !== selectedAsset?._id || $[3] !== setDialogState ? (t1 = (chosenAsset) => {
		if (chosenAsset?._id || onChange(PatchEvent.from([unset(["asset"])])), chosenAsset._id !== selectedAsset?._id) {
			let patches = [];
			patches.push(setIfMissing({
				asset: {},
				_type: "mux.video"
			})), patches.push(set({
				_type: "reference",
				_weak: !0,
				_ref: chosenAsset._id
			}, ["asset"])), config.inlineAssetMetadata && (patches.push(setIfMissing({ data: {} })), patches.push(set({
				_type: "metadata",
				...chosenAsset.data ?? {}
			}, ["data"]))), onChange(PatchEvent.from(patches));
		}
		setDialogState(!1);
	}, $[0] = config.inlineAssetMetadata, $[1] = onChange, $[2] = selectedAsset?._id, $[3] = setDialogState, $[4] = t1) : t1 = $[4];
	let handleSelect = t1, t2;
	return $[5] !== config || $[6] !== handleSelect ? (t2 = /* @__PURE__ */ jsx(VideosBrowser, {
		onSelect: handleSelect,
		config
	}), $[5] = config, $[6] = handleSelect, $[7] = t2) : t2 = $[7], t2;
}
/** To prevent Content Layout Shift (CLS), ensure that the dialog always occupies the entire available height. */
const StyledDialog = styled(Dialog).withConfig({
	displayName: "StyledDialog",
	componentId: "sc-4nckxm-0"
})`> div[data-ui='DialogCard'] > div[data-ui='Card']{height:100%;}`;
function InputBrowser(t0) {
	let $ = c(11), { setDialogState, asset, onChange, config } = t0, id = `InputBrowser${useId()}`, t1;
	$[0] === setDialogState ? t1 = $[1] : (t1 = () => setDialogState(!1), $[0] = setDialogState, $[1] = t1);
	let handleClose = t1, t2;
	$[2] !== asset || $[3] !== config || $[4] !== onChange || $[5] !== setDialogState ? (t2 = /* @__PURE__ */ jsx(SelectAssets, {
		config,
		asset,
		onChange,
		setDialogState
	}), $[2] = asset, $[3] = config, $[4] = onChange, $[5] = setDialogState, $[6] = t2) : t2 = $[6];
	let t3;
	return $[7] !== handleClose || $[8] !== id || $[9] !== t2 ? (t3 = /* @__PURE__ */ jsx(StyledDialog, {
		__unstable_autoFocus: !0,
		header: "Select video",
		id,
		onClose: handleClose,
		width: 2,
		children: t2
	}), $[7] = handleClose, $[8] = id, $[9] = t2, $[10] = t3) : t3 = $[10], t3;
}
const useCancelUpload = (asset, onChange) => {
	let $ = c(4), client = useClient$1(), t0;
	return $[0] !== asset || $[1] !== client || $[2] !== onChange ? (t0 = () => {
		asset && (onChange(PatchEvent.from(unset())), asset.assetId && deleteAssetOnMux(client, asset.assetId), asset._id && client.delete(asset._id));
	}, $[0] = asset, $[1] = client, $[2] = onChange, $[3] = t0) : t0 = $[3], t0;
}, TopControls = styled.div.withConfig({
	displayName: "TopControls",
	componentId: "sc-plhubf-0"
})`position:absolute;top:0;right:0;justify-content:flex-end;button{height:auto;}`;
/**
* The document the video field sits in, as the place a summary is applied to: its top-level
* fields, written as a normal edit (draft or release version alike). Form inputs only.
*/
function useSummaryTarget() {
	let $ = c(12), document = useFormValue([]) ?? {}, id = typeof document._id == "string" ? document._id : "", typeName = typeof document._type == "string" ? document._type : "", schemaType = useSchema().get(typeName), objectType = schemaType?.jsonType === "object" ? schemaType : void 0, t0;
	$[0] === id ? t0 = $[1] : (t0 = getPublishedId(id), $[0] = id, $[1] = t0);
	let t1;
	$[2] === id ? t1 = $[3] : (t1 = getVersionFromId(id), $[2] = id, $[3] = t1);
	let { patch } = useDocumentOperation(t0, typeName, t1), t2 = summaryTargetFields(objectType), t3 = !objectType?.liveEdit, t4 = patch.disabled ? "This document can’t be edited right now." : void 0, t5;
	$[4] === patch ? t5 = $[5] : (t5 = (values) => patch.execute([{ set: values }]), $[4] = patch, $[5] = t5);
	let t6;
	return $[6] !== document || $[7] !== t2 || $[8] !== t3 || $[9] !== t4 || $[10] !== t5 ? (t6 = {
		document,
		fields: t2,
		isDraft: t3,
		disabledReason: t4,
		apply: t5
	}, $[6] = document, $[7] = t2, $[8] = t3, $[9] = t4, $[10] = t5, $[11] = t6) : t6 = $[11], t6;
}
/**
* The Robots panel, opened from the player's actions menu in a document's video field. There, a
* summary can also be applied to that document's own fields.
*/
function RobotsDialog(props) {
	let $ = c(9), { setDialogState } = useDialogStateContext(), id = useId(), summaryTarget = useSummaryTarget(), t0 = `robots${id}`, t1;
	$[0] === setDialogState ? t1 = $[1] : (t1 = () => setDialogState(!1), $[0] = setDialogState, $[1] = t1);
	let t2 = props.readOnly ? void 0 : summaryTarget, t3;
	$[2] !== props || $[3] !== t2 ? (t3 = /* @__PURE__ */ jsx(Box, {
		padding: 4,
		children: /* @__PURE__ */ jsx(RobotsErrorBoundary, { children: /* @__PURE__ */ jsx(RobotsPanel, {
			...props,
			summaryTarget: t2
		}) })
	}), $[2] = props, $[3] = t2, $[4] = t3) : t3 = $[4];
	let t4;
	return $[5] !== t0 || $[6] !== t1 || $[7] !== t3 ? (t4 = /* @__PURE__ */ jsx(Dialog, {
		id: t0,
		header: "Robots",
		onClose: t1,
		zOffset: DIALOGS_Z_INDEX,
		width: 2,
		children: t3
	}), $[5] = t0, $[6] = t1, $[7] = t3, $[8] = t4) : t4 = $[8], t4;
}
const CardWrapper = styled(Card).withConfig({
	displayName: "CardWrapper",
	componentId: "sc-i2lk64-0"
})`min-height:82px;box-sizing:border-box;`, FlexWrapper = styled(Flex).withConfig({
	displayName: "FlexWrapper",
	componentId: "sc-i2lk64-1"
})`text-overflow:ellipsis;overflow:hidden;`, LeftSection = styled(Stack).withConfig({
	displayName: "LeftSection",
	componentId: "sc-i2lk64-2"
})`position:relative;width:60%;`, CodeWrapper = styled(Code).withConfig({
	displayName: "CodeWrapper",
	componentId: "sc-i2lk64-3"
})`position:relative;width:100%;code{overflow:hidden;text-overflow:ellipsis;position:relative;max-width:200px;}`, UploadProgress = (t0) => {
	let $ = c(18), { progress: t1, onCancel, filename, text: t2 } = t0, progress = t1 === void 0 ? 100 : t1, text = t2 === void 0 ? "Uploading" : t2, isCancelDisabled = progress >= 90, t3, t4;
	$[0] === Symbol.for("react.memo_cache_sentinel") ? (t3 = [
		3,
		3,
		2,
		2
	], t4 = [
		"column",
		"column",
		"row"
	], $[0] = t3, $[1] = t4) : (t3 = $[0], t4 = $[1]);
	let t5 = filename || "...", t6;
	$[2] === t5 ? t6 = $[3] : (t6 = /* @__PURE__ */ jsx(CodeWrapper, {
		size: 1,
		children: t5
	}), $[2] = t5, $[3] = t6);
	let t7;
	$[4] !== t6 || $[5] !== text ? (t7 = /* @__PURE__ */ jsx(Flex, {
		justify: "center",
		gap: t3,
		direction: t4,
		children: /* @__PURE__ */ jsx(Text, {
			size: 1,
			children: /* @__PURE__ */ jsxs(Inline, {
				gap: 2,
				children: [text, t6]
			})
		})
	}), $[4] = t6, $[5] = text, $[6] = t7) : t7 = $[6];
	let t8;
	$[7] === progress ? t8 = $[8] : (t8 = /* @__PURE__ */ jsx(Card, {
		marginTop: 3,
		radius: 5,
		shadow: 1,
		children: /* @__PURE__ */ jsx(LinearProgress, { value: progress })
	}), $[7] = progress, $[8] = t8);
	let t9;
	$[9] !== t7 || $[10] !== t8 ? (t9 = /* @__PURE__ */ jsxs(LeftSection, { children: [t7, t8] }), $[9] = t7, $[10] = t8, $[11] = t9) : t9 = $[11];
	let t10;
	$[12] !== isCancelDisabled || $[13] !== onCancel ? (t10 = onCancel ? /* @__PURE__ */ jsx(Button, {
		fontSize: 2,
		text: "Cancel upload",
		mode: "ghost",
		tone: "critical",
		onClick: onCancel,
		disabled: isCancelDisabled
	}) : null, $[12] = isCancelDisabled, $[13] = onCancel, $[14] = t10) : t10 = $[14];
	let t11;
	return $[15] !== t10 || $[16] !== t9 ? (t11 = /* @__PURE__ */ jsx(CardWrapper, {
		tone: "primary",
		padding: 4,
		border: !0,
		height: "fill",
		children: /* @__PURE__ */ jsxs(FlexWrapper, {
			align: "center",
			justify: "space-between",
			height: "fill",
			direction: "row",
			gap: 2,
			children: [t9, t10]
		})
	}), $[15] = t10, $[16] = t9, $[17] = t11) : t11 = $[17], t11;
}, Player = ({ asset, buttons, readOnly, onChange, config }) => {
	let { dialogState } = useDialogStateContext(), isLoading = useMemo(() => asset?.status === "preparing" ? "Preparing the video" : asset?.status === "waiting_for_upload" ? "Waiting for upload to start" : asset?.status === "waiting" ? "Processing upload" : asset?.status !== "ready" && asset?.status !== void 0, [asset]), isPreparingStaticRenditions = useMemo(() => {
		if (asset?.data?.static_renditions?.status && asset?.data?.static_renditions?.status !== "disabled") return !1;
		let files = asset?.data?.static_renditions?.files;
		return !files || files.length === 0 ? !1 : files.some((file) => file.status === "preparing");
	}, [asset?.data?.static_renditions?.status, asset?.data?.static_renditions?.files]), playRef = useRef(null), muteRef = useRef(null), handleCancelUpload = useCancelUpload(asset, onChange);
	return useEffect(() => {
		let style = document.createElement("style");
		style.innerHTML = "button svg { vertical-align: middle; }", playRef.current?.shadowRoot && playRef.current.shadowRoot.appendChild(style), muteRef?.current?.shadowRoot && muteRef.current.shadowRoot.appendChild(style.cloneNode(!0));
	}, []), useEffect(() => {
		if (asset?.status === "errored") throw handleCancelUpload(), Error(asset.data?.errors?.messages?.join(" "));
	}, [
		asset.data?.errors?.messages,
		asset?.status,
		handleCancelUpload
	]), !asset || !asset.status ? null : isLoading ? /* @__PURE__ */ jsx(UploadProgress, {
		progress: 100,
		filename: asset?.filename,
		text: isLoading !== !0 && isLoading || "Waiting for Mux to complete the upload",
		onCancel: readOnly ? void 0 : () => handleCancelUpload()
	}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(VideoPlayer, {
		asset,
		hlsConfig: config?.hlsConfig,
		deferPlayer: !0,
		readOnly,
		children: [buttons && /* @__PURE__ */ jsx(TopControls, {
			slot: "top-chrome",
			children: buttons
		}), isPreparingStaticRenditions && /* @__PURE__ */ jsx(Card, {
			padding: 2,
			radius: 1,
			style: {
				background: "var(--card-fg-color)",
				position: "absolute",
				top: "0.5em",
				left: "0.5em"
			},
			children: /* @__PURE__ */ jsx(Text, {
				size: 1,
				style: { color: "var(--card-bg-color)" },
				children: "MUX is preparing static renditions, please stand by"
			})
		})]
	}, asset._id), dialogState === "robots" && config && /* @__PURE__ */ jsx(RobotsDialog, {
		asset,
		config,
		readOnly
	})] });
};
function focusRingBorderStyle(border) {
	return `inset 0 0 0 ${border.width}px ${border.color}`;
}
function focusRingStyle(opts) {
	let { base, border, focusRing } = opts, focusRingOutsetWidth = focusRing.offset + focusRing.width, focusRingInsetWidth = 0 - focusRing.offset, bgColor = base ? base.bg : "var(--card-bg-color)";
	return [
		focusRingInsetWidth > 0 && `inset 0 0 0 ${focusRingInsetWidth}px var(--card-focus-ring-color)`,
		border && focusRingBorderStyle(border),
		focusRingInsetWidth < 0 && `0 0 0 ${0 - focusRingInsetWidth}px ${bgColor}`,
		focusRingOutsetWidth > 0 && `0 0 0 ${focusRingOutsetWidth}px var(--card-focus-ring-color)`
	].filter(Boolean).join(",");
}
const FileButton = /* @__PURE__ */ styled(MenuItem).withConfig({
	displayName: "FileButton",
	componentId: "sc-2fqg17-0"
})(({ theme }) => {
	let { focusRing } = theme.sanity, base = theme.sanity.color.base;
	return css`position:relative;&:not([data-disabled='true']){&:focus-within{box-shadow:${focusRingStyle({
		base,
		border: {
			width: 1,
			color: "var(--card-border-color)"
		},
		focusRing
	})};}}& input{overflow:hidden;top:0;left:0;width:100%;height:100%;position:absolute;min-width:0;display:block;appearance:none;padding:0;margin:0;border:0;opacity:0;}`;
});
function FileInputMenuItem(props) {
	let $ = c(42), Icon, accept, capture, disabled, fontSize, idProp, multiple, onSelect, ref, rest, t0, text, textAlign;
	$[0] === props ? (Icon = $[1], accept = $[2], capture = $[3], disabled = $[4], fontSize = $[5], idProp = $[6], multiple = $[7], onSelect = $[8], ref = $[9], rest = $[10], t0 = $[11], text = $[12], textAlign = $[13]) : ({icon: Icon, id: idProp, accept, capture, fontSize, multiple, onSelect, gap: t0, textAlign, text, disabled, ref, ...rest} = props, $[0] = props, $[1] = Icon, $[2] = accept, $[3] = capture, $[4] = disabled, $[5] = fontSize, $[6] = idProp, $[7] = multiple, $[8] = onSelect, $[9] = ref, $[10] = rest, $[11] = t0, $[12] = text, $[13] = textAlign);
	let gap = t0 === void 0 ? 3 : t0, idHook = useId(), id = idProp || idHook, t1;
	$[14] === onSelect ? t1 = $[15] : (t1 = (event) => {
		onSelect && event.target.files && onSelect(Array.from(event.target.files));
	}, $[14] = onSelect, $[15] = t1);
	let handleChange = t1, t2;
	$[16] !== Icon || $[17] !== fontSize || $[18] !== gap || $[19] !== text ? (t2 = Icon && /* @__PURE__ */ jsx(Box, {
		marginRight: text ? gap : void 0,
		children: /* @__PURE__ */ jsxs(Text, {
			size: fontSize,
			children: [isValidElement(Icon) && Icon, isValidElementType(Icon) && /* @__PURE__ */ jsx(Icon, {})]
		})
	}), $[16] = Icon, $[17] = fontSize, $[18] = gap, $[19] = text, $[20] = t2) : t2 = $[20];
	let t3;
	$[21] !== fontSize || $[22] !== text || $[23] !== textAlign ? (t3 = text && /* @__PURE__ */ jsx(Text, {
		align: textAlign,
		size: fontSize,
		textOverflow: "ellipsis",
		children: text
	}), $[21] = fontSize, $[22] = text, $[23] = textAlign, $[24] = t3) : t3 = $[24];
	let t4;
	$[25] !== t2 || $[26] !== t3 ? (t4 = /* @__PURE__ */ jsxs(Flex, {
		align: "center",
		justify: "flex-start",
		children: [t2, t3]
	}), $[25] = t2, $[26] = t3, $[27] = t4) : t4 = $[27];
	let content = t4, t5;
	$[28] !== accept || $[29] !== capture || $[30] !== disabled || $[31] !== handleChange || $[32] !== id || $[33] !== multiple ? (t5 = /* @__PURE__ */ jsx("input", {
		"data-testid": "file-button-input",
		accept,
		capture,
		id,
		multiple,
		onChange: handleChange,
		type: "file",
		value: "",
		disabled
	}), $[28] = accept, $[29] = capture, $[30] = disabled, $[31] = handleChange, $[32] = id, $[33] = multiple, $[34] = t5) : t5 = $[34];
	let t6;
	return $[35] !== content || $[36] !== disabled || $[37] !== id || $[38] !== ref || $[39] !== rest || $[40] !== t5 ? (t6 = /* @__PURE__ */ jsxs(FileButton, {
		...rest,
		htmlFor: id,
		disabled,
		ref,
		children: [content, t5]
	}), $[35] = content, $[36] = disabled, $[37] = id, $[38] = ref, $[39] = rest, $[40] = t5, $[41] = t6) : t6 = $[41], t6;
}
const LockCard = styled(Card).withConfig({
	displayName: "LockCard",
	componentId: "sc-1dbiv-0"
})`position:absolute;top:0;left:0;opacity:0.6;mix-blend-mode:screen;background:transparent;`, LockButton = styled(Button).withConfig({
	displayName: "LockButton",
	componentId: "sc-1dbiv-1"
})`background:transparent;color:white;`, isVideoAsset = (asset) => asset._type === "mux.videoAsset";
function PlayerActionsMenu(props) {
	let $ = c(57), { asset, readOnly, dialogState, setDialogState, onChange, onSelect, accept } = props, [open, setOpen] = useState(!1), [menuElement, setMenuRef] = useState(null), isSigned = getPlaybackPolicy(asset)?.policy === "signed", { hasConfigAccess } = useAccessControl(props.config), t0;
	$[0] === Symbol.for("react.memo_cache_sentinel") ? (t0 = { showToast: !0 }, $[0] = t0) : t0 = $[0];
	let { resyncAsset, isResyncing } = useResyncAsset(t0), t1;
	$[1] === onChange ? t1 = $[2] : (t1 = () => onChange(PatchEvent.from(unset([]))), $[1] = onChange, $[2] = t1);
	let onReset = t1, t2;
	$[3] !== asset || $[4] !== resyncAsset ? (t2 = async () => {
		setOpen(!1), await resyncAsset(asset);
	}, $[3] = asset, $[4] = resyncAsset, $[5] = t2) : t2 = $[5];
	let handleResync = t2, t3, t4;
	$[6] !== dialogState || $[7] !== open ? (t3 = () => {
		open && dialogState && setOpen(!1);
	}, t4 = [dialogState, open], $[6] = dialogState, $[7] = open, $[8] = t3, $[9] = t4) : (t3 = $[8], t4 = $[9]), useEffect(t3, t4);
	let t5;
	$[10] === Symbol.for("react.memo_cache_sentinel") ? (t5 = () => setOpen(!1), $[10] = t5) : t5 = $[10];
	let t6;
	$[11] === menuElement ? t6 = $[12] : (t6 = () => [menuElement], $[11] = menuElement, $[12] = t6), useClickOutsideEvent(t5, t6);
	let t7;
	$[13] === isSigned ? t7 = $[14] : (t7 = isSigned && /* @__PURE__ */ jsx(Tooltip, {
		animate: !0,
		content: /* @__PURE__ */ jsx(Box, {
			padding: 2,
			children: /* @__PURE__ */ jsx(Text, {
				muted: !0,
				size: 1,
				children: "Signed playback policy"
			})
		}),
		placement: "right",
		portal: !0,
		children: /* @__PURE__ */ jsx(LockCard, {
			radius: 2,
			margin: 2,
			scheme: "dark",
			tone: "positive",
			children: /* @__PURE__ */ jsx(LockButton, {
				icon: LockIcon,
				mode: "bleed",
				tone: "positive"
			})
		})
	}), $[13] = isSigned, $[14] = t7);
	let t8;
	$[15] === Symbol.for("react.memo_cache_sentinel") ? (t8 = /* @__PURE__ */ jsx(Box, {
		padding: 2,
		children: /* @__PURE__ */ jsx(Label, {
			muted: !0,
			size: 1,
			children: "Replace"
		})
	}), $[15] = t8) : t8 = $[15];
	let t9;
	$[16] !== accept || $[17] !== onSelect || $[18] !== readOnly ? (t9 = /* @__PURE__ */ jsx(FileInputMenuItem, {
		accept,
		icon: UploadIcon,
		onSelect,
		text: "Upload",
		disabled: readOnly,
		fontSize: 1
	}), $[16] = accept, $[17] = onSelect, $[18] = readOnly, $[19] = t9) : t9 = $[19];
	let t10;
	$[20] === setDialogState ? t10 = $[21] : (t10 = /* @__PURE__ */ jsx(MenuItem, {
		icon: SearchIcon,
		text: "Browse",
		onClick: () => setDialogState("select-video")
	}), $[20] = setDialogState, $[21] = t10);
	let t11;
	$[22] !== asset || $[23] !== handleResync || $[24] !== isResyncing || $[25] !== readOnly || $[26] !== setDialogState ? (t11 = isVideoAsset(asset) && /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(MenuItem, {
			icon: ImageIcon,
			text: "Thumbnail",
			onClick: () => setDialogState("edit-thumbnail")
		}),
		/* @__PURE__ */ jsx(MenuItem, {
			icon: TranslateIcon,
			text: "Captions",
			onClick: () => setDialogState("edit-captions")
		}),
		/* @__PURE__ */ jsx(MenuItem, {
			icon: AudioIcon,
			text: "Audio tracks",
			onClick: () => setDialogState("edit-audio-tracks")
		}),
		/* @__PURE__ */ jsx(MenuItem, {
			icon: RobotIcon,
			text: "Robots",
			onClick: () => setDialogState("robots")
		}),
		/* @__PURE__ */ jsx(MenuItem, {
			icon: SyncIcon,
			text: "Resync from Mux",
			onClick: handleResync,
			disabled: readOnly || isResyncing
		})
	] }), $[22] = asset, $[23] = handleResync, $[24] = isResyncing, $[25] = readOnly, $[26] = setDialogState, $[27] = t11) : t11 = $[27];
	let t12;
	$[28] === Symbol.for("react.memo_cache_sentinel") ? (t12 = /* @__PURE__ */ jsx(MenuDivider, {}), $[28] = t12) : t12 = $[28];
	let t13;
	$[29] === setDialogState ? t13 = $[30] : (t13 = /* @__PURE__ */ jsx(MenuItem, {
		icon: DownloadIcon,
		text: "Mezzanine",
		onClick: () => setDialogState("mezzanine")
	}), $[29] = setDialogState, $[30] = t13);
	let t14;
	$[31] === setDialogState ? t14 = $[32] : (t14 = /* @__PURE__ */ jsx(MenuItem, {
		icon: DownloadIcon,
		text: "Download",
		onClick: () => setDialogState("download-asset")
	}), $[31] = setDialogState, $[32] = t14);
	let t15;
	$[33] === Symbol.for("react.memo_cache_sentinel") ? (t15 = /* @__PURE__ */ jsx(MenuDivider, {}), $[33] = t15) : t15 = $[33];
	let t16;
	$[34] !== hasConfigAccess || $[35] !== setDialogState ? (t16 = hasConfigAccess && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(MenuItem, {
		icon: PlugIcon,
		text: "Configure API",
		onClick: () => setDialogState("secrets")
	}), /* @__PURE__ */ jsx(MenuDivider, {})] }), $[34] = hasConfigAccess, $[35] = setDialogState, $[36] = t16) : t16 = $[36];
	let t17;
	$[37] !== onReset || $[38] !== readOnly ? (t17 = /* @__PURE__ */ jsx(MenuItem, {
		tone: "critical",
		icon: ResetIcon,
		text: "Clear field",
		onClick: onReset,
		disabled: readOnly
	}), $[37] = onReset, $[38] = readOnly, $[39] = t17) : t17 = $[39];
	let t18;
	$[40] !== t10 || $[41] !== t11 || $[42] !== t13 || $[43] !== t14 || $[44] !== t16 || $[45] !== t17 || $[46] !== t9 ? (t18 = /* @__PURE__ */ jsxs(Menu, {
		ref: setMenuRef,
		children: [
			t8,
			t9,
			t10,
			t11,
			t12,
			t13,
			t14,
			t15,
			t16,
			t17
		]
	}), $[40] = t10, $[41] = t11, $[42] = t13, $[43] = t14, $[44] = t16, $[45] = t17, $[46] = t9, $[47] = t18) : t18 = $[47];
	let t19;
	$[48] === setDialogState ? t19 = $[49] : (t19 = /* @__PURE__ */ jsx(Button, {
		icon: EllipsisHorizontalIcon,
		mode: "ghost",
		fontSize: 1,
		onClick: () => {
			setDialogState(!1), setOpen(!0);
		}
	}), $[48] = setDialogState, $[49] = t19);
	let t20;
	$[50] !== open || $[51] !== t18 || $[52] !== t19 ? (t20 = /* @__PURE__ */ jsx(Popover, {
		animate: !0,
		content: t18,
		portal: !0,
		open,
		children: t19
	}), $[50] = open, $[51] = t18, $[52] = t19, $[53] = t20) : t20 = $[53];
	let t21;
	return $[54] !== t20 || $[55] !== t7 ? (t21 = /* @__PURE__ */ jsxs(Inline, {
		gap: 1,
		padding: 2,
		children: [t7, t20]
	}), $[54] = t20, $[55] = t7, $[56] = t21) : t21 = $[56], t21;
}
var PlayerActionsMenu_default = memo(PlayerActionsMenu);
function useFetchFileSize(stagedUpload, maxFileSize) {
	let $ = c(12), [fileSize, setFileSize] = useState(null), [isLoadingFileSize, setIsLoadingFileSize] = useState(!1), [canSkipFileSizeValidation, setCanSkipFileSizeValidation] = useState(!1), t0;
	$[0] !== maxFileSize || $[1] !== stagedUpload.files || $[2] !== stagedUpload.type || $[3] !== stagedUpload.url ? (t0 = () => {
		if (stagedUpload.type === "url") {
			setIsLoadingFileSize(!1), setCanSkipFileSizeValidation(!1), setFileSize(null);
			let url = stagedUpload.url, fetchFileSize = async () => {
				setIsLoadingFileSize(!0);
				try {
					let contentLength = (await fetch(url, { method: "HEAD" })).headers.get("content-length"), newFileSize = contentLength ? parseInt(contentLength, 10) : null;
					setIsLoadingFileSize(!1), newFileSize && setFileSize(newFileSize), newFileSize === null && maxFileSize !== void 0 && setCanSkipFileSizeValidation(!0);
				} catch {
					console.warn("Could not validate file size from URL"), setCanSkipFileSizeValidation(!0), setIsLoadingFileSize(!1);
				}
			};
			fetchFileSize();
		}
		stagedUpload.type === "file" && setFileSize(stagedUpload.files[0].size);
	}, $[0] = maxFileSize, $[1] = stagedUpload.files, $[2] = stagedUpload.type, $[3] = stagedUpload.url, $[4] = t0) : t0 = $[4];
	let t1;
	$[5] !== maxFileSize || $[6] !== stagedUpload ? (t1 = [
		maxFileSize,
		stagedUpload,
		stagedUpload.type
	], $[5] = maxFileSize, $[6] = stagedUpload, $[7] = t1) : t1 = $[7], useEffect(t0, t1);
	let t2;
	return $[8] !== canSkipFileSizeValidation || $[9] !== fileSize || $[10] !== isLoadingFileSize ? (t2 = {
		fileSize,
		isLoadingFileSize,
		canSkipFileSizeValidation
	}, $[8] = canSkipFileSizeValidation, $[9] = fileSize, $[10] = isLoadingFileSize, $[11] = t2) : t2 = $[11], t2;
}
function useMediaMetadata(stagedUpload) {
	let $ = c(9), [videoAssetMetadata, setVideoAssetMetadata] = useState(null), [isLoadingMetadata, setIsLoadingMetadata] = useState(!1), t0;
	$[0] !== stagedUpload.files || $[1] !== stagedUpload.type || $[2] !== stagedUpload.url ? (t0 = () => {
		let videoSrc = null;
		if (stagedUpload.type === "file") {
			let file = stagedUpload.files[0];
			videoSrc = URL.createObjectURL(file);
		}
		if (stagedUpload.type === "url" && (videoSrc = stagedUpload.url), setVideoAssetMetadata(_temp$2), !videoSrc) return _temp2$2;
		setIsLoadingMetadata(!0);
		let videoElement = document.createElement("video");
		videoElement.preload = "metadata";
		let metadataListeners = [() => {
			setIsLoadingMetadata(!1);
		}, () => {
			let duration = videoElement.duration, width = videoElement.videoWidth, height = videoElement.videoHeight, isAudioOnly = width <= 0 && height <= 0, aspectRatio = width / height;
			setVideoAssetMetadata((old_0) => ({
				...old_0,
				duration,
				width,
				height,
				isAudioOnly,
				aspectRatio
			}));
		}], cleanupVideo = (videoEl) => {
			let currentVideoSrc = videoEl?.src;
			videoEl && (metadataListeners.forEach((listener) => videoEl.removeEventListener("loadedmetadata", listener)), videoEl.onerror = null, videoEl.src = "", videoEl.load()), currentVideoSrc?.startsWith("blob:") && URL.revokeObjectURL(currentVideoSrc);
		};
		return metadataListeners.push(() => setTimeout(() => cleanupVideo(videoElement), 0)), videoElement.onerror = () => {
			setIsLoadingMetadata(!1), console.warn("Could not read video metadata for validation"), cleanupVideo(videoElement);
		}, metadataListeners.forEach((listener_0) => videoElement.addEventListener("loadedmetadata", listener_0)), videoElement.src = videoSrc, () => {
			cleanupVideo(videoElement);
		};
	}, $[0] = stagedUpload.files, $[1] = stagedUpload.type, $[2] = stagedUpload.url, $[3] = t0) : t0 = $[3];
	let t1;
	$[4] === stagedUpload ? t1 = $[5] : (t1 = [stagedUpload.type, stagedUpload], $[4] = stagedUpload, $[5] = t1), useEffect(t0, t1);
	let t2;
	return $[6] !== isLoadingMetadata || $[7] !== videoAssetMetadata ? (t2 = {
		videoAssetMetadata,
		setVideoAssetMetadata,
		isLoadingMetadata
	}, $[6] = isLoadingMetadata, $[7] = videoAssetMetadata, $[8] = t2) : t2 = $[8], t2;
}
function _temp2$2() {
	return null;
}
function _temp$2(old) {
	return {
		...old,
		duration: void 0,
		width: void 0,
		height: void 0
	};
}
/** The configured directives an upload attaches: not the ones Mux doesn't have or were unchecked. */
function directivesToAttach(configuredIds, { missingIds = [], uncheckedIds = [] } = {}) {
	return configuredIds.filter((id) => !missingIds.includes(id) && !uncheckedIds.includes(id));
}
/**
* Adds `directives` only when there are any, so other uploads keep the request they had. The
* proxy moves it into `new_asset_settings` for a file; a URL ingest sends it to Mux as is.
*/
function withDirectives(settings, directiveIds) {
	return directiveIds.length > 0 ? {
		...settings,
		directives: directiveIds.map((id) => ({ id }))
	} : settings;
}
/**
* Converts a draggable watermark position (x, y percentages) to Mux's overlay_settings format.
*
* @param watermark - The watermark configuration with position, size, and opacity
* @returns Mux overlay_settings object
* @see {@link https://www.mux.com/docs/guides/add-watermarks-to-your-videos}
*/
function convertWatermarkToMuxOverlay(watermark, options) {
	if (!watermark.enabled || !watermark.imageUrl) return null;
	let size = watermark.size || 20, opacity = watermark.opacity ?? .7, toPxString = (valuePercent, axis) => {
		let videoAspectRatio = options?.videoAspectRatio ?? 16 / 9, isVertical = videoAspectRatio > 0 && videoAspectRatio < 1, base = axis === "x" ? isVertical ? 1080 : 1920 : isVertical ? 1920 : 1080, px = valuePercent / 100 * base, rounded = Math.round(px);
		return rounded === 0 && (rounded = px < 0 ? -1 : 1), `${rounded}px`;
	}, normalizeToPixels = (value, axis) => {
		if (!value) return value;
		let trimmed = value.trim();
		if (trimmed.endsWith("px")) return roundPxString(trimmed);
		if (trimmed.endsWith("%")) {
			let n = Number(trimmed.slice(0, -1));
			return Number.isFinite(n) ? toPxString(n, axis) : value;
		}
		return value;
	};
	if (watermark.overlay_settings) {
		let widthValue = watermark.overlay_settings.width, widthNormalized = options?.units === "px" ? normalizeToPixels(widthValue, "x") : widthValue;
		return {
			...watermark.overlay_settings,
			horizontal_margin: options?.units === "px" ? normalizeToPixels(watermark.overlay_settings.horizontal_margin, "x") ?? watermark.overlay_settings.horizontal_margin : watermark.overlay_settings.horizontal_margin,
			vertical_margin: options?.units === "px" ? normalizeToPixels(watermark.overlay_settings.vertical_margin, "y") ?? watermark.overlay_settings.vertical_margin : watermark.overlay_settings.vertical_margin,
			width: widthNormalized ?? `${size}%`,
			opacity: watermark.overlay_settings.opacity ?? `${Math.round(opacity * 100)}%`
		};
	}
	let position = watermark.position || {
		x: 50,
		y: 50
	}, clampPercent = (value) => Math.max(-100, Math.min(100, value)), toPercentString = (value) => `${value === 0 || Object.is(value, -0) || Math.abs(value) < 1e-9 ? .01 : value}%`, watermarkWidthPercentOfVideoWidth = size, videoAspectRatio = options?.videoAspectRatio ?? 16 / 9, imageAspectRatio = watermark.imageAspectRatio ?? 1, watermarkHeightPercentOfVideoHeight = Math.max(0, Math.min(100, size * videoAspectRatio / imageAspectRatio)), halfWidth = watermarkWidthPercentOfVideoWidth / 2, halfHeight = watermarkHeightPercentOfVideoHeight / 2, leftMargin = clampPercent(Math.min(position.x - halfWidth, 100 - watermarkWidthPercentOfVideoWidth)), topMargin = clampPercent(Math.min(position.y - halfHeight, 100 - watermarkHeightPercentOfVideoHeight)), units = options?.units ?? "%", marginX = units === "px" ? toPxString(leftMargin, "x") : toPercentString(leftMargin);
	return {
		vertical_align: "top",
		vertical_margin: units === "px" ? toPxString(topMargin, "y") : toPercentString(topMargin),
		horizontal_align: "left",
		horizontal_margin: marginX,
		width: units === "px" ? toPxString(size, "x") : `${size}%`,
		opacity: `${Math.round(opacity * 100)}%`
	};
}
/**
* Format bytes as human-readable text.
*
* @param bytes Number of bytes.
* @param si True to use metric (SI) units, aka powers of 1000. False to use
*           binary (IEC), aka powers of 1024.
* @param dp Number of decimal places to display.
*
* @return Formatted string.
*/
function formatBytes(bytes, si = !1, dp = 1) {
	let thresh = si ? 1e3 : 1024;
	if (Math.abs(bytes) < thresh) return bytes + " B";
	let units = si ? [
		"kB",
		"MB",
		"GB",
		"TB",
		"PB",
		"EB",
		"ZB",
		"YB"
	] : [
		"KiB",
		"MiB",
		"GiB",
		"TiB",
		"PiB",
		"EiB",
		"ZiB",
		"YiB"
	], u = -1, r = 10 ** dp;
	do
		bytes /= thresh, ++u;
	while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
	return bytes.toFixed(dp) + " " + units[u];
}
const RangeInput = styled.input.withConfig({
	displayName: "RangeInput",
	componentId: "sc-kl0au4-0"
})`width:100%;height:4px;border-radius:2px;background:var(--card-border-color);outline:none;-webkit-appearance:none;appearance:none;&::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:16px;height:16px;border-radius:50%;background:var(--card-focus-ring-color,#2276fc);cursor:pointer;border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.2);}&::-moz-range-thumb{width:16px;height:16px;border-radius:50%;background:var(--card-focus-ring-color,#2276fc);cursor:pointer;border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.2);}&:hover::-webkit-slider-thumb{background:var(--card-focus-ring-color,#1a5fc7);}&:hover::-moz-range-thumb{background:var(--card-focus-ring-color,#1a5fc7);}`, WatermarkOverlay = styled.div.withConfig({
	displayName: "WatermarkOverlay",
	componentId: "sc-kl0au4-1"
})`position:absolute;max-width:200px;opacity:${(props) => props.$opacity};cursor:move;user-select:none;z-index:10;pointer-events:auto;img{width:100%;height:auto;display:block;pointer-events:none;}&:hover{outline:2px dashed rgba(255,255,255,0.8);outline-offset:4px;}`;
function DraggableWatermark({ watermark, onChange, containerRef, videoElementRef }) {
	let [isDragging, setIsDragging] = useState(!1), [dragStart, setDragStart] = useState({
		x: 0,
		y: 0
	}), [startPosition, setStartPosition] = useState({
		x: 0,
		y: 0
	}), watermarkRef = useRef(null), debounceTimeoutRef = useRef(null), [localPosition, setLocalPosition] = useState(watermark.position || {
		x: 50,
		y: 50
	}), position = localPosition, size = watermark.size || 20, opacity = watermark.opacity ?? .7, parseOpacityPercent = (value) => {
		if (!value) return null;
		let trimmed = value.trim();
		if (!trimmed.endsWith("%")) return null;
		let num = Number(trimmed.slice(0, -1));
		return Number.isFinite(num) ? Math.max(0, Math.min(1, num / 100)) : null;
	}, getVideoContentBox = useCallback(() => {
		let container = containerRef?.current;
		if (!container) return {
			x: 0,
			y: 0,
			width: 0,
			height: 0
		};
		let rect = container.getBoundingClientRect(), containerW = rect.width, containerH = rect.height, videoEl = videoElementRef?.current, videoW = videoEl?.videoWidth || 0, videoH = videoEl?.videoHeight || 0;
		if (!videoW || !videoH || !containerW || !containerH) return {
			x: 0,
			y: 0,
			width: containerW,
			height: containerH
		};
		let scale = Math.min(containerW / videoW, containerH / videoH), contentW = videoW * scale, contentH = videoH * scale;
		return {
			x: (containerW - contentW) / 2,
			y: (containerH - contentH) / 2,
			width: contentW,
			height: contentH
		};
	}, [containerRef, videoElementRef]), parseOverlayValue = (value) => {
		if (!value) return null;
		let trimmed = value.trim(), px = trimmed.endsWith("px"), pct = trimmed.endsWith("%"), num = Number(trimmed.replace(/px|%/g, ""));
		return Number.isFinite(num) ? px ? {
			n: num,
			unit: "px"
		} : pct ? {
			n: num,
			unit: "%"
		} : null : null;
	}, computeManualStyle = (overlay) => {
		let rect = containerRef?.current?.getBoundingClientRect(), w = rect?.width ?? 0, h = rect?.height ?? 0, isVertical = h > w, baseW = isVertical ? 1080 : 1920, baseH = isVertical ? 1920 : 1080, hm = parseOverlayValue(overlay.horizontal_margin), vm = parseOverlayValue(overlay.vertical_margin), ww = parseOverlayValue(overlay.width), manualOpacity = parseOpacityPercent(overlay.opacity), toCss = (v, axis) => {
			if (v) return v.unit === "%" ? `${v.n}%` : axis === "x" ? `${v.n * w / baseW}px` : `${v.n * h / baseH}px`;
		}, computeHorizontalStyle = () => overlay.horizontal_align === "left" ? {
			left: toCss(hm, "x"),
			right: void 0,
			transform: "translate(0, 0)"
		} : overlay.horizontal_align === "right" ? {
			right: toCss(hm, "x"),
			left: void 0,
			transform: "translate(0, 0)"
		} : {
			left: "50%",
			right: void 0,
			transform: "translate(-50%, 0)"
		}, computeVerticalStyle = () => overlay.vertical_align === "top" ? {
			top: toCss(vm, "y"),
			bottom: void 0
		} : overlay.vertical_align === "bottom" ? {
			bottom: toCss(vm, "y"),
			top: void 0
		} : {
			top: "50%",
			bottom: void 0
		}, hStyle = computeHorizontalStyle(), vStyle = computeVerticalStyle(), transform = hStyle.transform;
		return overlay.vertical_align === "middle" && (transform = overlay.horizontal_align === "center" ? "translate(-50%, -50%)" : "translate(0, -50%)"), {
			position: "absolute",
			...hStyle,
			...vStyle,
			transform,
			width: ww ? toCss(ww, "x") : `${size}%`,
			opacity: manualOpacity ?? opacity,
			cursor: "default"
		};
	}, debouncedOnChange = useCallback((newWatermark) => {
		debounceTimeoutRef.current && clearTimeout(debounceTimeoutRef.current), debounceTimeoutRef.current = setTimeout(() => {
			onChange(newWatermark);
		}, 300);
	}, [onChange]);
	useEffect(() => () => {
		debounceTimeoutRef.current && clearTimeout(debounceTimeoutRef.current);
	}, []), useEffect(() => {
		!isDragging && watermark.position && setLocalPosition(watermark.position);
	}, [watermark.position, isDragging]);
	let handleMouseDown = useCallback((e) => {
		e.preventDefault(), setIsDragging(!0), setDragStart({
			x: e.clientX,
			y: e.clientY
		}), setStartPosition({
			x: position.x,
			y: position.y
		});
	}, [position]), handleMouseMove = useCallback((e) => {
		if (!isDragging || !containerRef?.current) return;
		let rect = containerRef.current.getBoundingClientRect(), content = getVideoContentBox(), contentW = content.width || rect.width, contentH = content.height || rect.height, dx = e.clientX - dragStart.x, dy = e.clientY - dragStart.y, deltaXPercent = dx / contentW * 100, deltaYPercent = dy / contentH * 100, newX = startPosition.x + deltaXPercent, newY = startPosition.y + deltaYPercent;
		newX = Math.max(0, Math.min(100, newX)), newY = Math.max(0, Math.min(100, newY)), setLocalPosition({
			x: newX,
			y: newY
		}), debouncedOnChange({
			...watermark,
			position: {
				x: newX,
				y: newY
			}
		});
	}, [
		isDragging,
		dragStart,
		startPosition,
		containerRef,
		watermark,
		debouncedOnChange,
		getVideoContentBox
	]), handleMouseUp = useCallback(() => {
		setIsDragging(!1), debounceTimeoutRef.current &&= (clearTimeout(debounceTimeoutRef.current), null), onChange({
			...watermark,
			position: localPosition
		});
	}, [
		watermark,
		localPosition,
		onChange
	]);
	if (useEffect(() => {
		if (isDragging) return document.addEventListener("mousemove", handleMouseMove), document.addEventListener("mouseup", handleMouseUp), () => {
			document.removeEventListener("mousemove", handleMouseMove), document.removeEventListener("mouseup", handleMouseUp);
		};
	}, [
		isDragging,
		handleMouseMove,
		handleMouseUp
	]), !watermark.imageUrl) return null;
	let hasManualOverlay = !!watermark.overlay_settings, opacityForRender = hasManualOverlay ? parseOpacityPercent(watermark.overlay_settings?.opacity) ?? opacity : opacity, contentBox = getVideoContentBox(), hasContentBox = contentBox.width > 0 && contentBox.height > 0, computeWatermarkStyle = () => hasManualOverlay ? computeManualStyle(watermark.overlay_settings) : hasContentBox ? {
		left: `${contentBox.x + position.x / 100 * contentBox.width}px`,
		top: `${contentBox.y + position.y / 100 * contentBox.height}px`,
		transform: "translate(-50%, -50%)",
		width: `${Math.max(1, size / 100 * contentBox.width)}px`,
		cursor: isDragging ? "grabbing" : "grab"
	} : {
		left: `${position.x}%`,
		top: `${position.y}%`,
		transform: "translate(-50%, -50%)",
		width: `${size}%`,
		cursor: isDragging ? "grabbing" : "grab"
	};
	return /* @__PURE__ */ jsx(WatermarkOverlay, {
		ref: watermarkRef,
		$opacity: opacityForRender,
		onMouseDown: hasManualOverlay ? void 0 : handleMouseDown,
		style: computeWatermarkStyle(),
		children: /* @__PURE__ */ jsx("img", {
			src: watermark.imageUrl,
			alt: "Watermark",
			draggable: !1
		})
	});
}
function WatermarkControls({ watermark, onChange, onValidationChange, previewContainerRef, previewVideoRef }) {
	let [urlInput, setUrlInput] = useState(watermark.imageUrl || ""), [urlError, setUrlError] = useState(null), [isValidating, setIsValidating] = useState(!1), [isValid, setIsValid] = useState(null), validationTimeoutRef = useRef(null), [mode, setMode] = useState(watermark.overlay_settings ? "manual" : "canvas"), isUpdatingRef = useRef(!1), isValidExtension = useCallback((extension) => extension.endsWith(".png") || extension.endsWith(".jpg") || extension.endsWith(".jpeg"), []), validateUrl = useCallback((url) => {
		validationTimeoutRef.current && clearTimeout(validationTimeoutRef.current), url ? (setIsValidating(!0), setIsValid(null), setUrlError(null), validationTimeoutRef.current = setTimeout(() => {
			try {
				let pathname = new URL(url).pathname.toLowerCase();
				if (isValidExtension(pathname)) {
					setIsValid(!0), setUrlError(null), onValidationChange?.(null);
					let img = new Image();
					img.onload = () => {
						let imageAspectRatio = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : 1;
						isUpdatingRef.current = !0, onChange({
							...watermark,
							enabled: !0,
							imageUrl: url,
							imageAspectRatio
						});
					}, img.onerror = () => {
						isUpdatingRef.current = !0, onChange({
							...watermark,
							enabled: !0,
							imageUrl: url,
							imageAspectRatio: watermark.imageAspectRatio
						});
					}, img.src = url;
				} else {
					let errorMsg = "Mux only supports PNG and JPG watermark images. Please use a .png or .jpg file.";
					setIsValid(!1), setUrlError(errorMsg), onValidationChange?.(errorMsg), isUpdatingRef.current = !0, onChange({
						...watermark,
						enabled: !1,
						imageUrl: void 0,
						imageAspectRatio: void 0,
						overlay_settings: void 0
					});
				}
			} catch {
				setIsValid(!1);
				let errorMsg = "Please enter a valid URL (e.g., https://example.com/watermark.png)";
				setUrlError(errorMsg), onValidationChange?.(errorMsg), isUpdatingRef.current = !0, onChange({
					...watermark,
					enabled: !1,
					imageUrl: void 0,
					imageAspectRatio: void 0,
					overlay_settings: void 0
				});
			} finally {
				setIsValidating(!1);
			}
		}, 500)) : (setUrlError(null), setIsValid(null), setIsValidating(!1), onValidationChange?.(null), isUpdatingRef.current = !0, onChange({
			...watermark,
			enabled: !1,
			imageUrl: void 0,
			overlay_settings: void 0
		}));
	}, [
		watermark,
		onChange,
		onValidationChange,
		isValidExtension
	]);
	useEffect(() => () => {
		validationTimeoutRef.current && clearTimeout(validationTimeoutRef.current);
	}, []), useEffect(() => {
		setMode(watermark.overlay_settings ? "manual" : "canvas");
	}, [watermark.overlay_settings]);
	let handleUrlChange = (e) => {
		let url = e.target.value;
		setUrlInput(url), watermark.imageUrl && url !== watermark.imageUrl && (isUpdatingRef.current = !0, onChange({
			...watermark,
			enabled: !1,
			imageUrl: void 0,
			imageAspectRatio: void 0,
			overlay_settings: void 0
		})), validateUrl(url);
	}, normalizeZeroPercent = (value) => {
		if (!value) return value;
		let trimmed = value.trim();
		if (!trimmed.endsWith("%")) return value;
		let n = Number(trimmed.slice(0, -1));
		return Number.isFinite(n) ? n === 0 || Object.is(n, -0) || Math.abs(n) < 1e-9 ? "0.01%" : `${n}%` : value;
	}, updateOverlaySettings = (next) => {
		let merged = {
			...watermark.overlay_settings ?? {
				vertical_align: "bottom",
				vertical_margin: "2%",
				horizontal_align: "right",
				horizontal_margin: "2%",
				width: `${watermark.size ?? 20}%`,
				opacity: `${Math.round((watermark.opacity ?? .7) * 100)}%`
			},
			...next
		};
		onChange({
			...watermark,
			enabled: !0,
			overlay_settings: {
				...merged,
				horizontal_margin: normalizeZeroPercent(merged.horizontal_margin) || merged.horizontal_margin,
				vertical_margin: normalizeZeroPercent(merged.vertical_margin) || merged.vertical_margin
			}
		});
	}, getVideoContentBox = () => {
		let container = previewContainerRef?.current;
		if (!container) return {
			x: 0,
			y: 0,
			width: 0,
			height: 0
		};
		let rect = container.getBoundingClientRect(), containerW = rect.width, containerH = rect.height, videoEl = previewVideoRef?.current, videoW = videoEl?.videoWidth || 0, videoH = videoEl?.videoHeight || 0;
		if (!videoW || !videoH || !containerW || !containerH) return {
			x: 0,
			y: 0,
			width: containerW,
			height: containerH
		};
		let scale = Math.min(containerW / videoW, containerH / videoH), contentW = videoW * scale, contentH = videoH * scale;
		return {
			x: (containerW - contentW) / 2,
			y: (containerH - contentH) / 2,
			width: contentW,
			height: contentH
		};
	};
	return /* @__PURE__ */ jsxs(Stack, {
		gap: 3,
		children: [/* @__PURE__ */ jsxs(Stack, {
			gap: 2,
			children: [
				/* @__PURE__ */ jsx(Text, {
					size: 1,
					weight: "medium",
					children: "Watermark Image URL"
				}),
				/* @__PURE__ */ jsx(Text, {
					size: 0,
					muted: !0,
					children: "Enter a URL to a PNG or JPG image. Mux will download this image and overlay it on your video."
				}),
				/* @__PURE__ */ jsxs(Box, {
					style: {
						position: "relative",
						width: "100%"
					},
					children: [/* @__PURE__ */ jsx("input", {
						type: "url",
						value: urlInput,
						onChange: handleUrlChange,
						placeholder: "https://example.com/watermark.png",
						style: {
							padding: "8px 12px",
							paddingRight: urlInput ? "96px" : isValid === null ? "12px" : "36px",
							border: urlError || isValid === !1 ? "1px solid #e74c3c" : isValid === !0 ? "1px solid #4caf50" : "1px solid #ccc",
							borderRadius: "4px",
							width: "100%",
							maxWidth: "100%",
							boxSizing: "border-box",
							fontSize: "14px"
						}
					}), (urlInput || isValidating || isValid !== null) && /* @__PURE__ */ jsxs(Box, {
						style: {
							position: "absolute",
							right: "8px",
							top: "50%",
							transform: "translateY(-50%)",
							display: "flex",
							alignItems: "center",
							gap: "4px"
						},
						children: [
							urlInput && /* @__PURE__ */ jsx(Button, {
								text: "Clear",
								mode: "bleed",
								tone: "critical",
								onClick: () => {
									setUrlInput(""), validateUrl("");
								},
								disabled: isValidating,
								style: {
									fontSize: "11px",
									height: "24px"
								}
							}),
							isValidating && /* @__PURE__ */ jsx(Text, {
								size: 0,
								muted: !0,
								children: "Validating..."
							}),
							isValid === !0 && !isValidating && /* @__PURE__ */ jsx(CheckmarkCircleIcon, { style: {
								color: "#4caf50",
								fontSize: "18px"
							} }),
							isValid === !1 && !isValidating && /* @__PURE__ */ jsx(ErrorOutlineIcon, { style: {
								color: "#e74c3c",
								fontSize: "18px"
							} })
						]
					})]
				}),
				urlError && /* @__PURE__ */ jsx(Card, {
					padding: 2,
					tone: "critical",
					radius: 2,
					children: /* @__PURE__ */ jsxs(Flex, {
						align: "center",
						gap: 2,
						children: [/* @__PURE__ */ jsx(ErrorOutlineIcon, { style: {
							color: "#e74c3c",
							flexShrink: 0
						} }), /* @__PURE__ */ jsx(Text, {
							size: 0,
							style: { color: "#e74c3c" },
							children: urlError
						})]
					})
				})
			]
		}), watermark.imageUrl && /* @__PURE__ */ jsxs(Stack, {
			gap: 2,
			children: [
				/* @__PURE__ */ jsx(Card, {
					padding: 3,
					tone: "transparent",
					border: !0,
					radius: 2,
					children: /* @__PURE__ */ jsxs(Flex, {
						align: "center",
						justify: "space-between",
						gap: 3,
						style: {
							flexWrap: "wrap",
							alignItems: "flex-start"
						},
						children: [/* @__PURE__ */ jsxs(Stack, {
							gap: 2,
							style: {
								minWidth: 240,
								flex: 1
							},
							children: [/* @__PURE__ */ jsx(Text, {
								size: 1,
								weight: "medium",
								children: "Positioning mode"
							}), /* @__PURE__ */ jsxs(Text, {
								size: 0,
								muted: !0,
								children: [
									"Choose between dragging on the canvas or manually editing the Mux",
									" ",
									/* @__PURE__ */ jsx("code", { children: "overlay_settings" }),
									" fields (as in",
									" ",
									/* @__PURE__ */ jsx("a", {
										href: "https://www.mux.com/docs/guides/add-watermarks-to-your-videos",
										target: "_blank",
										rel: "noopener noreferrer",
										children: "the docs"
									}),
									")."
								]
							})]
						}), /* @__PURE__ */ jsxs(Flex, {
							gap: 2,
							style: { flexWrap: "wrap" },
							children: [/* @__PURE__ */ jsx(Button, {
								text: "Canvas",
								mode: mode === "canvas" ? "default" : "ghost",
								onClick: () => {
									setMode("canvas"), onChange({
										...watermark,
										enabled: !0,
										overlay_settings: void 0
									});
								}
							}), /* @__PURE__ */ jsx(Button, {
								text: "Manual",
								mode: mode === "manual" ? "default" : "ghost",
								onClick: () => {
									setMode("manual");
									let overlay = convertWatermarkToMuxOverlay({
										...watermark,
										enabled: !0
									});
									updateOverlaySettings(overlay ?? {});
								}
							})]
						})]
					})
				}),
				mode === "manual" && /* @__PURE__ */ jsx(Card, {
					padding: 3,
					tone: "transparent",
					border: !0,
					radius: 2,
					children: /* @__PURE__ */ jsxs(Stack, {
						gap: 3,
						children: [
							/* @__PURE__ */ jsx(Text, {
								size: 1,
								weight: "medium",
								children: "Mux overlay_settings"
							}),
							/* @__PURE__ */ jsxs(Grid, {
								gridTemplateColumns: [1, 2],
								gap: 3,
								style: { width: "100%" },
								children: [
									/* @__PURE__ */ jsxs(Stack, {
										gap: 2,
										style: { minWidth: 0 },
										children: [/* @__PURE__ */ jsx(Text, {
											size: 0,
											muted: !0,
											children: "horizontal_align"
										}), /* @__PURE__ */ jsxs("select", {
											value: watermark.overlay_settings?.horizontal_align || "right",
											onChange: (e) => updateOverlaySettings({ horizontal_align: e.target.value || "right" }),
											style: {
												width: "100%",
												padding: "8px 10px",
												border: "1px solid #ccc",
												borderRadius: 4
											},
											children: [
												/* @__PURE__ */ jsx("option", {
													value: "left",
													children: "left"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "center",
													children: "center"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "right",
													children: "right"
												})
											]
										})]
									}),
									/* @__PURE__ */ jsxs(Stack, {
										gap: 2,
										style: { minWidth: 0 },
										children: [/* @__PURE__ */ jsx(Text, {
											size: 0,
											muted: !0,
											children: "horizontal_margin (e.g. 2% or 40px)"
										}), /* @__PURE__ */ jsx(TextInput, {
											value: watermark.overlay_settings?.horizontal_margin || "2%",
											onChange: (e) => updateOverlaySettings({ horizontal_margin: e.currentTarget.value })
										})]
									}),
									/* @__PURE__ */ jsxs(Stack, {
										gap: 2,
										style: { minWidth: 0 },
										children: [/* @__PURE__ */ jsx(Text, {
											size: 0,
											muted: !0,
											children: "vertical_align"
										}), /* @__PURE__ */ jsxs("select", {
											value: watermark.overlay_settings?.vertical_align || "bottom",
											onChange: (e) => updateOverlaySettings({ vertical_align: e.target.value || "bottom" }),
											style: {
												width: "100%",
												padding: "8px 10px",
												border: "1px solid #ccc",
												borderRadius: 4
											},
											children: [
												/* @__PURE__ */ jsx("option", {
													value: "top",
													children: "top"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "middle",
													children: "middle"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "bottom",
													children: "bottom"
												})
											]
										})]
									}),
									/* @__PURE__ */ jsxs(Stack, {
										gap: 2,
										style: { minWidth: 0 },
										children: [/* @__PURE__ */ jsx(Text, {
											size: 0,
											muted: !0,
											children: "vertical_margin (e.g. 2% or 40px)"
										}), /* @__PURE__ */ jsx(TextInput, {
											value: watermark.overlay_settings?.vertical_margin || "2%",
											onChange: (e) => updateOverlaySettings({ vertical_margin: e.currentTarget.value })
										})]
									}),
									/* @__PURE__ */ jsxs(Stack, {
										gap: 2,
										style: { minWidth: 0 },
										children: [/* @__PURE__ */ jsx(Text, {
											size: 0,
											muted: !0,
											children: "width (e.g. 25% or 80px)"
										}), /* @__PURE__ */ jsx(TextInput, {
											value: watermark.overlay_settings?.width || `${watermark.size ?? 20}%`,
											onChange: (e) => updateOverlaySettings({ width: e.currentTarget.value })
										})]
									}),
									/* @__PURE__ */ jsxs(Stack, {
										gap: 2,
										style: { minWidth: 0 },
										children: [/* @__PURE__ */ jsx(Text, {
											size: 0,
											muted: !0,
											children: "opacity (e.g. 90%)"
										}), /* @__PURE__ */ jsx(TextInput, {
											value: watermark.overlay_settings?.opacity || `${Math.round((watermark.opacity ?? .7) * 100)}%`,
											onChange: (e) => updateOverlaySettings({ opacity: e.currentTarget.value })
										})]
									})
								]
							}),
							/* @__PURE__ */ jsx(Text, {
								size: 0,
								muted: !0,
								children: "Margins and width accept either percentages or pixels, per the Mux guide."
							})
						]
					})
				}),
				mode === "canvas" && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Box, { children: [/* @__PURE__ */ jsx(Text, {
					size: 1,
					weight: "medium",
					children: (() => {
						let sizePct = watermark.size || 20, contentW = getVideoContentBox().width;
						return contentW ? `Size: ${Math.max(1, Math.round(sizePct / 100 * contentW))}px` : `Size: ${sizePct}%`;
					})()
				}), /* @__PURE__ */ jsx(RangeInput, {
					type: "range",
					value: (() => {
						let sizePct = watermark.size || 20, contentW = getVideoContentBox().width;
						return contentW ? Math.max(1, Math.round(sizePct / 100 * contentW)) : sizePct;
					})(),
					min: (() => {
						let contentW = getVideoContentBox().width;
						return contentW ? Math.max(1, Math.round(contentW * .05)) : 5;
					})(),
					max: (() => {
						let contentW = getVideoContentBox().width;
						return contentW ? Math.max(1, Math.round(contentW * .5)) : 50;
					})(),
					step: 1,
					onChange: (e) => {
						let raw = Number(e.target.value), contentW = getVideoContentBox().width, nextPct = contentW ? raw / contentW * 100 : raw, clampedPct = Math.max(5, Math.min(50, nextPct));
						onChange({
							...watermark,
							size: clampedPct
						});
					}
				})] }), /* @__PURE__ */ jsxs(Box, { children: [/* @__PURE__ */ jsxs(Text, {
					size: 1,
					weight: "medium",
					children: [
						"Opacity: ",
						Math.round((watermark.opacity ?? .7) * 100),
						"%"
					]
				}), /* @__PURE__ */ jsx(RangeInput, {
					type: "range",
					value: watermark.opacity ?? .7,
					min: 0,
					max: 1,
					step: .05,
					onChange: (e) => onChange({
						...watermark,
						opacity: Number(e.target.value)
					})
				})] })] }),
				/* @__PURE__ */ jsx(Card, {
					padding: 2,
					tone: "transparent",
					border: !0,
					radius: 2,
					children: /* @__PURE__ */ jsx(Text, {
						size: 0,
						muted: !0,
						children: mode === "manual" ? "Manual mode: edit the overlay_settings fields above" : "💡 Drag the watermark on the preview to position it"
					})
				})
			]
		})]
	});
}
function unavailableWarning(listing) {
	if (listing.status === "failed") {
		if (listing.capability?.state === "scope-missing") return "This Mux token can’t run Robots, so these directives won’t run. The video still uploads.";
		if (listing.capability?.state === "not-enabled") return "Robots isn’t enabled for this Mux account, so these directives won’t run. The video still uploads.";
	}
}
/** Directives attach at asset creation, so the upload dialog is the only moment to opt out. */
function RobotsUploadDirectives(t0) {
	let $ = c(30), { configuredIds, missingIds, directiveNames, listing, uncheckedIds, isReadOnly, onToggle } = t0, id = useId(), t1;
	$[0] === listing ? t1 = $[1] : (t1 = unavailableWarning(listing), $[0] = listing, $[1] = t1);
	let warning = t1;
	if (configuredIds.length === 0) {
		let t2 = `robots-directives${id}`, t3;
		$[2] === Symbol.for("react.memo_cache_sentinel") ? (t3 = /* @__PURE__ */ jsx(Text, {
			size: 1,
			children: /* @__PURE__ */ jsx("a", {
				href: "https://github.com/sanity-io/plugins/tree/main/plugins/sanity-plugin-mux-input#directives-on-upload",
				target: "_blank",
				rel: "noopener noreferrer",
				children: "How to set up directives"
			})
		}), $[2] = t3) : t3 = $[2];
		let t4;
		$[3] === Symbol.for("react.memo_cache_sentinel") ? (t4 = /* @__PURE__ */ jsxs(RobotsNote, {
			action: t3,
			children: [
				"No directives run on new uploads yet. A developer can add them with",
				" ",
				/* @__PURE__ */ jsx("code", { children: "defaultDirectiveIds" }),
				" in the plugin configuration."
			]
		}), $[3] = t4) : t4 = $[3];
		let t5;
		return $[4] === t2 ? t5 = $[5] : (t5 = /* @__PURE__ */ jsx(FormField_default, {
			inputId: t2,
			title: "Robots directives",
			children: t4
		}), $[4] = t2, $[5] = t5), t5;
	}
	let t2 = `robots-directives${id}`, t3 = isReadOnly ? "These directives run on every upload. A developer sets them in the plugin configuration." : "These directives run once this video is ingested and consume Mux AI units. Uncheck any you don’t want for this upload.", t4;
	$[6] === warning ? t4 = $[7] : (t4 = warning && /* @__PURE__ */ jsx(Card, {
		padding: 3,
		radius: 2,
		tone: "caution",
		border: !0,
		children: /* @__PURE__ */ jsx(Text, {
			size: 1,
			children: warning
		})
	}), $[6] = warning, $[7] = t4);
	let t5;
	if ($[8] !== configuredIds || $[9] !== directiveNames || $[10] !== id || $[11] !== isReadOnly || $[12] !== missingIds || $[13] !== onToggle || $[14] !== uncheckedIds) {
		let t6;
		$[16] !== directiveNames || $[17] !== id || $[18] !== isReadOnly || $[19] !== missingIds || $[20] !== onToggle || $[21] !== uncheckedIds ? (t6 = (directiveId) => {
			let name = directiveNames[directiveId] ?? directiveId, isMissing = missingIds.includes(directiveId), inputId = `robots-directive-${directiveId}${id}`, details = /* @__PURE__ */ jsxs(Stack, {
				gap: 2,
				children: [
					isReadOnly ? /* @__PURE__ */ jsx(Text, {
						size: 1,
						children: name
					}) : /* @__PURE__ */ jsx(Text, {
						size: 1,
						as: "label",
						htmlFor: inputId,
						children: name
					}),
					name !== directiveId && /* @__PURE__ */ jsx(Text, {
						size: 1,
						muted: !0,
						style: { wordBreak: "break-all" },
						children: directiveId
					}),
					isMissing && /* @__PURE__ */ jsx(Text, {
						size: 1,
						muted: !0,
						children: "Not in this Mux account, so it won’t run."
					})
				]
			});
			return isReadOnly ? /* @__PURE__ */ jsx(Box, { children: details }, directiveId) : /* @__PURE__ */ jsxs(Flex, {
				gap: 2,
				align: "flex-start",
				children: [/* @__PURE__ */ jsx(Checkbox, {
					id: inputId,
					disabled: isMissing,
					checked: !isMissing && !uncheckedIds.includes(directiveId),
					onChange: (event) => onToggle(directiveId, event.currentTarget.checked)
				}), details]
			}, directiveId);
		}, $[16] = directiveNames, $[17] = id, $[18] = isReadOnly, $[19] = missingIds, $[20] = onToggle, $[21] = uncheckedIds, $[22] = t6) : t6 = $[22], t5 = configuredIds.map(t6), $[8] = configuredIds, $[9] = directiveNames, $[10] = id, $[11] = isReadOnly, $[12] = missingIds, $[13] = onToggle, $[14] = uncheckedIds, $[15] = t5;
	} else t5 = $[15];
	let t6;
	$[23] !== t4 || $[24] !== t5 ? (t6 = /* @__PURE__ */ jsxs(Stack, {
		gap: 3,
		children: [t4, t5]
	}), $[23] = t4, $[24] = t5, $[25] = t6) : t6 = $[25];
	let t7;
	return $[26] !== t2 || $[27] !== t3 || $[28] !== t6 ? (t7 = /* @__PURE__ */ jsx(FormField_default, {
		inputId: t2,
		title: "Robots directives",
		description: t3,
		children: t6
	}), $[26] = t2, $[27] = t3, $[28] = t6, $[29] = t7) : t7 = $[29], t7;
}
const ALL_LANGUAGE_CODES = LanguagesList.getAllCodes().map((code) => ({
	value: code,
	label: LanguagesList.getNativeName(code)
})), SUBTITLE_LANGUAGES = {
	autogenerated: SUPPORTED_MUX_LANGUAGES.map((lang) => ({
		value: lang.code,
		label: lang.label
	})),
	subtitles: ALL_LANGUAGE_CODES,
	captions: ALL_LANGUAGE_CODES
};
function TextTracksEditor(t0) {
	let $ = c(18), { tracks, dispatch, defaultLang } = t0, track = tracks[0], t1;
	$[0] === Symbol.for("react.memo_cache_sentinel") ? (t1 = [], $[0] = t1) : t1 = $[0];
	let t2;
	$[1] === Symbol.for("react.memo_cache_sentinel") ? (t2 = { display: "block" }, $[1] = t2) : t2 = $[1];
	let t3 = !!track?.language_code, t4;
	$[2] !== defaultLang || $[3] !== dispatch || $[4] !== track ? (t4 = () => {
		dispatch(track ? {
			action: "track",
			id: track._id,
			subAction: "delete"
		} : {
			action: "track",
			id: uuid(),
			subAction: "add",
			value: {
				type: "autogenerated",
				name: defaultLang || void 0,
				language_code: defaultLang || void 0
			}
		});
	}, $[2] = defaultLang, $[3] = dispatch, $[4] = track, $[5] = t4) : t4 = $[5];
	let t5;
	$[6] !== t3 || $[7] !== t4 ? (t5 = /* @__PURE__ */ jsx(Checkbox, {
		id: "include-autogenerated-track",
		style: t2,
		checked: t3,
		onChange: t4
	}), $[6] = t3, $[7] = t4, $[8] = t5) : t5 = $[8];
	let t6;
	$[9] === Symbol.for("react.memo_cache_sentinel") ? (t6 = /* @__PURE__ */ jsx(Box, {
		flex: 1,
		paddingLeft: 3,
		children: /* @__PURE__ */ jsx(Text, { children: /* @__PURE__ */ jsx("label", {
			htmlFor: "checkbox",
			children: "Generate captions"
		}) })
	}), $[9] = t6) : t6 = $[9];
	let t7;
	$[10] === t5 ? t7 = $[11] : (t7 = /* @__PURE__ */ jsxs(Flex, {
		align: "center",
		children: [t5, t6]
	}), $[10] = t5, $[11] = t7);
	let t8;
	$[12] !== dispatch || $[13] !== track ? (t8 = track && /* @__PURE__ */ jsx(Autocomplete, {
		id: "text-tract-editor--language",
		value: track.language_code,
		onChange: (newValue) => dispatch({
			action: "track",
			id: track._id,
			subAction: "update",
			value: {
				language_code: newValue,
				name: LanguagesList.getNativeName(newValue)
			}
		}),
		options: SUBTITLE_LANGUAGES[track.type],
		icon: TranslateIcon,
		placeholder: "Select language",
		filterOption: _temp$1,
		openButton: !0,
		renderValue: (value) => SUBTITLE_LANGUAGES[track.type].find((l) => l.value === value)?.label || value,
		renderOption: _temp2$1
	}), $[12] = dispatch, $[13] = track, $[14] = t8) : t8 = $[14];
	let t9;
	return $[15] !== t7 || $[16] !== t8 ? (t9 = /* @__PURE__ */ jsx(FormField, {
		title: "Auto-generated subtitle or caption",
		path: t1,
		children: /* @__PURE__ */ jsxs(Stack, {
			gap: 2,
			children: [t7, t8]
		})
	}), $[15] = t7, $[16] = t8, $[17] = t9) : t9 = $[17], t9;
}
function _temp2$1(option_0) {
	return /* @__PURE__ */ jsx(Card, {
		"data-as": "button",
		padding: 3,
		radius: 2,
		tone: "inherit",
		children: /* @__PURE__ */ jsxs(Text, {
			size: 2,
			textOverflow: "ellipsis",
			children: [
				option_0.label,
				" (",
				option_0.value,
				")"
			]
		})
	});
}
function _temp$1(query, option) {
	return option.label.toLowerCase().indexOf(query.toLowerCase()) > -1 || option.value.toLowerCase().indexOf(query.toLowerCase()) > -1;
}
function PlaybackPolicyOption(t0) {
	let $ = c(24), { id, checked, optionName, description, dispatch, action, disabled } = t0, [scale, setScale] = useState(1), t1 = `scale(${scale})`, t2 = disabled ? "not-allowed" : "pointer", t3;
	$[0] !== t1 || $[1] !== t2 ? (t3 = {
		outline: "0.01rem solid grey",
		transform: t1,
		transition: "transform 0.1s ease-in-out",
		cursor: t2,
		borderRadius: "0.25rem"
	}, $[0] = t1, $[1] = t2, $[2] = t3) : t3 = $[2];
	let boxStyle = t3, t4;
	$[3] === Symbol.for("react.memo_cache_sentinel") ? (t4 = () => {
		setScale(.98), setTimeout(() => {
			setScale(1);
		}, 100);
	}, $[3] = t4) : t4 = $[3];
	let triggerAnimation = t4, t5;
	$[4] !== action || $[5] !== checked || $[6] !== dispatch ? (t5 = () => {
		action && (triggerAnimation(), dispatch({
			action,
			value: !checked
		}));
	}, $[4] = action, $[5] = checked, $[6] = dispatch, $[7] = t5) : t5 = $[7];
	let handleBoxClick = t5, t6;
	$[8] === description ? t6 = $[9] : (t6 = typeof description == "string" ? /* @__PURE__ */ jsx(Text, {
		size: 2,
		muted: !0,
		children: description
	}) : description, $[8] = description, $[9] = t6);
	let descriptionJsx = t6, t7;
	$[10] !== checked || $[11] !== disabled || $[12] !== handleBoxClick || $[13] !== id ? (t7 = /* @__PURE__ */ jsx(Checkbox, {
		id,
		required: !0,
		checked,
		onChange: handleBoxClick,
		disabled
	}), $[10] = checked, $[11] = disabled, $[12] = handleBoxClick, $[13] = id, $[14] = t7) : t7 = $[14];
	let t8;
	$[15] === optionName ? t8 = $[16] : (t8 = /* @__PURE__ */ jsx(Text, {
		size: 3,
		weight: "bold",
		children: optionName
	}), $[15] = optionName, $[16] = t8);
	let t9;
	$[17] !== descriptionJsx || $[18] !== t8 ? (t9 = /* @__PURE__ */ jsxs(Grid, {
		gap: 3,
		children: [t8, descriptionJsx]
	}), $[17] = descriptionJsx, $[18] = t8, $[19] = t9) : t9 = $[19];
	let t10;
	return $[20] !== boxStyle || $[21] !== t7 || $[22] !== t9 ? (t10 = /* @__PURE__ */ jsx("label", { children: /* @__PURE__ */ jsxs(Flex, {
		gap: 3,
		padding: 3,
		style: boxStyle,
		children: [t7, t9]
	}) }), $[20] = boxStyle, $[21] = t7, $[22] = t9, $[23] = t10) : t10 = $[23], t10;
}
function PlaybackPolicyWarning() {
	let $ = c(3), t0;
	$[0] === Symbol.for("react.memo_cache_sentinel") ? (t0 = {
		color: "#13141A",
		fontWeight: 500
	}, $[0] = t0) : t0 = $[0];
	let textStyle = t0, t1;
	$[1] === Symbol.for("react.memo_cache_sentinel") ? (t1 = {
		outline: "0.01rem solid grey",
		backgroundColor: "#979cb0",
		borderRadius: "0.5rem",
		width: "max-content",
		color: "#13141A"
	}, $[1] = t1) : t1 = $[1];
	let boxStyle = t1, t2;
	return $[2] === Symbol.for("react.memo_cache_sentinel") ? (t2 = /* @__PURE__ */ jsx(Box, {
		padding: 2,
		style: boxStyle,
		children: /* @__PURE__ */ jsxs(Flex, {
			align: "center",
			gap: 2,
			children: [/* @__PURE__ */ jsx(WarningFilledIcon, {}), /* @__PURE__ */ jsx(Text, {
				size: 1,
				style: textStyle,
				children: "Please select at least one Playback Policy"
			})]
		})
	}), $[2] = t2) : t2 = $[2], t2;
}
function PlaybackPolicy(t0) {
	let $ = c(23), { id, config, secrets, dispatch } = t0, noPolicySelected = !(config.public_policy || config.signed_policy || config.drm_policy), drmPolicyDisabled = !secrets.drmConfigId, t1;
	$[0] === Symbol.for("react.memo_cache_sentinel") ? (t1 = /* @__PURE__ */ jsx(Text, {
		weight: "bold",
		children: "Advanced Playback Policies"
	}), $[0] = t1) : t1 = $[0];
	let t2 = `${id}--public`, t3;
	$[1] === Symbol.for("react.memo_cache_sentinel") ? (t3 = /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Text, {
		size: 2,
		muted: !0,
		children: "Playback IDs are accessible by constructing an HLS URL like"
	}), /* @__PURE__ */ jsx(Code, { children: "https://stream.mux.com/{PLAYBACK_ID}" })] }), $[1] = t3) : t3 = $[1];
	let t4;
	$[2] !== config.public_policy || $[3] !== dispatch || $[4] !== t2 ? (t4 = /* @__PURE__ */ jsx(PlaybackPolicyOption, {
		id: t2,
		checked: config.public_policy,
		optionName: "Public",
		description: t3,
		dispatch,
		action: "public_policy"
	}), $[2] = config.public_policy, $[3] = dispatch, $[4] = t2, $[5] = t4) : t4 = $[5];
	let t5;
	$[6] !== config.signed_policy || $[7] !== dispatch || $[8] !== id || $[9] !== secrets.enableSignedUrls ? (t5 = secrets.enableSignedUrls && /* @__PURE__ */ jsx(PlaybackPolicyOption, {
		id: `${id}--signed`,
		checked: config.signed_policy,
		optionName: "Signed",
		description: /* @__PURE__ */ jsxs(Fragment, { children: [
			/* @__PURE__ */ jsx(Text, {
				size: 2,
				muted: !0,
				children: "Playback IDs should be used with tokens"
			}),
			/* @__PURE__ */ jsx(Code, { children: "https://stream.mux.com/{PLAYBACK_ID}?token={TOKEN}" }),
			/* @__PURE__ */ jsxs(Text, {
				size: 2,
				muted: !0,
				children: [
					"See",
					" ",
					/* @__PURE__ */ jsx("a", {
						href: "https://www.mux.com/docs/guides/secure-video-playback",
						target: "_blank",
						rel: "noopener noreferrer",
						children: "Secure video playback"
					}),
					" ",
					"for details about creating tokens."
				]
			})
		] }),
		dispatch,
		action: "signed_policy"
	}), $[6] = config.signed_policy, $[7] = dispatch, $[8] = id, $[9] = secrets.enableSignedUrls, $[10] = t5) : t5 = $[10];
	let t6;
	$[11] !== config.drm_policy || $[12] !== dispatch || $[13] !== drmPolicyDisabled || $[14] !== id ? (t6 = drmPolicyDisabled ? /* @__PURE__ */ jsx(PlaybackPolicyOption, {
		id: `${id}--drm`,
		checked: !1,
		optionName: "DRM - Disabled",
		description: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Text, {
			size: 2,
			muted: !0,
			children: [
				"To enable DRM add your DRM Configuration Id to your plugin configuration in the API Credentials view.",
				" ",
				/* @__PURE__ */ jsx("a", {
					href: "https://www.mux.com/support/human",
					target: "_blank",
					rel: "noopener noreferrer",
					children: "Contact us"
				}),
				" ",
				"to get started using DRM."
			]
		}) }),
		dispatch,
		disabled: !0
	}) : /* @__PURE__ */ jsx(PlaybackPolicyOption, {
		id: `${id}--drm`,
		checked: config.drm_policy,
		optionName: "DRM",
		description: /* @__PURE__ */ jsxs(Fragment, { children: [
			/* @__PURE__ */ jsx(Text, {
				size: 2,
				muted: !0,
				children: "Playback IDs should be used with tokens as with Signed playback, but require extra configuration."
			}),
			/* @__PURE__ */ jsx(Code, { children: "https://stream.mux.com/{PLAYBACK_ID}?token={TOKEN}" }),
			/* @__PURE__ */ jsxs(Text, {
				size: 2,
				muted: !0,
				children: [
					"See",
					" ",
					/* @__PURE__ */ jsx("a", {
						href: "https://www.mux.com/docs/guides/protect-videos-with-drm#play-drm-protected-videos",
						target: "_blank",
						rel: "noopener noreferrer",
						children: "Protect videos with DRM"
					}),
					" ",
					"for details about configuring your player for DRM playback and",
					" ",
					/* @__PURE__ */ jsx("a", {
						href: "https://www.mux.com/docs/guides/secure-video-playback",
						target: "_blank",
						rel: "noopener noreferrer",
						children: "Secure video playback"
					}),
					" ",
					"for details about creating tokens."
				]
			})
		] }),
		dispatch,
		action: "drm_policy"
	}), $[11] = config.drm_policy, $[12] = dispatch, $[13] = drmPolicyDisabled, $[14] = id, $[15] = t6) : t6 = $[15];
	let t7;
	$[16] === noPolicySelected ? t7 = $[17] : (t7 = noPolicySelected && /* @__PURE__ */ jsx(PlaybackPolicyWarning, {}), $[16] = noPolicySelected, $[17] = t7);
	let t8;
	return $[18] !== t4 || $[19] !== t5 || $[20] !== t6 || $[21] !== t7 ? (t8 = /* @__PURE__ */ jsxs(Grid, {
		gap: 3,
		children: [
			t1,
			t4,
			t5,
			t6,
			t7
		]
	}), $[18] = t4, $[19] = t5, $[20] = t6, $[21] = t7, $[22] = t8) : t8 = $[22], t8;
}
const RESOLUTION_TIERS = [
	{
		value: "1080p",
		label: "1080p"
	},
	{
		value: "1440p",
		label: "1440p (2k)"
	},
	{
		value: "2160p",
		label: "2160p (4k)"
	}
], ResolutionTierSelector = (t0) => {
	let $ = c(9), { id, config, dispatch, maxSupportedResolution } = t0, t1;
	$[0] === Symbol.for("react.memo_cache_sentinel") ? (t1 = [], $[0] = t1) : t1 = $[0];
	let t2;
	$[1] === Symbol.for("react.memo_cache_sentinel") ? (t2 = /* @__PURE__ */ jsxs(Fragment, { children: [
		"The maximum",
		" ",
		/* @__PURE__ */ jsx("a", {
			href: "https://docs.mux.com/api-reference#video/operation/create-direct-upload",
			target: "_blank",
			rel: "noopener noreferrer",
			children: "resolution_tier"
		}),
		" ",
		"your asset is encoded, stored, and streamed at."
	] }), $[1] = t2) : t2 = $[1];
	let t3;
	$[2] !== config || $[3] !== dispatch || $[4] !== id || $[5] !== maxSupportedResolution ? (t3 = RESOLUTION_TIERS.map((t4, index) => {
		let { value, label } = t4, inputId = `${id}--type-${value}`;
		return index > maxSupportedResolution ? null : /* @__PURE__ */ jsxs(Flex, {
			align: "center",
			gap: 2,
			children: [/* @__PURE__ */ jsx(Radio, {
				checked: config.max_resolution_tier === value,
				name: "asset-resolutiontier",
				onChange: (e) => dispatch({
					action: "max_resolution_tier",
					value: e.currentTarget.value
				}),
				value,
				id: inputId
			}), /* @__PURE__ */ jsx(Text, {
				as: "label",
				htmlFor: inputId,
				children: label
			})]
		}, value);
	}), $[2] = config, $[3] = dispatch, $[4] = id, $[5] = maxSupportedResolution, $[6] = t3) : t3 = $[6];
	let t4;
	return $[7] === t3 ? t4 = $[8] : (t4 = /* @__PURE__ */ jsx(FormField, {
		path: t1,
		title: "Resolution Tier",
		description: t2,
		children: /* @__PURE__ */ jsx(Flex, {
			gap: 3,
			wrap: "wrap",
			children: t3
		})
	}), $[7] = t3, $[8] = t4), t4;
}, ADVANCED_RESOLUTIONS = [
	{
		value: "270p",
		label: "270p"
	},
	{
		value: "360p",
		label: "360p"
	},
	{
		value: "480p",
		label: "480p"
	},
	{
		value: "540p",
		label: "540p"
	},
	{
		value: "720p",
		label: "720p"
	},
	{
		value: "1080p",
		label: "1080p"
	},
	{
		value: "1440p",
		label: "1440p"
	},
	{
		value: "2160p",
		label: "2160p"
	}
], StaticRenditionSelector = (t0) => {
	let $ = c(46), { id, config, dispatch } = t0, isAdvancedMode = config.static_renditions.filter(_temp).length > 0, [renditionMode, setRenditionMode] = useState(isAdvancedMode ? "advanced" : "standard"), t1;
	$[0] !== config.static_renditions || $[1] !== dispatch ? (t1 = (rendition) => {
		let current = config.static_renditions;
		current.includes(rendition) ? dispatch({
			action: "static_renditions",
			value: current.filter((r_0) => r_0 !== rendition)
		}) : dispatch({
			action: "static_renditions",
			value: [...current, rendition]
		});
	}, $[0] = config.static_renditions, $[1] = dispatch, $[2] = t1) : t1 = $[2];
	let toggleRendition = t1, t2;
	$[3] !== config.static_renditions || $[4] !== dispatch ? (t2 = (mode) => {
		setRenditionMode(mode), dispatch(mode === "standard" ? {
			action: "static_renditions",
			value: config.static_renditions.filter(_temp2)
		} : {
			action: "static_renditions",
			value: config.static_renditions.filter(_temp3)
		});
	}, $[3] = config.static_renditions, $[4] = dispatch, $[5] = t2) : t2 = $[5];
	let handleModeChange = t2, t3;
	$[6] === Symbol.for("react.memo_cache_sentinel") ? (t3 = [], $[6] = t3) : t3 = $[6];
	let t4 = renditionMode === "standard", t5;
	$[7] === handleModeChange ? t5 = $[8] : (t5 = () => handleModeChange("standard"), $[7] = handleModeChange, $[8] = t5);
	let t6 = `${id}--mode-standard`, t7;
	$[9] !== t4 || $[10] !== t5 || $[11] !== t6 ? (t7 = /* @__PURE__ */ jsx(Radio, {
		checked: t4,
		name: "rendition-mode",
		onChange: t5,
		value: "standard",
		id: t6
	}), $[9] = t4, $[10] = t5, $[11] = t6, $[12] = t7) : t7 = $[12];
	let t8 = `${id}--mode-standard`, t9;
	$[13] === t8 ? t9 = $[14] : (t9 = /* @__PURE__ */ jsx(Text, {
		as: "label",
		htmlFor: t8,
		children: "Standard"
	}), $[13] = t8, $[14] = t9);
	let t10;
	$[15] !== t7 || $[16] !== t9 ? (t10 = /* @__PURE__ */ jsxs(Flex, {
		align: "center",
		gap: 2,
		children: [t7, t9]
	}), $[15] = t7, $[16] = t9, $[17] = t10) : t10 = $[17];
	let t11 = renditionMode === "advanced", t12;
	$[18] === handleModeChange ? t12 = $[19] : (t12 = () => handleModeChange("advanced"), $[18] = handleModeChange, $[19] = t12);
	let t13 = `${id}--mode-advanced`, t14;
	$[20] !== t11 || $[21] !== t12 || $[22] !== t13 ? (t14 = /* @__PURE__ */ jsx(Radio, {
		checked: t11,
		name: "rendition-mode",
		onChange: t12,
		value: "advanced",
		id: t13
	}), $[20] = t11, $[21] = t12, $[22] = t13, $[23] = t14) : t14 = $[23];
	let t15 = `${id}--mode-advanced`, t16;
	$[24] === t15 ? t16 = $[25] : (t16 = /* @__PURE__ */ jsx(Text, {
		as: "label",
		htmlFor: t15,
		children: "Advanced"
	}), $[24] = t15, $[25] = t16);
	let t17;
	$[26] !== t14 || $[27] !== t16 ? (t17 = /* @__PURE__ */ jsxs(Flex, {
		align: "center",
		gap: 2,
		children: [t14, t16]
	}), $[26] = t14, $[27] = t16, $[28] = t17) : t17 = $[28];
	let t18;
	$[29] !== t10 || $[30] !== t17 ? (t18 = /* @__PURE__ */ jsxs(Flex, {
		gap: 3,
		children: [t10, t17]
	}), $[29] = t10, $[30] = t17, $[31] = t18) : t18 = $[31];
	let t19;
	$[32] !== config.static_renditions || $[33] !== id || $[34] !== renditionMode || $[35] !== toggleRendition ? (t19 = renditionMode === "standard" && /* @__PURE__ */ jsxs(Stack, {
		gap: 2,
		children: [/* @__PURE__ */ jsxs(Flex, {
			align: "center",
			gap: 2,
			padding: [0, 2],
			children: [/* @__PURE__ */ jsx(Checkbox, {
				id: `${id}--highest`,
				style: { display: "block" },
				checked: config.static_renditions.includes("highest"),
				onChange: () => toggleRendition("highest")
			}), /* @__PURE__ */ jsx(Text, {
				as: "label",
				htmlFor: `${id}--highest`,
				children: "Highest Resolution (up to 4K)"
			})]
		}), /* @__PURE__ */ jsxs(Flex, {
			align: "center",
			gap: 2,
			padding: [0, 2],
			children: [/* @__PURE__ */ jsx(Checkbox, {
				id: `${id}--audio-only-standard`,
				style: { display: "block" },
				checked: config.static_renditions.includes("audio-only"),
				onChange: () => toggleRendition("audio-only")
			}), /* @__PURE__ */ jsx(Text, {
				as: "label",
				htmlFor: `${id}--audio-only-standard`,
				children: "Audio Only (M4A)"
			})]
		})]
	}), $[32] = config.static_renditions, $[33] = id, $[34] = renditionMode, $[35] = toggleRendition, $[36] = t19) : t19 = $[36];
	let t20;
	$[37] !== config.static_renditions || $[38] !== id || $[39] !== renditionMode || $[40] !== toggleRendition ? (t20 = renditionMode === "advanced" && /* @__PURE__ */ jsxs(Stack, {
		gap: 2,
		children: [
			/* @__PURE__ */ jsx(Label, {
				size: 1,
				muted: !0,
				children: "Select specific resolutions:"
			}),
			/* @__PURE__ */ jsx(Flex, {
				gap: 2,
				wrap: "wrap",
				children: ADVANCED_RESOLUTIONS.map((t21) => {
					let { value, label } = t21, inputId = `${id}--resolution-${value}`;
					return /* @__PURE__ */ jsxs(Flex, {
						align: "center",
						gap: 2,
						children: [/* @__PURE__ */ jsx(Checkbox, {
							id: inputId,
							style: { display: "block" },
							checked: config.static_renditions.includes(value),
							onChange: () => toggleRendition(value)
						}), /* @__PURE__ */ jsx(Text, {
							as: "label",
							htmlFor: inputId,
							size: 1,
							children: label
						})]
					}, value);
				})
			}),
			/* @__PURE__ */ jsxs(Flex, {
				align: "center",
				gap: 2,
				padding: [
					2,
					2,
					0,
					2
				],
				children: [/* @__PURE__ */ jsx(Checkbox, {
					id: `${id}--audio-only-advanced`,
					style: { display: "block" },
					checked: config.static_renditions.includes("audio-only"),
					onChange: () => toggleRendition("audio-only")
				}), /* @__PURE__ */ jsx(Text, {
					as: "label",
					htmlFor: `${id}--audio-only-advanced`,
					children: "Audio Only (M4A)"
				})]
			})
		]
	}), $[37] = config.static_renditions, $[38] = id, $[39] = renditionMode, $[40] = toggleRendition, $[41] = t20) : t20 = $[41];
	let t21;
	return $[42] !== t18 || $[43] !== t19 || $[44] !== t20 ? (t21 = /* @__PURE__ */ jsx(Stack, {
		gap: 3,
		children: /* @__PURE__ */ jsx(FormField, {
			path: t3,
			title: "Static Renditions",
			description: "Generate downloadable MP4 or M4A files. Note: Mux will not upscale to produce MP4 renditions - renditions that would cause upscaling are skipped.",
			children: /* @__PURE__ */ jsxs(Stack, {
				gap: 3,
				children: [
					t18,
					t19,
					t20
				]
			})
		})
	}), $[42] = t18, $[43] = t19, $[44] = t20, $[45] = t21) : t21 = $[45], t21;
};
function _temp(r) {
	return r !== "highest" && r !== "audio-only";
}
function _temp2(r_1) {
	return r_1 === "highest" || r_1 === "audio-only";
}
function _temp3(r_2) {
	return r_2 !== "highest";
}
const NO_DIRECTIVES = [], VIDEO_QUALITY_LEVELS = [
	{
		value: "basic",
		label: "Basic"
	},
	{
		value: "plus",
		label: "Plus"
	},
	{
		value: "premium",
		label: "Premium"
	}
];
/**
* Sanitizes static renditions configuration to ensure 'highest' is not mixed with specific resolutions.
* If both are present, only 'highest' (and 'audio-only' if present) will be kept.
*/
function sanitizeStaticRenditions(renditions) {
	let hasHighest = renditions.includes("highest"), hasSpecificResolutions = renditions.some((r) => r !== "highest" && r !== "audio-only");
	return hasHighest && hasSpecificResolutions ? renditions.filter((r) => r === "highest" || r === "audio-only") : renditions;
}
/**
* The modal for configuring a staged upload. Handles triggering of the asset
* upload, even if no modal needs to be shown.
*
* @returns
*/
function UploadConfiguration({ stagedUpload, secrets, pluginConfig, startUpload, onClose }) {
	let id = useId(), [watermarkValidationError, setWatermarkValidationError] = useState(null), watermarkPreviewContainerRef = useRef(null), watermarkPreviewVideoRef = useRef(null), autoTextTracks = useRef(pluginConfig.video_quality === "plus" && pluginConfig.defaultAutogeneratedSubtitleLang ? [{
		_id: uuid(),
		type: "autogenerated",
		language_code: pluginConfig.defaultAutogeneratedSubtitleLang,
		name: LanguagesList.getNativeName(pluginConfig.defaultAutogeneratedSubtitleLang)
	}] : []).current, [config, dispatch] = useReducer((prev, action) => {
		switch (action.action) {
			case "video_quality": return action.value === "basic" ? Object.assign({}, prev, {
				video_quality: action.value,
				static_renditions: [],
				max_resolution_tier: "1080p",
				text_tracks: prev.text_tracks?.filter(({ type }) => type !== "autogenerated"),
				public_policy: !0,
				signed_policy: !1,
				drm_policy: !1
			}) : Object.assign({}, prev, {
				video_quality: action.value,
				static_renditions: sanitizeStaticRenditions(pluginConfig.static_renditions || []),
				max_resolution_tier: pluginConfig.max_resolution_tier,
				text_tracks: [...autoTextTracks, ...prev.text_tracks || []]
			});
			case "static_renditions":
			case "max_resolution_tier":
			case "normalize_audio":
			case "signed_policy": return Object.assign({}, prev, { [action.action]: action.value });
			case "public_policy": return Object.assign({}, prev, { [action.action]: action.value });
			case "drm_policy": return Object.assign({}, prev, { [action.action]: action.value });
			case "watermark": return Object.assign({}, prev, { watermark: action.value });
			case "asset_name": return Object.assign({}, prev, { [action.action]: action.value });
			case "track": {
				let text_tracks = [...prev.text_tracks], target_track_i = text_tracks.findIndex(({ _id }) => _id === action.id);
				switch (action.subAction) {
					case "add":
						if (target_track_i !== -1) break;
						text_tracks.push({
							_id: action.id,
							...action.value
						});
						break;
					case "update":
						if (target_track_i === -1) break;
						text_tracks[target_track_i] = {
							...text_tracks[target_track_i],
							...action.value
						};
						break;
					case "delete":
						if (target_track_i === -1) break;
						text_tracks.splice(target_track_i, 1);
				}
				return Object.assign({}, prev, { text_tracks });
			}
			default: return prev;
		}
	}, {
		video_quality: pluginConfig.video_quality,
		max_resolution_tier: pluginConfig.max_resolution_tier,
		static_renditions: sanitizeStaticRenditions(pluginConfig.static_renditions || []),
		signed_policy: secrets.enableSignedUrls && pluginConfig.defaultSigned,
		public_policy: pluginConfig.defaultPublic,
		drm_policy: pluginConfig.defaultDrm && !!secrets.drmConfigId,
		normalize_audio: pluginConfig.normalize_audio,
		text_tracks: autoTextTracks,
		asset_name: stagedUpload.type === "file" ? stagedUpload.files[0].name : stagedUpload.url
	}), [validationError, setValidationError] = useState(null), MAX_FILE_SIZE = pluginConfig.maxAssetFileSize, MAX_DURATION_SECONDS = pluginConfig.maxAssetDuration, { fileSize, isLoadingFileSize, canSkipFileSizeValidation } = useFetchFileSize(stagedUpload, MAX_FILE_SIZE), { videoAssetMetadata, setVideoAssetMetadata, isLoadingMetadata } = useMediaMetadata(stagedUpload);
	useEffect(() => {
		fileSize && setVideoAssetMetadata((old) => ({
			...old,
			size: fileSize
		}));
	}, [fileSize, setVideoAssetMetadata]), useEffect(() => {
		let validateDuration = (duration) => MAX_DURATION_SECONDS && duration > MAX_DURATION_SECONDS ? (setValidationError(`Video duration (${formatSeconds(duration)}) exceeds maximum allowed duration of ${formatSeconds(MAX_DURATION_SECONDS)}`), !1) : !0, validateFileSize = (size) => MAX_FILE_SIZE === void 0 || size <= MAX_FILE_SIZE || (setValidationError(`File size (${formatBytes(size)}) exceeds maximum allowed size of ${formatBytes(MAX_FILE_SIZE)}`), !1), validateDrmAvailability = (isAudioOnly) => config.drm_policy && isAudioOnly ? (setValidationError("Audio-only asset cannot be DRM protected"), !1) : !0, valid = !0;
		videoAssetMetadata?.size && (valid &&= canSkipFileSizeValidation || validateFileSize(videoAssetMetadata.size)), videoAssetMetadata?.duration && (valid &&= validateDuration(videoAssetMetadata.duration)), videoAssetMetadata?.isAudioOnly != null && (valid &&= validateDrmAvailability(videoAssetMetadata.isAudioOnly)), valid && setValidationError(null);
	}, [
		MAX_FILE_SIZE,
		MAX_DURATION_SECONDS,
		canSkipFileSizeValidation,
		videoAssetMetadata?.duration,
		videoAssetMetadata?.size,
		videoAssetMetadata?.height,
		videoAssetMetadata?.width,
		videoAssetMetadata,
		config.drm_policy,
		validationError
	]);
	let { disableTextTrackConfig, disableUploadConfig, disableAssetNameConfig } = pluginConfig, skipConfig = disableTextTrackConfig && disableUploadConfig && disableAssetNameConfig, configuredDirectiveIds = pluginConfig.defaultDirectiveIds ?? NO_DIRECTIVES, canRunRobots = useCanRunRobots(pluginConfig), { listing: directiveListing } = useRobotsDirectives(configuredDirectiveIds.length > 0 && !skipConfig), [uncheckedDirectiveIds, setUncheckedDirectiveIds] = useState([]), isDirectivesReadOnly = !canRunRobots || !!disableUploadConfig, missingIds = missingDirectiveIds(directiveListing, configuredDirectiveIds), isCheckingDirectives = configuredDirectiveIds.length > 0 && directiveListing.status === "pending", attachedDirectiveIds = directivesToAttach(configuredDirectiveIds, {
		missingIds,
		uncheckedIds: isDirectivesReadOnly ? [] : uncheckedDirectiveIds
	});
	if (useEffect(() => {
		if (skipConfig) {
			let { settings, watermark } = formatUploadConfig(config, secrets, { videoAspectRatio: videoAssetMetadata?.aspectRatio });
			startUpload(withDirectives(settings, configuredDirectiveIds), watermark, config.asset_name);
		}
	}, []), skipConfig) return null;
	let basicConfig = config.video_quality !== "plus" && config.video_quality !== "premium", playbackPolicySelected = config.public_policy || config.signed_policy || config.drm_policy, maxSupportedResolution = RESOLUTION_TIERS.findIndex((rt) => rt.value === pluginConfig.max_resolution_tier);
	return /* @__PURE__ */ jsx(Dialog, {
		animate: !0,
		open: !0,
		id: "upload-configuration",
		zOffset: 1e3,
		width: 1,
		header: "Configure Mux Upload",
		onClose,
		children: /* @__PURE__ */ jsxs(Stack, {
			padding: 4,
			gap: 2,
			children: [
				(validationError || watermarkValidationError) && /* @__PURE__ */ jsx(Card, {
					padding: 3,
					tone: "critical",
					radius: 2,
					marginBottom: 2,
					children: /* @__PURE__ */ jsxs(Flex, {
						gap: 2,
						align: "flex-start",
						children: [/* @__PURE__ */ jsx(ErrorOutlineIcon, {
							width: 20,
							height: 20
						}), /* @__PURE__ */ jsxs(Stack, {
							gap: 2,
							children: [/* @__PURE__ */ jsx(Text, {
								size: 1,
								weight: "semibold",
								children: "Validation Error"
							}), /* @__PURE__ */ jsx(Text, {
								size: 1,
								children: validationError || watermarkValidationError
							})]
						})]
					})
				}),
				/* @__PURE__ */ jsx(Label, {
					size: 3,
					children: "FILE TO UPLOAD"
				}),
				/* @__PURE__ */ jsx(Card, {
					tone: "transparent",
					border: !0,
					padding: 3,
					paddingY: 4,
					style: { borderRadius: "0.1865rem" },
					children: /* @__PURE__ */ jsxs(Flex, {
						gap: 2,
						children: [/* @__PURE__ */ jsx(DocumentVideoIcon, { fontSize: "2em" }), /* @__PURE__ */ jsxs(Stack, {
							gap: 2,
							children: [
								/* @__PURE__ */ jsx(Text, {
									textOverflow: "ellipsis",
									as: "h2",
									size: 3,
									children: stagedUpload.type === "file" ? stagedUpload.files[0].name : stagedUpload.url
								}),
								/* @__PURE__ */ jsx(Text, {
									as: "p",
									size: 1,
									muted: !0,
									children: stagedUpload.type === "file" ? `Direct File Upload (${formatBytes(stagedUpload.files[0].size)})` : videoAssetMetadata?.size ? `File From URL (${formatBytes(videoAssetMetadata.size)})` : isLoadingFileSize ? "File From URL (Loading size...)" : "File From URL (Unknown size)"
								}),
								stagedUpload.type === "file" && /* @__PURE__ */ jsxs(Stack, {
									gap: 1,
									children: [isLoadingMetadata && /* @__PURE__ */ jsx(Text, {
										as: "p",
										size: 1,
										muted: !0,
										children: "Reading video metadata..."
									}), videoAssetMetadata?.duration && !validationError && /* @__PURE__ */ jsxs(Text, {
										as: "p",
										size: 1,
										muted: !0,
										children: ["Duration: ", formatSeconds(videoAssetMetadata.duration)]
									})]
								})
							]
						})]
					})
				}),
				!disableAssetNameConfig && /* @__PURE__ */ jsx(FormField, {
					path: [],
					title: "Asset Name",
					inputId: "upload-config-set-asset-name",
					description: "Give a friendly name to your asset. This name will be displayed in the asset library on Sanity.",
					children: /* @__PURE__ */ jsx(TextInput, {
						id: "upload-config-set-asset-name",
						value: config.asset_name ?? "",
						placeholder: "[Notion ID] - Name of the asset (recommended format)",
						onChange: (e) => dispatch({
							action: "asset_name",
							value: e.currentTarget.value
						})
					})
				}),
				!disableUploadConfig && /* @__PURE__ */ jsxs(Stack, {
					gap: 3,
					paddingBottom: 2,
					children: [/* @__PURE__ */ jsx(FormField, {
						path: [],
						title: "Video Quality Level",
						description: /* @__PURE__ */ jsxs(Fragment, { children: [
							"The video quality level informs the cost, quality, and available platform features for the asset.",
							" ",
							/* @__PURE__ */ jsx("a", {
								href: "https://docs.mux.com/guides/use-encoding-tiers",
								target: "_blank",
								rel: "noopener noreferrer",
								children: "See the Mux guide for more details."
							})
						] }),
						children: /* @__PURE__ */ jsx(Flex, {
							gap: 3,
							children: VIDEO_QUALITY_LEVELS.map(({ value, label }) => {
								let inputId = `${id}--encodingtier-${value}`;
								return /* @__PURE__ */ jsxs(Flex, {
									align: "center",
									gap: 2,
									children: [/* @__PURE__ */ jsx(Radio, {
										checked: config.video_quality === value,
										name: "asset-encodingtier",
										onChange: (e) => dispatch({
											action: "video_quality",
											value: e.currentTarget.value
										}),
										value,
										id: inputId
									}), /* @__PURE__ */ jsx(Text, {
										as: "label",
										htmlFor: inputId,
										children: label
									})]
								}, value);
							})
						})
					}), !basicConfig && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(FormField, {
						title: "Additional Configuration",
						path: [],
						children: /* @__PURE__ */ jsxs(Stack, {
							gap: 3,
							children: [
								/* @__PURE__ */ jsx(PlaybackPolicy, {
									id,
									config,
									secrets,
									dispatch
								}),
								maxSupportedResolution > 0 && /* @__PURE__ */ jsx(ResolutionTierSelector, {
									id,
									config,
									dispatch,
									maxSupportedResolution
								}),
								/* @__PURE__ */ jsx(StaticRenditionSelector, {
									id,
									config,
									dispatch
								}),
								!disableTextTrackConfig && /* @__PURE__ */ jsx(TextTracksEditor, {
									tracks: config.text_tracks,
									dispatch,
									defaultLang: pluginConfig.defaultAutogeneratedSubtitleLang
								})
							]
						})
					}), /* @__PURE__ */ jsx(WatermarkSection, {
						config,
						dispatch,
						stagedUpload,
						videoAssetMetadata,
						watermarkPreviewContainerRef,
						watermarkPreviewVideoRef,
						onValidationChange: setWatermarkValidationError
					})] })]
				}),
				/* @__PURE__ */ jsx(RobotsUploadDirectives, {
					configuredIds: configuredDirectiveIds,
					missingIds,
					directiveNames: directiveNamesById(directiveListing, configuredDirectiveIds),
					listing: directiveListing,
					uncheckedIds: uncheckedDirectiveIds,
					isReadOnly: isDirectivesReadOnly,
					onToggle: (directiveId, checked) => setUncheckedDirectiveIds((previous) => checked ? previous.filter((id) => id !== directiveId) : [...previous, directiveId])
				}),
				/* @__PURE__ */ jsx(Box, {
					marginTop: 4,
					children: /* @__PURE__ */ jsx(Button, {
						disabled: !basicConfig && !playbackPolicySelected || validationError !== null || isLoadingMetadata || isCheckingDirectives || isLoadingFileSize && !canSkipFileSizeValidation,
						icon: UploadIcon,
						text: "Upload",
						tone: "positive",
						onClick: () => {
							if (!validationError) {
								let { settings, watermark } = formatUploadConfig(config, secrets, { videoAspectRatio: videoAssetMetadata?.aspectRatio });
								startUpload(withDirectives(settings, attachedDirectiveIds), watermark, config.asset_name);
							}
						}
					})
				})
			]
		})
	});
}
function setAdvancedPlaybackPolicy(config, secrets) {
	let advanced_playback_policies = [];
	return config.public_policy && advanced_playback_policies.push({ policy: "public" }), config.signed_policy && advanced_playback_policies.push({ policy: "signed" }), config.drm_policy && (secrets.drmConfigId ? advanced_playback_policies.push({
		policy: "drm",
		drm_configuration_id: secrets.drmConfigId ?? void 0
	}) : console.error("Selected DRM Policy but missing DRM Configuration Id")), advanced_playback_policies;
}
function formatUploadConfig(config, secrets, options) {
	let generated_subtitles = config.text_tracks.filter(isAutogeneratedTrack).map((track) => ({
		name: track.name,
		language_code: track.language_code
	})), inputs = [{
		type: "video",
		generated_subtitles: generated_subtitles.length > 0 ? generated_subtitles : void 0
	}, ...config.text_tracks.filter(isCustomTextTrack).reduce((acc, track) => (track.language_code && track.file && track.name && acc.push({
		url: track.file.contents,
		type: "text",
		text_type: track.type === "subtitles" ? "subtitles" : void 0,
		language_code: track.language_code,
		name: track.name,
		closed_captions: track.type === "captions"
	}), acc), [])];
	if (config.watermark?.imageUrl) {
		let overlaySettings = convertWatermarkToMuxOverlay({
			...config.watermark,
			enabled: !0
		}, {
			videoAspectRatio: options?.videoAspectRatio ?? void 0,
			units: "px"
		});
		overlaySettings && inputs.push({
			url: config.watermark.imageUrl,
			overlay_settings: overlaySettings
		});
	}
	return {
		settings: {
			input: inputs,
			static_renditions: config.static_renditions.length > 0 ? config.static_renditions.map((resolution) => ({ resolution })) : void 0,
			advanced_playback_policies: setAdvancedPlaybackPolicy(config, secrets),
			max_resolution_tier: config.max_resolution_tier,
			video_quality: config.video_quality,
			normalize_audio: config.normalize_audio
		},
		watermark: config.watermark?.imageUrl ? {
			...config.watermark,
			enabled: !0
		} : void 0
	};
}
function WatermarkSection(t0) {
	let $ = c(22), { config, dispatch, stagedUpload, videoAssetMetadata, watermarkPreviewContainerRef, watermarkPreviewVideoRef, onValidationChange } = t0;
	if (videoAssetMetadata?.isAudioOnly !== !1) return null;
	let t1;
	$[0] === Symbol.for("react.memo_cache_sentinel") ? (t1 = [], $[0] = t1) : t1 = $[0];
	let t2;
	$[1] === Symbol.for("react.memo_cache_sentinel") ? (t2 = /* @__PURE__ */ jsxs(Fragment, { children: [
		"Add a watermark overlay to your video using Mux's native watermark support.",
		" ",
		/* @__PURE__ */ jsx("a", {
			href: "https://www.mux.com/docs/guides/add-watermarks-to-your-videos",
			target: "_blank",
			rel: "noopener noreferrer",
			children: "Learn more about Mux watermarks."
		})
	] }), $[1] = t2) : t2 = $[1];
	let t3;
	$[2] === config.watermark ? t3 = $[3] : (t3 = config.watermark || { enabled: !1 }, $[2] = config.watermark, $[3] = t3);
	let t4;
	$[4] === dispatch ? t4 = $[5] : (t4 = (watermark) => {
		dispatch({
			action: "watermark",
			value: watermark
		});
	}, $[4] = dispatch, $[5] = t4);
	let t5;
	$[6] !== onValidationChange || $[7] !== t3 || $[8] !== t4 || $[9] !== watermarkPreviewContainerRef || $[10] !== watermarkPreviewVideoRef ? (t5 = /* @__PURE__ */ jsx(WatermarkControls, {
		watermark: t3,
		onChange: t4,
		onValidationChange,
		previewContainerRef: watermarkPreviewContainerRef,
		previewVideoRef: watermarkPreviewVideoRef
	}), $[6] = onValidationChange, $[7] = t3, $[8] = t4, $[9] = watermarkPreviewContainerRef, $[10] = watermarkPreviewVideoRef, $[11] = t5) : t5 = $[11];
	let t6;
	$[12] !== config.watermark || $[13] !== dispatch || $[14] !== stagedUpload || $[15] !== videoAssetMetadata || $[16] !== watermarkPreviewContainerRef || $[17] !== watermarkPreviewVideoRef ? (t6 = config.watermark?.imageUrl && stagedUpload.type === "file" && !config.watermark.overlay_settings && /* @__PURE__ */ jsx(WatermarkPreview, {
		stagedUpload,
		watermark: config.watermark,
		videoAspectRatio: videoAssetMetadata.aspectRatio,
		onWatermarkChange: (watermark_0) => {
			dispatch({
				action: "watermark",
				value: watermark_0
			});
		},
		previewContainerRef: watermarkPreviewContainerRef,
		videoRef: watermarkPreviewVideoRef
	}), $[12] = config.watermark, $[13] = dispatch, $[14] = stagedUpload, $[15] = videoAssetMetadata, $[16] = watermarkPreviewContainerRef, $[17] = watermarkPreviewVideoRef, $[18] = t6) : t6 = $[18];
	let t7;
	return $[19] !== t5 || $[20] !== t6 ? (t7 = /* @__PURE__ */ jsx(FormField, {
		path: t1,
		title: "Watermark",
		description: t2,
		children: /* @__PURE__ */ jsxs(Stack, {
			gap: 3,
			children: [t5, t6]
		})
	}), $[19] = t5, $[20] = t6, $[21] = t7) : t7 = $[21], t7;
}
const WatermarkPreview = memo(function WatermarkPreview(t0) {
	let $ = c(24), { stagedUpload, watermark, onWatermarkChange, videoAspectRatio, previewContainerRef, videoRef } = t0, t1, t2;
	$[0] !== stagedUpload || $[1] !== videoRef ? (t1 = () => {
		if (videoRef.current && stagedUpload.type === "file") {
			let file = stagedUpload.files[0], url = URL.createObjectURL(file);
			return videoRef.current.src = url, () => {
				URL.revokeObjectURL(url);
			};
		}
	}, t2 = [stagedUpload, videoRef], $[0] = stagedUpload, $[1] = videoRef, $[2] = t1, $[3] = t2) : (t1 = $[2], t2 = $[3]), useEffect(t1, t2);
	let isVertical = videoAspectRatio != null && videoAspectRatio < 1, t3;
	$[4] === Symbol.for("react.memo_cache_sentinel") ? (t3 = {
		overflow: "hidden",
		display: "flex",
		justifyContent: "center"
	}, $[4] = t3) : t3 = $[4];
	let t4 = isVertical ? "auto" : "100%", t5 = videoAspectRatio ? String(videoAspectRatio) : "16/9", t6;
	$[5] === isVertical ? t6 = $[6] : (t6 = isVertical ? {
		height: "400px",
		maxHeight: "50vh"
	} : { minHeight: "200px" }, $[5] = isVertical, $[6] = t6);
	let t7;
	$[7] !== t4 || $[8] !== t5 || $[9] !== t6 ? (t7 = {
		position: "relative",
		width: t4,
		aspectRatio: t5,
		...t6,
		overflow: "hidden"
	}, $[7] = t4, $[8] = t5, $[9] = t6, $[10] = t7) : t7 = $[10];
	let t8;
	$[11] === Symbol.for("react.memo_cache_sentinel") ? (t8 = {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		objectFit: "fill",
		display: "block"
	}, $[11] = t8) : t8 = $[11];
	let t9;
	$[12] === videoRef ? t9 = $[13] : (t9 = /* @__PURE__ */ jsx("video", {
		ref: videoRef,
		style: t8
	}), $[12] = videoRef, $[13] = t9);
	let t10 = previewContainerRef, t11 = videoRef, t12;
	$[14] !== onWatermarkChange || $[15] !== t10 || $[16] !== t11 || $[17] !== watermark ? (t12 = /* @__PURE__ */ jsx(DraggableWatermark, {
		watermark,
		onChange: onWatermarkChange,
		containerRef: t10,
		videoElementRef: t11
	}), $[14] = onWatermarkChange, $[15] = t10, $[16] = t11, $[17] = watermark, $[18] = t12) : t12 = $[18];
	let t13;
	return $[19] !== previewContainerRef || $[20] !== t12 || $[21] !== t7 || $[22] !== t9 ? (t13 = /* @__PURE__ */ jsx(Card, {
		tone: "transparent",
		border: !0,
		style: t3,
		children: /* @__PURE__ */ jsxs("div", {
			ref: previewContainerRef,
			style: t7,
			children: [t9, t12]
		})
	}), $[19] = previewContainerRef, $[20] = t12, $[21] = t7, $[22] = t9, $[23] = t13) : t13 = $[23], t13;
});
function withFocusRing(component) {
	return styled(component).withConfig({
		displayName: "",
		componentId: "sc-pnosg9-0"
	})(({ $border, theme }) => {
		let border = {
			width: +!!$border,
			color: "var(--card-border-color)"
		};
		return css`--card-focus-box-shadow:${focusRingBorderStyle(border)};border-radius:${rem(theme.sanity.radius[1])};outline:none;box-shadow:var(--card-focus-box-shadow);&:focus{--card-focus-box-shadow:${focusRingStyle({
			base: theme.sanity.color.base,
			border,
			focusRing: theme.sanity.focusRing
		})};}`;
	});
}
const UploadCardWithFocusRing = withFocusRing(Card);
function UploadCard(t0) {
	let $ = c(11), { children, tone, onPaste, onDrop, onDragEnter, onDragLeave, onDragOver, ref } = t0, inputRef = useRef(null), t1;
	$[0] === Symbol.for("react.memo_cache_sentinel") ? (t1 = (event) => {
		event.target.closest("#vtt-url") || (event.ctrlKey || event.metaKey) && event.key === "v" && inputRef.current.focus();
	}, $[0] = t1) : t1 = $[0];
	let handleKeyDown = t1, t2;
	$[1] === Symbol.for("react.memo_cache_sentinel") ? (t2 = /* @__PURE__ */ jsx(HiddenInput$1, { ref: inputRef }), $[1] = t2) : t2 = $[1];
	let t3;
	return $[2] !== children || $[3] !== onDragEnter || $[4] !== onDragLeave || $[5] !== onDragOver || $[6] !== onDrop || $[7] !== onPaste || $[8] !== ref || $[9] !== tone ? (t3 = /* @__PURE__ */ jsxs(UploadCardWithFocusRing, {
		tone,
		ref,
		padding: 0,
		radius: 2,
		shadow: 0,
		tabIndex: 0,
		onKeyDown: handleKeyDown,
		onPaste,
		onDrop,
		onDragEnter,
		onDragLeave,
		onDragOver,
		children: [t2, children]
	}), $[2] = children, $[3] = onDragEnter, $[4] = onDragLeave, $[5] = onDragOver, $[6] = onDrop, $[7] = onPaste, $[8] = ref, $[9] = tone, $[10] = t3) : t3 = $[10], t3;
}
const HiddenInput$1 = styled.input.attrs({ type: "text" }).withConfig({
	displayName: "HiddenInput",
	componentId: "sc-krn2by-0"
})`position:absolute;border:0;color:white;opacity:0;&:focus{outline:none;}`, HiddenInput = styled.input.withConfig({
	displayName: "HiddenInput",
	componentId: "sc-12dr06-0"
})`overflow:hidden;width:0.1px;height:0.1px;opacity:0;position:absolute;z-index:-1;`, Label$1 = styled.label.withConfig({
	displayName: "Label",
	componentId: "sc-12dr06-1"
})`position:relative;`, FileInputButton = (t0) => {
	let $ = c(18), accept, onSelect, props;
	$[0] === t0 ? (accept = $[1], onSelect = $[2], props = $[3]) : ({onSelect, accept, ...props} = t0, $[0] = t0, $[1] = accept, $[2] = onSelect, $[3] = props);
	let inputId = `FileSelect${useId()}`, inputRef = useRef(null), t1;
	$[4] === onSelect ? t1 = $[5] : (t1 = (event) => {
		onSelect && onSelect(event.target.files);
	}, $[4] = onSelect, $[5] = t1);
	let handleSelect = t1, t2;
	$[6] === Symbol.for("react.memo_cache_sentinel") ? (t2 = () => inputRef.current?.click(), $[6] = t2) : t2 = $[6];
	let handleButtonClick = t2, t3;
	$[7] !== accept || $[8] !== handleSelect || $[9] !== inputId ? (t3 = /* @__PURE__ */ jsx(HiddenInput, {
		accept,
		ref: inputRef,
		tabIndex: 0,
		type: "file",
		id: inputId,
		onChange: handleSelect,
		value: ""
	}), $[7] = accept, $[8] = handleSelect, $[9] = inputId, $[10] = t3) : t3 = $[10];
	let t4;
	$[11] === Symbol.for("react.memo_cache_sentinel") ? (t4 = { width: "100%" }, $[11] = t4) : t4 = $[11];
	let t5;
	$[12] === props ? t5 = $[13] : (t5 = /* @__PURE__ */ jsx(Button, {
		onClick: handleButtonClick,
		mode: "default",
		tone: "primary",
		style: t4,
		...props
	}), $[12] = props, $[13] = t5);
	let t6;
	return $[14] !== inputId || $[15] !== t3 || $[16] !== t5 ? (t6 = /* @__PURE__ */ jsxs(Label$1, {
		htmlFor: inputId,
		children: [t3, t5]
	}), $[14] = inputId, $[15] = t3, $[16] = t5, $[17] = t6) : t6 = $[17], t6;
};
function formatAcceptString(accept) {
	return accept.split(",").map((type) => type.trim().replace("/*", "")).join(" or ");
}
function UploadPlaceholder(props) {
	let $ = c(32), { setDialogState, readOnly, onSelect, hovering, needsSetup, accept } = props, t0;
	$[0] === setDialogState ? t0 = $[1] : (t0 = () => setDialogState("select-video"), $[0] = setDialogState, $[1] = t0);
	let handleBrowse = t0, t1;
	$[2] === setDialogState ? t1 = $[3] : (t1 = () => setDialogState("secrets"), $[2] = setDialogState, $[3] = t1);
	let handleConfigureApi = t1, { hasConfigAccess } = useAccessControl(props.config), t2 = readOnly ? "transparent" : "inherit", t3;
	$[4] === hovering ? t3 = $[5] : (t3 = hovering ? { borderColor: "transparent" } : void 0, $[4] = hovering, $[5] = t3);
	let t4;
	$[6] === Symbol.for("react.memo_cache_sentinel") ? (t4 = [
		"column",
		"column",
		"row"
	], $[6] = t4) : t4 = $[6];
	let t5;
	$[7] === Symbol.for("react.memo_cache_sentinel") ? (t5 = /* @__PURE__ */ jsx(Flex, {
		justify: "center",
		children: /* @__PURE__ */ jsx(Text, {
			muted: !0,
			children: /* @__PURE__ */ jsx(DocumentVideoIcon, {})
		})
	}), $[7] = t5) : t5 = $[7];
	let t6;
	$[8] === accept ? t6 = $[9] : (t6 = formatAcceptString(accept), $[8] = accept, $[9] = t6);
	let t7;
	$[10] === t6 ? t7 = $[11] : (t7 = /* @__PURE__ */ jsxs(Flex, {
		align: "center",
		justify: "flex-start",
		gap: 2,
		flex: 1,
		children: [t5, /* @__PURE__ */ jsx(Flex, {
			justify: "center",
			children: /* @__PURE__ */ jsxs(Text, {
				size: 1,
				muted: !0,
				children: [
					"Drag ",
					t6,
					" file or paste URL here"
				]
			})
		})]
	}), $[10] = t6, $[11] = t7);
	let t8;
	$[12] !== accept || $[13] !== onSelect ? (t8 = /* @__PURE__ */ jsx(FileInputButton, {
		accept,
		mode: "bleed",
		tone: "default",
		icon: UploadIcon,
		text: "Upload",
		onSelect
	}), $[12] = accept, $[13] = onSelect, $[14] = t8) : t8 = $[14];
	let t9;
	$[15] === handleBrowse ? t9 = $[16] : (t9 = /* @__PURE__ */ jsx(Button, {
		mode: "bleed",
		icon: SearchIcon,
		text: "Select",
		onClick: handleBrowse
	}), $[15] = handleBrowse, $[16] = t9);
	let t10;
	$[17] !== handleConfigureApi || $[18] !== hasConfigAccess || $[19] !== needsSetup ? (t10 = hasConfigAccess && /* @__PURE__ */ jsx(Button, {
		padding: 3,
		radius: 3,
		tone: needsSetup ? "critical" : void 0,
		onClick: handleConfigureApi,
		icon: PlugIcon,
		mode: "bleed",
		title: "Configure plugin credentials"
	}), $[17] = handleConfigureApi, $[18] = hasConfigAccess, $[19] = needsSetup, $[20] = t10) : t10 = $[20];
	let t11;
	$[21] !== t10 || $[22] !== t8 || $[23] !== t9 ? (t11 = /* @__PURE__ */ jsxs(Inline, {
		gap: 2,
		children: [
			t8,
			t9,
			t10
		]
	}), $[21] = t10, $[22] = t8, $[23] = t9, $[24] = t11) : t11 = $[24];
	let t12;
	$[25] !== t11 || $[26] !== t7 ? (t12 = /* @__PURE__ */ jsxs(Flex, {
		align: "center",
		justify: "space-between",
		gap: 4,
		direction: t4,
		paddingY: 2,
		sizing: "border",
		children: [t7, t11]
	}), $[25] = t11, $[26] = t7, $[27] = t12) : t12 = $[27];
	let t13;
	return $[28] !== t12 || $[29] !== t2 || $[30] !== t3 ? (t13 = /* @__PURE__ */ jsx(Card, {
		sizing: "border",
		tone: t2,
		border: !0,
		radius: 2,
		paddingX: 3,
		paddingY: 1,
		style: t3,
		children: t12
	}), $[28] = t12, $[29] = t2, $[30] = t3, $[31] = t13) : t13 = $[31], t13;
}
const INITIAL_STATE = {
	stagedUpload: null,
	uploadStatus: null,
	error: null
};
/**
* The main interface for inputting a Mux Video. It handles staging an upload
* file, setting its configuration, displaying upload progress, and showing
* the preview player.
*/
function Uploader(props) {
	let toast = useToast(), containerRef = useRef(null), dragEnteredEls = useRef([]), [dragState, setDragState] = useState(null), cancelUploadButton = useRef((() => {
		let events$ = new Subject();
		return {
			observable: events$.asObservable(),
			handleClick: (event) => events$.next(event)
		};
	})()).current, uploadRef = useRef(null), uploadingDocumentId = useRef(null), [state, dispatch] = useReducer((prev, action) => {
		switch (action.action) {
			case "stageUpload": return Object.assign({}, INITIAL_STATE, { stagedUpload: action.input });
			case "commitUpload": return Object.assign({}, prev, { uploadStatus: { progress: 0 } });
			case "progressInfo": {
				let { type, action: _, ...payload } = action;
				return Object.assign({}, prev, { uploadStatus: {
					...prev.uploadStatus,
					progress: prev.uploadStatus.progress,
					...payload
				} });
			}
			case "progress": return Object.assign({}, prev, { uploadStatus: {
				...prev.uploadStatus,
				progress: action.percent
			} });
			case "reset":
			case "complete": return uploadRef.current?.unsubscribe(), uploadRef.current = null, uploadingDocumentId.current = null, INITIAL_STATE;
			case "error": {
				uploadRef.current?.unsubscribe(), uploadRef.current = null, uploadingDocumentId.current = null;
				let error = action.error;
				return isServerError(action.error) && hasPlaybackPolicy(action.settings, "drm") && (error = /* @__PURE__ */ Error("Unknown Error while uploading DRM protected content. Make sure your DRM configuration ID is valid and set correctly")), Object.assign({}, INITIAL_STATE, { error });
			}
			default: return prev;
		}
	}, {
		stagedUpload: null,
		uploadStatus: null,
		error: null
	});
	useEffect(() => {
		let cleanup = () => {
			if (uploadRef.current && !uploadRef.current.closed && uploadRef.current.unsubscribe(), uploadingDocumentId.current && props.asset?._id !== uploadingDocumentId.current) {
				let docId = uploadingDocumentId.current;
				uploadingDocumentId.current = null, props.client.delete(docId).catch((err) => {
					console.warn("Failed to cleanup orphaned upload document:", err);
				});
			}
		}, handleBeforeUnload = () => {
			cleanup();
		};
		return window.addEventListener("beforeunload", handleBeforeUnload), window.addEventListener("pagehide", handleBeforeUnload), () => {
			window.removeEventListener("beforeunload", handleBeforeUnload), window.removeEventListener("pagehide", handleBeforeUnload), cleanup();
		};
	}, [props.client, props.asset?._id]);
	/**
	* Begins a file or URL upload with the staged files or URL.
	*
	* Should only be called from the UploadConfiguration component, which provides
	* the Mux configuration for the direct asset upload.
	*
	* @param settings The Mux new_asset_settings object to send to Sanity
	* @param watermark Optional watermark configuration
	* @returns
	*/
	let startUpload = (settings, watermark, assetName) => {
		let { stagedUpload } = state;
		if (!stagedUpload || uploadRef.current) return;
		dispatch({ action: "commitUpload" });
		let directiveIds = settings.directives?.map(({ id }) => id) ?? [], uploadObservable;
		switch (stagedUpload.type) {
			case "url":
				uploadObservable = uploadUrl({
					client: props.client,
					url: stagedUpload.url,
					settings,
					watermark,
					assetName: assetName || void 0
				});
				break;
			case "file": uploadObservable = uploadFile({
				client: props.client,
				file: stagedUpload.files[0],
				settings,
				watermark,
				assetName: assetName || void 0
			}).pipe(takeUntil(cancelUploadButton.observable.pipe(tap(() => {
				uploadingDocumentId.current &&= (props.client.delete(uploadingDocumentId.current), null);
			}))));
		}
		uploadRef.current = uploadObservable.subscribe({
			next: (event) => {
				switch (event.type) {
					case "uuid":
						uploadingDocumentId.current = event.uuid, dispatch({
							action: "progressInfo",
							...event
						});
						break;
					case "file":
					case "url":
						dispatch({
							action: "progressInfo",
							...event
						});
						break;
					case "progress":
						dispatch({
							action: "progress",
							percent: event.percent
						});
						break;
					case "success":
						dispatch({
							action: "progress",
							percent: 100
						}), uploadingDocumentId.current = null, props.onUploadWithDirectives(event.asset._id, directiveIds);
						let patches = [setIfMissing({
							asset: {},
							_type: "mux.video"
						}), set({
							_type: "reference",
							_weak: !0,
							_ref: event.asset._id
						}, ["asset"])];
						props.config.inlineAssetMetadata && (patches.push(setIfMissing({ data: {} })), patches.push(set({
							_type: "metadata",
							...event.asset.data ?? {}
						}, ["data"]))), props.onChange(PatchEvent.from(patches)), props.config.inlineAssetMetadata && watchAssetForMetadata(event.asset._id, props);
				}
			},
			complete: () => dispatch({ action: "complete" }),
			error: (error) => dispatch({
				action: "error",
				error,
				settings
			})
		});
	}, invalidFileToast = useCallback(() => {
		toast.push({
			status: "error",
			title: `Invalid file type. Accepted types: ${props.config.acceptedMimeTypes?.join(", ")}`
		});
	}, [props.config.acceptedMimeTypes, toast]), isInvalidFile = (files) => Array.from(files).some((file) => !props.config.acceptedMimeTypes?.some((acceptedType) => {
		let pattern = `^${acceptedType.replace("*", ".*")}$`;
		return new RegExp(pattern).test(file.type);
	})), handleUpload = (files) => {
		isInvalidFile(files) || dispatch({
			action: "stageUpload",
			input: {
				type: "file",
				files
			}
		});
	}, handlePaste = (event) => {
		if (event.target.closest("#vtt-url")) return;
		event.preventDefault(), event.stopPropagation();
		let url = (event.clipboardData || window.clipboardData)?.getData("text")?.trim();
		isValidUrl(url) ? dispatch({
			action: "stageUpload",
			input: {
				type: "url",
				url
			}
		}) : toast.push({
			status: "error",
			title: "Invalid URL for Mux video input."
		});
	}, handleDrop = (event) => {
		event.preventDefault(), event.stopPropagation(), dragState === "invalid" ? (invalidFileToast(), setDragState(null)) : (setDragState(null), extractDroppedFiles(event.nativeEvent.dataTransfer).then((files) => {
			dispatch({
				action: "stageUpload",
				input: {
					type: "file",
					files
				}
			});
		}));
	}, handleDragOver = (event) => {
		event.preventDefault(), event.stopPropagation();
	}, handleDragEnter = (event) => {
		event.stopPropagation(), dragEnteredEls.current.push(event.target);
		let type = event.dataTransfer.items?.[0]?.type, isValidType = props.config.acceptedMimeTypes?.some((acceptedType) => {
			let pattern = `^${acceptedType.replace("*", ".*")}$`;
			return new RegExp(pattern).test(type);
		});
		setDragState(isValidType ? "valid" : "invalid");
	}, handleDragLeave = (event) => {
		event.stopPropagation();
		let idx = dragEnteredEls.current.indexOf(event.target);
		idx > -1 && dragEnteredEls.current.splice(idx, 1), dragEnteredEls.current.length === 0 && setDragState(null);
	};
	if (state.error !== null) {
		let error = state.error;
		return /* @__PURE__ */ jsxs(Flex, {
			gap: 3,
			direction: "column",
			justify: "center",
			align: "center",
			children: [
				/* @__PURE__ */ jsx(Text, {
					size: 5,
					muted: !0,
					children: /* @__PURE__ */ jsx(ErrorOutlineIcon, {})
				}),
				/* @__PURE__ */ jsx(Text, { children: "Something went wrong" }),
				error instanceof Error && error.message && /* @__PURE__ */ jsx(Text, {
					size: 1,
					muted: !0,
					weight: "semibold",
					style: { textAlign: "center" },
					children: error.message
				}),
				/* @__PURE__ */ jsx(Button, {
					text: "Upload another file",
					onClick: () => dispatch({ action: "reset" })
				})
			]
		});
	}
	if (state.uploadStatus !== null) {
		let { uploadStatus } = state;
		return /* @__PURE__ */ jsx(UploadProgress, {
			onCancel: cancelUploadButton.handleClick,
			progress: uploadStatus.progress,
			filename: uploadStatus.file?.name || uploadStatus.url
		});
	}
	if (state.stagedUpload !== null) return /* @__PURE__ */ jsx(UploadConfiguration, {
		stagedUpload: state.stagedUpload,
		pluginConfig: props.config,
		secrets: props.secrets,
		startUpload,
		onClose: () => dispatch({ action: "reset" })
	});
	let tone;
	dragState && (tone = dragState === "valid" ? "positive" : "critical");
	let acceptMimeString = props.config?.acceptedMimeTypes?.length ? props.config.acceptedMimeTypes.join(",") : "video/*, audio/*";
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(UploadCard, {
		tone,
		onDrop: handleDrop,
		onDragOver: handleDragOver,
		onDragLeave: handleDragLeave,
		onDragEnter: handleDragEnter,
		onPaste: handlePaste,
		ref: containerRef,
		children: props.asset ? /* @__PURE__ */ jsx(DialogStateProvider, {
			dialogState: props.dialogState,
			setDialogState: props.setDialogState,
			children: /* @__PURE__ */ jsx(Player, {
				readOnly: props.readOnly,
				asset: props.asset,
				onChange: props.onChange,
				config: props.config,
				buttons: /* @__PURE__ */ jsx(PlayerActionsMenu_default, {
					accept: acceptMimeString,
					asset: props.asset,
					dialogState: props.dialogState,
					setDialogState: props.setDialogState,
					onChange: props.onChange,
					onSelect: handleUpload,
					readOnly: props.readOnly,
					config: props.config
				})
			})
		}) : /* @__PURE__ */ jsx(UploadPlaceholder, {
			accept: acceptMimeString,
			hovering: dragState !== null,
			onSelect: handleUpload,
			readOnly: !!props.readOnly,
			setDialogState: props.setDialogState,
			needsSetup: props.needsSetup,
			config: props.config
		})
	}), props.dialogState === "select-video" && /* @__PURE__ */ jsx(InputBrowser, {
		config: props.config,
		asset: props.asset,
		onChange: props.onChange,
		setDialogState: props.setDialogState
	})] });
}
const Input = (props) => {
	let $ = c(20), client = useClient$1(), secretDocumentValues = useSecretsDocumentValues(), assetDocumentValues = useAssetDocumentValues(props.value?.asset), poll = useMuxPolling(props.readOnly ? void 0 : assetDocumentValues?.value || void 0), asset = assetDocumentValues?.value, t0;
	$[0] !== asset || $[1] !== props.readOnly ? (t0 = !props.readOnly && !!asset && hasUnfinishedRobotsWork(asset), $[0] = asset, $[1] = props.readOnly, $[2] = t0) : t0 = $[2];
	let t1;
	$[3] !== props.config.defaultDirectiveIds || $[4] !== t0 ? (t1 = {
		enabled: t0,
		defaultDirectiveIds: props.config.defaultDirectiveIds
	}, $[3] = props.config.defaultDirectiveIds, $[4] = t0, $[5] = t1) : t1 = $[5], useRobotsSync(asset, t1);
	let checkRobotsAfterUpload = useRobotsUploadCheck(asset), [dialogState, setDialogState] = useDialogState(), { hasConfigAccess } = useAccessControl(props.config), error = secretDocumentValues.error || assetDocumentValues.error || poll.error;
	if (error) throw error;
	let isLoading = secretDocumentValues.isLoading || assetDocumentValues.isLoading, t2;
	$[6] === Symbol.for("react.memo_cache_sentinel") ? (t2 = /* @__PURE__ */ jsx(InputFallback, {}), $[6] = t2) : t2 = $[6];
	let t3;
	$[7] !== assetDocumentValues || $[8] !== checkRobotsAfterUpload || $[9] !== client || $[10] !== dialogState || $[11] !== hasConfigAccess || $[12] !== isLoading || $[13] !== props || $[14] !== secretDocumentValues.value || $[15] !== setDialogState ? (t3 = /* @__PURE__ */ jsx(Suspense, {
		fallback: t2,
		children: isLoading ? /* @__PURE__ */ jsx(InputFallback, {}) : /* @__PURE__ */ jsxs(Fragment, { children: [secretDocumentValues.value.needsSetup && !assetDocumentValues.value ? /* @__PURE__ */ jsx(Onboard, {
			setDialogState,
			config: props.config
		}) : /* @__PURE__ */ jsx(Uploader, {
			...props,
			config: props.config,
			onChange: props.onChange,
			client,
			secrets: secretDocumentValues.value.secrets,
			asset: assetDocumentValues.value,
			dialogState,
			setDialogState,
			needsSetup: secretDocumentValues.value.needsSetup,
			onUploadWithDirectives: checkRobotsAfterUpload
		}), dialogState === "secrets" && hasConfigAccess && /* @__PURE__ */ jsx(ConfigureApiDialog, {
			setDialogState,
			secrets: secretDocumentValues.value.secrets
		})] })
	}), $[7] = assetDocumentValues, $[8] = checkRobotsAfterUpload, $[9] = client, $[10] = dialogState, $[11] = hasConfigAccess, $[12] = isLoading, $[13] = props, $[14] = secretDocumentValues.value, $[15] = setDialogState, $[16] = t3) : t3 = $[16];
	let t4;
	return $[17] !== props.schemaType || $[18] !== t3 ? (t4 = /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(ErrorBoundaryCard_default, {
		schemaType: props.schemaType,
		children: t3
	}) }), $[17] = props.schemaType, $[18] = t3, $[19] = t4) : t4 = $[19], t4;
};
var Input_default = memo(Input);
function muxVideoCustomRendering(config) {
	return {
		components: { input: (props) => /* @__PURE__ */ jsx(MuxApiHostProvider, {
			muxApiHost: config.muxApiHost,
			children: /* @__PURE__ */ jsx(Input_default, {
				config: {
					...config,
					...props.schemaType.options
				},
				...props
			})
		}) },
		preview: {
			select: {
				filename: "asset.filename",
				playbackId: "asset.playbackId",
				status: "asset.status",
				assetId: "asset.assetId",
				thumbTime: "asset.thumbTime",
				data: "asset.data"
			},
			prepare: (asset) => {
				let { filename, playbackId, status } = asset;
				return {
					title: filename || playbackId || "",
					subtitle: status ? `status: ${status}` : null,
					media: asset.playbackId ? /* @__PURE__ */ jsx(VideoThumbnail, {
						asset,
						width: 64
					}) : null
				};
			}
		}
	};
}
const muxVideoSchema = {
	name: "mux.video",
	type: "object",
	title: "Video asset reference",
	fields: [{
		title: "Video",
		name: "asset",
		type: "reference",
		weak: !0,
		to: [{ type: "mux.videoAsset" }]
	}]
}, schemaTypes = [
	{
		name: "mux.track",
		type: "object",
		fields: [
			{
				type: "string",
				name: "id"
			},
			{
				type: "string",
				name: "type"
			},
			{
				type: "number",
				name: "max_width"
			},
			{
				type: "number",
				name: "max_frame_rate"
			},
			{
				type: "number",
				name: "duration"
			},
			{
				type: "number",
				name: "max_height"
			},
			{
				type: "string",
				name: "language_code"
			},
			{
				type: "string",
				name: "name"
			},
			{
				type: "string",
				name: "status"
			},
			{
				type: "string",
				name: "text_source"
			},
			{
				type: "string",
				name: "text_type"
			}
		]
	},
	{
		name: "mux.playbackId",
		type: "object",
		fields: [{
			type: "string",
			name: "id"
		}, {
			type: "string",
			name: "policy"
		}]
	},
	{
		name: "mux.staticRenditionFile",
		type: "object",
		fields: [
			{
				type: "string",
				name: "name"
			},
			{
				type: "string",
				name: "ext"
			},
			{
				type: "number",
				name: "height"
			},
			{
				type: "number",
				name: "width"
			},
			{
				type: "number",
				name: "bitrate"
			},
			{
				type: "string",
				name: "filesize"
			},
			{
				type: "string",
				name: "type"
			},
			{
				type: "string",
				name: "status"
			},
			{
				type: "string",
				name: "resolution_tier"
			},
			{
				type: "string",
				name: "resolution"
			},
			{
				type: "string",
				name: "id"
			},
			{
				type: "string",
				name: "passthrough"
			}
		]
	},
	{
		name: "mux.staticRenditions",
		type: "object",
		fields: [{
			type: "string",
			name: "status"
		}, {
			name: "files",
			type: "array",
			of: [{ type: "mux.staticRenditionFile" }]
		}]
	},
	{
		name: "mux.masterFile",
		type: "object",
		fields: [{
			type: "string",
			name: "status"
		}, {
			type: "string",
			name: "url"
		}]
	},
	{
		name: "mux.assetData",
		title: "Mux asset data",
		type: "object",
		fields: [
			{
				type: "string",
				name: "resolution_tier"
			},
			{
				type: "string",
				name: "upload_id"
			},
			{
				type: "string",
				name: "created_at"
			},
			{
				type: "string",
				name: "id"
			},
			{
				type: "string",
				name: "status"
			},
			{
				type: "string",
				name: "max_stored_resolution"
			},
			{
				type: "string",
				name: "passthrough"
			},
			{
				type: "string",
				name: "encoding_tier"
			},
			{
				type: "string",
				name: "video_quality"
			},
			{
				type: "string",
				name: "master_access"
			},
			{
				type: "string",
				name: "aspect_ratio"
			},
			{
				type: "number",
				name: "duration"
			},
			{
				type: "number",
				name: "max_stored_frame_rate"
			},
			{
				type: "string",
				name: "mp4_support"
			},
			{
				type: "string",
				name: "max_resolution_tier"
			},
			{
				type: "number",
				name: "thumbnail_time"
			},
			{
				name: "tracks",
				type: "array",
				of: [{ type: "mux.track" }]
			},
			{
				name: "playback_ids",
				type: "array",
				of: [{ type: "mux.playbackId" }]
			},
			{
				name: "static_renditions",
				type: "mux.staticRenditions"
			},
			{
				name: "master",
				type: "mux.masterFile"
			}
		]
	},
	{
		name: "mux.robotsJob",
		type: "object",
		fields: [
			{
				type: "string",
				name: "id"
			},
			{
				type: "string",
				name: "workflow"
			},
			{
				type: "string",
				name: "status"
			},
			{
				type: "number",
				name: "created_at"
			},
			{
				type: "number",
				name: "updated_at"
			},
			{
				type: "number",
				name: "units_consumed"
			},
			{
				type: "string",
				name: "error"
			},
			{
				type: "boolean",
				name: "thumbnailApplied"
			}
		]
	},
	{
		name: "mux.robotsOutputs",
		type: "object",
		fields: [{
			name: "summarize",
			type: "object",
			fields: [
				{
					type: "string",
					name: "jobId"
				},
				{
					type: "number",
					name: "completedAt"
				},
				{
					type: "string",
					name: "title"
				},
				{
					type: "text",
					name: "description"
				},
				{
					type: "array",
					name: "tags",
					of: [{ type: "string" }]
				}
			]
		}, {
			name: "moderate",
			type: "object",
			fields: [
				{
					type: "string",
					name: "jobId"
				},
				{
					type: "number",
					name: "completedAt"
				},
				{
					type: "boolean",
					name: "exceedsThreshold"
				},
				{
					name: "maxScores",
					type: "object",
					fields: [{
						type: "number",
						name: "sexual"
					}, {
						type: "number",
						name: "violence"
					}]
				}
			]
		}]
	},
	{
		name: "mux.robotsDirectiveRun",
		type: "object",
		fields: [
			{
				type: "string",
				name: "runId"
			},
			{
				type: "string",
				name: "directiveId"
			},
			{
				type: "string",
				name: "status"
			},
			{
				type: "number",
				name: "startedAt"
			},
			{
				type: "number",
				name: "completedAt"
			},
			{
				type: "array",
				name: "jobIds",
				of: [{ type: "string" }]
			}
		]
	},
	{
		name: "mux.robotsPendingCreate",
		type: "object",
		fields: [
			{
				type: "string",
				name: "requestId"
			},
			{
				type: "string",
				name: "kind"
			},
			{
				type: "string",
				name: "workflow"
			},
			{
				type: "string",
				name: "directiveId"
			},
			{
				type: "number",
				name: "requestedAt"
			}
		]
	},
	{
		name: "mux.videoAsset",
		type: "document",
		title: "Video asset",
		fields: [
			{
				type: "string",
				name: "status"
			},
			{
				type: "string",
				name: "assetId"
			},
			{
				type: "string",
				name: "playbackId"
			},
			{
				type: "string",
				name: "filename"
			},
			{
				type: "number",
				name: "thumbTime"
			},
			{
				type: "mux.assetData",
				name: "data"
			},
			{
				name: "robotsJobs",
				type: "array",
				of: [{ type: "mux.robotsJob" }]
			},
			{
				type: "mux.robotsOutputs",
				name: "robotsOutputs"
			},
			{
				name: "robotsDirectiveRuns",
				type: "array",
				of: [{ type: "mux.robotsDirectiveRun" }]
			},
			{
				name: "robotsPendingCreates",
				type: "array",
				of: [{ type: "mux.robotsPendingCreate" }]
			}
		]
	}
], defaultConfig = {
	static_renditions: [],
	mp4_support: "none",
	video_quality: "plus",
	max_resolution_tier: "1080p",
	normalize_audio: !1,
	defaultPublic: !0,
	defaultSigned: !1,
	defaultDrm: !1,
	inlineAssetMetadata: !1,
	tool: DEFAULT_TOOL_CONFIG,
	allowedRolesForConfiguration: [],
	acceptedMimeTypes: ["video/*", "audio/*"],
	allowedRolesForRobots: DEFAULT_ALLOWED_ROLES_FOR_ROBOTS,
	defaultDirectiveIds: []
};
/**
* Converts legacy mp4_support configuration to static_renditions format
*/
function convertLegacyConfig(config) {
	return config.static_renditions && config.static_renditions.length > 0 ? { static_renditions: config.static_renditions } : config.mp4_support === "standard" ? { static_renditions: ["highest"] } : { static_renditions: [] };
}
const muxInput = definePlugin((userConfig) => {
	if (typeof userConfig == "object" && "encoding_tier" in userConfig) {
		let deprecated_encoding_tier = userConfig.encoding_tier;
		userConfig.video_quality || (deprecated_encoding_tier === "baseline" && (userConfig.video_quality = "basic"), deprecated_encoding_tier === "smart" && (userConfig.video_quality = "plus"));
	}
	let config = {
		...defaultConfig,
		...userConfig,
		...convertLegacyConfig(userConfig || {})
	};
	return config.muxApiHost !== void 0 && (config.muxApiHost = normalizeMuxApiHost(config.muxApiHost)), {
		name: "mux-input",
		schema: { types: [...schemaTypes, {
			...muxVideoSchema,
			...muxVideoCustomRendering(config)
		}] },
		tools: config.tool === !1 ? void 0 : [createStudioTool(config)]
	};
});
export { defaultConfig, muxInput };

//# sourceMappingURL=index.js.map