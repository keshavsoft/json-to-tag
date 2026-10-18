//#region src/v10/meta.js
var e = {
	version: "v9",
	description: "JSON-to-DOM engine with SVG namespace support, mixed text content, and centralized traversal"
}, t = (t) => {
	if (typeof globalThis > "u" || !t) return;
	globalThis.ks ??= {};
	let n = {
		meta: e,
		buildSpecElement: t
	};
	globalThis.ks["json-to-tag"] = n, globalThis.ks.jsonToTag = n;
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
}, m = (e) => e == null ? null : typeof Node < "u" && e instanceof Node ? e : Array.isArray(e) ? r(e) : typeof e == "object" ? p(e) : typeof e == "string" || typeof e == "number" ? document.createTextNode(String(e)) : null, h = (e = {}) => m(e?.spec ?? e?.inSpec ?? e), g = h, _ = m;
t(h);
//#endregion
export { _ as buildSpec, h as buildSpecElement, h as default, e as meta, g as specToDom, m as traverse };
