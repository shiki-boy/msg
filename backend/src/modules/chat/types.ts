import { Schema } from 'mongoose';
import { BaseFields } from './../../utils/types';

export interface ChatMessage extends BaseFields {
    text: string,
    author: Schema.Types.ObjectId
    channel: Schema.Types.ObjectId
}

type MemberId = string
type MemberName = string

export interface Channel extends BaseFields {
    title: string,
    members: Map<MemberId, MemberName>,
    isDirect: boolean
}