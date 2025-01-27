import BlogCard from '../common/BlogCard'

const RecentBlogs = () => {
  return (
    <section className='container my-10 mx-auto'>
      <h1 className='text-center text-3xl font-bold mb-6'>Recent Blogs</h1>
      <div className='grid grid-cols-3 gap-5'>
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </section>
  )
}

export default RecentBlogs
