//#region src/v12/meta.js
var e = {
	version: "v12",
	description: "JSON-to-DOM engine powered by decoupled external-action traversal engine"
}, t = (t) => {
	if (typeof globalThis > "u" || !t) return;
	globalThis.ks ??= {};
	let n = {
		meta: e,
		buildSpecElement: t
	};
	globalThis.ks["json-to-tag"] = n, globalThis.ks.jsonToTag = n;
}, n = ({ inItems: e, inFunc: t }) => {
	let n = e, r = t;
	return Array.isArray(n) ? n.map((e) => i({
		inSpec: e,
		inFunc: r
	})).flat(Infinity).filter(Boolean) : [];
}, r = ({ inSpec: e, inFunc: t }) => {
	let r = e, i = t;
	if (!r || typeof r != "object" || Array.isArray(r)) return null;
	let a = typeof i == "function" ? i(r) : null;
	if (Array.isArray(r.children)) {
		let e = n({
			inItems: r.children,
			inFunc: i
		});
		if (a && typeof a.append == "function" && Array.isArray(e)) {
			let t = e.filter(Boolean);
			t.length && a.append(...t);
		}
	}
	return a;
}, i = ({ inSpec: e, inFunc: t }) => {
	let i = e, a = t;
	return i == null ? null : typeof Node < "u" && i instanceof Node ? i : Array.isArray(i) ? n({
		inItems: i,
		inFunc: a
	}) : typeof i == "object" ? r({
		inSpec: i,
		inFunc: a
	}) : typeof i == "string" || typeof i == "number" ? typeof document < "u" ? document.createTextNode(String(i)) : String(i) : null;
}, a = "http://www.w3.org/2000/svg", o = /* @__PURE__ */ new Set(/* @__PURE__ */ "svg.path.symbol.use.g.circle.ellipse.rect.line.polyline.polygon.text.tspan.defs.clippath.mask.pattern.marker.lineargradient.radialgradient.stop.image.filter.fegaussianblur.femerge.femergenode".split(".")), s = ({ inTagName: e }) => {
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
	return t ? (c({
		inElement: t,
		inTextContent: e.textContent,
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
	}), t) : null;
}, m = (e = {}) => i({
	inSpec: e?.spec ?? e?.inSpec ?? e,
	inFunc: p
}), h = m, g = m;
t(m);
//#endregion
export { g as buildSpec, m as buildSpecElement, m as default, e as meta, h as specToDom, i as traverse };
