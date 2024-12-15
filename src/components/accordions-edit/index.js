const { Component, RawHTML, useState, useEffect } = wp.element;
import { __ } from "@wordpress/i18n";

import {
	Icon,
	__experimentalInputControl as InputControl,
	PanelBody,
	PanelRow,
	SelectControl,
} from "@wordpress/components";
import { brush, close, settings } from "@wordpress/icons";

import breakPoints from "../../breakpoints";
import AccordionsLayouts from "../accordions-layouts";
import PGDropdown from "../dropdown";
import PGIconPicker from "../icon-picker";
import PGinputText from "../input-text";
import PGStyles from "../styles";
import PGtab from "../tab";
import PGtabs from "../tabs";

var myStore = wp.data.select("postgrid-shop");

function Html(props) {
	if (!props.warn) {
		return null;
	}

	var onChange = props.onChange;
	var postData = props.postData;

	var breakPointX = "Desktop";

	if (postData.post_content == null) {
		return (
			<div className="p-3 my-5 bg-orange-400">Please choose an WCPS first.</div>
		);
	}

	var [wcpsData, setwcpsData] = useState(postData?.post_content); // Using the hook.

	var [styleObj, setstyleObj] = useState({}); // Using the hook.

	var [loopLayout, setloopLayout] = useState(wcpsData.loopLayout); // Using the hook.
	var [wrapper, setwrapper] = useState(wcpsData.wrapper); // Using the hook.
	var [itemsWrap, setitemsWrap] = useState(wcpsData.itemsWrap);
	var [item, setitem] = useState(wcpsData.item);
	var [sliderOptions, setsliderOptions] = useState(wcpsData.sliderOptions);
	var [navsWrap, setnavsWrap] = useState(wcpsData.navsWrap);
	var [prev, setprev] = useState(wcpsData.prev);
	var [next, setnext] = useState(wcpsData.next);
	var [prevIcon, setprevIcon] = useState(wcpsData.prevIcon);
	var [nextIcon, setnextIcon] = useState(wcpsData.nextIcon);
	var [paginationWrap, setpaginationWrap] = useState(wcpsData.paginationWrap);
	var [paginationActive, setpaginationActive] = useState(
		wcpsData.paginationActive
	);
	var [pagination, setpagination] = useState(wcpsData.pagination);

	const gapValue = sliderOptions?.gap || "0px";
	const [number, setNumber] = useState(parseInt(gapValue));
	const [unit, setUnit] = useState(gapValue.replace(number, ""));

	var breakPointList = [{ label: "Select..", icon: "", value: "" }];
	for (var x in breakPoints) {
		var breakPointItem = breakPoints[x];
		breakPointList.push({
			label: breakPointItem.name,
			icon: breakPointItem.icon,
			value: breakPointItem.id,
		});
	}

	var blockClass = ".wcps-content-slider";

	var wrapperSelector = blockClass + " .splide";
	var itemsWrapSelector = blockClass + " .splide__track";
	var itemSelector = blockClass + " .wcps-content-slider-item";
	var nextSelector = blockClass + " .splide__arrow--next";
	var prevSelector = blockClass + " .splide__arrow--prev";
	var nextIconSelector = blockClass + " .splide__arrow--next .icon";
	var prevIconSelector = blockClass + " .splide__arrow--prev .icon";
	var navsWrapSelector = blockClass + " .splide__arrows";
	var paginationWrapSelector = blockClass + " .splide__pagination";
	var paginationSelector = blockClass + " .splide__pagination__page";
	var paginationActiveSelector =
		blockClass + " .splide__pagination__page.is-active";

	var blockId = postData.ID;

	function getElementSelector(sudoScource, mainSelector) {
		var elementSelector = mainSelector;
		if (sudoScource == "styles") {
			elementSelector = mainSelector;
		} else if (sudoScource == "hover") {
			elementSelector = mainSelector + ":hover";
		} else if (sudoScource == "after") {
			elementSelector = mainSelector + "::after";
		} else if (sudoScource == "before") {
			elementSelector = mainSelector + "::before";
		} else if (sudoScource == "first-child") {
			elementSelector = mainSelector + ":first-child";
		} else if (sudoScource == "last-child") {
			elementSelector = mainSelector + ":last-child";
		} else if (sudoScource == "visited") {
			elementSelector = mainSelector + ":visited";
		} else if (sudoScource == "selection") {
			elementSelector = mainSelector + "::selection";
		} else if (sudoScource == "first-letter") {
			elementSelector = mainSelector + "::first-letter";
		} else if (sudoScource == "first-line") {
			elementSelector = mainSelector + "::first-line";
		} else {
			elementSelector = mainSelector + ":" + sudoScource;
		}
		return elementSelector;
	}
	function cssAttrParse(key) {
		var cssProp = "";
		if (key == "alignContent") {
			cssProp = "align-content";
		} else if (key == "alignItems") {
			cssProp = "align-items";
		} else if (key == "animationName") {
			cssProp = "animation-name";
		} else if (key == "alignSelf") {
			cssProp = "align-self";
		} else if (key == "aspectRatio") {
			cssProp = "aspect-ratio";
		} else if (key == "backfaceVisibility") {
			cssProp = "backface-visibility";
		} else if (key == "backgroundAttachment") {
			cssProp = "background-attachment";
		} else if (key == "backgroundBlendMode") {
			cssProp = "background-blend-mode";
		} else if (key == "backgroundClip") {
			cssProp = "background-clip";
		} else if (key == "bgColor") {
			cssProp = "background-color";
		} else if (key == "backgroundColor") {
			cssProp = "background-color";
		} else if (key == "backgroundOrigin") {
			cssProp = "background-origin";
		} else if (key == "backgroundRepeat") {
			cssProp = "background-repeat";
		} else if (key == "backgroundSize") {
			cssProp = "background-size";
		} else if (key == "backgroundPosition") {
			cssProp = "background-position";
		} else if (key == "backgroundImage") {
			cssProp = "background-image";
		} else if (key == "border") {
			cssProp = "border";
		} else if (key == "borderTop") {
			cssProp = "border-top";
		} else if (key == "borderRight") {
			cssProp = "border-right";
		} else if (key == "borderBottom") {
			cssProp = "border-bottom";
		} else if (key == "borderLeft") {
			cssProp = "border-left";
		} else if (key == "borderRadius") {
			cssProp = "border-radius";
		} else if (key == "borderCollapse") {
			cssProp = "border-collapse";
		} else if (key == "borderSpacing") {
			cssProp = "border-spacing";
		} else if (key == "borderImage") {
			cssProp = "border-image";
		} else if (key == "boxShadow") {
			cssProp = "box-shadow";
		} else if (key == "backdropFilter") {
			cssProp = "backdrop-filter";
		} else if (
			key == "bottom" ||
			key == "top" ||
			key == "left" ||
			key == "right" ||
			key == "clear" ||
			key == "color" ||
			key == "filter" ||
			key == "float"
		) {
			cssProp = key;
		} else if (key == "boxSizing") {
			cssProp = "box-sizing";
		} else if (key == "cursor") {
			cssProp = "cursor";
		} else if (key == "content") {
			cssProp = "content";
		} else if (key == "counterIncrement") {
			cssProp = "counter-increment";
		} else if (key == "counterReset") {
			cssProp = "counter-reset";
		} else if (key == "counterSet") {
			cssProp = "counter-set";
		} else if (key == "columnCount") {
			cssProp = "column-count";
		} else if (key == "columnRule") {
			cssProp = "column-rule";
		} else if (key == "direction") {
			cssProp = "direction";
		} else if (key == "fontFamily") {
			cssProp = "font-family";
		} else if (key == "fontSize") {
			cssProp = "font-size";
		} else if (key == "fontStyle") {
			cssProp = "font-style";
		} else if (key == "fontStretch") {
			cssProp = "font-stretch";
		} else if (key == "fontWeight") {
			cssProp = "font-weight";
		} else if (key == "fontVariantCaps") {
			cssProp = "font-variant-caps";
		} else if (key == "flexWrap") {
			cssProp = "flex-wrap";
		} else if (key == "flexDirection") {
			cssProp = "flex-direction";
		} else if (key == "flexGrow") {
			cssProp = "flex-grow";
		} else if (key == "flexShrink") {
			cssProp = "flex-shrink";
		} else if (key == "flexBasis") {
			cssProp = "flex-basis";
		} else if (key == "flexFlow") {
			cssProp = "flex-flow";
		} else if (key == "letterSpacing") {
			cssProp = "letter-spacing";
		} else if (key == "gridAutoFlow") {
			cssProp = "grid-auto-flow";
		} else if (key == "gridColumnEnd") {
			cssProp = "grid-column-end";
		} else if (key == "gridColumnStart") {
			cssProp = "grid-column-start";
		} else if (key == "gridRowEnd") {
			cssProp = "grid-row-end";
		} else if (key == "gridRowStart") {
			cssProp = "grid-row-start";
		} else if (key == "gridTemplateColumns") {
			cssProp = "grid-template-columns";
		} else if (key == "gridTemplateRows") {
			cssProp = "grid-template-rows";
		} else if (key == "listStyle") {
			cssProp = "list-style";
		} else if (key == "lineHeight") {
			cssProp = "line-height";
		} else if (key == "justifyContent") {
			cssProp = "justify-content";
		} else if (key == "maskImage") {
			cssProp = "mask-image";
		} else if (key == "objectFit") {
			cssProp = "object-fit";
		} else if (key == "opacity") {
			cssProp = "opacity";
		} else if (key == "outline") {
			cssProp = "outline";
		} else if (key == "order") {
			cssProp = "order";
		} else if (key == "outlineOffset") {
			cssProp = "outline-offset";
		} else if (key == "position") {
			cssProp = "position";
		} else if (key == "textIndent") {
			cssProp = "text-indent";
		} else if (key == "textJustify") {
			cssProp = "text-justify";
		} else if (key == "textTransform") {
			cssProp = "text-transform";
		} else if (key == "textDecoration") {
			cssProp = "text-decoration";
		} else if (key == "textOverflow") {
			cssProp = "text-overflow";
		} else if (key == "textShadow") {
			cssProp = "text-shadow";
		} else if (key == "textAlign") {
			cssProp = "text-align";
		} else if (key == "visibility") {
			cssProp = "visibility";
		} else if (key == "wordBreak") {
			cssProp = "word-break";
		} else if (key == "wordSpacing") {
			cssProp = "word-spacing";
		} else if (key == "zIndex") {
			cssProp = "z-index";
		} else if (key == "padding") {
			cssProp = "padding";
		} else if (key == "paddingTop") {
			cssProp = "padding-top";
		} else if (key == "paddingRight") {
			cssProp = "padding-right";
		} else if (key == "paddingBottom") {
			cssProp = "padding-bottom";
		} else if (key == "paddingLeft") {
			cssProp = "padding-left";
		} else if (key == "placeItems") {
			cssProp = "place-items";
		} else if (key == "margin") {
			cssProp = "margin";
		} else if (key == "marginTop") {
			cssProp = "margin-top";
		} else if (key == "marginRight") {
			cssProp = "margin-right";
		} else if (key == "marginBottom") {
			cssProp = "margin-bottom";
		} else if (key == "marginLeft") {
			cssProp = "margin-left";
		} else if (key == "display") {
			cssProp = "display";
		} else if (key == "width") {
			cssProp = "width";
		} else if (key == "height") {
			cssProp = "height";
		} else if (key == "verticalAlign") {
			cssProp = "vertical-align";
		} else if (key == "overflow") {
			cssProp = "overflow";
		} else if (key == "overflowX") {
			cssProp = "overflow-x";
		} else if (key == "overflowY") {
			cssProp = "overflow-y";
		} else if (key == "writingMode") {
			cssProp = "writing-mode";
		} else if (key == "wordWrap") {
			cssProp = "word-wrap";
		} else if (key == "perspective") {
			cssProp = "perspective";
		} else if (key == "minWidth") {
			cssProp = "min-width";
		} else if (key == "minHeight") {
			cssProp = "min-height";
		} else if (key == "maxHeight") {
			cssProp = "max-height";
		} else if (key == "maxWidth") {
			cssProp = "max-width";
		} else if (key == "transition") {
			cssProp = "transition";
		} else if (key == "transform") {
			cssProp = "transform";
		} else if (key == "transformOrigin") {
			cssProp = "transform-origin";
		} else if (key == "transformStyle") {
			cssProp = "transform-style";
		} else if (key == "tableLayout") {
			cssProp = "table-layout";
		} else if (key == "emptyCells") {
			cssProp = "empty-cells";
		} else if (key == "captionSide") {
			cssProp = "caption-side";
		} else if (key == "gap") {
			cssProp = "gap";
		} else if (key == "rowGap") {
			cssProp = "row-gap";
		} else if (key == "columnGap") {
			cssProp = "column-gap";
		} else if (key == "userSelect") {
			cssProp = "user-select";
		} else if (key == "-webkit-text-fill-color") {
			cssProp = "-webkit-text-fill-color";
		} else {
			cssProp = key;
		}
		return cssProp;
	}

	function generateElementCss(obj, elementSelector) {
		var cssObj = {};

		Object.entries(obj).map((args) => {
			var sudoSrc = args[0];
			var sudoArgs = args[1];
			if (sudoSrc != "options" && sudoArgs != null) {
				var selector = getElementSelector(sudoSrc, elementSelector);
				Object.entries(args[1]).map((x) => {
					var attr = x[0];
					var propVal = x[1];
					var cssPropty = cssAttrParse(attr);
					var found = Object.entries(propVal).reduce(
						(a, [k, v]) => (v ? ((a[k] = v), a) : a),
						{}
					);

					if (Object.keys(found).length > 0) {
						if (cssObj[selector] == undefined) {
							cssObj[selector] = {};
						}
						if (cssObj[selector][cssPropty] == undefined) {
							cssObj[selector][cssPropty] = {};
						}

						cssObj[selector][cssPropty] = x[1];
					}
				});
			}
		});

		return cssObj;
	}

	function generateBlockCss(items) {
		var reponsiveCssGroups = {};
		for (var selector in items) {
			var attrs = items[selector];
			for (var attr in attrs) {
				var breakpoints = attrs[attr];
				for (var device in breakpoints) {
					var attrValue = breakpoints[device];
					if (reponsiveCssGroups[device] == undefined) {
						reponsiveCssGroups[device] = [];
					}
					if (reponsiveCssGroups[device] == undefined) {
						reponsiveCssGroups[device] = [];
					}
					if (reponsiveCssGroups[device][selector] == undefined) {
						reponsiveCssGroups[device][selector] = [];
					}
					if (typeof attrValue == "string") {
						attrValue = attrValue.replaceAll("u0022", '"');
						reponsiveCssGroups[device][selector].push({
							attr: attr,
							val: attrValue,
						});
					}
				}
			}
		}
		var reponsiveCssDesktop = "";
		if (reponsiveCssGroups["Desktop"] != undefined) {
			for (var selector in reponsiveCssGroups["Desktop"]) {
				var attrs = reponsiveCssGroups["Desktop"][selector];
				reponsiveCssDesktop += selector + "{";
				for (var index in attrs) {
					var attr = attrs[index];
					var attrName = attr.attr;
					var attrValue = attr.val;
					reponsiveCssDesktop += attrName + ":" + attrValue + ";";
				}
				reponsiveCssDesktop += "}";
			}
		}
		var reponsiveCssTablet = "";
		if (reponsiveCssGroups["Tablet"] != undefined) {
			reponsiveCssTablet += "@media(max-width: 991px){";
			for (var selector in reponsiveCssGroups["Tablet"]) {
				var attrs = reponsiveCssGroups["Tablet"][selector];
				reponsiveCssTablet += selector + "{";
				for (var index in attrs) {
					var attr = attrs[index];
					var attrName = attr.attr;
					var attrValue = attr.val;
					reponsiveCssTablet += attrName + ":" + attrValue + ";";
				}
				reponsiveCssTablet += "}";
			}
			reponsiveCssTablet += "}";
		}
		var reponsiveCssMobile = "";
		if (reponsiveCssGroups["Mobile"] != undefined) {
			reponsiveCssMobile += "@media(max-width:767px){";
			for (var selector in reponsiveCssGroups["Mobile"]) {
				var attrs = reponsiveCssGroups["Mobile"][selector];
				reponsiveCssMobile += selector + "{";
				for (var index in attrs) {
					var attr = attrs[index];
					var attrName = attr.attr;
					var attrValue = attr.val;
					reponsiveCssMobile += attrName + ":" + attrValue + ";";
				}
				reponsiveCssMobile += "}";
			}
			reponsiveCssMobile += "}";
		}
		var reponsiveCss =
			reponsiveCssDesktop + reponsiveCssTablet + reponsiveCssMobile;

		var wpfooter = document.getElementById("wpfooter");
		var divWrap = document.getElementById("css-block");
		if (divWrap != undefined) {
			document.getElementById("css-block").outerHTML = "";
		}

		var divWrap = '<style id="css-block"></style>';
		wpfooter.insertAdjacentHTML("beforeend", divWrap);
		var csswrappg = document.getElementById("css-block");
		var str = "" + reponsiveCss + "";
		csswrappg.insertAdjacentHTML("beforeend", str);
	}

	useEffect(() => {
		generateBlockCss(styleObj);
	}, [styleObj]);

	function onChangeLayouts(loopLayout) {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.loopLayout = loopLayout;
		setwcpsData(wcpsDataX);
	}

	useEffect(() => {
		var postDataX = { ...postData };
		postDataX.post_content = wcpsData;
		onChange(postDataX);

		var styleObjX = { ...styleObj };

		var wrapperCss = generateElementCss(wcpsData.wrapper, wrapperSelector);
		Object.entries(wrapperCss).map((selectors) => {
			var selector = selectors[0];
			var selectorData = selectors[1];
			styleObjX[selector] = selectorData;
		});

		var itemsWrapCss = generateElementCss(
			wcpsData.itemsWrap,
			itemsWrapSelector
		);
		Object.entries(itemsWrapCss).map((selectors) => {
			var selector = selectors[0];
			var selectorData = selectors[1];
			styleObjX[selector] = selectorData;
		});

		var itemCss = generateElementCss(wcpsData.item, itemSelector);
		Object.entries(itemCss).map((selectors) => {
			var selector = selectors[0];
			var selectorData = selectors[1];
			styleObjX[selector] = selectorData;
		});

		var navsWrapCss = generateElementCss(wcpsData.navsWrap, navsWrapSelector);
		Object.entries(navsWrapCss).map((selectors) => {
			var selector = selectors[0];
			var selectorData = selectors[1];
			styleObjX[selector] = selectorData;
		});

		var prevCss = generateElementCss(wcpsData.prev, prevSelector);
		Object.entries(prevCss).map((selectors) => {
			var selector = selectors[0];
			var selectorData = selectors[1];
			styleObjX[selector] = selectorData;
		});

		var nextCss = generateElementCss(wcpsData.next, nextSelector);
		Object.entries(nextCss).map((selectors) => {
			var selector = selectors[0];
			var selectorData = selectors[1];
			styleObjX[selector] = selectorData;
		});

		var prevIconCss = generateElementCss(wcpsData.prevIcon, prevIconSelector);
		Object.entries(prevIconCss).map((selectors) => {
			var selector = selectors[0];
			var selectorData = selectors[1];
			styleObjX[selector] = selectorData;
		});

		var nextIconCss = generateElementCss(wcpsData.nextIcon, nextIconSelector);
		Object.entries(nextIconCss).map((selectors) => {
			var selector = selectors[0];
			var selectorData = selectors[1];
			styleObjX[selector] = selectorData;
		});

		var paginationWrapCss = generateElementCss(
			wcpsData.paginationWrap,
			paginationWrapSelector
		);

		console.log(paginationWrapCss);

		Object.entries(paginationWrapCss).map((selectors) => {
			var selector = selectors[0];
			var selectorData = selectors[1];
			styleObjX[selector] = selectorData;
		});

		var paginationCss = generateElementCss(
			wcpsData.pagination,
			paginationSelector
		);

		console.log(paginationCss);

		Object.entries(paginationCss).map((selectors) => {
			var selector = selectors[0];
			var selectorData = selectors[1];
			styleObjX[selector] = selectorData;
		});

		var paginationActiveCss = generateElementCss(
			wcpsData.paginationActive,
			paginationActiveSelector
		);

		console.log(paginationActiveCss);

		Object.entries(paginationActiveCss).map((selectors) => {
			var selector = selectors[0];
			var selectorData = selectors[1];
			styleObjX[selector] = selectorData;
		});

		setstyleObj(styleObjX);
	}, [wcpsData]);

	useEffect(() => {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.sliderOptions = sliderOptions;
		setwcpsData(wcpsDataX);
	}, [sliderOptions]);

	useEffect(() => {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.wrapper = wrapper;
		setwcpsData(wcpsDataX);
	}, [wrapper]);

	useEffect(() => {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.itemsWrap = itemsWrap;
		setwcpsData(wcpsDataX);
	}, [itemsWrap]);

	useEffect(() => {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.item = item;
		setwcpsData(wcpsDataX);
	}, [item]);

	useEffect(() => {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.navsWrap = navsWrap;
		setwcpsData(wcpsDataX);
	}, [navsWrap]);

	useEffect(() => {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.prev = prev;
		setwcpsData(wcpsDataX);
	}, [prev]);

	useEffect(() => {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.next = next;
		setwcpsData(wcpsDataX);
	}, [next]);

	useEffect(() => {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.prevIcon = prevIcon;
		setwcpsData(wcpsDataX);
	}, [prevIcon]);

	useEffect(() => {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.nextIcon = nextIcon;
		setwcpsData(wcpsDataX);
	}, [nextIcon]);

	useEffect(() => {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.paginationWrap = paginationWrap;
		setwcpsData(wcpsDataX);
	}, [paginationWrap]);

	useEffect(() => {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.pagination = pagination;
		setwcpsData(wcpsDataX);
	}, [pagination]);
	useEffect(() => {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.paginationActive = paginationActive;
		setwcpsData(wcpsDataX);
	}, [paginationActive]);

	var RemoveSliderArg = function ({ index }) {
		return (
			<span
				className="cursor-pointer hover:bg-red-500 hover:text-white "
				onClick={(ev) => {
					var sliderOptionsX = { ...sliderOptions };
					delete sliderOptionsX[index];
					setsliderOptions(sliderOptionsX);
				}}>
				<Icon icon={close} />
			</span>
		);
	};

	function onChangeStyle(sudoScource, newVal, attr, propertyType, setProperty) {
		var path = [sudoScource, attr, breakPointX];
		let obj = { ...propertyType };
		const object = myStore.updatePropertyDeep(obj, path, newVal);
		setProperty(object);
	}

	function onAddStyle(sudoScource, key, propertyType, setProperty) {
		var path = [sudoScource, key, breakPointX];
		let obj = { ...propertyType };
		const object = myStore.addPropertyDeep(obj, path, "");
		setProperty(object);
	}

	function onResetStyle(sudoSources, propertyType, setProperty) {
		let obj = Object.assign({}, propertyType);
		Object.entries(sudoSources).map((args) => {
			var sudoScource = args[0];
			if (obj[sudoScource] == undefined) {
			} else {
				obj[sudoScource] = {};
				// var elementSelector = myStore.getElementSelector(
				// 	sudoScource,
				// 	itemsWrapSelector // Replace this selector if needed
				// );
			}
		});
		setProperty(obj);
	}

	function onBulkAddStyle(sudoSource, cssObj, propertyType, setProperty) {
		let obj = { ...propertyType };
		obj[sudoSource] = cssObj;
		setProperty(obj);
	}

	function onRemoveStyle(sudoScource, key, propertyType, setProperty) {
		let obj = { ...propertyType };
		var object = myStore.deletePropertyDeep(obj, [
			sudoScource,
			key,
			breakPointX,
		]);
		var isEmpty =
			Object.entries(object[sudoScource][key]).length === 0 ? true : false;
		var objectX = isEmpty
			? myStore.deletePropertyDeep(object, [sudoScource, key])
			: object;
		setProperty(objectX);
	}

	var sliderOptionsArgs = {
		autoplay: { label: "Auto play", value: 1 },
		interval: { label: "Interval", value: "500" },
		pauseOnHover: { label: "Pause On Hover", value: 1 },
		pauseOnFocus: { label: "Pause On Focus", value: 1 },
		lazyLoad: { label: "Lazy Load", value: 1 },
		preloadPages: { label: "Preload Pages", value: 1 },
		keyboard: { label: "Keyboard", value: 1 },
		wheel: { label: "Wheel", value: 1 },
		releaseWheel: { label: "Release Wheel", value: 1 },
		direction: { label: "Direction", value: "ltr" },
		cover: { label: "Cover", value: 0 },
		rewind: { label: "Rewind", value: 0 },
		speed: { label: "Speed", value: 400 },
		rewindSpeed: { label: "Rewind Speed", value: 400 },
		rewindByDrag: { label: "Rewind By Drag", value: 0 },
		type: { label: "Slider Type", value: "slide" },
		width: { label: "Width", value: "" },
		height: { label: "Height", value: "" },
		fixedWidth: { label: "Fixed Width", value: "" },
		fixedHeight: { label: "Fixed Height", value: "" },
		heightRatio: { label: "Height Ratio", value: "" },
		autoWidth: { label: "Auto Width", value: 0 },
		autoHeight: { label: "Auto Height", value: 0 },
		start: { label: "Start", value: 0 },
		perPage: { label: "Per Page", value: 3 },
		perMove: { label: "Per Move", value: 3 },
		focus: { label: "Focus", value: "center" },
		gap: { label: "Gap", value: "1em", unit: "em", number: "1" },
		padding: { label: "Padding", value: "" },
		arrows: { label: "Arrows", value: 1 },
		pagination: { label: "Pagination", value: 1 },
		//easing: { label: 'Easing', value: 'cubic-bezier(0.25, 1, 0.5, 1)' },
		paginationKeyboard: { label: "Pagination Keyboard", value: 1 },
		paginationDirection: {
			label: "Pagination Direction",
			value: "paginationDirectltrion",
		},
		drag: { label: "Drag", value: 1 },
		noDrag: { label: "No Drag", value: "input, textarea, .rich-text" },
		snap: { label: "Snap", value: 1 },
		mediaQuery: { label: "Media Query", value: "max" },
	};

	var sliderForArgs = {
		Products: { label: "Products", value: "products" },
		terms: { label: "Terms", value: "terms" },
		dokanShops: { label: "Dokan Shops", value: "dokanShops" },
	};

	var paginationPresets = [
		{
			label: "Preset 1",
			prams: {
				paginationWrap: {
					styles: { display: { Desktop: "flex" }, gap: { Desktop: "0.5em" } },
				},
				pagination: {
					styles: {
						width: { Desktop: "15px" },
						height: { Desktop: "15px" },
						borderRadius: { Desktop: "20px 20px 20px 20px" },
						backgroundColor: { Desktop: "#9DD6DF" },
					},
				},
				paginationActive: {
					styles: { backgroundColor: { Desktop: "#18978F" } },
				},
			},
		},
		{
			label: "Preset 2",
			prams: {
				paginationWrap: {
					styles: { display: { Desktop: "flex" }, gap: { Desktop: "0.5em" } },
				},
				pagination: {
					styles: {
						width: { Desktop: "20px" },
						height: { Desktop: "20px" },
						borderRadius: { Desktop: "20px 20px 20px 20px" },
						backgroundColor: { Desktop: "#9DD6DF" },
					},
				},
				paginationActive: {
					styles: { backgroundColor: { Desktop: "#18978F" } },
				},
			},
		},
		{
			label: "Preset 3",
			prams: {
				paginationWrap: {
					styles: { display: { Desktop: "flex" }, gap: { Desktop: "0.5em" } },
				},
				pagination: {
					styles: {
						width: { Desktop: "20px" },
						height: { Desktop: "20px" },
						borderRadius: { Desktop: "2px 2px 2px 2px" },
						backgroundColor: { Desktop: "#9DD6DF" },
					},
				},
				paginationActive: {
					styles: { backgroundColor: { Desktop: "#18978F" } },
				},
			},
		},
	];

	var navigationPresets = [
		{
			label: "Preset 1",
			prams: {
				navsWrap: {
					styles: {
						display: { Desktop: "flex" },
						gap: { Desktop: "2em" },
						position: { Desktop: "absolute" },
						top: { Desktop: "0px" },
						right: { Desktop: "0px" },
					},
				},
				prev: {
					styles: {
						borderRadius: { Desktop: "3px 3px 3px 3px" },
						backgroundColor: { Desktop: "#9DD6DF" },
						padding: { Desktop: "8px 15px 8px 15px" },
					},
				},
				next: {
					styles: {
						borderRadius: { Desktop: "3px 3px 3px 3px" },
						backgroundColor: { Desktop: "#9DD6DF" },
						padding: { Desktop: "8px 15px 8px 15px" },
					},
				},
			},
		},
	];

	return (
		<div className="">
			<code className="break-all	p-4 block">
				{JSON.stringify(wcpsData.loopLayout)}
			</code>

			{wcpsData == null && (
				<div className="p-3 text-center">Please select WCPS first</div>
			)}

			{wcpsData != null && (
				<>
					<div className="my-4 p-3">
						<PGDropdown
							position="bottom right"
							variant="secondary"
							buttonTitle={"Slider For"}
							options={sliderForArgs}
							onChange={(option, index) => {
								var sliderOptionsX = { ...sliderOptions };
								sliderOptionsX.sliderFor = option.value;
								setsliderOptions(sliderOptionsX);
							}}
							values=""></PGDropdown>
					</div>

					<PanelBody
						className="font-medium text-slate-900 "
						title="Slider Settings"
						initialOpen={false}>
						<PGtab name="normal">
							<PanelRow className="my-3">
								<label>
									{__("Slider Options", "woocommerce-products-slider")}
								</label>
								<PGDropdown
									position="bottom right"
									variant="secondary"
									buttonTitle={"Choose"}
									options={sliderOptionsArgs}
									onChange={(option, index) => {
										var sliderOptionsX = { ...sliderOptions };
										sliderOptionsX[index] = option.value;
										setsliderOptions(sliderOptionsX);
									}}
									values=""></PGDropdown>
							</PanelRow>
							<PanelRow className="justify-start gap-4 mb-3">
								{/* <button
								onClick={() => {
									copyData(sliderOptions);
								}}
								className="pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-700 !text-white font-medium !rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-600">
								<Icon icon={copy} className="fill-white " size={14} />
								{__("Copy", "woocommerce-products-slider")}
							</button>
							<button
								onClick={() => {
									pasteData();
								}}
								className="pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-700 !text-white font-medium !rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-600">
								<Icon icon={pages} className="fill-white " size={14} />
								{__("Paste", "woocommerce-products-slider")}
							</button> */}
							</PanelRow>
							{Object.entries(sliderOptions).map((item, index) => {
								var id = item[0];
								var value = item[1];
								return (
									<div key={index}>
										{id == "autoplay" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("Autoplay?", "woocommerce-products-slider")}
													</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{
															label: __("True", "woocommerce-products-slider"),
															value: 1,
														},
														{
															label: __("False", "woocommerce-products-slider"),
															value: 0,
														},
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "rewind" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("Rewind?", "woocommerce-products-slider")}
													</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{
															label: __("True", "woocommerce-products-slider"),
															value: 1,
														},
														{
															label: __("False", "woocommerce-products-slider"),
															value: 0,
														},
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "type" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("Slider Type?", "woocommerce-products-slider")}
													</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{ label: "Slide", value: "slide" },
														{ label: "Loop", value: "loop" },
														{ label: "Fade", value: "fade" },
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "interval" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("Interval?", "woocommerce-products-slider")}
													</span>
												</div>
												<InputControl
													value={value}
													type="number"
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "speed" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("Speed?", "woocommerce-products-slider")}
													</span>
												</div>
												<InputControl
													value={value}
													type="number"
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "rewindSpeed" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("Rewind Speed?", "woocommerce-products-slider")}
													</span>
												</div>
												<InputControl
													value={value}
													type="number"
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "start" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("Start?", "woocommerce-products-slider")}
													</span>
												</div>
												<InputControl
													value={value}
													type="number"
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "perPage" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("Per Page?", "woocommerce-products-slider")}
													</span>
												</div>
												<InputControl
													value={value}
													type="number"
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;

														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "perMove" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("Per Move?", "woocommerce-products-slider")}
													</span>
												</div>
												<InputControl
													value={value}
													type="number"
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "gap" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("Gap?", "woocommerce-products-slider")}
													</span>
												</div>
												<div className="flex items-center gap-1 ">
													<input
														type="number"
														value={number}
														className="w-[100px]"
														onChange={(e) => {
															const newNumber = e.target.value;
															setNumber(newNumber);
															var sliderOptionsX = { ...sliderOptions };
															sliderOptionsX[id] = `${newNumber}${unit}`;
															setsliderOptions(sliderOptionsX);
														}}
													/>
													<select
														value={unit}
														onChange={(e) => {
															const newUnit = e.target.value;
															setUnit(newUnit);
															var sliderOptionsX = { ...sliderOptions };
															sliderOptionsX[id] = `${number}${newUnit}`;
															setsliderOptions(sliderOptionsX);
														}}>
														<option value="px">px</option>
														<option value="em">em</option>
														<option value="rem">rem</option>
														<option value="%">%</option>
													</select>
												</div>
											</PanelRow>
										)}
										{id == "padding" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("Padding?", "woocommerce-products-slider")}
													</span>
												</div>
												<InputControl
													value={value}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "focus" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("Focus?", "woocommerce-products-slider")}
													</span>
												</div>
												<InputControl
													value={value}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "width" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("Width?", "woocommerce-products-slider")}
													</span>
												</div>
												<InputControl
													value={value}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "height" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("Height?", "woocommerce-products-slider")}
													</span>
												</div>
												<InputControl
													value={value}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "fixedWidth" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("Fixed Width?", "woocommerce-products-slider")}
													</span>
												</div>
												<InputControl
													value={value}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "fixedHeight" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("Fixed Height?", "woocommerce-products-slider")}
													</span>
												</div>
												<InputControl
													value={value}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "heightRatio" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("Height Ratio?", "woocommerce-products-slider")}
													</span>
												</div>
												<InputControl
													value={value}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "easing" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("Easing?", "woocommerce-products-slider")}
													</span>
												</div>
												<InputControl
													value={value}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "pauseOnHover" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__(
															"Pause On Hover?",
															"woocommerce-products-slider"
														)}
													</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{
															label: __("True", "woocommerce-products-slider"),
															value: 1,
														},
														{
															label: __("False", "woocommerce-products-slider"),
															value: 0,
														},
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "pauseOnFocus" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__(
															"Pause On Focus?",
															"woocommerce-products-slider"
														)}
													</span>
												</div>
												<label for="" className="font-medium text-slate-900 ">
													?
												</label>
												<SelectControl
													label=""
													value={value}
													options={[
														{
															label: __("True", "woocommerce-products-slider"),
															value: 1,
														},
														{
															label: __("False", "woocommerce-products-slider"),
															value: 0,
														},
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "rewindByDrag" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__(
															"Rewind By Drag?",
															"woocommerce-products-slider"
														)}
													</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{
															label: __("True", "woocommerce-products-slider"),
															value: 1,
														},
														{
															label: __("False", "woocommerce-products-slider"),
															value: 0,
														},
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "autoWidth" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("Auto Width?", "woocommerce-products-slider")}
													</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{
															label: __("True", "woocommerce-products-slider"),
															value: 1,
														},
														{
															label: __("False", "woocommerce-products-slider"),
															value: 0,
														},
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "autoHeight" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("Auto Height?", "woocommerce-products-slider")}
													</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{
															label: __("True", "woocommerce-products-slider"),
															value: 1,
														},
														{
															label: __("False", "woocommerce-products-slider"),
															value: 0,
														},
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "arrows" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("Navigation?", "woocommerce-products-slider")}
													</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{
															label: __("True", "woocommerce-products-slider"),
															value: 1,
														},
														{
															label: __("False", "woocommerce-products-slider"),
															value: 0,
														},
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "pagination" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("Pagination?", "woocommerce-products-slider")}
													</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{
															label: __("True", "woocommerce-products-slider"),
															value: 1,
														},
														{
															label: __("False", "woocommerce-products-slider"),
															value: 0,
														},
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "paginationKeyboard" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__(
															"Pagination Keyboard?",
															"woocommerce-products-slider"
														)}
													</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{
															label: __("True", "woocommerce-products-slider"),
															value: 1,
														},
														{
															label: __("False", "woocommerce-products-slider"),
															value: 0,
														},
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "drag" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("Drag?", "woocommerce-products-slider")}
													</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{
															label: __("True", "woocommerce-products-slider"),
															value: 1,
														},
														{
															label: __("False", "woocommerce-products-slider"),
															value: 0,
														},
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "snap" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("Snap?", "woocommerce-products-slider")}
													</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{
															label: __("True", "woocommerce-products-slider"),
															value: 1,
														},
														{
															label: __("False", "woocommerce-products-slider"),
															value: 0,
														},
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "noDrag" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("noDrag?", "woocommerce-products-slider")}
													</span>
												</div>
												<InputControl
													value={value}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "paginationDirection" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__(
															"Pagination Direction?",
															"woocommerce-products-slider"
														)}
													</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{ label: "ltr", value: "ltr" },
														{ label: "rtl", value: "rtl" },
														{ label: "ttb", value: "ttb" },
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "direction" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("Direction?", "woocommerce-products-slider")}
													</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{ label: "ltr", value: "ltr" },
														{ label: "rtl", value: "rtl" },
														{ label: "ttb", value: "ttb" },
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "lazyLoad" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("LazyLoad?", "woocommerce-products-slider")}
													</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{
															label: __("True", "woocommerce-products-slider"),
															value: 1,
														},
														{
															label: __("False", "woocommerce-products-slider"),
															value: 0,
														},
														{
															label: __(
																"Nearby",
																"woocommerce-products-slider"
															),
															value: "nearby",
														},
														{
															label: __(
																"Sequential",
																"woocommerce-products-slider"
															),
															value: "sequential",
														},
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "keyboard" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("Keyboard?", "woocommerce-products-slider")}
													</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{
															label: __("True", "woocommerce-products-slider"),
															value: 1,
														},
														{
															label: __("False", "woocommerce-products-slider"),
															value: 0,
														},
														{
															label: __(
																"Global",
																"woocommerce-products-slider"
															),
															value: "global",
														},
														{
															label: __(
																"Focused",
																"woocommerce-products-slider"
															),
															value: "focused",
														},
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "mediaQuery" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("Media Query?", "woocommerce-products-slider")}
													</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{ label: "min", value: "min" },
														{ label: "max", value: "max" },
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "wheel" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("Wheel?", "woocommerce-products-slider")}
													</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{
															label: __("True", "woocommerce-products-slider"),
															value: 1,
														},
														{
															label: __("False", "woocommerce-products-slider"),
															value: 0,
														},
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
										{id == "cover" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("Cover?", "woocommerce-products-slider")}
													</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{
															label: __("True", "woocommerce-products-slider"),
															value: 1,
														},
														{
															label: __("False", "woocommerce-products-slider"),
															value: 0,
														},
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
									</div>
								);
							})}
						</PGtab>
						<div></div>
					</PanelBody>
					<PanelBody
						className="font-medium text-slate-900 "
						title="Query Items"
						initialOpen={false}>
						<div>
							<PGtabs
								activeTab="presets"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => {}}
								tabs={[
									{
										name: "presets",
										title: "presets",
										icon: settings,
										className: "tab-presets",
									},
									{
										name: "custom",
										title: "Custom",
										icon: brush,
										className: "tab-custom",
									},
								]}>
								<PGtab name="presets"></PGtab>
								<PGtab name="custom"></PGtab>
							</PGtabs>
						</div>
					</PanelBody>

					<PanelBody
						className="font-medium text-slate-900 "
						title="Layouts"
						initialOpen={false}>
						<div>
							<PGtabs
								activeTab="presets"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => {}}
								tabs={[
									{
										name: "presets",
										title: "presets",
										icon: settings,
										className: "tab-presets",
									},
									{
										name: "custom",
										title: "Custom",
										icon: brush,
										className: "tab-custom",
									},
								]}>
								<PGtab name="presets"></PGtab>
								<PGtab name="custom">
									<AccordionsLayouts
										postData={postData}
										onChange={onChangeLayouts}
									/>
								</PGtab>
							</PGtabs>
						</div>
					</PanelBody>

					<PanelBody
						className="font-medium text-slate-900 "
						title="Wrapper"
						initialOpen={false}>
						<PGtabs
							activeTab="options"
							orientation="horizontal"
							activeClass="active-tab"
							onSelect={(tabName) => {}}
							tabs={[
								{
									name: "options",
									title: "Options",
									icon: settings,
									className: "tab-settings",
								},
								{
									name: "styles",
									title: "Styles",
									icon: brush,
									className: "tab-style",
								},
								// {
								// 	name: "css",
								// 	title: "CSS Library",
								// 	icon: mediaAndText,
								// 	className: "tab-css",
								// },
							]}>
							<PGtab name="options">
								<div className="flex  my-5  justify-between items-center">
									<label className="" htmlFor="emailVerification">
										{__("Class", "woocommerce-products-slider")}
									</label>
									<PGinputText
										value={wrapper.options.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
										onChange={(newVal) => {
											var optionsX = {
												...wrapper,
												options: {
													...wrapper.options,
													class: newVal.target.value,
												},
											};
											setwrapper(optionsX);
										}}
									/>
								</div>
							</PGtab>
							<PGtab name="styles">
								{/* <PGStyles
									obj={wrapper}
									onChange={onChangeStyleWrapper}
									onAdd={onAddStyleWrapper}
									onRemove={onRemoveStyleWrapper}
									// onBulkAdd={onBulkAddText}
									onReset={onResetWrapper}
								/> */}
								<PGStyles
									obj={wrapper}
									onChange={(sudoScource, newVal, attr) =>
										onChangeStyle(
											sudoScource,
											newVal,
											attr,
											wrapper,
											setwrapper
										)
									}
									onAdd={(sudoScource, key) =>
										onAddStyle(sudoScource, key, wrapper, setwrapper)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(sudoScource, key, wrapper, setwrapper)
									}
									onReset={(sudoSources) =>
										onResetStyle(sudoSources, wrapper, setwrapper)
									}
									onBulkAdd={(sudoSource, cssObj) =>
										onBulkAddStyle(sudoSource, cssObj, wrapper, setwrapper)
									}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>
					<PanelBody
						className="font-medium text-slate-900 "
						title="Loop Wrap"
						initialOpen={false}>
						<PGtabs
							activeTab="options"
							orientation="horizontal"
							activeClass="active-tab"
							onSelect={(tabName) => {}}
							tabs={[
								{
									name: "options",
									title: "Options",
									icon: settings,
									className: "tab-settings",
								},
								{
									name: "styles",
									title: "Styles",
									icon: brush,
									className: "tab-style",
								},
							]}>
							<PGtab name="options">
								<div className="flex  my-5  justify-between items-center">
									<label className="" htmlFor="emailVerification">
										{__("Class", "woocommerce-products-slider")}
									</label>
									<PGinputText
										value={itemsWrap.options.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
										onChange={(newVal) => {
											var optionsX = {
												...itemsWrap,
												options: {
													...itemsWrap.options,
													class: newVal.target.value,
												},
											};
											setitemsWrap(optionsX);
										}}
									/>
								</div>
							</PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={itemsWrap}
									onChange={(sudoScource, newVal, attr) =>
										onChangeStyle(
											sudoScource,
											newVal,
											attr,
											itemsWrap,
											setitemsWrap
										)
									}
									onAdd={(sudoScource, key) =>
										onAddStyle(sudoScource, key, itemsWrap, setitemsWrap)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(sudoScource, key, itemsWrap, setitemsWrap)
									}
									onReset={(sudoSources) =>
										onResetStyle(sudoSources, itemsWrap, setitemsWrap)
									}
									onBulkAdd={(sudoSource, cssObj) =>
										onBulkAddStyle(sudoSource, cssObj, itemsWrap, setitemsWrap)
									}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>
					<PanelBody
						className="font-medium text-slate-900 "
						title="Item"
						initialOpen={false}>
						<PGtabs
							activeTab="options"
							orientation="horizontal"
							activeClass="active-tab"
							onSelect={(tabName) => {}}
							tabs={[
								{
									name: "options",
									title: "Options",
									icon: settings,
									className: "tab-settings",
								},
								{
									name: "styles",
									title: "Styles",
									icon: brush,
									className: "tab-style",
								},
							]}>
							<PGtab name="options">
								<div className="flex  my-5  justify-between items-center">
									<label className="" htmlFor="emailVerification">
										{__("Class", "woocommerce-products-slider")}
									</label>
									<PGinputText
										value={item.options.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
										onChange={(newVal) => {
											var optionsX = {
												...item,
												options: {
													...item.options,
													class: newVal.target.value,
												},
											};
											setitem(optionsX);
										}}
									/>
								</div>
							</PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={item}
									onChange={(sudoScource, newVal, attr) =>
										onChangeStyle(sudoScource, newVal, attr, item, setitem)
									}
									onAdd={(sudoScource, key) =>
										onAddStyle(sudoScource, key, item, setitem)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(sudoScource, key, item, setitem)
									}
									onReset={(sudoSources) =>
										onResetStyle(sudoSources, item, setitem)
									}
									onBulkAdd={(sudoSource, cssObj) =>
										onBulkAddStyle(sudoSource, cssObj, item, setitem)
									}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>
					<PanelBody
						className="font-medium text-slate-900 "
						title="Navigation"
						initialOpen={false}>
						<div>
							<PGtabs
								activeTab="presets"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => {}}
								tabs={[
									{
										name: "presets",
										title: "presets",
										icon: settings,
										className: "tab-presets",
									},
									{
										name: "custom",
										title: "Custom",
										icon: brush,
										className: "tab-custom",
									},
								]}>
								<PGtab name="presets">
									{navigationPresets.map((preset) => {
										return (
											<div
												onClick={(ev) => {
													var wcpsDataX = { ...wcpsData };
													var navsWrapX = {
														...navsWrap,
														...preset.prams.navsWrap,
													};
													var prevX = { ...prev, ...preset.prams.prev };
													var nextX = { ...next, ...preset.prams.next };

													wcpsDataX.navsWrap = navsWrapX;
													wcpsDataX.prev = prevX;
													wcpsDataX.next = nextX;

													setnavsWrap(navsWrapX);
													setprev(prevX);
													setnext(nextX);
													setwcpsData(wcpsDataX);
												}}>
												{preset.label}
											</div>
										);
									})}

									<div className="flex  my-5  justify-between items-center">
										<label className="" htmlFor="emailVerification">
											{__("Navs Wrap Class", "woocommerce-products-slider")}
										</label>
										<PGinputText
											value={navsWrap.options.class}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...navsWrap,
													options: {
														...navsWrap.options,
														class: newVal.target.value,
													},
												};
												setnavsWrap(optionsX);
											}}
										/>
									</div>
									<div className="flex  my-5  justify-between items-center">
										<label className="" htmlFor="emailVerification">
											{__(
												"Previous Button Class",
												"woocommerce-products-slider"
											)}
										</label>
										<PGinputText
											value={prev.options.class}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...prev,
													options: {
														...prev.options,
														class: newVal.target.value,
													},
												};
												setprev(optionsX);
											}}
										/>
									</div>

									<div className="flex  my-5  justify-between items-center">
										<label className="" htmlFor="emailVerification">
											{__("Next Button Class", "woocommerce-products-slider")}
										</label>
										<PGinputText
											value={next.options.class}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...next,
													options: {
														...next.options,
														class: newVal.target.value,
													},
												};
												setnext(optionsX);
											}}
										/>
									</div>
									<div className="flex  my-5  justify-between items-center">
										<label className="" htmlFor="emailVerification">
											{__("Previous Icon Class", "woocommerce-products-slider")}
										</label>
										<PGinputText
											value={prevIcon.options.class}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...prevIcon,
													options: {
														...prevIcon.options,
														class: newVal.target.value,
													},
												};
												setprevIcon(optionsX);
											}}
										/>
									</div>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Prev Icon", "post-grid")}
										</label>
										<PGIconPicker
											library={prevIcon.options.library}
											srcType={prevIcon.options.srcType}
											iconSrc={prevIcon.options.iconSrc}
											onChange={(arg) => {
												var prevIconX = { ...prevIcon };

												var optionsX = {
													...prevIconX.options,
													srcType: arg.srcType,
													library: arg.library,
													iconSrc: arg.iconSrc,
												};

												prevIconX.options = optionsX;
												setprevIcon(prevIconX);
											}}
										/>
									</PanelRow>
									<div className="flex  my-5  justify-between items-center">
										<label className="" htmlFor="emailVerification">
											{__("Next Icon Class", "woocommerce-products-slider")}
										</label>
										<PGinputText
											value={nextIcon.options.class}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...nextIcon,
													options: {
														...nextIcon.options,
														class: newVal.target.value,
													},
												};
												setnextIcon(optionsX);
											}}
										/>
									</div>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Next Icon", "post-grid")}
										</label>
										<PGIconPicker
											library={nextIcon.options.library}
											srcType={nextIcon.options.srcType}
											iconSrc={nextIcon.options.iconSrc}
											onChange={(arg) => {
												var nextIconX = { ...nextIcon };

												var optionsX = {
													...nextIconX.options,
													srcType: arg.srcType,
													library: arg.library,
													iconSrc: arg.iconSrc,
												};

												nextIconX.options = optionsX;
												setnextIcon(nextIconX);
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="custom">
									<PanelBody
										className="font-medium text-slate-900 "
										title="Navs Wrap"
										initialOpen={false}>
										<PGStyles
											obj={navsWrap}
											onChange={(sudoScource, newVal, attr) =>
												onChangeStyle(
													sudoScource,
													newVal,
													attr,
													navsWrap,
													setnavsWrap
												)
											}
											onAdd={(sudoScource, key) =>
												onAddStyle(sudoScource, key, navsWrap, setnavsWrap)
											}
											onRemove={(sudoScource, key) =>
												onRemoveStyle(sudoScource, key, navsWrap, setnavsWrap)
											}
											onReset={(sudoSources) =>
												onResetStyle(sudoSources, navsWrap, setnavsWrap)
											}
											onBulkAdd={(sudoSource, cssObj) =>
												onBulkAddStyle(
													sudoSource,
													cssObj,
													navsWrap,
													setnavsWrap
												)
											}
										/>
									</PanelBody>
									<PanelBody
										className="font-medium text-slate-900 "
										title="Prev Button"
										initialOpen={false}>
										<PGStyles
											obj={prev}
											onChange={(sudoScource, newVal, attr) =>
												onChangeStyle(sudoScource, newVal, attr, prev, setprev)
											}
											onAdd={(sudoScource, key) =>
												onAddStyle(sudoScource, key, prev, setprev)
											}
											onRemove={(sudoScource, key) =>
												onRemoveStyle(sudoScource, key, prev, setprev)
											}
											onReset={(sudoSources) =>
												onResetStyle(sudoSources, prev, setprev)
											}
											onBulkAdd={(sudoSource, cssObj) =>
												onBulkAddStyle(sudoSource, cssObj, prev, setprev)
											}
										/>
									</PanelBody>
									<PanelBody
										className="font-medium text-slate-900 "
										title="Next Button"
										initialOpen={false}>
										<PGStyles
											obj={next}
											onChange={(sudoScource, newVal, attr) =>
												onChangeStyle(sudoScource, newVal, attr, next, setnext)
											}
											onAdd={(sudoScource, key) =>
												onAddStyle(sudoScource, key, next, setnext)
											}
											onRemove={(sudoScource, key) =>
												onRemoveStyle(sudoScource, key, next, setnext)
											}
											onReset={(sudoSources) =>
												onResetStyle(sudoSources, next, setnext)
											}
											onBulkAdd={(sudoSource, cssObj) =>
												onBulkAddStyle(sudoSource, cssObj, next, setnext)
											}
										/>
									</PanelBody>
									<PanelBody
										className="font-medium text-slate-900 "
										title="Prev Icon"
										initialOpen={false}>
										<PGStyles
											obj={prevIcon}
											onChange={(sudoScource, newVal, attr) =>
												onChangeStyle(
													sudoScource,
													newVal,
													attr,
													prevIcon,
													setprevIcon
												)
											}
											onAdd={(sudoScource, key) =>
												onAddStyle(sudoScource, key, prevIcon, setprevIcon)
											}
											onRemove={(sudoScource, key) =>
												onRemoveStyle(sudoScource, key, prevIcon, setprevIcon)
											}
											onReset={(sudoSources) =>
												onResetStyle(sudoSources, prevIcon, setprevIcon)
											}
											onBulkAdd={(sudoSource, cssObj) =>
												onBulkAddStyle(
													sudoSource,
													cssObj,
													prevIcon,
													setprevIcon
												)
											}
										/>
									</PanelBody>
									<PanelBody
										className="font-medium text-slate-900 "
										title="Next Icon"
										initialOpen={false}>
										<PGStyles
											obj={nextIcon}
											onChange={(sudoScource, newVal, attr) =>
												onChangeStyle(
													sudoScource,
													newVal,
													attr,
													nextIcon,
													setnextIcon
												)
											}
											onAdd={(sudoScource, key) =>
												onAddStyle(sudoScource, key, nextIcon, setnextIcon)
											}
											onRemove={(sudoScource, key) =>
												onRemoveStyle(sudoScource, key, nextIcon, setnextIcon)
											}
											onReset={(sudoSources) =>
												onResetStyle(sudoSources, nextIcon, setnextIcon)
											}
											onBulkAdd={(sudoSource, cssObj) =>
												onBulkAddStyle(
													sudoSource,
													cssObj,
													nextIcon,
													setnextIcon
												)
											}
										/>
									</PanelBody>
								</PGtab>
							</PGtabs>
						</div>
					</PanelBody>
					<PanelBody
						className="font-medium text-slate-900 "
						title="Pagination/Dots"
						initialOpen={false}>
						<div>
							<PGtabs
								activeTab="presets"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => {}}
								tabs={[
									{
										name: "presets",
										title: "presets",
										icon: settings,
										className: "tab-presets",
									},
									{
										name: "custom",
										title: "Custom",
										icon: brush,
										className: "tab-custom",
									},
								]}>
								<PGtab name="presets">
									{paginationPresets.map((preset) => {
										return (
											<div
												onClick={(ev) => {
													var wcpsDataX = { ...wcpsData };
													var paginationWrapX = {
														...paginationWrap,
														...preset.prams.paginationWrap,
													};
													var paginationX = {
														...pagination,
														...preset.prams.pagination,
													};
													var paginationActiveX = {
														...paginationActive,
														...preset.prams.paginationActive,
													};

													wcpsDataX.paginationWrap = paginationWrapX;
													wcpsDataX.pagination = paginationX;
													wcpsDataX.paginationActive = paginationActiveX;

													setpaginationWrap(paginationWrapX);
													setpagination(paginationX);
													setpaginationActive(paginationActiveX);
													setwcpsData(wcpsDataX);
												}}>
												{preset.label}
											</div>
										);
									})}
									<div className="flex  my-5  justify-between items-center">
										<label className="" htmlFor="emailVerification">
											{__(
												"Pagination Wrap Class",
												"woocommerce-products-slider"
											)}
										</label>
										<PGinputText
											value={paginationWrap.options.class}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...paginationWrap,
													options: {
														...paginationWrap.options,
														class: newVal.target.value,
													},
												};
												setpaginationWrap(optionsX);
											}}
										/>
									</div>
									<div className="flex  my-5  justify-between items-center">
										<label className="" htmlFor="emailVerification">
											{__("Pagination Class", "woocommerce-products-slider")}
										</label>
										<PGinputText
											value={pagination.options.class}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...pagination,
													options: {
														...pagination.options,
														class: newVal.target.value,
													},
												};
												setpagination(optionsX);
											}}
										/>
									</div>
									<div className="flex  my-5  justify-between items-center">
										<label className="" htmlFor="emailVerification">
											{__(
												"Pagination Active Class",
												"woocommerce-products-slider"
											)}
										</label>
										<PGinputText
											value={paginationActive.options.class}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...paginationActive,
													options: {
														...paginationActive.options,
														class: newVal.target.value,
													},
												};
												setpaginationActive(optionsX);
											}}
										/>
									</div>
								</PGtab>
								<PGtab name="custom">
									<PanelBody
										className="font-medium text-slate-900 "
										title="Pagination Wrap"
										initialOpen={false}>
										<PGStyles
											obj={paginationWrap}
											onChange={(sudoScource, newVal, attr) =>
												onChangeStyle(
													sudoScource,
													newVal,
													attr,
													paginationWrap,
													setpaginationWrap
												)
											}
											onAdd={(sudoScource, key) =>
												onAddStyle(
													sudoScource,
													key,
													paginationWrap,
													setpaginationWrap
												)
											}
											onRemove={(sudoScource, key) =>
												onRemoveStyle(
													sudoScource,
													key,
													paginationWrap,
													setpaginationWrap
												)
											}
											onReset={(sudoSources) =>
												onResetStyle(
													sudoSources,
													paginationWrap,
													setpaginationWrap
												)
											}
											onBulkAdd={(sudoSource, cssObj) =>
												onBulkAddStyle(
													sudoSource,
													cssObj,
													paginationWrap,
													setpaginationWrap
												)
											}
										/>
									</PanelBody>
									<PanelBody
										className="font-medium text-slate-900 "
										title="Pagination Active"
										initialOpen={false}>
										<PGStyles
											obj={paginationActive}
											onChange={(sudoScource, newVal, attr) =>
												onChangeStyle(
													sudoScource,
													newVal,
													attr,
													paginationActive,
													setpaginationActive
												)
											}
											onAdd={(sudoScource, key) =>
												onAddStyle(
													sudoScource,
													key,
													paginationActive,
													setpaginationActive
												)
											}
											onRemove={(sudoScource, key) =>
												onRemoveStyle(
													sudoScource,
													key,
													paginationActive,
													setpaginationActive
												)
											}
											onReset={(sudoSources) =>
												onResetStyle(
													sudoSources,
													paginationActive,
													setpaginationActive
												)
											}
											onBulkAdd={(sudoSource, cssObj) =>
												onBulkAddStyle(
													sudoSource,
													cssObj,
													paginationActive,
													setpaginationActive
												)
											}
										/>
									</PanelBody>
									<PanelBody
										className="font-medium text-slate-900 "
										title="Pagination"
										initialOpen={false}>
										<PGStyles
											obj={pagination}
											onChange={(sudoScource, newVal, attr) =>
												onChangeStyle(
													sudoScource,
													newVal,
													attr,
													pagination,
													setpagination
												)
											}
											onAdd={(sudoScource, key) =>
												onAddStyle(sudoScource, key, pagination, setpagination)
											}
											onRemove={(sudoScource, key) =>
												onRemoveStyle(
													sudoScource,
													key,
													pagination,
													setpagination
												)
											}
											onReset={(sudoSources) =>
												onResetStyle(sudoSources, pagination, setpagination)
											}
											onBulkAdd={(sudoSource, cssObj) =>
												onBulkAddStyle(sudoSource, cssObj, pagination, setpagination)
											}
										/>
									</PanelBody>
								</PGtab>
							</PGtabs>
						</div>
					</PanelBody>
				</>
			)}
		</div>
	);
}

class AccordionsEdit extends Component {
	constructor(props) {
		super(props);
		this.state = { showWarning: true, isLoaded: false };
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState((state) => ({
				isLoaded: !state.isLoaded,
			}));
		}, 1000);
	}

	handleToggleClick() {
		this.setState((state) => ({
			showWarning: !state.showWarning,
		}));
	}

	render() {
		var { onChange, postData } = this.props;

		return (
			<Html
				onChange={onChange}
				postData={postData}
				warn={this.state.showWarning}
				isLoaded={this.state.isLoaded}
			/>
		);
	}
}

export default AccordionsEdit;
