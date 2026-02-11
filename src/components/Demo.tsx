import React from "react";

// 定义 Props 和 State 的类型
interface DemoProps {
  name: string;
}

interface DemoState {
  opacity: number;
}

class Demo extends React.Component<DemoProps, DemoState> {
  private timer: number | null = null;

  constructor(props: DemoProps) {
    super(props);
    this.state = { opacity: 1.0 };
  }

  componentDidMount() {
    console.log("demo up");

    // 用箭头函数避免手动 .bind(this)
    this.timer = window.setInterval(() => {
      let { opacity } = this.state;
      opacity -= 0.05;
      if (opacity < 0.1) {
        opacity = 1.0;
      }
      this.setState({ opacity });
    }, 100);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    console.log("demo down");
  }

  render() {
    return (
      <div style={{ opacity: this.state.opacity }}>
        Missing {this.props.name}
      </div>
    );
  }
}

export default Demo;
