// 定义 Props 和 State 的类型
interface HelloProps {
  name: string;
}
function HelloWorld({ name }: HelloProps ) {
  return <h2>欢迎，{name || '陌生人'}！</h2>
}

export default HelloWorld