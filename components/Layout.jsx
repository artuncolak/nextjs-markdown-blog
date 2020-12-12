import { Container } from "react-bootstrap";

export default function Layout({ children }) {
  return (
    <Container>
      <h1 className="text-center font-weight-bold mt-3">Markdown Blog</h1>
      {children}
    </Container>
  );
}
