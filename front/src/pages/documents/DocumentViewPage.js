import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

const API_URL = process.env.REACT_APP_API_URL;

const DocumentViewPage = () => {
    const { title, id } = useParams();
    const [data, setData] = useState();

    useEffect(() => {
        fetch(`${API_URL}/${title}/${id}`)
            .then(response => response.json())
            .then(json => {
                setData(json);
                console.log('View data (inside .then):', data);
            })
            .catch(error => {
                console.error('Error fetching home data:', error);
            });
    }, [])

    console.log(data)
    // 실제 구현: 백엔드에서 문서 제목(title)으로 문서 내용을 가져와 렌더링
    return (
        <div>
            <h2>{title}</h2>
            {data ?
                <ReactMarkdown>{data[0].content}</ReactMarkdown>
                : ''}
            <p>여기에 문서 내용이 렌더링됩니다.</p>
            <p><a href={`/${title}/edit`}>[편집]</a> <a href={`/${title}/history`}>[역사]</a>
            </p>
        </div>
    )
};

export default DocumentViewPage;