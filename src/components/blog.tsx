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
        <div className='col-start-1 col-end-6'>
            <img src={blog.img} alt={blog.title} />
            <h2>{blog.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
    );
}