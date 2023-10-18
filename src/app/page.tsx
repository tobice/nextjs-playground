export default function Home() {
  return (
      <div className="hero bg-base-200 p-8">
        <div className="hero-content flex-col lg:flex-row">
          <img src="/home.png" className="max-w-sm max-h-80 rounded-lg shadow-2xl mr-6" />
          <div>
            <h1 className="text-5xl font-bold">Next.js Playground</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <a href="/users" className="btn btn-primary">Go to users</a>
          </div>
        </div>
      </div>
  )
}
