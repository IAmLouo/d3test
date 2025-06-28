import { onMount, createEffect } from 'solid-js';
import * as d3 from 'd3';

interface Node {
  id: string;
}

interface Link {
  source: string;
  target: string;
}

interface D3CircleProps {
  nodes: Node[];
  links: Link[];
}

function D3Circle(props: D3CircleProps) {
  const width = 800;
  const height = 600;
  let svgRef: SVGSVGElement | undefined;

  createEffect(() => {
    if (svgRef) {
      const svg = d3.select(svgRef);
      svg.selectAll('*').remove();

      // Deep copy to avoid D3 mutating props
      const nodes = props.nodes.map(n => ({ ...n }));
      const links = props.links.map(l => ({ ...l }));

      const simulation = d3.forceSimulation(nodes as d3.SimulationNodeDatum[])
        .force('link', d3.forceLink(links).id((d: any) => d.id).distance(60))
        .force('charge', d3.forceManyBody().strength(-100))
        .force('center', d3.forceCenter(width / 2, height / 2));

      const link = svg.append('g')
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.6)
        .selectAll('line')
        .data(links)
        .enter().append('line')
        .attr('stroke-width', 2);

      const node = svg.append('g')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5)
        .selectAll('circle')
        .data(nodes)
        .enter().append('circle')
        .attr('r', 15)
        .attr('fill', 'steelblue')
        .call(d3.drag()
          .on('start', (event, d: any) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d: any) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d: any) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
        );

      const label = svg.append('g')
        .selectAll('text')
        .data(nodes)
        .enter().append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', 4)
        .attr('fill', '#fff')
        .text(d => d.id);

      simulation.on('tick', () => {
        link
          .attr('x1', d => (d.source as any).x)
          .attr('y1', d => (d.source as any).y)
          .attr('x2', d => (d.target as any).x)
          .attr('y2', d => (d.target as any).y);
        node
          .attr('cx', d => (d as any).x)
          .attr('cy', d => (d as any).y);
        label
          .attr('x', d => (d as any).x)
          .attr('y', d => (d as any).y);
      });
    }
  });

  return (
    <svg class='border-2 border-blue-500' ref={svgRef} width={width} height={height} />
  );
}

export default D3Circle; 