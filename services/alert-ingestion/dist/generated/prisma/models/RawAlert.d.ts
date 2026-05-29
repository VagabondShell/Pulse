import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type RawAlertModel = runtime.Types.Result.DefaultSelection<Prisma.$RawAlertPayload>;
export type AggregateRawAlert = {
    _count: RawAlertCountAggregateOutputType | null;
    _min: RawAlertMinAggregateOutputType | null;
    _max: RawAlertMaxAggregateOutputType | null;
};
export type RawAlertMinAggregateOutputType = {
    id: string | null;
    service: string | null;
    severity: string | null;
    message: string | null;
    status: string | null;
    incidentId: string | null;
    eventTime: Date | null;
    receivedAt: Date | null;
};
export type RawAlertMaxAggregateOutputType = {
    id: string | null;
    service: string | null;
    severity: string | null;
    message: string | null;
    status: string | null;
    incidentId: string | null;
    eventTime: Date | null;
    receivedAt: Date | null;
};
export type RawAlertCountAggregateOutputType = {
    id: number;
    service: number;
    severity: number;
    message: number;
    labels: number;
    status: number;
    incidentId: number;
    eventTime: number;
    receivedAt: number;
    _all: number;
};
export type RawAlertMinAggregateInputType = {
    id?: true;
    service?: true;
    severity?: true;
    message?: true;
    status?: true;
    incidentId?: true;
    eventTime?: true;
    receivedAt?: true;
};
export type RawAlertMaxAggregateInputType = {
    id?: true;
    service?: true;
    severity?: true;
    message?: true;
    status?: true;
    incidentId?: true;
    eventTime?: true;
    receivedAt?: true;
};
export type RawAlertCountAggregateInputType = {
    id?: true;
    service?: true;
    severity?: true;
    message?: true;
    labels?: true;
    status?: true;
    incidentId?: true;
    eventTime?: true;
    receivedAt?: true;
    _all?: true;
};
export type RawAlertAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RawAlertWhereInput;
    orderBy?: Prisma.RawAlertOrderByWithRelationInput | Prisma.RawAlertOrderByWithRelationInput[];
    cursor?: Prisma.RawAlertWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RawAlertCountAggregateInputType;
    _min?: RawAlertMinAggregateInputType;
    _max?: RawAlertMaxAggregateInputType;
};
export type GetRawAlertAggregateType<T extends RawAlertAggregateArgs> = {
    [P in keyof T & keyof AggregateRawAlert]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRawAlert[P]> : Prisma.GetScalarType<T[P], AggregateRawAlert[P]>;
};
export type RawAlertGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RawAlertWhereInput;
    orderBy?: Prisma.RawAlertOrderByWithAggregationInput | Prisma.RawAlertOrderByWithAggregationInput[];
    by: Prisma.RawAlertScalarFieldEnum[] | Prisma.RawAlertScalarFieldEnum;
    having?: Prisma.RawAlertScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RawAlertCountAggregateInputType | true;
    _min?: RawAlertMinAggregateInputType;
    _max?: RawAlertMaxAggregateInputType;
};
export type RawAlertGroupByOutputType = {
    id: string;
    service: string;
    severity: string;
    message: string;
    labels: runtime.JsonValue | null;
    status: string;
    incidentId: string | null;
    eventTime: Date;
    receivedAt: Date;
    _count: RawAlertCountAggregateOutputType | null;
    _min: RawAlertMinAggregateOutputType | null;
    _max: RawAlertMaxAggregateOutputType | null;
};
export type GetRawAlertGroupByPayload<T extends RawAlertGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RawAlertGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RawAlertGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RawAlertGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RawAlertGroupByOutputType[P]>;
}>>;
export type RawAlertWhereInput = {
    AND?: Prisma.RawAlertWhereInput | Prisma.RawAlertWhereInput[];
    OR?: Prisma.RawAlertWhereInput[];
    NOT?: Prisma.RawAlertWhereInput | Prisma.RawAlertWhereInput[];
    id?: Prisma.StringFilter<"RawAlert"> | string;
    service?: Prisma.StringFilter<"RawAlert"> | string;
    severity?: Prisma.StringFilter<"RawAlert"> | string;
    message?: Prisma.StringFilter<"RawAlert"> | string;
    labels?: Prisma.JsonNullableFilter<"RawAlert">;
    status?: Prisma.StringFilter<"RawAlert"> | string;
    incidentId?: Prisma.StringNullableFilter<"RawAlert"> | string | null;
    eventTime?: Prisma.DateTimeFilter<"RawAlert"> | Date | string;
    receivedAt?: Prisma.DateTimeFilter<"RawAlert"> | Date | string;
};
export type RawAlertOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    service?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    labels?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    incidentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    eventTime?: Prisma.SortOrder;
    receivedAt?: Prisma.SortOrder;
};
export type RawAlertWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.RawAlertWhereInput | Prisma.RawAlertWhereInput[];
    OR?: Prisma.RawAlertWhereInput[];
    NOT?: Prisma.RawAlertWhereInput | Prisma.RawAlertWhereInput[];
    service?: Prisma.StringFilter<"RawAlert"> | string;
    severity?: Prisma.StringFilter<"RawAlert"> | string;
    message?: Prisma.StringFilter<"RawAlert"> | string;
    labels?: Prisma.JsonNullableFilter<"RawAlert">;
    status?: Prisma.StringFilter<"RawAlert"> | string;
    incidentId?: Prisma.StringNullableFilter<"RawAlert"> | string | null;
    eventTime?: Prisma.DateTimeFilter<"RawAlert"> | Date | string;
    receivedAt?: Prisma.DateTimeFilter<"RawAlert"> | Date | string;
}, "id">;
export type RawAlertOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    service?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    labels?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    incidentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    eventTime?: Prisma.SortOrder;
    receivedAt?: Prisma.SortOrder;
    _count?: Prisma.RawAlertCountOrderByAggregateInput;
    _max?: Prisma.RawAlertMaxOrderByAggregateInput;
    _min?: Prisma.RawAlertMinOrderByAggregateInput;
};
export type RawAlertScalarWhereWithAggregatesInput = {
    AND?: Prisma.RawAlertScalarWhereWithAggregatesInput | Prisma.RawAlertScalarWhereWithAggregatesInput[];
    OR?: Prisma.RawAlertScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RawAlertScalarWhereWithAggregatesInput | Prisma.RawAlertScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RawAlert"> | string;
    service?: Prisma.StringWithAggregatesFilter<"RawAlert"> | string;
    severity?: Prisma.StringWithAggregatesFilter<"RawAlert"> | string;
    message?: Prisma.StringWithAggregatesFilter<"RawAlert"> | string;
    labels?: Prisma.JsonNullableWithAggregatesFilter<"RawAlert">;
    status?: Prisma.StringWithAggregatesFilter<"RawAlert"> | string;
    incidentId?: Prisma.StringNullableWithAggregatesFilter<"RawAlert"> | string | null;
    eventTime?: Prisma.DateTimeWithAggregatesFilter<"RawAlert"> | Date | string;
    receivedAt?: Prisma.DateTimeWithAggregatesFilter<"RawAlert"> | Date | string;
};
export type RawAlertCreateInput = {
    id?: string;
    service: string;
    severity: string;
    message: string;
    labels?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: string;
    incidentId?: string | null;
    eventTime?: Date | string;
    receivedAt?: Date | string;
};
export type RawAlertUncheckedCreateInput = {
    id?: string;
    service: string;
    severity: string;
    message: string;
    labels?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: string;
    incidentId?: string | null;
    eventTime?: Date | string;
    receivedAt?: Date | string;
};
export type RawAlertUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    service?: Prisma.StringFieldUpdateOperationsInput | string;
    severity?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    labels?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    incidentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RawAlertUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    service?: Prisma.StringFieldUpdateOperationsInput | string;
    severity?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    labels?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    incidentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RawAlertCreateManyInput = {
    id?: string;
    service: string;
    severity: string;
    message: string;
    labels?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: string;
    incidentId?: string | null;
    eventTime?: Date | string;
    receivedAt?: Date | string;
};
export type RawAlertUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    service?: Prisma.StringFieldUpdateOperationsInput | string;
    severity?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    labels?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    incidentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RawAlertUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    service?: Prisma.StringFieldUpdateOperationsInput | string;
    severity?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    labels?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    incidentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RawAlertCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    service?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    labels?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    incidentId?: Prisma.SortOrder;
    eventTime?: Prisma.SortOrder;
    receivedAt?: Prisma.SortOrder;
};
export type RawAlertMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    service?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    incidentId?: Prisma.SortOrder;
    eventTime?: Prisma.SortOrder;
    receivedAt?: Prisma.SortOrder;
};
export type RawAlertMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    service?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    incidentId?: Prisma.SortOrder;
    eventTime?: Prisma.SortOrder;
    receivedAt?: Prisma.SortOrder;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type RawAlertSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    service?: boolean;
    severity?: boolean;
    message?: boolean;
    labels?: boolean;
    status?: boolean;
    incidentId?: boolean;
    eventTime?: boolean;
    receivedAt?: boolean;
}, ExtArgs["result"]["rawAlert"]>;
export type RawAlertSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    service?: boolean;
    severity?: boolean;
    message?: boolean;
    labels?: boolean;
    status?: boolean;
    incidentId?: boolean;
    eventTime?: boolean;
    receivedAt?: boolean;
}, ExtArgs["result"]["rawAlert"]>;
export type RawAlertSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    service?: boolean;
    severity?: boolean;
    message?: boolean;
    labels?: boolean;
    status?: boolean;
    incidentId?: boolean;
    eventTime?: boolean;
    receivedAt?: boolean;
}, ExtArgs["result"]["rawAlert"]>;
export type RawAlertSelectScalar = {
    id?: boolean;
    service?: boolean;
    severity?: boolean;
    message?: boolean;
    labels?: boolean;
    status?: boolean;
    incidentId?: boolean;
    eventTime?: boolean;
    receivedAt?: boolean;
};
export type RawAlertOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "service" | "severity" | "message" | "labels" | "status" | "incidentId" | "eventTime" | "receivedAt", ExtArgs["result"]["rawAlert"]>;
export type $RawAlertPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RawAlert";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        service: string;
        severity: string;
        message: string;
        labels: runtime.JsonValue | null;
        status: string;
        incidentId: string | null;
        eventTime: Date;
        receivedAt: Date;
    }, ExtArgs["result"]["rawAlert"]>;
    composites: {};
};
export type RawAlertGetPayload<S extends boolean | null | undefined | RawAlertDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RawAlertPayload, S>;
export type RawAlertCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RawAlertFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RawAlertCountAggregateInputType | true;
};
export interface RawAlertDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RawAlert'];
        meta: {
            name: 'RawAlert';
        };
    };
    findUnique<T extends RawAlertFindUniqueArgs>(args: Prisma.SelectSubset<T, RawAlertFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RawAlertClient<runtime.Types.Result.GetResult<Prisma.$RawAlertPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RawAlertFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RawAlertFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RawAlertClient<runtime.Types.Result.GetResult<Prisma.$RawAlertPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RawAlertFindFirstArgs>(args?: Prisma.SelectSubset<T, RawAlertFindFirstArgs<ExtArgs>>): Prisma.Prisma__RawAlertClient<runtime.Types.Result.GetResult<Prisma.$RawAlertPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RawAlertFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RawAlertFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RawAlertClient<runtime.Types.Result.GetResult<Prisma.$RawAlertPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RawAlertFindManyArgs>(args?: Prisma.SelectSubset<T, RawAlertFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RawAlertPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RawAlertCreateArgs>(args: Prisma.SelectSubset<T, RawAlertCreateArgs<ExtArgs>>): Prisma.Prisma__RawAlertClient<runtime.Types.Result.GetResult<Prisma.$RawAlertPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RawAlertCreateManyArgs>(args?: Prisma.SelectSubset<T, RawAlertCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RawAlertCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RawAlertCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RawAlertPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RawAlertDeleteArgs>(args: Prisma.SelectSubset<T, RawAlertDeleteArgs<ExtArgs>>): Prisma.Prisma__RawAlertClient<runtime.Types.Result.GetResult<Prisma.$RawAlertPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RawAlertUpdateArgs>(args: Prisma.SelectSubset<T, RawAlertUpdateArgs<ExtArgs>>): Prisma.Prisma__RawAlertClient<runtime.Types.Result.GetResult<Prisma.$RawAlertPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RawAlertDeleteManyArgs>(args?: Prisma.SelectSubset<T, RawAlertDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RawAlertUpdateManyArgs>(args: Prisma.SelectSubset<T, RawAlertUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RawAlertUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RawAlertUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RawAlertPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RawAlertUpsertArgs>(args: Prisma.SelectSubset<T, RawAlertUpsertArgs<ExtArgs>>): Prisma.Prisma__RawAlertClient<runtime.Types.Result.GetResult<Prisma.$RawAlertPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RawAlertCountArgs>(args?: Prisma.Subset<T, RawAlertCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RawAlertCountAggregateOutputType> : number>;
    aggregate<T extends RawAlertAggregateArgs>(args: Prisma.Subset<T, RawAlertAggregateArgs>): Prisma.PrismaPromise<GetRawAlertAggregateType<T>>;
    groupBy<T extends RawAlertGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RawAlertGroupByArgs['orderBy'];
    } : {
        orderBy?: RawAlertGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RawAlertGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRawAlertGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RawAlertFieldRefs;
}
export interface Prisma__RawAlertClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RawAlertFieldRefs {
    readonly id: Prisma.FieldRef<"RawAlert", 'String'>;
    readonly service: Prisma.FieldRef<"RawAlert", 'String'>;
    readonly severity: Prisma.FieldRef<"RawAlert", 'String'>;
    readonly message: Prisma.FieldRef<"RawAlert", 'String'>;
    readonly labels: Prisma.FieldRef<"RawAlert", 'Json'>;
    readonly status: Prisma.FieldRef<"RawAlert", 'String'>;
    readonly incidentId: Prisma.FieldRef<"RawAlert", 'String'>;
    readonly eventTime: Prisma.FieldRef<"RawAlert", 'DateTime'>;
    readonly receivedAt: Prisma.FieldRef<"RawAlert", 'DateTime'>;
}
export type RawAlertFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RawAlertSelect<ExtArgs> | null;
    omit?: Prisma.RawAlertOmit<ExtArgs> | null;
    where: Prisma.RawAlertWhereUniqueInput;
};
export type RawAlertFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RawAlertSelect<ExtArgs> | null;
    omit?: Prisma.RawAlertOmit<ExtArgs> | null;
    where: Prisma.RawAlertWhereUniqueInput;
};
export type RawAlertFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RawAlertSelect<ExtArgs> | null;
    omit?: Prisma.RawAlertOmit<ExtArgs> | null;
    where?: Prisma.RawAlertWhereInput;
    orderBy?: Prisma.RawAlertOrderByWithRelationInput | Prisma.RawAlertOrderByWithRelationInput[];
    cursor?: Prisma.RawAlertWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RawAlertScalarFieldEnum | Prisma.RawAlertScalarFieldEnum[];
};
export type RawAlertFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RawAlertSelect<ExtArgs> | null;
    omit?: Prisma.RawAlertOmit<ExtArgs> | null;
    where?: Prisma.RawAlertWhereInput;
    orderBy?: Prisma.RawAlertOrderByWithRelationInput | Prisma.RawAlertOrderByWithRelationInput[];
    cursor?: Prisma.RawAlertWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RawAlertScalarFieldEnum | Prisma.RawAlertScalarFieldEnum[];
};
export type RawAlertFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RawAlertSelect<ExtArgs> | null;
    omit?: Prisma.RawAlertOmit<ExtArgs> | null;
    where?: Prisma.RawAlertWhereInput;
    orderBy?: Prisma.RawAlertOrderByWithRelationInput | Prisma.RawAlertOrderByWithRelationInput[];
    cursor?: Prisma.RawAlertWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RawAlertScalarFieldEnum | Prisma.RawAlertScalarFieldEnum[];
};
export type RawAlertCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RawAlertSelect<ExtArgs> | null;
    omit?: Prisma.RawAlertOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RawAlertCreateInput, Prisma.RawAlertUncheckedCreateInput>;
};
export type RawAlertCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RawAlertCreateManyInput | Prisma.RawAlertCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RawAlertCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RawAlertSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RawAlertOmit<ExtArgs> | null;
    data: Prisma.RawAlertCreateManyInput | Prisma.RawAlertCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RawAlertUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RawAlertSelect<ExtArgs> | null;
    omit?: Prisma.RawAlertOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RawAlertUpdateInput, Prisma.RawAlertUncheckedUpdateInput>;
    where: Prisma.RawAlertWhereUniqueInput;
};
export type RawAlertUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RawAlertUpdateManyMutationInput, Prisma.RawAlertUncheckedUpdateManyInput>;
    where?: Prisma.RawAlertWhereInput;
    limit?: number;
};
export type RawAlertUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RawAlertSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RawAlertOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RawAlertUpdateManyMutationInput, Prisma.RawAlertUncheckedUpdateManyInput>;
    where?: Prisma.RawAlertWhereInput;
    limit?: number;
};
export type RawAlertUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RawAlertSelect<ExtArgs> | null;
    omit?: Prisma.RawAlertOmit<ExtArgs> | null;
    where: Prisma.RawAlertWhereUniqueInput;
    create: Prisma.XOR<Prisma.RawAlertCreateInput, Prisma.RawAlertUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RawAlertUpdateInput, Prisma.RawAlertUncheckedUpdateInput>;
};
export type RawAlertDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RawAlertSelect<ExtArgs> | null;
    omit?: Prisma.RawAlertOmit<ExtArgs> | null;
    where: Prisma.RawAlertWhereUniqueInput;
};
export type RawAlertDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RawAlertWhereInput;
    limit?: number;
};
export type RawAlertDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RawAlertSelect<ExtArgs> | null;
    omit?: Prisma.RawAlertOmit<ExtArgs> | null;
};
