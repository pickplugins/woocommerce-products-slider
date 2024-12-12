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
	var postData = props.postData;

	var breakPointX = "Desktop";


	var accordionDataX = postData.post_content;



	var [styleObj, setstyleObj] = useState({}); // Using the hook.

	var [loopLayout, setloopLayout] = useState(accordionDataX.loopLayout); // Using the hook.









	var blockId = postData.ID;



	var sliderOptionsArgs = {
		post_title: { label: "post_title", value: "post_title" },
		thumbnail: { label: "thumbnail", value: "thumbnail" },
		product_category: { label: "product_category", value: "product_category" },
		product_tag: { label: "product_tag", value: "product_tag" },
		sale_count: { label: "sale_count", value: "sale_count" },
		featured_mark: { label: "featured_mark", value: "featured_mark" },
		on_sale_mark: { label: "on_sale_mark", value: "on_sale_mark" },
		add_to_cart: { label: "add_to_cart", value: "add_to_cart" },
		rating: { label: "rating", value: "rating" },
		product_price: { label: "product_price", value: "product_price" },
		product_id: { label: "product_id", value: "product_id" },

		term_title: { label: "term_title", value: "term_title" },
		term_thumb: { label: "term_thumb", value: "term_thumb" },
		term_description: { label: "term_description", value: "term_description" },
		term_slug: { label: "term_slug", value: "term_slug" },
		term_post_count: { label: "term_post_count", value: "term_post_count" },
		wrapper_start: { label: "wrapper_start", value: "wrapper_start" },
		custom_text: { label: "custom_text", value: "custom_text" },


		dokan_store_name: { label: "dokan_store_name", value: "dokan_store_name" },
		dokan_store_address: { label: "dokan_store_address", value: "dokan_store_address" },
		dokan_store_city: { label: "dokan_store_city", value: "dokan_store_city" },
		dokan_store_country: { label: "dokan_store_country", value: "dokan_store_country" },
		dokan_store_phone: { label: "dokan_store_phone", value: "dokan_store_phone" },
		dokan_banner: { label: "dokan_banner", value: "dokan_banner" },
		dokan_avatar: { label: "dokan_avatar", value: "dokan_avatar" },


		edd_price: { label: "edd_price", value: "edd_price" },
		edd_add_to_cart: { label: "edd_add_to_cart", value: "edd_add_to_cart" },
		edd_categories: { label: "edd_categories", value: "edd_categories" },
		edd_tags: { label: "edd_tags", value: "edd_tags" },


		yith_quick_view: { label: "yith_quick_view", value: "yith_quick_view" },
		yith_wishlist: { label: "yith_wishlist", value: "yith_wishlist" },
		yith_compare: { label: "yith_compare", value: "yith_compare" },
		yith_brands: { label: "yith_brands", value: "yith_brands" },
		yith_badges: { label: "yith_badges", value: "yith_badges" },
		wpc_countdown_timer: { label: "wpc_countdown_timer", value: "wpc_countdown_timer" },
		woo_smart_wishlist: { label: "woo_smart_wishlist", value: "woo_smart_wishlist" },
		woo_smart_quick_view: { label: "woo_smart_quick_view", value: "woo_smart_quick_view" },
		woo_smart_compare: { label: "woo_smart_compare", value: "woo_smart_compare" },
		wishlist_for_wc: { label: "wishlist_for_wc", value: "wishlist_for_wc" },
		wishlist: { label: "wishlist", value: "wishlist" },
		ti_wishlist: { label: "ti_wishlist", value: "ti_wishlist" },
		perfect_brands: { label: "perfect_brands", value: "perfect_brands" },
		advanced_product_labels: { label: "advanced_product_labels", value: "advanced_product_labels" },
		edd_tags: { label: "edd_tags", value: "edd_tags" },
		edd_tags: { label: "edd_tags", value: "edd_tags" },


	};


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


			<code className="break-all	p-4 block">
				{JSON.stringify(styleObj)}
			</code>

			<PanelRow className="my-3">
				<label>{__("Slider Options", "post-grid")}</label>
				<PGDropdown
					position="bottom right"
					variant="secondary"
					buttonTitle={"Choose"}
					options={sliderOptionsArgs}
					onChange={(option, index) => {
						var loopLayoutX = { ...loopLayout };
						loopLayoutX[index] = option.value;
						setloopLayout(loopLayoutX);
					}}
					values=""></PGDropdown>
			</PanelRow>
			<PanelRow className="justify-start gap-4 mb-3">

			</PanelRow>
			{Object.entries(loopLayout).map((item, index) => {
				var id = item[0];
				var value = item[1];
				return (
					<div key={index}>
						{id == "post_title" && (
							<PanelRow>
								<div className="flex items-center">
									<RemoveSliderArg index={id} />
									<span>{__("post_title?", "post-grid")}</span>
								</div>

							</PanelRow>
						)}

					</div>
				);
			})}

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
