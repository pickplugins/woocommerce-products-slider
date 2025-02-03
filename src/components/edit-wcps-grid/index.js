const { Component, RawHTML, useState, useEffect } = wp.element;
import apiFetch from "@wordpress/api-fetch";
import { store as coreStore } from "@wordpress/core-data";
import { useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import { ReactSortable } from "react-sortablejs";

import { MediaUpload, RichText } from "@wordpress/block-editor";
import {
	DateTimePicker,
	Icon,
	PanelBody,
	PanelRow,
	Popover,
} from "@wordpress/components";
import {
	addCard,
	brush,
	calendar,
	close,
	copy,
	help,
	menu,
	page,
	pages,
	settings,
	starEmpty,
	starFilled,
} from "@wordpress/icons";
import breakPoints from "../../breakpoints";
import PGDropdown from "../dropdown";
import PGinputSelect from "../input-select";
import PGinputText from "../input-text";
import InputToggle from "../input-toggle";
import WPEditor from "../input-wp-editor";

import LayoutGenerator from "../LayoutGenerator";
import PGcssOpenaiPrompts from "../openai-prompts";
import PGStyles from "../styles";
import PGtab from "../tab";
import PGtabs from "../tabs";

var myStore = wp.data.select("postgrid-shop");

function Html(props) {
	if (!props.warn) {
		return null;
	}

	var onChange = props.onChange;
	var addNotifications = props.addNotifications;
	var setHelp = props.setHelp;

	var postData = props.postData;

	if (postData.post_content == null) {
		return (
			<div className="p-3 my-5 bg-orange-400">
				Please choose an wcps first.
			</div>
		);
	}

	var breakPointX = "Desktop";

	var [wcpsData, setwcpsData] = useState(postData.post_content); // Using the hook.

	var [globalOptions, setglobalOptions] = useState(wcpsData.globalOptions); // Using the hook.

	var [itemQueryArgs, setitemQueryArgs] = useState(wcpsData.itemQueryArgs); // Using the hook.

	var [wrapper, setwrapper] = useState(wcpsData.wrapper); // Using the hook.
	var [loopLayout, setloopLayout] = useState(wcpsData.loopLayout); // Using the hook.
	var [items, setitems] = useState(wcpsData.items); // Using the hook.
	var [content, setcontent] = useState(wcpsData.content);
	var [accOptions, setaccOptions] = useState(wcpsData.accOptions);

	var [itemsWrap, setitemsWrap] = useState(wcpsData.itemsWrap);
	var [itemWrap, setitemWrap] = useState(wcpsData.itemWrap);
	var [paginationWrap, setpaginationWrap] = useState(
		wcpsData.paginationWrap
	);
	var [paginationItem, setpaginationItem] = useState(
		wcpsData.paginationItem
	);
	var [paginationItemActive, setpaginationItemActive] = useState(
		wcpsData.paginationItemActive
	);
	var [labelCounter, setlabelCounter] = useState(wcpsData.labelCounter);
	var [labelIcon, setlabelIcon] = useState(wcpsData.labelIcon);
	var [icon, seticon] = useState(wcpsData.icon);
	var [iconToggle, seticonToggle] = useState(wcpsData.iconToggle);

	var [prev, setprev] = useState(wcpsData?.prev);
	var [prevIcon, setprevIcon] = useState(wcpsData?.prevIcon);
	var [next, setnext] = useState(wcpsData?.next);
	var [nextIcon, setnextIcon] = useState(wcpsData?.nextIcon);
	var [sliderOptions, setsliderOptions] = useState(
		wcpsData?.sliderOptions
	);
	var [sliderOptionsRes, setsliderOptionsRes] = useState(
		wcpsData?.sliderOptionsRes
	);

	var [topWrap, settopWrap] = useState(wcpsData.topWrap);
	var [navsWrap, setnavsWrap] = useState(wcpsData?.navsWrap);
	var [navItem, setnavItem] = useState(wcpsData?.navItem);
	var [activeNavItem, setactiveNavItem] = useState(
		wcpsData?.activeNavItem
	);
	var [navLabel, setnavLabel] = useState(wcpsData?.navLabel);
	var [panelWrap, setpanelWrap] = useState(wcpsData?.panelWrap);
	var [panelWrapActive, setpanelWrapActive] = useState(
		wcpsData?.panelWrapActive
	);

	var [styleObj, setstyleObj] = useState({}); // Using the hook.
	const [taxonomiesObjects, setTaxonomiesObjects] = useState([]);
	var [customerData, setcustomerData] = useState(props.customerData);
	var [datePicker, setdatePicker] = useState(9999999);

	var [isProFeature, setisProFeature] = useState(true);
	var [editLayouts, seteditLayouts] = useState(false); // Using the hook.

	const gapValue = accOptions?.gap || "0px";
	const [number, setNumber] = useState(parseInt(gapValue));
	const [unit, setUnit] = useState(gapValue.replace(number, ""));
	const [itemActive, setitemActive] = useState(99999);
	const [AIautoUpdate, setAIautoUpdate] = useState(false);
	var [AIWriter, setAIWriter] = useState(false); // Using the hook.
	var formattedPrompt =
		"Respond only with question answer as json array and no other text. Do not include any explanations, introductions, or concluding remarks.";

	var breakPointList = [{ label: "Select..", icon: "", value: "" }];
	for (var x in breakPoints) {
		var breakPointItem = breakPoints[x];
		breakPointList.push({
			label: breakPointItem.name,
			icon: breakPointItem.icon,
			value: breakPointItem.id,
		});
	}

	var postTypes = [];
	const postTypesData = useSelect(
		(select) => select(coreStore).getPostTypes({ per_page: -1 }),
		[]
	);
	postTypesData !== null &&
		postTypesData.map((x) => {
			postTypes.push({ value: x.slug, label: x.name });
		});

	useEffect(() => {
		apiFetch({
			path: "/wcps/v2/post_type_objects",
			method: "POST",
			data: { postTypes: [] },
		}).then((res) => {
			var taxonomies = [];
			res.map((item) => {
				taxonomies.push({ label: item.label, value: item.id });
			});
			setTaxonomiesObjects(taxonomies);
		});
	}, []);

	useEffect(() => {
		if (customerData.isPro) {
			setisProFeature(false);
		}
	}, [props.customerData]);

	useEffect(() => {
		onChange(wcpsData);
	}, [wcpsData]);

	useEffect(() => {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.globalOptions = globalOptions;
		setwcpsData(wcpsDataX);
	}, [globalOptions]);

	useEffect(() => {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.itemsWrap = itemsWrap;
		setwcpsData(wcpsDataX);
	}, [itemsWrap]);

	useEffect(() => {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.itemWrap = itemWrap;
		setwcpsData(wcpsDataX);
	}, [itemWrap]);

	useEffect(() => {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.items = items;
		setwcpsData(wcpsDataX);
	}, [items]);

	useEffect(() => {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.wrapper = wrapper;
		setwcpsData(wcpsDataX);
	}, [wrapper]);

	useEffect(() => {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.loopLayout = loopLayout;
		setwcpsData(wcpsDataX);
	}, [loopLayout]);

	useEffect(() => {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.navsWrap = navsWrap;
		setwcpsData(wcpsDataX);
	}, [navsWrap]);

	useEffect(() => {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.navItem = navItem;
		setwcpsData(wcpsDataX);
	}, [navItem]);

	useEffect(() => {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.activeNavItem = activeNavItem;
		setwcpsData(wcpsDataX);
	}, [activeNavItem]);

	useEffect(() => {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.navLabel = navLabel;
		setwcpsData(wcpsDataX);
	}, [navLabel]);

	useEffect(() => {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.panelWrap = panelWrap;
		setwcpsData(wcpsDataX);
	}, [panelWrap]);

	useEffect(() => {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.content = content;
		setwcpsData(wcpsDataX);
	}, [content]);

	useEffect(() => {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.paginationWrap = paginationWrap;
		setwcpsData(wcpsDataX);
	}, [paginationWrap]);

	useEffect(() => {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.paginationItem = paginationItem;
		setwcpsData(wcpsDataX);
	}, [paginationItem]);

	useEffect(() => {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.paginationItemActive = paginationItemActive;
		setwcpsData(wcpsDataX);
	}, [paginationItemActive]);

	useEffect(() => {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.labelCounter = labelCounter;
		setwcpsData(wcpsDataX);
	}, [labelCounter]);

	useEffect(() => {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.labelIcon = labelIcon;
		setwcpsData(wcpsDataX);
	}, [labelIcon]);

	// useEffect(() => {
	// 	var wcpsDataX = { ...wcpsData };
	// 	wcpsDataX.icon = icon;
	// 	setwcpsData(wcpsDataX);
	// }, [icon]);

	// useEffect(() => {
	// 	var wcpsDataX = { ...wcpsData };
	// 	wcpsDataX.iconToggle = iconToggle;
	// 	setwcpsData(wcpsDataX);
	// }, [iconToggle]);

	useEffect(() => {
		setwcpsData((prevData) => ({
			...prevData,
			icon,
			iconToggle,
		}));
	}, [icon, iconToggle]);

	const updateIconOptions = (icon, itemSrc) => ({
		...icon,
		options: {
			...icon.options,
			iconSrc: itemSrc,
		},
	});

	const handleClick = (item) => {
		seticon((prevIcon) => updateIconOptions(prevIcon, item.icon));
		seticonToggle((prevIconToggle) =>
			updateIconOptions(prevIconToggle, item.toggle)
		);
	};

	useEffect(() => {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.topWrap = topWrap;
		setwcpsData(wcpsDataX);
	}, [topWrap]);

	function onChangeLayouts(loopLayout) {
		var wcpsDataX = { ...wcpsData };
		wcpsDataX.loopLayout = loopLayout;
		setwcpsData(wcpsDataX);

		setloopLayout(loopLayout);
	}

	const ALLOWED_MEDIA_TYPES = ["image"];

	var videoType = {
		choose: { label: "Choose", value: "" },
		youtube: { label: "YouTube", value: "youtube" },
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
				// 	contentSelector // Replace this selector if needed
				// );
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

	function onBulkAddStyle(sudoSource, cssObj, propertyType, setProperty) {
		let obj = { ...propertyType };
		obj[sudoSource] = cssObj;
		setProperty(obj);
	}

	var accOptionsArgs = {
		autoplay: { label: "Auto play", value: 1 },
	};
	const paginationTypes = {
		none: { label: __("None", "post-grid"), value: "none" },
		normal: { label: __("Normal Pagination", "post-grid"), value: "normal" },
		ajax: {
			label: __("Ajax Pagination", "post-grid"),
			value: "ajax",
			isPro: true,
		},
		next_previous: {
			label: __("Next-Previous", "post-grid"),
			value: "next_previous",
			isPro: true,
		},
		loadmore: {
			label: __("Load More", "post-grid"),
			value: "loadmore",
			isPro: true,
		},
		infinite: {
			label: __("Infinite Load", "post-grid"),
			value: "infinite",
			isPro: true,
		},
		filterable: { label: __("Filterable", "post-grid"), value: "filterable" },
	};
	var postQueryArgs = {
		postType: {
			value: ["post"],

			id: "postType",
			label: "Post types",
			description: "Select Post Types to Query",
		},
		s: {
			value: "",

			id: "s",
			label: "Keyword",
			description: "Search keyword, ex: hello",
		},
		postStatus: {
			value: [],

			id: "postStatus",
			label: "Post status",
			description: "Query post by post status",
		},
		order: {
			value: "",

			id: "order",
			label: "Order",
			description: "Post query order",
		},
		orderby: {
			value: [],

			id: "orderby",
			label: "Orderby",
			description: "Post query orderby",
		},
		metaKey: {
			value: "",

			id: "metaKey",
			label: "Meta fields key",
			description: "Post query by meta fields key",
		},
		metaValue: {
			value: "",

			id: "metaValue",
			label: "Meta Value",
			description: "Post query by custom field value",
		},
		metaValueNum: {
			value: "",

			id: "metaValueNum",
			label: "Meta Value Num",
			description: "Post query by custom field value for number types",
		},
		metaCompare: {
			value: "",

			id: "metaCompare",
			label: "Meta Compare",
			description: "Meta query compare",
		},
	};
	const updatePostQueryArgs = (newVal, index) => {
		var itemQueryArgsX = [...itemQueryArgs];
		itemQueryArgsX[index].value = newVal;
		setitemQueryArgs(itemQueryArgsX);
	};

	const updateTermQueryArgs = (newVal, index) => {
		var itemQueryArgsX = [...itemQueryArgs];
		itemQueryArgsX[index].value = newVal;
		setitemQueryArgs(itemQueryArgsX);
	};

	const handleDelete = (id) => {
		// Filter out the item with the specified id
		const updatedItems = Object.fromEntries(
			Object.entries(itemQueryArgs).filter(([key, item]) => item.id !== id)
		);
		setitemQueryArgs(updatedItems);
	};

	var itemSources = {
		manual: { label: "Manual", value: "manual" },
		posts: {
			label: "Posts",
			value: "posts",
			isPro: customerData.isPro ? false : true,
		},
	};

	function generate3Digit() {
		return Math.floor(100 + Math.random() * 900);
	}

	const copyData = (data) => {
		navigator.clipboard
			.writeText(data)
			.then(() => {
				addNotifications({
					title: "Copied to clipboard!",
					content:
						"Use the shortcode in page or post conent where you want to display.",
					type: "success",
				});
			})
			.catch((err) => { });
	};

	function escapeHTML(str) {
		const map = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#039;",
		};
		return str.replace(/[&<>"']/g, function (match) {
			return map[match];
		});
	}

	function unescapeHTML(str) {
		const map = {
			"&amp;": "&",
			"&lt;": "<",
			"&gt;": ">",
			"&quot;": '"',
			"&#039;": "'",
		};
		return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function (match) {
			return map[match];
		});
	}

	return (
		<div className="">
			<div
				className="hidden"
				onClick={() => {
					var str = `{
				"wrapper":${JSON.stringify(wrapper)},
				"navItem":${JSON.stringify(navItem)},
				"activeNavItem":${JSON.stringify(activeNavItem)},
				"labelCounter":${JSON.stringify(labelCounter)},
				"labelIcon":${JSON.stringify(labelIcon)},
				"icon":${JSON.stringify(icon)},
				"iconToggle":${JSON.stringify(iconToggle)},
				"navLabel":${JSON.stringify(navLabel)},
				"panelWrap":${JSON.stringify(panelWrap)},
				"topWrap":${JSON.stringify(topWrap)},
				}`;

					copyData(str);

					addNotifications({
						title: "Copied to clipboard!",
						content:
							"Use the shortcode in page or post conent where you want to display.",
						type: "success",
					});
				}}>
				<div className="p-3">
					<div>{`{`}</div>
					<div>{`"items":${JSON.stringify(items)}`},</div>
					<div>{`"wrapper":${JSON.stringify(wrapper)}`},</div>
					<div>{`"navsWrap":${JSON.stringify(navsWrap)}`},</div>
					<div>{`"navItem":${JSON.stringify(navItem)}`},</div>
					<div>{`"activeNavItem":${JSON.stringify(activeNavItem)}`},</div>
					<div>{`"labelCounter":${JSON.stringify(labelCounter)}`},</div>
					<div>{`"labelIcon":${JSON.stringify(labelIcon)}`},</div>
					<div>{`"icon":${JSON.stringify(icon)}`},</div>
					<div>{`"iconToggle":${JSON.stringify(iconToggle)}`},</div>
					<div>{`"navLabel":${JSON.stringify(navLabel)}`},</div>
					<div>{`"panelWrap":${JSON.stringify(panelWrap)}`},</div>
					<div>{`"panelWrapActive":${JSON.stringify(panelWrapActive)}`},</div>
					<div>{`}`}</div>
				</div>
			</div>

			{props.postData.post_content != null && (
				<>
					<PanelBody
						className="font-medium text-slate-900 "
						title="Items"
						initialOpen={true}>
						<div className="my-4 flex items-center justify-between ">
							<div className=" flex items-center  gap-2">
								<PGDropdown
									position="bottom right"
									variant="secondary"
									buttonTitle={
										globalOptions?.itemSource == undefined
											? "Item Source"
											: itemSources[globalOptions?.itemSource]?.label
									}
									options={itemSources}
									onChange={(option, index) => {
										var globalOptionsX = { ...globalOptions };
										globalOptionsX.itemSource = option.value;
										setglobalOptions(globalOptionsX);
									}}
									values=""></PGDropdown>
							</div>

							<div className="flex items-center  gap-2">
								{globalOptions?.itemSource == "posts" && (
									<>
										<span
											className="cursor-pointer"
											title="Click to know more"
											onClick={() => {
												setHelp({
													id: "addPostQuery",
													enable: true,
												});
											}}>
											<Icon icon={help} />
										</span>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											buttonTitle={"Add Query"}
											options={postQueryArgs}
											onChange={(option, index) => {
												var itemQueryArgsX = { ...itemQueryArgs };
												itemQueryArgsX[option.id] = {
													id: option.id,
													value: option.value,
												};
												setitemQueryArgs(itemQueryArgsX);
											}}
											values=""></PGDropdown>
									</>
								)}

								{globalOptions?.itemSource == "manual" && (
									<>
										<div className="flex items-center gap-2">
											<span
												className="flex items-center gap-2 bg-slate-700 text-white px-3 py-2 rounded-sm cursor-pointer hover:bg-slate-600"
												title="Click to paste"
												onClick={async () => {
													try {
														// Read text from clipboard
														const clipboardText =
															await navigator.clipboard.readText();

														// Parse the JSON string back to an object
														const pastedItems = JSON.parse(clipboardText);

														// Here you need to handle the pasted items
														// For example, if you have a state setter:
														setitems(pastedItems);

														addNotifications({
															title: "Items Pasted",
															content: "You just pasted items, Now go to edit.",
															type: "success",
														});
													} catch (error) { }
												}}>
												<Icon icon={page} fill="#fff" size="20" />
											</span>
											<span
												className="flex items-center gap-2 bg-slate-700 text-white px-3 py-2 rounded-sm cursor-pointer hover:bg-slate-600"
												title="Click to copy"
												onClick={() => {
													try {
														const itemsString = JSON.stringify(items, null, 2);

														navigator.clipboard
															.writeText(itemsString)
															.then(() => {
																addNotifications({
																	title: "Items Copied",
																	content:
																		"You just copied items, Now go to edit.",
																	type: "success",
																});
															})
															.catch((err) => { });
													} catch (error) { }
												}}>
												<Icon icon={copy} fill="#fff" size="20" />
											</span>
										</div>
										<div
											className="flex items-center gap-2 bg-slate-700 text-white px-3 py-2 rounded-sm cursor-pointer hover:bg-slate-600"
											onClick={(ev) => {
												var itemsX = [...items];

												itemsX.push({
													isActive: false,
													person: {
														name: "",
														avatar: { id: "", srcUrl: "" },
														jobTitle: "",
														comapny: { name: "", website: "", logoUrl: "" },
													},
													rating: 5,
													date: "11/01/2025",
													videoUrl: { type: "", link: "" },
													title: "What is Lorem Ipsum?",

													content:
														"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
													tags: [],
												});
												setitems(itemsX);

												addNotifications({
													title: "Item Added",
													content: "You just added an item, Now go to edit.",
													type: "success",
												});
											}}>
											<Icon icon={addCard} fill="#fff" size="20" />
										</div>
										<div className=" tracking-wide ">
											<div
												className="py-2 px-4 cursor-pointer  capitalize bg-gray-700 text-white font-medium rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
												onClick={(ev) => {
													ev.preventDefault();
													ev.stopPropagation();

													if (isProFeature) {
														addNotifications({
															title: "Opps its pro!",
															content:
																"This feature only avilable in premium version",
															type: "error",
														});
														return;
													}

													setAIWriter(!AIWriter);
												}}>
												AI
											</div>
											{AIWriter && (
												<Popover position="bottom right">
													<div className="w-[800px] p-3 relative">
														<span
															className="cursor-pointer px-1 bg-red-500 hover:bg-red-700 hover:text-white absolute top-0 right-0"
															onClick={(ev) => {
																ev.preventDefault();
																ev.stopPropagation();
																setAIWriter(!AIWriter);
															}}>
															<Icon fill={"#fff"} icon={close} />
														</span>

														<PGcssOpenaiPrompts
															value={""}
															formattedPrompt={formattedPrompt}
															promptsAgs={{
																action: "write",
																aiModel: "gpt-4-turbo",
																objective: "generateFAQ",
															}}
															autoUpdate={AIautoUpdate}
															onResponseLoaded={(value, autoUpdate) => {
																// if (autoUpdate) {
																// 	var options = { ...text.options, content: value };
																// 	setAttributes({ text: { ...text, options: options } });
																// }
															}}
															clickHandle={(value, action) => {
																var valueObj = JSON.parse(value);

																if (action == "prepend") {
																	var itemsX = [...items];

																	var faqX = [];

																	valueObj.map((item) => {
																		var answer = item.answer;
																		var question = item.question;

																		faqX.push({
																			active: 0,
																			hideOnSchema: 0,
																			headerLabelText: question,
																			headerLabelSlug: "",

																			headerLabelToggledText: "",
																			contentText: answer,
																			labelIcon: {
																				options: {
																					library: "fontAwesome",
																					srcType: "class",
																					iconSrc: "",
																				},
																				styles: {},
																			},
																		});
																	});

																	setitems([...faqX, ...itemsX]);

																	addNotifications({
																		title: "Items append",
																		content:
																			"Items append, You can customize now.",
																		type: "success",
																	});
																}
																if (action == "append") {
																	var itemsX = [...items];

																	var faqX = [];

																	valueObj.map((item) => {
																		var answer = item.answer;
																		var question = item.question;

																		faqX.push({
																			active: 0,
																			hideOnSchema: 0,
																			headerLabelText: question,
																			headerLabelSlug: "",

																			headerLabelToggledText: "",
																			contentText: answer,
																			labelIcon: {
																				options: {
																					library: "fontAwesome",
																					srcType: "class",
																					iconSrc: "",
																				},
																				styles: {},
																			},
																		});
																	});

																	setitems([...itemsX, ...faqX]);

																	addNotifications({
																		title: "Items Append",
																		content:
																			"Items append, You can customize now.",
																		type: "success",
																	});
																}
																if (action == "replace") {
																	var itemsX = [...items];

																	var faqX = [];

																	valueObj.map((item) => {
																		var answer = item.answer;
																		var question = item.question;

																		faqX.push({
																			active: 0,
																			hideOnSchema: 0,
																			headerLabelText: question,
																			headerLabelSlug: "",
																			headerLabelToggledText: "",
																			contentText: answer,
																			labelIcon: {
																				options: {
																					library: "fontAwesome",
																					srcType: "class",
																					iconSrc: "",
																				},
																				styles: {},
																			},
																		});
																	});

																	setitems(faqX);

																	addNotifications({
																		title: "Items Added",
																		content:
																			"You just added an item, Now go to edit.",
																		type: "success",
																	});
																}

																//setAttributes({ itemsX: { ...itemsX, items: itemx } });
															}}
														/>
													</div>
												</Popover>
											)}
										</div>
									</>
								)}
							</div>
						</div>
						{globalOptions?.itemSource == "posts" && (
							<div>
								{Object.entries(itemQueryArgs)?.map((prams) => {
									var index = prams[0];
									var item = prams[1];

									return (
										<div key={index} className="my-4 flex gap-2 items-center">
											<span
												className="cursor-pointer px-1 bg-red-500 hover:bg-red-700 hover:text-white"
												onClick={() => handleDelete(item.id)}>
												<Icon fill={"#fff"} icon={close} size="20" />
											</span>
											{item.id == "postType" && (
												<div className="flex items-center justify-between flex-1">
													<label htmlFor="">Post Type</label>
													<PGinputSelect
														val={item.value}
														className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
														options={postTypes}
														multiple={true}
														onChange={(newVal) => {
															updatePostQueryArgs(newVal, item.id);
														}}
													/>
												</div>
											)}
											{item.id == "postStatus" && (
												<div
													className={
														item.id == "postStatus"
															? "flex items-center justify-between flex-1"
															: "hidden"
													}>
													<label htmlFor="">Post Status</label>
													<PGinputSelect
														val={item.value}
														className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
														options={[
															{ label: "Publish", value: "publish" },
															{ label: "Pending", value: "pending" },
															{ label: "Draft", value: "draft" },
															{ label: "Auto draft", value: "auto-draft" },
															{ label: "Future", value: "future" },
															{ label: "Private", value: "private" },
															{ label: "Inherit", value: "inherit" },
															{ label: "Trash", value: "trash" },
															{ label: "Any", value: "any" },
														]}
														multiple={true}
														onChange={(newVal) => {
															updatePostQueryArgs(newVal, item.id);
														}}
													/>
												</div>
											)}
											{item.id == "order" && (
												<div
													className={
														item.id == "order"
															? "flex items-center justify-between flex-1"
															: "hidden"
													}>
													<label htmlFor="">Order</label>
													<PGinputSelect
														label=""
														className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
														val={item.value}
														options={[
															{ label: "Ascending", value: "ASC" },
															{ label: "Descending", value: "DESC" },
														]}
														multiple={false}
														onChange={(newVal) =>
															updatePostQueryArgs(newVal, index)
														}
													/>
												</div>
											)}
											{item.id == "orderby" && (
												<div
													className={
														item.id == "orderby"
															? "flex items-center justify-between flex-1"
															: "hidden"
													}>
													<label htmlFor="">Order By</label>
													<PGinputSelect
														val={item.value}
														className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
														options={[
															{
																label: __("None", "woocommerce-products-slider"),
																value: "none",
															},
															{ label: "ID", value: "ID" },
															{ label: "Author", value: "author" },
															{ label: "Title", value: "title" },
															{ label: "Name", value: "name" },
															{ label: "Type", value: "type" },
															{ label: "Date", value: "date" },
															{ label: "Modified", value: "modified" },
															{ label: "Parent", value: "parent" },
															{ label: "Random", value: "rand" },
															{
																label: "Comment Count",
																value: "comment_count",
															},
															{ label: "Relevance", value: "relevance" },
															{ label: "Menu Order", value: "menu_order" },
															{
																label: "Meta Value(String)",
																value: "meta_value",
															},
															{
																label: "Meta Value(Number)",
																value: "meta_value_num",
															},
															{ label: "post__in", value: "post__in" },
															{
																label: "post_name__in",
																value: "post_name__in",
															},
															{
																label: "post_parent__in",
																value: "post_parent__in",
															},
														]}
														multiple={true}
														onChange={(newVal) => {
															updatePostQueryArgs(newVal, item.id);
														}}
													/>
												</div>
											)}
											{item.id == "metaKey" && (
												<div className="flex items-center justify-between flex-1">
													<label htmlFor="">Meta Key</label>
													<PGinputText
														label=""
														className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
														value={item.value}
														onChange={(newVal) => {
															updatePostQueryArgs(newVal, item.id);
														}}
													/>
												</div>
											)}
											{item.id == "metaValue" && (
												<div className="flex items-center justify-between flex-1">
													<label htmlFor="">Meta Value</label>
													<PGinputText
														label=""
														className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
														value={item.value}
														onChange={(newVal) => {
															updatePostQueryArgs(newVal, item.id);
														}}
													/>
												</div>
											)}
											{item.id == "metaValueNum" && (
												<div className="flex items-center justify-between flex-1">
													<label htmlFor="">Meta Value Number</label>
													<PGinputText
														label=""
														className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
														value={item.value}
														onChange={(newVal) => {
															updatePostQueryArgs(newVal, item.id);
														}}
													/>
												</div>
											)}
											{item.id == "s" && (
												<div className="flex items-center justify-between flex-1">
													<label htmlFor="">Keyword</label>
													<PGinputText
														label=""
														className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
														value={item.value}
														onChange={(newVal) => {
															updatePostQueryArgs(newVal, item.id);
														}}
													/>
												</div>
											)}
											{item.id == "metaCompare" && (
												<div
													className={
														item.id == "metaCompare"
															? "flex items-center justify-between flex-1"
															: "hidden"
													}>
													<label htmlFor="">Meta Compare</label>
													<PGinputSelect
														val={item.value}
														className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
														options={[
															{ label: "=", value: "=" },
															{ label: "!=", value: "!=" },
															{ label: ">", value: ">" },
															{ label: ">=", value: ">=" },
															{ label: "<", value: "<" },
															{ label: "<=", value: "<=" },
															{ label: "LIKE", value: "LIKE" },
															{ label: "NOT LIKE", value: "NOT LIKE" },
															{ label: "IN", value: "IN" },
															{ label: "NOT IN", value: "NOT IN" },
															{ label: "BETWEEN", value: "BETWEEN" },
															{ label: "NOT BETWEEN", value: "NOT BETWEEN" },
															{ label: "NOT EXISTS", value: "NOT EXISTS" },
															{ label: "REGEXP", value: "REGEXP" },
															{ label: "NOT REGEXP", value: "NOT REGEXP" },
															{ label: "RLIKE", value: "RLIKE" },
														]}
														onChange={(newVal) => {
															updatePostQueryArgs(newVal, item.id);
														}}
													/>
												</div>
											)}
										</div>
									);
								})}
							</div>
						)}

						{globalOptions?.itemSource == "manual" && (
							<div>
								<ReactSortable
									list={items}
									handle={".handle"}
									setList={(itemsSorted) => {
										setTimeout(() => {
											setitems(itemsSorted);
										}, 200);

										addNotifications({
											title: "Items Sorted",
											content: "You just sorted items",
											type: "success",
										});
									}}>
									{items?.map((item, index) => {
										return (
											<>
												<div className="" key={index}>
													<div
														className="bg-slate-300 flex justify-between items-center p-3 py-2 my-2 cursor-pointer hover:bg-slate-400"
														onClick={(ev) => {
															setitemActive(index == itemActive ? 999 : index);
														}}>
														<div>{item?.title}</div>
														<div className="flex items-center gap-2">
															<span className="handle  cursor-pointer bg-gray-700 hover:bg-gray-600 hover:text-white px-1 py-1">
																<Icon size="20" fill={"#fff"} icon={menu} />
															</span>
															<span
																className="cursor-pointer bg-gray-700 hover:bg-gray-600 hover:text-white px-1 py-1"
																onClick={(ev) => {
																	ev.stopPropagation();

																	var itemsX = [...items];
																	var itemToDup = { ...itemsX[index] };
																	itemsX.splice(index + 1, 0, itemToDup);
																	setitems(itemsX);

																	addNotifications({
																		title: "Item Duplicated",
																		content: "You just duplicate an item",
																		type: "success",
																	});
																}}>
																<Icon size="20" fill={"#fff"} icon={copy} />
															</span>
															<span
																className="cursor-pointer bg-red-700 hover:bg-red-600 hover:text-white px-1 py-1"
																onClick={(ev) => {
																	ev.stopPropagation();
																	var itemsX = [...items];
																	itemsX.splice(index, 1);
																	setitems(itemsX);

																	addNotifications({
																		title: "Item Removed",
																		content: "You just removed an item",
																		type: "success",
																	});
																}}>
																<Icon size="20" fill={"#fff"} icon={close} />
															</span>
														</div>
													</div>

													{itemActive == index && (
														<div className="py-2 w-full">
															<div className="mb-3">
																<RichText
																	placeholder="Write Header Text..."
																	className="bg-slate-100 p-3 "
																	tagName={"div"}
																	value={item?.title}
																	onChange={(content) => {
																		setitems((prevItems) => {
																			// 																			console.log(item?.headerLabelSlug)

																			// if(!item?.headerLabelSlugLock){

																			// }

																			const updatedItems = [...prevItems];
																			updatedItems[index] = {
																				...updatedItems[index],
																				title: content,
																			};
																			return updatedItems;
																		});
																	}}
																/>
															</div>
															<div className="mb-3">
																<WPEditor
																	placeholder="Write Header Text..."
																	editorId={`content-${index}-${generate3Digit()}`}
																	className={`bg-slate-100 p-3 min-h-24 w-full`}
																	value={unescapeHTML(item?.content)}
																	onChange={(content) => {
																		content = content.replace(/[\r\n]+/g, "");
																		content = escapeHTML(content);

																		//var content = JSON.stringify(content);
																		setitems((prevItems) => {
																			const updatedItems = [...prevItems];
																			updatedItems[index] = {
																				...updatedItems[index],
																				content: content,
																			};
																			return updatedItems;
																		});
																	}}
																/>
															</div>

															{/* <div className="mb-3">
																<PanelRow>
																	<label
																		htmlFor=""
																		className="font-medium text-slate-900 ">
																		{__("Label Icon", "woocommerce-products-slider")}
																	</label>
																	<PGIconPicker
																		library={item?.labelIcon?.options?.library}
																		srcType={item?.labelIcon?.options?.srcType}
																		iconSrc={item?.labelIcon?.options?.iconSrc}
																		onChange={(arg) => {
																			if (isProFeature) {
																				addNotifications({
																					title: "Opps its pro!",
																					content:
																						"This feature only avilable in premium version",
																					type: "error",
																				});
																				return;
																			}

																			setitems((prevItems) => {
																				const updatedItems = [...prevItems];
																				updatedItems[index] = {
																					...updatedItems[index],
																					labelIcon: {
																						...updatedItems[index].labelIcon,
																						options: {
																							...updatedItems[index]?.labelIcon
																								?.options,
																							srcType: arg.srcType,
																							library: arg.library,
																							iconSrc: arg.iconSrc,
																						},
																					},
																				};
																				return updatedItems;
																			});
																		}}
																	/>
																</PanelRow>

																<div className="w-full">
																	<div className="mb-2">Slug</div>
																	<div className="flex items-center gap-2">
																		<PGinputText
																			className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full "
																			label=""
																			value={item?.headerLabelSlug}
																			onChange={(newVal) => {
																				if (isProFeature) {
																					addNotifications({
																						title: "Opps its pro!",
																						content:
																							"This feature only avilable in premium version",
																						type: "error",
																					});
																					return;
																				}

																				setitems((prevItems) => {
																					const updatedItems = [...prevItems];
																					updatedItems[index] = {
																						...updatedItems[index],
																						headerLabelSlug: newVal,
																					};
																					return updatedItems;
																				});
																			}}
																		/>

																		<div
																			title="Generate from Label"
																			className="cursor-pointer rounded-sm bg-gray-700 hover:bg-gray-600 hover:text-white px-1 py-1"
																			onClick={(ev) => {
																				var slug = item?.headerLabelText
																					.toLowerCase()
																					.replaceAll(" ", "-");

																				setitems((prevItems) => {
																					const updatedItems = [...prevItems];
																					updatedItems[index] = {
																						...updatedItems[index],
																						headerLabelSlug: slug,
																					};
																					return updatedItems;
																				});
																			}}>
																			<Icon fill={"#fff"} icon={update} />
																		</div>
																	</div>
																</div>
															</div> */}
															<div className="mb-3 space-y-3">
																<div className="w-full flex justify-between items-center">
																	<div className="mb-2">Date</div>
																	<div className="flex items-center gap-2">
																		<span
																			className="flex items-center gap-2 bg-slate-700 text-white px-3 py-2 rounded-sm cursor-pointer hover:bg-slate-600"
																			title="Date Picker"
																			onClick={() => {
																				setdatePicker(index);
																			}}>
																			<Icon
																				icon={calendar}
																				fill="#fff"
																				size="20"
																			/>
																		</span>

																		{/* <PGDatePicker
																			value={item?.date}
																			onChange={
																				(newVal) => console.log(newVal)
																				//setDate(newVal)
																			}
																		/> */}
																		{datePicker == index && (
																			<Popover position="bottom right">
																				<div className="p-2 rounded-md">
																					<DateTimePicker
																						currentDate={item?.date}
																						onChange={(newDate) => {
																							const timestamp = newDate;
																							const date =
																								timestamp.split("T")[0];
																							setitems((prevItems) => {
																								const updatedItems = [
																									...prevItems,
																								];
																								updatedItems[index] = {
																									...updatedItems[index],
																									date: date,
																								};
																								return updatedItems;
																							});
																						}}
																						is12Hour={true}
																					/>
																				</div>
																			</Popover>
																		)}
																	</div>
																</div>
																<div className="w-full flex justify-between items-center">
																	<div className="mb-2">Rating</div>
																	<div className="flex items-center gap-2">
																		{[1, 2, 3, 4, 5].map((star) => (
																			<span
																				className="size-5"
																				key={star}
																				onClick={() => {
																					setitems((prevItems) => {
																						const updatedItems = [...prevItems];
																						updatedItems[index] = {
																							...updatedItems[index],
																							rating: star,
																						};
																						return updatedItems;
																					});
																				}}>
																				<Icon
																					icon={
																						star > item?.rating
																							? starEmpty
																							: starFilled
																					}
																					fill="gold"
																					size="24"
																				/>
																			</span>
																		))}
																	</div>
																</div>
																<div className="w-full flex justify-between items-center">
																	<div className="mb-2">Video Type</div>
																	<div className="flex items-center gap-2">
																		<PGDropdown
																			position="bottom right"
																			variant="secondary"
																			buttonTitle={
																				videoType[item?.videoUrl.type] ==
																					undefined
																					? __("Choose", "woocommerce-products-slider")
																					: videoType[item?.videoUrl.type].label
																			}
																			options={videoType}
																			onChange={(newVal) => {
																				setitems((prevItems) => {
																					const updatedItems = [...prevItems];
																					updatedItems[index] = {
																						...updatedItems[index],
																						videoUrl: {
																							...updatedItems[index].videoUrl,
																							type: newVal.value,
																						},
																					};
																					return updatedItems;
																				});
																			}}
																			values=""></PGDropdown>
																	</div>
																</div>
																<div className="w-full flex justify-between items-center">
																	<div className="mb-2">Video Url</div>
																	<div className="flex items-center gap-2">
																		<PGinputText
																			className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full "
																			label=""
																			value={item?.videoUrl.link}
																			onChange={(newVal) => {
																				// if (isProFeature) {
																				// 	addNotifications({
																				// 		title: "Opps its pro!",
																				// 		content:
																				// 			"This feature only avilable in premium version",
																				// 		type: "error",
																				// 	});
																				// 	return;
																				// }
																				setitems((prevItems) => {
																					const updatedItems = [...prevItems];
																					updatedItems[index] = {
																						...updatedItems[index],
																						videoUrl: {
																							...updatedItems[index].videoUrl,
																							link: newVal,
																						},
																					};
																					return updatedItems;
																				});
																			}}
																		/>
																	</div>
																</div>
																<div className="w-full flex justify-between items-center">
																	<div className="">Person Name</div>
																	<div className="flex items-center gap-2">
																		<PGinputText
																			className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full "
																			label=""
																			value={item?.person.name}
																			onChange={(newVal) => {
																				setitems((prevItems) => {
																					const updatedItems = [...prevItems];
																					updatedItems[index] = {
																						...updatedItems[index],
																						person: {
																							...updatedItems[index].person,
																							name: newVal,
																						},
																					};
																					return updatedItems;
																				});
																			}}
																		/>
																	</div>
																</div>
																<div className="w-full flex justify-between items-center">
																	<div className="">Job Title</div>
																	<div className="flex items-center gap-2">
																		<PGinputText
																			className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full "
																			label=""
																			value={item?.person.jobTitle}
																			onChange={(newVal) => {
																				setitems((prevItems) => {
																					const updatedItems = [...prevItems];
																					updatedItems[index] = {
																						...updatedItems[index],
																						person: {
																							...updatedItems[index].person,
																							jobTitle: newVal,
																						},
																					};
																					return updatedItems;
																				});
																			}}
																		/>
																	</div>
																</div>
																<div className="flex my-5 justify-between items-center ">
																	<label className="w-[400px]" htmlFor="">
																		{__("Avatar", "user-verification")}
																	</label>
																	<MediaUpload
																		onSelect={(media) => {
																			setitems((prevItems) => {
																				const updatedItems = [...prevItems];
																				updatedItems[index] = {
																					...updatedItems[index],
																					person: {
																						...updatedItems[index].person,
																						avatar: {
																							id: media.id,
																							srcUrl: media.url,
																						},
																					},
																				};
																				return updatedItems;
																			});
																		}}
																		onClose={() => { }}
																		allowedTypes={ALLOWED_MEDIA_TYPES}
																		value={item?.person.avatar.id}
																		render={({ open }) => {
																			return (
																				<div className="flex flex-col items-center gap-2">
																					{item?.person.avatar.srcUrl && (
																						<img
																							src={item?.person.avatar.srcUrl}
																							alt=""
																							className="cursor-pointer rounded-md max-w-[160px] max-h-[160px] object-contain border border-solid border-gray-300 p-1"
																							onClick={() => {
																								open();
																							}}
																						/>
																					)}
																					<div className="flex items-center gap-2">
																						<button
																							onClick={open}
																							className="no-underline px-4 py-2 rounded-sm bg-gray-700 hover:bg-gray-700 text-white  whitespace-nowrap  hover:text-white">
																							Open Media Library
																						</button>
																						<button
																							onClick={() => {
																								setitems((prevItems) => {
																									const updatedItems = [
																										...prevItems,
																									];
																									updatedItems[index] = {
																										...updatedItems[index],
																										person: {
																											...updatedItems[index]
																												.person,
																											avatar: {
																												id: "",
																												srcUrl: "",
																											},
																										},
																									};
																									return updatedItems;
																								});
																							}}
																							className="no-underline size-[38px] flex items-center justify-center text-[30px] rounded-sm !border !bg-transparent !border-solid !border-gray-700 hover:!border-red-700 text-gray-700   hover:text-red-700"
																							title="Clear Logo">
																							&times;
																						</button>
																					</div>
																				</div>
																			);
																		}}></MediaUpload>
																</div>
																<div className="w-full flex justify-between items-center">
																	<div className="">Company Name</div>
																	<div className="flex items-center gap-2">
																		<PGinputText
																			className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full "
																			label=""
																			value={item?.person.company.name}
																			onChange={(newVal) => {
																				setitems((prevItems) => {
																					const updatedItems = [...prevItems];
																					updatedItems[index] = {
																						...updatedItems[index],
																						person: {
																							...updatedItems[index].person,
																							company: {
																								...updatedItems[index].person
																									.company,
																								name: newVal,
																							},
																						},
																					};
																					return updatedItems;
																				});
																			}}
																		/>
																	</div>
																</div>
																<div className="w-full flex justify-between items-center">
																	<div className="">Company Website</div>
																	<div className="flex items-center gap-2">
																		<PGinputText
																			className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full "
																			label=""
																			value={item?.person.company.website}
																			onChange={(newVal) => {
																				setitems((prevItems) => {
																					const updatedItems = [...prevItems];
																					updatedItems[index] = {
																						...updatedItems[index],
																						person: {
																							...updatedItems[index].person,
																							company: {
																								...updatedItems[index].person
																									.company,
																								website: newVal,
																							},
																						},
																					};
																					return updatedItems;
																				});
																			}}
																		/>
																	</div>
																</div>
																<div className="flex my-5 justify-between items-center ">
																	<label className="w-[400px]" htmlFor="">
																		{__("Company logo", "user-verification")}
																	</label>
																	<MediaUpload
																		onSelect={(media) => {
																			setitems((prevItems) => {
																				const updatedItems = [...prevItems];
																				updatedItems[index] = {
																					...updatedItems[index],
																					person: {
																						...updatedItems[index].person,
																						company: {
																							...updatedItems[index].person
																								.company,
																							logoUrl: {
																								id: media.id,
																								srcUrl: media.url,
																							},
																						},
																					},
																				};
																				return updatedItems;
																			});
																		}}
																		onClose={() => { }}
																		allowedTypes={ALLOWED_MEDIA_TYPES}
																		value={item?.person.company.logoUrl.id}
																		render={({ open }) => {
																			return (
																				<div className="flex flex-col items-center gap-2">
																					{item?.person.company.logoUrl
																						.srcUrl && (
																							<img
																								src={
																									item?.person.company.logoUrl
																										.srcUrl
																								}
																								alt=""
																								className="cursor-pointer rounded-md max-w-[160px] max-h-[160px] object-contain border border-solid border-gray-300 p-1"
																								onClick={() => {
																									open();
																								}}
																							/>
																						)}
																					<div className="flex items-center gap-2">
																						<button
																							onClick={open}
																							className="no-underline px-4 py-2 rounded-sm bg-gray-700 hover:bg-gray-700 text-white  whitespace-nowrap  hover:text-white">
																							Open Media Library
																						</button>
																						<button
																							onClick={() => {
																								setitems((prevItems) => {
																									const updatedItems = [
																										...prevItems,
																									];
																									updatedItems[index] = {
																										...updatedItems[index],
																										person: {
																											...updatedItems[index]
																												.person,
																											company: {
																												...updatedItems[index]
																													.person.company,
																												logoUrl: {
																													id: "",
																													srcUrl: "",
																												},
																											},
																										},
																									};
																									return updatedItems;
																								});
																							}}
																							className="no-underline size-[38px] flex items-center justify-center text-[30px] rounded-sm !border !bg-transparent !border-solid !border-gray-700 hover:!border-red-700 text-gray-700   hover:text-red-700"
																							title="Clear Logo">
																							&times;
																						</button>
																					</div>
																				</div>
																			);
																		}}></MediaUpload>
																</div>
																{/* // */}
															</div>
														</div>
													)}
												</div>
											</>
										);
									})}
								</ReactSortable>
							</div>
						)}
					</PanelBody>
					<PanelBody
						className="font-medium text-slate-900 "
						title="WCPS Settings"
						initialOpen={false}>
						<div className="py-3">
							<PanelRow>
								<label htmlFor="" className="flex gap-2 items-center">
									Lazyload{" "}
									<span
										className="cursor-pointer"
										title="Click to know more"
										onClick={() => {
											setHelp({
												id: "lazyloadSetting",
												enable: true,
											});
										}}>
										<Icon icon={help} />
									</span>
								</label>
								<InputToggle
									value={globalOptions?.lazyLoad}
									onChange={(newVal) => {
										var globalOptionsX = { ...globalOptions };
										globalOptionsX.lazyLoad = newVal;
										setglobalOptions(globalOptionsX);
									}}
								/>
								{/* <SelectControl
									className="w-[140px]"
									label=""
									value={globalOptions?.lazyLoad}
									options={[
										{ label: __("True", "woocommerce-products-slider"), value: 1 },
										{ label: __("False", "woocommerce-products-slider"), value: 0 },
									]}
									onChange={(newVal) => {
										// var globalOptionsX = { ...globalOptions };
										// globalOptionsX.lazyLoad = newVal;
										// setglobalOptions(globalOptionsX);

										var globalOptionsX = { ...globalOptions };
										globalOptionsX.lazyLoad = newVal;
										setglobalOptions(globalOptionsX);
									}}
								/> */}
							</PanelRow>
						</div>
					</PanelBody>
					<PanelBody
						className="font-medium text-slate-900 "
						title="Layouts"
						initialOpen={false}>
						<div className="flex items-center justify-between">
							<div
								className="bg-slate-700 inline-block text-white px-5 py-2 rounded-sm cursor-pointer hover:bg-slate-600"
								onClick={(ev) => {
									seteditLayouts(!editLayouts);
								}}>
								Customize Layouts
							</div>
							<div
								className="bg-slate-700 text-white px-5 py-2 rounded-sm cursor-pointer hover:bg-slate-600 flex items-center gap-1"
								onClick={() => {
									navigator.clipboard
										.writeText(JSON.stringify(wcpsData.loopLayout))
										.then(() => {
											addNotifications({
												title: "Copied to clipboard!",
												content: "Layout Copied!",
												type: "success",
											});
										});
								}}>
								<Icon icon={copy} size={14} fill="#fff" />
								Copy
							</div>
							<div
								className="bg-slate-700 text-white px-5 py-2 rounded-sm cursor-pointer hover:bg-slate-600 flex items-center gap-1"
								onClick={async () => {
									try {
										var data = await navigator.clipboard.readText().then(() => {
											addNotifications({
												title: "Layout Pasted!",
												content: "Layout paste successful.",
												type: "success",
											});
										});
										data = JSON.parse(data);
										onChangeLayouts(data);
									} catch (e) {
										console.log(e);
									}
								}}>
								<Icon icon={page} size={14} fill="#fff" />
								Paste
							</div>

							{editLayouts && (
								<Popover position="bottom right">
									<div className="w-[1200px] p-3">
										<LayoutGenerator
											postData={postData}
											onChange={onChangeLayouts}
											layouts={wcpsData.loopLayout}
										/>
									</div>
								</Popover>
							)}
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
							<PGtab name="options">
								<div className="flex  my-5  justify-between items-center">
									<label className="" htmlFor="">
										{__("Class", "woocommerce-products-slider")}
									</label>
									<PGinputText
										value={wrapper?.options?.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
										onChange={(newVal) => {
											var optionsX = {
												...wrapper,
												options: {
													...wrapper?.options,
													class: newVal,
												},
											};
											setwrapper(optionsX);
										}}
									/>
								</div>
							</PGtab>
							<PGtab name="styles">
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
						title="Items Wrap"
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
							<PGtab name="options">
								<div className="flex  my-5  justify-between items-center">
									<label className="" htmlFor="">
										{__("Class", "woocommerce-products-slider")}
									</label>
									<PGinputText
										value={itemsWrap?.options?.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
										onChange={(newVal) => {
											var optionsX = {
												...itemsWrap,
												options: {
													...itemsWrap?.options,
													class: newVal,
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
							<PGtab name="options">
								<div className="flex  my-5  justify-between items-center">
									<label className="" htmlFor="">
										{__("Class", "woocommerce-products-slider")}
									</label>
									<PGinputText
										value={itemWrap?.options?.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
										onChange={(newVal) => {
											var optionsX = {
												...itemWrap,
												options: {
													...itemWrap?.options,
													class: newVal,
												},
											};
											setitemWrap(optionsX);
										}}
									/>
								</div>
							</PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={itemWrap}
									onChange={(sudoScource, newVal, attr) =>
										onChangeStyle(
											sudoScource,
											newVal,
											attr,
											itemWrap,
											setitemWrap
										)
									}
									onAdd={(sudoScource, key) =>
										onAddStyle(sudoScource, key, itemWrap, setitemWrap)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(sudoScource, key, itemWrap, setitemWrap)
									}
									onReset={(sudoSources) =>
										onResetStyle(sudoSources, itemWrap, setitemWrap)
									}
									onBulkAdd={(sudoSource, cssObj) =>
										onBulkAddStyle(sudoSource, cssObj, itemWrap, setitemWrap)
									}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>

					{globalOptions?.itemSource == "posts" && (
						<>
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
									<PGtab name="options">
										<PanelRow className="mb-4">
											<label htmlFor="">
												{__("Pagination Type", "post-grid")}
											</label>
											<PGDropdown
												position="bottom right"
												variant="secondary"
												options={paginationTypes}
												buttonTitle={
													paginationTypes[paginationWrap.options.type] !=
														undefined
														? paginationTypes[paginationWrap.options.type].label
														: __("Choose", "post-grid")
												}
												onChange={(arg, index) => {
													var optionsX = {
														...paginationWrap,
														options: {
															...paginationWrap?.options,
															type: arg.value,
														},
													};
													setpaginationWrap(optionsX);
												}}
												values={""}></PGDropdown>
										</PanelRow>
										<div className="flex  my-5  justify-between items-center">
											<label className="" htmlFor="">
												{__("Class", "woocommerce-products-slider")}
											</label>
											<PGinputText
												value={paginationWrap?.options?.class}
												className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
												onChange={(newVal) => {
													var optionsX = {
														...paginationWrap,
														options: {
															...paginationWrap?.options,
															class: newVal,
														},
													};
													setpaginationWrap(optionsX);
												}}
											/>
										</div>
									</PGtab>
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
									</PGtab>
								</PGtabs>
							</PanelBody>

							<PanelBody
								className="font-medium text-slate-900 "
								title="Pagination Item"
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
									<PGtab name="options">
										<div className="flex  my-5  justify-between items-center">
											<label className="" htmlFor="">
												{__("Class", "woocommerce-products-slider")}
											</label>
											<PGinputText
												value={paginationItem?.options?.class}
												className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
												onChange={(newVal) => {
													var optionsX = {
														...paginationItem,
														options: {
															...paginationItem?.options,
															class: newVal,
														},
													};
													setpaginationItem(optionsX);
												}}
											/>
										</div>
									</PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={paginationItem}
											onChange={(sudoScource, newVal, attr) =>
												onChangeStyle(
													sudoScource,
													newVal,
													attr,
													paginationItem,
													setpaginationItem
												)
											}
											onAdd={(sudoScource, key) =>
												onAddStyle(
													sudoScource,
													key,
													paginationItem,
													setpaginationItem
												)
											}
											onRemove={(sudoScource, key) =>
												onRemoveStyle(
													sudoScource,
													key,
													paginationItem,
													setpaginationItem
												)
											}
											onReset={(sudoSources) =>
												onResetStyle(
													sudoSources,
													paginationItem,
													setpaginationItem
												)
											}
											onBulkAdd={(sudoSource, cssObj) =>
												onBulkAddStyle(
													sudoSource,
													cssObj,
													paginationItem,
													setpaginationItem
												)
											}
										/>
									</PGtab>
								</PGtabs>
							</PanelBody>

							<PanelBody
								className="font-medium text-slate-900 "
								title="pagination Item Active"
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
									<PGtab name="options">
										<div className="flex  my-5  justify-between items-center">
											<label className="" htmlFor="">
												{__("Class", "woocommerce-products-slider")}
											</label>
											<PGinputText
												value={paginationItemActive?.options?.class}
												className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
												onChange={(newVal) => {
													var optionsX = {
														...paginationItemActive,
														options: {
															...paginationItemActive?.options,
															class: newVal,
														},
													};
													setpaginationItemActive(optionsX);
												}}
											/>
										</div>
									</PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={paginationItemActive}
											onChange={(sudoScource, newVal, attr) =>
												onChangeStyle(
													sudoScource,
													newVal,
													attr,
													paginationItemActive,
													setpaginationItemActive
												)
											}
											onAdd={(sudoScource, key) =>
												onAddStyle(
													sudoScource,
													key,
													paginationItemActive,
													setpaginationItemActive
												)
											}
											onRemove={(sudoScource, key) =>
												onRemoveStyle(
													sudoScource,
													key,
													paginationItemActive,
													setpaginationItemActive
												)
											}
											onReset={(sudoSources) =>
												onResetStyle(
													sudoSources,
													paginationItemActive,
													setpaginationItemActive
												)
											}
											onBulkAdd={(sudoSource, cssObj) =>
												onBulkAddStyle(
													sudoSource,
													cssObj,
													paginationItemActive,
													setpaginationItemActive
												)
											}
										/>
									</PGtab>
								</PGtabs>
							</PanelBody>
						</>
					)}

					{/*<PanelBody
						className="font-medium text-slate-900 "
						title="Navs Wrap"
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
									<label className="" htmlFor="">
										{__("Class", "woocommerce-products-slider")}
									</label>
									<PGinputText
										value={navsWrap?.options?.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
										onChange={(newVal) => {
											var optionsX = {
												...navsWrap,
												options: {
													...navsWrap?.options,
													class: newVal,
												},
											};
											setnavsWrap(optionsX);
										}}
									/>
								</div>
							</PGtab>
							<PGtab name="styles">
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
										onAddStyle(
											sudoScource,
											key,
											navsWrap,
											setnavsWrap
										)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(
											sudoScource,
											key,
											navsWrap,
											setnavsWrap
										)
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
							</PGtab>
						</PGtabs>
					</PanelBody>

					<PanelBody
						className="font-medium text-slate-900 "
						title="Prev"
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
									<label className="" htmlFor="">
										{__("Class", "woocommerce-products-slider")}
									</label>
									<PGinputText
										value={prev?.options?.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
										onChange={(newVal) => {
											var optionsX = {
												...prev,
												options: {
													...prev?.options,
													class: newVal,
												},
											};
											setprev(optionsX);
										}}
									/>
								</div>
							</PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={prev}
									onChange={(sudoScource, newVal, attr) =>
										onChangeStyle(
											sudoScource,
											newVal,
											attr,
											prev,
											setprev
										)
									}
									onAdd={(sudoScource, key) =>
										onAddStyle(
											sudoScource,
											key,
											prev,
											setprev
										)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(
											sudoScource,
											key,
											prev,
											setprev
										)
									}
									onReset={(sudoSources) =>
										onResetStyle(sudoSources, prev, setprev)
									}
									onBulkAdd={(sudoSource, cssObj) =>
										onBulkAddStyle(
											sudoSource,
											cssObj,
											prev,
											setprev
										)
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
									<label className="" htmlFor="">
										{__("Class", "woocommerce-products-slider")}
									</label>
									<PGinputText
										value={prevIcon?.options?.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
										onChange={(newVal) => {
											var optionsX = {
												...prevIcon,
												options: {
													...prevIcon?.options,
													class: newVal,
												},
											};
											setprevIcon(optionsX);
										}}
									/>
								</div>
							</PGtab>
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
										onAddStyle(
											sudoScource,
											key,
											prevIcon,
											setprevIcon
										)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(
											sudoScource,
											key,
											prevIcon,
											setprevIcon
										)
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
							</PGtab>
						</PGtabs>
					</PanelBody>

					<PanelBody
						className="font-medium text-slate-900 "
						title="Next"
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
									<label className="" htmlFor="">
										{__("Class", "woocommerce-products-slider")}
									</label>
									<PGinputText
										value={next?.options?.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
										onChange={(newVal) => {
											var optionsX = {
												...next,
												options: {
													...next?.options,
													class: newVal,
												},
											};
											setnext(optionsX);
										}}
									/>
								</div>
							</PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={next}
									onChange={(sudoScource, newVal, attr) =>
										onChangeStyle(
											sudoScource,
											newVal,
											attr,
											next,
											setnext
										)
									}
									onAdd={(sudoScource, key) =>
										onAddStyle(
											sudoScource,
											key,
											next,
											setnext
										)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(
											sudoScource,
											key,
											next,
											setnext
										)
									}
									onReset={(sudoSources) =>
										onResetStyle(sudoSources, next, setnext)
									}
									onBulkAdd={(sudoSource, cssObj) =>
										onBulkAddStyle(
											sudoSource,
											cssObj,
											next,
											setnext
										)
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
									<label className="" htmlFor="">
										{__("Class", "woocommerce-products-slider")}
									</label>
									<PGinputText
										value={nextIcon?.options?.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
										onChange={(newVal) => {
											var optionsX = {
												...nextIcon,
												options: {
													...nextIcon?.options,
													class: newVal,
												},
											};
											setnextIcon(optionsX);
										}}
									/>
								</div>
							</PGtab>
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
										onAddStyle(
											sudoScource,
											key,
											nextIcon,
											setnextIcon
										)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(
											sudoScource,
											key,
											nextIcon,
											setnextIcon
										)
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
									<label className="" htmlFor="">
										{__("Class", "woocommerce-products-slider")}
									</label>
									<PGinputText
										value={paginationWrap?.options?.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
										onChange={(newVal) => {
											var optionsX = {
												...paginationWrap,
												options: {
													...paginationWrap?.options,
													class: newVal,
												},
											};
											setpaginationWrap(optionsX);
										}}
									/>
								</div>
							</PGtab>
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
									onBulkAdd={(sudoSource, cssObj) =>
										onBulkAddStyle(
											sudoSource,
											cssObj,
											paginationWrap,
											setpaginationWrap
										)
									}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>

					<PanelBody
						className="font-medium text-slate-900 "
						title="Pagination Item"
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
									<label className="" htmlFor="">
										{__("Class", "woocommerce-products-slider")}
									</label>
									<PGinputText
										value={paginationItem?.options?.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
										onChange={(newVal) => {
											var optionsX = {
												...paginationItem,
												options: {
													...paginationItem?.options,
													class: newVal,
												},
											};
											setpaginationItem(optionsX);
										}}
									/>
								</div>
							</PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={paginationItem}
									onChange={(sudoScource, newVal, attr) =>
										onChangeStyle(
											sudoScource,
											newVal,
											attr,
											paginationItem,
											setpaginationItem
										)
									}
									onAdd={(sudoScource, key) =>
										onAddStyle(
											sudoScource,
											key,
											paginationItem,
											setpaginationItem
										)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(
											sudoScource,
											key,
											paginationItem,
											setpaginationItem
										)
									}
									onReset={(sudoSources) =>
										onResetStyle(sudoSources, paginationItem, setpaginationItem)
									}
									onBulkAdd={(sudoSource, cssObj) =>
										onBulkAddStyle(
											sudoSource,
											cssObj,
											paginationItem,
											setpaginationItem
										)
									}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>

					<PanelBody
						className="font-medium text-slate-900 "
						title="pagination Item Active"
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
									<label className="" htmlFor="">
										{__("Class", "woocommerce-products-slider")}
									</label>
									<PGinputText
										value={paginationItemActive?.options?.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
										onChange={(newVal) => {
											var optionsX = {
												...paginationItemActive,
												options: {
													...paginationItemActive?.options,
													class: newVal,
												},
											};
											setpaginationItemActive(optionsX);
										}}
									/>
								</div>
							</PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={paginationItemActive}
									onChange={(sudoScource, newVal, attr) =>
										onChangeStyle(
											sudoScource,
											newVal,
											attr,
											paginationItemActive,
											setpaginationItemActive
										)
									}
									onAdd={(sudoScource, key) =>
										onAddStyle(
											sudoScource,
											key,
											paginationItemActive,
											setpaginationItemActive
										)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(
											sudoScource,
											key,
											paginationItemActive,
											setpaginationItemActive
										)
									}
									onReset={(sudoSources) =>
										onResetStyle(sudoSources, paginationItemActive, setpaginationItemActive)
									}
									onBulkAdd={(sudoSource, cssObj) =>
										onBulkAddStyle(
											sudoSource,
											cssObj,
											paginationItemActive,
											setpaginationItemActive
										)
									}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody> */}
				</>
			)}
		</div>
	);
}

class EditTestimonialGrid extends Component {
	constructor(props) {
		super(props);
		this.state = { showWarning: true, isLoaded: false };
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}

	handleToggleClick() {
		this.setState((state) => ({
			showWarning: !state.showWarning,
		}));
	}

	render() {
		var { onChange, postData, customerData, addNotifications, setHelp } =
			this.props;

		return (
			<Html
				onChange={onChange}
				addNotifications={addNotifications}
				postData={postData}
				customerData={customerData}
				setHelp={setHelp}
				warn={this.state.showWarning}
				isLoaded={this.state.isLoaded}
			/>
		);
	}
}

export default EditTestimonialGrid;
