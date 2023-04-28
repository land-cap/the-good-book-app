;(function () {
	const t = document.createElement('link').relList
	if (t && t.supports && t.supports('modulepreload')) return
	for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o)
	new MutationObserver((o) => {
		for (const i of o)
			if (i.type === 'childList')
				for (const s of i.addedNodes)
					s.tagName === 'LINK' && s.rel === 'modulepreload' && r(s)
	}).observe(document, { childList: !0, subtree: !0 })

	function n(o) {
		const i = {}
		return (
			o.integrity && (i.integrity = o.integrity),
			o.referrerPolicy && (i.referrerPolicy = o.referrerPolicy),
			o.crossOrigin === 'use-credentials'
				? (i.credentials = 'include')
				: o.crossOrigin === 'anonymous'
				? (i.credentials = 'omit')
				: (i.credentials = 'same-origin'),
			i
		)
	}

	function r(o) {
		if (o.ep) return
		o.ep = !0
		const i = n(o)
		fetch(o.href, i)
	}
})()
const lo = (e, t) => e === t,
	re = Symbol('solid-proxy'),
	Xt = Symbol('solid-track'),
	co = Symbol('solid-dev-component'),
	wt = { equals: lo }
let ur = mr
const Ae = 1,
	xt = 2,
	fr = { owned: null, cleanups: null, context: null, owner: null }
var N = null
let zt = null,
	R = null,
	G = null,
	de = null,
	Rt = 0

function Qe(e, t) {
	const n = R,
		r = N,
		o = e.length === 0,
		i = o
			? fr
			: {
					owned: null,
					cleanups: null,
					context: null,
					owner: t === void 0 ? r : t,
			  },
		s = o ? e : () => e(() => K(() => Nt(i)))
	;(N = i), (R = null)
	try {
		return Se(s, !0)
	} finally {
		;(R = n), (N = r)
	}
}

function J(e, t) {
	t = t ? Object.assign({}, wt, t) : wt
	const n = {
			value: e,
			observers: null,
			observerSlots: null,
			comparator: t.equals || void 0,
		},
		r = (o) => (typeof o == 'function' && (o = o(n.value)), gr(n, o))
	return [hr.bind(n), r]
}

function Q(e, t, n) {
	const r = bn(e, t, !1, Ae)
	ut(r)
}

function ot(e, t, n) {
	ur = bo
	const r = bn(e, t, !1, Ae)
	;(r.user = !0), de ? de.push(r) : ut(r)
}

function M(e, t, n) {
	n = n ? Object.assign({}, wt, n) : wt
	const r = bn(e, t, !0, 0)
	return (
		(r.observers = null),
		(r.observerSlots = null),
		(r.comparator = n.equals || void 0),
		ut(r),
		hr.bind(r)
	)
}

function uo(e) {
	return Se(e, !1)
}

function K(e) {
	if (R === null) return e()
	const t = R
	R = null
	try {
		return e()
	} finally {
		R = t
	}
}

function dr(e, t, n) {
	const r = Array.isArray(e)
	let o,
		i = n && n.defer
	return (s) => {
		let a
		if (r) {
			a = Array(e.length)
			for (let c = 0; c < e.length; c++) a[c] = e[c]()
		} else a = e()
		if (i) {
			i = !1
			return
		}
		const l = K(() => t(a, o, s))
		return (o = a), l
	}
}

function kt(e) {
	ot(() => K(e))
}

function ct(e) {
	return (
		N === null ||
			(N.cleanups === null ? (N.cleanups = [e]) : N.cleanups.push(e)),
		e
	)
}

function pr() {
	return R
}

function fo() {
	return N
}

function po(e, t) {
	const n = N,
		r = R
	;(N = e), (R = null)
	try {
		return Se(t, !0)
	} catch (o) {
		yn(o)
	} finally {
		;(N = n), (R = r)
	}
}

function ho(e) {
	const t = R,
		n = N
	return Promise.resolve().then(() => {
		;(R = t), (N = n)
		let r
		return Se(e, !1), (R = N = null), r ? r.done : void 0
	})
}

function gn(e, t) {
	const n = Symbol('context')
	return { id: n, Provider: yo(n), defaultValue: e }
}

function Dt(e) {
	let t
	return (t = yr(N, e.id)) !== void 0 ? t : e.defaultValue
}

function mn(e) {
	const t = M(e),
		n = M(() => Zt(t()))
	return (
		(n.toArray = () => {
			const r = n()
			return Array.isArray(r) ? r : r != null ? [r] : []
		}),
		n
	)
}

function hr() {
	if (this.sources && this.state)
		if (this.state === Ae) ut(this)
		else {
			const e = G
			;(G = null), Se(() => Ot(this), !1), (G = e)
		}
	if (R) {
		const e = this.observers ? this.observers.length : 0
		R.sources
			? (R.sources.push(this), R.sourceSlots.push(e))
			: ((R.sources = [this]), (R.sourceSlots = [e])),
			this.observers
				? (this.observers.push(R),
				  this.observerSlots.push(R.sources.length - 1))
				: ((this.observers = [R]),
				  (this.observerSlots = [R.sources.length - 1]))
	}
	return this.value
}

function gr(e, t, n) {
	let r = e.value
	return (
		(!e.comparator || !e.comparator(r, t)) &&
			((e.value = t),
			e.observers &&
				e.observers.length &&
				Se(() => {
					for (let o = 0; o < e.observers.length; o += 1) {
						const i = e.observers[o],
							s = zt && zt.running
						s && zt.disposed.has(i),
							(s ? !i.tState : !i.state) &&
								(i.pure ? G.push(i) : de.push(i), i.observers && br(i)),
							s || (i.state = Ae)
					}
					if (G.length > 1e6) throw ((G = []), new Error())
				}, !1)),
		t
	)
}

function ut(e) {
	if (!e.fn) return
	Nt(e)
	const t = N,
		n = R,
		r = Rt
	;(R = N = e), go(e, e.value, r), (R = n), (N = t)
}

function go(e, t, n) {
	let r
	try {
		r = e.fn(t)
	} catch (o) {
		return (
			e.pure &&
				((e.state = Ae), e.owned && e.owned.forEach(Nt), (e.owned = null)),
			(e.updatedAt = n + 1),
			yn(o)
		)
	}
	;(!e.updatedAt || e.updatedAt <= n) &&
		(e.updatedAt != null && 'observers' in e ? gr(e, r) : (e.value = r),
		(e.updatedAt = n))
}

function bn(e, t, n, r = Ae, o) {
	const i = {
		fn: e,
		state: r,
		updatedAt: null,
		owned: null,
		sources: null,
		sourceSlots: null,
		cleanups: null,
		value: t,
		owner: N,
		context: null,
		pure: n,
	}
	return (
		N === null || (N !== fr && (N.owned ? N.owned.push(i) : (N.owned = [i]))),
		i
	)
}

function Et(e) {
	if (e.state === 0) return
	if (e.state === xt) return Ot(e)
	if (e.suspense && K(e.suspense.inFallback)) return e.suspense.effects.push(e)
	const t = [e]
	for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < Rt); )
		e.state && t.push(e)
	for (let n = t.length - 1; n >= 0; n--)
		if (((e = t[n]), e.state === Ae)) ut(e)
		else if (e.state === xt) {
			const r = G
			;(G = null), Se(() => Ot(e, t[0]), !1), (G = r)
		}
}

function Se(e, t) {
	if (G) return e()
	let n = !1
	t || (G = []), de ? (n = !0) : (de = []), Rt++
	try {
		const r = e()
		return mo(n), r
	} catch (r) {
		n || (de = null), (G = null), yn(r)
	}
}

function mo(e) {
	if ((G && (mr(G), (G = null)), e)) return
	const t = de
	;(de = null), t.length && Se(() => ur(t), !1)
}

function mr(e) {
	for (let t = 0; t < e.length; t++) Et(e[t])
}

function bo(e) {
	let t,
		n = 0
	for (t = 0; t < e.length; t++) {
		const r = e[t]
		r.user ? (e[n++] = r) : Et(r)
	}
	for (t = 0; t < n; t++) Et(e[t])
}

function Ot(e, t) {
	e.state = 0
	for (let n = 0; n < e.sources.length; n += 1) {
		const r = e.sources[n]
		if (r.sources) {
			const o = r.state
			o === Ae
				? r !== t && (!r.updatedAt || r.updatedAt < Rt) && Et(r)
				: o === xt && Ot(r, t)
		}
	}
}

function br(e) {
	for (let t = 0; t < e.observers.length; t += 1) {
		const n = e.observers[t]
		n.state ||
			((n.state = xt), n.pure ? G.push(n) : de.push(n), n.observers && br(n))
	}
}

function Nt(e) {
	let t
	if (e.sources)
		for (; e.sources.length; ) {
			const n = e.sources.pop(),
				r = e.sourceSlots.pop(),
				o = n.observers
			if (o && o.length) {
				const i = o.pop(),
					s = n.observerSlots.pop()
				r < o.length &&
					((i.sourceSlots[s] = r), (o[r] = i), (n.observerSlots[r] = s))
			}
		}
	if (e.owned) {
		for (t = e.owned.length - 1; t >= 0; t--) Nt(e.owned[t])
		e.owned = null
	}
	if (e.cleanups) {
		for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]()
		e.cleanups = null
	}
	;(e.state = 0), (e.context = null)
}

function yn(e) {
	throw e
}

function yr(e, t) {
	return e
		? e.context && e.context[t] !== void 0
			? e.context[t]
			: yr(e.owner, t)
		: void 0
}

function Zt(e) {
	if (typeof e == 'function' && !e.length) return Zt(e())
	if (Array.isArray(e)) {
		const t = []
		for (let n = 0; n < e.length; n++) {
			const r = Zt(e[n])
			Array.isArray(r) ? t.push.apply(t, r) : t.push(r)
		}
		return t
	}
	return e
}

function yo(e, t) {
	return function (r) {
		let o
		return (
			Q(
				() =>
					(o = K(
						() => ((N.context = { [e]: r.value }), mn(() => r.children)),
					)),
				void 0,
			),
			o
		)
	}
}

const vo = Symbol('fallback')

function In(e) {
	for (let t = 0; t < e.length; t++) e[t]()
}

function wo(e, t, n = {}) {
	let r = [],
		o = [],
		i = [],
		s = 0,
		a = t.length > 1 ? [] : null
	return (
		ct(() => In(i)),
		() => {
			let l = e() || [],
				c,
				u
			return (
				l[Xt],
				K(() => {
					let f = l.length,
						p,
						m,
						h,
						g,
						b,
						v,
						O,
						C,
						A
					if (f === 0)
						s !== 0 &&
							(In(i),
							(i = []),
							(r = []),
							(o = []),
							(s = 0),
							a && (a = [])),
							n.fallback &&
								((r = [vo]),
								(o[0] = Qe((S) => ((i[0] = S), n.fallback()))),
								(s = 1))
					else if (s === 0) {
						for (o = new Array(f), u = 0; u < f; u++)
							(r[u] = l[u]), (o[u] = Qe(d))
						s = f
					} else {
						for (
							h = new Array(f),
								g = new Array(f),
								a && (b = new Array(f)),
								v = 0,
								O = Math.min(s, f);
							v < O && r[v] === l[v];
							v++
						);
						for (
							O = s - 1, C = f - 1;
							O >= v && C >= v && r[O] === l[C];
							O--, C--
						)
							(h[C] = o[O]), (g[C] = i[O]), a && (b[C] = a[O])
						for (p = new Map(), m = new Array(C + 1), u = C; u >= v; u--)
							(A = l[u]),
								(c = p.get(A)),
								(m[u] = c === void 0 ? -1 : c),
								p.set(A, u)
						for (c = v; c <= O; c++)
							(A = r[c]),
								(u = p.get(A)),
								u !== void 0 && u !== -1
									? ((h[u] = o[c]),
									  (g[u] = i[c]),
									  a && (b[u] = a[c]),
									  (u = m[u]),
									  p.set(A, u))
									: i[c]()
						for (u = v; u < f; u++)
							u in h
								? ((o[u] = h[u]),
								  (i[u] = g[u]),
								  a && ((a[u] = b[u]), a[u](u)))
								: (o[u] = Qe(d))
						;(o = o.slice(0, (s = f))), (r = l.slice(0))
					}
					return o
				})
			)

			function d(f) {
				if (((i[u] = f), a)) {
					const [p, m] = J(u)
					return (a[u] = m), t(l[u], p)
				}
				return t(l[u])
			}
		}
	)
}

function L(e, t) {
	return K(() => e(t || {}))
}

function ft() {
	return !0
}

const Yt = {
	get(e, t, n) {
		return t === re ? n : e.get(t)
	},
	has(e, t) {
		return t === re ? !0 : e.has(t)
	},
	set: ft,
	deleteProperty: ft,
	getOwnPropertyDescriptor(e, t) {
		return {
			configurable: !0,
			enumerable: !0,
			get() {
				return e.get(t)
			},
			set: ft,
			deleteProperty: ft,
		}
	},
	ownKeys(e) {
		return e.keys()
	},
}

function Ft(e) {
	return (e = typeof e == 'function' ? e() : e) ? e : {}
}

function ne(...e) {
	let t = !1
	for (let r = 0; r < e.length; r++) {
		const o = e[r]
		;(t = t || (!!o && re in o)),
			(e[r] = typeof o == 'function' ? ((t = !0), M(o)) : o)
	}
	if (t)
		return new Proxy(
			{
				get(r) {
					for (let o = e.length - 1; o >= 0; o--) {
						const i = Ft(e[o])[r]
						if (i !== void 0) return i
					}
				},
				has(r) {
					for (let o = e.length - 1; o >= 0; o--)
						if (r in Ft(e[o])) return !0
					return !1
				},
				keys() {
					const r = []
					for (let o = 0; o < e.length; o++)
						r.push(...Object.keys(Ft(e[o])))
					return [...new Set(r)]
				},
			},
			Yt,
		)
	const n = {}
	for (let r = e.length - 1; r >= 0; r--)
		if (e[r]) {
			const o = Object.getOwnPropertyDescriptors(e[r])
			for (const i in o)
				i in n ||
					Object.defineProperty(n, i, {
						enumerable: !0,
						get() {
							for (let s = e.length - 1; s >= 0; s--) {
								const a = (e[s] || {})[i]
								if (a !== void 0) return a
							}
						},
					})
		}
	return n
}

function vr(e, ...t) {
	const n = new Set(t.flat())
	if (re in e) {
		const o = t.map(
			(i) =>
				new Proxy(
					{
						get(s) {
							return i.includes(s) ? e[s] : void 0
						},
						has(s) {
							return i.includes(s) && s in e
						},
						keys() {
							return i.filter((s) => s in e)
						},
					},
					Yt,
				),
		)
		return (
			o.push(
				new Proxy(
					{
						get(i) {
							return n.has(i) ? void 0 : e[i]
						},
						has(i) {
							return n.has(i) ? !1 : i in e
						},
						keys() {
							return Object.keys(e).filter((i) => !n.has(i))
						},
					},
					Yt,
				),
			),
			o
		)
	}
	const r = Object.getOwnPropertyDescriptors(e)
	return (
		t.push(Object.keys(r).filter((o) => !n.has(o))),
		t.map((o) => {
			const i = {}
			for (let s = 0; s < o.length; s++) {
				const a = o[s]
				a in e &&
					Object.defineProperty(
						i,
						a,
						r[a]
							? r[a]
							: {
									get() {
										return e[a]
									},
									set() {
										return !0
									},
									enumerable: !0,
							  },
					)
			}
			return i
		})
	)
}

let xo = 0

function Eo() {
	return `cl-${xo++}`
}

const Oo = (e) => `Stale read from <${e}>.`

function Co(e) {
	const t = 'fallback' in e && { fallback: () => e.fallback }
	return M(wo(() => e.each, e.children, t || void 0))
}

function vn(e) {
	const t = e.keyed,
		n = M(() => e.when, void 0, {
			equals: (r, o) => (t ? r === o : !r == !o),
		})
	return M(
		() => {
			const r = n()
			if (r) {
				const o = e.children
				return typeof o == 'function' && o.length > 0
					? K(() =>
							o(
								t
									? r
									: () => {
											if (!K(n)) throw Oo('Show')
											return e.when
									  },
							),
					  )
					: o
			}
			return e.fallback
		},
		void 0,
		void 0,
	)
}

const Ao = [
		'allowfullscreen',
		'async',
		'autofocus',
		'autoplay',
		'checked',
		'controls',
		'default',
		'disabled',
		'formnovalidate',
		'hidden',
		'indeterminate',
		'ismap',
		'loop',
		'multiple',
		'muted',
		'nomodule',
		'novalidate',
		'open',
		'playsinline',
		'readonly',
		'required',
		'reversed',
		'seamless',
		'selected',
	],
	So = new Set([
		'className',
		'value',
		'readOnly',
		'formNoValidate',
		'isMap',
		'noModule',
		'playsInline',
		...Ao,
	]),
	Po = new Set(['innerHTML', 'textContent', 'innerText', 'children']),
	Io = Object.assign(Object.create(null), {
		className: 'class',
		htmlFor: 'for',
	}),
	Lo = Object.assign(Object.create(null), {
		class: 'className',
		formnovalidate: { $: 'formNoValidate', BUTTON: 1, INPUT: 1 },
		ismap: { $: 'isMap', IMG: 1 },
		nomodule: { $: 'noModule', SCRIPT: 1 },
		playsinline: { $: 'playsInline', VIDEO: 1 },
		readonly: { $: 'readOnly', INPUT: 1, TEXTAREA: 1 },
	})

function To(e, t) {
	const n = Lo[e]
	return typeof n == 'object' ? (n[t] ? n.$ : void 0) : n
}

const $o = new Set([
		'beforeinput',
		'click',
		'dblclick',
		'contextmenu',
		'focusin',
		'focusout',
		'input',
		'keydown',
		'keyup',
		'mousedown',
		'mousemove',
		'mouseout',
		'mouseover',
		'mouseup',
		'pointerdown',
		'pointermove',
		'pointerout',
		'pointerover',
		'pointerup',
		'touchend',
		'touchmove',
		'touchstart',
	]),
	Ro = new Set([
		'altGlyph',
		'altGlyphDef',
		'altGlyphItem',
		'animate',
		'animateColor',
		'animateMotion',
		'animateTransform',
		'circle',
		'clipPath',
		'color-profile',
		'cursor',
		'defs',
		'desc',
		'ellipse',
		'feBlend',
		'feColorMatrix',
		'feComponentTransfer',
		'feComposite',
		'feConvolveMatrix',
		'feDiffuseLighting',
		'feDisplacementMap',
		'feDistantLight',
		'feFlood',
		'feFuncA',
		'feFuncB',
		'feFuncG',
		'feFuncR',
		'feGaussianBlur',
		'feImage',
		'feMerge',
		'feMergeNode',
		'feMorphology',
		'feOffset',
		'fePointLight',
		'feSpecularLighting',
		'feSpotLight',
		'feTile',
		'feTurbulence',
		'filter',
		'font',
		'font-face',
		'font-face-format',
		'font-face-name',
		'font-face-src',
		'font-face-uri',
		'foreignObject',
		'g',
		'glyph',
		'glyphRef',
		'hkern',
		'image',
		'line',
		'linearGradient',
		'marker',
		'mask',
		'metadata',
		'missing-glyph',
		'mpath',
		'path',
		'pattern',
		'polygon',
		'polyline',
		'radialGradient',
		'rect',
		'set',
		'stop',
		'svg',
		'switch',
		'symbol',
		'text',
		'textPath',
		'tref',
		'tspan',
		'use',
		'view',
		'vkern',
	]),
	ko = {
		xlink: 'http://www.w3.org/1999/xlink',
		xml: 'http://www.w3.org/XML/1998/namespace',
	}

function Do(e, t, n) {
	let r = n.length,
		o = t.length,
		i = r,
		s = 0,
		a = 0,
		l = t[o - 1].nextSibling,
		c = null
	for (; s < o || a < i; ) {
		if (t[s] === n[a]) {
			s++, a++
			continue
		}
		for (; t[o - 1] === n[i - 1]; ) o--, i--
		if (o === s) {
			const u = i < r ? (a ? n[a - 1].nextSibling : n[i - a]) : l
			for (; a < i; ) e.insertBefore(n[a++], u)
		} else if (i === a)
			for (; s < o; ) (!c || !c.has(t[s])) && t[s].remove(), s++
		else if (t[s] === n[i - 1] && n[a] === t[o - 1]) {
			const u = t[--o].nextSibling
			e.insertBefore(n[a++], t[s++].nextSibling),
				e.insertBefore(n[--i], u),
				(t[o] = n[i])
		} else {
			if (!c) {
				c = new Map()
				let d = a
				for (; d < i; ) c.set(n[d], d++)
			}
			const u = c.get(t[s])
			if (u != null)
				if (a < u && u < i) {
					let d = s,
						f = 1,
						p
					for (
						;
						++d < o &&
						d < i &&
						!((p = c.get(t[d])) == null || p !== u + f);

					)
						f++
					if (f > u - a) {
						const m = t[s]
						for (; a < u; ) e.insertBefore(n[a++], m)
					} else e.replaceChild(n[a++], t[s++])
				} else s++
			else t[s++].remove()
		}
	}
}

const Ln = '_$DX_DELEGATE'

function No(e, t, n, r = {}) {
	let o
	return (
		Qe((i) => {
			;(o = i),
				t === document ? e() : H(t, e(), t.firstChild ? null : void 0, n)
		}, r.owner),
		() => {
			o(), (t.textContent = '')
		}
	)
}

function Z(e, t, n) {
	let r
	const o = () => {
			const s = document.createElement('template')
			return (
				(s.innerHTML = e),
				n ? s.content.firstChild.firstChild : s.content.firstChild
			)
		},
		i = t
			? () => (r || (r = o())).cloneNode(!0)
			: () => K(() => document.importNode(r || (r = o()), !0))
	return (i.cloneNode = i), i
}

function wr(e, t = window.document) {
	const n = t[Ln] || (t[Ln] = new Set())
	for (let r = 0, o = e.length; r < o; r++) {
		const i = e[r]
		n.has(i) || (n.add(i), t.addEventListener(i, Bo))
	}
}

function Jt(e, t, n) {
	n == null ? e.removeAttribute(t) : e.setAttribute(t, n)
}

function _o(e, t, n, r) {
	r == null ? e.removeAttributeNS(t, n) : e.setAttributeNS(t, n, r)
}

function pe(e, t) {
	t == null ? e.removeAttribute('class') : (e.className = t)
}

function Mo(e, t, n, r) {
	if (r)
		Array.isArray(n)
			? ((e[`$$${t}`] = n[0]), (e[`$$${t}Data`] = n[1]))
			: (e[`$$${t}`] = n)
	else if (Array.isArray(n)) {
		const o = n[0]
		e.addEventListener(t, (n[0] = (i) => o.call(e, n[1], i)))
	} else e.addEventListener(t, n)
}

function Vo(e, t, n = {}) {
	const r = Object.keys(t || {}),
		o = Object.keys(n)
	let i, s
	for (i = 0, s = o.length; i < s; i++) {
		const a = o[i]
		!a || a === 'undefined' || t[a] || (Tn(e, a, !1), delete n[a])
	}
	for (i = 0, s = r.length; i < s; i++) {
		const a = r[i],
			l = !!t[a]
		!a || a === 'undefined' || n[a] === l || !l || (Tn(e, a, !0), (n[a] = l))
	}
	return n
}

function zo(e, t, n) {
	if (!t) return n ? Jt(e, 'style') : t
	const r = e.style
	if (typeof t == 'string') return (r.cssText = t)
	typeof n == 'string' && (r.cssText = n = void 0),
		n || (n = {}),
		t || (t = {})
	let o, i
	for (i in n) t[i] == null && r.removeProperty(i), delete n[i]
	for (i in t) (o = t[i]), o !== n[i] && (r.setProperty(i, o), (n[i] = o))
	return n
}

function ce(e, t = {}, n, r) {
	const o = {}
	return (
		r || Q(() => (o.children = je(e, t.children, o.children))),
		Q(() => t.ref && t.ref(e)),
		Q(() => Fo(e, t, n, !0, o, !0)),
		o
	)
}

function xr(e, t, n) {
	return K(() => e(t, n))
}

function H(e, t, n, r) {
	if ((n !== void 0 && !r && (r = []), typeof t != 'function'))
		return je(e, t, r, n)
	Q((o) => je(e, t(), o, n), r)
}

function Fo(e, t, n, r, o = {}, i = !1) {
	t || (t = {})
	for (const s in o)
		if (!(s in t)) {
			if (s === 'children') continue
			o[s] = $n(e, s, null, o[s], n, i)
		}
	for (const s in t) {
		if (s === 'children') {
			r || je(e, t.children)
			continue
		}
		const a = t[s]
		o[s] = $n(e, s, a, o[s], n, i)
	}
}

function jo(e) {
	return e.toLowerCase().replace(/-([a-z])/g, (t, n) => n.toUpperCase())
}

function Tn(e, t, n) {
	const r = t.trim().split(/\s+/)
	for (let o = 0, i = r.length; o < i; o++) e.classList.toggle(r[o], n)
}

function $n(e, t, n, r, o, i) {
	let s, a, l, c, u
	if (t === 'style') return zo(e, n, r)
	if (t === 'classList') return Vo(e, n, r)
	if (n === r) return r
	if (t === 'ref') i || n(e)
	else if (t.slice(0, 3) === 'on:') {
		const d = t.slice(3)
		r && e.removeEventListener(d, r), n && e.addEventListener(d, n)
	} else if (t.slice(0, 10) === 'oncapture:') {
		const d = t.slice(10)
		r && e.removeEventListener(d, r, !0), n && e.addEventListener(d, n, !0)
	} else if (t.slice(0, 2) === 'on') {
		const d = t.slice(2).toLowerCase(),
			f = $o.has(d)
		if (!f && r) {
			const p = Array.isArray(r) ? r[0] : r
			e.removeEventListener(d, p)
		}
		;(f || n) && (Mo(e, d, n, f), f && wr([d]))
	} else if (t.slice(0, 5) === 'attr:') Jt(e, t.slice(5), n)
	else if (
		(u = t.slice(0, 5) === 'prop:') ||
		(l = Po.has(t)) ||
		(!o && ((c = To(t, e.tagName)) || (a = So.has(t)))) ||
		(s = e.nodeName.includes('-'))
	)
		u && ((t = t.slice(5)), (a = !0)),
			t === 'class' || t === 'className'
				? pe(e, n)
				: s && !a && !l
				? (e[jo(t)] = n)
				: (e[c || t] = n)
	else {
		const d = o && t.indexOf(':') > -1 && ko[t.split(':')[0]]
		d ? _o(e, d, t, n) : Jt(e, Io[t] || t, n)
	}
	return n
}

function Bo(e) {
	const t = `$$${e.type}`
	let n = (e.composedPath && e.composedPath()[0]) || e.target
	for (
		e.target !== n &&
			Object.defineProperty(e, 'target', { configurable: !0, value: n }),
			Object.defineProperty(e, 'currentTarget', {
				configurable: !0,
				get() {
					return n || document
				},
			});
		n;

	) {
		const r = n[t]
		if (r && !n.disabled) {
			const o = n[`${t}Data`]
			if ((o !== void 0 ? r.call(n, o, e) : r.call(n, e), e.cancelBubble))
				return
		}
		n = n._$host || n.parentNode || n.host
	}
}

function je(e, t, n, r, o) {
	for (; typeof n == 'function'; ) n = n()
	if (t === n) return n
	const i = typeof t,
		s = r !== void 0
	if (
		((e = (s && n[0] && n[0].parentNode) || e),
		i === 'string' || i === 'number')
	)
		if ((i === 'number' && (t = t.toString()), s)) {
			let a = n[0]
			a && a.nodeType === 3
				? (a.data = t)
				: (a = document.createTextNode(t)),
				(n = _e(e, n, r, a))
		} else
			n !== '' && typeof n == 'string'
				? (n = e.firstChild.data = t)
				: (n = e.textContent = t)
	else if (t == null || i === 'boolean') n = _e(e, n, r)
	else {
		if (i === 'function')
			return (
				Q(() => {
					let a = t()
					for (; typeof a == 'function'; ) a = a()
					n = je(e, a, n, r)
				}),
				() => n
			)
		if (Array.isArray(t)) {
			const a = [],
				l = n && Array.isArray(n)
			if (Qt(a, t, n, o)) return Q(() => (n = je(e, a, n, r, !0))), () => n
			if (a.length === 0) {
				if (((n = _e(e, n, r)), s)) return n
			} else
				l
					? n.length === 0
						? Rn(e, a, r)
						: Do(e, n, a)
					: (n && _e(e), Rn(e, a))
			n = a
		} else if (t instanceof Node) {
			if (Array.isArray(n)) {
				if (s) return (n = _e(e, n, r, t))
				_e(e, n, null, t)
			} else
				n == null || n === '' || !e.firstChild
					? e.appendChild(t)
					: e.replaceChild(t, e.firstChild)
			n = t
		} else console.warn('Unrecognized value. Skipped inserting', t)
	}
	return n
}

function Qt(e, t, n, r) {
	let o = !1
	for (let i = 0, s = t.length; i < s; i++) {
		let a = t[i],
			l = n && n[i]
		if (a instanceof Node) e.push(a)
		else if (!(a == null || a === !0 || a === !1))
			if (Array.isArray(a)) o = Qt(e, a, l) || o
			else if (typeof a == 'function')
				if (r) {
					for (; typeof a == 'function'; ) a = a()
					o =
						Qt(
							e,
							Array.isArray(a) ? a : [a],
							Array.isArray(l) ? l : [l],
						) || o
				} else e.push(a), (o = !0)
			else {
				const c = String(a)
				l && l.nodeType === 3
					? ((l.data = c), e.push(l))
					: e.push(document.createTextNode(c))
			}
	}
	return o
}

function Rn(e, t, n = null) {
	for (let r = 0, o = t.length; r < o; r++) e.insertBefore(t[r], n)
}

function _e(e, t, n, r) {
	if (n === void 0) return (e.textContent = '')
	const o = r || document.createTextNode('')
	if (t.length) {
		let i = !1
		for (let s = t.length - 1; s >= 0; s--) {
			const a = t[s]
			if (o !== a) {
				const l = a.parentNode === e
				!i && !s
					? l
						? e.replaceChild(o, a)
						: e.insertBefore(o, n)
					: l && a.remove()
			} else i = !0
		}
	} else e.insertBefore(o, n)
	return [o]
}

const Wo = !1,
	Ho = 'http://www.w3.org/2000/svg'

function Go(e, t = !1) {
	return t ? document.createElementNS(Ho, e) : document.createElement(e)
}

function Er(e) {
	const [t, n] = vr(e, ['component']),
		r = M(() => t.component)
	return M(() => {
		const o = r()
		switch (typeof o) {
			case 'function':
				return Object.assign(o, { [co]: !0 }), K(() => o(n))
			case 'string':
				const i = Ro.has(o),
					s = Go(o, i)
				return ce(s, n, i), s
		}
	})
}

const Uo = (e) => {
		const t = (i) =>
				typeof window < 'u' ? window.matchMedia(i).matches : !1,
			[n, r] = J(t(e))

		function o() {
			r(t(e))
		}

		return (
			ot(() => {
				const i = window.matchMedia(e)
				return (
					o(),
					i.addListener
						? i.addListener(o)
						: i.addEventListener('change', o),
					() => {
						i.removeListener
							? i.removeListener(o)
							: i.removeEventListener('change', o)
					}
				)
			}),
			n
		)
	},
	Ko = {
		sm: '640px',
		md: '768px',
		lg: '1024px',
		xl: '1280px',
		'2xl': '1536px',
	},
	qo = (e) => Uo(`(min-width: ${Ko[e]})`)
let Xo = { data: '' },
	Zo = (e) =>
		typeof window == 'object'
			? (
					(e ? e.querySelector('#_goober') : window._goober) ||
					Object.assign(
						(e || document.head).appendChild(
							document.createElement('style'),
						),
						{ innerHTML: ' ', id: '_goober' },
					)
			  ).firstChild
			: e || Xo,
	Yo = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,
	Jo = /\/\*[^]*?\*\/|  +/g,
	kn = /\n+/g,
	Te = (e, t) => {
		let n = '',
			r = '',
			o = ''
		for (let i in e) {
			let s = e[i]
			i[0] == '@'
				? i[1] == 'i'
					? (n = i + ' ' + s + ';')
					: (r +=
							i[1] == 'f'
								? Te(s, i)
								: i + '{' + Te(s, i[1] == 'k' ? '' : t) + '}')
				: typeof s == 'object'
				? (r += Te(
						s,
						t
							? t.replace(/([^,])+/g, (a) =>
									i.replace(/(^:.*)|([^,])+/g, (l) =>
										/&/.test(l)
											? l.replace(/&/g, a)
											: a
											? a + ' ' + l
											: l,
									),
							  )
							: i,
				  ))
				: s != null &&
				  ((i = /^--/.test(i)
						? i
						: i.replace(/[A-Z]/g, '-$&').toLowerCase()),
				  (o += Te.p ? Te.p(i, s) : i + ':' + s + ';'))
		}
		return n + (t && o ? t + '{' + o + '}' : o) + r
	},
	le = {},
	Or = (e) => {
		if (typeof e == 'object') {
			let t = ''
			for (let n in e) t += n + Or(e[n])
			return t
		}
		return e
	},
	Qo = (e, t, n, r, o) => {
		let i = Or(e),
			s =
				le[i] ||
				(le[i] = ((l) => {
					let c = 0,
						u = 11
					for (; c < l.length; ) u = (101 * u + l.charCodeAt(c++)) >>> 0
					return 'go' + u
				})(i))
		if (!le[s]) {
			let l =
				i !== e
					? e
					: ((c) => {
							let u,
								d,
								f = [{}]
							for (; (u = Yo.exec(c.replace(Jo, ''))); )
								u[4]
									? f.shift()
									: u[3]
									? ((d = u[3].replace(kn, ' ').trim()),
									  f.unshift((f[0][d] = f[0][d] || {})))
									: (f[0][u[1]] = u[2].replace(kn, ' ').trim())
							return f[0]
					  })(e)
			le[s] = Te(o ? { ['@keyframes ' + s]: l } : l, n ? '' : '.' + s)
		}
		let a = n && le.g ? le.g : null
		return (
			n && (le.g = le[s]),
			((l, c, u, d) => {
				d
					? (c.data = c.data.replace(d, l))
					: c.data.indexOf(l) === -1 &&
					  (c.data = u ? l + c.data : c.data + l)
			})(le[s], t, r, a),
			s
		)
	},
	ei = (e, t, n) =>
		e.reduce((r, o, i) => {
			let s = t[i]
			if (s && s.call) {
				let a = s(n),
					l = (a && a.props && a.props.className) || (/^go/.test(a) && a)
				s = l
					? '.' + l
					: a && typeof a == 'object'
					? a.props
						? ''
						: Te(a, '')
					: a === !1
					? ''
					: a
			}
			return r + o + (s ?? '')
		}, '')

function Ct(e) {
	let t = this || {},
		n = e.call ? e(t.p) : e
	return Qo(
		n.unshift
			? n.raw
				? ei(n, [].slice.call(arguments, 1), t.p)
				: n.reduce((r, o) => Object.assign(r, o && o.call ? o(t.p) : o), {})
			: n,
		Zo(t.target),
		t.g,
		t.o,
		t.k,
	)
}

Ct.bind({ g: 1 })
Ct.bind({ k: 1 })
const ti = gn()

function ni(e) {
	let t = this || {}
	return (...n) => {
		const r = (o) => {
			const i = Dt(ti),
				s = ne(o, { theme: i }),
				a = ne(s, {
					get class() {
						const p = s.class,
							m = 'class' in s && /^go[0-9]+/.test(p)
						let h = Ct.apply({ target: t.target, o: m, p: s, g: t.g }, n)
						return [p, h].filter(Boolean).join(' ')
					},
				}),
				[l, c] = vr(a, ['as', 'theme']),
				u = c,
				d = l.as || e
			let f
			return (
				typeof d == 'function'
					? (f = d(u))
					: t.g == 1
					? ((f = document.createElement(d)), ce(f, u))
					: (f = Er(ne({ component: d }, u))),
				f
			)
		}
		return (
			(r.class = (o) =>
				K(() => Ct.apply({ target: t.target, p: o, g: t.g }, n))),
			r
		)
	}
}

const ri = new Proxy(ni, {
		get(e, t) {
			return e(t)
		},
	}),
	oi = ri(Er),
	en = oi((e) => {
		if (e.class?.includes('leading'))
			throw new Error('Capped component cannot have leading class')
		const t = e.lineHeight || 1.5
		return {
			lineHeight: t,
			'&:before': {
				content: "''",
				marginBottom: `${-t / 2 + 0.5 - 0.135}em`,
				display: 'table',
			},
			'&:after': {
				content: "''",
				marginTop: `${-t / 2 + 0.5 - 0.16}em`,
				display: 'table',
			},
		}
	}),
	ii = Z('<sup class="font-black text-gray-500">'),
	si = Z('<div class="flex flex-col gap-12 mt-12">'),
	F = ({ number: e }) =>
		(() => {
			const t = ii()
			return H(t, e), t
		})(),
	ai = () => {
		const e = qo('sm')
		return (() => {
			const t = si()
			return (
				H(
					t,
					L(en, {
						component: 'h1',
						class: 'text-3xl font-black',
						lineHeight: 1.5,
						children: 'Geneza 1',
					}),
					null,
				),
				H(
					t,
					L(en, {
						component: 'p',
						class: 'text:md sm:text-lg',
						get lineHeight() {
							return e() ? 2.25 : 2
						},
						get children() {
							return [
								L(F, { number: 1 }),
								' La început, Dumnezeu a făcut cerurile și pământul. ',
								L(F, { number: 2 }),
								' ',
								'Pământul era pustiu și gol; peste fața adâncului de ape era întuneric, și Duhul lui Dumnezeu Se mișca pe deasupra apelor. ',
								L(F, { number: 3 }),
								' Dumnezeu a zis: „Să fie lumină!” Și a fost lumină.',
								' ',
								L(F, { number: 4 }),
								' Dumnezeu a văzut că lumina era bună și Dumnezeu a despărțit lumina de întuneric. ',
								L(F, { number: 5 }),
								' Dumnezeu a numit lumina zi, iar întunericul l-a numit noapte. Astfel, a fost o seară și apoi a fost o dimineață: aceasta a fost ziua întâi. ',
								L(F, { number: 6 }),
								' ',
								'Dumnezeu a zis: „Să fie o întindere între ape și ea să despartă apele de ape.”',
								' ',
								L(F, { number: 7 }),
								' Și Dumnezeu a făcut întinderea, și ea a despărțit apele care sunt dedesubtul întinderii de apele care sunt deasupra întinderii. Și așa a fost.',
								L(F, { number: 8 }),
								' Dumnezeu a numit întinderea cer. Astfel, a fost o seară și apoi a fost o dimineață: aceasta a fost ziua a doua. ',
								L(F, { number: 9 }),
								' Dumnezeu a zis: „Să se strângă la un loc apele care sunt dedesubtul cerului și să se arate uscatul!” Și așa a fost.',
								' ',
								L(F, { number: 10 }),
								' Dumnezeu a numit uscatul pământ, iar grămada de ape a numit-o mări. Dumnezeu a văzut că lucrul acesta era bun. ',
								L(F, { number: 11 }),
								' Apoi Dumnezeu a zis: „Să dea pământul verdeață, iarbă cu sămânță, pomi roditori, care să facă rod după soiul lor și care să aibă în ei sămânța lor pe pământ.” Și așa a fost. ',
								L(F, { number: 12 }),
								' Pământul a dat verdeață, iarbă cu sămânță după soiul ei și pomi care fac rod și care își au sămânța în ei, după soiul lor. Dumnezeu a văzut că lucrul acesta era bun. ',
								L(F, { number: 13 }),
								' Astfel, a fost o seară și apoi a fost o dimineață: aceasta a fost ziua a treia. ',
								L(F, { number: 14 }),
								' Dumnezeu a zis: „Să fie niște luminători în întinderea cerului, ca să despartă ziua de noapte; ei să fie niște semne care să arate vremurile, zilele și anii ',
								L(F, { number: 15 }),
								' și să slujească de luminători în întinderea cerului, ca să lumineze pământul.” Și așa a fost. ',
								L(F, { number: 16 }),
								' Dumnezeu a făcut cei doi mari luminători, și anume: luminătorul cel mai mare, ca să stăpânească ziua, și luminătorul cel mai mic, ca să stăpânească noaptea; a făcut și stelele. ',
								L(F, { number: 17 }),
								' Dumnezeu i-a așezat în întinderea cerului, ca să lumineze pământul, ',
								L(F, { number: 18 }),
								' să stăpânească ziua și noaptea și să despartă lumina de întuneric. Dumnezeu a văzut că lucrul acesta era bun. ',
								L(F, { number: 19 }),
								' Astfel, a fost o seară și apoi a fost o dimineață: aceasta a fost ziua a patra.',
							]
						},
					}),
					null,
				),
				t
			)
		})()
	}

function li(e, t, n) {
	return e.addEventListener(t, n), () => e.removeEventListener(t, n)
}

function ci([e, t], n, r) {
	return [n ? () => n(e()) : e, r ? (o) => t(r(o)) : t]
}

function ui(e) {
	try {
		return document.querySelector(e)
	} catch {
		return null
	}
}

function fi(e, t) {
	const n = ui(`#${e}`)
	n ? n.scrollIntoView() : t && window.scrollTo(0, 0)
}

function di(e, t, n, r) {
	let o = !1
	const i = (a) => (typeof a == 'string' ? { value: a } : a),
		s = ci(
			J(i(e()), { equals: (a, l) => a.value === l.value }),
			void 0,
			(a) => (!o && t(a), a),
		)
	return (
		n &&
			ct(
				n((a = e()) => {
					;(o = !0), s[1](i(a)), (o = !1)
				}),
			),
		{ signal: s, utils: r }
	)
}

function pi(e) {
	if (e) {
		if (Array.isArray(e)) return { signal: e }
	} else return { signal: J({ value: '' }) }
	return e
}

function hi() {
	return di(
		() => ({
			value:
				window.location.pathname +
				window.location.search +
				window.location.hash,
			state: history.state,
		}),
		({ value: e, replace: t, scroll: n, state: r }) => {
			t
				? window.history.replaceState(r, '', e)
				: window.history.pushState(r, '', e),
				fi(window.location.hash.slice(1), n)
		},
		(e) => li(window, 'popstate', () => e()),
		{ go: (e) => window.history.go(e) },
	)
}

function gi() {
	let e = new Set()

	function t(o) {
		return e.add(o), () => e.delete(o)
	}

	let n = !1

	function r(o, i) {
		if (n) return !(n = !1)
		const s = {
			to: o,
			options: i,
			defaultPrevented: !1,
			preventDefault: () => (s.defaultPrevented = !0),
		}
		for (const a of e)
			a.listener({
				...s,
				from: a.location,
				retry: (l) => {
					l && (n = !0), a.navigate(o, i)
				},
			})
		return !s.defaultPrevented
	}

	return { subscribe: t, confirm: r }
}

const mi = /^(?:[a-z0-9]+:)?\/\//i,
	bi = /^\/+|(\/)\/+$/g

function et(e, t = !1) {
	const n = e.replace(bi, '$1')
	return n ? (t || /^[?#]/.test(n) ? n : '/' + n) : ''
}

function yt(e, t, n) {
	if (mi.test(t)) return
	const r = et(e),
		o = n && et(n)
	let i = ''
	return (
		!o || t.startsWith('/')
			? (i = r)
			: o.toLowerCase().indexOf(r.toLowerCase()) !== 0
			? (i = r + o)
			: (i = o),
		(i || '/') + et(t, !i)
	)
}

function yi(e, t) {
	if (e == null) throw new Error(t)
	return e
}

function Cr(e, t) {
	return et(e).replace(/\/*(\*.*)?$/g, '') + et(t)
}

function vi(e) {
	const t = {}
	return (
		e.searchParams.forEach((n, r) => {
			t[r] = n
		}),
		t
	)
}

function wi(e, t, n) {
	const [r, o] = e.split('/*', 2),
		i = r.split('/').filter(Boolean),
		s = i.length
	return (a) => {
		const l = a.split('/').filter(Boolean),
			c = l.length - s
		if (c < 0 || (c > 0 && o === void 0 && !t)) return null
		const u = { path: s ? '' : '/', params: {} },
			d = (f) => (n === void 0 ? void 0 : n[f])
		for (let f = 0; f < s; f++) {
			const p = i[f],
				m = l[f],
				h = p[0] === ':',
				g = h ? p.slice(1) : p
			if (h && jt(m, d(g))) u.params[g] = m
			else if (h || !jt(m, p)) return null
			u.path += `/${m}`
		}
		if (o) {
			const f = c ? l.slice(-c).join('/') : ''
			if (jt(f, d(o))) u.params[o] = f
			else return null
		}
		return u
	}
}

function jt(e, t) {
	const n = (r) => r.localeCompare(e, void 0, { sensitivity: 'base' }) === 0
	return t === void 0
		? !0
		: typeof t == 'string'
		? n(t)
		: typeof t == 'function'
		? t(e)
		: Array.isArray(t)
		? t.some(n)
		: t instanceof RegExp
		? t.test(e)
		: !1
}

function xi(e) {
	const [t, n] = e.pattern.split('/*', 2),
		r = t.split('/').filter(Boolean)
	return r.reduce(
		(o, i) => o + (i.startsWith(':') ? 2 : 3),
		r.length - (n === void 0 ? 0 : 1),
	)
}

function Ar(e) {
	const t = new Map(),
		n = fo()
	return new Proxy(
		{},
		{
			get(r, o) {
				return (
					t.has(o) ||
						po(n, () =>
							t.set(
								o,
								M(() => e()[o]),
							),
						),
					t.get(o)()
				)
			},
			getOwnPropertyDescriptor() {
				return { enumerable: !0, configurable: !0 }
			},
			ownKeys() {
				return Reflect.ownKeys(e())
			},
		},
	)
}

function Sr(e) {
	let t = /(\/?\:[^\/]+)\?/.exec(e)
	if (!t) return [e]
	let n = e.slice(0, t.index),
		r = e.slice(t.index + t[0].length)
	const o = [n, (n += t[1])]
	for (; (t = /^(\/\:[^\/]+)\?/.exec(r)); )
		o.push((n += t[1])), (r = r.slice(t[0].length))
	return Sr(r).reduce((i, s) => [...i, ...o.map((a) => a + s)], [])
}

const Ei = 100,
	Pr = gn(),
	_t = gn(),
	Ir = () => yi(Dt(Pr), 'Make sure your app is wrapped in a <Router />')
let it
const Lr = () => it || Dt(_t) || Ir().base

function Oi(e, t = '', n) {
	const { component: r, data: o, children: i } = e,
		s = !i || (Array.isArray(i) && !i.length),
		a = {
			key: e,
			element: r
				? () => L(r, {})
				: () => {
						const { element: l } = e
						return l === void 0 && n ? L(n, {}) : l
				  },
			preload: e.component ? r.preload : e.preload,
			data: o,
		}
	return Tr(e.path).reduce((l, c) => {
		for (const u of Sr(c)) {
			const d = Cr(t, u),
				f = s ? d : d.split('/*', 1)[0]
			l.push({
				...a,
				originalPath: u,
				pattern: f,
				matcher: wi(f, !s, e.matchFilters),
			})
		}
		return l
	}, [])
}

function Ci(e, t = 0) {
	return {
		routes: e,
		score: xi(e[e.length - 1]) * 1e4 - t,
		matcher(n) {
			const r = []
			for (let o = e.length - 1; o >= 0; o--) {
				const i = e[o],
					s = i.matcher(n)
				if (!s) return null
				r.unshift({ ...s, route: i })
			}
			return r
		},
	}
}

function Tr(e) {
	return Array.isArray(e) ? e : [e]
}

function $r(e, t = '', n, r = [], o = []) {
	const i = Tr(e)
	for (let s = 0, a = i.length; s < a; s++) {
		const l = i[s]
		if (l && typeof l == 'object' && l.hasOwnProperty('path')) {
			const c = Oi(l, t, n)
			for (const u of c) {
				r.push(u)
				const d = Array.isArray(l.children) && l.children.length === 0
				if (l.children && !d) $r(l.children, u.pattern, n, r, o)
				else {
					const f = Ci([...r], o.length)
					o.push(f)
				}
				r.pop()
			}
		}
	}
	return r.length ? o : o.sort((s, a) => a.score - s.score)
}

function Ai(e, t) {
	for (let n = 0, r = e.length; n < r; n++) {
		const o = e[n].matcher(t)
		if (o) return o
	}
	return []
}

function Si(e, t) {
	const n = new URL('http://sar'),
		r = M(
			(l) => {
				const c = e()
				try {
					return new URL(c, n)
				} catch {
					return console.error(`Invalid path ${c}`), l
				}
			},
			n,
			{ equals: (l, c) => l.href === c.href },
		),
		o = M(() => r().pathname),
		i = M(() => r().search, !0),
		s = M(() => r().hash),
		a = M(() => '')
	return {
		get pathname() {
			return o()
		},
		get search() {
			return i()
		},
		get hash() {
			return s()
		},
		get state() {
			return t()
		},
		get key() {
			return a()
		},
		query: Ar(dr(i, () => vi(r()))),
	}
}

function Pi(e, t = '', n, r) {
	const {
			signal: [o, i],
			utils: s = {},
		} = pi(e),
		a = s.parsePath || ((w) => w),
		l = s.renderPath || ((w) => w),
		c = s.beforeLeave || gi(),
		u = yt('', t),
		d = void 0
	if (u === void 0) throw new Error(`${u} is not a valid base path`)
	u && !o().value && i({ value: u, replace: !0, scroll: !1 })
	const [f, p] = J(!1),
		m = async (w) => {
			p(!0)
			try {
				await ho(w)
			} finally {
				p(!1)
			}
		},
		[h, g] = J(o().value),
		[b, v] = J(o().state),
		O = Si(h, b),
		C = [],
		A = {
			pattern: u,
			params: {},
			path: () => u,
			outlet: () => null,
			resolvePath(w) {
				return yt(u, w)
			},
		}
	if (n)
		try {
			;(it = A),
				(A.data = n({
					data: void 0,
					params: {},
					location: O,
					navigate: k(A),
				}))
		} finally {
			it = void 0
		}

	function S(w, y, P) {
		K(() => {
			if (typeof y == 'number') {
				y &&
					(s.go
						? c.confirm(y, P) && s.go(y)
						: console.warn(
								'Router integration does not support relative routing',
						  ))
				return
			}
			const {
					replace: _,
					resolve: V,
					scroll: $,
					state: T,
				} = { replace: !1, resolve: !0, scroll: !0, ...P },
				j = V ? w.resolvePath(y) : yt('', y)
			if (j === void 0) throw new Error(`Path '${y}' is not a routable path`)
			if (C.length >= Ei) throw new Error('Too many redirects')
			const U = h()
			if ((j !== U || T !== b()) && !Wo) {
				if (c.confirm(j, P)) {
					const Ne = C.push({
						value: U,
						replace: _,
						scroll: $,
						state: b(),
					})
					m(() => {
						g(j), v(T)
					}).then(() => {
						C.length === Ne && B({ value: j, state: T })
					})
				}
			}
		})
	}

	function k(w) {
		return (w = w || Dt(_t) || A), (y, P) => S(w, y, P)
	}

	function B(w) {
		const y = C[0]
		y &&
			((w.value !== y.value || w.state !== y.state) &&
				i({ ...w, replace: y.replace, scroll: y.scroll }),
			(C.length = 0))
	}

	Q(() => {
		const { value: w, state: y } = o()
		K(() => {
			w !== h() &&
				m(() => {
					g(w), v(y)
				})
		})
	})
	{
		let w = function (y) {
			if (
				y.defaultPrevented ||
				y.button !== 0 ||
				y.metaKey ||
				y.altKey ||
				y.ctrlKey ||
				y.shiftKey
			)
				return
			const P = y
				.composedPath()
				.find((U) => U instanceof Node && U.nodeName.toUpperCase() === 'A')
			if (!P || !P.hasAttribute('link')) return
			const _ = P.href
			if (P.target || (!_ && !P.hasAttribute('state'))) return
			const V = (P.getAttribute('rel') || '').split(/\s+/)
			if (P.hasAttribute('download') || (V && V.includes('external'))) return
			const $ = new URL(_)
			if (
				$.origin !== window.location.origin ||
				(u &&
					$.pathname &&
					!$.pathname.toLowerCase().startsWith(u.toLowerCase()))
			)
				return
			const T = a($.pathname + $.search + $.hash),
				j = P.getAttribute('state')
			y.preventDefault(),
				S(A, T, {
					resolve: !1,
					replace: P.hasAttribute('replace'),
					scroll: !P.hasAttribute('noscroll'),
					state: j && JSON.parse(j),
				})
		}
		var I = w
		wr(['click']),
			document.addEventListener('click', w),
			ct(() => document.removeEventListener('click', w))
	}
	return {
		base: A,
		out: d,
		location: O,
		isRouting: f,
		renderPath: l,
		parsePath: a,
		navigatorFactory: k,
		beforeLeave: c,
	}
}

function Ii(e, t, n, r, o) {
	const { base: i, location: s, navigatorFactory: a } = e,
		{ pattern: l, element: c, preload: u, data: d } = r().route,
		f = M(() => r().path)
	u && u()
	const p = {
		parent: t,
		pattern: l,
		get child() {
			return n()
		},
		path: f,
		params: o,
		data: t.data,
		outlet: c,
		resolvePath(m) {
			return yt(i.path(), m, f())
		},
	}
	if (d)
		try {
			;(it = p),
				(p.data = d({
					data: t.data,
					params: o,
					location: s,
					navigate: a(p),
				}))
		} finally {
			it = void 0
		}
	return p
}

const Li = (e) => {
		const { source: t, url: n, base: r, data: o, out: i } = e,
			s = t || hi(),
			a = Pi(s, r, o)
		return L(Pr.Provider, {
			value: a,
			get children() {
				return e.children
			},
		})
	},
	Ti = (e) => {
		const t = Ir(),
			n = Lr(),
			r = mn(() => e.children),
			o = M(() => $r(r(), Cr(n.pattern, e.base || ''), Ri)),
			i = M(() => Ai(o(), t.location.pathname)),
			s = Ar(() => {
				const u = i(),
					d = {}
				for (let f = 0; f < u.length; f++) Object.assign(d, u[f].params)
				return d
			})
		t.out &&
			t.out.matches.push(
				i().map(({ route: u, path: d, params: f }) => ({
					originalPath: u.originalPath,
					pattern: u.pattern,
					path: d,
					params: f,
				})),
			)
		const a = []
		let l
		const c = M(
			dr(i, (u, d, f) => {
				let p = d && u.length === d.length
				const m = []
				for (let h = 0, g = u.length; h < g; h++) {
					const b = d && d[h],
						v = u[h]
					f && b && v.route.key === b.route.key
						? (m[h] = f[h])
						: ((p = !1),
						  a[h] && a[h](),
						  Qe((O) => {
								;(a[h] = O),
									(m[h] = Ii(
										t,
										m[h - 1] || n,
										() => c()[h + 1],
										() => i()[h],
										s,
									))
						  }))
				}
				return (
					a.splice(u.length).forEach((h) => h()),
					f && p ? f : ((l = m[0]), m)
				)
			}),
		)
		return L(vn, {
			get when() {
				return c() && l
			},
			keyed: !0,
			children: (u) =>
				L(_t.Provider, {
					value: u,
					get children() {
						return u.outlet()
					},
				}),
		})
	},
	$i = (e) => {
		const t = mn(() => e.children)
		return ne(e, {
			get children() {
				return t()
			},
		})
	},
	Ri = () => {
		const e = Lr()
		return L(vn, {
			get when() {
				return e.child
			},
			keyed: !0,
			children: (t) =>
				L(_t.Provider, {
					value: t,
					get children() {
						return t.outlet()
					},
				}),
		})
	}
var ki = /[A-Z]/g,
	Di = /^ms-/,
	Bt = {}

function Ni(e) {
	return '-' + e.toLowerCase()
}

function _i(e) {
	if (Bt.hasOwnProperty(e)) return Bt[e]
	var t = e.replace(ki, Ni)
	return (Bt[e] = Di.test(t) ? '-' + t : t)
}

var Mi = (e) => Array.isArray(e),
	Vi = (e) => !(e == null || typeof e != 'object' || Mi(e)),
	zi = (e) => typeof e == 'number' && !Number.isNaN(e),
	Rr = (e) => typeof e == 'string',
	Fi = (e) => (e.startsWith('--') ? e : _i(e))

function ji(e) {
	let t = {}
	for (const n in e) {
		const r = e[n]
		;(!Rr(r) && !zi(r)) || (t[Fi(n)] = r)
	}
	return t
}

function Bi(e) {
	return new Proxy(
		{},
		{
			get() {
				return e
			},
		},
	)
}

var Dn = {
	onFocus: 'onFocusIn',
	onBlur: 'onFocusOut',
	onDoubleClick: 'onDblClick',
	onChange: 'onInput',
	defaultChecked: 'checked',
	defaultValue: 'value',
	htmlFor: 'for',
	className: 'class',
}

function Wi(e) {
	return e in Dn ? Dn[e] : e
}

var Hi = Bi((e) => {
	const t = {}
	for (const n in e) {
		const r = e[n]
		if (n === 'style' && Vi(r)) {
			t.style = ji(r)
			continue
		}
		if (n === 'children') {
			Rr(r) && (t.textContent = r)
			continue
		}
		t[Wi(n)] = r
	}
	return t
})
const tn = Symbol('store-raw'),
	st = Symbol('store-node')

function kr(e) {
	let t = e[re]
	if (
		!t &&
		(Object.defineProperty(e, re, { value: (t = new Proxy(e, Ki)) }),
		!Array.isArray(e))
	) {
		const n = Object.keys(e),
			r = Object.getOwnPropertyDescriptors(e)
		for (let o = 0, i = n.length; o < i; o++) {
			const s = n[o]
			r[s].get &&
				Object.defineProperty(e, s, {
					enumerable: r[s].enumerable,
					get: r[s].get.bind(t),
				})
		}
	}
	return t
}

function Oe(e) {
	let t
	return (
		e != null &&
		typeof e == 'object' &&
		(e[re] ||
			!(t = Object.getPrototypeOf(e)) ||
			t === Object.prototype ||
			Array.isArray(e))
	)
}

function Be(e, t = new Set()) {
	let n, r, o, i
	if ((n = e != null && e[tn])) return n
	if (!Oe(e) || t.has(e)) return e
	if (Array.isArray(e)) {
		Object.isFrozen(e) ? (e = e.slice(0)) : t.add(e)
		for (let s = 0, a = e.length; s < a; s++)
			(o = e[s]), (r = Be(o, t)) !== o && (e[s] = r)
	} else {
		Object.isFrozen(e) ? (e = Object.assign({}, e)) : t.add(e)
		const s = Object.keys(e),
			a = Object.getOwnPropertyDescriptors(e)
		for (let l = 0, c = s.length; l < c; l++)
			(i = s[l]),
				!a[i].get && ((o = e[i]), (r = Be(o, t)) !== o && (e[i] = r))
	}
	return e
}

function wn(e) {
	let t = e[st]
	return (
		t || Object.defineProperty(e, st, { value: (t = Object.create(null)) }), t
	)
}

function nn(e, t, n) {
	return e[t] || (e[t] = Nr(n))
}

function Gi(e, t) {
	const n = Reflect.getOwnPropertyDescriptor(e, t)
	return (
		!n ||
			n.get ||
			!n.configurable ||
			t === re ||
			t === st ||
			(delete n.value, delete n.writable, (n.get = () => e[re][t])),
		n
	)
}

function Dr(e) {
	if (pr()) {
		const t = wn(e)
		;(t._ || (t._ = Nr()))()
	}
}

function Ui(e) {
	return Dr(e), Reflect.ownKeys(e)
}

function Nr(e) {
	const [t, n] = J(e, { equals: !1, internal: !0 })
	return (t.$ = n), t
}

const Ki = {
	get(e, t, n) {
		if (t === tn) return e
		if (t === re) return n
		if (t === Xt) return Dr(e), n
		const r = wn(e),
			o = r[t]
		let i = o ? o() : e[t]
		if (t === st || t === '__proto__') return i
		if (!o) {
			const s = Object.getOwnPropertyDescriptor(e, t)
			pr() &&
				(typeof i != 'function' || e.hasOwnProperty(t)) &&
				!(s && s.get) &&
				(i = nn(r, t, i)())
		}
		return Oe(i) ? kr(i) : i
	},
	has(e, t) {
		return t === tn || t === re || t === Xt || t === st || t === '__proto__'
			? !0
			: (this.get(e, t, e), t in e)
	},
	set() {
		return !0
	},
	deleteProperty() {
		return !0
	},
	ownKeys: Ui,
	getOwnPropertyDescriptor: Gi,
}

function ee(e, t, n, r = !1) {
	if (!r && e[t] === n) return
	const o = e[t],
		i = e.length
	n === void 0 ? delete e[t] : (e[t] = n)
	let s = wn(e),
		a
	;(a = nn(s, t, o)) && a.$(() => n),
		Array.isArray(e) &&
			e.length !== i &&
			(a = nn(s, 'length', i)) &&
			a.$(e.length),
		(a = s._) && a.$()
}

function _r(e, t) {
	const n = Object.keys(t)
	for (let r = 0; r < n.length; r += 1) {
		const o = n[r]
		ee(e, o, t[o])
	}
}

function qi(e, t) {
	if ((typeof t == 'function' && (t = t(e)), (t = Be(t)), Array.isArray(t))) {
		if (e === t) return
		let n = 0,
			r = t.length
		for (; n < r; n++) {
			const o = t[n]
			e[n] !== o && ee(e, n, o)
		}
		ee(e, 'length', r)
	} else _r(e, t)
}

function Ye(e, t, n = []) {
	let r,
		o = e
	if (t.length > 1) {
		r = t.shift()
		const s = typeof r,
			a = Array.isArray(e)
		if (Array.isArray(r)) {
			for (let l = 0; l < r.length; l++) Ye(e, [r[l]].concat(t), n)
			return
		} else if (a && s === 'function') {
			for (let l = 0; l < e.length; l++)
				r(e[l], l) && Ye(e, [l].concat(t), n)
			return
		} else if (a && s === 'object') {
			const { from: l = 0, to: c = e.length - 1, by: u = 1 } = r
			for (let d = l; d <= c; d += u) Ye(e, [d].concat(t), n)
			return
		} else if (t.length > 1) {
			Ye(e[r], t, [r].concat(n))
			return
		}
		;(o = e[r]), (n = [r].concat(n))
	}
	let i = t[0]
	;(typeof i == 'function' && ((i = i(o, n)), i === o)) ||
		(r === void 0 && i == null) ||
		((i = Be(i)),
		r === void 0 || (Oe(o) && Oe(i) && !Array.isArray(i))
			? _r(o, i)
			: ee(e, r, i))
}

function Xi(...[e, t]) {
	const n = Be(e || {}),
		r = Array.isArray(n),
		o = kr(n)

	function i(...s) {
		uo(() => {
			r && s.length === 1 ? qi(n, s[0]) : Ye(n, s)
		})
	}

	return [o, i]
}

const rn = Symbol('store-root')

function Ve(e, t, n, r, o) {
	const i = t[n]
	if (e === i) return
	if (n !== rn && (!Oe(e) || !Oe(i) || (o && e[o] !== i[o]))) {
		ee(t, n, e)
		return
	}
	if (Array.isArray(e)) {
		if (e.length && i.length && (!r || (o && e[0] && e[0][o] != null))) {
			let l, c, u, d, f, p, m, h
			for (
				u = 0, d = Math.min(i.length, e.length);
				u < d &&
				(i[u] === e[u] || (o && i[u] && e[u] && i[u][o] === e[u][o]));
				u++
			)
				Ve(e[u], i, u, r, o)
			const g = new Array(e.length),
				b = new Map()
			for (
				d = i.length - 1, f = e.length - 1;
				d >= u &&
				f >= u &&
				(i[d] === e[f] || (o && i[u] && e[u] && i[d][o] === e[f][o]));
				d--, f--
			)
				g[f] = i[d]
			if (u > f || u > d) {
				for (c = u; c <= f; c++) ee(i, c, e[c])
				for (; c < e.length; c++) ee(i, c, g[c]), Ve(e[c], i, c, r, o)
				i.length > e.length && ee(i, 'length', e.length)
				return
			}
			for (m = new Array(f + 1), c = f; c >= u; c--)
				(p = e[c]),
					(h = o && p ? p[o] : p),
					(l = b.get(h)),
					(m[c] = l === void 0 ? -1 : l),
					b.set(h, c)
			for (l = u; l <= d; l++)
				(p = i[l]),
					(h = o && p ? p[o] : p),
					(c = b.get(h)),
					c !== void 0 &&
						c !== -1 &&
						((g[c] = i[l]), (c = m[c]), b.set(h, c))
			for (c = u; c < e.length; c++)
				c in g ? (ee(i, c, g[c]), Ve(e[c], i, c, r, o)) : ee(i, c, e[c])
		} else for (let l = 0, c = e.length; l < c; l++) Ve(e[l], i, l, r, o)
		i.length > e.length && ee(i, 'length', e.length)
		return
	}
	const s = Object.keys(e)
	for (let l = 0, c = s.length; l < c; l++) Ve(e[s[l]], i, s[l], r, o)
	const a = Object.keys(i)
	for (let l = 0, c = a.length; l < c; l++)
		e[a[l]] === void 0 && ee(i, a[l], void 0)
}

function Zi(e, t = {}) {
	const { merge: n, key: r = 'id' } = t,
		o = Be(e)
	return (i) => {
		if (!Oe(i) || !Oe(o)) return o
		const s = Ve(o, { [rn]: i }, rn, n, r)
		return s === void 0 ? i : s
	}
}

function Yi(e, t) {
	const { actions: n, state: r, context: o } = t ?? {},
		i = (() => {
			const s = typeof e == 'function' ? e() : e,
				a = typeof o == 'function' ? o() : o
			return a ? s.withContext(a) : s
		})()
	return (
		kt(() => {
			i.start(r),
				i.state.can('SETUP') && i.send('SETUP'),
				ct(() => {
					i.stop()
				})
		}),
		ot(() => {
			const s = typeof o == 'function' ? o() : o
			i.setContext(s)
		}),
		ot(() => {
			i.setOptions({ actions: n })
		}),
		i
	)
}

function Ji(e, t) {
	const n = Yi(e, t),
		[r, o] = Xi(n.getState())
	return (
		kt(() => {
			const i = n.subscribe((s) => {
				o(Zi(s))
			})
			ct(() => {
				i()
			})
		}),
		[r, n.send, n]
	)
}

var Nn = (e, ...t) => (typeof e == 'function' ? e(...t) : e) ?? void 0,
	fe = (e) => e,
	Wt = () => {},
	Qi = (() => {
		let e = 0
		return () => (e++, e.toString(36))
	})()
const es = Symbol(),
	_n = Object.getPrototypeOf,
	on = new WeakMap(),
	ts = (e) =>
		e &&
		(on.has(e)
			? on.get(e)
			: _n(e) === Object.prototype || _n(e) === Array.prototype),
	ns = (e) => (ts(e) && e[es]) || null,
	Mn = (e, t = !0) => {
		on.set(e, t)
	}
var Ht = (e) => typeof e == 'object' && e !== null,
	$e = new WeakMap(),
	Je = new WeakSet(),
	rs = (
		e = Object.is,
		t = (c, u) => new Proxy(c, u),
		n = (c) =>
			Ht(c) &&
			!Je.has(c) &&
			(Array.isArray(c) || !(Symbol.iterator in c)) &&
			!(c instanceof WeakMap) &&
			!(c instanceof WeakSet) &&
			!(c instanceof Error) &&
			!(c instanceof Number) &&
			!(c instanceof Date) &&
			!(c instanceof String) &&
			!(c instanceof RegExp) &&
			!(c instanceof ArrayBuffer),
		r = (c) => {
			switch (c.status) {
				case 'fulfilled':
					return c.value
				case 'rejected':
					throw c.reason
				default:
					throw c
			}
		},
		o = new WeakMap(),
		i = (c, u, d = r) => {
			const f = o.get(c)
			if (f?.[0] === u) return f[1]
			const p = Array.isArray(c)
				? []
				: Object.create(Object.getPrototypeOf(c))
			return (
				Mn(p, !0),
				o.set(c, [u, p]),
				Reflect.ownKeys(c).forEach((m) => {
					const h = Reflect.get(c, m)
					Je.has(h)
						? (Mn(h, !1), (p[m] = h))
						: h instanceof Promise
						? Object.defineProperty(p, m, {
								get() {
									return d(h)
								},
						  })
						: $e.has(h)
						? (p[m] = We(h, d))
						: (p[m] = h)
				}),
				Object.freeze(p)
			)
		},
		s = new WeakMap(),
		a = [1, 1],
		l = (c) => {
			if (!Ht(c)) throw new Error('object required')
			const u = s.get(c)
			if (u) return u
			let d = a[0]
			const f = new Set(),
				p = (I, w = ++a[0]) => {
					d !== w && ((d = w), f.forEach((y) => y(I, w)))
				}
			let m = a[1]
			const h = (I = ++a[1]) => (
					m !== I &&
						!f.size &&
						((m = I),
						b.forEach(([w]) => {
							const y = w[1](I)
							y > d && (d = y)
						})),
					d
				),
				g = (I) => (w, y) => {
					const P = [...w]
					;(P[1] = [I, ...P[1]]), p(P, y)
				},
				b = new Map(),
				v = (I, w) => {
					if (f.size) {
						const y = w[3](g(I))
						b.set(I, [w, y])
					} else b.set(I, [w])
				},
				O = (I) => {
					const w = b.get(I)
					w && (b.delete(I), w[1]?.())
				},
				C = (I) => (
					f.add(I),
					f.size === 1 &&
						b.forEach(([y, P], _) => {
							const V = y[3](g(_))
							b.set(_, [y, V])
						}),
					() => {
						f.delete(I),
							f.size === 0 &&
								b.forEach(([y, P], _) => {
									P && (P(), b.set(_, [y]))
								})
					}
				),
				A = Array.isArray(c) ? [] : Object.create(Object.getPrototypeOf(c)),
				k = t(A, {
					deleteProperty(I, w) {
						const y = Reflect.get(I, w)
						O(w)
						const P = Reflect.deleteProperty(I, w)
						return P && p(['delete', [w], y]), P
					},
					set(I, w, y, P) {
						const _ = Reflect.has(I, w),
							V = Reflect.get(I, w, P)
						if (_ && (e(V, y) || (s.has(y) && e(V, s.get(y))))) return !0
						O(w), Ht(y) && (y = ns(y) || y)
						let $ = y
						if (!Object.getOwnPropertyDescriptor(I, w)?.set)
							if (y instanceof Promise)
								y.then((T) => {
									;(y.status = 'fulfilled'),
										(y.value = T),
										p(['resolve', [w], T])
								}).catch((T) => {
									;(y.status = 'rejected'),
										(y.reason = T),
										p(['reject', [w], T])
								})
							else {
								!$e.has(y) && n(y) && ($ = xn(y))
								const T = !Je.has($) && $e.get($)
								T && v(w, T)
							}
						return Reflect.set(I, w, $, P), p(['set', [w], y, V]), !0
					},
				})
			s.set(c, k)
			const B = [A, h, i, C]
			return (
				$e.set(k, B),
				Reflect.ownKeys(c).forEach((I) => {
					const w = Object.getOwnPropertyDescriptor(c, I)
					w.get || w.set ? Object.defineProperty(A, I, w) : (k[I] = c[I])
				}),
				k
			)
		},
	) => [l, $e, Je, e, t, n, r, o, i, s, a],
	[os] = rs()

function xn(e = {}) {
	return os(e)
}

function sn(e, t, n) {
	const r = $e.get(e)
	let o
	const i = [],
		s = r[3]
	let a = !1
	const c = s((u) => {
		if ((i.push(u), n)) {
			t(i.splice(0))
			return
		}
		o ||
			(o = Promise.resolve().then(() => {
				;(o = void 0), a && t(i.splice(0))
			}))
	})
	return (
		(a = !0),
		() => {
			;(a = !1), c()
		}
	)
}

function We(e, t) {
	const n = $e.get(e),
		[r, o, i] = n
	return i(r, o(), t)
}

function Vn(e) {
	return Je.add(e), e
}

function is(e, t) {
	Object.keys(t).forEach((o) => {
		if (Object.getOwnPropertyDescriptor(e, o))
			throw new Error('object property already defined')
		const i = t[o],
			{ get: s, set: a } = typeof i == 'function' ? { get: i } : i,
			l = {}
		;(l.get = () => s(We(r))),
			a && (l.set = (c) => a(r, c)),
			Object.defineProperty(e, o, l)
	})
	const r = xn(e)
	return r
}

var ss = (e, t) => Object.is(e, t)

function zn(e, t, n, r, o) {
	let i = Reflect.get(We(e), t)
	const s = o || ss

	function a() {
		const l = We(e)
		s(i, l[t]) || (n(l[t]), (i = Reflect.get(l, t)))
	}

	return sn(e, a, r)
}

function as(e) {
	const t = e.computed ?? fe({}),
		n = e.context ?? fe({}),
		r = xn({
			value: e.initial ?? '',
			previousValue: '',
			event: fe({}),
			previousEvent: fe({}),
			context: is(n, t),
			done: !1,
			tags: [],
			hasTag(o) {
				return this.tags.includes(o)
			},
			matches(...o) {
				return o.includes(this.value)
			},
			can(o) {
				return fe(this).nextEvents.includes(o)
			},
			get nextEvents() {
				const o = e.states?.[this.value]?.on ?? {},
					i = e?.on ?? {}
				return Object.keys({ ...o, ...i })
			},
			get changed() {
				return this.event.value === 'machine.init' || !this.previousValue
					? !1
					: this.value !== this.previousValue
			},
		})
	return fe(r)
}

var tt = (e) => Array.isArray(e),
	nt = (e) => !(e == null || typeof e != 'object' || tt(e)),
	ls = (e) => typeof e == 'number' && !Number.isNaN(e),
	se = (e) => typeof e == 'string',
	At = (e) => typeof e == 'function'

function St(e) {
	if (!cs(e) || e === void 0) return e
	const t = Reflect.ownKeys(e).filter((r) => typeof r == 'string'),
		n = {}
	for (const r of t) {
		const o = e[r]
		o !== void 0 && (n[r] = St(o))
	}
	return n
}

var cs = (e) => e && typeof e == 'object' && e.constructor === Object

function Mr(e, ...t) {
	for (const n of t) {
		const r = St(n)
		for (const o in r)
			nt(n[o]) ? (e[o] || (e[o] = {}), Mr(e[o], n[o])) : (e[o] = n[o])
	}
	return e
}

function Gt(...e) {
	const t = e.length === 1 ? e[0] : e[1],
		n = e.length === 2 ? e[0] : !0
}

function vt(...e) {
	const t = e.length === 1 ? e[0] : e[1],
		n = e.length === 2 ? e[0] : !0
}

function dt(e, t) {
	return (n, r) => {
		if (ls(e)) return e
		if (At(e)) return e(n, r)
		if (se(e)) {
			const o = Number.parseFloat(e)
			if (!Number.isNaN(o)) return o
			if (t) {
				const i = t?.[e]
				return (
					vt(
						i == null,
						`[@zag-js/core > determine-delay] Cannot determine delay for \`${e}\`. It doesn't exist in \`options.delays\``,
					),
					At(i) ? i(n, r) : i
				)
			}
		}
	}
}

function Fn(e, t, n) {
	typeof n.value == 'object' && (n.value = ze(n.value)),
		!n.enumerable ||
		n.get ||
		n.set ||
		!n.configurable ||
		!n.writable ||
		t === '__proto__'
			? Object.defineProperty(e, t, n)
			: (e[t] = n.value)
}

function ze(e) {
	if (typeof e != 'object') return e
	var t = 0,
		n,
		r,
		o,
		i = Object.prototype.toString.call(e)
	if (
		(i === '[object Object]'
			? (o = Object.create(e.__proto__ || null))
			: i === '[object Array]'
			? (o = Array(e.length))
			: i === '[object Set]'
			? ((o = new Set()),
			  e.forEach((s) => {
					o.add(ze(s))
			  }))
			: i === '[object Map]'
			? ((o = new Map()),
			  e.forEach((s, a) => {
					o.set(ze(a), ze(s))
			  }))
			: i === '[object Date]'
			? (o = new Date(+e))
			: i === '[object RegExp]'
			? (o = new RegExp(e.source, e.flags))
			: i === '[object DataView]'
			? (o = new e.constructor(ze(e.buffer)))
			: i === '[object ArrayBuffer]'
			? (o = e.slice(0))
			: i.slice(-6) === 'Array]' && (o = new e.constructor(e)),
		o)
	) {
		for (r = Object.getOwnPropertySymbols(e); t < r.length; t++)
			Fn(o, r[t], Object.getOwnPropertyDescriptor(e, r[t]))
		for (t = 0, r = Object.getOwnPropertyNames(e); t < r.length; t++)
			(Object.hasOwnProperty.call(o, (n = r[t])) && o[n] === e[n]) ||
				Fn(o, n, Object.getOwnPropertyDescriptor(e, n))
	}
	return o || e
}

function jn(e) {
	return ze(e)
}

function X(e) {
	return se(e) ? { type: e } : e
}

function ye(e) {
	return e ? (tt(e) ? e.slice() : [e]) : []
}

function Vr(e) {
	return nt(e) && e.predicate != null
}

var us = () => !0

function En(e, t, n, r) {
	return (o) =>
		se(o) ? !!e[o]?.(t, n, r) : At(o) ? o(t, n, r) : o.predicate(e)(t, n, r)
}

function fs(...e) {
	return { predicate: (t) => (n, r, o) => e.map(En(t, n, r, o)).some(Boolean) }
}

function ds(...e) {
	return {
		predicate: (t) => (n, r, o) => e.map(En(t, n, r, o)).every(Boolean),
	}
}

function ps(e) {
	return { predicate: (t) => (n, r, o) => !En(t, n, r, o)(e) }
}

function hs(...e) {
	return (t, n, r) => r.state.matches(...e)
}

var gs = { or: fs, and: ds, not: ps, stateIn: hs }

function zr(e, t) {
	return (
		(e = e ?? us),
		(n, r, o) => {
			if (se(e)) {
				const i = t[e]
				return At(i) ? i(n, r, o) : i
			}
			return Vr(e) ? e.predicate(t)(n, r, o) : e?.(n, r, o)
		}
	)
}

function Ut(e, t) {
	return (n, r, o) => (Vr(e) ? e.predicate(t)(n, r, o) : e)
}

function ms(e) {
	return se(e) ? { target: e } : e
}

function bs(e, t) {
	return (n, r, o) =>
		ye(e)
			.map(ms)
			.find((i) => zr(i.guard, t)(n, r, o) ?? i.target ?? i.actions)
}

var ys = Object.defineProperty,
	vs = (e, t, n) =>
		t in e
			? ys(e, t, {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: n,
			  })
			: (e[t] = n),
	E = (e, t, n) => (vs(e, typeof t != 'symbol' ? t + '' : t, n), n)

function ws(e) {
	for (; e.length > 0; ) e.pop()
	return e
}

var Fr = class {
		constructor(e, t) {
			E(this, 'status', 'Not Started'),
				E(this, 'state'),
				E(this, 'initialState'),
				E(this, 'initialContext'),
				E(this, 'id'),
				E(this, 'type', 'machine'),
				E(this, 'activityEvents', new Map()),
				E(this, 'delayedEvents', new Map()),
				E(this, 'stateListeners', new Set()),
				E(this, 'contextListeners', new Set()),
				E(this, 'eventListeners', new Set()),
				E(this, 'doneListeners', new Set()),
				E(this, 'contextWatchers', new Set()),
				E(this, 'removeStateListener', Wt),
				E(this, 'removeEventListener', Wt),
				E(this, 'removeContextListener', Wt),
				E(this, 'parent'),
				E(this, 'children', new Map()),
				E(this, 'guardMap'),
				E(this, 'actionMap'),
				E(this, 'delayMap'),
				E(this, 'activityMap'),
				E(this, 'sync'),
				E(this, 'options'),
				E(this, 'config'),
				E(this, 'start', (r) => {
					if (((this.state.value = ''), this.status === 'Running'))
						return this
					;(this.status = 'Running'),
						(this.removeStateListener = sn(
							this.state,
							() => {
								this.stateListeners.forEach((c) => {
									c(this.stateSnapshot)
								})
							},
							this.sync,
						)),
						(this.removeEventListener = zn(
							this.state,
							'event',
							(c) => {
								this.executeActions(this.config.onEvent, c),
									this.eventListeners.forEach((u) => {
										u(c)
									})
							},
							this.sync,
						)),
						(this.removeContextListener = sn(
							this.state.context,
							() => {
								this.log('Context:', this.contextSnapshot),
									this.contextListeners.forEach((c) => {
										c(this.contextSnapshot)
									})
							},
							this.sync || this.options.debug,
						)),
						this.setupContextWatchers(),
						this.executeActivities(
							X('machine.start'),
							ye(this.config.activities),
							'machine.start',
						),
						this.executeActions(this.config.entry, X('machine.start'))
					const o = X('machine.init'),
						i = nt(r) ? r.value : r,
						s = nt(r) ? r.context : void 0
					s && this.setContext(s)
					const a = { target: i ?? this.config.initial },
						l = this.getNextStateInfo(a, o)
					return (
						(this.initialState = l),
						this.performStateChangeEffects(this.state.value, l, o),
						this
					)
				}),
				E(this, 'setupContextWatchers', () => {
					for (const [r, o] of Object.entries(this.config.watch ?? {})) {
						const i = this.options.compareFns?.[r],
							s = zn(
								this.state.context,
								r,
								() => {
									this.executeActions(o, this.state.event)
								},
								this.sync,
								i,
							)
						this.contextWatchers.add(s)
					}
				}),
				E(this, 'stop', () => {
					if (this.status !== 'Stopped')
						return (
							this.performExitEffects(
								this.state.value,
								X('machine.stop'),
							),
							this.executeActions(this.config.exit, X('machine.stop')),
							this.setState(''),
							this.setEvent('machine.stop'),
							this.stopStateListeners(),
							this.stopChildren(),
							this.stopActivities(),
							this.stopDelayedEvents(),
							this.stopContextWatchers(),
							this.stopEventListeners(),
							this.stopContextListeners(),
							(this.status = 'Stopped'),
							this
						)
				}),
				E(this, 'stopEventListeners', () => {
					this.eventListeners.clear(), this.removeEventListener()
				}),
				E(this, 'stopContextListeners', () => {
					this.contextListeners.clear(), this.removeContextListener()
				}),
				E(this, 'stopStateListeners', () => {
					this.removeStateListener(), this.stateListeners.clear()
				}),
				E(this, 'stopContextWatchers', () => {
					this.contextWatchers.forEach((r) => r()),
						this.contextWatchers.clear()
				}),
				E(this, 'stopDelayedEvents', () => {
					this.delayedEvents.forEach((r) => {
						r.forEach((o) => o())
					}),
						this.delayedEvents.clear()
				}),
				E(this, 'stopActivities', (r) => {
					r
						? (this.activityEvents.get(r)?.forEach((o) => o()),
						  this.activityEvents.get(r)?.clear(),
						  this.activityEvents.delete(r))
						: (this.activityEvents.forEach((o) => {
								o.forEach((i) => i()), o.clear()
						  }),
						  this.activityEvents.clear())
				}),
				E(this, 'sendChild', (r, o) => {
					const i = X(r),
						s = Nn(o, this.contextSnapshot),
						a = this.children.get(s)
					a ||
						vt(
							`[@zag-js/core] Cannot send '${i.type}' event to unknown child`,
						),
						a.send(i)
				}),
				E(this, 'stopChild', (r) => {
					this.children.has(r) ||
						vt(
							`[@zag-js/core > stop-child] Cannot stop unknown child ${r}`,
						),
						this.children.get(r).stop(),
						this.children.delete(r)
				}),
				E(this, 'removeChild', (r) => {
					this.children.delete(r)
				}),
				E(this, 'stopChildren', () => {
					this.children.forEach((r) => r.stop()), this.children.clear()
				}),
				E(this, 'setParent', (r) => {
					this.parent = r
				}),
				E(this, 'spawn', (r, o) => {
					const i = Nn(r)
					return (
						o && (i.id = o),
						(i.type = 'machine.actor'),
						i.setParent(this),
						this.children.set(i.id, fe(i)),
						i
							.onDone(() => {
								this.removeChild(i.id)
							})
							.start(),
						fe(Vn(i))
					)
				}),
				E(this, 'addActivityCleanup', (r, o) => {
					r &&
						(this.activityEvents.has(r)
							? this.activityEvents.get(r)?.add(o)
							: this.activityEvents.set(r, new Set([o])))
				}),
				E(this, 'setState', (r) => {
					;(this.state.previousValue = this.state.value),
						(this.state.value = r)
					const o = this.getStateNode(r)
					r == null ? ws(this.state.tags) : (this.state.tags = ye(o?.tags))
				}),
				E(this, 'setContext', (r) => {
					r && Mr(this.state.context, r)
				}),
				E(this, 'withContext', (r) => {
					const o = { ...this.config.context, ...St(r) }
					return new Fr({ ...this.config, context: o }, this.options)
				}),
				E(this, 'setOptions', (r) => {
					const o = St(r)
					;(this.actionMap = { ...this.actionMap, ...o.actions }),
						(this.delayMap = { ...this.delayMap, ...o.delays }),
						(this.activityMap = { ...this.activityMap, ...o.activities }),
						(this.guardMap = { ...this.guardMap, ...o.guards })
				}),
				E(this, 'getStateNode', (r) => {
					if (r) return this.config.states?.[r]
				}),
				E(this, 'getNextStateInfo', (r, o) => {
					const i = this.determineTransition(r, o),
						s = !i?.target,
						a = i?.target ?? this.state.value,
						l = this.state.value !== a,
						c = this.getStateNode(a),
						d = {
							reenter: !s && !l && !i?.internal,
							transition: i,
							stateNode: c,
							target: a,
							changed: l,
						}
					return (
						this.log(
							'NextState:',
							`[${o.type}]`,
							this.state.value,
							'---->',
							d.target,
						),
						d
					)
				}),
				E(this, 'getActionFromDelayedTransition', (r) => {
					const o = X('machine.after'),
						s = dt(r.delay, this.delayMap)(this.contextSnapshot, o)
					let a
					return {
						entry: () => {
							a = globalThis.setTimeout(() => {
								const l = this.getNextStateInfo(r, o)
								this.performStateChangeEffects(this.state.value, l, o)
							}, s)
						},
						exit: () => {
							globalThis.clearTimeout(a)
						},
					}
				}),
				E(this, 'getDelayedEventActions', (r) => {
					const o = this.getStateNode(r),
						i = X('machine.after')
					if (!o || !o.after) return
					const s = [],
						a = []
					if (tt(o.after)) {
						const l = this.determineTransition(o.after, i)
						if (!l) return
						const c = this.getActionFromDelayedTransition(l)
						s.push(c.entry), a.push(c.exit)
					} else if (nt(o.after))
						for (const l in o.after) {
							const c = o.after[l]
							let u = {}
							if (tt(c)) {
								const f = this.determineTransition(c, i)
								f && (u = f)
							} else
								se(c)
									? (u = { target: c, delay: l })
									: (u = { ...c, delay: l })
							const d = this.getActionFromDelayedTransition(u)
							s.push(d.entry), a.push(d.exit)
						}
					return { entries: s, exits: a }
				}),
				E(this, 'executeActions', (r, o) => {
					const i = Ut(r, this.guardMap)(
						this.contextSnapshot,
						o,
						this.guardMeta,
					)
					for (const s of ye(i)) {
						const a = se(s) ? this.actionMap?.[s] : s
						Gt(
							se(s) && !a,
							`[@zag-js/core > execute-actions] No implementation found for action: \`${s}\``,
						),
							a?.(this.state.context, o, this.meta)
					}
				}),
				E(this, 'executeActivities', (r, o, i) => {
					for (const s of o) {
						const a = se(s) ? this.activityMap?.[s] : s
						if (!a) {
							Gt(
								`[@zag-js/core > execute-activity] No implementation found for activity: \`${s}\``,
							)
							continue
						}
						const l = a(this.state.context, r, this.meta)
						l && this.addActivityCleanup(i ?? this.state.value, l)
					}
				}),
				E(this, 'createEveryActivities', (r, o) => {
					if (!r) return
					const i = X('machine.every')
					if (tt(r)) {
						const s = ye(r).find((u) => {
							const d = u.delay,
								p = dt(d, this.delayMap)(this.contextSnapshot, i)
							return (
								zr(u.guard, this.guardMap)(
									this.contextSnapshot,
									i,
									this.guardMeta,
								) ?? p != null
							)
						})
						if (!s) return
						const l = dt(s.delay, this.delayMap)(this.contextSnapshot, i)
						o(() => {
							const u = globalThis.setInterval(() => {
								this.executeActions(s.actions, i)
							}, l)
							return () => {
								globalThis.clearInterval(u)
							}
						})
					} else
						for (const s in r) {
							const a = r?.[s],
								c = dt(s, this.delayMap)(this.contextSnapshot, i)
							o(() => {
								const d = globalThis.setInterval(() => {
									this.executeActions(a, i)
								}, c)
								return () => {
									globalThis.clearInterval(d)
								}
							})
						}
				}),
				E(this, 'setEvent', (r) => {
					;(this.state.previousEvent = this.state.event),
						(this.state.event = Vn(X(r)))
				}),
				E(this, 'performExitEffects', (r, o) => {
					const i = this.state.value
					if (i === '') return
					const s = r ? this.getStateNode(r) : void 0
					this.stopActivities(i)
					const a = Ut(s?.exit, this.guardMap)(
							this.contextSnapshot,
							o,
							this.guardMeta,
						),
						l = ye(a),
						c = this.delayedEvents.get(i)
					c && l.push(...c),
						this.executeActions(l, o),
						this.eventListeners.clear()
				}),
				E(this, 'performEntryEffects', (r, o) => {
					const i = this.getStateNode(r),
						s = ye(i?.activities)
					this.createEveryActivities(i?.every, (u) => {
						s.unshift(u)
					}),
						s.length > 0 && this.executeActivities(o, s)
					const a = Ut(i?.entry, this.guardMap)(
							this.contextSnapshot,
							o,
							this.guardMeta,
						),
						l = ye(a),
						c = this.getDelayedEventActions(r)
					i?.after &&
						c &&
						(this.delayedEvents.set(r, c?.exits), l.push(...c.entries)),
						this.executeActions(l, o),
						i?.type === 'final' &&
							((this.state.done = !0),
							this.doneListeners.forEach((u) => {
								u(this.stateSnapshot)
							}),
							this.stop())
				}),
				E(this, 'performTransitionEffects', (r, o) => {
					const i = this.determineTransition(r, o)
					this.executeActions(i?.actions, o)
				}),
				E(this, 'performStateChangeEffects', (r, o, i) => {
					this.setEvent(i)
					const s = o.changed || o.reenter
					s && this.performExitEffects(r, i),
						this.performTransitionEffects(o.transition, i),
						this.setState(o.target),
						s && this.performEntryEffects(o.target, i)
				}),
				E(this, 'determineTransition', (r, o) =>
					bs(r, this.guardMap)?.(this.contextSnapshot, o, this.guardMeta),
				),
				E(this, 'sendParent', (r) => {
					this.parent ||
						vt(
							'[@zag-js/core > send-parent] Cannot send event to an unknown parent',
						)
					const o = X(r)
					this.parent?.send(o)
				}),
				E(this, 'log', (...r) => {}),
				E(this, 'send', (r) => {
					const o = X(r)
					this.transition(this.state.value, o)
				}),
				E(this, 'transition', (r, o) => {
					const i = se(r) ? this.getStateNode(r) : r?.stateNode,
						s = X(o)
					if (!i && !this.config.on) {
						const c =
							this.status === 'Stopped'
								? '[@zag-js/core > transition] Cannot transition a stopped machine'
								: `[@zag-js/core > transition] State does not have a definition for \`state\`: ${r}, \`event\`: ${s.type}`
						Gt(c)
						return
					}
					const a = i?.on?.[s.type] ?? this.config.on?.[s.type],
						l = this.getNextStateInfo(a, s)
					return (
						this.performStateChangeEffects(this.state.value, l, s),
						l.stateNode
					)
				}),
				E(
					this,
					'subscribe',
					(r) => (
						this.stateListeners.add(r),
						this.status === 'Running' && r(this.stateSnapshot),
						() => {
							this.stateListeners.delete(r)
						}
					),
				),
				E(this, 'onDone', (r) => (this.doneListeners.add(r), this)),
				E(
					this,
					'onTransition',
					(r) => (
						this.stateListeners.add(r),
						this.status === 'Running' && r(this.stateSnapshot),
						this
					),
				),
				E(this, 'onChange', (r) => (this.contextListeners.add(r), this)),
				E(this, 'onEvent', (r) => (this.eventListeners.add(r), this)),
				(this.config = jn(e)),
				(this.options = jn(t ?? {})),
				(this.id = this.config.id ?? `machine-${Qi()}`),
				(this.guardMap = this.options?.guards ?? {}),
				(this.actionMap = this.options?.actions ?? {}),
				(this.delayMap = this.options?.delays ?? {}),
				(this.activityMap = this.options?.activities ?? {}),
				(this.sync = this.options?.sync ?? !1),
				(this.state = as(this.config)),
				(this.initialContext = We(this.state.context))
			const n = X('machine.created')
			this.executeActions(this.config?.created, n)
		}

		get stateSnapshot() {
			return fe(We(this.state))
		}

		get contextSnapshot() {
			return this.stateSnapshot.context
		}

		get self() {
			const e = this
			return {
				id: this.id,
				send: this.send.bind(this),
				sendParent: this.sendParent.bind(this),
				sendChild: this.sendChild.bind(this),
				stop: this.stop.bind(this),
				stopChild: this.stopChild.bind(this),
				spawn: this.spawn.bind(this),
				get state() {
					return e.stateSnapshot
				},
				get initialContext() {
					return e.initialContext
				},
				get initialState() {
					return e.initialState?.target ?? ''
				},
			}
		}

		get meta() {
			return {
				state: this.stateSnapshot,
				guards: this.guardMap,
				send: this.send.bind(this),
				self: this.self,
				initialContext: this.initialContext,
				initialState: this.initialState?.target ?? '',
				getState: () => this.stateSnapshot,
				getAction: (e) => this.actionMap[e],
				getGuard: (e) => this.guardMap[e],
			}
		}

		get guardMeta() {
			return { state: this.stateSnapshot }
		}

		get [Symbol.toStringTag]() {
			return 'Machine'
		}

		getState() {
			return this.stateSnapshot
		}
	},
	xs = (e, t) => new Fr(e, t)

function me(e) {
	const t = globalThis.requestAnimationFrame(e)
	return () => {
		globalThis.cancelAnimationFrame(t)
	}
}

function Bn(e) {
	return e.composedPath?.()[0] ?? e.target
}

function Pt(e) {
	return (
		typeof e == 'object' &&
		e?.nodeType === Node.ELEMENT_NODE &&
		typeof e?.nodeName == 'string'
	)
}

function Es(e, t) {
	return Array.from(e?.querySelectorAll(t) ?? [])
}

var W = (e) => (e ? '' : void 0),
	Os = (e) => (e ? 'true' : void 0)

function jr(e, t) {
	return !e || !t || !Pt(e) || !Pt(t) ? !1 : e === t || e.contains(t)
}

var Cs = (e) =>
	e.nodeType === Node.DOCUMENT_NODE ? e : e.ownerDocument ?? document

function As(e) {
	const t = {
		getRootNode: (n) => n.getRootNode?.() ?? document,
		getDoc: (n) => Cs(t.getRootNode(n)),
		getWin: (n) => t.getDoc(n).defaultView ?? window,
		getActiveElement: (n) => t.getDoc(n).activeElement,
		getById: (n, r) => t.getRootNode(n).getElementById(r),
		queryById: (n, r) => {
			const o = t.getById(n, r)
			if (!o) throw new Error(`Element with id "${r}" not found.`)
			return o
		},
	}
	return { ...t, ...e }
}

var Ss = (e) => e.nodeType === Node.DOCUMENT_NODE

function Ps(e) {
	return Ss(e) ? e : e?.ownerDocument ?? document
}

function Is(e) {
	return e?.ownerDocument.defaultView ?? window
}

function Ls(e, t) {
	return e.find((n) => n.id === t)
}

function Br(e, t) {
	const n = Ls(e, t)
	return n ? e.indexOf(n) : -1
}

function Ts(e, t, n = !0) {
	let r = Br(e, t)
	return (r = n ? (r + 1) % e.length : Math.min(r + 1, e.length - 1)), e[r]
}

function $s(e, t, n = !0) {
	let r = Br(e, t)
	return r === -1
		? n
			? e[e.length - 1]
			: null
		: ((r = n ? (r - 1 + e.length) % e.length : Math.max(0, r - 1)), e[r])
}

var Wn = (e, t, n, r) => {
		const o = typeof e == 'function' ? e() : e
		return (
			o?.addEventListener(t, n, r),
			() => {
				o?.removeEventListener(t, n, r)
			}
		)
	},
	Hn = (e) => e.button === 0,
	Rs = (e) => e.button === 2 || (Ds(e) && e.button === 0),
	ks = () => /Mac|iPod|iPhone|iPad/.test(window.navigator.platform),
	Ds = (e) => (ks() ? e.metaKey && !e.ctrlKey : e.ctrlKey && !e.metaKey)

function Gn(e, t, n) {
	if (!e) return
	const r = e.ownerDocument.defaultView || window,
		o = new r.CustomEvent(t, n)
	return e.dispatchEvent(o)
}

var Ns = {
		Up: 'ArrowUp',
		Down: 'ArrowDown',
		Esc: 'Escape',
		' ': 'Space',
		',': 'Comma',
		Left: 'ArrowLeft',
		Right: 'ArrowRight',
	},
	Un = { ArrowLeft: 'ArrowRight', ArrowRight: 'ArrowLeft' }

function _s(e, t = {}) {
	const { dir: n = 'ltr', orientation: r = 'horizontal' } = t
	let { key: o } = e
	return (
		(o = Ns[o] ?? o),
		n === 'rtl' && r === 'horizontal' && o in Un && (o = Un[o]),
		o
	)
}

function pt(e) {
	return e.nativeEvent ?? e
}

var Ms = (e) => e[0],
	Vs = (e) => e[e.length - 1],
	an =
		(...e) =>
		(...t) => {
			e.forEach((n) => {
				n?.(...t)
			})
		}

function Wr(e) {
	if (!zs(e) || e === void 0) return e
	const t = Reflect.ownKeys(e).filter((r) => typeof r == 'string'),
		n = {}
	for (const r of t) {
		const o = e[r]
		o !== void 0 && (n[r] = Wr(o))
	}
	return n
}

var zs = (e) => e && typeof e == 'object' && e.constructor === Object

function Fs() {
	for (var e = 0, t, n, r = ''; e < arguments.length; )
		(t = arguments[e++]) && (n = Hr(t)) && (r && (r += ' '), (r += n))
	return r
}

function Hr(e) {
	if (typeof e == 'string') return e
	for (var t, n = '', r = 0; r < e.length; r++)
		e[r] && (t = Hr(e[r])) && (n && (n += ' '), (n += t))
	return n
}

var On = '-'

function js(e) {
	var t = Ws(e),
		n = e.conflictingClassGroups,
		r = e.conflictingClassGroupModifiers,
		o = r === void 0 ? {} : r

	function i(a) {
		var l = a.split(On)
		return l[0] === '' && l.length !== 1 && l.shift(), Gr(l, t) || Bs(a)
	}

	function s(a, l) {
		var c = n[a] || []
		return l && o[a] ? [].concat(c, o[a]) : c
	}

	return { getClassGroupId: i, getConflictingClassGroupIds: s }
}

function Gr(e, t) {
	if (e.length === 0) return t.classGroupId
	var n = e[0],
		r = t.nextPart.get(n),
		o = r ? Gr(e.slice(1), r) : void 0
	if (o) return o
	if (t.validators.length !== 0) {
		var i = e.join(On)
		return t.validators.find((s) => {
			var a = s.validator
			return a(i)
		})?.classGroupId
	}
}

var Kn = /^\[(.+)\]$/

function Bs(e) {
	if (Kn.test(e)) {
		var t = Kn.exec(e)[1],
			n = t?.substring(0, t.indexOf(':'))
		if (n) return 'arbitrary..' + n
	}
}

function Ws(e) {
	var t = e.theme,
		n = e.prefix,
		r = { nextPart: new Map(), validators: [] },
		o = Gs(Object.entries(e.classGroups), n)
	return (
		o.forEach((i) => {
			var s = i[0],
				a = i[1]
			ln(a, r, s, t)
		}),
		r
	)
}

function ln(e, t, n, r) {
	e.forEach((o) => {
		if (typeof o == 'string') {
			var i = o === '' ? t : qn(t, o)
			i.classGroupId = n
			return
		}
		if (typeof o == 'function') {
			if (Hs(o)) {
				ln(o(r), t, n, r)
				return
			}
			t.validators.push({ validator: o, classGroupId: n })
			return
		}
		Object.entries(o).forEach((s) => {
			var a = s[0],
				l = s[1]
			ln(l, qn(t, a), n, r)
		})
	})
}

function qn(e, t) {
	var n = e
	return (
		t.split(On).forEach((r) => {
			n.nextPart.has(r) ||
				n.nextPart.set(r, { nextPart: new Map(), validators: [] }),
				(n = n.nextPart.get(r))
		}),
		n
	)
}

function Hs(e) {
	return e.isThemeGetter
}

function Gs(e, t) {
	return t
		? e.map((n) => {
				var r = n[0],
					o = n[1],
					i = o.map((s) =>
						typeof s == 'string'
							? t + s
							: typeof s == 'object'
							? Object.fromEntries(
									Object.entries(s).map((a) => {
										var l = a[0],
											c = a[1]
										return [t + l, c]
									}),
							  )
							: s,
					)
				return [r, i]
		  })
		: e
}

function Us(e) {
	if (e < 1)
		return {
			get: function () {},
			set: function () {},
		}
	var t = 0,
		n = new Map(),
		r = new Map()

	function o(i, s) {
		n.set(i, s), t++, t > e && ((t = 0), (r = n), (n = new Map()))
	}

	return {
		get: function (s) {
			var a = n.get(s)
			if (a !== void 0) return a
			if ((a = r.get(s)) !== void 0) return o(s, a), a
		},
		set: function (s, a) {
			n.has(s) ? n.set(s, a) : o(s, a)
		},
	}
}

var Ur = '!'

function Ks(e) {
	var t = e.separator || ':',
		n = t.length === 1,
		r = t[0],
		o = t.length
	return function (s) {
		for (var a = [], l = 0, c = 0, u, d = 0; d < s.length; d++) {
			var f = s[d]
			if (l === 0) {
				if (f === r && (n || s.slice(d, d + o) === t)) {
					a.push(s.slice(c, d)), (c = d + o)
					continue
				}
				if (f === '/') {
					u = d
					continue
				}
			}
			f === '[' ? l++ : f === ']' && l--
		}
		var p = a.length === 0 ? s : s.substring(c),
			m = p.startsWith(Ur),
			h = m ? p.substring(1) : p,
			g = u && u > c ? u - c : void 0
		return {
			modifiers: a,
			hasImportantModifier: m,
			baseClassName: h,
			maybePostfixModifierPosition: g,
		}
	}
}

function qs(e) {
	if (e.length <= 1) return e
	var t = [],
		n = []
	return (
		e.forEach((r) => {
			var o = r[0] === '['
			o ? (t.push.apply(t, n.sort().concat([r])), (n = [])) : n.push(r)
		}),
		t.push.apply(t, n.sort()),
		t
	)
}

function Xs(e) {
	return { cache: Us(e.cacheSize), splitModifiers: Ks(e), ...js(e) }
}

var Zs = /\s+/

function Ys(e, t) {
	var n = t.splitModifiers,
		r = t.getClassGroupId,
		o = t.getConflictingClassGroupIds,
		i = new Set()
	return e
		.trim()
		.split(Zs)
		.map((s) => {
			var a = n(s),
				l = a.modifiers,
				c = a.hasImportantModifier,
				u = a.baseClassName,
				d = a.maybePostfixModifierPosition,
				f = r(d ? u.substring(0, d) : u),
				p = Boolean(d)
			if (!f) {
				if (!d) return { isTailwindClass: !1, originalClassName: s }
				if (((f = r(u)), !f))
					return { isTailwindClass: !1, originalClassName: s }
				p = !1
			}
			var m = qs(l).join(':'),
				h = c ? m + Ur : m
			return {
				isTailwindClass: !0,
				modifierId: h,
				classGroupId: f,
				originalClassName: s,
				hasPostfixModifier: p,
			}
		})
		.reverse()
		.filter((s) => {
			if (!s.isTailwindClass) return !0
			var a = s.modifierId,
				l = s.classGroupId,
				c = s.hasPostfixModifier,
				u = a + l
			return i.has(u)
				? !1
				: (i.add(u), o(l, c).forEach((d) => i.add(a + d)), !0)
		})
		.reverse()
		.map((s) => s.originalClassName)
		.join(' ')
}

function Js() {
	for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
		t[n] = arguments[n]
	var r,
		o,
		i,
		s = a

	function a(c) {
		var u = t[0],
			d = t.slice(1),
			f = d.reduce((p, m) => m(p), u())
		return (r = Xs(f)), (o = r.cache.get), (i = r.cache.set), (s = l), l(c)
	}

	function l(c) {
		var u = o(c)
		if (u) return u
		var d = Ys(c, r)
		return i(c, d), d
	}

	return function () {
		return s(Fs.apply(null, arguments))
	}
}

function D(e) {
	var t = function (r) {
		return r[e] || []
	}
	return (t.isThemeGetter = !0), t
}

var Kr = /^\[(?:([a-z-]+):)?(.+)\]$/i,
	Qs = /^\d+\/\d+$/,
	ea = new Set(['px', 'full', 'screen']),
	ta = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
	na =
		/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))/,
	ra = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/

function te(e) {
	return Re(e) || ea.has(e) || Qs.test(e) || ve(e)
}

function ve(e) {
	return De(e, 'length', ca)
}

function oa(e) {
	return De(e, 'size', qr)
}

function ia(e) {
	return De(e, 'position', qr)
}

function sa(e) {
	return De(e, 'url', ua)
}

function ht(e) {
	return De(e, 'number', Re)
}

function Re(e) {
	return !Number.isNaN(Number(e))
}

function aa(e) {
	return e.endsWith('%') && Re(e.slice(0, -1))
}

function Ue(e) {
	return Xn(e) || De(e, 'number', Xn)
}

function z(e) {
	return Kr.test(e)
}

function Ke() {
	return !0
}

function be(e) {
	return ta.test(e)
}

function la(e) {
	return De(e, '', fa)
}

function De(e, t, n) {
	var r = Kr.exec(e)
	return r ? (r[1] ? r[1] === t : n(r[2])) : !1
}

function ca(e) {
	return na.test(e)
}

function qr() {
	return !1
}

function ua(e) {
	return e.startsWith('url(')
}

function Xn(e) {
	return Number.isInteger(Number(e))
}

function fa(e) {
	return ra.test(e)
}

function da() {
	var e = D('colors'),
		t = D('spacing'),
		n = D('blur'),
		r = D('brightness'),
		o = D('borderColor'),
		i = D('borderRadius'),
		s = D('borderSpacing'),
		a = D('borderWidth'),
		l = D('contrast'),
		c = D('grayscale'),
		u = D('hueRotate'),
		d = D('invert'),
		f = D('gap'),
		p = D('gradientColorStops'),
		m = D('gradientColorStopPositions'),
		h = D('inset'),
		g = D('margin'),
		b = D('opacity'),
		v = D('padding'),
		O = D('saturate'),
		C = D('scale'),
		A = D('sepia'),
		S = D('skew'),
		k = D('space'),
		B = D('translate'),
		I = function () {
			return ['auto', 'contain', 'none']
		},
		w = function () {
			return ['auto', 'hidden', 'clip', 'visible', 'scroll']
		},
		y = function () {
			return ['auto', t]
		},
		P = function () {
			return ['', te]
		},
		_ = function () {
			return ['auto', Re, z]
		},
		V = function () {
			return [
				'bottom',
				'center',
				'left',
				'left-bottom',
				'left-top',
				'right',
				'right-bottom',
				'right-top',
				'top',
			]
		},
		$ = function () {
			return ['solid', 'dashed', 'dotted', 'double', 'none']
		},
		T = function () {
			return [
				'normal',
				'multiply',
				'screen',
				'overlay',
				'darken',
				'lighten',
				'color-dodge',
				'color-burn',
				'hard-light',
				'soft-light',
				'difference',
				'exclusion',
				'hue',
				'saturation',
				'color',
				'luminosity',
				'plus-lighter',
			]
		},
		j = function () {
			return [
				'start',
				'end',
				'center',
				'between',
				'around',
				'evenly',
				'stretch',
			]
		},
		U = function () {
			return ['', '0', z]
		},
		Ne = function () {
			return [
				'auto',
				'avoid',
				'all',
				'avoid-page',
				'page',
				'left',
				'right',
				'column',
			]
		},
		ge = function () {
			return [Re, ht]
		},
		Pe = function () {
			return [Re, z]
		}
	return {
		cacheSize: 500,
		theme: {
			colors: [Ke],
			spacing: [te],
			blur: ['none', '', be, ve],
			brightness: ge(),
			borderColor: [e],
			borderRadius: ['none', '', 'full', be, ve],
			borderSpacing: [t],
			borderWidth: P(),
			contrast: ge(),
			grayscale: U(),
			hueRotate: Pe(),
			invert: U(),
			gap: [t],
			gradientColorStops: [e],
			gradientColorStopPositions: [aa, ve],
			inset: y(),
			margin: y(),
			opacity: ge(),
			padding: [t],
			saturate: ge(),
			scale: ge(),
			sepia: U(),
			skew: Pe(),
			space: [t],
			translate: [t],
		},
		classGroups: {
			aspect: [{ aspect: ['auto', 'square', 'video', z] }],
			container: ['container'],
			columns: [{ columns: [be] }],
			'break-after': [{ 'break-after': Ne() }],
			'break-before': [{ 'break-before': Ne() }],
			'break-inside': [
				{ 'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column'] },
			],
			'box-decoration': [{ 'box-decoration': ['slice', 'clone'] }],
			box: [{ box: ['border', 'content'] }],
			display: [
				'block',
				'inline-block',
				'inline',
				'flex',
				'inline-flex',
				'table',
				'inline-table',
				'table-caption',
				'table-cell',
				'table-column',
				'table-column-group',
				'table-footer-group',
				'table-header-group',
				'table-row-group',
				'table-row',
				'flow-root',
				'grid',
				'inline-grid',
				'contents',
				'list-item',
				'hidden',
			],
			float: [{ float: ['right', 'left', 'none'] }],
			clear: [{ clear: ['left', 'right', 'both', 'none'] }],
			isolation: ['isolate', 'isolation-auto'],
			'object-fit': [
				{ object: ['contain', 'cover', 'fill', 'none', 'scale-down'] },
			],
			'object-position': [{ object: [].concat(V(), [z]) }],
			overflow: [{ overflow: w() }],
			'overflow-x': [{ 'overflow-x': w() }],
			'overflow-y': [{ 'overflow-y': w() }],
			overscroll: [{ overscroll: I() }],
			'overscroll-x': [{ 'overscroll-x': I() }],
			'overscroll-y': [{ 'overscroll-y': I() }],
			position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
			inset: [{ inset: [h] }],
			'inset-x': [{ 'inset-x': [h] }],
			'inset-y': [{ 'inset-y': [h] }],
			start: [{ start: [h] }],
			end: [{ end: [h] }],
			top: [{ top: [h] }],
			right: [{ right: [h] }],
			bottom: [{ bottom: [h] }],
			left: [{ left: [h] }],
			visibility: ['visible', 'invisible', 'collapse'],
			z: [{ z: ['auto', Ue] }],
			basis: [{ basis: [t] }],
			'flex-direction': [
				{ flex: ['row', 'row-reverse', 'col', 'col-reverse'] },
			],
			'flex-wrap': [{ flex: ['wrap', 'wrap-reverse', 'nowrap'] }],
			flex: [{ flex: ['1', 'auto', 'initial', 'none', z] }],
			grow: [{ grow: U() }],
			shrink: [{ shrink: U() }],
			order: [{ order: ['first', 'last', 'none', Ue] }],
			'grid-cols': [{ 'grid-cols': [Ke] }],
			'col-start-end': [{ col: ['auto', { span: [Ue] }, z] }],
			'col-start': [{ 'col-start': _() }],
			'col-end': [{ 'col-end': _() }],
			'grid-rows': [{ 'grid-rows': [Ke] }],
			'row-start-end': [{ row: ['auto', { span: [Ue] }, z] }],
			'row-start': [{ 'row-start': _() }],
			'row-end': [{ 'row-end': _() }],
			'grid-flow': [
				{ 'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense'] },
			],
			'auto-cols': [{ 'auto-cols': ['auto', 'min', 'max', 'fr', z] }],
			'auto-rows': [{ 'auto-rows': ['auto', 'min', 'max', 'fr', z] }],
			gap: [{ gap: [f] }],
			'gap-x': [{ 'gap-x': [f] }],
			'gap-y': [{ 'gap-y': [f] }],
			'justify-content': [{ justify: ['normal'].concat(j()) }],
			'justify-items': [
				{ 'justify-items': ['start', 'end', 'center', 'stretch'] },
			],
			'justify-self': [
				{ 'justify-self': ['auto', 'start', 'end', 'center', 'stretch'] },
			],
			'align-content': [{ content: ['normal'].concat(j(), ['baseline']) }],
			'align-items': [
				{ items: ['start', 'end', 'center', 'baseline', 'stretch'] },
			],
			'align-self': [
				{ self: ['auto', 'start', 'end', 'center', 'stretch', 'baseline'] },
			],
			'place-content': [{ 'place-content': [].concat(j(), ['baseline']) }],
			'place-items': [
				{
					'place-items': ['start', 'end', 'center', 'baseline', 'stretch'],
				},
			],
			'place-self': [
				{ 'place-self': ['auto', 'start', 'end', 'center', 'stretch'] },
			],
			p: [{ p: [v] }],
			px: [{ px: [v] }],
			py: [{ py: [v] }],
			ps: [{ ps: [v] }],
			pe: [{ pe: [v] }],
			pt: [{ pt: [v] }],
			pr: [{ pr: [v] }],
			pb: [{ pb: [v] }],
			pl: [{ pl: [v] }],
			m: [{ m: [g] }],
			mx: [{ mx: [g] }],
			my: [{ my: [g] }],
			ms: [{ ms: [g] }],
			me: [{ me: [g] }],
			mt: [{ mt: [g] }],
			mr: [{ mr: [g] }],
			mb: [{ mb: [g] }],
			ml: [{ ml: [g] }],
			'space-x': [{ 'space-x': [k] }],
			'space-x-reverse': ['space-x-reverse'],
			'space-y': [{ 'space-y': [k] }],
			'space-y-reverse': ['space-y-reverse'],
			w: [{ w: ['auto', 'min', 'max', 'fit', t] }],
			'min-w': [{ 'min-w': ['min', 'max', 'fit', te] }],
			'max-w': [
				{
					'max-w': [
						'0',
						'none',
						'full',
						'min',
						'max',
						'fit',
						'prose',
						{ screen: [be] },
						be,
						ve,
					],
				},
			],
			h: [{ h: [t, 'auto', 'min', 'max', 'fit'] }],
			'min-h': [{ 'min-h': ['min', 'max', 'fit', te] }],
			'max-h': [{ 'max-h': [t, 'min', 'max', 'fit'] }],
			'font-size': [{ text: ['base', be, ve] }],
			'font-smoothing': ['antialiased', 'subpixel-antialiased'],
			'font-style': ['italic', 'not-italic'],
			'font-weight': [
				{
					font: [
						'thin',
						'extralight',
						'light',
						'normal',
						'medium',
						'semibold',
						'bold',
						'extrabold',
						'black',
						ht,
					],
				},
			],
			'font-family': [{ font: [Ke] }],
			'fvn-normal': ['normal-nums'],
			'fvn-ordinal': ['ordinal'],
			'fvn-slashed-zero': ['slashed-zero'],
			'fvn-figure': ['lining-nums', 'oldstyle-nums'],
			'fvn-spacing': ['proportional-nums', 'tabular-nums'],
			'fvn-fraction': ['diagonal-fractions', 'stacked-fractons'],
			tracking: [
				{
					tracking: [
						'tighter',
						'tight',
						'normal',
						'wide',
						'wider',
						'widest',
						ve,
					],
				},
			],
			'line-clamp': [{ 'line-clamp': ['none', Re, ht] }],
			leading: [
				{
					leading: [
						'none',
						'tight',
						'snug',
						'normal',
						'relaxed',
						'loose',
						te,
					],
				},
			],
			'list-image': [{ 'list-image': ['none', z] }],
			'list-style-type': [{ list: ['none', 'disc', 'decimal', z] }],
			'list-style-position': [{ list: ['inside', 'outside'] }],
			'placeholder-color': [{ placeholder: [e] }],
			'placeholder-opacity': [{ 'placeholder-opacity': [b] }],
			'text-alignment': [
				{ text: ['left', 'center', 'right', 'justify', 'start', 'end'] },
			],
			'text-color': [{ text: [e] }],
			'text-opacity': [{ 'text-opacity': [b] }],
			'text-decoration': [
				'underline',
				'overline',
				'line-through',
				'no-underline',
			],
			'text-decoration-style': [{ decoration: [].concat($(), ['wavy']) }],
			'text-decoration-thickness': [
				{ decoration: ['auto', 'from-font', te] },
			],
			'underline-offset': [{ 'underline-offset': ['auto', te] }],
			'text-decoration-color': [{ decoration: [e] }],
			'text-transform': [
				'uppercase',
				'lowercase',
				'capitalize',
				'normal-case',
			],
			'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
			indent: [{ indent: [t] }],
			'vertical-align': [
				{
					align: [
						'baseline',
						'top',
						'middle',
						'bottom',
						'text-top',
						'text-bottom',
						'sub',
						'super',
						ve,
					],
				},
			],
			whitespace: [
				{
					whitespace: [
						'normal',
						'nowrap',
						'pre',
						'pre-line',
						'pre-wrap',
						'break-spaces',
					],
				},
			],
			break: [{ break: ['normal', 'words', 'all', 'keep'] }],
			hyphens: [{ hyphens: ['none', 'manual', 'auto'] }],
			content: [{ content: ['none', z] }],
			'bg-attachment': [{ bg: ['fixed', 'local', 'scroll'] }],
			'bg-clip': [{ 'bg-clip': ['border', 'padding', 'content', 'text'] }],
			'bg-opacity': [{ 'bg-opacity': [b] }],
			'bg-origin': [{ 'bg-origin': ['border', 'padding', 'content'] }],
			'bg-position': [{ bg: [].concat(V(), [ia]) }],
			'bg-repeat': [
				{ bg: ['no-repeat', { repeat: ['', 'x', 'y', 'round', 'space'] }] },
			],
			'bg-size': [{ bg: ['auto', 'cover', 'contain', oa] }],
			'bg-image': [
				{
					bg: [
						'none',
						{
							'gradient-to': [
								't',
								'tr',
								'r',
								'br',
								'b',
								'bl',
								'l',
								'tl',
							],
						},
						sa,
					],
				},
			],
			'bg-color': [{ bg: [e] }],
			'gradient-from-pos': [{ from: [m] }],
			'gradient-via-pos': [{ via: [m] }],
			'gradient-to-pos': [{ to: [m] }],
			'gradient-from': [{ from: [p] }],
			'gradient-via': [{ via: [p] }],
			'gradient-to': [{ to: [p] }],
			rounded: [{ rounded: [i] }],
			'rounded-s': [{ 'rounded-s': [i] }],
			'rounded-e': [{ 'rounded-e': [i] }],
			'rounded-t': [{ 'rounded-t': [i] }],
			'rounded-r': [{ 'rounded-r': [i] }],
			'rounded-b': [{ 'rounded-b': [i] }],
			'rounded-l': [{ 'rounded-l': [i] }],
			'rounded-ss': [{ 'rounded-ss': [i] }],
			'rounded-se': [{ 'rounded-se': [i] }],
			'rounded-ee': [{ 'rounded-ee': [i] }],
			'rounded-es': [{ 'rounded-es': [i] }],
			'rounded-tl': [{ 'rounded-tl': [i] }],
			'rounded-tr': [{ 'rounded-tr': [i] }],
			'rounded-br': [{ 'rounded-br': [i] }],
			'rounded-bl': [{ 'rounded-bl': [i] }],
			'border-w': [{ border: [a] }],
			'border-w-x': [{ 'border-x': [a] }],
			'border-w-y': [{ 'border-y': [a] }],
			'border-w-s': [{ 'border-s': [a] }],
			'border-w-e': [{ 'border-e': [a] }],
			'border-w-t': [{ 'border-t': [a] }],
			'border-w-r': [{ 'border-r': [a] }],
			'border-w-b': [{ 'border-b': [a] }],
			'border-w-l': [{ 'border-l': [a] }],
			'border-opacity': [{ 'border-opacity': [b] }],
			'border-style': [{ border: [].concat($(), ['hidden']) }],
			'divide-x': [{ 'divide-x': [a] }],
			'divide-x-reverse': ['divide-x-reverse'],
			'divide-y': [{ 'divide-y': [a] }],
			'divide-y-reverse': ['divide-y-reverse'],
			'divide-opacity': [{ 'divide-opacity': [b] }],
			'divide-style': [{ divide: $() }],
			'border-color': [{ border: [o] }],
			'border-color-x': [{ 'border-x': [o] }],
			'border-color-y': [{ 'border-y': [o] }],
			'border-color-t': [{ 'border-t': [o] }],
			'border-color-r': [{ 'border-r': [o] }],
			'border-color-b': [{ 'border-b': [o] }],
			'border-color-l': [{ 'border-l': [o] }],
			'divide-color': [{ divide: [o] }],
			'outline-style': [{ outline: [''].concat($()) }],
			'outline-offset': [{ 'outline-offset': [te] }],
			'outline-w': [{ outline: [te] }],
			'outline-color': [{ outline: [e] }],
			'ring-w': [{ ring: P() }],
			'ring-w-inset': ['ring-inset'],
			'ring-color': [{ ring: [e] }],
			'ring-opacity': [{ 'ring-opacity': [b] }],
			'ring-offset-w': [{ 'ring-offset': [te] }],
			'ring-offset-color': [{ 'ring-offset': [e] }],
			shadow: [{ shadow: ['', 'inner', 'none', be, la] }],
			'shadow-color': [{ shadow: [Ke] }],
			opacity: [{ opacity: [b] }],
			'mix-blend': [{ 'mix-blend': T() }],
			'bg-blend': [{ 'bg-blend': T() }],
			filter: [{ filter: ['', 'none'] }],
			blur: [{ blur: [n] }],
			brightness: [{ brightness: [r] }],
			contrast: [{ contrast: [l] }],
			'drop-shadow': [{ 'drop-shadow': ['', 'none', be, z] }],
			grayscale: [{ grayscale: [c] }],
			'hue-rotate': [{ 'hue-rotate': [u] }],
			invert: [{ invert: [d] }],
			saturate: [{ saturate: [O] }],
			sepia: [{ sepia: [A] }],
			'backdrop-filter': [{ 'backdrop-filter': ['', 'none'] }],
			'backdrop-blur': [{ 'backdrop-blur': [n] }],
			'backdrop-brightness': [{ 'backdrop-brightness': [r] }],
			'backdrop-contrast': [{ 'backdrop-contrast': [l] }],
			'backdrop-grayscale': [{ 'backdrop-grayscale': [c] }],
			'backdrop-hue-rotate': [{ 'backdrop-hue-rotate': [u] }],
			'backdrop-invert': [{ 'backdrop-invert': [d] }],
			'backdrop-opacity': [{ 'backdrop-opacity': [b] }],
			'backdrop-saturate': [{ 'backdrop-saturate': [O] }],
			'backdrop-sepia': [{ 'backdrop-sepia': [A] }],
			'border-collapse': [{ border: ['collapse', 'separate'] }],
			'border-spacing': [{ 'border-spacing': [s] }],
			'border-spacing-x': [{ 'border-spacing-x': [s] }],
			'border-spacing-y': [{ 'border-spacing-y': [s] }],
			'table-layout': [{ table: ['auto', 'fixed'] }],
			caption: [{ caption: ['top', 'bottom'] }],
			transition: [
				{
					transition: [
						'none',
						'all',
						'',
						'colors',
						'opacity',
						'shadow',
						'transform',
						z,
					],
				},
			],
			duration: [{ duration: Pe() }],
			ease: [{ ease: ['linear', 'in', 'out', 'in-out', z] }],
			delay: [{ delay: Pe() }],
			animate: [{ animate: ['none', 'spin', 'ping', 'pulse', 'bounce', z] }],
			transform: [{ transform: ['', 'gpu', 'none'] }],
			scale: [{ scale: [C] }],
			'scale-x': [{ 'scale-x': [C] }],
			'scale-y': [{ 'scale-y': [C] }],
			rotate: [{ rotate: [Ue, z] }],
			'translate-x': [{ 'translate-x': [B] }],
			'translate-y': [{ 'translate-y': [B] }],
			'skew-x': [{ 'skew-x': [S] }],
			'skew-y': [{ 'skew-y': [S] }],
			'transform-origin': [
				{
					origin: [
						'center',
						'top',
						'top-right',
						'right',
						'bottom-right',
						'bottom',
						'bottom-left',
						'left',
						'top-left',
						z,
					],
				},
			],
			accent: [{ accent: ['auto', e] }],
			appearance: ['appearance-none'],
			cursor: [
				{
					cursor: [
						'auto',
						'default',
						'pointer',
						'wait',
						'text',
						'move',
						'help',
						'not-allowed',
						'none',
						'context-menu',
						'progress',
						'cell',
						'crosshair',
						'vertical-text',
						'alias',
						'copy',
						'no-drop',
						'grab',
						'grabbing',
						'all-scroll',
						'col-resize',
						'row-resize',
						'n-resize',
						'e-resize',
						's-resize',
						'w-resize',
						'ne-resize',
						'nw-resize',
						'se-resize',
						'sw-resize',
						'ew-resize',
						'ns-resize',
						'nesw-resize',
						'nwse-resize',
						'zoom-in',
						'zoom-out',
						z,
					],
				},
			],
			'caret-color': [{ caret: [e] }],
			'pointer-events': [{ 'pointer-events': ['none', 'auto'] }],
			resize: [{ resize: ['none', 'y', 'x', ''] }],
			'scroll-behavior': [{ scroll: ['auto', 'smooth'] }],
			'scroll-m': [{ 'scroll-m': [t] }],
			'scroll-mx': [{ 'scroll-mx': [t] }],
			'scroll-my': [{ 'scroll-my': [t] }],
			'scroll-ms': [{ 'scroll-ms': [t] }],
			'scroll-me': [{ 'scroll-me': [t] }],
			'scroll-mt': [{ 'scroll-mt': [t] }],
			'scroll-mr': [{ 'scroll-mr': [t] }],
			'scroll-mb': [{ 'scroll-mb': [t] }],
			'scroll-ml': [{ 'scroll-ml': [t] }],
			'scroll-p': [{ 'scroll-p': [t] }],
			'scroll-px': [{ 'scroll-px': [t] }],
			'scroll-py': [{ 'scroll-py': [t] }],
			'scroll-ps': [{ 'scroll-ps': [t] }],
			'scroll-pe': [{ 'scroll-pe': [t] }],
			'scroll-pt': [{ 'scroll-pt': [t] }],
			'scroll-pr': [{ 'scroll-pr': [t] }],
			'scroll-pb': [{ 'scroll-pb': [t] }],
			'scroll-pl': [{ 'scroll-pl': [t] }],
			'snap-align': [{ snap: ['start', 'end', 'center', 'align-none'] }],
			'snap-stop': [{ snap: ['normal', 'always'] }],
			'snap-type': [{ snap: ['none', 'x', 'y', 'both'] }],
			'snap-strictness': [{ snap: ['mandatory', 'proximity'] }],
			touch: [
				{
					touch: [
						'auto',
						'none',
						'pinch-zoom',
						'manipulation',
						{ pan: ['x', 'left', 'right', 'y', 'up', 'down'] },
					],
				},
			],
			select: [{ select: ['none', 'text', 'all', 'auto'] }],
			'will-change': [
				{ 'will-change': ['auto', 'scroll', 'contents', 'transform', z] },
			],
			fill: [{ fill: [e, 'none'] }],
			'stroke-w': [{ stroke: [te, ht] }],
			stroke: [{ stroke: [e, 'none'] }],
			sr: ['sr-only', 'not-sr-only'],
		},
		conflictingClassGroups: {
			overflow: ['overflow-x', 'overflow-y'],
			overscroll: ['overscroll-x', 'overscroll-y'],
			inset: [
				'inset-x',
				'inset-y',
				'start',
				'end',
				'top',
				'right',
				'bottom',
				'left',
			],
			'inset-x': ['right', 'left'],
			'inset-y': ['top', 'bottom'],
			flex: ['basis', 'grow', 'shrink'],
			gap: ['gap-x', 'gap-y'],
			p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
			px: ['pr', 'pl'],
			py: ['pt', 'pb'],
			m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
			mx: ['mr', 'ml'],
			my: ['mt', 'mb'],
			'font-size': ['leading'],
			'fvn-normal': [
				'fvn-ordinal',
				'fvn-slashed-zero',
				'fvn-figure',
				'fvn-spacing',
				'fvn-fraction',
			],
			'fvn-ordinal': ['fvn-normal'],
			'fvn-slashed-zero': ['fvn-normal'],
			'fvn-figure': ['fvn-normal'],
			'fvn-spacing': ['fvn-normal'],
			'fvn-fraction': ['fvn-normal'],
			rounded: [
				'rounded-s',
				'rounded-e',
				'rounded-t',
				'rounded-r',
				'rounded-b',
				'rounded-l',
				'rounded-ss',
				'rounded-se',
				'rounded-ee',
				'rounded-es',
				'rounded-tl',
				'rounded-tr',
				'rounded-br',
				'rounded-bl',
			],
			'rounded-s': ['rounded-ss', 'rounded-es'],
			'rounded-e': ['rounded-se', 'rounded-ee'],
			'rounded-t': ['rounded-tl', 'rounded-tr'],
			'rounded-r': ['rounded-tr', 'rounded-br'],
			'rounded-b': ['rounded-br', 'rounded-bl'],
			'rounded-l': ['rounded-tl', 'rounded-bl'],
			'border-spacing': ['border-spacing-x', 'border-spacing-y'],
			'border-w': [
				'border-w-s',
				'border-w-e',
				'border-w-t',
				'border-w-r',
				'border-w-b',
				'border-w-l',
			],
			'border-w-x': ['border-w-r', 'border-w-l'],
			'border-w-y': ['border-w-t', 'border-w-b'],
			'border-color': [
				'border-color-t',
				'border-color-r',
				'border-color-b',
				'border-color-l',
			],
			'border-color-x': ['border-color-r', 'border-color-l'],
			'border-color-y': ['border-color-t', 'border-color-b'],
			'scroll-m': [
				'scroll-mx',
				'scroll-my',
				'scroll-ms',
				'scroll-me',
				'scroll-mt',
				'scroll-mr',
				'scroll-mb',
				'scroll-ml',
			],
			'scroll-mx': ['scroll-mr', 'scroll-ml'],
			'scroll-my': ['scroll-mt', 'scroll-mb'],
			'scroll-p': [
				'scroll-px',
				'scroll-py',
				'scroll-ps',
				'scroll-pe',
				'scroll-pt',
				'scroll-pr',
				'scroll-pb',
				'scroll-pl',
			],
			'scroll-px': ['scroll-pr', 'scroll-pl'],
			'scroll-py': ['scroll-pt', 'scroll-pb'],
		},
		conflictingClassGroupModifiers: { 'font-size': ['leading'] },
	}
}

var he = Js(da),
	cn = (e, t = []) => ({
		parts: (...n) => {
			if (pa(t)) return cn(e, n)
			throw new Error(
				'createAnatomy().parts(...) should only be called once. Did you mean to use .extendWith(...) ?',
			)
		},
		extendWith: (...n) => cn(e, [...t, ...n]),
		build: () =>
			[...new Set(t)].reduce(
				(n, r) =>
					Object.assign(n, {
						[r]: {
							selector: [
								`&[data-scope="${Me(e)}"][data-part="${Me(r)}"]`,
								`& [data-scope="${Me(e)}"][data-part="${Me(r)}"]`,
							].join(', '),
							attrs: { 'data-scope': Me(e), 'data-part': Me(r) },
						},
					}),
				{},
			),
	}),
	Me = (e) =>
		e
			.replace(/([A-Z])([A-Z])/g, '$1-$2')
			.replace(/([a-z])([A-Z])/g, '$1-$2')
			.replace(/[\s_]+/g, '-')
			.toLowerCase(),
	pa = (e) => e.length === 0,
	ha = cn('combobox').parts(
		'root',
		'label',
		'input',
		'positioner',
		'control',
		'trigger',
		'content',
		'clearTrigger',
		'option',
		'optionGroup',
	),
	ie = ha.build(),
	x = As({
		getRootId: (e) => e.ids?.root ?? `combobox:${e.id}`,
		getLabelId: (e) => e.ids?.label ?? `combobox:${e.id}:label`,
		getControlId: (e) => e.ids?.control ?? `combobox:${e.id}:control`,
		getInputId: (e) => e.ids?.input ?? `combobox:${e.id}:input`,
		getContentId: (e) => e.ids?.content ?? `combobox:${e.id}:listbox`,
		getPositionerId: (e) => `combobox:${e.id}:popper`,
		getTriggerId: (e) => e.ids?.trigger ?? `combobox:${e.id}:toggle-btn`,
		getClearTriggerId: (e) =>
			e.ids?.clearTrigger ?? `combobox:${e.id}:clear-btn`,
		getOptionId: (e, t, n) =>
			e.ids?.option?.(t, n) ??
			[`combobox:${e.id}:option:${t}`, n].filter((r) => r != null).join(':'),
		getActiveOptionEl: (e) =>
			e.focusedId ? x.getById(e, e.focusedId) : null,
		getContentEl: (e) => x.getById(e, x.getContentId(e)),
		getInputEl: (e) => x.getById(e, x.getInputId(e)),
		getPositionerEl: (e) => x.getById(e, x.getPositionerId(e)),
		getControlEl: (e) => x.getById(e, x.getControlId(e)),
		getTriggerEl: (e) => x.getById(e, x.getTriggerId(e)),
		getClearTriggerEl: (e) => x.getById(e, x.getClearTriggerId(e)),
		getElements: (e) =>
			Es(x.getContentEl(e), '[role=option]:not([aria-disabled=true])'),
		getFocusedOptionEl: (e) => {
			if (!e.focusedId) return null
			const t = `[role=option][id=${CSS.escape(e.focusedId)}]`
			return x.getContentEl(e)?.querySelector(t)
		},
		getFirstEl: (e) => Ms(x.getElements(e)),
		getLastEl: (e) => Vs(x.getElements(e)),
		getPrevEl: (e, t) => $s(x.getElements(e), t, e.loop),
		getNextEl: (e, t) => Ts(x.getElements(e), t, e.loop),
		isInputFocused: (e) => x.getDoc(e).activeElement === x.getInputEl(e),
		getOptionData: (e) => ({
			value: e?.getAttribute('data-value') ?? '',
			label: e?.getAttribute('data-label') ?? '',
		}),
		getOptionCount: (e) => {
			const t = x.getContentEl(e),
				n = t?.querySelector('[role=option]')?.getAttribute('aria-setsize')
			return n != null
				? parseInt(n)
				: t?.querySelectorAll('[role=option]').length ?? 0
		},
		getMatchingOptionEl: (e, t) => {
			if (!t) return null
			const n = `[role=option][data-value="${CSS.escape(t)}"`,
				r = x.getContentEl(e)
			return r ? r.querySelector(n) : null
		},
		focusInput: (e) => {
			const t = x.getInputEl(e)
			x.getDoc(e).activeElement !== t && t?.focus(),
				e.selectInputOnFocus && t?.select()
		},
		getClosestSectionLabel(e) {
			return e.focusedId
				? x
						.getActiveOptionEl(e)
						?.closest('[data-part=option-group]')
						?.getAttribute('aria-label')
				: void 0
		},
		getValueLabel: (e, t) => {
			const n = x.getMatchingOptionEl(e, t)
			return x.getOptionData(n).label
		},
	})

function He(e) {
	return e.split('-')[1]
}

function Cn(e) {
	return e === 'y' ? 'height' : 'width'
}

function we(e) {
	return e.split('-')[0]
}

function Ge(e) {
	return ['top', 'bottom'].includes(we(e)) ? 'x' : 'y'
}

function Zn(e, t, n) {
	let { reference: r, floating: o } = e
	const i = r.x + r.width / 2 - o.width / 2,
		s = r.y + r.height / 2 - o.height / 2,
		a = Ge(t),
		l = Cn(a),
		c = r[l] / 2 - o[l] / 2,
		u = a === 'x'
	let d
	switch (we(t)) {
		case 'top':
			d = { x: i, y: r.y - o.height }
			break
		case 'bottom':
			d = { x: i, y: r.y + r.height }
			break
		case 'right':
			d = { x: r.x + r.width, y: s }
			break
		case 'left':
			d = { x: r.x - o.width, y: s }
			break
		default:
			d = { x: r.x, y: r.y }
	}
	switch (He(t)) {
		case 'start':
			d[a] -= c * (n && u ? -1 : 1)
			break
		case 'end':
			d[a] += c * (n && u ? -1 : 1)
	}
	return d
}

const ga = async (e, t, n) => {
	const {
			placement: r = 'bottom',
			strategy: o = 'absolute',
			middleware: i = [],
			platform: s,
		} = n,
		a = i.filter(Boolean),
		l = await (s.isRTL == null ? void 0 : s.isRTL(t))
	let c = await s.getElementRects({ reference: e, floating: t, strategy: o }),
		{ x: u, y: d } = Zn(c, r, l),
		f = r,
		p = {},
		m = 0
	for (let h = 0; h < a.length; h++) {
		const { name: g, fn: b } = a[h],
			{
				x: v,
				y: O,
				data: C,
				reset: A,
			} = await b({
				x: u,
				y: d,
				initialPlacement: r,
				placement: f,
				strategy: o,
				middlewareData: p,
				rects: c,
				platform: s,
				elements: { reference: e, floating: t },
			})
		;(u = v ?? u),
			(d = O ?? d),
			(p = { ...p, [g]: { ...p[g], ...C } }),
			A &&
				m <= 50 &&
				(m++,
				typeof A == 'object' &&
					(A.placement && (f = A.placement),
					A.rects &&
						(c =
							A.rects === !0
								? await s.getElementRects({
										reference: e,
										floating: t,
										strategy: o,
								  })
								: A.rects),
					({ x: u, y: d } = Zn(c, f, l))),
				(h = -1))
	}
	return { x: u, y: d, placement: f, strategy: o, middlewareData: p }
}

function Xr(e) {
	return typeof e != 'number'
		? (function (t) {
				return { top: 0, right: 0, bottom: 0, left: 0, ...t }
		  })(e)
		: { top: e, right: e, bottom: e, left: e }
}

function It(e) {
	return {
		...e,
		top: e.y,
		left: e.x,
		right: e.x + e.width,
		bottom: e.y + e.height,
	}
}

async function An(e, t) {
	var n
	t === void 0 && (t = {})
	const { x: r, y: o, platform: i, rects: s, elements: a, strategy: l } = e,
		{
			boundary: c = 'clippingAncestors',
			rootBoundary: u = 'viewport',
			elementContext: d = 'floating',
			altBoundary: f = !1,
			padding: p = 0,
		} = t,
		m = Xr(p),
		h = a[f ? (d === 'floating' ? 'reference' : 'floating') : d],
		g = It(
			await i.getClippingRect({
				element:
					(n = await (i.isElement == null ? void 0 : i.isElement(h))) ==
						null || n
						? h
						: h.contextElement ||
						  (await (i.getDocumentElement == null
								? void 0
								: i.getDocumentElement(a.floating))),
				boundary: c,
				rootBoundary: u,
				strategy: l,
			}),
		),
		b = d === 'floating' ? { ...s.floating, x: r, y: o } : s.reference,
		v = await (i.getOffsetParent == null
			? void 0
			: i.getOffsetParent(a.floating)),
		O = ((await (i.isElement == null ? void 0 : i.isElement(v))) &&
			(await (i.getScale == null ? void 0 : i.getScale(v)))) || {
			x: 1,
			y: 1,
		},
		C = It(
			i.convertOffsetParentRelativeRectToViewportRelativeRect
				? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
						rect: b,
						offsetParent: v,
						strategy: l,
				  })
				: b,
		)
	return {
		top: (g.top - C.top + m.top) / O.y,
		bottom: (C.bottom - g.bottom + m.bottom) / O.y,
		left: (g.left - C.left + m.left) / O.x,
		right: (C.right - g.right + m.right) / O.x,
	}
}

const un = Math.min,
	Ie = Math.max

function fn(e, t, n) {
	return Ie(e, un(t, n))
}

const ma = (e) => ({
		name: 'arrow',
		options: e,
		async fn(t) {
			const { element: n, padding: r = 0 } = e || {},
				{ x: o, y: i, placement: s, rects: a, platform: l, elements: c } = t
			if (n == null) return {}
			const u = Xr(r),
				d = { x: o, y: i },
				f = Ge(s),
				p = Cn(f),
				m = await l.getDimensions(n),
				h = f === 'y',
				g = h ? 'top' : 'left',
				b = h ? 'bottom' : 'right',
				v = h ? 'clientHeight' : 'clientWidth',
				O = a.reference[p] + a.reference[f] - d[f] - a.floating[p],
				C = d[f] - a.reference[f],
				A = await (l.getOffsetParent == null
					? void 0
					: l.getOffsetParent(n))
			let S = A ? A[v] : 0
			;(S && (await (l.isElement == null ? void 0 : l.isElement(A)))) ||
				(S = c.floating[v] || a.floating[p])
			const k = O / 2 - C / 2,
				B = u[g],
				I = S - m[p] - u[b],
				w = S / 2 - m[p] / 2 + k,
				y = fn(B, w, I),
				P =
					He(s) != null &&
					w != y &&
					a.reference[p] / 2 - (w < B ? u[g] : u[b]) - m[p] / 2 < 0
			return {
				[f]: d[f] - (P ? (w < B ? B - w : I - w) : 0),
				data: { [f]: y, centerOffset: w - y },
			}
		},
	}),
	ba = ['top', 'right', 'bottom', 'left']
ba.reduce((e, t) => e.concat(t, t + '-start', t + '-end'), [])
const ya = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' }

function Lt(e) {
	return e.replace(/left|right|bottom|top/g, (t) => ya[t])
}

function va(e, t, n) {
	n === void 0 && (n = !1)
	const r = He(e),
		o = Ge(e),
		i = Cn(o)
	let s =
		o === 'x'
			? r === (n ? 'end' : 'start')
				? 'right'
				: 'left'
			: r === 'start'
			? 'bottom'
			: 'top'
	return (
		t.reference[i] > t.floating[i] && (s = Lt(s)), { main: s, cross: Lt(s) }
	)
}

const wa = { start: 'end', end: 'start' }

function Kt(e) {
	return e.replace(/start|end/g, (t) => wa[t])
}

const xa = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: 'flip',
				options: e,
				async fn(t) {
					var n
					const {
							placement: r,
							middlewareData: o,
							rects: i,
							initialPlacement: s,
							platform: a,
							elements: l,
						} = t,
						{
							mainAxis: c = !0,
							crossAxis: u = !0,
							fallbackPlacements: d,
							fallbackStrategy: f = 'bestFit',
							fallbackAxisSideDirection: p = 'none',
							flipAlignment: m = !0,
							...h
						} = e,
						g = we(r),
						b = we(s) === s,
						v = await (a.isRTL == null ? void 0 : a.isRTL(l.floating)),
						O =
							d ||
							(b || !m
								? [Lt(s)]
								: (function (y) {
										const P = Lt(y)
										return [Kt(y), P, Kt(P)]
								  })(s))
					d ||
						p === 'none' ||
						O.push(
							...(function (y, P, _, V) {
								const $ = He(y)
								let T = (function (j, U, Ne) {
									const ge = ['left', 'right'],
										Pe = ['right', 'left'],
										q = ['top', 'bottom'],
										ao = ['bottom', 'top']
									switch (j) {
										case 'top':
										case 'bottom':
											return Ne ? (U ? Pe : ge) : U ? ge : Pe
										case 'left':
										case 'right':
											return U ? q : ao
										default:
											return []
									}
								})(we(y), _ === 'start', V)
								return (
									$ &&
										((T = T.map((j) => j + '-' + $)),
										P && (T = T.concat(T.map(Kt)))),
									T
								)
							})(s, m, p, v),
						)
					const C = [s, ...O],
						A = await An(t, h),
						S = []
					let k = ((n = o.flip) == null ? void 0 : n.overflows) || []
					if ((c && S.push(A[g]), u)) {
						const { main: y, cross: P } = va(r, i, v)
						S.push(A[y], A[P])
					}
					if (
						((k = [...k, { placement: r, overflows: S }]),
						!S.every((y) => y <= 0))
					) {
						var B, I
						const y =
								(((B = o.flip) == null ? void 0 : B.index) || 0) + 1,
							P = C[y]
						if (P)
							return {
								data: { index: y, overflows: k },
								reset: { placement: P },
							}
						let _ =
							(I = k
								.filter((V) => V.overflows[0] <= 0)
								.sort((V, $) => V.overflows[1] - $.overflows[1])[0]) ==
							null
								? void 0
								: I.placement
						if (!_)
							switch (f) {
								case 'bestFit': {
									var w
									const V =
										(w = k
											.map(($) => [
												$.placement,
												$.overflows
													.filter((T) => T > 0)
													.reduce((T, j) => T + j, 0),
											])
											.sort(($, T) => $[1] - T[1])[0]) == null
											? void 0
											: w[0]
									V && (_ = V)
									break
								}
								case 'initialPlacement':
									_ = s
							}
						if (r !== _) return { reset: { placement: _ } }
					}
					return {}
				},
			}
		)
	},
	Ea = function (e) {
		return (
			e === void 0 && (e = 0),
			{
				name: 'offset',
				options: e,
				async fn(t) {
					const { x: n, y: r } = t,
						o = await (async function (i, s) {
							const { placement: a, platform: l, elements: c } = i,
								u = await (l.isRTL == null
									? void 0
									: l.isRTL(c.floating)),
								d = we(a),
								f = He(a),
								p = Ge(a) === 'x',
								m = ['left', 'top'].includes(d) ? -1 : 1,
								h = u && p ? -1 : 1,
								g = typeof s == 'function' ? s(i) : s
							let {
								mainAxis: b,
								crossAxis: v,
								alignmentAxis: O,
							} = typeof g == 'number'
								? { mainAxis: g, crossAxis: 0, alignmentAxis: null }
								: {
										mainAxis: 0,
										crossAxis: 0,
										alignmentAxis: null,
										...g,
								  }
							return (
								f &&
									typeof O == 'number' &&
									(v = f === 'end' ? -1 * O : O),
								p ? { x: v * h, y: b * m } : { x: b * m, y: v * h }
							)
						})(t, e)
					return { x: n + o.x, y: r + o.y, data: o }
				},
			}
		)
	}

function Oa(e) {
	return e === 'x' ? 'y' : 'x'
}

const Ca = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: 'shift',
				options: e,
				async fn(t) {
					const { x: n, y: r, placement: o } = t,
						{
							mainAxis: i = !0,
							crossAxis: s = !1,
							limiter: a = {
								fn: (g) => {
									let { x: b, y: v } = g
									return { x: b, y: v }
								},
							},
							...l
						} = e,
						c = { x: n, y: r },
						u = await An(t, l),
						d = Ge(we(o)),
						f = Oa(d)
					let p = c[d],
						m = c[f]
					if (i) {
						const g = d === 'y' ? 'bottom' : 'right'
						p = fn(p + u[d === 'y' ? 'top' : 'left'], p, p - u[g])
					}
					if (s) {
						const g = f === 'y' ? 'bottom' : 'right'
						m = fn(m + u[f === 'y' ? 'top' : 'left'], m, m - u[g])
					}
					const h = a.fn({ ...t, [d]: p, [f]: m })
					return { ...h, data: { x: h.x - n, y: h.y - r } }
				},
			}
		)
	},
	Aa = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: 'size',
				options: e,
				async fn(t) {
					const { placement: n, rects: r, platform: o, elements: i } = t,
						{ apply: s = () => {}, ...a } = e,
						l = await An(t, a),
						c = we(n),
						u = He(n),
						d = Ge(n) === 'x',
						{ width: f, height: p } = r.floating
					let m, h
					c === 'top' || c === 'bottom'
						? ((m = c),
						  (h =
								u ===
								((await (o.isRTL == null
									? void 0
									: o.isRTL(i.floating)))
									? 'start'
									: 'end')
									? 'left'
									: 'right'))
						: ((h = c), (m = u === 'end' ? 'top' : 'bottom'))
					const g = p - l[m],
						b = f - l[h],
						v = !t.middlewareData.shift
					let O = g,
						C = b
					if (d) {
						const S = f - l.left - l.right
						C = u || v ? un(b, S) : S
					} else {
						const S = p - l.top - l.bottom
						O = u || v ? un(g, S) : S
					}
					if (v && !u) {
						const S = Ie(l.left, 0),
							k = Ie(l.right, 0),
							B = Ie(l.top, 0),
							I = Ie(l.bottom, 0)
						d
							? (C =
									f -
									2 *
										(S !== 0 || k !== 0
											? S + k
											: Ie(l.left, l.right)))
							: (O =
									p -
									2 *
										(B !== 0 || I !== 0
											? B + I
											: Ie(l.top, l.bottom)))
					}
					await s({ ...t, availableWidth: C, availableHeight: O })
					const A = await o.getDimensions(i.floating)
					return f !== A.width || p !== A.height
						? { reset: { rects: !0 } }
						: {}
				},
			}
		)
	}

function Y(e) {
	var t
	return ((t = e.ownerDocument) == null ? void 0 : t.defaultView) || window
}

function ae(e) {
	return Y(e).getComputedStyle(e)
}

function Zr(e) {
	return e instanceof Y(e).Node
}

function Ce(e) {
	return Zr(e) ? (e.nodeName || '').toLowerCase() : ''
}

let gt

function Yr() {
	if (gt) return gt
	const e = navigator.userAgentData
	return e && Array.isArray(e.brands)
		? ((gt = e.brands.map((t) => t.brand + '/' + t.version).join(' ')), gt)
		: navigator.userAgent
}

function oe(e) {
	return e instanceof Y(e).HTMLElement
}

function xe(e) {
	return e instanceof Y(e).Element
}

function Yn(e) {
	return typeof ShadowRoot > 'u'
		? !1
		: e instanceof Y(e).ShadowRoot || e instanceof ShadowRoot
}

function Mt(e) {
	const { overflow: t, overflowX: n, overflowY: r, display: o } = ae(e)
	return (
		/auto|scroll|overlay|hidden|clip/.test(t + r + n) &&
		!['inline', 'contents'].includes(o)
	)
}

function Sa(e) {
	return ['table', 'td', 'th'].includes(Ce(e))
}

function dn(e) {
	const t = /firefox/i.test(Yr()),
		n = ae(e),
		r = n.backdropFilter || n.WebkitBackdropFilter
	return (
		n.transform !== 'none' ||
		n.perspective !== 'none' ||
		(!!r && r !== 'none') ||
		(t && n.willChange === 'filter') ||
		(t && !!n.filter && n.filter !== 'none') ||
		['transform', 'perspective'].some((o) => n.willChange.includes(o)) ||
		['paint', 'layout', 'strict', 'content'].some((o) => {
			const i = n.contain
			return i != null && i.includes(o)
		})
	)
}

function pn() {
	return /^((?!chrome|android).)*safari/i.test(Yr())
}

function Sn(e) {
	return ['html', 'body', '#document'].includes(Ce(e))
}

const Jn = Math.min,
	rt = Math.max,
	Tt = Math.round

function Jr(e) {
	const t = ae(e)
	let n = parseFloat(t.width),
		r = parseFloat(t.height)
	const o = oe(e),
		i = o ? e.offsetWidth : n,
		s = o ? e.offsetHeight : r,
		a = Tt(n) !== i || Tt(r) !== s
	return a && ((n = i), (r = s)), { width: n, height: r, fallback: a }
}

function Qr(e) {
	return xe(e) ? e : e.contextElement
}

const eo = { x: 1, y: 1 }

function Fe(e) {
	const t = Qr(e)
	if (!oe(t)) return eo
	const n = t.getBoundingClientRect(),
		{ width: r, height: o, fallback: i } = Jr(t)
	let s = (i ? Tt(n.width) : n.width) / r,
		a = (i ? Tt(n.height) : n.height) / o
	return (
		(s && Number.isFinite(s)) || (s = 1),
		(a && Number.isFinite(a)) || (a = 1),
		{ x: s, y: a }
	)
}

function at(e, t, n, r) {
	var o, i
	t === void 0 && (t = !1), n === void 0 && (n = !1)
	const s = e.getBoundingClientRect(),
		a = Qr(e)
	let l = eo
	t && (r ? xe(r) && (l = Fe(r)) : (l = Fe(e)))
	const c = a ? Y(a) : window,
		u = pn() && n
	let d =
			(s.left +
				((u && ((o = c.visualViewport) == null ? void 0 : o.offsetLeft)) ||
					0)) /
			l.x,
		f =
			(s.top +
				((u && ((i = c.visualViewport) == null ? void 0 : i.offsetTop)) ||
					0)) /
			l.y,
		p = s.width / l.x,
		m = s.height / l.y
	if (a) {
		const h = Y(a),
			g = r && xe(r) ? Y(r) : r
		let b = h.frameElement
		for (; b && r && g !== h; ) {
			const v = Fe(b),
				O = b.getBoundingClientRect(),
				C = getComputedStyle(b)
			;(O.x += (b.clientLeft + parseFloat(C.paddingLeft)) * v.x),
				(O.y += (b.clientTop + parseFloat(C.paddingTop)) * v.y),
				(d *= v.x),
				(f *= v.y),
				(p *= v.x),
				(m *= v.y),
				(d += O.x),
				(f += O.y),
				(b = Y(b).frameElement)
		}
	}
	return It({ width: p, height: m, x: d, y: f })
}

function Ee(e) {
	return ((Zr(e) ? e.ownerDocument : e.document) || window.document)
		.documentElement
}

function Vt(e) {
	return xe(e)
		? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
		: { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset }
}

function to(e) {
	return at(Ee(e)).left + Vt(e).scrollLeft
}

function lt(e) {
	if (Ce(e) === 'html') return e
	const t = e.assignedSlot || e.parentNode || (Yn(e) && e.host) || Ee(e)
	return Yn(t) ? t.host : t
}

function no(e) {
	const t = lt(e)
	return Sn(t) ? t.ownerDocument.body : oe(t) && Mt(t) ? t : no(t)
}

function Pn(e, t) {
	var n
	t === void 0 && (t = [])
	const r = no(e),
		o = r === ((n = e.ownerDocument) == null ? void 0 : n.body),
		i = Y(r)
	return o
		? t.concat(i, i.visualViewport || [], Mt(r) ? r : [])
		: t.concat(r, Pn(r))
}

function Qn(e, t, n) {
	let r
	if (t === 'viewport')
		r = (function (s, a) {
			const l = Y(s),
				c = Ee(s),
				u = l.visualViewport
			let d = c.clientWidth,
				f = c.clientHeight,
				p = 0,
				m = 0
			if (u) {
				;(d = u.width), (f = u.height)
				const h = pn()
				;(!h || (h && a === 'fixed')) &&
					((p = u.offsetLeft), (m = u.offsetTop))
			}
			return { width: d, height: f, x: p, y: m }
		})(e, n)
	else if (t === 'document')
		r = (function (s) {
			const a = Ee(s),
				l = Vt(s),
				c = s.ownerDocument.body,
				u = rt(a.scrollWidth, a.clientWidth, c.scrollWidth, c.clientWidth),
				d = rt(
					a.scrollHeight,
					a.clientHeight,
					c.scrollHeight,
					c.clientHeight,
				)
			let f = -l.scrollLeft + to(s)
			const p = -l.scrollTop
			return (
				ae(c).direction === 'rtl' &&
					(f += rt(a.clientWidth, c.clientWidth) - u),
				{ width: u, height: d, x: f, y: p }
			)
		})(Ee(e))
	else if (xe(t))
		r = (function (s, a) {
			const l = at(s, !0, a === 'fixed'),
				c = l.top + s.clientTop,
				u = l.left + s.clientLeft,
				d = oe(s) ? Fe(s) : { x: 1, y: 1 }
			return {
				width: s.clientWidth * d.x,
				height: s.clientHeight * d.y,
				x: u * d.x,
				y: c * d.y,
			}
		})(t, n)
	else {
		const s = { ...t }
		if (pn()) {
			var o, i
			const a = Y(e)
			;(s.x -=
				((o = a.visualViewport) == null ? void 0 : o.offsetLeft) || 0),
				(s.y -=
					((i = a.visualViewport) == null ? void 0 : i.offsetTop) || 0)
		}
		r = s
	}
	return It(r)
}

function er(e, t) {
	return oe(e) && ae(e).position !== 'fixed'
		? t
			? t(e)
			: e.offsetParent
		: null
}

function tr(e, t) {
	const n = Y(e)
	if (!oe(e)) return n
	let r = er(e, t)
	for (; r && Sa(r) && ae(r).position === 'static'; ) r = er(r, t)
	return r &&
		(Ce(r) === 'html' ||
			(Ce(r) === 'body' && ae(r).position === 'static' && !dn(r)))
		? n
		: r ||
				(function (o) {
					let i = lt(o)
					for (; oe(i) && !Sn(i); ) {
						if (dn(i)) return i
						i = lt(i)
					}
					return null
				})(e) ||
				n
}

function Pa(e, t, n) {
	const r = oe(t),
		o = Ee(t),
		i = at(e, !0, n === 'fixed', t)
	let s = { scrollLeft: 0, scrollTop: 0 }
	const a = { x: 0, y: 0 }
	if (r || (!r && n !== 'fixed'))
		if (((Ce(t) !== 'body' || Mt(o)) && (s = Vt(t)), oe(t))) {
			const l = at(t, !0)
			;(a.x = l.x + t.clientLeft), (a.y = l.y + t.clientTop)
		} else o && (a.x = to(o))
	return {
		x: i.left + s.scrollLeft - a.x,
		y: i.top + s.scrollTop - a.y,
		width: i.width,
		height: i.height,
	}
}

const Ia = {
		getClippingRect: function (e) {
			let { element: t, boundary: n, rootBoundary: r, strategy: o } = e
			const i =
					n === 'clippingAncestors'
						? (function (c, u) {
								const d = u.get(c)
								if (d) return d
								let f = Pn(c).filter((g) => xe(g) && Ce(g) !== 'body'),
									p = null
								const m = ae(c).position === 'fixed'
								let h = m ? lt(c) : c
								for (; xe(h) && !Sn(h); ) {
									const g = ae(h),
										b = dn(h)
									g.position === 'fixed'
										? (p = null)
										: (
												m
													? b || p
													: b ||
													  g.position !== 'static' ||
													  !p ||
													  !['absolute', 'fixed'].includes(
															p.position,
													  )
										  )
										? (p = g)
										: (f = f.filter((v) => v !== h)),
										(h = lt(h))
								}
								return u.set(c, f), f
						  })(t, this._c)
						: [].concat(n),
				s = [...i, r],
				a = s[0],
				l = s.reduce((c, u) => {
					const d = Qn(t, u, o)
					return (
						(c.top = rt(d.top, c.top)),
						(c.right = Jn(d.right, c.right)),
						(c.bottom = Jn(d.bottom, c.bottom)),
						(c.left = rt(d.left, c.left)),
						c
					)
				}, Qn(t, a, o))
			return {
				width: l.right - l.left,
				height: l.bottom - l.top,
				x: l.left,
				y: l.top,
			}
		},
		convertOffsetParentRelativeRectToViewportRelativeRect: function (e) {
			let { rect: t, offsetParent: n, strategy: r } = e
			const o = oe(n),
				i = Ee(n)
			if (n === i) return t
			let s = { scrollLeft: 0, scrollTop: 0 },
				a = { x: 1, y: 1 }
			const l = { x: 0, y: 0 }
			if (
				(o || (!o && r !== 'fixed')) &&
				((Ce(n) !== 'body' || Mt(i)) && (s = Vt(n)), oe(n))
			) {
				const c = at(n)
				;(a = Fe(n)), (l.x = c.x + n.clientLeft), (l.y = c.y + n.clientTop)
			}
			return {
				width: t.width * a.x,
				height: t.height * a.y,
				x: t.x * a.x - s.scrollLeft * a.x + l.x,
				y: t.y * a.y - s.scrollTop * a.y + l.y,
			}
		},
		isElement: xe,
		getDimensions: function (e) {
			return Jr(e)
		},
		getOffsetParent: tr,
		getDocumentElement: Ee,
		getScale: Fe,
		async getElementRects(e) {
			let { reference: t, floating: n, strategy: r } = e
			const o = this.getOffsetParent || tr,
				i = this.getDimensions
			return {
				reference: Pa(t, await o(n), r),
				floating: { x: 0, y: 0, ...(await i(n)) },
			}
		},
		getClientRects: (e) => Array.from(e.getClientRects()),
		isRTL: (e) => ae(e).direction === 'rtl',
	},
	La = (e, t, n) => {
		const r = new Map(),
			o = { platform: Ia, ...n },
			i = { ...o.platform, _c: r }
		return ga(e, t, { ...o, platform: i })
	}
var hn,
	Le = new Map()

function nr(e, t, n = {}) {
	const { scope: r = 'rect' } = n,
		o = Ta(r),
		i = Le.get(e)
	return (
		i
			? (i.callbacks.push(t), t(e.getBoundingClientRect()))
			: (Le.set(e, { rect: {}, callbacks: [t] }),
			  Le.size === 1 && (hn = requestAnimationFrame(o))),
		function () {
			const a = Le.get(e)
			if (!a) return
			const l = a.callbacks.indexOf(t)
			l > -1 && a.callbacks.splice(l, 1),
				a.callbacks.length === 0 &&
					(Le.delete(e), Le.size === 0 && cancelAnimationFrame(hn))
		}
	)
}

function Ta(e) {
	const t = Ra(e)
	return function n() {
		const r = []
		Le.forEach((o, i) => {
			const s = i.getBoundingClientRect()
			t(o.rect, s) || ((o.rect = s), r.push(o))
		}),
			r.forEach((o) => {
				o.callbacks.forEach((i) => i(o.rect))
			}),
			(hn = requestAnimationFrame(n))
	}
}

var ro = (e, t) => e.width === t.width && e.height === t.height,
	oo = (e, t) =>
		e.top === t.top &&
		e.right === t.right &&
		e.bottom === t.bottom &&
		e.left === t.left,
	$a = (e, t) => ro(e, t) && oo(e, t)

function Ra(e) {
	return e === 'size' ? ro : e === 'position' ? oo : $a
}

var qt =
		(...e) =>
		() =>
			e.forEach((t) => t()),
	rr = (e) => typeof e == 'object' && e !== null && e.nodeType === 1,
	or = (e, t, n, r) => (
		e.addEventListener(t, n, r), () => e.removeEventListener(t, n, r)
	)

function ka(e) {
	const t = typeof e == 'boolean'
	return {
		ancestorResize: t ? e : e.ancestorResize ?? !0,
		ancestorScroll: t ? e : e.ancestorScroll ?? !0,
		referenceResize: t ? e : e.referenceResize ?? !0,
	}
}

function Da(e, t, n, r = !1) {
	const { ancestorScroll: o, ancestorResize: i, referenceResize: s } = ka(r),
		a = o || i,
		l = []
	a && rr(e) && l.push(...Pn(e))

	function c() {
		let d = [nr(t, n, { scope: 'size' })]
		return (
			s && rr(e) && d.push(nr(e, n)),
			d.push(qt(...l.map((f) => or(f, 'resize', n)))),
			() => d.forEach((f) => f())
		)
	}

	function u() {
		return qt(...l.map((d) => or(d, 'scroll', n, { passive: !0 })))
	}

	return qt(c(), u())
}

var qe = (e) => ({ variable: e, reference: `var(${e})` }),
	ue = {
		arrowSize: qe('--arrow-size'),
		arrowSizeHalf: qe('--arrow-size-half'),
		arrowBg: qe('--arrow-background'),
		transformOrigin: qe('--transform-origin'),
		arrowOffset: qe('--arrow-offset'),
	},
	Na = (e) => ({
		top: 'bottom center',
		'top-start': e ? `${e.x}px bottom` : 'left bottom',
		'top-end': e ? `${e.x}px bottom` : 'right bottom',
		bottom: 'top center',
		'bottom-start': e ? `${e.x}px top` : 'top left',
		'bottom-end': e ? `${e.x}px top` : 'top right',
		left: 'right center',
		'left-start': e ? `right ${e.y}px` : 'right top',
		'left-end': e ? `right ${e.y}px` : 'right bottom',
		right: 'left center',
		'right-start': e ? `left ${e.y}px` : 'left top',
		'right-end': e ? `left ${e.y}px` : 'left bottom',
	}),
	_a = {
		name: 'transformOrigin',
		fn({ placement: e, elements: t, middlewareData: n }) {
			const { arrow: r } = n,
				o = Na(r)[e],
				{ floating: i } = t
			return (
				i.style.setProperty(ue.transformOrigin.variable, o),
				{ data: { transformOrigin: o } }
			)
		},
	},
	Ma = (e) => ({
		name: 'shiftArrow',
		fn({ placement: t, middlewareData: n }) {
			const { element: r } = e
			if (n.arrow) {
				const { x: o, y: i } = n.arrow,
					s = t.split('-')[0]
				Object.assign(r.style, {
					left: o != null ? `${o}px` : '',
					top: i != null ? `${i}px` : '',
					[s]: `calc(100% + ${ue.arrowOffset.reference})`,
				})
			}
			return {}
		},
	}),
	Va = {
		strategy: 'absolute',
		placement: 'bottom',
		listeners: !0,
		gutter: 8,
		flip: !0,
		sameWidth: !1,
		overflowPadding: 8,
	}

function za(e, t, n = {}) {
	if (!t || !e) return
	const r = Object.assign({}, Va, n),
		o = t.querySelector('[data-part=arrow]'),
		i = [],
		s = typeof r.boundary == 'function' ? r.boundary() : r.boundary
	if (
		(r.flip && i.push(xa({ boundary: s, padding: r.overflowPadding })),
		r.gutter || r.offset)
	) {
		const l = o ? o.offsetHeight / 2 : 0,
			c = r.gutter ? { mainAxis: r.gutter } : r.offset
		c?.mainAxis != null && (c.mainAxis += l), i.push(Ea(c))
	}
	i.push(
		Ca({ boundary: s, crossAxis: r.overlap, padding: r.overflowPadding }),
	),
		o && i.push(ma({ element: o, padding: 8 }), Ma({ element: o })),
		i.push(_a),
		i.push(
			Aa({
				padding: r.overflowPadding,
				apply({ rects: l, availableHeight: c, availableWidth: u }) {
					const d = Math.round(l.reference.width)
					t.style.setProperty('--reference-width', `${d}px`),
						t.style.setProperty('--available-width', `${u}px`),
						t.style.setProperty('--available-height', `${c}px`),
						r.sameWidth &&
							Object.assign(t.style, {
								width: `${d}px`,
								minWidth: 'unset',
							}),
						r.fitViewport &&
							Object.assign(t.style, {
								maxWidth: `${u}px`,
								maxHeight: `${c}px`,
							})
				},
			}),
		)

	function a(l = {}) {
		if (!e || !t) return
		const { placement: c, strategy: u, onComplete: d } = r
		La(e, t, { placement: c, middleware: i, strategy: u, ...l }).then((f) => {
			const p = Math.round(f.x),
				m = Math.round(f.y)
			Object.assign(t.style, {
				position: f.strategy,
				top: '0px',
				left: '0px',
				transform: `translate3d(${p}px, ${m}px, 0)`,
			}),
				d?.(f)
		})
	}

	return a(), an(r.listeners ? Da(e, t, a, r.listeners) : void 0, r.onCleanup)
}

var Fa = {
	bottom: 'rotate(45deg)',
	left: 'rotate(135deg)',
	top: 'rotate(225deg)',
	right: 'rotate(315deg)',
}

function ja(e) {
	const { placement: t = 'bottom' } = e
	return {
		arrow: {
			position: 'absolute',
			width: ue.arrowSize.reference,
			height: ue.arrowSize.reference,
			[ue.arrowSizeHalf.variable]: `calc(${ue.arrowSize.reference} / 2)`,
			[ue.arrowOffset.variable]: `calc(${ue.arrowSizeHalf.reference} * -1)`,
		},
		arrowTip: {
			transform: Fa[t.split('-')[0]],
			background: ue.arrowBg.reference,
			top: '0',
			left: '0',
			width: '100%',
			height: '100%',
			position: 'absolute',
			zIndex: 'inherit',
		},
		floating: {
			position: 'absolute',
			minWidth: 'max-content',
			top: '0px',
			left: '0px',
		},
	}
}

function Ba(e, t, n) {
	const r = e.context.translations,
		o = e.context.disabled,
		i = e.context.isInteractive,
		s = e.context.invalid,
		a = e.context.readOnly,
		l = e.hasTag('open'),
		c = e.hasTag('focused'),
		u = e.hasTag('idle'),
		d = l && e.context.navigationData && e.context.autoComplete,
		f = (!u || e.context.isHovering) && !e.context.isInputValueEmpty,
		p = d ? e.context.navigationData?.label : e.context.inputValue,
		m = ja({ placement: e.context.currentPlacement }),
		h = {
			isFocused: c,
			isOpen: l,
			isInputValueEmpty: e.context.isInputValueEmpty,
			inputValue: e.context.inputValue,
			focusedOption: e.context.focusedOptionData,
			selectedValue: e.context.selectionData?.value,
			setValue(g) {
				let b
				typeof g == 'string'
					? (b = { value: g, label: x.getValueLabel(e.context, g) })
					: (b = g),
					t({ type: 'SET_VALUE', ...b })
			},
			setInputValue(g) {
				t({ type: 'SET_INPUT_VALUE', value: g })
			},
			clearValue() {
				t('CLEAR_VALUE')
			},
			focus() {
				x.getInputEl(e.context)?.focus()
			},
			rootProps: n.element({
				...ie.root.attrs,
				id: x.getRootId(e.context),
				'data-invalid': W(s),
				'data-readonly': W(a),
			}),
			labelProps: n.label({
				...ie.label.attrs,
				htmlFor: x.getInputId(e.context),
				id: x.getLabelId(e.context),
				'data-readonly': W(a),
				'data-disabled': W(o),
				'data-invalid': W(s),
				'data-focus': W(c),
			}),
			controlProps: n.element({
				...ie.control.attrs,
				id: x.getControlId(e.context),
				'data-expanded': W(l),
				'data-focus': W(c),
				'data-disabled': W(o),
				'data-invalid': W(s),
				onPointerOver() {
					i && t('POINTER_OVER')
				},
				onPointerLeave() {
					i && t('POINTER_LEAVE')
				},
			}),
			positionerProps: n.element({
				...ie.positioner.attrs,
				id: x.getPositionerId(e.context),
				'data-expanded': W(l),
				hidden: !l,
				style: m.floating,
			}),
			inputProps: n.input({
				...ie.input.attrs,
				'aria-invalid': Os(s),
				'data-invalid': W(s),
				name: e.context.name,
				form: e.context.form,
				disabled: o,
				autoFocus: e.context.autoFocus,
				autoComplete: 'off',
				autoCorrect: 'off',
				autoCapitalize: 'none',
				spellCheck: 'false',
				readOnly: a,
				placeholder: e.context.placeholder,
				id: x.getInputId(e.context),
				type: 'text',
				role: 'combobox',
				defaultValue: p,
				'data-value': p,
				'aria-autocomplete': e.context.autoComplete ? 'both' : 'list',
				'aria-controls': l ? x.getContentId(e.context) : void 0,
				'aria-expanded': l,
				'aria-activedescendant': e.context.focusedId ?? void 0,
				onClick() {
					i && t('CLICK_INPUT')
				},
				onFocus() {
					o || t('FOCUS')
				},
				onChange(g) {
					pt(g).isComposing ||
						t({ type: 'CHANGE', value: g.currentTarget.value })
				},
				onKeyDown(g) {
					if (!i) return
					const b = pt(g)
					if (b.ctrlKey || b.shiftKey || b.isComposing) return
					let v = !1
					const O = {
							ArrowDown(S) {
								t(S.altKey ? 'ALT_ARROW_DOWN' : 'ARROW_DOWN'), (v = !0)
							},
							ArrowUp() {
								t(g.altKey ? 'ALT_ARROW_UP' : 'ARROW_UP'), (v = !0)
							},
							Home(S) {
								S.ctrlKey ||
									S.metaKey ||
									t({
										type: 'HOME',
										preventDefault: () => S.preventDefault(),
									})
							},
							End(S) {
								S.ctrlKey ||
									S.metaKey ||
									t({
										type: 'END',
										preventDefault: () => S.preventDefault(),
									})
							},
							Enter() {
								t('ENTER'), (v = !0)
							},
							Escape() {
								t('ESCAPE'), (v = !0)
							},
							Tab() {
								t('TAB')
							},
						},
						C = _s(g, e.context),
						A = O[C]
					A?.(g), v && g.preventDefault()
				},
			}),
			triggerProps: n.button({
				...ie.trigger.attrs,
				id: x.getTriggerId(e.context),
				'aria-haspopup': 'listbox',
				type: 'button',
				tabIndex: -1,
				'aria-label': r.triggerLabel,
				'aria-expanded': l,
				'aria-controls': l ? x.getContentId(e.context) : void 0,
				disabled: o,
				'data-readonly': W(a),
				'data-disabled': W(o),
				onPointerDown(g) {
					const b = pt(g)
					!i ||
						!Hn(b) ||
						b.pointerType === 'touch' ||
						(t('CLICK_BUTTON'), g.preventDefault())
				},
				onPointerUp(g) {
					g.pointerType === 'touch' && t('CLICK_BUTTON')
				},
			}),
			contentProps: n.element({
				...ie.content.attrs,
				id: x.getContentId(e.context),
				role: 'listbox',
				hidden: !l,
				'aria-labelledby': x.getLabelId(e.context),
				onPointerDown(g) {
					g.preventDefault()
				},
			}),
			clearTriggerProps: n.button({
				...ie.clearTrigger.attrs,
				id: x.getClearTriggerId(e.context),
				type: 'button',
				tabIndex: -1,
				disabled: o,
				'aria-label': r.clearTriggerLabel,
				hidden: !f,
				onPointerDown(g) {
					const b = pt(g)
					!i || !Hn(b) || (t('CLEAR_VALUE'), g.preventDefault())
				},
			}),
			getOptionState(g) {
				const { value: b, index: v, disabled: O } = g,
					C = x.getOptionId(e.context, b, v),
					A = e.context.focusedId === C,
					S = e.context.selectionData?.value === b
				return { disabled: O, focused: A, checked: S }
			},
			getOptionProps(g) {
				const { value: b, label: v, index: O, count: C } = g,
					A = x.getOptionId(e.context, b, O),
					S = h.getOptionState(g)
				return n.element({
					...ie.option.attrs,
					id: A,
					role: 'option',
					tabIndex: -1,
					'data-highlighted': W(S.focused),
					'data-disabled': W(S.disabled),
					'data-checked': W(S.checked),
					'aria-selected': S.focused,
					'aria-disabled': S.disabled,
					'aria-posinset': C && O != null ? O + 1 : void 0,
					'aria-setsize': C,
					'data-value': b,
					'data-label': v,
					onPointerMove() {
						S.disabled ||
							t({
								type: 'POINTEROVER_OPTION',
								id: A,
								value: b,
								label: v,
							})
					},
					onPointerUp() {
						S.disabled ||
							t({
								type: 'CLICK_OPTION',
								src: 'pointerup',
								id: A,
								value: b,
								label: v,
							})
					},
					onClick() {
						S.disabled ||
							t({
								type: 'CLICK_OPTION',
								src: 'click',
								id: A,
								value: b,
								label: v,
							})
					},
					onAuxClick(k) {
						S.disabled ||
							(k.preventDefault(),
							t({
								type: 'CLICK_OPTION',
								src: 'auxclick',
								id: A,
								value: b,
								label: v,
							}))
					},
				})
			},
			getOptionGroupProps(g) {
				const { label: b } = g
				return n.element({
					...ie.optionGroup.attrs,
					role: 'group',
					'aria-label': b,
				})
			},
		}
	return h
}

var Xe = new WeakMap()

function ir(e, t) {
	return e instanceof t.HTMLElement && e.dataset.liveAnnouncer === 'true'
}

function Wa(e, t) {
	const n = e.filter(Boolean)
	if (n.length === 0) return
	const r = n[0].ownerDocument || document,
		o = r.defaultView ?? window,
		i = new Set(n),
		s = new Set(),
		a = t ?? r.body,
		l = r.createTreeWalker(a, NodeFilter.SHOW_ELEMENT, {
			acceptNode(f) {
				return (
					ir(f, o) && i.add(f),
					i.has(f) || s.has(f.parentElement)
						? NodeFilter.FILTER_REJECT
						: (f instanceof o.HTMLElement &&
								f.getAttribute('role') === 'row') ||
						  n.some((p) => f.contains(p))
						? NodeFilter.FILTER_SKIP
						: NodeFilter.FILTER_ACCEPT
				)
			},
		}),
		c = (f) => {
			let p = Xe.get(f) ?? 0
			;(f.getAttribute('aria-hidden') === 'true' && p === 0) ||
				(p === 0 && f.setAttribute('aria-hidden', 'true'),
				s.add(f),
				Xe.set(f, p + 1))
		}
	let u = l.nextNode()
	for (; u != null; ) c(u), (u = l.nextNode())
	const d = new o.MutationObserver((f) => {
		for (let p of f)
			if (
				!(p.type !== 'childList' || p.addedNodes.length === 0) &&
				![...i, ...s].some((m) => m.contains(p.target))
			)
				for (const m of p.addedNodes)
					ir(m, o) ? i.add(m) : m instanceof o.Element && c(m)
	})
	return (
		d.observe(a, { childList: !0, subtree: !0 }),
		() => {
			d.disconnect()
			for (let f of s) {
				let p = Xe.get(f)
				if (p === 1) {
					f.removeAttribute('aria-hidden'), Xe.delete(f)
					continue
				}
				p !== void 0 && Xe.set(f, p - 1)
			}
		}
	)
}

function sr(e, t, n) {
	if (!e) return
	const r = e.ownerDocument.defaultView || window,
		o = new r.MutationObserver((i) => {
			for (const s of i)
				s.type === 'attributes' &&
					s.attributeName &&
					t.includes(s.attributeName) &&
					n(s)
		})
	return (
		o.observe(e, { attributes: !0, attributeFilter: t }), () => o.disconnect()
	)
}

function Ha(e, t) {
	if (!e) return
	const n = e.ownerDocument.defaultView || window,
		r = new n.MutationObserver(t)
	return r.observe(e, { childList: !0, subtree: !0 }), () => r.disconnect()
}

function Ga(e) {
	const t = {
		each(n) {
			for (let r = 0; r < e.frames?.length; r += 1) {
				const o = e.frames[r]
				o && n(o)
			}
		},
		addEventListener(n, r, o) {
			return (
				t.each((i) => {
					try {
						i.document.addEventListener(n, r, o)
					} catch (s) {
						console.warn(s)
					}
				}),
				() => {
					try {
						t.removeEventListener(n, r, o)
					} catch (i) {
						console.warn(i)
					}
				}
			)
		},
		removeEventListener(n, r, o) {
			t.each((i) => {
				try {
					i.document.removeEventListener(n, r, o)
				} catch (s) {
					console.warn(s)
				}
			})
		},
	}
	return t
}

var Ua = (e) => typeof e == 'object' && e !== null && e.nodeType === 1

function Ka(e) {
	return Ua(e)
		? e.offsetWidth > 0 || e.offsetHeight > 0 || e.getClientRects().length > 0
		: !1
}

var qa =
	"input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false']), details > summary:first-of-type"

function io(e) {
	return e ? e.matches(qa) && Ka(e) : !1
}

var ar = 'pointerdown.outside',
	lr = 'focus.outside'

function Xa(e) {
	const t = e.composedPath() ?? [e.target]
	for (const n of t) if (Pt(n) && io(n)) return !0
	return !1
}

function Za(e, t) {
	const {
		exclude: n,
		onFocusOutside: r,
		onPointerDownOutside: o,
		onInteractOutside: i,
	} = t
	if (!e) return
	const s = Ps(e),
		a = Is(e),
		l = Ga(a)

	function c(h) {
		const g = Bn(h)
		return !Pt(g) || jr(e, g) ? !1 : !n?.(g)
	}

	let u

	function d(h) {
		function g() {
			if (!(!e || !c(h))) {
				if (o || i) {
					const b = an(o, i)
					e.addEventListener(ar, b, { once: !0 })
				}
				Gn(e, ar, {
					bubbles: !1,
					cancelable: !0,
					detail: {
						originalEvent: h,
						contextmenu: Rs(h),
						focusable: Xa(h),
					},
				})
			}
		}

		h.pointerType === 'touch'
			? (l.removeEventListener('click', g),
			  s.removeEventListener('click', g),
			  (u = g),
			  s.addEventListener('click', g, { once: !0 }),
			  l.addEventListener('click', g, { once: !0 }))
			: g()
	}

	const f = new Set(),
		p = setTimeout(() => {
			f.add(l.addEventListener('pointerdown', d, !0)),
				f.add(Wn(s, 'pointerdown', d, !0))
		}, 0)

	function m(h) {
		if (!(!e || !c(h))) {
			if (r || i) {
				const g = an(r, i)
				e.addEventListener(lr, g, { once: !0 })
			}
			Gn(e, lr, {
				bubbles: !1,
				cancelable: !0,
				detail: { originalEvent: h, contextmenu: !1, focusable: io(Bn(h)) },
			})
		}
	}

	return (
		f.add(Wn(s, 'focusin', m, !0)),
		f.add(l.addEventListener('focusin', m, !0)),
		() => {
			clearTimeout(p),
				u &&
					(l.removeEventListener('click', u),
					s.removeEventListener('click', u)),
				f.forEach((h) => h())
		}
	)
}

var Ya = {
	border: '0',
	clip: 'rect(0 0 0 0)',
	height: '1px',
	margin: '-1px',
	overflow: 'hidden',
	padding: '0',
	position: 'absolute',
	width: '1px',
	whiteSpace: 'nowrap',
	wordWrap: 'normal',
}

function Ja(e) {
	Object.assign(e.style, Ya)
}

var mt = '__live-region__'

function Qa(e = {}) {
	const {
			level: t = 'polite',
			document: n = document,
			root: r,
			delay: o = 0,
		} = e,
		i = n.defaultView ?? window,
		s = r ?? n.body

	function a(c, u) {
		n.getElementById(mt)?.remove(), (u = u ?? o)
		const f = n.createElement('span')
		;(f.id = mt), (f.dataset.liveAnnouncer = 'true')
		const p = t !== 'assertive' ? 'status' : 'alert'
		f.setAttribute('aria-live', t),
			f.setAttribute('role', p),
			Ja(f),
			s.appendChild(f),
			i.setTimeout(() => {
				f.textContent = c
			}, u)
	}

	function l() {
		n.getElementById(mt)?.remove()
	}

	return {
		announce: a,
		destroy: l,
		toJSON() {
			return mt
		},
	}
}

var { and: bt, not: el } = gs

function tl(e) {
	const t = Wr(e)
	return xs(
		{
			id: 'combobox',
			initial: t.autoFocus ? 'focused' : 'idle',
			context: {
				loop: !0,
				openOnClick: !1,
				ariaHidden: !0,
				focusedId: null,
				focusedOptionData: null,
				navigationData: null,
				selectionData: null,
				inputValue: '',
				liveRegion: null,
				focusOnClear: !0,
				selectInputOnFocus: !1,
				selectOnTab: !0,
				isHovering: !1,
				isKeyboardEvent: !1,
				allowCustomValue: !1,
				isCustomValue: (n) => n.inputValue !== n.previousValue,
				inputBehavior: 'none',
				selectionBehavior: 'set',
				...t,
				positioning: {
					placement: 'bottom',
					flip: !1,
					sameWidth: !0,
					...t.positioning,
				},
				translations: {
					triggerLabel: 'Toggle suggestions',
					clearTriggerLabel: 'Clear value',
					navigationHint:
						'use the up and down keys to navigate. Press the enter key to select',
					countAnnouncement: (n) =>
						`${n} ${n === 1 ? 'option' : 'options'} available`,
					...t.translations,
				},
			},
			computed: {
				isInputValueEmpty: (n) => n.inputValue.length === 0,
				isInteractive: (n) => !(n.readOnly || n.disabled),
				autoComplete: (n) => n.inputBehavior === 'autocomplete',
				autoHighlight: (n) => n.inputBehavior === 'autohighlight',
			},
			watch: {
				inputValue: 'invokeOnInputChange',
				navigationData: 'invokeOnHighlight',
				selectionData: ['invokeOnSelect', 'blurInputIfNeeded'],
				focusedId: 'setSectionLabel',
			},
			entry: ['setupLiveRegion'],
			exit: ['removeLiveRegion'],
			activities: ['syncInputValue'],
			on: {
				SET_VALUE: { actions: ['setInputValue', 'setSelectionData'] },
				SET_INPUT_VALUE: { actions: 'setInputValue' },
				CLEAR_VALUE: [
					{
						guard: 'focusOnClear',
						target: 'focused',
						actions: ['clearInputValue', 'clearSelectedValue'],
					},
					{ actions: ['clearInputValue', 'clearSelectedValue'] },
				],
				POINTER_OVER: { actions: 'setIsHovering' },
				POINTER_LEAVE: { actions: 'clearIsHovering' },
			},
			states: {
				idle: {
					tags: ['idle'],
					entry: ['scrollToTop', 'clearFocusedOption'],
					on: {
						CLICK_BUTTON: {
							target: 'interacting',
							actions: ['focusInput', 'invokeOnOpen'],
						},
						CLICK_INPUT: {
							guard: 'openOnClick',
							target: 'interacting',
							actions: 'invokeOnOpen',
						},
						FOCUS: 'focused',
					},
				},
				focused: {
					tags: ['focused'],
					entry: ['focusInput', 'scrollToTop', 'clearFocusedOption'],
					activities: ['trackInteractOutside'],
					on: {
						CHANGE: { target: 'suggesting', actions: 'setInputValue' },
						BLUR: 'idle',
						ESCAPE: {
							guard: bt('isCustomValue', el('allowCustomValue')),
							actions: 'revertInputValue',
						},
						CLICK_INPUT: {
							guard: 'openOnClick',
							target: 'interacting',
							actions: ['focusInput', 'invokeOnOpen'],
						},
						CLICK_BUTTON: {
							target: 'interacting',
							actions: ['focusInput', 'invokeOnOpen'],
						},
						POINTER_OVER: { actions: 'setIsHovering' },
						ARROW_UP: [
							{
								guard: 'autoComplete',
								target: 'interacting',
								actions: 'invokeOnOpen',
							},
							{
								target: 'interacting',
								actions: ['focusLastOption', 'invokeOnOpen'],
							},
						],
						ARROW_DOWN: [
							{
								guard: 'autoComplete',
								target: 'interacting',
								actions: 'invokeOnOpen',
							},
							{
								target: 'interacting',
								actions: ['focusFirstOption', 'invokeOnOpen'],
							},
						],
						ALT_ARROW_DOWN: {
							target: 'interacting',
							actions: ['focusInput', 'invokeOnOpen'],
						},
					},
				},
				suggesting: {
					tags: ['open', 'focused'],
					activities: [
						'trackInteractOutside',
						'scrollOptionIntoView',
						'computePlacement',
						'trackOptionNodes',
						'hideOtherElements',
					],
					entry: ['focusInput', 'invokeOnOpen'],
					on: {
						ARROW_DOWN: {
							target: 'interacting',
							actions: 'focusNextOption',
						},
						ARROW_UP: {
							target: 'interacting',
							actions: 'focusPrevOption',
						},
						ALT_ARROW_UP: 'focused',
						HOME: {
							target: 'interacting',
							actions: ['focusFirstOption', 'preventDefault'],
						},
						END: {
							target: 'interacting',
							actions: ['focusLastOption', 'preventDefault'],
						},
						ENTER: [
							{
								guard: bt('hasFocusedOption', 'autoComplete'),
								target: 'focused',
								actions: 'selectActiveOption',
							},
							{
								guard: 'hasFocusedOption',
								target: 'focused',
								actions: 'selectOption',
							},
						],
						CHANGE: [
							{
								guard: 'autoHighlight',
								actions: [
									'clearFocusedOption',
									'setInputValue',
									'focusFirstOption',
								],
							},
							{ actions: ['clearFocusedOption', 'setInputValue'] },
						],
						ESCAPE: { target: 'focused', actions: 'invokeOnClose' },
						POINTEROVER_OPTION: [
							{
								guard: 'autoComplete',
								target: 'interacting',
								actions: 'setActiveOption',
							},
							{
								target: 'interacting',
								actions: ['setActiveOption', 'setNavigationData'],
							},
						],
						BLUR: { target: 'idle', actions: 'invokeOnClose' },
						CLICK_BUTTON: { target: 'focused', actions: 'invokeOnClose' },
						CLICK_OPTION: {
							target: 'focused',
							actions: ['selectOption', 'invokeOnClose'],
						},
					},
				},
				interacting: {
					tags: ['open', 'focused'],
					activities: [
						'scrollOptionIntoView',
						'trackInteractOutside',
						'computePlacement',
						'hideOtherElements',
					],
					entry: 'focusMatchingOption',
					on: {
						HOME: { actions: ['focusFirstOption', 'preventDefault'] },
						END: { actions: ['focusLastOption', 'preventDefault'] },
						ARROW_DOWN: [
							{
								guard: bt('autoComplete', 'isLastOptionFocused'),
								actions: ['clearFocusedOption', 'scrollToTop'],
							},
							{ actions: 'focusNextOption' },
						],
						ARROW_UP: [
							{
								guard: bt('autoComplete', 'isFirstOptionFocused'),
								actions: 'clearFocusedOption',
							},
							{ actions: 'focusPrevOption' },
						],
						ALT_UP: {
							target: 'focused',
							actions: ['selectOption', 'invokeOnClose'],
						},
						CLEAR_FOCUS: { actions: 'clearFocusedOption' },
						TAB: {
							guard: 'selectOnTab',
							target: 'idle',
							actions: ['selectOption', 'invokeOnClose'],
						},
						ENTER: {
							target: 'focused',
							actions: ['selectOption', 'invokeOnClose'],
						},
						CHANGE: [
							{
								guard: 'autoComplete',
								target: 'suggesting',
								actions: ['commitNavigationData', 'setInputValue'],
							},
							{
								target: 'suggesting',
								actions: ['clearFocusedOption', 'setInputValue'],
							},
						],
						POINTEROVER_OPTION: [
							{ guard: 'autoComplete', actions: 'setActiveOption' },
							{ actions: ['setActiveOption', 'setNavigationData'] },
						],
						CLICK_OPTION: {
							target: 'focused',
							actions: ['selectOption', 'invokeOnClose'],
						},
						ESCAPE: { target: 'focused', actions: 'invokeOnClose' },
						CLICK_BUTTON: { target: 'focused', actions: 'invokeOnClose' },
						BLUR: { target: 'idle', actions: 'invokeOnClose' },
					},
				},
			},
		},
		{
			guards: {
				openOnClick: (n) => !!n.openOnClick,
				isInputValueEmpty: (n) => n.isInputValueEmpty,
				focusOnClear: (n) => !!n.focusOnClear,
				autoFocus: (n) => !!n.autoFocus,
				autoComplete: (n) => n.autoComplete,
				autoHighlight: (n) => n.autoHighlight,
				isFirstOptionFocused: (n) => x.getFirstEl(n)?.id === n.focusedId,
				isLastOptionFocused: (n) => x.getLastEl(n)?.id === n.focusedId,
				isCustomValue: (n) =>
					!!n.isCustomValue?.({
						inputValue: n.inputValue,
						previousValue: n.selectionData?.value,
					}),
				allowCustomValue: (n) => !!n.allowCustomValue,
				hasFocusedOption: (n) => !!n.focusedId,
				selectOnTab: (n) => !!n.selectOnTab,
			},
			activities: {
				syncInputValue: (n) => {
					const r = x.getInputEl(n)
					return sr(r, ['data-value'], () => {
						if (!r) return
						const o = r.dataset.value || ''
						;(r.value = o),
							(r.selectionStart = o.length),
							(r.selectionEnd = o.length)
					})
				},
				trackInteractOutside(n, r, { send: o }) {
					return Za(x.getInputEl(n), {
						exclude(i) {
							return [x.getContentEl(n), x.getTriggerEl(n)].some((a) =>
								jr(a, i),
							)
						},
						onInteractOutside(i) {
							n.onInteractOutside?.(i),
								!i.defaultPrevented &&
									o({ type: 'BLUR', src: 'interact-outside' })
						},
					})
				},
				hideOtherElements(n) {
					if (n.ariaHidden)
						return Wa([
							x.getInputEl(n),
							x.getContentEl(n),
							x.getTriggerEl(n),
						])
				},
				computePlacement(n) {
					return (
						(n.currentPlacement = n.positioning.placement),
						za(x.getControlEl(n), x.getPositionerEl(n), {
							...n.positioning,
							onComplete(r) {
								n.currentPlacement = r.placement
							},
							onCleanup() {
								n.currentPlacement = void 0
							},
						})
					)
				},
				trackOptionNodes(n, r, o) {
					if (!n.autoHighlight) return
					const i = o.getAction('focusFirstOption'),
						s = () => i(n, r, o)
					return s(), Ha(x.getContentEl(n), s)
				},
				scrollOptionIntoView(n, r, { getState: o }) {
					const i = x.getInputEl(n)
					return sr(i, ['aria-activedescendant'], () => {
						const s = o().event
						if (!/(ARROW_UP|ARROW_DOWN|HOME|END|TAB)/.test(s.type)) return
						x.getActiveOptionEl(n)?.scrollIntoView({ block: 'nearest' }),
							n.autoComplete && x.focusInput(n)
					})
				},
			},
			actions: {
				setupLiveRegion(n) {
					n.liveRegion = Qa({ level: 'assertive', document: x.getDoc(n) })
				},
				removeLiveRegion(n) {
					n.liveRegion?.destroy()
				},
				setActiveOption(n, r) {
					const { label: o, id: i, value: s } = r
					;(n.focusedId = i),
						(n.focusedOptionData = { label: o, value: s })
				},
				setNavigationData(n, r) {
					const { label: o, value: i } = r
					n.navigationData = { label: o, value: i }
				},
				clearNavigationData(n) {
					n.navigationData = null
				},
				commitNavigationData(n) {
					n.navigationData &&
						((n.inputValue = n.navigationData.label),
						(n.navigationData = null))
				},
				clearFocusedOption(n) {
					;(n.focusedId = null),
						(n.focusedOptionData = null),
						(n.navigationData = null)
				},
				selectActiveOption(n) {
					n.focusedOptionData &&
						((n.selectionData = n.focusedOptionData),
						(n.inputValue = n.focusedOptionData.label))
				},
				selectOption(n, r) {
					const o = !!r.value && !!r.label
					n.selectionData = o
						? { label: r.label, value: r.value }
						: n.navigationData
					let i
					n.selectionData &&
						(n.selectionBehavior === 'set' && (i = n.selectionData.label),
						n.selectionBehavior === 'clear' && (i = ''),
						i != null && (n.inputValue = i))
				},
				blurInputIfNeeded(n) {
					n.autoComplete ||
						!n.blurOnSelect ||
						me(() => {
							x.getInputEl(n)?.blur()
						})
				},
				focusInput(n, r) {
					r.type !== 'CHANGE' && x.focusInput(n)
				},
				setInputValue(n, r) {
					const o = r.type === 'SET_VALUE' ? r.label : r.value
					n.inputValue = o
				},
				clearInputValue(n) {
					n.inputValue = ''
				},
				revertInputValue(n) {
					n.selectionData && (n.inputValue = n.selectionData.label)
				},
				setSelectionData(n, r) {
					const { label: o, value: i } = r
					n.selectionData = { label: o, value: i }
				},
				clearSelectedValue(n) {
					n.selectionData = null
				},
				scrollToTop(n) {
					const r = x.getContentEl(n)
					r && (r.scrollTop = 0)
				},
				invokeOnInputChange(n) {
					n.onInputChange?.({ value: n.inputValue })
				},
				invokeOnHighlight(n) {
					const { label: r, value: o } = n.navigationData ?? {},
						i = x.getMatchingOptionEl(n, o)
					n.onHighlight?.({ label: r, value: o, relatedTarget: i })
				},
				invokeOnSelect(n) {
					const { label: r, value: o } = n.selectionData ?? {},
						i = x.getMatchingOptionEl(n, o)
					n.onSelect?.({ label: r, value: o, relatedTarget: i })
				},
				invokeOnOpen(n) {
					n.onOpen?.()
				},
				invokeOnClose(n) {
					n.onClose?.()
				},
				highlightFirstOption(n) {
					me(() => {
						so(n, x.getFirstEl(n))
					})
				},
				focusFirstOption(n) {
					me(() => {
						Ze(n, x.getFirstEl(n))
					})
				},
				focusLastOption(n) {
					me(() => {
						Ze(n, x.getLastEl(n))
					})
				},
				focusNextOption(n) {
					me(() => {
						const r = x.getNextEl(n, n.focusedId ?? '')
						Ze(n, r)
					})
				},
				focusPrevOption(n) {
					me(() => {
						let r = x.getPrevEl(n, n.focusedId ?? '')
						Ze(n, r)
					})
				},
				focusMatchingOption(n) {
					me(() => {
						const r = x.getMatchingOptionEl(n, n.selectionData?.value)
						r?.scrollIntoView({ block: 'nearest' }), Ze(n, r)
					})
				},
				announceOptionCount(n) {
					me(() => {
						const r = x.getOptionCount(n)
						if (!r) return
						const o = n.translations.countAnnouncement(r)
						n.liveRegion?.announce(o)
					})
				},
				setIsHovering(n) {
					n.isHovering = !0
				},
				clearIsHovering(n) {
					n.isHovering = !1
				},
				preventDefault(n, r) {
					r.preventDefault()
				},
				setSectionLabel(n) {
					const r = x.getClosestSectionLabel(n)
					r && (n.sectionLabel = r)
				},
			},
		},
	)
}

function so(e, t) {
	if (!t) return
	const n = x.getOptionData(t)
	return (e.focusedId = t.id), (e.focusedOptionData = n), n
}

function Ze(e, t) {
	if (!t || t.id === e.focusedId) return
	const n = so(e, t)
	e.navigationData = n
}

const nl = Z('<ul>'),
	rl = Z(
		'<div class="w-full sm:w-48"><div><div><input><button><span class="material-symbols-sharp text-[20px] h-5 w-5 text-black dark:text-whiteOnDark">unfold_more</span></button></div></div><div>',
	),
	ol = Z('<li><span class="block truncate">'),
	il = Z(
		'<span><span class="w-5 h-5 material-symbols-sharp text-[20px]">check',
	),
	sl = (e) => {
		const [t, n] = J(e.options),
			[r, o] = Ji(
				tl({
					id: Eo(),
					onOpen() {
						n(e.options)
					},
					onInputChange({ value: s }) {
						const a = e.options.filter((l) =>
							l.label.toLowerCase().includes(s.toLowerCase()),
						)
						n(a.length > 0 ? a : e.options)
					},
					...e.context,
				}),
			),
			i = M(() => Ba(r, o, Hi))
		return (
			kt(() => {
				e.setApiRef && e.setApiRef(i()),
					e.defaultValue && i().setValue(e.defaultValue)
			}),
			(() => {
				const s = rl(),
					a = s.firstChild,
					l = a.firstChild,
					c = l.firstChild,
					u = c.nextSibling,
					d = u.firstChild,
					f = a.nextSibling
				return (
					ce(
						a,
						ne(() => i().rootProps),
						!1,
						!0,
					),
					ce(
						l,
						ne(() => i().controlProps, { class: 'relative' }),
						!1,
						!0,
					),
					ce(
						c,
						ne(() => i().inputProps, {
							class: 'w-full border-0 bg-offWhite dark:bg-gray-800 py-1.5 pl-3 pr-12 ring-2 ring-inset ring-black dark:ring-whiteOnDark focus:ring-2 focus:ring-inset focus:ring-primary-500 dark:focus:ring-primary-500 sm:text-sm sm:leading-6',
							get placeholder() {
								return e.placeholder
							},
						}),
						!1,
						!1,
					),
					ce(
						u,
						ne(() => i().triggerProps, {
							class: 'absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none',
						}),
						!1,
						!0,
					),
					d.style.setProperty(
						'font-variation-settings',
						"'FILL' 1, 'wght' 600, 'opsz' 20",
					),
					ce(
						f,
						ne(() => i().positionerProps, {
							class: 'z-10 -mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
						}),
						!1,
						!0,
					),
					H(
						f,
						L(vn, {
							get when() {
								return t().length > 0
							},
							get children() {
								const p = nl()
								return (
									ce(
										p,
										ne(() => i().contentProps),
										!1,
										!0,
									),
									H(
										p,
										L(Co, {
											get each() {
												return t()
											},
											children: (m, h) => {
												const g = M(() =>
													i().getOptionState({
														label: m.label,
														value: m.label,
														index: h(),
														disabled: m.disabled,
													}),
												)
												return (() => {
													const b = ol(),
														v = b.firstChild
													return (
														ce(
															b,
															ne(
																() =>
																	i().getOptionProps({
																		label: m.label,
																		value: m.label,
																		index: h(),
																		disabled: m.disabled,
																	}),
																{
																	get class() {
																		return he(
																			'relative cursor-pointer select-none text-black py-2 pl-3 pr-9',
																			g()?.focused &&
																				'bg-primary-500 text-white',
																			g().checked &&
																				'font-black',
																		)
																	},
																},
															),
															!1,
															!0,
														),
														H(v, () => m.label),
														H(
															b,
															(() => {
																const O = M(() => !!g().checked)
																return () =>
																	O() &&
																	(() => {
																		const C = il()
																		return (
																			C.firstChild.style.setProperty(
																				'font-variation-settings',
																				"'FILL' 1, 'wght' 600, 'opsz' 20",
																			),
																			Q(() =>
																				pe(
																					C,
																					he(
																						'absolute inset-y-0 right-0 flex items-center pr-2',
																						g()
																							?.focused &&
																							'text-white',
																					),
																				),
																			),
																			C
																		)
																	})()
															})(),
															null,
														),
														b
													)
												})()
											},
										}),
									),
									p
								)
							},
						}),
					),
					s
				)
			})()
		)
	},
	al = Z(
		'<div><div><div class="flex flex-shrink-0 items-center"><p class="text-md font-black">The Good Book',
	),
	ll = Z('<div><div><p class="text-sm text-gray-500 font-black">Geneza 1'),
	cl = Z('<nav><div>'),
	[ke, ul] = J(!1),
	$t = 'transition-none ease-in duration-400',
	fl = () => {
		const [e, t] = J(0),
			n = M(() => (e() ? `${e()}px` : 'unset'))
		return (() => {
			const r = al(),
				o = r.firstChild
			return (
				o.firstChild,
				xr((i) => t(i.clientHeight), r),
				H(
					o,
					L(sl, {
						options: [
							{ label: 'Geneza', disabled: !1 },
							{ label: 'Exod', disabled: !1 },
							{ label: 'Leviticul', disabled: !1 },
							{ label: 'Judecători', disabled: !1 },
						],
						defaultValue: 'Geneza',
					}),
					null,
				),
				Q(
					(i) => {
						const s = ke() ? '0px' : n(),
							a = he($t, ke() && 'opacity-0'),
							l = he(
								'flex flex-col sm:flex-row gap-6 pt-6 pb-4 sm:py-0 sm:h-16 justify-between items-center',
							)
						return (
							s !== i._v$ &&
								((i._v$ = s) != null
									? r.style.setProperty('max-height', s)
									: r.style.removeProperty('max-height')),
							a !== i._v$2 && pe(r, (i._v$2 = a)),
							l !== i._v$3 && pe(o, (i._v$3 = l)),
							i
						)
					},
					{ _v$: void 0, _v$2: void 0, _v$3: void 0 },
				),
				r
			)
		})()
	},
	dl = () => {
		const [e, t] = J(null),
			[n, r] = J(0)
		ot(() => {
			ke() && !n() && r(e().clientHeight)
		})
		const o = M(() => (n() ? `${n()}px` : 'unset'))
		return (() => {
			const i = ll(),
				s = i.firstChild
			return (
				xr((a) => t(a), i),
				Q(
					(a) => {
						const l = ke() ? o() : '0px',
							c = he($t, !ke() && 'opacity-0'),
							u = he('flex place-content-center py-2')
						return (
							l !== a._v$4 &&
								((a._v$4 = l) != null
									? i.style.setProperty('max-height', l)
									: i.style.removeProperty('max-height')),
							c !== a._v$5 && pe(i, (a._v$5 = c)),
							u !== a._v$6 && pe(s, (a._v$6 = u)),
							a
						)
					},
					{ _v$4: void 0, _v$5: void 0, _v$6: void 0 },
				),
				i
			)
		})()
	},
	pl = () => (
		kt(() => {
			window.addEventListener('scroll', (e) => {
				const t = window.scrollY
				!!t !== ke() && ul(!!t)
			})
		}),
		(() => {
			const e = cl(),
				t = e.firstChild
			return (
				H(t, L(fl, {}), null),
				H(t, L(dl, {}), null),
				Q(
					(n) => {
						const r = he(
								'z-10 sticky top-0 bg-offWhite dark:bg-gray-800 mx-auto w-full max-w-3xl px-6 lg:px-8',
								$t,
							),
							o = he(
								'border-b border-black dark:border-b-whiteOnDark',
								$t,
								ke() && 'border-gray-200',
							)
						return (
							r !== n._v$7 && pe(e, (n._v$7 = r)),
							o !== n._v$8 && pe(t, (n._v$8 = o)),
							n
						)
					},
					{ _v$7: void 0, _v$8: void 0 },
				),
				e
			)
		})()
	),
	hl = Z('<span>'),
	cr = {
		20: 'w-5 h-5 text-[20px]',
		24: 'w-5 h-5 text-[24px]',
		40: 'w-5 h-5 text-[40px]',
		48: 'w-5 h-5 text-[48px]',
	},
	gl = (e) => {
		const t = e.size ? cr[e.size] : cr[20]
		return (() => {
			const n = hl()
			return (
				H(n, () => e.name),
				Q(
					(r) => {
						const o = he(
								'material-symbols-sharp',
								!e.inline && t,
								e.class,
							),
							i = `'FILL' 1, 'wght' 600, 'opsz' ${e.size || 20}`
						return (
							o !== r._v$ && pe(n, (r._v$ = o)),
							i !== r._v$2 &&
								((r._v$2 = i) != null
									? n.style.setProperty('font-variation-settings', i)
									: n.style.removeProperty('font-variation-settings')),
							r
						)
					},
					{ _v$: void 0, _v$2: void 0 },
				),
				n
			)
		})()
	},
	ml = Z(
		'<div class="z-20 fixed top-0 left-0 w-full h-full bg-offWhite dark:bg-gray-900 animate-fade-in opacity-0 ">',
	),
	bl = Z('<span class="inline-flex items-center">Made with <!> in Moldova by'),
	yl = Z(
		'<a href="https://github.com/dalandcap" target="_blank" class="font-bold">&commat;landCap',
	),
	vl = Z(
		'<div class="text-base flex flex-col h-fit min-h-[100vh] text-black bg-offWhite dark:text-whiteOnDark dark:bg-gray-800"><div class="flex-grow mx-auto w-full max-w-3xl px-6 lg:px-8"></div><footer class="flex place-content-center my-16 sm:my-24">',
	),
	wl = ({ children: e }) => [
		(() => {
			const t = ml()
			return t.style.setProperty('pointer-events', 'none'), t
		})(),
		(() => {
			const t = vl(),
				n = t.firstChild,
				r = n.nextSibling
			return (
				H(t, L(pl, {}), n),
				H(n, e),
				H(
					r,
					L(en, {
						component: 'p',
						class: 'text-xs text-gray-500',
						get children() {
							return [
								(() => {
									const o = bl(),
										i = o.firstChild,
										s = i.nextSibling
									return (
										s.nextSibling,
										H(
											o,
											L(gl, {
												name: 'favorite',
												inline: !0,
												class: 'mx-1 text-sm leading-[1]',
											}),
											s,
										),
										o
									)
								})(),
								' ',
								yl(),
							]
						},
					}),
				),
				t
			)
		})(),
	],
	xl = () =>
		L(wl, {
			get children() {
				return L(Ti, {
					get children() {
						return L($i, { path: '/', component: ai })
					},
				})
			},
		}),
	El = document.getElementById('root')
No(
	() =>
		L(Li, {
			get children() {
				return L(xl, {})
			},
		}),
	El,
)
