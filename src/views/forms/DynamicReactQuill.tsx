import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'

const DynamicReactQuillEditor = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>
})

const modules = {
  toolbar: [
    [{ size: ['small', false, 'large', 'huge'] }, { font: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    [{ align: [] }],
    ['link', 'image', 'video'],
    ['code-block'],
    [{ script: 'sub' }, { script: 'super' }],
    ['formula'],
    ['blockquote'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false
  }
}

const formats = [
  'header',
  'font',
  'size',
  'align',
  'color',
  'background',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'code-block',
  'script'
]

export default function DynamicReactQuill({ value, setValue, placeholder }: any) {
  return (
    <>
      <DynamicReactQuillEditor
        modules={modules}
        formats={formats}
        theme='snow'
        style={{ background: '#ffff', color: 'black', marginBottom: '5%' }}
        value={value}
        onChange={setValue}
        placeholder={placeholder ? placeholder : 'Unleash Your Creativity'}
      />
    </>
  )
}
