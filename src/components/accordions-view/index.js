 
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
	var accordionDataX = postData.post_content;


	var wrapper = accordionDataX?.wrapper;
	var sliderOptions = accordionDataX?.sliderOptions;
	var prev = accordionDataX?.prev;
	var next = accordionDataX?.next;
	var prevIcon = accordionDataX?.prevIcon;
	var nextIcon = accordionDataX?.nextIcon;



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
						<div className={`splide__slide my-5 ${wrapper?.options?.class} `}>Item 1</div>
						<div className={`splide__slide my-5 ${wrapper?.options?.class} `}>Item 2</div>
						<div className={`splide__slide my-5 ${wrapper?.options?.class} `}>Item 3</div>
						<div className={`splide__slide my-5 ${wrapper?.options?.class} `}>Item 4</div>
						<div className={`splide__slide my-5 ${wrapper?.options?.class} `}>Item 5</div>


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

			<code>
				{JSON.stringify(wrapper)}
			</code>
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
