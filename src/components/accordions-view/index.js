
const { Component, RawHTML, useState, useEffect } = wp.element;

import { Icon, close, settings, cloud, plus } from "@wordpress/icons";
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
import { Splide, SplideTrack } from "@splidejs/react-splide";

import PGDropdown from '../../components/dropdown'


var myStore = wp.data.select("postgrid-shop");

function Html(props) {
	if (!props.warn) {
		return null;
	}

	var id = props.id;
	var isLoading = props.isLoading;


	var postData = props.postData;
	var wcpsData = postData?.post_content;


	var loopLayout = wcpsData?.loopLayout;
	var wrapper = wcpsData?.wrapper;
	var item = wcpsData?.item;
	var sliderOptions = wcpsData?.sliderOptions;
	var prev = wcpsData?.prev;
	var next = wcpsData?.next;
	var prevIcon = wcpsData?.prevIcon;
	var nextIcon = wcpsData?.nextIcon;



	const [prevIconHtml, setPrevIconHtml] = useState("");
	const [nextIconHtml, setNextIconHtml] = useState("");

	useEffect(() => {
		var iconSrc = nextIcon?.options?.iconSrc;
		var iconHtml = `<span class="${iconSrc}"></span>`;
		setNextIconHtml(iconHtml);
	}, [nextIcon?.options]);
	useEffect(() => {
		var iconSrc = prevIcon?.options?.iconSrc;
		var iconHtml = `<span class="${iconSrc}"></span>`;
		setPrevIconHtml(iconHtml);
	}, [prevIcon?.options]);




	var sliderElementsDummyData = {

		// wrapper: { label: "Wrapper", value: "wrapper", prams: { options: {}, styles: {} }, childs: [] },
		postTitle: { label: "Post Title", html: `Product Title`, },
		thumbnail: { label: "Thumbnail", value: "thumbnail", },
		productCategory: { label: "Product Category", terms: ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"], },
		productTag: { label: "Product Tag", terms: ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"], },
		saleCount: { label: "Sale Count", value: "123", },
		featuredMark: { label: "Featured Mark", value: "featuredMark", },
		onSaleMark: { label: "On Sale Mark", value: "On Sale", },
		addToCart: { label: "Add To Cart", value: "add To Cart", },
		rating: { label: "Rating", value: "4.5", },
		productPrice: { label: "Product Price", value: "123", },
		productId: { label: "Product Id", value: "123", },

		termTitle: { label: "Term Title", value: "Term Title", },
		termThumb: { label: "Term Thumb", value: "", },
		termDescription: { label: "Term Description", value: "term Description", },
		termSlug: { label: "Term Slug", value: "term-slug", },
		termPostCount: { label: "Term Post Count", value: "123", },
		customText: { label: "Custom Text", value: "Custom Text", },

		// dokanStoreName: { label: "Dokan Store Name", value: "dokanStoreName", },
		// dokanStoreAddress: { label: "Dokan Store Address", value: "dokanStoreAddress", },
		// dokanStoreCity: { label: "Dokan Store City", value: "dokanStoreCity", },
		// dokanStoreCountry: { label: "Dokan Store Country", value: "dokanStoreCountry", },
		// dokanStorePhone: { label: "Dokan Store Phone", value: "dokanStorePhone", },
		// dokanBanner: { label: "Dokan Banner", value: "dokanBanner", },
		// dokanAvatar: { label: "Dokan Avatar", value: "dokanAvatar", },

		// eddPrice: { label: "Edd Price", value: "eddPrice", },
		// eddAddToCart: { label: "Edd Add To Cart", value: "eddAddToCart", },
		// eddCategories: { label: "Edd Categories", value: "eddCategories", },
		// eddTags: { label: "Edd Tags", value: "eddTags", },

		// yithQuickView: { label: "Yith Quick View", value: "yithQuickView", },
		// yithWishlist: { label: "Yith Wishlist", value: "yithWishlist", },
		// yithCompare: { label: "Yith Compare", value: "yithCompare", },
		// yithBrands: { label: "Yith Brands", value: "yithBrands", },
		// yithBadges: { label: "Yith Badges", value: "yithBadges", },
		// wpcCountdownTimer: { label: "Wpc Countdown Timer", value: "wpcCountdownTimer", },
		// wooSmartWishlist: { label: "Woo Smart Wishlist", value: "wooSmartWishlist", },
		// wooSmartQuickView: { label: "Woo Smart Quick View", value: "wooSmartQuickView", },
		// wooSmartCompare: { label: "Woo Smart Compare", value: "wooSmartCompare", },
		// wishlistForWc: { label: "Wishlist For Wc", value: "wishlistForWc", },
		// wishlist: { label: "Wishlist", value: "wishlist", },
		// tiWishlist: { label: "Ti Wishlist", value: "tiWishlist", },
		// perfectBrands: { label: "Perfect Brands", value: "perfectBrands", },
		// advancedProductLabels: { label: "Advanced Product Labels", value: "advancedProductLabels", },
	}
		;





	return (
		<div className="ml-5">





			<div className="flex items-center justify-between align-middle bg-white p-5  mb-5">
				<div className="flex items-center gap-5">





					<h2>
						{postData?.post_title && (
							<>You are editing: {postData.post_title}</>
						)}
					</h2>
				</div>

				<div>
					{isLoading && (
						<div className="">
							<Spinner />
						</div>
					)}
				</div>
			</div>

			<div></div>






			<div className={`my-5 ${wrapper?.options?.class} `}>
				<Splide hasTrack={false} options={sliderOptions}>
					<SplideTrack>
						<div className={`splide__slide my-5 ${item?.options?.class} `}>
							{loopLayout?.map(layout => {
								return (
									<div>
										{layout.id}
									</div>
								)
							})}
						</div>
						<div className={`splide__slide my-5 ${item?.options?.class} `}>
							{loopLayout?.map(layout => {
								return (
									<div>
										{layout.id}
									</div>
								)
							})}
						</div>
						<div className={`splide__slide my-5 ${item?.options?.class} `}>
							{loopLayout?.map(layout => {
								return (
									<div>
										{layout.id}
									</div>
								)
							})}
						</div>
						<div className={`splide__slide my-5 ${item?.options?.class} `}>
							{loopLayout?.map(layout => {
								return (
									<div>
										{layout.id}
									</div>
								)
							})}
						</div>
						<div className={`splide__slide my-5 ${item?.options?.class} `}>
							{loopLayout?.map(layout => {
								return (
									<div>
										{layout.id}
									</div>
								)
							})}
						</div>



					</SplideTrack>
					<div className="splide__arrows">
						<div className="prev splide__arrow splide__arrow--prev">
							{prevIcon?.options.position == "before" && (
								<span
									className="icon"
									dangerouslySetInnerHTML={{ __html: prevIconHtml }}
								/>
							)}
							{prev?.options.text.length > 0 && (
								<span> {prev.options.text} </span>
							)}
							{prevIcon?.options.position == "after" && (
								<span
									className="icon"
									dangerouslySetInnerHTML={{ __html: prevIconHtml }}
								/>
							)}
						</div>
						<div className="next splide__arrow splide__arrow--next">
							{nextIcon?.options.position == "before" && (
								<span
									className="icon"
									dangerouslySetInnerHTML={{ __html: nextIconHtml }}
								/>
							)}
							{next?.options.text.length > 0 && (
								<span> {next.options.text} </span>
							)}
							{nextIcon?.options.position == "after" && (
								<span
									className="icon"
									dangerouslySetInnerHTML={{ __html: nextIconHtml }}
								/>
							)}
						</div>
					</div>
					<ul className="splide__pagination "></ul>
				</Splide>
			</div>


		</div>
	);
}

class AccordionsView extends Component {
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
		var { postData, id, isLoading } = this.props;

		return <Html isLoading={isLoading} postData={postData} id={id} warn={this.state.showWarning} />;
	}
}

export default AccordionsView;
