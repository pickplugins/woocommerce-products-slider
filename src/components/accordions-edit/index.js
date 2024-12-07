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
				class: "wrapper",
			},
			styles: {
				color: {
					Desktop: "#000000",
				},
			},
		},

		sliderSettings: {

		},
		navigationWrap: {
			options: {
				preset: "",
			},
			styles: {
				display: {
					Desktop: "flex",
				},
				alignItems: {
					Desktop: "center",
				},
				color: {
					Desktop: "#000000",
				},
				backgroundColor: {
					Desktop: "#000000",
				},
				padding: {
					Desktop: "#000000",
				},
			},
		},
		navigationItem: {
			options: {
				preset: "",
			},
			styles: {
				display: {
					Desktop: "flex",
				},
				alignItems: {
					Desktop: "center",
				},
				color: {
					Desktop: "#000000",
				},
				backgroundColor: {
					Desktop: "#000000",
				},
				padding: {
					Desktop: "#000000",
				},
			},
		},









		paginationWrap: {
			options: {
				preset: "",
			},
			styles: {
				display: {
					Desktop: "flex",
				},
				alignItems: {
					Desktop: "center",
				},
				color: {
					Desktop: "#000000",
				},
				backgroundColor: {
					Desktop: "#000000",
				},
				padding: {
					Desktop: "#000000",
				},
				padding: {
					Desktop: "#000000",
				},
			},
		},
		paginationItem: {
			styles: {
				color: {
					Desktop: "#000000",
				},
				backgroundColor: {
					Desktop: "#000000",
				},
				padding: {
					Desktop: "#000000",
				},
				padding: {
					Desktop: "#000000",
				},
			},
		},
		paginationItemActive: {
			styles: {
				backgroundColor: {
					Desktop: "#000000",
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
	var [header, setheader] = useState(defaultPostData.header);
	var [headerActive, setheaderActive] = useState(defaultPostData.headerActive);
	var [headerLabel, setheaderLabel] = useState(defaultPostData.headerLabel);
	var [labelIcon, setlabelIcon] = useState(defaultPostData.labelIcon);
	var [labelCounter, setlabelCounter] = useState(defaultPostData.labelCounter);
	var [content, setcontent] = useState(defaultPostData.content);
	var [icon, seticon] = useState(defaultPostData.icon);
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

		var elementSelector = myStore.getElementSelector(sudoScource, wrapperSelector);
		var cssPropty = myStore.cssAttrParse(attr);



		let itemsX = Object.assign({}, blockCssY.items);

		if (itemsX[elementSelector] == undefined) {
			itemsX[elementSelector] = {};
		}



		var cssPath = [elementSelector, cssPropty, breakPointX];
		const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);



		setblockCssY({ items: cssItems });
	}

	// function onRemoveStyleText(sudoScource, key) {
	// 	let obj = { ...text };
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
	// 	setAttributes({ text: objectX });

	// 	var elementSelector = myStore.getElementSelector(sudoScource, textSelector);
	// 	var cssPropty = myStore.cssAttrParse(key);
	// 	var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
	// 		elementSelector,
	// 		cssPropty,
	// 		breakPointX,
	// 	]);

	// 	var isEmptyX = cssObject[cssPropty] == undefined ? false : true;
	// 	var cssObjectX = isEmptyX
	// 		? myStore.deletePropertyDeep(cssObject, [cssPropty])
	// 		: cssObject;

	// 	setAttributes({ blockCssY: { items: cssObjectX } });
	// }

	// function onAddStyleText(sudoScource, key) {
	// 	var path = [sudoScource, key, breakPointX];
	// 	//let objX = Object.assign({}, text);
	// 	let obj = { ...text };

	// 	const object = myStore.addPropertyDeep(obj, path, "");
	// 	setAttributes({ text: object });
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

	// function onResetText(sudoSources) {
	// 	let obj = Object.assign({}, text);

	// 	Object.entries(sudoSources).map((args) => {
	// 		var sudoScource = args[0];
	// 		if (obj[sudoScource] == undefined) {
	// 		} else {
	// 			obj[sudoScource] = {};
	// 			var elementSelector = myStore.getElementSelector(
	// 				sudoScource,
	// 				textSelector
	// 			);

	// 			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
	// 				elementSelector,
	// 			]);
	// 			setAttributes({ blockCssY: { items: cssObject } });
	// 		}
	// 	});

	// 	setAttributes({ text: obj });
	// }



	return (
		<div className="">



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



				</div>







			</PanelBody>
			<PanelBody
				className="font-medium text-slate-900 "
				title="Navigations"
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



				</div>







			</PanelBody>
			<PanelBody
				className="font-medium text-slate-900 "
				title="Pagination/Dots"
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



				</div>







			</PanelBody>


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
