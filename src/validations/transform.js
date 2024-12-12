const atricleListModel = ({
    id,
    category_id,
    title,
    description,
    content,
    cover_image,
    created_at
}) => ({
    id,
    categoryId: category_id,
    title,
    description,
    coverImage: cover_image,
    createdAt: created_at
})


export {
    atricleListModel
}