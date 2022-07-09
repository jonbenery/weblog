import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '记录',
    img: './img/home/undraw_typewriter.svg',
    description: (
      <>
        把所见、所闻、所思、所想等写下来
      </>
    ),
  },
  {
    title: '思考',
    img: './img/home/undraw_version_control.svg',
    description: (
      <>
        学而不思则罔，思而不学则殆
      </>
    ),
  },
  {
    title: '温习',
    img: './img/home/code.png',
    description: (
      <>
        温故而知新
      </>
    ),
  }
];


function Feature({img, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureSvg} src={img} role="img"/>
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
