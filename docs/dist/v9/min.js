//#region src/v9/meta.js
var e = {
	version: "v9",
	description: "JSON-to-DOM engine with SVG namespace support, mixed text content, and centralized traversal"
}, t = ({ inFuncDefinition: t, inReviewSpec: n } = {}) => {
	if (typeof globalThis > "u" || !t) return;
	globalThis.ks ??= {};
	let r = {
		meta: e,
		buildSpecElement: t,
		reviewSpec: n
	};
	globalThis.ks["json-to-tag"] = r, globalThis.ks.jsonToTag = r;
}, n = (e) => e == null ? null : typeof Node < "u" && e instanceof Node ? e : typeof e == "string" || typeof e == "number" ? document.createTextNode(String(e)) : typeof e == "object" && (e.nodeType === 3 || e.tagName === "#text" || !e.tagName && (e.textContent !== void 0 || e.text !== void 0)) ? document.createTextNode(e.textContent ?? e.text ?? "") : m(e), r = (e) => Array.isArray(e) ? e.map(n).flat(Infinity).filter(Boolean) : [], i = (e) => e ?? e, a = "http://www.w3.org/2000/svg", o = /* @__PURE__ */ new Set(/* @__PURE__ */ "svg.path.symbol.use.g.circle.ellipse.rect.line.polyline.polygon.text.tspan.defs.clippath.mask.pattern.marker.lineargradient.radialgradient.stop.image.filter.fegaussianblur.femerge.femergenode".split(".")), s = ({ inTagName: e }) => {
	let t = e?.toLowerCase();
	if (!t) return null;
	if (t === "checkbox") {
		let e = document.createElement("input");
		return e.type = "checkbox", e;
	}
	return o.has(t) ? document.createElementNS(a, t) : document.createElement(t);
}, c = ({ inElement: e, inTextContent: t }) => (!e || t == null || (e.textContent = t), e), l = ({ inElement: e, inProperties: t }) => (e && t && typeof t == "object" && Object.assign(e, t), e), u = "http://www.w3.org/1999/xlink", d = ({ inElement: e, inAttributes: t }) => {
	let n = e, r = t;
	if (!n || !r || typeof r != "object") return n;
	let i = typeof SVGElement < "u" ? n instanceof SVGElement : n.namespaceURI === "http://www.w3.org/2000/svg";
	return Object.entries(r).forEach(([e, t]) => {
		if (e === "class") {
			i ? n.setAttribute("class", String(t)) : n.className = t;
			return;
		}
		if (e === "xlink:href" || e === "href") {
			if (t != null) {
				let e = String(t);
				if (i) try {
					n.setAttributeNS(u, "href", e);
				} catch {}
				n.setAttribute("href", e), n.setAttribute("xlink:href", e);
			}
			return;
		}
		if (typeof t == "boolean") {
			t ? n.setAttribute(e, "") : n.removeAttribute(e);
			return;
		}
		t != null && n.setAttribute(e, String(t));
	}), n;
}, f = ({ inElement: e, inClassList: t }) => {
	if (!e || !t) return e;
	let n = typeof t == "string" ? t.split(/\s+/).filter(Boolean) : Array.isArray(t) ? t.filter((e) => typeof e == "string" && e.trim()) : [];
	return n.length && e.classList.add(...n), e;
}, p = (e) => {
	if (!e || typeof e != "object" || Array.isArray(e) || !e.tagName) return null;
	let t = s({ inTagName: e.tagName });
	if (!t) return null;
	if (c({
		inElement: t,
		inTextContent: i(e.textContent),
		inTagName: e.tagName
	}), l({
		inElement: t,
		inProperties: e.properties
	}), d({
		inElement: t,
		inAttributes: e.attributes
	}), f({
		inElement: t,
		inClassList: e.classList
	}), Array.isArray(e.children)) {
		let n = r(e.children);
		n.length && t.append(...n);
	}
	return t;
}, m = (e) => e == null ? null : typeof Node < "u" && e instanceof Node ? e : Array.isArray(e) ? r(e) : typeof e == "object" ? p(e) : typeof e == "string" || typeof e == "number" ? document.createTextNode(String(e)) : null, h = {
	$schema: "./tags.schema.json",
	div: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["title", "role"],
		childTags: []
	},
	input: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"type",
			"placeholder",
			"value",
			"name",
			"disabled",
			"readonly",
			"required",
			"list"
		]
	},
	checkbox: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"type",
			"checked",
			"name",
			"value",
			"disabled",
			"required"
		]
	},
	colgroup: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["span"],
		childTags: ["col"]
	},
	col: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"span",
			"style",
			"width"
		]
	},
	label: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["for"],
		childTags: []
	},
	form: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"action",
			"method",
			"autocomplete",
			"enctype",
			"name",
			"novalidate",
			"target"
		],
		childTags: []
	},
	select: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"name",
			"disabled",
			"required",
			"multiple",
			"size"
		],
		childTags: ["option"]
	},
	p: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	h1: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	h2: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	span: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	img: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"src",
			"alt",
			"width",
			"height",
			"loading"
		]
	},
	button: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"type",
			"disabled",
			"name",
			"value"
		],
		childTags: []
	},
	table: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"border",
			"cellpadding",
			"cellspacing"
		],
		childTags: [
			"caption",
			"colgroup",
			"thead",
			"tbody",
			"tfoot",
			"tr"
		]
	},
	thead: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tbody: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tfoot: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tr: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["td", "th"]
	},
	th: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"scope",
			"colspan",
			"rowspan"
		],
		childTags: []
	},
	td: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["colspan", "rowspan"],
		childTags: []
	},
	datalist: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["option"]
	},
	option: {
		allowsTextContent: !0,
		allowsChildren: !1,
		allowedAttributes: [
			"value",
			"label",
			"selected",
			"disabled"
		]
	},
	header: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["role"],
		childTags: []
	},
	a: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"href",
			"target",
			"rel",
			"title",
			"download"
		],
		childTags: []
	},
	i: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["aria-hidden"],
		childTags: []
	},
	small: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	ul: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["type"],
		childTags: ["li"]
	},
	li: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["value"],
		childTags: []
	},
	hr: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: []
	}
}, g = ({ inSpec: e }) => {
	let t = e;
	if (!t) return [];
	if (Array.isArray(t)) return t.flatMap((e) => g({ inSpec: e }));
	if (typeof t != "object") return [];
	let n = [];
	return typeof t.tagName == "string" && t.tagName.trim().length > 0 && n.push(t.tagName.toLowerCase()), Array.isArray(t.children) && t.children.length > 0 && t.children.forEach((e) => {
		let t = g({ inSpec: e });
		n.push(...t);
	}), n;
}, _ = ({ inTagsFound: e, inAllowedTags: t }) => {
	let n = e ?? [], r = new Set(Object.keys(t ?? {}).filter((e) => e !== "$schema").map((e) => e.toLowerCase())), i = {}, a = [], o = [];
	n.forEach((e) => {
		i[e] = (i[e] || 0) + 1, r.has(e) ? a.includes(e) || a.push(e) : o.includes(e) || o.push(e);
	});
	let s = n.length, c = o.length === 0;
	return {
		totalTags: s,
		tagCounts: i,
		uniqueTags: Object.keys(i),
		recognizedTags: a,
		unrecognizedTags: o,
		areAllTagsPresent: c
	};
}, v = ({ inSpec: e, inTags: t = h } = {}) => {
	let n = e, r = t, i = _({
		inTagsFound: g({ inSpec: n }),
		inAllowedTags: r
	});
	return {
		areAllTagsPresent: i.areAllTagsPresent,
		totalTags: i.totalTags,
		tagCounts: i.tagCounts,
		uniqueTags: i.uniqueTags,
		recognizedTags: i.recognizedTags,
		unrecognizedTags: i.unrecognizedTags
	};
}, y = (e = {}) => m(e?.spec ?? e?.inSpec ?? e), b = y, x = m;
t({
	inFuncDefinition: y,
	inReviewSpec: v
});
//#endregion
export { x as buildSpec, y as buildSpecElement, y as default, e as meta, v as reviewSpec, b as specToDom, m as traverse };
