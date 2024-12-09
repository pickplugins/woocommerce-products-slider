const { Component, RawHTML, useState, useEffect } = wp.element;
import { __ } from "@wordpress/i18n";

import {
	Icon,
	close,
	settings,
	cloud,
	plus,
	brush,
	mediaAndText,
} from "@wordpress/icons";
import { ReactSortable } from "react-sortablejs";
import {
	PanelBody,
	RangeControl,
	Button,
	ButtonGroup,
	Panel,
	PanelRow,
	Dropdown,
	DropdownMenu,
	SelectControl,
	ColorPicker,
	ColorPalette,
	ToolsPanelItem,
	ComboboxControl,
	Spinner,
	CustomSelectControl,
	Popover,
	__experimentalInputControl as InputControl,
} from "@wordpress/components";
import apiFetch from "@wordpress/api-fetch";

import PGtabs from "../tabs";
import PGtab from "../tab";
import PGStyles from "../styles";
import { Pagination } from "aspect-ui";

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
				class: "pg-content-slider"
			},
			styles: {}

		},
		itemsWrap: {

			options: {
				tag: "div",
				class: "pg-content-slider-item"
			},
			styles: {}

		},
		item: {

			options: {
				tag: "div",
				class: "pg-content-slider-item"
			},
			styles: {}

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
			speed: "400"

		},


		navsWrap: {

			options: {
				class: "nav-wrap"
			},
			styles: {
				display: {
					Desktop: "flex"
				},
				width: {
					Desktop: "100%"
				},
				alignItems: {
					Desktop: "center"
				},
				position: {
					Desktop: "absolute !important"
				},
				top: {
					Desktop: "10px"
				},
				left: {
					Desktop: "20px"
				},
				gap: {
					Desktop: "20px"
				}
			}

		},
		prev: {

			options: {
				text: "Prev",
				class: ""
			},
			styles: {
				fontSize: {
					Desktop: "18px"
				},
				fontFamily: {
					Desktop: "Poppins"
				},
				fontStyle: {
					Desktop: "normal"
				},
				fontWeight: {
					Desktop: "400"
				},
				textAlign: {
					Desktop: "left"
				},
				color: {
					Desktop: "#ffffff"
				},
				backgroundColor: {
					Desktop: "#1F2E45"
				},
				borderRadius: {
					Desktop: "50px"
				},
				padding: {
					Desktop: "5px 20px 5px 20px"
				}
			}

		},
		prevIcon: {

			options: {
				position: "before",
				class: "",
				library: "fontAwesome",
				srcType: "class",
				iconSrc: "fas fa-chevron-left"
			},
			styles: {
				padding: {
					Desktop: "0px 10px 0px 0px"
				},
				fontSize: {
					Desktop: "16px"
				}
			}

		},
		next: {

			options: {
				text: "Next",
				class: ""
			},
			styles: {
				fontSize: {
					Desktop: "18px"
				},
				fontFamily: {
					Desktop: "Poppins"
				},
				fontStyle: {
					Desktop: "normal"
				},
				fontWeight: {
					Desktop: "400"
				},
				textAlign: {
					Desktop: "right"
				},
				color: {
					Desktop: "#ffffff"
				},
				backgroundColor: {
					Desktop: "#1F2E45"
				},
				borderRadius: {
					Desktop: "50px"
				},
				padding: {
					Desktop: "5px 20px 5px 20px"
				}
			}

		},
		nextIcon: {

			options: {
				position: "after",
				class: "",
				library: "fontAwesome",
				srcType: "class",
				iconSrc: "fas fa-chevron-right"
			},
			styles: {
				padding: {
					Desktop: "0px 0px 0px 10px"
				},
				fontSize: {
					Desktop: "16px"
				}
			}

		},
		paginationWrap: {

			options: {
				tag: "ul",
				class: ""
			},
			styles: {}

		},
		pagination: {

			options: {
				tag: "span",
				class: ""
			},
			styles: {
				border: {
					Desktop: "1px solid #1f2e45"
				},
				backgroundColor: {
					Desktop: "#f1f7f9"
				},
				height: {
					Desktop: "15px"
				},
				width: {
					Desktop: "15px"
				},
				borderRadius: {
					Desktop: "50%"
				}
			}

		},
		paginationActive: {

			options: {
				class: ""
			},
			styles: {
				backgroundColor: {
					Desktop: "#1f2e45"
				}
			}

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
	var [sliderOptions, setsliderOptions] = useState(defaultPostData.sliderOptions);
	var [prev, setprev] = useState(defaultPostData.prev);
	var [next, setnext] = useState(defaultPostData.next);
	var [prevIcon, setprevIcon] = useState(defaultPostData.prevIcon);
	var [nextIcon, setnextIcon] = useState(defaultPostData.nextIcon);
	var [paginationWrap, setpaginationWrap] = useState(defaultPostData.paginationWrap);
	var [paginationActive, setpaginationActive] = useState(defaultPostData.paginationActive);
	var [pagination, setpagination] = useState(defaultPostData.pagination);
	var [iconToggle, seticonToggle] = useState(defaultPostData.iconToggle);
	var [blockCssY, setblockCssY] = useState(defaultPostData.blockCssY);

	var wrapperSelector = "." + wrapper.options.class;

	var blockId = '';

	useEffect(() => {


	}, [blockCssY]);

	function onChangeStyleWrapper(sudoScource, newVal, attr) {
		var path = [sudoScource, attr, breakPointX];
		let obj = { ...wrapper };
		const object = myStore.updatePropertyDeep(obj, path, newVal);

		setwrapper(object);

		// var elementSelector = myStore.getElementSelector(sudoScource, wrapperSelector);
		// var cssPropty = myStore.cssAttrParse(attr);
		// let itemsX = Object.assign({}, blockCssY.items);

		// if (itemsX[elementSelector] == undefined) {
		// 	itemsX[elementSelector] = {};
		// }
		// var cssPath = [elementSelector, cssPropty, breakPointX];
		// const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

		// setblockCssY({ items: cssItems });
	}



	function onAddStyleWrapper(sudoScource, key) {
		var path = [sudoScource, key, breakPointX];
		let obj = { ...wrapper };

		const object = myStore.addPropertyDeep(obj, path, "");
		setwrapper(object);



	}




	function onResetWrapper(sudoSources) {
		let obj = Object.assign({}, wrapper);

		Object.entries(sudoSources).map((args) => {
			var sudoScource = args[0];
			if (obj[sudoScource] == undefined) {
			} else {
				obj[sudoScource] = {};
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					wrapperSelector
				);

				// var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				// 	elementSelector,
				// ]);
				// setAttributes({ blockCssY: { items: cssObject } });
			}
		});

		setwrapper(obj);
	}



	function onRemoveStyleWrapper(sudoScource, key) {
		let obj = { ...wrapper };
		var object = myStore.deletePropertyDeep(obj, [
			sudoScource,
			key,
			breakPointX,
		]);

		var isEmpty =
			Object.entries(object[sudoScource][key]).length == 0 ? true : false;
		var objectX = isEmpty
			? myStore.deletePropertyDeep(object, [sudoScource, key])
			: object;
		setwrapper(objectX);

		// var elementSelector = myStore.getElementSelector(sudoScource, textSelector);
		// var cssPropty = myStore.cssAttrParse(key);
		// var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
		// 	elementSelector,
		// 	cssPropty,
		// 	breakPointX,
		// ]);

		// var isEmptyX = cssObject[cssPropty] == undefined ? false : true;
		// var cssObjectX = isEmptyX
		// 	? myStore.deletePropertyDeep(cssObject, [cssPropty])
		// 	: cssObject;

		// setAttributes({ blockCssY: { items: cssObjectX } });
	}



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





	return (
		<div className="">

			{JSON.stringify(wrapper)}


			{props.accordionData.post_content == null && (
				<div className="p-3 text-center">Please select WCPS first</div>
			)}
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
							<PGtab name="options">

							</PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={wrapper}
									onChange={onChangeStyleWrapper}
									onAdd={onAddStyleWrapper}
									onRemove={onRemoveStyleWrapper}
									// onBulkAdd={onBulkAddText}
									onReset={onResetWrapper}
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
								// {
								// 	name: "css",
								// 	title: "CSS Library",
								// 	icon: mediaAndText,
								// 	className: "tab-css",
								// },
							]}>
							<PGtab name="options">

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
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>


							<PanelRow>
								<div className="flex items-center">

									<span>{__("Rewind?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={
										""
									}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>{__("Interval?", "post-grid")}</span>
								</div>
								<InputControl
									value={
										""
									}
									type="number"
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>{__("Speed?", "post-grid")}</span>
								</div>
								<InputControl
									value={
										""
									}
									type="number"
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>{__("Rewind Speed?", "post-grid")}</span>
								</div>
								<InputControl
									value={
										""
									}
									type="number"
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>{__("Start?", "post-grid")}</span>
								</div>
								<InputControl
									value={
										""
									}
									type="number"
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>{"Per Page?"}</span>
								</div>
								<InputControl
									value={
										""
									}
									type="number"
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>{__("Per Move?", "post-grid")}</span>
								</div>
								<InputControl
									value={
										""
									}
									type="number"
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>{__("Gap?", "post-grid")}</span>
								</div>
								<InputControl
									value={
										""
									}
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>{__("Padding?", "post-grid")}</span>
								</div>
								<InputControl
									value={
										""
									}
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>{__("Focus?", "post-grid")}</span>
								</div>
								<InputControl
									value={
										""
									}
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>{__("Width?", "post-grid")}</span>
								</div>
								<InputControl
									value={
										""
									}
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>{__("Height?", "post-grid")}</span>
								</div>
								<InputControl
									value={
										""
									}
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>{__("Fixed Width?", "post-grid")}</span>
								</div>
								<InputControl
									value={
										""
									}
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>{__("Fixed Height?", "post-grid")}</span>
								</div>
								<InputControl
									value={
										""
									}
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>{__("Height Ratio?", "post-grid")}</span>
								</div>
								<InputControl
									value={
										""
									}
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>{__("Pause On Hover?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={
										""
									}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>{__("Pause On Focus?", "post-grid")}</span>
								</div>

								<SelectControl
									label=""
									value={
										""
									}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>{__("Rewind By Drag?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={
										""
									}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>{__("Auto Width?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={
										""
									}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>{__("Auto Height?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={
										""
									}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>{__("Navigation?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={
										""
									}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>{__("Pagination?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={
										""
									}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>
										{__("Pagination Keyboard?", "post-grid")}
									</span>
								</div>
								<SelectControl
									label=""
									value={
										""
									}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>{__("Drag?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={
										""
									}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>{__("Snap?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={
										""
									}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>{__("No Drag?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={
										""
									}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>
										{__("Pagination Direction?", "post-grid")}
									</span>
								</div>
								<SelectControl
									label=""
									value={
										""
									}
									options={[
										{ label: "ltr", value: "ltr" },
										{ label: "rtl", value: "rtl" },
										{ label: "ttb", value: "ttb" },
									]}
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>{__("Direction?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={
										""
									}
									options={[
										{ label: "ltr", value: "ltr" },
										{ label: "rtl", value: "rtl" },
										{ label: "ttb", value: "ttb" },
									]}
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>{__("LazyLoad?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={
										""
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

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>{__("Keyboard?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={
										""
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

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>{__("Media Query?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={
										""
									}
									options={[
										{ label: "min", value: "min" },
										{ label: "max", value: "max" },
									]}
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>{__("Wheel?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={
										""
									}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

							<PanelRow>
								<div className="flex items-center">

									<span>{__("Cover?", "post-grid")}</span>
								</div>
								<SelectControl
									label=""
									value={
										""
									}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => {

									}}
								/>
							</PanelRow>

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
								<PGtab name="presets">

								</PGtab>
								<PGtab name="custom">

								</PGtab>
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
								<PGtab name="presets">

								</PGtab>
								<PGtab name="custom">

								</PGtab>
							</PGtabs>



						</div>







					</PanelBody>
					<PanelBody
						className="font-medium text-slate-900 "
						title="Navigations"
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
								<PGtab name="presets">

								</PGtab>
								<PGtab name="custom">

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
								<PGtab name="presets">

								</PGtab>
								<PGtab name="custom">

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
