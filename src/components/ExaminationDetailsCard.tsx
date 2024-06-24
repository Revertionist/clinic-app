import React from 'react';
import { Card, Table } from 'react-bootstrap';

interface ExaminationDetailsCardProps {
    ExaminationData: {
        [key: string]: any;
    };
    examinationType: string;
}

const ExaminationDetailsCard: React.FC<ExaminationDetailsCardProps> = (props) => {
    const { ExaminationData, examinationType } = props;
    const relevantData = ExaminationData?.[examinationType];

    return (
        <div>
            <Card className="text-center">

                <Card.Header>{examinationType}</Card.Header>
                <Card.Body>
                    {relevantData ? (
                        typeof relevantData === 'object' ? (

                            <Table responsive>
                                <thead>
                                    <tr>
                                        {Object.keys(relevantData).map((key) => (

                                            <th key={key}>
                                                <h5>{key}</h5>
                                            </th>

                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {Object.keys(relevantData).map((key) => (
                                            <td key={key}>
                                                {relevantData[key]}
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </Table>

                        ) : (
                            <div>
                                <h4>{relevantData}</h4>
                            </div>
                        )
                    ) : (
                        <div>No data available</div>
                    )}
                </Card.Body>

            </Card>
        </div>
    );
}

export default ExaminationDetailsCard;
