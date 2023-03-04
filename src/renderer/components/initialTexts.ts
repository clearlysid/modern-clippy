import Sample from './sample.json'
import type { ChatMessage } from '../types'

export default [
		{
			type: "outgoing",
			data: "how tall is the eiffel tower"
		},
		{
			type: "incoming",
			data: Sample[0]
		},
		{
			type: "outgoing",
			data: "how tall is the eiffel tower"
		},
		{
			type: "incoming",
			data: Sample[0]
		},
		{
			type: "outgoing",
			data: "how tall is the eiffel tower"
		},
		{
			type: "incoming",
			data: Sample[0]
		},
		{
			type: "outgoing",
			data: "how tall is the eiffel tower"
		},
		{
			type: "incoming",
			data: Sample[0]
		},
		{
			type: "outgoing",
			data: "how tall is the eiffel tower"
		},
		{
			type: "incoming",
			data: Sample[0]
		},
		{
			type: "outgoing",
			data: "how tall is the eiffel tower"
		},
	] as ChatMessage[]