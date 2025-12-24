## 概述
Demo中使用了React Flow库来实现流程图的绘制，通过组件化开发思想，将不同节点封装为不同的组件，属性统一继承Panel/types.ts中的NodeData，方便统一进行管理，再通过NodeConfig来实现节点的配置。

### 使用的技术栈： Next.js、TypeScript、TailwindCSS、React Hook Form、Zod、React Flow、Shadcn UI、bun

### 主要依赖: 
- React Flow: 用于构建流程图
- React Hook Form: 用于表单验证
- Zod: 用于类型检查和表单验证
- Shadcn UI: 用于构建 UI

### 开发时间: 12/23 - 12/24

### 数据结构设计:
#### 节点和连线是直接使用了 React Flow 提供的 
- Node: NodeData{ id: string, type: string, position: { x: number, y: number }, data: any }
- Edge: EdgeData{ id: string, source: string, target: string, data: any }
- Form: { id: string, type: string, label: string, x: number, y: number, width: number, height: number, color: string, imageUrl: string}

### 为什么要使用React Flow库？
- React Flow 提供了丰富的节点类型，如 rect、circle、image 等，可以轻松实现流程图的绘制（一站式解决方案）。
- React Flow 也提供了丰富的连线类型，如 straight、bezier、smoothstep 等，可以轻松实现流程图的连线。
- React Flow 也提供了丰富的节点操作，如添加、删除、移动、复制等，可以轻松实现流程图的编辑。
- React Flow 也提供了丰富的节点属性，如节点的大小、位置、颜色等，可以轻松实现流程图的属性编辑。

### 核心逻辑
- 属性面板：通过Shadcn/UI组件库提供的Input和Form组件来实现属性面板，通过React Hook Form来实现表单验证，通过Zod来实现类型检查。
- 节点组件：通过组件化开发思想，将不同节点封装为不同的组件，属性统一继承Panel/types.ts中的NodeData，方便统一进行管理，再通过NodeConfig来实现节点的配置，
主要是通过onNodeUpdate方法来将新的属性merge到节点的data属性中，以此来更新节点的属性，后续也可以通过此方式新增节点组件。
- 属性面板和导出面板的UI效果（抽屉式）：根据selectedNode和showJsonPanel来控制属性面板和导出面板的显示和隐藏，然后使用tailwindcss的animate-[in|out]、
slide-in-from-[right|bottom|left|top]和duration-[ms]来实现抽屉式的动画效果，通过React Flow提供的onPaneClick事件来实现点击画布时关闭抽屉。

## 启动

### 我该如何启动项目(bun/npm/pnpm)?
- clone this repo
- cd moon-ai-frontend
- bun i
- bun run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

