import Layout from './components/Layout';


function App() {
  return (
    <Layout>
    <div className="max-w-4xl mx-auto">
      <div className='bg-whte rounded-2xl shadow-sm border border-slate-200 p-8'>
        <h2 className='text-2xl font-bold text-slate-800 mb-4'>
          Welcome to AI GitHub Map
        </h2>
        <p className='text-slate-600'>
          Enter a GitHub repository URL to generate a knowledge graph.
        </p>

        {/* input form */}
        <div className='mt-8 p-12 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center bg-slate-50 text-slate-400'>
          [Input Form Placeholder]
        </div>
      </div>
    </div>
    </Layout>
  );
}

export default App;
