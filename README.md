# Next.js + Tailwind CSS Example

This example shows how to use [Tailwind CSS](https://tailwindcss.com/) [(v3.2)](https://tailwindcss.com/blog/tailwindcss-v3-2) with Next.js. It follows the steps outlined in the official [Tailwind docs](https://tailwindcss.com/docs/guides/nextjs).

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) or preview live with [StackBlitz](https://stackblitz.com/github/vercel/next.js/tree/canary/examples/with-tailwindcss)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss&project-name=with-tailwindcss&repository-name=with-tailwindcss)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example with-tailwindcss with-tailwindcss-app
```

```bash
yarn create next-app --example with-tailwindcss with-tailwindcss-app
```

```bash
pnpm create next-app --example with-tailwindcss with-tailwindcss-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).


[實作Medium教學影片](https://www.youtube.com/watch?v=I2dcpatq54o)

使用套件
1. Tailwind
2. portabletext/react
   解讀 blockContent, 並且可以高度客製化
3. next-sanity
   連結 sanity 
4. sanity/image-url
   轉換 sanity image 成 url  
5. react-hook-form
   表單數據驗證與送出 

後台數據管理
1. Sanity.io
   1. 可以共同編輯
   2. 自訂義欄位
   3. 類似 GraphQL
   4. 比 GraphQL 更多細節在 Query 上
   5. 可以定義查詢邏輯在 Query 上
   6. Schema 可以實作 validation, 沒有實作 resolve 概念
   7. npm run deploy 可以自己設定 name 就會產生 專屬的 <我的studio>.sanity.studio
   8. 登入方式支援 Github Google

```ts
import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Comment',
  name: 'comment',
  type: 'document',
  fields: [
    defineField({name: 'name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      // CMS 管理系統時候名稱
      title: 'Approved', 
      // Field 實際名稱
      name: 'approved', 
      type: 'boolean',
      // 可以當備註 或是 詳細資訊
      description: "comments won't show on the site without approval",
    }),
    defineField({
      name: 'email',
      type: 'string',
      // 可以實作驗證函數, 還可以驗證長度 或是 Range
      // 使用 chain 方式 (Rule) => Rule.required().max(50).min(0)
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'comment',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'post',
      // 參考型態
      type: 'reference',
      // 參考的對象
      to: [{type: 'post'}],
      validation: (Rule) => Rule.required(),
    }),
  ],
})

defineField({
  name: 'categories',
  title: 'Categories',
  // 這是 Array 型態
  type: 'array',
  // of 是 Array 的型態, to 則是用來給 reference
  of: [{type: 'reference', to: {type: 'category'}}],
}),

const query = groq`
    *[_type == "post"]{
      _id,
      slug {
        current
      }
    }
  `;
```

---

整個查詢時候

```groq
*[_type == "post"]{
  _id,
  slug {
    current
  }
}
```

搜尋時候

```groq
// slug.current == $slug 類似 Array.find
// [0]第0個 
// slug 是 唯一值 通常用來 Query 用 _id 是創建時的唯一亂碼
*[_type == "post" && slug.current == $slug][0]{ 
  _id,
  _createdAt,
  title,
  author -> {
    name,
    image
  },
  // 自定義 Field 必須使用 字串 
  // *[] 開頭 新的查詢
  // ^ 上一個 *[]
  "comments": *[ 
    _type == "comment" &&
    post._ref == ^._id &&
    approved == true
  ],
  // A[] 是整個 A Array 
  // 如果沒用 -> { } 則不用這樣寫
  // => { } 類似 GraphQL 
  categories[] -> { 
    title,
    description
  },
  mainImage,
  slug,
  body
}
```

![]("./1672383481770.jpg")
![]("./1672383693067.jpg")