import React from 'react';
import articles from './data/articles.json';
import { useParams, useNavigate } from 'react-router-dom'; 
import { Button } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';

function DetailArticle(props) { 
  const { aid } = useParams(); 
  const navigate = useNavigate(); 
  const [article, useArticle] = React.useState(null)
//  for(const article of articles) {
//    if(article.id==aid)  {
React.useEffect(()=>{
  http.get(`/articles/${aid}`)
  .then((response)=>{
    serArticle(response.data)
  })
})
  if(article) {
      return(
        <>
        <h1>{article.title}</h1> 
        <p>{article.fullText}</p>
        <Button type="primary" icon={<RollbackOutlined />} onClick={()=>navigate(-1)} />
        </>
    ); 
  } else {
    return(
      <><div>no such article</div></>
    )
  }     
}

export default DetailArticle;