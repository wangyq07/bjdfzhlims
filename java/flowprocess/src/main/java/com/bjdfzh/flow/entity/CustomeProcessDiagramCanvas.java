package com.bjdfzh.flow.entity;

import org.activiti.bpmn.model.AssociationDirection;
import org.activiti.image.impl.DefaultProcessDiagramCanvas;

import java.awt.*;
import java.awt.geom.RoundRectangle2D;

public class CustomeProcessDiagramCanvas extends DefaultProcessDiagramCanvas {

    //定义连线颜色为蓝色
    protected static Color HIGHLIGHT_SequenceFlow_COLOR = Color.green;

    public CustomeProcessDiagramCanvas(int width, int height, int minX, int minY, String imageType, String activityFontName, String labelFontName, String annotationFontName) {
        super(width, height, minX, minY, activityFontName, labelFontName, annotationFontName);
    }

    /**
     * 重写绘制连线的方式,设置绘制颜色
     */
    @Override
    public void drawConnection(int[] xPoints,
            int[] yPoints,
            boolean conditional,
            boolean isDefault,
            String connectionType,
            AssociationDirection associationDirection,
            boolean highLighted) {
        Paint originalPaint = this.g.getPaint();
        Stroke originalStroke = this.g.getStroke();
        this.g.setPaint(CONNECTION_COLOR);
        if (connectionType.equals("association")) {
            this.g.setStroke(ASSOCIATION_STROKE);
        } else if (highLighted) {
            this.g.setPaint(HIGHLIGHT_SequenceFlow_COLOR);
            this.g.setStroke(HIGHLIGHT_FLOW_STROKE);
        }

        for(int i = 1; i < xPoints.length; ++i) {
            Integer sourceX = xPoints[i - 1];
            Integer sourceY = yPoints[i - 1];
            Integer targetX = xPoints[i];
            Integer targetY = yPoints[i];
            java.awt.geom.Line2D.Double line = new java.awt.geom.Line2D.Double((double)sourceX, (double)sourceY, (double)targetX, (double)targetY);
            this.g.draw(line);
        }

        java.awt.geom.Line2D.Double line;
        if (isDefault) {
            line = new java.awt.geom.Line2D.Double((double)xPoints[0], (double)yPoints[0], (double)xPoints[1], (double)yPoints[1]);
            this.drawDefaultSequenceFlowIndicator(line);
        }

        if (conditional) {
            line = new java.awt.geom.Line2D.Double((double)xPoints[0], (double)yPoints[0], (double)xPoints[1], (double)yPoints[1]);
            this.drawConditionalSequenceFlowIndicator(line);
        }

        if (associationDirection.equals(AssociationDirection.ONE) || associationDirection.equals(AssociationDirection.BOTH)) {
            line = new java.awt.geom.Line2D.Double((double)xPoints[xPoints.length - 2], (double)yPoints[xPoints.length - 2], (double)xPoints[xPoints.length - 1], (double)yPoints[xPoints.length - 1]);
            this.drawArrowHead(line);
        }

        if (associationDirection.equals(AssociationDirection.BOTH)) {
            line = new java.awt.geom.Line2D.Double((double)xPoints[1], (double)yPoints[1], (double)xPoints[0], (double)yPoints[0]);
            this.drawArrowHead(line);
        }

        this.g.setPaint(originalPaint);
        this.g.setStroke(originalStroke);
    }

    @Override
    public void drawHighLight(int x, int y, int width, int height) {
        Paint originalPaint = g.getPaint();
        Stroke originalStroke = g.getStroke();
        this.g.setPaint(Color.red);
        this.g.setStroke(THICK_TASK_BORDER_STROKE);

        RoundRectangle2D rect = new RoundRectangle2D.Double(x, y, width, height, 20, 20);
        this.g.draw(rect);

        this.g.setPaint(originalPaint);
        this.g.setStroke(originalStroke);
    }

    public void drawHighLight(int x, int y, int width, int height,Color color) {
        Paint originalPaint = g.getPaint();
        Stroke originalStroke = g.getStroke();
        this.g.setPaint(color);
        this.g.setStroke(THICK_TASK_BORDER_STROKE);

        RoundRectangle2D rect = new RoundRectangle2D.Double(x, y, width, height, 20, 20);
        this.g.draw(rect);

        this.g.setPaint(originalPaint);
        this.g.setStroke(originalStroke);
    }
}
