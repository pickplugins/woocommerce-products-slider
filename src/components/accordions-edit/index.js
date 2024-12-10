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
import PGDropdown from "../dropdown";
import PGStyles from "../styles";
import PGtab from "../tab";
import PGtabs from "../tabs";

var myStore = wp.data.select("postgrid-shop");

function Html(props) {
	if (!props.warn) {
		return null;
	}

	var onChange = props.onChange;

	var breakPointX = "Desktop";

	var defaultPostData = {
		sliderFor: "products",

		wrapper: {
			options: {
				class: "pg-content-slider",
			},
			styles: {},
		},
		itemsWrap: {
			options: {
				tag: "div",
				class: "pg-content-slider-item",
			},
			styles: {},
		},
		item: {
			options: {
				tag: "div",
				class: "pg-content-slider-item",
			},
			styles: {},
		},

		sliderOptions: {
			perPage: "3",
			perMove: "1",
			autoplay: "1",
			gap: "1em",
			pagination: "1",
			drag: "1",
			arrows: "1",
			pauseOnHover: "1",
			speed: "400",
		},

		navsWrap: {
			options: {
				class: "nav-wrap",
			},
			styles: {
				display: {
					Desktop: "flex",
				},
				width: {
					Desktop: "100%",
				},
				alignItems: {
					Desktop: "center",
				},
				position: {
					Desktop: "absolute !important",
				},
				top: {
					Desktop: "10px",
				},
				left: {
					Desktop: "20px",
				},
				gap: {
					Desktop: "20px",
				},
			},
		},
		prev: {
			options: {
				text: "Prev",
				class: "",
			},
			styles: {
				fontSize: {
					Desktop: "18px",
				},
				fontFamily: {
					Desktop: "Poppins",
				},
				fontStyle: {
					Desktop: "normal",
				},
				fontWeight: {
					Desktop: "400",
				},
				textAlign: {
					Desktop: "left",
				},
				color: {
					Desktop: "#ffffff",
				},
				backgroundColor: {
					Desktop: "#1F2E45",
				},
				borderRadius: {
					Desktop: "50px",
				},
				padding: {
					Desktop: "5px 20px 5px 20px",
				},
			},
		},
		prevIcon: {
			options: {
				position: "before",
				class: "",
				library: "fontAwesome",
				srcType: "class",
				iconSrc: "fas fa-chevron-left",
			},
			styles: {
				padding: {
					Desktop: "0px 10px 0px 0px",
				},
				fontSize: {
					Desktop: "16px",
				},
			},
		},
		next: {
			options: {
				text: "Next",
				class: "",
			},
			styles: {
				fontSize: {
					Desktop: "18px",
				},
				fontFamily: {
					Desktop: "Poppins",
				},
				fontStyle: {
					Desktop: "normal",
				},
				fontWeight: {
					Desktop: "400",
				},
				textAlign: {
					Desktop: "right",
				},
				color: {
					Desktop: "#ffffff",
				},
				backgroundColor: {
					Desktop: "#1F2E45",
				},
				borderRadius: {
					Desktop: "50px",
				},
				padding: {
					Desktop: "5px 20px 5px 20px",
				},
			},
		},
		nextIcon: {
			options: {
				position: "after",
				class: "",
				library: "fontAwesome",
				srcType: "class",
				iconSrc: "fas fa-chevron-right",
			},
			styles: {
				padding: {
					Desktop: "0px 0px 0px 10px",
				},
				fontSize: {
					Desktop: "16px",
				},
			},
		},
		paginationWrap: {
			options: {
				tag: "ul",
				class: "",
			},
			styles: {},
		},
		pagination: {
			options: {
				tag: "span",
				class: "",
			},
			styles: {
				border: {
					Desktop: "1px solid #1f2e45",
				},
				backgroundColor: {
					Desktop: "#f1f7f9",
				},
				height: {
					Desktop: "15px",
				},
				width: {
					Desktop: "15px",
				},
				borderRadius: {
					Desktop: "50%",
				},
			},
		},
		paginationActive: {
			options: {
				class: "",
			},
			styles: {
				backgroundColor: {
					Desktop: "#1f2e45",
				},
			},
		},
	};

	var accordionDataX =
		props.accordionData.post_content == null ||
			props.accordionData.post_content.length == 0
			? defaultPostData
			: props.accordionData;

	var [accordionData, setaccordionData] = useState(accordionDataX); // Using the hook.
	var [wrapper, setwrapper] = useState(accordionData.wrapper); // Using the hook.
	var [itemsWrap, setitemsWrap] = useState(defaultPostData.itemsWrap);
	var [headerActive, setheaderActive] = useState(defaultPostData.headerActive);
	var [item, setitem] = useState(defaultPostData.item);
	var [sliderOptions, setsliderOptions] = useState(
		defaultPostData.sliderOptions
	);
	var [prev, setprev] = useState(defaultPostData.prev);
	var [next, setnext] = useState(defaultPostData.next);
	var [prevIcon, setprevIcon] = useState(defaultPostData.prevIcon);
	var [nextIcon, setnextIcon] = useState(defaultPostData.nextIcon);
	var [paginationWrap, setpaginationWrap] = useState(
		defaultPostData.paginationWrap
	);
	var [paginationActive, setpaginationActive] = useState(
		defaultPostData.paginationActive
	);
	var [pagination, setpagination] = useState(defaultPostData.pagination);
	var [iconToggle, seticonToggle] = useState(defaultPostData.iconToggle);
	var [blockCssY, setblockCssY] = useState(defaultPostData.blockCssY);

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

	var wrapperSelector = "." + wrapper.options.class;
	var itemsWrapSelector = "." + itemsWrap.options.class;
	// var headerActiveSelector = "." + headerActive.options.class;
	// var itemSelector = "." + item.options.class;
	// var prevSelector = "." + prev.options.class;
	// var nextSelector = "." + next.options.class;
	// var prevIconSelector = "." + prevIcon.options.class;
	// var nextIconSelector = "." + nextIcon.options.class;
	// var paginationWrapSelector = "." + paginationWrap.options.class;
	// var paginationActiveSelector = "." + paginationActive.options.class;
	// var paginationSelector = "." + pagination.options.class;
	// var iconToggleSelector = "." + iconToggle.options.class;

	var blockId = "";

	useEffect(() => { }, [blockCssY]);

	var RemoveSliderArg = function ({ index }) {
		return (
			<span
				className="cursor-pointer hover:bg-red-500 hover:text-white "
				onClick={(ev) => {
					var sliderOptionsX = { ...sliderOptions };
					delete sliderOptionsX[index];
					setsliderOptions(sliderOptionsX);
					// setAttributes({ sliderOptions: sliderOptionsX });
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
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					itemsWrapSelector // Replace this selector if needed
				);
			}
		});
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

	//////////wrapper//////////
	// function onChangeStyleWrapper(sudoScource, newVal, attr) {
	// 	var path = [sudoScource, attr, breakPointX];
	// 	let obj = { ...wrapper };
	// 	const object = myStore.updatePropertyDeep(obj, path, newVal);
	// 	setwrapper(object);
	// }

	// function onAddStyleWrapper(sudoScource, key) {
	// 	var path = [sudoScource, key, breakPointX];
	// 	let obj = { ...wrapper };
	// 	const object = myStore.addPropertyDeep(obj, path, "");
	// 	setwrapper(object);
	// }

	// function onResetWrapper(sudoSources) {
	// 	let obj = Object.assign({}, wrapper);
	// 	Object.entries(sudoSources).map((args) => {
	// 		var sudoScource = args[0];
	// 		if (obj[sudoScource] == undefined) {
	// 		} else {
	// 			obj[sudoScource] = {};
	// 			var elementSelector = myStore.getElementSelector(
	// 				sudoScource,
	// 				wrapperSelector
	// 			);
	// 		}
	// 	});
	// 	setwrapper(obj);
	// }

	// function onRemoveStyleWrapper(sudoScource, key) {
	// 	let obj = { ...wrapper };
	// 	var object = myStore.deletePropertyDeep(obj, [
	// 		sudoScource,
	// 		key,
	// 		breakPointX,
	// 	]);
	// 	var isEmpty =
	// 		Object.entries(object[sudoScource][key]).length == 0 ? true : false;
	// 	var objectX = isEmpty
	// 		? myStore.deletePropertyDeep(object, [sudoScource, key])
	// 		: object;
	// 	setwrapper(objectX);
	// }
	// //////////itemsWrap//////////
	// function onChangeStyleitemsWrap(sudoScource, newVal, attr) {
	// 	var path = [sudoScource, attr, breakPointX];
	// 	let obj = { ...itemsWrap };
	// 	const object = myStore.updatePropertyDeep(obj, path, newVal);
	// 	setitemsWrap(object);
	// }

	// function onAddStyleitemsWrap(sudoScource, key) {
	// 	var path = [sudoScource, key, breakPointX];
	// 	let obj = { ...itemsWrap };
	// 	const object = myStore.addPropertyDeep(obj, path, "");
	// 	setitemsWrap(object);
	// }

	// function onResetitemsWrap(sudoSources) {
	// 	let obj = Object.assign({}, itemsWrap);
	// 	Object.entries(sudoSources).map((args) => {
	// 		var sudoScource = args[0];
	// 		if (obj[sudoScource] == undefined) {
	// 		} else {
	// 			obj[sudoScource] = {};
	// 			var elementSelector = myStore.getElementSelector(
	// 				sudoScource,
	// 				itemsWrapSelector
	// 			);
	// 		}
	// 	});
	// 	setitemsWrap(obj);
	// }

	// function onRemoveStyleitemsWrap(sudoScource, key) {
	// 	let obj = { ...itemsWrap };
	// 	var object = myStore.deletePropertyDeep(obj, [
	// 		sudoScource,
	// 		key,
	// 		breakPointX,
	// 	]);
	// 	var isEmpty =
	// 		Object.entries(object[sudoScource][key]).length == 0 ? true : false;
	// 	var objectX = isEmpty
	// 		? myStore.deletePropertyDeep(object, [sudoScource, key])
	// 		: object;
	// 	setitemsWrap(objectX);
	// }

	// function onBulkAddText(sudoScource, cssObj) {
	// 	let obj = Object.assign({}, text);
	// 	obj[sudoScource] = cssObj;

	// 	setAttributes({ text: obj });

	// 	var selector = myStore.getElementSelector(sudoScource, textSelector);
	// 	var stylesObj = {};

	// 	Object.entries(cssObj).map((args) => {
	// 		var attr = args[0];
	// 		var cssPropty = myStore.cssAttrParse(attr);

	// 		if (stylesObj[selector] == undefined) {
	// 			stylesObj[selector] = {};
	// 		}

	// 		if (stylesObj[selector][cssPropty] == undefined) {
	// 			stylesObj[selector][cssPropty] = {};
	// 		}

	// 		stylesObj[selector][cssPropty] = args[1];
	// 	});

	// 	var cssItems = { ...blockCssY.items };
	// 	var cssItemsX = { ...cssItems, ...stylesObj };

	// 	setAttributes({ blockCssY: { items: cssItemsX } });
	// }

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
	// var sliderOptionsArgsRes = {
	// 	rewind: { label: "Rewind", value: 0 },
	// 	speed: { label: "Speed", value: 400 },
	// 	rewindSpeed: { label: "Rewind Speed", value: 400 },
	// 	rewindByDrag: { label: "Rewind By Drag", value: 0 },
	// 	width: { label: "Width", value: "" },
	// 	height: { label: "Height", value: "" },
	// 	fixedWidth: { label: "Fixed Width", value: "" },
	// 	fixedHeight: { label: "Fixed Height", value: "" },
	// 	heightRatio: { label: "Height Ratio", value: "" },
	// 	perPage: { label: "Per Page", value: 3 },
	// 	perMove: { label: "Per Move", value: 3 },
	// 	focus: { label: "Focus", value: "center" },
	// 	gap: { label: "Gap", value: "1em", unit: "em", number: "1" },
	// 	padding: { label: "Padding", value: "" },
	// 	arrows: { label: "Arrows", value: 1 },
	// 	pagination: { label: "Pagination", value: 1 },
	// 	paginationKeyboard: { label: "Pagination Keyboard", value: 1 },
	// 	paginationDirection: {
	// 		label: "Pagination Direction",
	// 		value: "paginationDirectltrion",
	// 	},
	// 	drag: { label: "Drag", value: 1 },
	// 	snap: { label: "Snap", value: 1 },
	// 	keyboard: { label: "Keyboard", value: 1 },
	// 	direction: { label: "Direction", value: "ltr" },
	// 	easing: { label: "Easing", value: "cubic-bezier(0.25, 1, 0.5, 1)" },
	// };

	return (
		<div className="">
			{props.accordionData.post_content == null && (
				<div className="p-3 text-center">Please select WCPS first</div>
			)}
			<div className="fixed top-20 right-0 w-[400px] z-50">
				<>
					<code>{JSON.stringify(wrapper)}</code>
				</>
				<>
					<code>{JSON.stringify(itemsWrap)}</code>
				</>
				<>
					<code>{JSON.stringify(item)}</code>
				</>
				<>
					<code>{JSON.stringify(prev)}</code>
				</>
				<>
					<code>{JSON.stringify(next)}</code>
				</>
				<>
					<code>{JSON.stringify(paginationWrap)}</code>
				</>
				<>
					<code>{JSON.stringify(paginationActive)}</code>
				</>
				<>
					<code className="break-words">{JSON.stringify(sliderOptions)}</code>
				</>
			</div>
			{props.accordionData.post_content != null && (
				<>
					<PanelBody
						className="font-medium text-slate-900 "
						title="Wrapper"
						initialOpen={false}>
						<PGtabs
							activeTab="options"
							orientation="horizontal"
							activeClass="active-tab"
							onSelect={(tabName) => { }}
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
							<PGtab name="options"></PGtab>
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
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>
					<PanelBody
						className="font-medium text-slate-900 "
						title="Loop Item"
						initialOpen={false}>
						<PGtabs
							activeTab="options"
							orientation="horizontal"
							activeClass="active-tab"
							onSelect={(tabName) => { }}
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
							<PGtab name="options"></PGtab>
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
							onSelect={(tabName) => { }}
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
							<PGtab name="options"></PGtab>
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
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>
					<PanelBody
						className="font-medium text-slate-900 "
						title="Prev Button"
						initialOpen={false}>
						<PGtabs
							activeTab="options"
							orientation="horizontal"
							activeClass="active-tab"
							onSelect={(tabName) => { }}
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
							<PGtab name="options"></PGtab>
							<PGtab name="styles">
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
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>
					<PanelBody
						className="font-medium text-slate-900 "
						title="Next Button"
						initialOpen={false}>
						<PGtabs
							activeTab="options"
							orientation="horizontal"
							activeClass="active-tab"
							onSelect={(tabName) => { }}
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
							<PGtab name="options"></PGtab>
							<PGtab name="styles">
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
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>
					<PanelBody
						className="font-medium text-slate-900 "
						title="Prev Icon"
						initialOpen={false}>
						<PGtabs
							activeTab="options"
							orientation="horizontal"
							activeClass="active-tab"
							onSelect={(tabName) => { }}
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
							<PGtab name="options"></PGtab>
							<PGtab name="styles">
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
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>
					<PanelBody
						className="font-medium text-slate-900 "
						title="Next Icon"
						initialOpen={false}>
						<PGtabs
							activeTab="options"
							orientation="horizontal"
							activeClass="active-tab"
							onSelect={(tabName) => { }}
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
							<PGtab name="options"></PGtab>
							<PGtab name="styles">
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
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>
					<PanelBody
						className="font-medium text-slate-900 "
						title="Pagination Wrap"
						initialOpen={false}>
						<PGtabs
							activeTab="options"
							orientation="horizontal"
							activeClass="active-tab"
							onSelect={(tabName) => { }}
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
							<PGtab name="options"></PGtab>
							<PGtab name="styles">
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
										onResetStyle(sudoSources, paginationWrap, setpaginationWrap)
									}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>
					<PanelBody
						className="font-medium text-slate-900 "
						title="Pagination"
						initialOpen={false}>
						<PGtabs
							activeTab="options"
							orientation="horizontal"
							activeClass="active-tab"
							onSelect={(tabName) => { }}
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
							<PGtab name="options"></PGtab>
							<PGtab name="styles">
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
										onRemoveStyle(sudoScource, key, pagination, setpagination)
									}
									onReset={(sudoSources) =>
										onResetStyle(sudoSources, pagination, setpagination)
									}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>
					<PanelBody
						className="font-medium text-slate-900 "
						title="Icon Toggle"
						initialOpen={false}>
						<PGtabs
							activeTab="options"
							orientation="horizontal"
							activeClass="active-tab"
							onSelect={(tabName) => { }}
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
							<PGtab name="options"></PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={iconToggle}
									onChange={(sudoScource, newVal, attr) =>
										onChangeStyle(
											sudoScource,
											newVal,
											attr,
											iconToggle,
											seticonToggle
										)
									}
									onAdd={(sudoScource, key) =>
										onAddStyle(sudoScource, key, iconToggle, seticonToggle)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(sudoScource, key, iconToggle, seticonToggle)
									}
									onReset={(sudoSources) =>
										onResetStyle(sudoSources, iconToggle, seticonToggle)
									}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>

					<PanelBody
						className="font-medium text-slate-900 "
						title="Slider Settings"
						initialOpen={false}>
						<div>
							<PanelRow>
								<div className="flex items-center">
									<span>{__("Autoplay?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={""}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => { }}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("Rewind?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={""}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => { }}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("Interval?", "post-grid")}</span>
								</div>
								<InputControl
									value={""}
									type="number"
									onChange={(newVal) => { }}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("Speed?", "post-grid")}</span>
								</div>
								<InputControl
									value={""}
									type="number"
									onChange={(newVal) => { }}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("Rewind Speed?", "post-grid")}</span>
								</div>
								<InputControl
									value={""}
									type="number"
									onChange={(newVal) => { }}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("Start?", "post-grid")}</span>
								</div>
								<InputControl
									value={""}
									type="number"
									onChange={(newVal) => { }}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{"Per Page?"}</span>
								</div>
								<InputControl
									value={""}
									type="number"
									onChange={(newVal) => { }}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("Per Move?", "post-grid")}</span>
								</div>
								<InputControl
									value={""}
									type="number"
									onChange={(newVal) => { }}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("Gap?", "post-grid")}</span>
								</div>
								<InputControl value={""} onChange={(newVal) => { }} />
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("Padding?", "post-grid")}</span>
								</div>
								<InputControl value={""} onChange={(newVal) => { }} />
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("Focus?", "post-grid")}</span>
								</div>
								<InputControl value={""} onChange={(newVal) => { }} />
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("Width?", "post-grid")}</span>
								</div>
								<InputControl value={""} onChange={(newVal) => { }} />
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("Height?", "post-grid")}</span>
								</div>
								<InputControl value={""} onChange={(newVal) => { }} />
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("Fixed Width?", "post-grid")}</span>
								</div>
								<InputControl value={""} onChange={(newVal) => { }} />
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("Fixed Height?", "post-grid")}</span>
								</div>
								<InputControl value={""} onChange={(newVal) => { }} />
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("Height Ratio?", "post-grid")}</span>
								</div>
								<InputControl value={""} onChange={(newVal) => { }} />
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("Pause On Hover?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={""}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => { }}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("Pause On Focus?", "post-grid")}</span>
								</div>

								<SelectControl
									label=""
									value={""}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => { }}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("Rewind By Drag?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={""}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => { }}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("Auto Width?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={""}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => { }}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("Auto Height?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={""}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => { }}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("Navigation?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={""}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => { }}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("Pagination?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={""}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => { }}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("Pagination Keyboard?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={""}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => { }}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("Drag?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={""}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => { }}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("Snap?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={""}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => { }}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("No Drag?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={""}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => { }}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("Pagination Direction?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={""}
									options={[
										{ label: "ltr", value: "ltr" },
										{ label: "rtl", value: "rtl" },
										{ label: "ttb", value: "ttb" },
									]}
									onChange={(newVal) => { }}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("Direction?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={""}
									options={[
										{ label: "ltr", value: "ltr" },
										{ label: "rtl", value: "rtl" },
										{ label: "ttb", value: "ttb" },
									]}
									onChange={(newVal) => { }}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("LazyLoad?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={""}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
										{
											label: __("Nearby", "post-grid"),
											value: "nearby",
										},
										{
											label: __("Sequential", "post-grid"),
											value: "sequential",
										},
									]}
									onChange={(newVal) => { }}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("Keyboard?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={""}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
										{
											label: __("Global", "post-grid"),
											value: "global",
										},
										{
											label: __("Focused", "post-grid"),
											value: "focused",
										},
									]}
									onChange={(newVal) => { }}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("Media Query?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={""}
									options={[
										{ label: "min", value: "min" },
										{ label: "max", value: "max" },
									]}
									onChange={(newVal) => { }}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("Wheel?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={""}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => { }}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">
									<span>{__("Cover?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={""}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => { }}
								/>
							</PanelRow>
						</div>
					</PanelBody>
					<PanelBody
						className="font-medium text-slate-900 "
						title="Slider Settings"
						initialOpen={false}>
						<PGtab name="normal">
							<PanelRow className="my-3">
								<label>{__("Slider Options", "post-grid")}</label>
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
								{__("Copy", "post-grid")}
							</button>
							<button
								onClick={() => {
									pasteData();
								}}
								className="pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-700 !text-white font-medium !rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-600">
								<Icon icon={pages} className="fill-white " size={14} />
								{__("Paste", "post-grid")}
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
													<span>{__("Autoplay?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
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
													<span>{__("Rewind?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "type" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("Slider Type?", "post-grid")}</span>
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
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "interval" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("Interval?", "post-grid")}</span>
												</div>
												<InputControl
													value={value}
													type="number"
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "speed" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("Speed?", "post-grid")}</span>
												</div>
												<InputControl
													value={value}
													type="number"
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "rewindSpeed" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("Rewind Speed?", "post-grid")}</span>
												</div>
												<InputControl
													value={value}
													type="number"
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "start" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("Start?", "post-grid")}</span>
												</div>
												<InputControl
													value={value}
													type="number"
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "perPage" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("Per Page?", "post-grid")}</span>
												</div>
												<InputControl
													value={value}
													type="number"
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "perMove" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("Per Move?", "post-grid")}</span>
												</div>
												<InputControl
													value={value}
													type="number"
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "gap" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("Gap?", "post-grid")}</span>
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
															setAttributes({
																sliderOptions: sliderOptionsX,
															});
														}}
													/>
													<select
														value={unit}
														onChange={(e) => {
															const newUnit = e.target.value;
															setUnit(newUnit);
															var sliderOptionsX = { ...sliderOptions };
															sliderOptionsX[id] = `${number}${newUnit}`;
															setAttributes({
																sliderOptions: sliderOptionsX,
															});
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
													<span>{__("Padding?", "post-grid")}</span>
												</div>
												<InputControl
													value={value}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "focus" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("Focus?", "post-grid")}</span>
												</div>
												<InputControl
													value={value}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "width" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("Width?", "post-grid")}</span>
												</div>
												<InputControl
													value={value}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "height" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("Height?", "post-grid")}</span>
												</div>
												<InputControl
													value={value}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "fixedWidth" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("Fixed Width?", "post-grid")}</span>
												</div>
												<InputControl
													value={value}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "fixedHeight" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("Fixed Height?", "post-grid")}</span>
												</div>
												<InputControl
													value={value}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "heightRatio" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("Height Ratio?", "post-grid")}</span>
												</div>
												<InputControl
													value={value}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "easing" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("Easing?", "post-grid")}</span>
												</div>
												<InputControl
													value={value}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "pauseOnHover" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("Pause On Hover?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "pauseOnFocus" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("Pause On Focus?", "post-grid")}</span>
												</div>
												<label for="" className="font-medium text-slate-900 ">
													?
												</label>
												<SelectControl
													label=""
													value={value}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "rewindByDrag" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("Rewind By Drag?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "autoWidth" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("Auto Width?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "autoHeight" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("Auto Height?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "arrows" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("Navigation?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "pagination" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("Pagination?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "paginationKeyboard" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("Pagination Keyboard?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "drag" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("Drag?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "snap" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("Snap?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "noDrag" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("noDrag?", "post-grid")}</span>
												</div>
												<InputControl
													value={value}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "paginationDirection" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>
														{__("Pagination Direction?", "post-grid")}
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
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "direction" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("Direction?", "post-grid")}</span>
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
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "lazyLoad" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("LazyLoad?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
														{
															label: __("Nearby", "post-grid"),
															value: "nearby",
														},
														{
															label: __("Sequential", "post-grid"),
															value: "sequential",
														},
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "keyboard" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("Keyboard?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
														{
															label: __("Global", "post-grid"),
															value: "global",
														},
														{
															label: __("Focused", "post-grid"),
															value: "focused",
														},
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "mediaQuery" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("Media Query?", "post-grid")}</span>
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
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "wheel" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("Wheel?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "cover" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("Cover?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...sliderOptions };
														sliderOptionsX[id] = newVal;
														setAttributes({
															sliderOptions: sliderOptionsX,
														});
													}}
												/>
											</PanelRow>
										)}
									</div>
								);
							})}
						</PGtab>
						<div>
							{/* <PGtab name="responsive">
							<PanelRow className="my-3">
								<label>{__("Slider Options", "post-grid")}</label>
								<PGDropdown
									position="bottom right"
									variant="secondary"
									buttonTitle={"Choose"}
									options={sliderOptionsArgsRes}
									onChange={(option, index) => {
										var sliderOptionsResX = { ...sliderOptionsRes };
										if (sliderOptionsResX[index] == undefined) {
											sliderOptionsResX[index] = {};
										}
										if (sliderOptionsResX[index][breakPointX] == undefined) {
											sliderOptionsResX[index][breakPointX] = option.value;
										}
										setAttributes({ sliderOptionsRes: sliderOptionsResX });
									}}
									values=""></PGDropdown>
								<IconToggle
									position="bottom"
									variant="secondary"
									iconList={breakPointList}
									buttonTitle="Break Point Switch"
									// onChange={onChangeBreakPoint}
									activeIcon={breakPoints[breakPointX].icon}
									value={breakPointX}
								/>
							</PanelRow>
							{Object.entries(sliderOptionsRes).map((item, index) => {
								var id = item[0];
								var value = item[1];
								return (
									<div key={index}>
										{id == "autoplay" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Autoplay?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
													]}
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "rewind" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Rewind?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
													]}
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "interval" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Interval?", "post-grid")}</span>
												</div>
												<InputControl
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													type="number"
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "speed" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Speed?", "post-grid")}</span>
												</div>
												<InputControl
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													type="number"
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "rewindSpeed" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Rewind Speed?", "post-grid")}</span>
												</div>
												<InputControl
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													type="number"
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "start" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Start?", "post-grid")}</span>
												</div>
												<InputControl
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													type="number"
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "perPage" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{"Per Page?"}</span>
												</div>
												<InputControl
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													type="number"
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "perMove" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Per Move?", "post-grid")}</span>
												</div>
												<InputControl
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													type="number"
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "gap" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Gap?", "post-grid")}</span>
												</div>
												<InputControl
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "padding" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Padding?", "post-grid")}</span>
												</div>
												<InputControl
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "focus" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Focus?", "post-grid")}</span>
												</div>
												<InputControl
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "width" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Width?", "post-grid")}</span>
												</div>
												<InputControl
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "height" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Height?", "post-grid")}</span>
												</div>
												<InputControl
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "fixedWidth" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Fixed Width?", "post-grid")}</span>
												</div>
												<InputControl
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "fixedHeight" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Fixed Height?", "post-grid")}</span>
												</div>
												<InputControl
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "heightRatio" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Height Ratio?", "post-grid")}</span>
												</div>
												<InputControl
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "pauseOnHover" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Pause On Hover?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
													]}
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "pauseOnFocus" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Pause On Focus?", "post-grid")}</span>
												</div>
												<label for="" className="font-medium text-slate-900 ">
													?
												</label>
												<SelectControl
													label=""
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
													]}
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "rewindByDrag" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Rewind By Drag?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
													]}
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "autoWidth" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Auto Width?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
													]}
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "autoHeight" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Auto Height?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
													]}
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "arrows" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Navigation?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
													]}
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "pagination" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Pagination?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
													]}
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "paginationKeyboard" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Pagination Keyboard?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
													]}
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "drag" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Drag?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
													]}
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "snap" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Snap?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
													]}
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "noDrag" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("No Drag?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
													]}
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "paginationDirection" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Pagination Direction?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													options={[
														{ label: "ltr", value: "ltr" },
														{ label: "rtl", value: "rtl" },
														{ label: "ttb", value: "ttb" },
													]}
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "direction" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Direction?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													options={[
														{ label: "ltr", value: "ltr" },
														{ label: "rtl", value: "rtl" },
														{ label: "ttb", value: "ttb" },
													]}
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "lazyLoad" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("LazyLoad?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
														{
															label: __("Nearby", "post-grid"),
															value: "nearby",
														},
														{
															label: __("Sequential", "post-grid"),
															value: "sequential",
														},
													]}
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "keyboard" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Keyboard?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
														{
															label: __("Global", "post-grid"),
															value: "global",
														},
														{
															label: __("Focused", "post-grid"),
															value: "focused",
														},
													]}
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "mediaQuery" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Media Query?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													options={[
														{ label: "min", value: "min" },
														{ label: "max", value: "max" },
													]}
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "wheel" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Wheel?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
													]}
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "cover" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArgRes index={id} />
													<span>{__("Cover?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={
														value[breakPointX] == undefined
															? ""
															: value[breakPointX]
													}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
													]}
													onChange={(newVal) => {
														var sliderOptionsResX = { ...sliderOptionsRes };
														if (sliderOptionsResX[id][breakPointX] == undefined) {
															sliderOptionsResX[id][breakPointX] = "";
														}
														sliderOptionsResX[id][breakPointX] = newVal;
														setAttributes({
															sliderOptionsRes: sliderOptionsResX,
														});
													}}
												/>
											</PanelRow>
										)}
									</div>
								);
							})}
						</PGtab> */}
						</div>
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
								onSelect={(tabName) => { }}
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
								onSelect={(tabName) => { }}
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
						title="Navigation"
						initialOpen={false}>
						<div>
							<PGtabs
								activeTab="presets"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => { }}
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
						title="Pagination/Dots"
						initialOpen={false}>
						<div>
							<PGtabs
								activeTab="presets"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => { }}
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
		var { onChange, accordionData } = this.props;

		return (
			<Html
				onChange={onChange}
				accordionData={accordionData}
				warn={this.state.showWarning}
				isLoaded={this.state.isLoaded}
			/>
		);
	}
}

export default AccordionsEdit;
