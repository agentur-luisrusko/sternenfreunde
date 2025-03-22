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
        <div className='col-start-1 col-end-6 mx-[16px] flex flex-col'>
            <img src={blog.img} alt={blog.title} className='h-fit' />
            <div className='mx-[8px] mt-[24px]'>
                <h3 className='mb-[8px]'>{blog.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
        </div>
    );
}