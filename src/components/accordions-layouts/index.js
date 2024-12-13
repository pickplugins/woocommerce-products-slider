const { Component, RawHTML, useState, useEffect } = wp.element;
import { __ } from "@wordpress/i18n";

import {
	Icon,
	__experimentalInputControl as InputControl,
	PanelBody,
	PanelRow,
	SelectControl,
} from "@wordpress/components";
import { brush, close, settings, menu, styles } from "@wordpress/icons";
import { ReactSortable } from "react-sortablejs";

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
	var postData = props.postData;

	var breakPointX = "Desktop";


	var wcpsData = postData.post_content;



	var [styleObj, setstyleObj] = useState({}); // Using the hook.

	var [loopLayout, setloopLayout] = useState(wcpsData.loopLayout); // Using the hook.



	useEffect(() => {

		onChange(loopLayout)

	}, [loopLayout]);





	var blockId = postData.ID;



	var sliderElementsArgs = {

		// wrapper: { label: "Wrapper", value: "wrapper", prams: { options: {}, styles: {} }, childs: [] },
		postTitle: { label: "Post Title", value: "postTitle", prams: { options: { linkTo: "" }, styles: {} } },
		thumbnail: { label: "Thumbnail", value: "thumbnail", prams: { options: { linkTo: "", thumbSize: "", defaultThumbSrc: "" }, styles: {} } },
		productCategory: { label: "Product Category", value: "productCategory", prams: { options: { maxCount: "", separator: "" }, styles: {} } },
		productTag: { label: "Product Tag", value: "productTag", prams: { options: { maxCount: "", separator: "" }, styles: {} } },
		saleCount: { label: "Sale Count", value: "saleCount", prams: { options: {}, styles: {} } },
		featuredMark: { label: "Featured Mark", value: "featuredMark", prams: { options: {}, styles: {} } },
		onSaleMark: { label: "On Sale Mark", value: "onSaleMark", prams: { options: {}, styles: {} } },
		addToCart: { label: "Add To Cart", value: "addToCart", prams: { options: {}, styles: {} } },
		rating: { label: "Rating", value: "rating", prams: { options: {}, styles: {} } },
		productPrice: { label: "Product Price", value: "productPrice", prams: { options: {}, styles: {} } },
		productId: { label: "Product Id", value: "productId", prams: { options: {}, styles: {} } },

		termTitle: { label: "Term Title", value: "termTitle", prams: { options: {}, styles: {} } },
		termThumb: { label: "Term Thumb", value: "termThumb", prams: { options: {}, styles: {} } },
		termDescription: { label: "Term Description", value: "termDescription", prams: { options: {}, styles: {} } },
		termSlug: { label: "Term Slug", value: "termSlug", prams: { options: {}, styles: {} } },
		termPostCount: { label: "Term Post Count", value: "termPostCount", prams: { options: {}, styles: {} } },
		customText: { label: "Custom Text", value: "customText", prams: { options: {}, styles: {} } },

		// dokanStoreName: { label: "Dokan Store Name", value: "dokanStoreName", prams: { options: {}, styles: {} } },
		// dokanStoreAddress: { label: "Dokan Store Address", value: "dokanStoreAddress", prams: { options: {}, styles: {} } },
		// dokanStoreCity: { label: "Dokan Store City", value: "dokanStoreCity", prams: { options: {}, styles: {} } },
		// dokanStoreCountry: { label: "Dokan Store Country", value: "dokanStoreCountry", prams: { options: {}, styles: {} } },
		// dokanStorePhone: { label: "Dokan Store Phone", value: "dokanStorePhone", prams: { options: {}, styles: {} } },
		// dokanBanner: { label: "Dokan Banner", value: "dokanBanner", prams: { options: {}, styles: {} } },
		// dokanAvatar: { label: "Dokan Avatar", value: "dokanAvatar", prams: { options: {}, styles: {} } },

		// eddPrice: { label: "Edd Price", value: "eddPrice", prams: { options: {}, styles: {} } },
		// eddAddToCart: { label: "Edd Add To Cart", value: "eddAddToCart", prams: { options: {}, styles: {} } },
		// eddCategories: { label: "Edd Categories", value: "eddCategories", prams: { options: {}, styles: {} } },
		// eddTags: { label: "Edd Tags", value: "eddTags", prams: { options: {}, styles: {} } },

		// yithQuickView: { label: "Yith Quick View", value: "yithQuickView", prams: { options: {}, styles: {} } },
		// yithWishlist: { label: "Yith Wishlist", value: "yithWishlist", prams: { options: {}, styles: {} } },
		// yithCompare: { label: "Yith Compare", value: "yithCompare", prams: { options: {}, styles: {} } },
		// yithBrands: { label: "Yith Brands", value: "yithBrands", prams: { options: {}, styles: {} } },
		// yithBadges: { label: "Yith Badges", value: "yithBadges", prams: { options: {}, styles: {} } },
		// wpcCountdownTimer: { label: "Wpc Countdown Timer", value: "wpcCountdownTimer", prams: { options: {}, styles: {} } },
		// wooSmartWishlist: { label: "Woo Smart Wishlist", value: "wooSmartWishlist", prams: { options: {}, styles: {} } },
		// wooSmartQuickView: { label: "Woo Smart Quick View", value: "wooSmartQuickView", prams: { options: {}, styles: {} } },
		// wooSmartCompare: { label: "Woo Smart Compare", value: "wooSmartCompare", prams: { options: {}, styles: {} } },
		// wishlistForWc: { label: "Wishlist For Wc", value: "wishlistForWc", prams: { options: {}, styles: {} } },
		// wishlist: { label: "Wishlist", value: "wishlist", prams: { options: {}, styles: {} } },
		// tiWishlist: { label: "Ti Wishlist", value: "tiWishlist", prams: { options: {}, styles: {} } },
		// perfectBrands: { label: "Perfect Brands", value: "perfectBrands", prams: { options: {}, styles: {} } },
		// advancedProductLabels: { label: "Advanced Product Labels", value: "advancedProductLabels", prams: { options: {}, styles: {} } },
	}
		;


	var RemoveSliderArg = function ({ index }) {
		return (
			<span
				className="cursor-pointer hover:bg-red-500 hover:text-white "
				onClick={(ev) => {
					var loopLayoutX = { ...loopLayout };
					delete loopLayoutX[index];
					setloopLayout(loopLayoutX);
				}}>
				<Icon icon={close} />
			</span>
		);
	};




	return (
		<div className="">


			<PanelRow className="my-3">
				<label>{__("Add Elements", "post-grid")}</label>
				<PGDropdown
					position="bottom right"
					variant="secondary"
					buttonTitle={"Choose"}
					options={sliderElementsArgs}
					onChange={(option, index) => {

						console.log(option);


						var loopLayoutX = [...loopLayout];
						loopLayoutX.push({ id: option.value, ...option.prams });


						console.log(loopLayoutX);


						setloopLayout(loopLayoutX);
					}}
					values=""></PGDropdown>
			</PanelRow>
			<PanelRow className="justify-start gap-4 mb-3">

			</PanelRow>
			{/* {loopLayout.map((item, index) => {

				return (
					<PanelBody key={index} title={sliderElementsArgs[item.id]?.label}
						initialOpen={false}>
						<RemoveSliderArg index={index} />

						{item.id == "postTitle" && (
							<div >


							</div>
						)}

					</PanelBody>
				);
			})} */}



			<ReactSortable
				list={loopLayout}
				handle={".handle"}
				setList={(item) => {
					// setAttributes({
					// 	elements: { ...elements, items: item },
					// });
				}}>
				{loopLayout.map((item, index) => (
					<div key={item.id} className="">
						<PanelBody
							title={
								<>
									<span
										className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
										onClick={(ev) => {
											// var elementsX = loopLayout.splice(
											// 	index,
											// 	1
											// );
											// setAttributes({
											// 	elements: {
											// 		...elements,
											// 		items: loopLayout,
											// 	},
											// });
										}}>
										<Icon icon={close} />
									</span>
									<span className="handle cursor-pointer bg-gray-700 hover:bg-gray-600 hover:text-white px-1 py-1">
										<Icon icon={menu} />
									</span>
									<span className="mx-2">{sliderElementsArgs[item.id]?.label}</span>
								</>
							}
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
										icon: styles,
										className: "tab-style",
									},
								]}>
								<PGtab name="options">


									{(item.id == "postTitle") && (
										<div className="my-3">
											<label
												for=""
												className="font-medium text-slate-900 ">
												{__("postTitle", "post-grid")}
											</label>

										</div>
									)}



								</PGtab>
								<PGtab name="styles">
									{/* <PGStyles
																		obj={item}
																		extra={{ index: index }}
																		onChange={onChangeStyleItem}
																		onAdd={onAddStyleItem}
																		onRemove={onRemoveStyleItem}
																		onBulkAdd={onBulkAddItem}
																		onReset={onResetNthItem}
																	/> */}
								</PGtab>
							</PGtabs>
						</PanelBody>
					</div>
				))}
			</ReactSortable>






		</div>
	);
}

class AccordionsLayouts extends Component {
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

export default AccordionsLayouts;
