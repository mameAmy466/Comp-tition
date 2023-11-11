import { useState } from "react";
// import useSWR from "swr";

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import ExpandMoreIcon from "@/icons/ExpandMoreIcon";
import { IFaqSectionData } from "@/types";
// import fetcher from "@/utils/fetcher";

function FAQSection({ sectionData }: { sectionData: IFaqSectionData }) {
  // const { data } = useSWR<IFaqSectionData>("/pages/faq", fetcher);
  const [expanded, setExpanded] = useState<number | undefined>(0);

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : undefined);
    };

  return (
    <div
      className="section"
      style={{
        backgroundColor: "#142618",
      }}
    >
      <Container maxWidth="md">
        <Stack
          spacing={{ xs: 2, sm: 4 }}
          // alignItems="center"
          // textAlign="center"
        >
          <div style={{ color: "white", textAlign: "center" }}>
            <Typography variant="subtitle1" mb={{ xs: 1, sm: 2 }}>
              {sectionData.title}
            </Typography>
            <Typography variant="body2">{sectionData.desc}</Typography>
          </div>
          {sectionData.questions.map((item, idx) => (
            <Accordion
              key={item.id}
              sx={{ color: "white", backgroundColor: "#06883E" }}
              expanded={expanded === idx}
              onChange={handleChange(idx)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              >
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {item.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ textAlign: "start" }}>
                <Typography variant="body2">{item.response}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Container>
    </div>
  );
}

export default FAQSection;
