const { Component, useState, useEffect } = wp.element;
import apiFetch from "@wordpress/api-fetch";
import { __ } from "@wordpress/i18n";

import { PanelRow, Spinner } from "@wordpress/components";
import { Icon, brush, category, close, cog, columns } from "@wordpress/icons";
import PGDropdown from "../dropdown";
import PGinputSelect from "../input-select";
import PGinputText from "../input-text";

import BuilderView from "../../components/BuilderView";
import BuilderWelcome from "../../components/BuilderWelcome";
import EditTestimonialGrid from "../../components/edit-wcps-grid";

import PGtabs from "../../components/tabs";

import PGtab from "../../components/tab";

// import TestimonialList from "../../components/wcps-list";
import EditTestimonialCarousel from "../edit-wcps-carousel";
import GenerateCss from "./generate-css";
import TestimonialList from "./wcps-list";
import Help from "./help";
import Notify from "./notify";
import Templates from "./templates";
import wcpsSliderDefaultData from "./wcps-carousel-default-data";
import wcpsFilterableDefaultData from "./wcps-fliterable-default-data";
import wcpsGridDefaultData from "./wcps-grid-default-data";
import wcpsMasonryDefaultData from "./wcps-masonry-default-data";
import EditTestimonialFilterable from "../edit-wcps-filterable";
import EditTestimonialMasonry from "../edit-wcps-masonry";

function Html(props) {
	if (!props.warn) {
		return null;
	}

	var appData = props.appData;

	var [activeTestimonial, setActiveTestimonial] = useState(null);
	var [postData, setpostData] = useState({
		ID: null,
		post_content: {},
		post_title: "",
	});
	var [wcpsData, setwcpsData] = useState(postData?.post_content);
	var [globalOptions, setglobalOptions] = useState(wcpsData.globalOptions); // Using the hook.

	var [isLoading, setisLoading] = useState(false);
	var [pleaseUpdate, setpleaseUpdate] = useState(false);
	const [optionData, setoptionData] = useState({});
	const [roles, setroles] = useState([]);
	var [needSave, setneedSave] = useState(false);
	var [toggleSettings, settoggleSettings] = useState(false);

	var [notifications, setnotifications] = useState([]);
	var [help, sethelp] = useState({ id: "", enable: false });
	var [customerData, setcustomerData] = useState({ id: "", isPro: false });
	var [isProFeature, setisProFeature] = useState(true);

	var viewTypeArgs = {
		wcpsGrid: { label: "WCPS Grid", value: "wcpsGrid" },
		wcpsSlider: {
			label: "WCPS Slider/Carousel",
			value: "wcpsSlider",
		},
		// filterable: {
		// 	label: "Filterable",
		// 	value: "filterable",
		// 	// isPro: true
		// },
		wcpsMasonry: {
			label: "Masonry",
			value: "wcpsMasonry",
			// isPro: true
		},
	};

	useEffect(() => {
		setwcpsData(postData.post_content);
		//setglobalOptions(postData.post_content.globalOptions);
	}, [postData]);

	useEffect(() => {
		//setglobalOptions(wcpsData.globalOptions);
	}, [wcpsData]);

	useEffect(() => {

		if (globalOptions?.viewType == "wcpsGrid") {
			setpostData({ ...postData, post_content: wcpsGridDefaultData });
		}
		if (globalOptions?.viewType == "wcpsSlider") {
			setpostData({ ...postData, post_content: wcpsSliderDefaultData });
		}
		if (globalOptions?.viewType == "wcpsMasonry") {
			setpostData({ ...postData, post_content: wcpsMasonryDefaultData });
		}



	}, [globalOptions]);

	useEffect(() => {
		setisLoading(true);

		if (activeTestimonial == null) return;

		apiFetch({
			path: "/wcps/v2/wcps_data",
			method: "POST",
			data: {
				postId: activeTestimonial,
				_wpnonce: wcps_builder_js._wpnonce,
			},
		}).then((res) => {
			setisLoading(false);


			if (res.post_content == null) {
				res.post_content = wcpsGridDefaultData;
			}

			setpostData(res);
		});
	}, [activeTestimonial]);

	useEffect(() => {
		setnotifications(notifications);

		const timer = setTimeout(() => {
			setnotifications([]); // Update the debounced value after delay
		}, 5000); // 300ms debounce delay

		return () => clearTimeout(timer); // Cleanup timer on value change or unmount
	}, [notifications]);

	useEffect(() => {
		if (customerData.isPro) {
			setisProFeature(false);
		}
	}, [customerData]);

	function handleAlertConfirmation() {
		if (confirm("Are you sure you want to reset the option data?")) {
			resetOptionData();
		}
	}

	function resetOptionData() {
		setoptionData(optionDataDefault);
	}

	function updateOption() {
		setisLoading(true);
		apiFetch({
			path: "/wcps/v2/update_options",
			method: "POST",
			data: { name: "wcps_settings", value: optionData },
		}).then((res) => {
			setisLoading(false);
			if (res.status) {
				setneedSave(false);
			}
		});
	}

	function addNotifications(notification) {
		var notificationsX = [...notifications];
		notificationsX.push(notification);
		setnotifications(notificationsX);
	}
	function setHelp(helpX) {
		sethelp(helpX);
	}

	function selectTestimonial(args) {
		setActiveTestimonial(args);
	}
	function onChangeStyle(args) {
		var wcpsDataX = { ...wcpsData };


		wcpsDataX.reponsiveCss = escapeHTML(args);
		//wcpsDataX.reponsiveCss = (args);
		setwcpsData(wcpsDataX);
	}

	function onChangeTestimonial(args) {

		console.log(args);

		var postDataX = { ...postData };
		postDataX.post_content = args;
		setpostData(postDataX);

		setwcpsData(args);

		setpleaseUpdate(true);
	}

	function onUpdateTestimonial() {
		setisLoading(true);


		var content = wcpsData;
		//content = JSON.stringify(content);


		apiFetch({
			path: "/wcps/v2/update_post_data",
			method: "POST",
			data: {
				postId: activeTestimonial,
				content: content,
				_wpnonce: wcps_builder_js._wpnonce,
			},
		}).then((res) => {
			setisLoading(false);
			setpleaseUpdate(false);
			addNotifications({
				title: "Data Saved!",
				content: "You change successfully saved!.",
				type: "success",
			});
		});
	}

	useEffect(() => {
		apiFetch({
			path: "/wcps/v2/user_roles_list",
			method: "POST",
			data: {},
		}).then((res) => {
			var rolesX = [];
			Object.entries(res?.roles).map((role) => {
				var index = role[0];
				var val = role[1];
				rolesX.push({ label: val, value: index });
			});

			setroles(rolesX);
		});
	}, []);

	useEffect(() => {
		setisLoading(true);
		apiFetch({
			path: "/wcps/v2/get_options",
			method: "POST",
			data: { option: "wcps_settings" },
		}).then((res) => {
			if (res.length != 0) {
				var resX = { ...res };
				if (resX?.license_key?.length > 0) {
					setcustomerData({ ...customerData, isPro: true });
				}

				setoptionData(resX);
			}
			setisLoading(false);
		});
	}, []);

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


	return (
		<div className="pg-setting-input-text pg-dashboard">
			<div className="flex h-[800px]">
				<div className="w-[500px] overflow-y-scroll light-scrollbar">
					<div className="flex items-center justify-between bg-blue-700 py-3 px-3">
						<div>
							<div className="flex items-center align-middle gap-3">
								<div className="text-xl text-white">WCPS Builder</div>
								<div className="text-xs text-white flex items-center gap-2">
									{/* <span>2.3.5</span>{" "} */}
									<span className="bg-lime-600 px-3 py-1 rounded-md">Beta</span>
								</div>
							</div>
							<div className="text-sm text-white">By PickPlugins</div>
						</div>

						<div>
							<div
								className={`py-1 px-2 cursor-pointer  capitalize  text-white font-medium rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700 ${toggleSettings ? "bg-gray-800" : "bg-gray-500"
									}`}
								onClick={(ev) => {
									settoggleSettings(!toggleSettings);
								}}>
								{isLoading && <Spinner />}
								{!isLoading && (
									<>
										{toggleSettings && <Icon fill={"#fff"} icon={close} />}
										{!toggleSettings && <Icon fill={"#fff"} icon={cog} />}
									</>
								)}
							</div>
						</div>
					</div>

					{toggleSettings && (
						<>
							<div className="relative bg-white">
								<div className="px-4 py-2 bg-slate-400 text-white  ">
									<div className="text-xl text-white mb-4">
										WCPS Settings
									</div>

									<div className="flex gap-2 items-center">
										<div
											className="bg-amber-500 rounded-sm text-md p-2 px-4 cursor-pointer pg-font text-white "
											onClick={(ev) => {
												handleAlertConfirmation();
											}}>
											{__("Reset", "woocommerce-products-slider")}
										</div>
										<div
											className="bg-green-700 rounded-sm text-md p-2 px-4 cursor-pointer pg-font text-white flex items-center"
											onClick={(ev) => {
												updateOption();
											}}>
											<span>{__("Save", "woocommerce-products-slider")}</span>
											{needSave && (
												<span className="w-5 inline-block h-5 ml-3 rounded-xl text-center bg-red-500">
													!
												</span>
											)}
										</div>
									</div>
								</div>

								<div className="p-3">
									<div className="my-5">
										<label className=" text-base" htmlFor="">
											{__("Allow access by roles", "woocommerce-products-slider")}
										</label>
										<PGinputSelect
											val={optionData?.user_roles ?? []}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[250px]"
											options={roles}
											onChange={(newVal) => {
												var optionsX = {
													...optionData,
													user_roles: newVal,
												};
												setoptionData(optionsX);
											}}
											multiple={true}
										/>
									</div>
									<div className="my-5">
										<label className="text-base" htmlFor="">
											{__("Font-awesome version", "woocommerce-products-slider")}
										</label>
										<PGinputSelect
											val={optionData?.font_aw_version ?? "none"}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[250px]"
											options={[
												{ label: "None", value: "none" },
												{ label: "Version 4+", value: "v_4" },
												{ label: "Version 5+", value: "v_5" },
											]}
											onChange={(newVal) => {
												var optionsX = {
													...optionData,
													font_aw_version: newVal,
												};
												setoptionData(optionsX);
											}}
											multiple={false}
										/>
									</div>

									<div className="my-5">
										<label className="text-base" htmlFor="">
											{__("Enable wcps preview", "woocommerce-products-slider")}
										</label>
										<PGinputSelect
											val={optionData?.wcps_preview ?? "no"}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[250px]"
											options={[
												{ label: "No", value: "no" },
												{ label: "Yes", value: "yes" },
											]}
											onChange={(newVal) => {
												var optionsX = {
													...optionData,
													wcps_preview: newVal,
												};
												setoptionData(optionsX);
											}}
											multiple={false}
										/>
									</div>
									<div className="my-5">
										<label className="text-base" htmlFor="">
											{__("Open AI API Key", "woocommerce-products-slider")}
										</label>

										<PGinputText
											label=""
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[250px]"
											value={optionData?.openaiApiKey ?? ""}
											onChange={(newVal) => {
												var optionsX = {
													...optionData,
													openaiApiKey: newVal,
												};
												setoptionData(optionsX);
											}}
										/>
									</div>
									<div className="my-5">
										<div className="text-base" htmlFor="">
											{__("License Key", "woocommerce-products-slider")}
										</div>

										<PGinputText
											label=""
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[250px]"
											value={optionData?.license_key ?? ""}
											onChange={(newVal) => {
												var optionsX = {
													...optionData,
													license_key: newVal,
												};
												setoptionData(optionsX);
											}}
										/>
									</div>
								</div>
							</div>
						</>
					)}

					{!toggleSettings && (
						<>
							<PGtabs
								activeTab="woocommerce-products-slider"
								orientation=""
								stickyNavs={true}
								contentClass=" bg-white w-full"
								navItemClass="bg-gray-200 px-5 py-3 gap-2 grow "
								navItemLabelClass="flex-col "
								navItemSelectedClass="!bg-white"
								activeClass="active-tab"
								onSelect={(tabName) => { }}
								tabs={[
									{
										name: "woocommerce-products-slider",
										title: "WCPS",
										icon: columns,
										className: "tab-disable-blocks",
									},
									{
										name: "edit",
										title: "Edit",
										icon: brush,
										className: "tab-disable-blocks",
									},
									{
										name: "templates",
										title: "Templates",
										icon: category,
										className: "tab-disable-blocks",
									},
								]}>
								<PGtab name="woocommerce-products-slider">
									<div className="relative p-3">
										{postData?.post_content == null && (
											<div className="p-3 my-5 bg-orange-400">
												Please choose an WCPS first.
											</div>
										)}

										<TestimonialList
											addNotifications={addNotifications}
											selectTestimonial={selectTestimonial}
											activeTestimonial={activeTestimonial}
											setHelp={setHelp}
										/>
									</div>
								</PGtab>
								<PGtab name="edit">
									{postData?.ID == null && (
										<div className="py-3">
											<div className="my-3 bg-orange-400 p-3  text-white  text-center animate__animated animate__flash animate__repeat-2">
												Please select post from list.
											</div>
										</div>
									)}

									<div className=" ">
										{postData?.ID != null && (
											<>
												<div className="my-4 p-3">
													<PanelRow>
														<label htmlFor="">View Type?</label>
														<PGDropdown
															position="bottom right"
															variant="secondary"
															buttonTitle={
																postData?.post_content?.globalOptions?.viewType
																	? viewTypeArgs[
																		postData?.post_content?.globalOptions
																			?.viewType
																	]?.label
																	: "Choose"
															}
															options={viewTypeArgs}
															onChange={(option, index) => {



																if (
																	confirm("Data will reset, Please confirm?")
																) {

																	if (option.value == "wcpsGrid") {
																		setpostData({
																			...postData,
																			post_content: wcpsGridDefaultData,
																		});
																	}
																	if (option.value == "wcpsSlider") {
																		setpostData({
																			...postData,
																			post_content:
																				wcpsSliderDefaultData,
																		});
																	}
																	if (option.value == "filterable") {
																		setpostData({
																			...postData,
																			post_content:
																				wcpsFilterableDefaultData,
																		});
																	}
																	if (option.value == "wcpsMasonry") {
																		setpostData({
																			...postData,
																			post_content:
																				wcpsMasonryDefaultData,
																		});
																	}

																}
															}}
															values=""></PGDropdown>
													</PanelRow>
												</div>



												{postData.post_content.globalOptions?.viewType ==
													"wcpsGrid" && (
														<EditTestimonialGrid
															onChange={onChangeTestimonial}
															addNotifications={addNotifications}
															postData={postData}
															customerData={customerData}
															setHelp={setHelp}
														/>
													)}

												{postData.post_content.globalOptions?.viewType ==
													"wcpsSlider" && (
														<EditTestimonialCarousel
															onChange={onChangeTestimonial}
															addNotifications={addNotifications}
															postData={postData}
															customerData={customerData}
															setHelp={setHelp}
														/>
													)}
												{postData.post_content.globalOptions?.viewType ==
													"filterable" && (
														<EditTestimonialFilterable
															onChange={onChangeTestimonial}
															addNotifications={addNotifications}
															postData={postData}
															customerData={customerData}
															setHelp={setHelp}
														/>
													)}
												{postData.post_content.globalOptions?.viewType ==
													"wcpsMasonry" && (
														<EditTestimonialMasonry
															onChange={onChangeTestimonial}
															addNotifications={addNotifications}
															postData={postData}
															customerData={customerData}
															setHelp={setHelp}
														/>
													)}


											</>
										)}
									</div>
								</PGtab>
								<PGtab name="templates">
									{postData?.ID == null && (
										<div className="py-3">
											<div className="my-3 bg-orange-400 p-3  text-white  text-center animate__animated animate__flash animate__repeat-2">
												Please select post from list.
											</div>
										</div>
									)}

									<Templates
										onChange={onChangeTestimonial}
										addNotifications={addNotifications}
										postData={postData}
										customerData={customerData}
										setHelp={setHelp}
									/>
								</PGtab>
							</PGtabs>
						</>
					)}
				</div>
				<div className="w-full sticky top-0 overflow-y-scroll">
					<div className="  relative">
						<div className="my-3 hidden bg-orange-400 p-3 ml-5 text-white  text-center animate__animated animate__flash animate__repeat-2">
							<div className="text-xl">
								<i class="fa-solid fa-triangle-exclamation"></i> Please test the
								WCPS Builder and{" "}
								<span
									className="font-bold cursor-pointer underline"
									onClick={(ev) => {
										settoggleSettings(!toggleSettings);
									}}>
									send us feedbacks.
								</span>
							</div>
							<div>
								Please do not use for old WCPS, we will add migration
								later.
							</div>
						</div>



						{(postData?.ID == null || toggleSettings) && (
							<BuilderWelcome
								appData={appData}
								addNotifications={addNotifications}
								customerData={customerData}
							/>
						)}

						{!toggleSettings && postData?.ID != null && (
							<BuilderView
								pleaseUpdate={pleaseUpdate}
								onUpdate={onUpdateTestimonial}
								isLoading={isLoading}
								onChange={onChangeTestimonial}
								postData={postData}
								id={activeTestimonial}
								addNotifications={addNotifications}
								setHelp={setHelp}
							/>
						)}



						{postData?.ID != null && (
							<GenerateCss postData={postData} onChange={onChangeStyle} />
						)}
					</div>
				</div>
			</div>

			<Notify notifications={notifications} />
			<Help help={help} />
		</div>
	);
}

class Builder extends Component {
	constructor(props) {
		super(props);
		this.state = { showWarning: true };
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}

	handleToggleClick() {
		this.setState((state) => ({
			showWarning: !state.showWarning,
		}));
	}

	render() {
		var { onChange, appData } = this.props;

		return <Html appData={appData} warn={this.state.showWarning} />;
	}
}

export default Builder;
