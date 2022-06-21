import Head from "next/head";
import styles from "./styles.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Post | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="">
            <time>12 de julho de 2022</time>
            <strong>Next Level Week: os caminhos que trilhamos até aqui</strong>
            <p>
              Conheça um pouco mais de tudo que já foi feito na história de um
              dos maiores eventos online de programação do Brasil
            </p>
          </a>
          <a href="">
            <time>12 de julho de 2022</time>
            <strong>Next Level Week: os caminhos que trilhamos até aqui</strong>
            <p>
              Conheça um pouco mais de tudo que já foi feito na história de um
              dos maiores eventos online de programação do Brasil
            </p>
          </a>
          <a href="">
            <time>12 de julho de 2022</time>
            <strong>Next Level Week: os caminhos que trilhamos até aqui</strong>
            <p>
              Conheça um pouco mais de tudo que já foi feito na história de um
              dos maiores eventos online de programação do Brasil
            </p>
          </a>
        </div>
      </main>
    </>
  );
}
