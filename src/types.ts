export type ChatMessage = {
	type: "incoming" | "outgoing";
	data: string | BingResponse;
};

export type BingResponse = {
	author: string;
	invocationId: string;
	text: string;
	detail: Detail;
};

export type Detail = {
	text: string;
	author: string;
	createdAt: Date;
	timestamp: Date;
	messageId: string;
	requestId: string;
	offense: string;
	adaptiveCards: AdaptiveCard[];
	sourceAttributions: SourceAttribution[];
	feedback: Feedback;
	contentOrigin: string;
	privacy: null;
	suggestedResponses: SuggestedResponse[];
};

export type AdaptiveCard = {
	type: string;
	version: string;
	body: Body[];
};

export type Body = {
	type: string;
	text: string;
	wrap: boolean;
	size?: string;
};

export type Feedback = {
	tag: null;
	updatedOn: null;
	type: string;
};

export type SourceAttribution = {
	providerDisplayName: string;
	seeMoreUrl: string;
	imageLink?: string;
	imageWidth?: string;
	imageHeight?: string;
	imageFavicon?: string;
	searchQuery: string;
};

export type SuggestedResponse = {
	text: string;
	author: string;
	createdAt: Date;
	timestamp: Date;
	messageId: string;
	messageType: string;
	offense: string;
	feedback: Feedback;
	contentOrigin: string;
	privacy: null;
};
