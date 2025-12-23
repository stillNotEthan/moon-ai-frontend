'use client';

import React, { useEffect } from "react";
import { useForm, Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { NodeData } from "./types";

interface Props {
    node: NodeData | null;
    onUpdate: (data: NodeData) => void;
    className?: string;
}

const formSchema = z.object({
    id: z.string(),
    type: z.string(),
    label: z.string().min(1, "标签不能为空"),
    x: z.coerce.number(),
    y: z.coerce.number(),
    width: z.coerce.number().positive("宽度必须大于0"),
    height: z.coerce.number().positive("高度必须大于0"),
    color: z.string().optional(),
    imageUrl: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AttributesPanel = ({
    node,
    onUpdate,
    className,
}: Props) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as unknown as Resolver<FormValues>,
        defaultValues: node || {
            id: "",
            type: "rect",
            label: "",
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            color: "#ffffff",
            imageUrl: "",
        },
        values: node ? {
            ...node,
            color: node.color || "#ffffff",
            imageUrl: node.imageUrl || "",
        } : undefined,
        mode: "onChange",
    });

    useEffect(() => {
        const subscription = form.watch((formData) => {
            if (node && formData) {
                const updatedData = {
                    id: formData.id as string,
                    type: formData.type as string,
                    label: formData.label as string,
                    x: Number(formData.x),
                    y: Number(formData.y),
                    width: Number(formData.width),
                    height: Number(formData.height),
                    color: formData.color as string,
                    imageUrl: formData.imageUrl as string,
                };
                onUpdate(updatedData);
            }
        });
        return () => subscription.unsubscribe();
    }, [form, node, onUpdate]);

    if (!node) {
        return (
            <div className={cn("w-72 border-l bg-slate-50 p-6 flex items-center justify-center text-gray-400", className)}>
                请选择一个节点进行编辑
            </div>
        );
    }

    return (
        <div className={cn("w-72 border-l bg-white p-4 h-full overflow-y-auto shadow-sm", className)}>
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-800">属性面板</h2>
                <p className="text-xs text-slate-500">实时编辑节点参数</p>
            </div>

            <Form {...form}>
                <form className="space-y-5">
                    <FormField
                        control={form.control}
                        name="id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs font-medium uppercase text-slate-500">节点 ID</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled className="bg-slate-50 text-slate-400 border-dashed" />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs font-medium uppercase text-slate-500">类型</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled className="bg-slate-50 text-slate-400" />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="x"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-medium uppercase text-slate-500">坐标 X</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} className="focus:ring-blue-500" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="y"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-medium uppercase text-slate-500">坐标 Y</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} className="focus:ring-blue-500" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="width"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-medium uppercase text-slate-500">宽度</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="height"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-medium uppercase text-slate-500">高度</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    {form.watch("type") !== "image" ? (
                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-medium uppercase text-slate-500">填充颜色</FormLabel>
                                    <div className="flex gap-2 items-center">
                                        <FormControl>
                                            <Input type="color" {...field} className="h-10 w-12 p-1 cursor-pointer" />
                                        </FormControl>
                                        <Input
                                            value={field.value}
                                            onChange={(e) => field.onChange(e.target.value)}
                                            className="font-mono text-sm uppercase"
                                        />
                                    </div>
                                </FormItem>
                            )}
                        />
                    ) : (
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-medium uppercase text-slate-500">更换图片</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            className="bg-slate-50 text-slate-500 cursor-pointer"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onload = (event) => {
                                                        const result = event.target?.result as string;
                                                        field.onChange(result);
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    {form.watch("type") === "image" && form.watch("imageUrl") && (
                        <div className="space-y-2">
                            <span className="text-xs font-medium uppercase text-slate-500">图片预览</span>
                            <div className="border rounded-md p-1 bg-slate-50">
                                <img
                                    src={form.watch("imageUrl")}
                                    className="max-h-32 w-full object-contain rounded"
                                    alt="Preview"
                                />
                            </div>
                        </div>
                    )}
                </form>
            </Form>
        </div>
    );
};

export default AttributesPanel;