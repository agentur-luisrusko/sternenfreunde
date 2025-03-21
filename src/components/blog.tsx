import Block from '../data/blog.js';

interface BlogProps {
    id: number;
}

export default function Blog({ id }: BlogProps) {
    const blog = Block.find((b) => b.id === id);
    if (!blog) {
        return <div>Blog not found</div>;
    }

    return (
        <div>
            <img src={blog.img} alt={blog.title} />
            {blog.title}
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
    );
}